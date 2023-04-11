module.exports = (DataTypes, sequelize) => {
    const office= sequelize.define(
      "offices",
      {
        addressLine1: { type: DataTypes.STRING },
        addressLine2: { type: DataTypes.STRING },
        postalCode: { type: DataTypes.INTEGER },
        city: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        territory: { type: DataTypes.STRING },
        country: { type: DataTypes.STRING }
      },
      { timestamps: false }
    );
    return office;
  };