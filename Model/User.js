module.exports = (DataTypes, sequelize) => {
  const User = sequelize.define(
    "Users",
    {
      firstname: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("firstname");
          return rawValue ? "Mr." + rawValue : null;
        },
        validate:{
            isAlpha:{msg:'Only Alphabetic are allowed'},
            isLowercase:{msg:'Only lower case are allowed'}
        }
      },
      lastname: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("lastname", value + " ,Indian");
        },
      },
      fullname: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstname} ${this.lastname}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
    },
    { tabelname: "users" }
  );
  return User;
};
