
// Requiring module
const express = require('express');
var connection = require('./db');
const multer = require("multer")
const path = require('path');
const axios = require('axios');
const fs = require('fs');
// Creating express object
const app = express();
app.use(express.static('public'));
var bodyParser=require("body-parser");
const con = require('./db');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
 // Handling GET request
app.get('/', (req, res) => {
  var sql='SELECT * FROM davpg.news_events_marquee ORDER BY ID DESC;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      global.send=data;
      res.render('index',{send:data});
    }
  });
});
app.get('/login', (req, res) => {
        res.render('login',{message:false});
});
app.get('/ba', (req, res) => {
  res.render('ba');
});
app.get('/ma', (req, res) => {
  res.render('ma');
});
app.get('/gbody', (req, res) => {
  res.render('gbody');
});
app.get('/syllabus', (req, res) => {
  res.render('syllabus');
});
app.get('/launch', (req, res) => {
  res.render('launch');
});
app.get('/timetable', (req, res) => {
  res.render('timetable');
});
app.get('/alumniassoc', (req, res) => {
  res.render('alumniassoc');
});
app.get('/bsc', (req, res) => {
  res.render('bsc');
});
app.get('/bcom', (req, res) => {
  res.render('bcom');
});
app.get('/p_message', (req, res) => {
  res.render('p_message');
});
app.get('/vission', (req, res) => {
  res.render('vission');
});
app.get('/history', (req, res) => {
  res.render('history');
});
app.get('/practorial', (req, res) => {
  res.render('practorial');
});
app.get('/alumnireg', (req, res) => {
  res.render('alumnireg',{error:false});
});
app.get('/grievance', (req, res) => {
  res.render('grievance');
});
app.get('/research', (req, res) => {
  res.render('research');
});
app.get('/literary', (req, res) => {
  res.render('literary');
});
app.get('/career', (req, res) => {
  res.render('career');
});
app.get('/sexual', (req, res) => {
  res.render('sexual');
});
app.get('/admission', (req, res) => {
  res.render('admission');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/code_of_conduct', (req, res) => {
  res.render('code_of_conduct');
});
app.get('/m_message', (req, res) => {
  res.render('m_message');
});
app.post('/login_auth', (req,res)=>{
  var username=req.body.uname;
  var pass = req.body.psw;
  var sql='SELECT * FROM davpg.user WHERE Id="'+username+'";';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      console.log(pass=="admin@123")
      if(data.lenght<0 || data[0]["Pass"]!=pass)
        res.render('login',{message:true});
      else{
        if(data[0]["UserType"]=="Admin")
          res.render('admin_dashboard');
        else
          res.render('faculty');
      }
    }
  });
});
app.get('/viewNews', (req, res) => {
  var sql='SELECT * FROM davpg.news_events_marquee order by Type, ID DESC;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('viewNews',{send:data});
    }
  });
});
app.get('/viewallnews', (req, res) => {
  var sql='SELECT * FROM davpg.news_events_marquee WHERE Type="News" ORDER BY ID DESC;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('viewallnews',{send:data});
    }
  });
});
app.get('/viewallevent', (req, res) => {
  var sql='SELECT * FROM davpg.news_events_marquee WHERE Type="Events" ORDER BY ID DESC;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('viewallevent',{send:data});
    }
  });
});
app.get('/viewalumni', (req, res) => {
  var sql='SELECT * FROM davpg.alumni;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('viewalumni',{send:data});
    }
  });
});
app.get('/delete_news/:id/:file?', (req, res) => {
  var Id= req.params.id;
  var sql='DELETE FROM davpg.news_events_marquee WHERE Id='+Id;
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
        const deleteFile = './public/docs/'+req.params.file;
        if (fs.existsSync(deleteFile)) {
          fs.unlink(deleteFile, (err) => {
              if (err) {
                  console.log(err);
              }
          })
        }
      res.redirect(302, '/viewNews'); 
    }
  });
});
app.get('/uploadNews', (req, res) => {
  res.render('uploadNews');
});
app.get('/nonteaching', (req, res) => {
  res.render('nonteaching');
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/docs');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'application/pdf' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' || file.mimetype=='image/png' ) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
app.post('/uploadnews', upload.single('myfile'), (req, res, next) => {
  try {
        var type=req.body.type;
        var title = req.body.title;
        var fname;
        if(req.file)
          fname = req.file.filename;
        else
          fname='';
        var sql= 'INSERT INTO davpg.news_events_marquee (Title , Type , Link) VALUES (?,?,?);';
        connection.query(sql, [title,type,fname],function (err, data) {
          if (err){
            throw err;
          } 
          else{
            res.redirect(302, '/viewNews');
            }
        });
  } catch (error) {
      console.error(error);
  }
});
app.post('/reg_sub', upload.single('photo'), (req, res, next)=>{
  try{  
    console.log(req.file);
    var name_f=req.body.name;
    var father = req.body.father;
    var mother = req.body.mother;
    var email=req.body.email;
    var MoNo = req.body.MoNo;
    var dob = req.body.dob;
    var Address=req.body.Address;
    var gender = req.body.gender;
    var degree = req.body.degree;
    var year=req.body.year;
    var designation = req.body.designation;
    var workingplace = req.body.workingplace;
    var specialization = req.body.specialization;
    var fname = req.file.filename;
    var sql= 'INSERT INTO davpg.alumni (Name,Father,Mother,Dob,Address,Gender,Email,Mobile,Photo,Degree,YearofPassing,Designation,WorkingAddress,Specialization) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);';    
        connection.query(sql, [name_f,father,mother,dob,Address,gender,email,MoNo,fname,degree,year,designation,workingplace,specialization],function (err, data) {
          if (err){
            throw err;
          } 
          else{
            res.redirect(302,'/alumnireg');
            }
    });
  }catch (error) {
    console.error(error);
  }
});
// Port Number
const PORT = process.env.PORT ||8000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));