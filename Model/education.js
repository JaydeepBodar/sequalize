module.exports = (DataTypes, sequelize) => {
  const education = sequelize.define("Education", {
    class_name: { type: DataTypes.STRING },
    marks: { type: DataTypes.INTEGER },
    UserId: { type: DataTypes.INTEGER },
  });
  return education;
};
