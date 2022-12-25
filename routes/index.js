var express = require('express');
var router = express.Router();

const fs = require("fs");
const path = require("path");

/* GET home page. */
router.get('/', function (req, res, next) {
  const files = fs.readdirSync(
    path.join(
      __dirname, "..", "public", "fileFolder"
    )
  );

  res.render('index', { files, filedata: null, filename: null });
});

router.post('/create', function (req, res, next) {

  fs.writeFileSync(
    path.join(
      __dirname, "..", "public", "fileFolder", req.body.filename
    ),
    "hello!!!"
  );

  res.redirect("/");

});

router.get('/delete/:filename', function (req, res, next) {

  fs.unlinkSync(
    path.join(
      __dirname, "..", "public", "fileFolder", req.params.filename
    )
  );

  res.redirect('/');

});

router.get('/file/:filename', function (req, res, next) {

  const files = fs.readdirSync(
    path.join(
      __dirname, "..", "public", "fileFolder"
    )
  );

  const filedata = fs.readFileSync(
    path.join(
      __dirname, "..", "public", "fileFolder", req.params.filename
    ),
    "utf-8"
  );

  res.render("index", { files, filedata, filename: req.params.filename })

});


router.post('/update/:filename', function (req, res, next) {

  fs.writeFileSync(
    path.join(
      __dirname, "..", "public", "fileFolder", req.params.filename  
    ),
    req.body.data
  );

  res.redirect('/file/' + req.params.filename);

});



module.exports = router;
