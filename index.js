const {create} = require("ipfs-http-client");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();


const ipfs = create('http://127.0.0.1:45005');

app.get('/upload-file', async function (req, res) {
    const fileUpload = await ipfs.add(req.query.image);
    res.send(fileUpload);
  });

  app.get('/',function (req,res) {
    res.sendFile("./index.html",{root: __dirname });
  });



const addFile =  async() => {
    const imagePath = path.join(__dirname,'./Screenshot from 2021-11-29 17-10-37.png');
    let testFile = fs.readFileSync(imagePath);
    let testBuffer = new Buffer.from(testFile);
    const uploadImage = await ipfs.add(testBuffer);
    console.log(uploadImage);
}

addFile();

app.listen(3000,() =>{
    console.log('App running in 3000 port');
});