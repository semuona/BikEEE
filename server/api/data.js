const express = require("express");
const csvtojson = require("csvtojson");

const router = express.Router();

const filePath = require("path").resolve(__dirname, "../data/data.csv");
let data = [];

//retrieving all data from csv file // vertical
const getData = async () => {
  if (data.length === 0) {
    data = await csvtojson().fromFile(filePath);
  }

  return data;
};
getData();

// add the lines that is less than 6 to this variable.   // horizontal
let inputToFix = [];
const getDataByLine = async () => {
  await csvtojson({ output: "line" })
    .fromFile(filePath)
    .subscribe((csvLine, num) => {
      if (csvLine.split(",").length !== 6) {
        inputToFix.push(csvLine);
      }
    });

  return inputToFix;
};
getDataByLine();

router.get("/fetch", (req, res) => {
  try {
    res.send({ success: true, data, inputToFix });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
