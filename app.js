
// Requiring module
const express = require('express');
var connection = require('./db');
const multer = require("multer")
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const cors=require("cors");
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const options ={
  password: "admin",
  user: "root",
  database: "davpg",
  host: "localhost",
  port: 3306,
  createDatabaseTable: true
}
const TWO_HOURS = 1000 * 60 * 60 * 2
const  sessionStore = new mysqlStore(options);
// Creating express object
const app = express();
app.use(cors());
app.use(session({
  name: 'test',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  secret: 'dfr324567u6uhbfgfgh8iijmn',
  cookie: {
      httpOnly: true,
      maxAge: TWO_HOURS,
      sameSite: true,
      secure: false
  }
}))
app.use(express.static('public'));
var bodyParser=require("body-parser");
const con = require('./db');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

let header_marquee_data = undefined;
function fetchMarqueeDetails(callback) {
  const query = 'SELECT * FROM davpg.news_events_marquee ORDER BY ID DESC;';
  connection.query(query, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
fetchMarqueeDetails((error, results) => {
  if (error) {
    console.error('Error fetching marquee details:', error);
  } else {
    header_marquee_data = results;
  }
});
 // Handling GET request
 app.get('/', (req, res) => {
  res.render('index',{send : header_marquee_data, header_marquee_data});
});
const IsAuth=(req,res,next)=>{
  if(req.session.isAuth){
    next()
  }else{
    res.render('login',{message:false});
  }
}
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
app.get('/facultylogin', (req, res) => {
  res.render('faculty_admin_login');
});
app.get('/addfaculty', (req, res) => {
  res.render('addfaculty');
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
      if(data.lenght<0 || data[0]["Pass"]!=pass)
        res.render('login',{message:true});
      else{
        if(data[0]["UserType"]=="Admin" || data[0]["UserType"]=="admin" ){
          req.session.isAuth = true;
          req.session.username = data[0]["Id"];
          res.render('admin_dashboard');
        }
        else
          res.render('faculty');
      }
    }
  });
});
app.get('/viewNews', IsAuth, (req, res) => {
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
app.get('/viewalumni', IsAuth,(req, res) => {
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
app.get('/delete_news/:id/:file?', IsAuth,(req, res) => {
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
app.get('/uploadNews', IsAuth, (req, res) => {
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
app.get('/addfaculty', IsAuth, (req, res) => {
  res.render('addfaculty');
});
app.post('/addfaculty', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const psw = req.body.psw;
  const department = req.body.dept;
  const designation = req.body.designation;
  const userType = 'Faculty';

  // Insert data into the user table
  const insertUserQuery = 'INSERT INTO davpg.user (Id, Pass, UserType) VALUES (?, ?, ?)';
  connection.query(insertUserQuery, [email, psw, userType], (err, result) => {
    if (err) {
      console.error('Error inserting user data:', err);
      res.status(500).json({ error: 'An error occurred while registering faculty.' });
      return;
    }
    console.log('User registered successfully');
    // console.log(JSON.stringify(result));

    // Insert data into the faculty table using the retrieved user ID
    const insertFacultyQuery = 'INSERT INTO davpg.faculty (Id, Name, Department, Designation) VALUES (?, ?, ?, ?)';
    connection.query(insertFacultyQuery, [email, name, department, designation], (err, result) => {
      if (err) {
        console.error('Error inserting faculty data:', err);
        res.status(500)({ error: 'An error occurred while saving faculty data.' });
        return;
      }

      console.log('Faculty data saved successfully');
      res.status(200).json({ message: 'Faculty data saved successfully' });
      res.redirect('/addfaculty');
    });
  });
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

// app.post('/updateFaculty', (req, res) => {
//   // Extract data from request body
//   const { id, newData } = req.body;

//   // Check if data already exists for the given ID
//   const query = 'SELECT * FROM faculty, WHERE id = ?';
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error checking data:', err);
//       res.status(500).json({ error: 'An error occurred while checking data' });
//       return;
//     }

//     if (results.length === 0) {
//       // No existing data, insert new data
//       const insertQuery = 'INSERT INTO your_table (id, column1, column2, ...) VALUES (?, ?, ?, ...)';
//       const params = [id, newData.column1, newData.column2, ...]; // Adjust as per your columns
//       connection.query(insertQuery, params, (err, result) => {
//         if (err) {
//           console.error('Error inserting data:', err);
//           res.status(500).json({ error: 'An error occurred while inserting data' });
//           return;
//         }
//         res.status(200).json({ message: 'Data inserted successfully' });
//       });
//     } else {
//       // Existing data found, update data
//       const updateQuery = 'UPDATE your_table SET column1 = ?, column2 = ?, ... WHERE id = ?';
//       const params = [newData.column1, newData.column2, ..., id]; // Adjust as per your columns
//       connection.query(updateQuery, params, (err, result) => {
//         if (err) {
//           console.error('Error updating data:', err);
//           res.status(500).json({ error: 'An error occurred while updating data' });
//           return;
//         }
//         res.status(200).json({ message: 'Data updated successfully' });
//       });
//     }
//   });
// });



app.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
});
// Port Number
const PORT = process.env.PORT ||8000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));