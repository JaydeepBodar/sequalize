const db = require("../Model/index");
const contacts = db.contacts;
const education = db.education;
const contactuser = db.contactuser;
const employee = db.employee;
const office = db.offices;
const Users = db.user;
const sequelize = db.sequelize;
const { Op, where, QueryTypes } = require("sequelize");
const User = require("../Model/User");
// const sequelize = require("sequelize");
// getAll user details
// findAll without attributes get All tabel column details.
// attribute nested array use of changes the database tabel column name.
// in aggregate function you must require alise name so aggregate function work properly.
// include:-include get response for all field and also given field print.
// exclude:exclude property remove the field from the database tabel.
// Op.or operator give both value give
const addUser = async (req, res) => {
  const newuser = await Users.findAll({
    // attributes:['firstname',['lastname','last_name'],'id',[sequelize.fn('Count', sequelize.col('firstname')), '_firstname']]
    // attributes:{exclude:['firstname'],include:['id']}
    where: {
      id: { [Op.or]: [3, 4] },
    },
    order: [["firstname", "DESC"]],
  });
  // newuser.set({firstname:'new',lastname:'patel'})
  // await newuser.save()
  res.json(newuser);
};
// post user data
const postUser = async (req, res) => {
  const postdata = req.body;
  if (postdata.length > 1) {
    var user = await Users.bulkCreate(postdata);
  } else {
    var user = await Users.create(postdata);
  }
  console.log("user", user);
  res.json({ data: user });
};
// individual data get
const getIndividualuser = async (req, res) => {
  const finduser = await Users.findOne({ where: { id: req.params.id } });
  console.log("finduser", finduser);
  res.json({ user: finduser });
};
// delete user data
const deleteuser = async (req, res) => {
  const deleteuser = await Users.destroy({ where: { id: req.params.id } });
  res.json({ deleteuser: deleteuser });
};
// update data
const updatedata = async (req, res) => {
  const updata = req.body;
  const update = await Users.update(updata, { where: { id: req.params.id } });
  res.json({ updatedata: update });
};
// create query
// field uses for in field we assign model key that's field only shown in database tabel
const Querydata = async (req, res) => {
  const user = await Users.create(
    {
      firstname: "Deep",
      lastname: "patel",
    },
    { fields: ["firstname", "lastname"] }
  );
  res.json({ queryuser: user });
};
// findandcountall
const findcount = async (req, res) => {
  const user = await Users.findAndCountAll();
  res.json({ data: user });
};
// findorcreateall
const findandcreate = async (req, res) => {
  const [user, created] = await Users.findOrCreate({
    where: { firstname: "Jay" },
    defaults: { lastname: "Patel" },
  });
  res.json({ data: user, created: created });
};
const getvirtuates = async (req, res) => {
  const user = await Users.findAll();
  res.json({ user: user });
};
// virtual=>set value
const virtual = async (req, res) => {
  const user = await Users.create({
    firstname: "jayu",
    lastname: "bodar",
  });
  res.json({ user: user });
};
const validateuser = async (req, res) => {
  let data, message;
  try {
    data = await Users.create({
      firstname: "jaydeep",
      lastname: "Patel",
    });
  } catch (e) {
    // console.log('errors',e.errors)
    e.errors.forEach((error) => {
      console.log("pathdata", error);
      switch (error.validatorKey) {
        case "isLowercase":
          message = error.message;
          break;
        case "isAlpha":
          message = error.message;
      }
      message[error.path] = message;
    });
  }
  res.json({ user: data, message: message });
};
const rawquery = async (req, res) => {
  const user = await sequelize.query(
    "SELECT * FROM Users WHERE firstname = :firstname",
    {
      replacements: { firstname: "jaydeep" },
      type: QueryTypes.SELECT,
    }
  );
  console.log("object", user);
  res.json({ user: user });
};
const oneTooneuser = async (req, res) => {
  // const data = await Users.create({
  //   firstname: "jaydeep",
  //   lastname: "Patel",
  // });
  // if(data && data.id){
  //   await contacts.create({permenent_address:'xyz',current_address:'abcpqr',UserId:data.id})
  // }
  const data = await Users.findAll({
    attributes: ["id", "firstname", "lastname", "fullname"],
    include: [
      {
        model: contacts,
        // as:"Contactdetails"
        attributes: ["permenent_address", "current_address", "UserId"],
      },
    ],
  });
  res.json({ user: data });
};
const onetoMany = async (req, res) => {
  // const data=await contacts.create({permenent_address:'newaddress',current_address:'newaddress',UserId:45})
  const data = await Users.findAll({
    attributes: ["id", "firstname", "lastname", "fullname"],
    include: [
      {
        model: contacts,
        // as:"Contactdetails"
        attributes: ["permenent_address", "current_address", "UserId"],
      },
    ],
  });
  res.json({ data: data });
};
const ManytoMany = async (req, res) => {
  const data = await Users.findAll({
    attributes: ["id", "firstname", "lastname", "fullname"],
    include: [
      {
        model: contacts,
        // as:"Contactdetails"
        attributes: ["permenent_address", "current_address"],
      },
    ],
  });
  // const data=await contacts.create({permenent_address:'newaddress',current_address:'newaddress'})
  res.json({ data: data });
};
const paranoid = async (req, res) => {
  // const data = await Users.destroy({
  //   where: { id: 6 }
  // });
  const data = await Users.restore({ where: { id: 6 } });
  res.json({ data: data });
};
const lazyloading = async (req, res) => {
  // lazy loading
  // const data=await Users.findOne({where:{id:45}})
  // const contactdata=await data.getContacts()
  // res.json({data:data,contactdata:contactdata})

  // eager-loading
  const data = await Users.findAll({
    attributes: ["id", "firstname", "lastname", "fullname"],
    include: [
      {
        model: contacts,
        attributes: ["permenent_address", "current_address", "UserId"],
      },
    ],
  });
  res.json({ user: data });
};
// in advanced eager loading if we can retrive left join then in include field object give to all property to true
const eageruser = async (req, res) => {
  const data = await Users.findAll({
    include: {
      model: education,
      // include:{
      //   model:contacts
      // }
    },
  });
  res.json({ data: data });
};
const creator = async (req, res) => {
  await contacts.create(
    {
      permenent_address: "add1",
      current_address: "add2",
      UserId: 9,
      Users: {
        firstname: "jaydeep",
        lastname: "bodar",
      },
    },
    { include: [contactuser] }
  );
  const data = await Users.findAll({
    include: [contacts],
  });
  res.json({ data: data });
};
const employeedata = async (req, res) => {
  const data = await office.findAll();
  res.json({ data: data });
};
const Mnassociation = async (req, res) => {
  //
  const ndata = await employee.findOne({
    where: { id: 1 },
  });
  const compines = await office.findOne({
    where: { id: 1 },
  });
  console.log("fdyutyiuyui", compines);
  // here addOffice add is sequalize function while in this fuction office is the model name and always write in capitalize format
  await ndata.addOffice(compines, { through: { self_Grant: false } });
  const data = await employee.findOne({
    where: { id: 1 },
    include: office,
  });
  // using create funtcion to add data in both tabel
  // const ndata = await employee.create(
  //   {
  //     firstName: "ddddd",
  //     lastName: "fffff",
  //     extension: "AB1234",
  //     email: "abc@gmail.com",
  //     officeCode: "25",
  //     reportsTo: 4,
  //     jobTitle: "new",
  //     office: [
  //       {
  //         addressLine1: "asdfghjkl",
  //         addressLine2: "qwertyuiop",
  //         postalCode: 789456,
  //         city: "zxcv",
  //         territory: "vbnm",
  //         state: "cvbn",
  //         country: "sdfghh",
  //         Employeedetails: {
  //           self_Grant: true,
  //         },
  //       },
  //     ],
  //   },
  //   { include: office }
  // );
  // const data = await employee.findOne({
  //   where: { firstName: "ddddd" },
  //   include: office,
  // });
  res.json({ employeeDetails: data });
};
const Mncomplexassociation = async (req, res) => {
  const data = await db.employee.findAll({
    include: {
      model: office,
      through: {
        attributes: ["id", "self_Grant"],
      },
    },
  });
  res.json({ data: data });
};
const m2m2m = async (req, res) => {
  await sequelize.sync();
  await db.player.bulkCreate([
    { username: "s0me0ne" },
    { username: "empty" },
    { username: "greenhead" },
    { username: "not_spock" },
    { username: "bowl_of_petunias" },
  ]);
  await db.game.bulkCreate([
    { name: "The Big Clash" },
    { name: "Winter Showdown" },
    { name: "Summer Beatdown" },
  ]);
  await db.team.bulkCreate([
    { name: "The Martians" },
    { name: "The Earthlings" },
    { name: "The Plutonians" },
  ]);
  await db.gameTeam.bulkCreate([
    { GameId: 1, TeamId: 1 }, // this GameTeam will get id 1
    { GameId: 1, TeamId: 2 }, // this GameTeam will get id 2
    { GameId: 2, TeamId: 1 }, // this GameTeam will get id 3
    { GameId: 2, TeamId: 3 }, // this GameTeam will get id 4
    { GameId: 3, TeamId: 2 }, // this GameTeam will get id 5
    { GameId: 3, TeamId: 3 }, // this GameTeam will get id 6
  ]);
  await db.playerGameTeam.bulkCreate([
    { PlayerId: 1, GameTeamId: 3 }, // s0me0ne played for The Martians
    { PlayerId: 3, GameTeamId: 3 }, // greenhead played for The Martians
    { PlayerId: 4, GameTeamId: 4 }, // not_spock played for The Plutonians
    { PlayerId: 5, GameTeamId: 4 }, // bowl_of_petunias played for The Plutonians
  ]);
  const game = await db.game.findOne({
    where: {
      name: "Winter Showdown",
    },
    include: {
      model: db.gameTeam,
      include: [
        {
          model: db.player,
          through: { attributes: ["GameTeamId", "PlayerId"] }, // Hide unwanted `PlayerGameTeam` nested object from results
        },
        db.team,
      ],
    },
  });
  res.json({ game: game });
};
const associationScope = async (req, res) => {
  // single tabel with multiple field associationscope
  Users.addScope("id", {
    where: { firstname: "deep" },
  });
  Users.addScope("lastname", {
    where: { lastname: "Patel ,Indian" },
  });
  // const data=await Users.scope(['id','lastname']).findAll({})
  // multiple tabel using association scope
  Users.addScope("address", {
    include: {
      model: contacts,
      attributes: ["permenent_address", "current_address"],
    },
  });
  Users.addScope("userdetails", {
    attributes: ["firstname", "lastname"],
  });
  const data = await Users.scope(["userdetails", "address"]).findAll({});
  res.json({ data: data });
};
// here in transaction UserId field give Notnull value that's why when you apply transaction and if userid null then catch block execute otherwise apply try block
const transaction = async (req, res) => {
  // unmanged transaction
  // const transaction = await sequelize.transaction();
  // const data = await Users.create({
  //   firstname: "name",
  //   lastname: "lname",
  // });
  // if (data && data.id) {
  //   try {
  //     await contacts.create({
  //       permenent_address: "qwerty",
  //       current_address: "asdfgh",
  //       UserId: Null,
  //     });
  //     await transaction.commit();
  //     console.log("commit");
  //   } catch (e) {
  //     await transaction.rollback();
  //     await Users.destroy({
  //       where: { id: data.id },
  //     });
  //     console.log("rollback");
  //   }
  // }
  // managed transaction
  const data = await Users.create({
    firstname: "firstname",
    lastname: "lastname",
  });
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const contact = await contacts.create(
        {
          permenent_address: "asdfgh",
          current_address: "zxcvbn",
          UserId: Null,
        },
        { transaction: t }
      );
      return contact;
    });
    console.log("resulr", result);
  } catch (error) {
    console.log("error");
    await Users.destroy({ where: { id: data.id } });
  }
  res.json({ data: data });
};
module.exports = {
  transaction,
  associationScope,
  m2m2m,
  Mncomplexassociation,
  Mnassociation,
  employeedata,
  creator,
  eageruser,
  lazyloading,
  paranoid,
  ManytoMany,
  onetoMany,
  oneTooneuser,
  rawquery,
  validateuser,
  virtual,
  getvirtuates,
  findandcreate,
  addUser,
  postUser,
  getIndividualuser,
  deleteuser,
  updatedata,
  Querydata,
  findcount,
};
