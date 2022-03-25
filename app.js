const express = require('express');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8080

const app = express();
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/', (req,res)=> {
  res.redirect('login');
});

app.get('/login', (req,res)=> {
  var cookie = req.cookies.test_cookie;
  if (cookie === undefined) {
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2,randomNumber.length);
    res.cookie('test_cookie', randomNumber, { maxAge: 900000, httpOnly: true, path:'/', sameSite: "none", secure: true });
    res.redirect('checkCookie');
  } else {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end(`<h1>Login: Cookies were already set ^_^ !!</h1>
             <br>
             <h2> Value = ` + cookie + `</h2>
             <br>
             <a href="checkCookie">Check Cookie</a>`);
  } 
});

app.get('/checkCookie', (req,res)=> {
    var cookie = req.cookies.test_cookie;
    if (cookie === undefined) {
      res.writeHead(503, { 'Content-Type':'text/html'});
      res.end(`<h1>checkCookie: Login failed !! <br> Cookies were not set !!!</h1>
             <br>
             <a href="../login">Login again</a>`);
    } else {
      res.writeHead(200, { 'Content-Type':'text/html'});
      res.end(`<h1>checkCookie: Login successful. Cookies were set !!</h1>
               <br>
               <h2> Value = ` + cookie + `</h2>
               <br>
               <a href="../login">Login again</a>`);
    }
});

app.listen(port, () => 
    console.log(`Cookie app listening on port ${port}!`)
);
