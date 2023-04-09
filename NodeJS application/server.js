var http = require('http');
var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
const fs = require('fs');
var mysql2 = require('mysql2');

app.listen(8080);

app.get('/', function(req, res){
    fs.readFile('home.html', function(err, data){
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
});

app.get('/signinform', function(req, res){
    fs.readFile('signin.html', function(err, data){
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
});

app.post('/signin', function(req, res){
    var username = req.body.user;
    var password = req.body.password;
    var signinmethod = req.body.signinmethod;

    var conn = mysql2.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"laser_app"
    });
    var params = [username, password];

    signinmethod = "login";
    if(signinmethod == "signup"){
        //DO SOMETHING
    }else if(signinmethod == "login"){
        conn.connect(function(err){
            if(err){
                console.log(err);
                conn.end();
                res.end("Encountered an error");
            }else{
                conn.query("select * from users where username=? and password=?;", params, function(err, result, fields){
                    if(err){
                        console.log(err);
                        conn.end();
                        res.end("Encountered an error");
                    }else{
                        if(result[0].username == username){
                            conn.end();
                            res.redirect("/");
                        }else{
                            console.log("ERR: There is no user " + username + " (with password " + password + ")");
                            conn.end();
                            res.end("Encountered an error");
                        }
                    }
                });
            }
        });
    }else{
        console.log("ERR: No such method for signing in");
        conn.end();
        res.end("Encountered an error");
    }
});

app.get('/order', function(req, res){
    fs.readFile('order.html', function(err, data){
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
});

app.post('/createDatabase', function(req, res){
    //var con, post, query;

    // Create a connection
    /*
    con = mysql2.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
    });
    */

    // Connect
    /*
    con.connect(function(err){
        if(err){
            console.log("ERR" + err);
            res.end("ERR" + err);
        }else{
            console.log("Connected!");

            // Send a query
            con.query("CREATE DATABASE mydb", function (err, result){
                if(err){
                }else{
                }
            });
        }
    });
    */
});