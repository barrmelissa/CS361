/*Team project
CS 361-400-F18
TeachMe Project
11/26/18
*/

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4455);

app.get('/',function(req,res,next){
  	
		res.render('home');
});

app.get('/new_user',function(req,res,next){
    
    res.render('new_user');
});

app.get('/login',function(req,res,next){
    
    res.render('login');
});


app.get('/search',function(req,res,next){
    
  var context = {fname: "TeachMe", lname: "User", dataList: null, id: req.query.id};

  mysql.pool.query('SELECT fname, lname FROM users_teachme WHERE id = ?',
   [[req.query.id]], 
   function(err, rows, fields){
    if (err){
          next(err);
        }

    if (rows[0]){

      context.fname = rows[0].fname;
      context.lname = rows[0].lname;

      mysql.pool.query('SELECT name, classTime, description, expectations, prerequisites, location, syllabus,' +
       ' rating, main_image, class_page FROM class_teachme WHERE id NOT IN (SELECT c.id FROM users_teachme u' + 
       ' INNER JOIN user_classes uc ON u.id = uc.uid' + ' INNER JOIN class_teachme c ON uc.cid = c.id WHERE u.id = ?)',
      [[req.query.id]], 
         function(err, rows, fields){
          if (err){
                next(err);
              }

            context.dataList = rows;

            res.render('search', context); 
          
         });
    }
    else{
      res.render('user_home', context);
    }
  }); 
});


app.get('/bread_course',function(req,res,next){
    
  var context = {fname: "TeachMe", lname: "User", id: req.query.id, enrolled: 0};

   mysql.pool.query('SELECT fname, lname FROM users_teachme WHERE id = ?',
   [[req.query.id]], 
   function(err, rows, fields){
    if (err){
          next(err);
        }

    if (rows[0]){

      context.fname = rows[0].fname;
      context.lname = rows[0].lname;

      mysql.pool.query('SELECT uc.uid FROM user_classes uc INNER JOIN class_teachme c ON uc.cid = c.id WHERE c.name =' +
        ' "Bread Making" AND uc.uid = ?',
        [[req.query.id]], 
         function(err, rows, fields){
          if (err){
                next(err);
              }
          if (rows[0]){
            context.enrolled = 1;
            res.render('bread_course', context);
          }
          else{
            res.render('bread_course', context);
          }
        });
      
    }
    else{
      res.render('bread_course', context);
    }
   }); 
    
});



app.get('/node_course',function(req,res,next){
    
  var context = {fname: "TeachMe", lname: "User", id: req.query.id, enrolled: 0};

   mysql.pool.query('SELECT fname, lname FROM users_teachme WHERE id = ?',
   [[req.query.id]], 
   function(err, rows, fields){
    if (err){
          next(err);
        }

    if (rows[0]){

      context.fname = rows[0].fname;
      context.lname = rows[0].lname;



      mysql.pool.query('SELECT uc.uid FROM user_classes uc INNER JOIN class_teachme c ON uc.cid = c.id WHERE c.name =' +
        ' "Web Development with Node JS" AND uc.uid = ?',
        [[req.query.id]], 
         function(err, rows, fields){
          if (err){
                next(err);
              }
          if (rows[0]){
            context.enrolled = 1;
            res.render('node_course', context);
          }
          else{
            res.render('node_course', context);
          }
        });
      
    }
    else{
      res.render('node_course', context);
    }
   }); 
    
});





app.get('/wood_course',function(req,res,next){
    
  var context = {fname: "TeachMe", lname: "User", id: req.query.id, enrolled: 0};

   mysql.pool.query('SELECT fname, lname FROM users_teachme WHERE id = ?',
   [[req.query.id]], 
   function(err, rows, fields){
    if (err){
          next(err);
        }

    if (rows[0]){

      context.fname = rows[0].fname;
      context.lname = rows[0].lname;

      mysql.pool.query('SELECT uc.uid FROM user_classes uc INNER JOIN class_teachme c ON uc.cid = c.id WHERE c.name =' +
        ' "Woodworking" AND uc.uid = ?',
        [[req.query.id]], 
         function(err, rows, fields){
          if (err){
                next(err);
              }
          if (rows[0]){
            context.enrolled = 1;
            res.render('wood_course', context);
          }
          else{
            res.render('wood_course', context);
          }
        });
      
    }
    else{
      res.render('wood_course', context);
    }
   }); 
    
});



app.get('/user_home',function(req,res,next){
    
   var context = {fname: "TeachMe", lname: "User", sname: "", id: req.query.id};

   mysql.pool.query('SELECT fname, lname FROM users_teachme WHERE id = ?',
   [[req.query.id]], 
   function(err, rows, fields){
    if (err){
          next(err);
        }

    if (rows[0]){

      context.fname = rows[0].fname;
      context.lname = rows[0].lname;
      context.sname = rows[0].fname;
      res.render('user_home', context);
    }
    else{
      res.render('user_home', context);
    }
   }); 
   
    
});

