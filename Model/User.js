module.exports=(DataTypes,sequelize)=>{
    const User=sequelize.define(
        'Users',{
          firstname: { type: DataTypes.STRING },
          lastname: { type: DataTypes.STRING },
        },
        { tabelname: "users" }
      );
      return User;
}