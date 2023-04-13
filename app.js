const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))
app.set('view engine' , 'ejs')
app.use(express.urlencoded({ extended: true }));
var  nameuser;
var  codeuser;


//auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 


//connect database
const mongoose = require('mongoose');
const { CLIENT_RENEG_LIMIT } = require('tls')
 
mongoose.connect("mongodb+srv://alrawilath:ASDfg12345678@cluster0.z6g42nd.mongodb.net/alldata?retryWrites=true&w=majority")
  .then((result) => {
    app.listen(port, () => {
      
      console.log(` app listening on http://localhost:${port}`)
    })
  }).catch((err) => {
    console.log(err)


  })

app.get('/'  , function(req , res){
res.render('call')

})

app.get('/registe'  , function(req , res){
  res.render('index' )
  
  })
  

const Article = require("./model/infoschema.js");
const { render, name } = require('ejs')
app.post('/'  , async(req,res) => {
  
  //thename and the mark
  let requast =req.body
  requast.thenum = []
let array = []
  let y = []
  let x = []
  let key = Object.keys(requast)
  
  for( var j = 0;j<key.length ; j++){
    if(key[j] !=='name' && key[j] !=='code' && key[j] !=='num' && key[j] !=='sel' && key[j] !=='sel2'
    && key[j] !== 'thenum'){
  
 requast.thenum.push(key[j])
 y.push(key[j])
 array.push(requast[key[j]])




  }}

requast.arrnum = array

// check if the name is exist
let foundUser = await Article.findOne({num:req.body.num})
if(foundUser){
  res.send(" <style>body{background:#222} </style> <div align ='center' style='color:white' ><h2>the num is already exist</h2></div><div align='center'><a href='/'><button>try again</button></a></div>");
return false
}
  
  const article = new Article(req.body);
console.log(req.body)
article
.save()
.then((result) => {res.redirect('/')})
.catch()
})

 app.post('/registe' , async (req,res) => {

try{
const name = req.body.name
const code = req.body.code
if(code == '' ){
 
  res.redirect('/registe')
return false
}else if(name == ''){
  res.redirect('/registe')
return false
}

nameuser = await Article.findOne({name:name} )
if(nameuser == null){
  res.status(400).send('error')
return false
}
if(nameuser.code ==code){
  app.get('/update' , (req,res) => {

Article.findById(nameuser.id ).then((result) => {
res.render('callupdate' , {info : result})

})
.catch((err) => {
  console.log(err)

})

})
res.redirect('/update')



}else{
  
res.status(400).send('error')
return false
}
}

catch(error){
console.log(error)


}

 })


 

app.post('/update' ,async (req,res) => {
try{
await Article.deleteOne({name:nameuser.name})

req.body.status = 'updated'

 //thename and the mark
 let requast =req.body
 requast.thenum = []
let array = []
 let y = []
 let x = []
 let key = Object.keys(requast)
 
 for( var j = 0;j<key.length ; j++){
   if(key[j] !=='name' && key[j] !=='code' && key[j] !=='num' && key[j] !=='sel' && key[j] !=='sel2'
   && key[j] !== 'thenum' && key[j] !== 'status'){
 
requast.thenum.push(key[j])
y.push(key[j])
array.push(requast[key[j]])




 }}

requast.arrnum = array



const articleupdate = new Article(requast);
console.log(requast)
articleupdate
.save()
.then()
.catch()

res.send(" <style>body{background:#222} </style> <div align ='center' style='color:white' ><h2>update successful</h2></div>");
}

catch(error){

res.send('Internal server error')

}

})
