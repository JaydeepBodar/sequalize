const express=require('express')
const usercontroller=require('./Controller/usercontroller')
require('./Model/index')
const app=express();
app.use(express.json())
app.get('/adduser',usercontroller.addUser)
app.post('/postuser',usercontroller.postUser)
app.get('/adduser/:id',usercontroller.getIndividualuser)
app.delete('/delete/:id',usercontroller.deleteuser)
app.patch('/update/:id',usercontroller.updatedata)
app.listen(8080,function check(err){
    if(err){
        console.log("error generate")
    }
    else{
        console.log('successfully connected on port number 8080')
    }
})