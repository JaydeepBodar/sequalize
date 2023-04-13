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
app.get('/querydata',usercontroller.Querydata)
app.get('/getdatabycount',usercontroller.findcount)
app.get('/findandcreate',usercontroller.findandcreate)
app.get('/getvituates',usercontroller.getvirtuates)
app.get('/virtual',usercontroller.virtual)
app.get('/validate',usercontroller.validateuser)
app.get('/rawquery',usercontroller.rawquery)
app.get('/onetoone',usercontroller.oneTooneuser)
app.get('/onetomany',usercontroller.onetoMany)
app.get('/manytomany',usercontroller.ManytoMany)
app.get('/paranoid',usercontroller.paranoid)
app.get('/lazyloading',usercontroller.lazyloading)
app.get('/eageruser',usercontroller.eageruser)
app.get('/creator',usercontroller.creator)
app.get('/employeedata',usercontroller.employeedata)
app.get('/Mnassociation',usercontroller.Mnassociation)
app.get('/Mncomplexassociation',usercontroller.Mncomplexassociation)
app.get('/m2m2m',usercontroller.m2m2m)
app.get('/associationScope',usercontroller.associationScope)
app.get('/transaction',usercontroller.transaction)
app.listen(8080,function check(err){
    if(err){
        console.log("error generate");   
    }
    else{
        console.log('successfully connected on port number 8080');
    }
})