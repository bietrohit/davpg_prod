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
  password: "root",
  user: "root",
  database: "davpg",
  host: "127.0.0.1", 
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
app.set('views',path.join(__dirname, 'views'))
app.set("view engine", "ejs"); 

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const { isStringObject } = require('util/types');
const { title } = require('process');
const { error } = require('console');
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());



//dummy faculty json data
let props = {
  name: 'Dr. Rohit Kumar Tiwari',
  photo: 'http://www.mmmut.ac.in/News_content/IMGFaculty198.jpg',
  resume: 'https://www.davpgcollege.in/docs/Dr_Rajesh_Kumar.pdf',
  designation: 'Assistant Professor',
  phone: '1234567890',
  email: 'abs@gmail.com',
  department: 'Department of Computer Science',
  area_of_interest: 'Machine Learning, Data Science, Artificial Intelligence',
  highest_qualification: 'Ph.D.',
  teaching_experience: '10 years',
  publications_books_patents: '10',
  seminar_conference_workshop_organized: '20',
  seminar_conference_workshop_attended: '20',
  fellowship_awards: 'ministry of science and technology',
  membership: 'IEEE, ACM',
  masters_supervised: '10',
  phd_supervised: '5',
  other_info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum aliquam lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum aliquam.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum aliquam.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum aliquam.'
};
const experiences =[
  {
    from: '2010',
    to: '2015',
    position: 'Assistant Professor',
    organization: 'XYZ College'
  },
  {
    from: '2015',
    to: '2020',
    position: 'Associate Professor',
    organization: 'ABC College ' 
  },
  {
    from: '2020',
    to: 'Present',
    position: 'Professor',
    organization: 'DAVPG College'
  }
];
const awards =[
  {
    title: 'Best Faculty Award',
    year: '2015',
    organization: 'XYZ College'
  },
  {
    title: 'Best Faculty Award',
    year: '2016',
    organization: 'ABC College'
  },
  {
    title: 'Best Faculty Award',
    year: '2017',
    organization: 'DAVPG College'
  }
];
const qualifications =[{
  degree: 'Ph.D.',
  specialisation: 'Machine Learning',
  institute: 'IIT Kanpur',
  year: '2015'
  },
  {
    degree: 'M.Tech',
    specialisation: 'Data Science',
    institute: 'IIT Kanpur',
    year: '2010'
  },
  {
    degree: 'B.Tech',
    specialisation: 'Computer Science',
    institute: 'IIT Kanpur',
    year: '2008'
  }
];
const publications=[
  {
    title: 'Machine Learning',
    dept: 'Computer Science',
    category: 'Journal',
    year: '2015',
    month: '5',
    indexing: 'SCI',
    issn: '123456',
    impact: '5.6'
  },
  {
    title: 'Data Science',
    dept: 'Computer Science',
    category: 'Journal',
    year: '2016',
    month: '6',
    indexing: 'SCI',
    issn: '123456',
    impact: '5.6'
  },{
    title: 'Artificial Intelligence',
    dept: 'Computer Science',
    category: 'Journal',
    year: '2017',
    month: '7',
    indexing: 'SCI',
    issn: '123456',
    impact: '5.6'
  }
];



//function for fetching header marquee data
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
const IsAdmin=(req,res,next)=>{
  if(req.session.isAdmin){
    next()
  }else{
    res.render('login',{message:false,error:{
      status: 403,
      stack: 'You are not authorized to access this page'
    }});
  }
}
const IsFaculty=(req,res,next)=>{
  if(req.session.IsFaculty){
    next()
  }else{
    res.render('login',{message:false,error:{
      status: 403,
      stack: 'You are not authorized to access this page'
    }});
  }
}
 
app.get('/facutly_profile',(req,res)=>{
  // USERNAME WILL BE FETCHED FROM FROM CALLING FUNCTION
  var username = 'faculty@123';

  const sqlQueries = [
    'SELECT * FROM davpg.faculty WHERE Id="'+username+'";',
    'SELECT * FROM davpg.faculty_experience WHERE email="'+username+'";',
    'SELECT * FROM davpg.faculty_award WHERE email="'+username+'";',
    'SELECT * FROM davpg.faculty_qualification WHERE email="'+username+'";',
    'SELECT * FROM davpg.faculty_publication WHERE email="'+username+'";'
  ];

  Promise.all(sqlQueries.map(query => executeQuery(query)))
  .then((results) => {
    const [facultyDetails, experiences, awards, qualifications, publications] = results;
    res.render('faculty_profile', { results: facultyDetails, experiences, awards, qualifications, publications, header_marquee_data });
  }).catch((error) => {
      console.error('Error fetching faculty profile details:', error);
      res.status(500).send('Error fetching faculty profile details');
  });
});
 
