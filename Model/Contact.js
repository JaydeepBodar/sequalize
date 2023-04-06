module.exports=(DataTypes,sequelize,Model)=>{
    class Contact extends Model{}
    Contact.init(                                                                                                                                                                                                                                                                                                                                                                                                                   {
        permenent_address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        current_address:{
            type:DataTypes.STRING,
        },
        user_id:{
            type:DataTypes.INTEGER
        }
    },{ sequelize,
        tabelname:"contact"
    })
    return Contact;
}