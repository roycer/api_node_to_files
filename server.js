const PORT = 3100;
const cors = require('cors');
const express = require('express');  
const app = express(); 
app.use(cors());
app.use('/cvs',express.static('cvs'));
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'cvs/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage });

app.use(express.json());  
app.use(express.urlencoded({extended: true}));

app.post('/api/cvs', upload.single('files'), (req, res, next) => {  

    if(req.file && req.file.filename){
        res.json(req.file.filename);
    }
    
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`))