function executeQuery(sqlQuery) {
  return new Promise((resolve, reject) => {
      connection.query(sqlQuery, (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      });
  });
}

app.get('/login', (req, res) => {
        res.render('login',{message:false,header_marquee_data,error:false});
});
app.get('/ba', (req, res) => {
  res.render('ba',{header_marquee_data});
});
app.get('/ma', (req, res) => {
  res.render('ma',{header_marquee_data});
});
app.get('/gbody', (req, res) => {
  res.render('gbody',{header_marquee_data});
});
app.get('/syllabus', (req, res) => {
  res.render('syllabus',{header_marquee_data});
});
app.get('/launch', (req, res) => {
  res.render('launch',{header_marquee_data});
});
app.get('/timetable', (req, res) => {
  res.render('timetable',{header_marquee_data});
});
app.get('/alumniassoc', (req, res) => {
  res.render('alumniassoc',{header_marquee_data});
});
app.get('/bsc', (req, res) => {
  res.render('bsc',{header_marquee_data});
});
app.get('/bcom', (req, res) => {
  res.render('bcom',{header_marquee_data});
});
app.get('/p_message', (req, res) => {
  res.render('p_message',{header_marquee_data});
});
app.get('/vission', (req, res) => {
  res.render('vission',{header_marquee_data});  
});
app.get('/history', (req, res) => {  
  res.render('history',{header_marquee_data}); 
});
app.get('/practorial', (req, res) => {
  res.render('practorial',{header_marquee_data});
});
app.get('/alumnireg', (req, res) => {
  res.render('alumnireg',{error:false,header_marquee_data});
});
app.get('/grievance', (req, res) => {
  res.render('grievance',{header_marquee_data});
});
app.get('/research', (req, res) => {
  res.render('research',{header_marquee_data});
});
app.get('/literary', (req, res) => {
  res.render('literary',{header_marquee_data});
});
app.get('/career', (req, res) => {
  res.render('career',{header_marquee_data});
});
app.get('/sexual', (req, res) => {
  res.render('sexual',{header_marquee_data});
});
app.get('/admission', (req, res) => {
  res.render('admission',{header_marquee_data});
});
app.get('/contact', (req, res) => {
  res.render('contact',{header_marquee_data});
});
app.get('/code_of_conduct', (req, res) => {
  res.render('code_of_conduct',{header_marquee_data});
});
app.get('/m_message', (req, res) => {
  res.render('m_message',{header_marquee_data});
});
app.post('/login_auth', (req,res)=>{
  var username=req.body.uname;
  var pass = req.body.psw;
  var sql='SELECT * FROM davpg.user WHERE Id="'+username+'";';
  var sql2 = 'SELECT * FROM davpg.faculty WHERE Id="'+username+'";';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      if(data.lenght<0 || data[0]["Pass"]!=pass)
        res.render('login',{message:true,error:{
          status: 403,
          stack: 'Invalid Username or Password'
        }
      });
      else{
        if(data[0]["UserType"]=="Admin"){
          req.session.isAdmin = true;
          req.session.username = data[0]["Id"];
          res.render('admin_dashboard');
        }
        else if(data[0]["UserType"]=="faculty"){
          connection.query(sql2, function (err2, data2) {
            if (err2){
              throw err2;
            } 
            else{
              req.session.IsFaculty = true;
              req.session.username = data[0]["Id"];
              res.render('faculty_dashboard',{results : data2,username, status: 200});
            }
          });
        }
      }
    }
  });
});
app.get('/viewNews', IsAdmin, (req, res) => {
  var sql='SELECT * FROM davpg.news_events_marquee order by Type, ID DESC;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('viewNews',{send:data,header_marquee_data});
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
      res.render('viewallnews',{send:data,header_marquee_data});
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
      res.render('viewallevent',{send:data,header_marquee_data});
    }
  });
});
app.get('/viewalumni',IsAdmin,(req, res) => {
  var sql='SELECT * FROM davpg.alumni;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('viewalumni',{send:data,header_marquee_data});
    }
  });
});
app.get('/delete_news/:id/:file?', IsAdmin,(req, res) => {
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
app.get('/faculty_experience_instance',IsFaculty, (req, res) => {
  res.render('partials/faculty_experience_instance');
});
app.get('/faculty_experience_upload',IsFaculty, (req, res) => {
  res.render('partials/faculty_experience_upload');
});
app.get('/faculty_awards_instance',IsFaculty, (req, res) => {
  res.render('partials/faculty_awards_instance');
});
app.get('/faculty_awards_upload',IsFaculty, (req, res) => {
  res.render('partials/faculty_awards_upload');
});
app.get('/faculty_qualifications_instance',IsFaculty, (req, res) => {
  res.render('partials/faculty_qualifications_instance');
});
app.get('/faculty_qualifications_upload',IsFaculty, (req, res) => {
  res.render('partials/faculty_qualifications_upload');
});
app.get('/faculty_publications_instance',IsFaculty, (req, res) => {
  res.render('partials/faculty_publications_instance');
});
app.get('/faculty_publications_upload',IsFaculty, (req, res) => {
  res.render('partials/faculty_publications_upload');
});

app.get('/uploadNews', IsAdmin, (req, res) => {
  res.render('uploadNews',{header_marquee_data});
});
app.get('/nonteaching', (req, res) => {
  res.render('nonteaching',{header_marquee_data});
});

app.get('/update_faculty_experience', IsFaculty, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM davpg.faculty_experience WHERE email="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('update_faculty_experience',{experiences:data,username});
    }
  });
});

