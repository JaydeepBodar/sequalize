const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("classicmodels", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const db = {};
// db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.contacts = require("./Contact")(DataTypes, sequelize, Model);
db.education = require("./education")(DataTypes, sequelize);
db.user = require("./User")(DataTypes, sequelize);
const emp=db.employee = require("./Employee")(DataTypes, sequelize);
console.log('dsdsdsdsdsd',emp)
db.offices = require("./Offices")(DataTypes, sequelize);
// when use one to one relationship use hasMany otherwise when use one to one relationship use hasOne
db.user.hasMany(db.contacts, { foreignkey: "UserId" });
db.contactuser = db.contacts.belongsTo(db.user, { foreignkey: "UserId" });
db.user.hasMany(db.education, { foreignkey: "UserId" });
db.education.belongsTo(db.user);
// db.user.belongsToMany(db.contacts, { through: 'Contactuser'});
// db.contacts.belongsToMany(db.user, { through: 'Contactuser'});

const Employeedetails = sequelize.define(
  "Employeedetails",
  { self_Grant: DataTypes.BOOLEAN },
  { timestamps: false }
);
db.employee.belongsToMany(db.offices, { through: Employeedetails });
db.offices.belongsToMany(db.employee, { through: Employeedetails });
db.sequelize.sync({ force: false });
module.exports = db;
