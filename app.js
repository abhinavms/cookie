const express = require('express');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8080

const app = express();
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'ejs');

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
    res.cookie('test_cookie', randomNumber, { maxAge: 3600, httpOnly: true, path:'/', sameSite: "none", secure: true });
    res.redirect('checkCookie');
  } else {
    res.render("login", { cookie: cookie });
  } 
});

app.get('/checkCookie', (req,res)=> {
    var cookie = req.cookies.test_cookie;
    var success = cookie ? true : false;

    res.render("checkCookie", {
      cookie: cookie,
      success: success
    });
});

app.listen(port, () => 
    console.log(`Cookie app listening on port ${port}!`)
);