app.get('/update_faculty_awards', IsFaculty, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM davpg.faculty_award WHERE email="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('update_faculty_awards',{awards:data,username});
    }
  });
});
app.get('/update_faculty_qualifications', IsFaculty, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM davpg.faculty_qualification WHERE email="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('update_faculty_qualifications',{qualifications:data,username});
    }
  });
});
app.get('/update_faculty_publications', IsFaculty, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM davpg.faculty_publication WHERE email="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('update_faculty_publications',{publications:data,username});
    }
  });
});
app.get('/faculty_dashboard', IsFaculty, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM davpg.faculty WHERE Id="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('faculty_dashboard',{results : data,username,status: 202});
    }
  });
});

app.get('/', IsAdmin,(req, res) => {
  var sql='SELECT * FROM davpg.alumni;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.render('viewalumni',{send:data,header_marquee_data});
    }
  });
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
app.post('/reg_sub', upload.single('photo') , (req, res, next)=>{
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

app.post('/update_faculty_details', upload.fields([{name:'photo',maxCount:1},{name:'resume',maxCount:1}]), (req, res, next)=>{
  try{  
    console.log(req.file);
    var {name, email, phone ,department, designation, highest_qualification, area_of_interest, teaching_experience, publications_books_patents, seminar_conference_workshop_organized,seminar_conference_workshop_attended , fellowship_awards, membership, masters_supervised, phd_supervised, other_info} = req.body;

    const newPhoto = req.files['photo'] ? req.files['photo'][0] : null;
    const newResume = req.files['resume'] ? req.files['resume'][0] : null;
    if(newPhoto){
      imageFile = newPhoto.filename;
      connection.query('update davpg.faculty set photo = ? where Id = ?',[imageFile,email],(err,data)=>{
        if(err) throw err;
        else console.log('Image updated');
      });
    }
    if(newResume){
      resumeFile = newResume.filename;
      connection.query('update davpg.faculty set resume = ? where Id = ?',[resumeFile,email],(err,data)=>{
        if(err) throw err;
        else console.log('Resume updated');
      });
    }
    
    var sql= 'UPDATE davpg.faculty SET phone=?, area_of_interest=?,highest_qualification=?, teaching_experience=?, publications_books_patents=?, seminar_conference_workshop_organized=?,seminar_conference_workshop_attended=? , fellowship_awards=?, membership=?, masters_supervised=?, phd_supervised=?, other_info=? WHERE Id = ?;';  
    connection.query(sql, [phone, area_of_interest,highest_qualification, teaching_experience, publications_books_patents, seminar_conference_workshop_organized,seminar_conference_workshop_attended , fellowship_awards, membership, masters_supervised, phd_supervised, other_info,email],function (err, data) {
      if (err){
        throw err;
      } 
      else{
        res.redirect('/faculty_dashboard');
      }
    });
  }catch (error) {
    console.error(error);
  }
});
app.post('/update_faculty_experience', (req, res, next) => {
  console.log(req.body);
  const { designation, _from, _to, organization } = req.body;
  const email = req.session.username;

  const sql = 'INSERT INTO davpg.faculty_experience (email, position, _from, _to, organization) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [email, designation, _from, _to, organization], function (err, data) {
    if (err) {
      console.error('Error inserting faculty experience:', err);
      return res.status(500).send('Error updating faculty experience');
    } 
    console.log('Faculty experience updated successfully');
    res.redirect('/update_faculty_experience');
  });
});

