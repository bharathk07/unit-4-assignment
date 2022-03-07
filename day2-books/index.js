const express=require('express');
const app= express();


app.get("/",function (req, res){
    res.send("hello")
})


app.get("/book",function (req, res){
    res.send([
        {Author:"bharath",},
        {Author:"anirudh",},
        {Author:"gowtham",},
        {Author:"nikhil",},
    ]);
})


app.listen(4000,() =>{
   
    console.log('listening on 4000');
});