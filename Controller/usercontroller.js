const { user } = require("../Model/index");
const db = require("../Model/index");
const Users = db.user;
const { Op, where } = require("sequelize");
const sequelize = require("sequelize");
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
const getvirtuates=async(req,res)=>{
  const user=await Users.findAll()
  res.json({user:user})
}
// virtual=>set value
const virtual=async(req,res)=>{
  const user=await Users.create({
    firstname:"jayu",
    lastname:'bodar'
  })
  res.json({user:user})
}
module.exports = {
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