app.post('/update_faculty_award', (req, res, next) => {
  console.log(req.body);
  const { title,year, organization } = req.body;
  const email = req.session.username;

  const sql = 'INSERT INTO davpg.faculty_award (email,award , year,awarding_organization) VALUES (?, ?, ?, ?)';
  connection.query(sql, [email, title, year, organization], function (err, data) {
    if (err) {
      console.error('Error inserting faculty award:', err);
      return res.status(500).send('Error updating faculty award');
    } 
    console.log('Faculty award updated successfully');
    res.redirect('/update_faculty_awards');
  });
});

app.post('/update_faculty_qualification', (req, res, next) => {
  console.log(req.body);
  const { degree, specialisation, institute, year} = req.body;
  const email = req.session.username;

  const sql = 'INSERT INTO davpg.faculty_qualification (email,degree ,specialisation, institute, year) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [email, degree, specialisation,institute, year], function (err, data) {
    if (err) {
      console.error('Error inserting faculty qualification:', err);
      return res.status(500).send('Error updating faculty qualification');
    } 
    console.log('Faculty qualification updated successfully');
    res.redirect('/update_faculty_qualifications');
  });
});

app.post('/update_faculty_publication', (req, res, next) => {
  console.log(req.body);
  const { publication ,department , category, year, month, indexing, issn , impact} = req.body;
  const email = req.session.username;

  const sql = 'INSERT INTO davpg.faculty_publication (email,publication ,department , category, year, month, indexing, issn , impact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [email,publication ,department , category, year, month, indexing, issn , impact], function (err, data) {
    if (err) {
      console.error('Error inserting faculty publication:', err);
      return res.status(500).send('Error updating faculty publication');
    } 
    console.log('Faculty publication updated successfully');
    res.redirect('/update_faculty_publications');
  });
});

app.post('/delete_faculty_experience/:experienceId', (req, res) => {
  // Extract the experienceId from URL parameters
  const experienceId = req.params.experienceId;

  // Execute a DELETE query in the database
  const sql = 'DELETE FROM davpg.faculty_experience WHERE id = ?';
  connection.query(sql, [experienceId], function (err, result) {
      if (err) {
          console.error('Error deleting experience:', err);
          return res.status(500).send('Error deleting experience');
      } 
      console.log('Experience deleted successfully');
      res.redirect('/update_faculty_experience');
  });
});
app.post('/delete_faculty_award/:awardId', (req, res) => {
  // Extract the awardId from URL parameters
  const awardId = req.params.awardId;

  // Execute a DELETE query in the database
  const sql = 'DELETE FROM davpg.faculty_award WHERE id = ?';
  connection.query(sql, [awardId], function (err, result) {
      if (err) {
          console.error('Error deleting award:', err);
          return res.status(500).send('Error deleting award');
      } 
      console.log('Award deleted successfully');
      res.redirect('/update_faculty_awards');
  });
});

app.post('/delete_faculty_qualification/:qualificationId', (req, res) => {
  // Extract the qualificationId from URL parameters
  const qualificationId = req.params.qualificationId;

  // Execute a DELETE query in the database
  const sql = 'DELETE FROM davpg.faculty_qualification WHERE id = ?';
  connection.query(sql, [qualificationId], function (err, result) {
      if (err) {
          console.error('Error deleting qualification:', err);
          return res.status(500).send('Error deleting qualification');
      } 
      console.log('qualification deleted successfully');
      res.redirect('/update_faculty_qualifications');
  });
});

app.post('/delete_faculty_publication/:publicationId', (req, res) => {
  // Extract the publicationId from URL parameters
  const publicationId = req.params.publicationId;

  // Execute a DELETE query in the database
  const sql = 'DELETE FROM davpg.faculty_publication WHERE id = ?';
  connection.query(sql, [publicationId], function (err, result) {
      if (err) {
          console.error('Error deleting publication:', err);
          return res.status(500).send('Error deleting publication');
      } 
      console.log('publication deleted successfully');
      res.redirect('/update_faculty_publications');
  });
});

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