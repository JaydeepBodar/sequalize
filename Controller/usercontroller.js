const { user } = require("../Model/index");
const db = require("../Model/index");
const Users = db.user
// getAll user details
const addUser = async (req, res) => {
  const newuser=await Users.findAll()
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
  console.log('user',user)
  res.json({data:user})
};
// individual data get
const getIndividualuser=async(req,res)=>{
  const finduser=await Users.findOne({where:{id:req.params.id}})
  console.log('finduser',finduser)
  res.json({user:finduser})
}
// delete user data
const deleteuser=async(req,res)=>{
  const deleteuser=await Users.destroy({where:{id:req.params.id}})
  res.json({deleteuser:deleteuser})
}
// update data
const updatedata=async(req,res)=>{
  const updata=req.body
  const update=await Users.update(updata,{where :{id:req.params.id}})
  res.json({updatedata:update})
}
module.exports = { addUser,postUser,getIndividualuser,deleteuser,updatedata };
