var express =   require("express");
var multer  =   require('multer');
var bodyParser = require('body-parser');
var cors        = require('cors');
var fs        = require('fs');
var app         =   express();
 

const path = require('path');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads/', express.static(__dirname + '/uploads/'));

var storage =   multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,'/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + path.extname(file.originalname))
  }
});
var upload = multer({ storage : storage}).single('userVideo');
 
app.post('/upload-avatar',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            console.log(err)
            return res.end("Error uploading file.");
        }
        // console.log("Req: ", req.file.filename)
        // console.log("Res: ", res);
        res.end(req.file.filename);
    });
});
 
 app.listen(3000);
