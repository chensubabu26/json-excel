//importing sample.json
const allUsers = require('./sample.json');
//import fs -> path, express -> server, jsonexport -> exporter, csvConverter.
const fs = require('fs');
const app = require('express')();
var jsonexport = require('jsonexport');
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');
const path = require('path');
const filename = 'sample.csv';

app.get('/',(req,res) => {
  res.send('Export of json to excel is done... pls check the file directory.');
})

var convert = function () {
  jsonexport(allUsers,(err,csv) => {
    fs.writeFileSync(filename, csv, 'binary', (err) => {
       if (err) {
             console.log("writeFileSync :", err);
        }
      console.log( filename+" file is saved!");
   });
 });

 let source = path.join(__dirname, 'sample.csv');
 let destination = path.join(__dirname, 'output.xlsx');
  try {
    convertCsvToXlsx(source, destination);
    fs.unlink('sample.csv',(err) => {
      if(err){
        console.log(err);
      }
    })
  } catch (e) {
    console.log(e.toString());
  }
}

app.listen(3001, () => {
  console.log("app is running on port 3001");
  convert();
})