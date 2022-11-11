const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


//for deleting file id
// var fs = require('fs');
// fs.unlink('./public/uploads/myImage-1667484797900.png', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });
const deletefilename = async(1667485477720) => {
    let result = await fetch(`http://localhost:4000/filename$(id)`,{
        method:"Delete"
    });
};

// For renaming file ID
// var fs = require('fs');

// fs.rename('./public/uploads/myImage-1667485274375.png', './public/uploads/image', function (err) {
//   if (err) throw err;
//   console.log('File Renamed!');
// });


// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
}).single('myImage');

// Check File type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|png/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype  && extname){
        return cb(null,true);
    } else {
        cb('Error: Images only!');
    }
}

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
        res.render('index', {
          msg: err
        });
    } else {
        if(req.file ==undefined){
            res.render('index', {
                msg: 'Error: No File Selected!'
            });
        } else {
            res.render('index', {
                msg: 'File Uploaded!',
                file: `uploads/${req.file.filename}`
            })
        }
    }
  });
});

const port = 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