app.get('/calendar',function(req,res,next){
    
   var context = {fname: "TeachMe", lname: "User", sname: "", id: req.query.id};

   mysql.pool.query('SELECT fname, lname FROM users_teachme WHERE id = ?',
   [[req.query.id]], 
   function(err, rows, fields){
    if (err){
          next(err);
        }

    if (rows[0]){

      context.fname = rows[0].fname;
      context.lname = rows[0].lname;
      res.render('calendar', context);
    }
    else{
      res.render('calendar', context);
    }
   }); 
   
    
});

app.get('/add_course',function(req,res,next){
    
   var context = {fname: "TeachMe", lname: "User", sname: "", dataList: null,
                  id: req.query.id, new: 0, error: 0, cname: req.query.course};

   mysql.pool.query('SELECT fname, lname FROM users_teachme WHERE id = ?',
   [[req.query.id]], 
   function(err, rows, fields){
    if (err){
          next(err);
        }

    if (rows[0]){

      context.fname = rows[0].fname;
      context.lname = rows[0].lname;

      mysql.pool.query('INSERT INTO user_classes (uid, cid) SELECT ?, id FROM class_teachme WHERE name = ?',
        [[req.query.id], [req.query.course]], 
         function(err, result, fields){
          if (err){
                next(err);
              }
          if (result.affectedRows > 0){
            context.new = 1;
          }
          else{
            context.error = 1;
          }

          mysql.pool.query('SELECT c.name, c.classTime, c.description, c.expectations, c.prerequisites, c.location, c.syllabus,' +
         ' c.rating, c.main_image, c.class_page FROM users_teachme u INNER JOIN user_classes uc ON u.id = uc.uid' + 
         ' INNER JOIN class_teachme c ON uc.cid = c.id WHERE u.id = ?',
         [[req.query.id]], 
         function(err, rows, fields){
          if (err){
                next(err);
              }

            context.dataList = rows;

            res.render('class', context); 
          
         });
        });
      
    }
    else{
      res.render('user_home', context);
    }
   }); 

    
});

/////////////// CLASS /////////////////////
app.get('/class',function(req,res,next){
    
  var context = {fname: "TeachMe", lname: "User", dataList: null, id: req.query.id};

  mysql.pool.query('SELECT fname, lname FROM users_teachme WHERE id = ?',
   [[req.query.id]], 
   function(err, rows, fields){
    if (err){
          next(err);
        }

    if (rows[0]){

      context.fname = rows[0].fname;
      context.lname = rows[0].lname;

      mysql.pool.query('SELECT c.name, c.classTime, c.description, c.expectations, c.prerequisites, c.location, c.syllabus,' +
       ' c.rating, c.main_image, c.class_page FROM users_teachme u INNER JOIN user_classes uc ON u.id = uc.uid' + 
       ' INNER JOIN class_teachme c ON uc.cid = c.id WHERE u.id = ?',
      [[req.query.id]], 
         function(err, rows, fields){
          if (err){
                next(err);
              }

            context.dataList = rows;

            res.render('class', context); 
          
         });
    }
    else{
      res.render('user_home', context);
    }
  }); 
});
   


app.post('/', function(req,res,next){

  
  if(req.body["get_users"]){

    mysql.pool.query('SELECT lname, fname, email, DATE_FORMAT(dob, "%M %e, %Y") AS dobFt FROM users_teachme ORDER BY lname', 
      function(err, rows, fields){
        if (err){
          next(err);
        }

        res.type('application/json');
        res.send(JSON.stringify(rows));

      });
  }


  if(req.body["user_valid"]){

    mysql.pool.query('SELECT password, id FROM users_teachme WHERE email = ?',
    [[req.body.email]], 
      function(err, rows, fields){
        if (err){
          next(err);
        }

        if (!rows[0]){
          res.type('application/json');
          res.send(JSON.stringify({ie:1}));
        }
        else if (rows[0].password !== req.body.password){
          res.type('application/json');
          res.send(JSON.stringify({ip:1}));
        }
        else{
          res.type('application/json');
          res.send(JSON.stringify({ok:1, id: rows[0].id}));
        }

      });
  }


  if(req.body["user_insert"]){

    mysql.pool.query('INSERT INTO users_teachme (fname, lname, dob, password, student, teacher, email, bio, edu) VALUES (?)',
    [[req.body.fname, req.body.lname, req.body.dob, req.body.password, req.body.student, req.body.teacher, 
     req.body.email, req.body.bio, req.body.edu]],
    function(err, result, fields){
      if (err){
        if (err.errno == 1062){
          res.type('application/json');
          res.send(JSON.stringify({dup:1}));
        }
        else{
          next(err);

        }

        return;
      }

      mysql.pool.query('SELECT id FROM users_teachme WHERE email = ?',
      [[req.body.email]], 
      function(err, rows, fields){
        if (err){
          next(err);
        }

        if (!rows[0]){
          res.type('application/json');
          res.send(JSON.stringify({na:1}));
        }
        else{
          res.type('application/json');
          res.send(JSON.stringify({ok:1, id: rows[0].id}));
        }

      });
    });
  }

});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on flip2.engr.oregonstate.edu:4455' + '; press Ctrl-C to terminate.');
});



