module.exports = (DataTypes, sequelize) => {
  const employee = sequelize.define(
    "employees",
    {
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      extension: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      officeCode: { type: DataTypes.STRING },
      reportsTo: { type: DataTypes.INTEGER },
      jobTitle: { type: DataTypes.INTEGER },
    },
    { timestamps: false }
  );
  return employee;
};
