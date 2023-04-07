const db = require("../Model/index");
const contacts = db.contacts;
const Users = db.user;
const sequelize = db.sequelize;
const { Op, where, QueryTypes } = require("sequelize");
const Contact = require("../Model/Contact");
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
const onetoMany=async(req,res)=>{
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
    res.json({data:data})
  }
const ManytoMany=async(req,res)=>{
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
    res.json({data:data})
}
module.exports = {
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
