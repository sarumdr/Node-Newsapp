const express=require('express');
const axios=require('axios');
const bodyParser = require('body-parser');
var mongoose=require('mongoose');
require('dotenv').config()
var router = express.Router();

mongoose.connect('mongodb://localhost/IDA')
var db = mongoose.connection

var News = require('../models/newsdata');

router.get('/',(req,res)=>{
    console.log(URL);
    let postArray=[]
axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`)
      .then((response) => {
        let data = response && response.data && response.data.articles ;
         console.log('response', data)
         //News.insertMany({data});
         data.forEach(element => {
           
           console.log('data',element.title)
      News.insertMany(data, function(err, docs) {
        if(err){
          console.log(err);
        }
      });
     })
      })
      .catch(function (error) {
        // handle error
        console.log('err',error);
      });
    })

router.get('/shownews',(req,res)=>{
  News.find(function(err,data){
    res.send(JSON.stringify({data}));
    console.log(data);
   // res.render('home',{post:data})
  });
})

module.exports=router;
