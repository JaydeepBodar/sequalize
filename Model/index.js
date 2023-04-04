const {Sequelize,DataTypes,Model}=require('sequelize')
const sequelize = new Sequelize('classicmodels', 'root', '', {
    host: 'localhost',
    dialect:'mysql' 
})
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  const db={}
  db.Sequelize=Sequelize;
  db.sequelize=sequelize;
  db.contacts=require('./Contact')(DataTypes,sequelize,Model)
  db.user=require('./User')(DataTypes,sequelize)
  db.sequelize.sync({force:false})
module.exports=db;