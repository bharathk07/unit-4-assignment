const express=require('express');
const app= express();
const data=require('./data')

app.get("/",function (req, res){
    console.log("ha");
    res.send("hello")
})


app.get("/book",logger, (req, res)=>{
  return res.send("No books")
})

app.get("/book/:name",auth, (req, res)=>{
  res.send({bookname:req.params.name});    
})
function logger(req, res, next){
    console.log("Fetching all books")
    next();
}
function auth(req, res, next){
    console.log(req.params.name);

    next();
}
app.listen(4000,() =>{
   
    console.log('listening on 4000');
});