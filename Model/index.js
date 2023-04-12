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
const Grant = sequelize.define(
  "Grant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    self_Grant: DataTypes.BOOLEAN,
  },
  { timestamps: false }
);
const db = {};
// db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.contacts = require("./Contact")(DataTypes, sequelize, Model);
db.education = require("./education")(DataTypes, sequelize);
db.user = require("./User")(DataTypes, sequelize);
db.employee = require("./Employee")(DataTypes, sequelize);
db.offices = require("./Offices")(DataTypes, sequelize);
// when use one to one relationship use hasMany otherwise when use one to one relationship use hasOne
db.user.hasMany(db.contacts, { foreignkey: "UserId" });
db.contactuser = db.contacts.belongsTo(db.user, { foreignkey: "UserId" });
db.user.hasMany(db.education, { foreignkey: "UserId" });
db.education.belongsTo(db.user);
// db.user.belongsToMany(db.contacts, { through: 'Contactuser'});
// db.contacts.belongsToMany(db.user, { through: 'Contactuser'});

db.grant = Grant;
db.employee.belongsToMany(db.offices, { through: Grant });
db.offices.belongsToMany(db.employee, { through: Grant });
// Setup a One-to-Many relationship between User and Grant
db.employee.hasMany(db.grant);
db.grant.belongsTo(db.employee);

// Also setup a One-to-Many relationship between Profile and Grant
db.offices.hasMany(db.grant);
db.grant.belongsTo(db.offices);
db.sequelize.sync({ force: false });
// many-to-many-to many-relationship
db.player = sequelize.define("Player", { username: DataTypes.STRING });
db.team = sequelize.define("Team", { name: DataTypes.STRING });
db.game = sequelize.define("Game", { name: DataTypes.STRING });
// Super Many-to-Many relationship between Game and Team
db.gameTeam = sequelize.define("GameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
db.team.belongsToMany(db.game, { through: db.gameTeam });
db.game.belongsToMany(db.team, { through: db.gameTeam });
db.game.hasMany(db.gameTeam);
db.gameTeam.belongsTo(db.game);
db.team.hasMany(db.gameTeam);
db.gameTeam.belongsTo(db.team);

// Super Many-to-Many relationship between Player and GameTeam
db.playerGameTeam = sequelize.define('PlayerGameTeam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});
db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });
db.player.hasMany(db.playerGameTeam);
db.playerGameTeam.belongsTo(db.player);
db.gameTeam.hasMany(db.playerGameTeam);
db.playerGameTeam.belongsTo(db.gameTeam);
module.exports = db;
