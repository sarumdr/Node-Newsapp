const express=require('express');
const axios=require('axios');
const bodyParser = require('body-parser');
var mongoose=require('mongoose');
require('dotenv').config()
var router = express.Router();
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.connect('mongodb://localhost/News')
var db = mongoose.connection


var News = require('../models/newsdata');

router.get('/',(req,res)=>{
    console.log(URL);
    News.deleteMany().then(function(){ 
      console.log("Data deleted"); // Success 
  }).catch(function(error){ 
      console.log(error); // Failure 
  }); 
axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`)
      .then((response) => {
        let data = response && response.data && response.data.articles ;
      
         data.forEach((element,index) => {
        
      News.insertMany(data, function(err, docs) {
        if(err){
          console.log(err);
        }
         //console.log(docs);
      });
    res.render("home");
     })

      })
      .catch(function (error) {
        // handle error
        console.log('err',error);
      });
    })

    
    // router.get('/getnews', async (req, res, next) => {
     
    //   // This example assumes you've previously defined `Users`
    //   // as `const Users = db.model('Users')` if you are using `mongoose`
    //   // and that you are using Node v7.6.0+ which has async/await support
    //   try {
     
    //     const [ results, itemCount ] = await Promise.all([
    //       News.find({}).limit(10).skip(req.skip).lean().exec(),
    //       News.count({})
    //     ]);
     
    //     const pageCount = Math.ceil(itemCount / req.query.limit);
     
    //     if (req.accepts('json')) {
    //       // inspired by Stripe's API response for list objects
    //       res.json({
    //         object: 'list',
    //         has_more: paginate.hasNextPages(req)(pageCount),
    //         data: results
    //       });
    //     } else {
    //       console.log("result")
    //       res.render('home', {
    //         users: results,
    //         pageCount,
    //         itemCount,
    //         pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    //       });
    //     }
     
    //   } catch (err) {
    //     next(err);
    //   }
     
    // });

    router.get('/getnews',(req,res)=>{
      News.find(function(err,data){
        res.send(JSON.stringify({news:data}));
 console.log(data);
      }).sort( { publishedAt: 1 } ).limit(100);
    })
 
    let NewsId="5fbca1f9484b4e3c608a8f94";
    router.put('/edittask',(req,res)=>{
      const NewsId = req.body.id;
      console.log('edittask',NewsId); 
      //console.log(ObjectId(req.params.id));
      News.findOne({ _id: req.body.id }, function(err, data) {
          if(err){
              console.log(err);
          }
          console.log(data);
          res.send({title:data.title});
      });
  });

  router.post("/Edit1", (req, res) => {
    console.log("edittask1", NewsId);
    console.log("heelo");
    console.log(req.body);

    News.findOneAndUpdate(
      {_id: NewsId },
      { $set: { title: req.body.task} },
      function (err, task) {
        console.log('uppdate',task);
        console.log('err',err);
        res.redirect("/");
      }
    );
  
  });
  
module.exports=router;
