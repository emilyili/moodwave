import * as d3 from "d3";

function parseCSV(file) {
  var timeParser = d3.timeParse("%d %b %Y, %H:%M");
  var data = d3.csv(file, function (d) {
    return {
      timestamp: timeParser(d.utc_time),
      artist: d.artist,
      album: d.album,
      song: d.track
    };
  });

  // process songs played on each date 
  var countDate = [];
  var prevDate = d3.timeDay(data[data.length - 1].timestamp);
  var temp = {};
  var songs = [];

  data.forEach(function (d) {
    var date = d3.timeDay(d.timestamp);
    if (prevDate.valueOf() !== date.valueOf()) {
      countDate.push({});
      countDate[countDate.length - 1].date = d3.timeDay(d.timestamp);
      countDate[countDate.length - 1].frequency = 1;
      countDate[countDate.length - 1].topsongs = [];

      //for top songs
      songs = countDate[countDate.length - 1].topsongs;

      temp = {};
      temp[d.song] = 1;
      songs.push({});
      songs[songs.length - 1].singer = d.artist;
      songs[songs.length - 1].name = d.song;
      songs[songs.length - 1].songFrequency = 1;
    } else {
      countDate[countDate.length - 1].frequency = countDate[countDate.length - 1].frequency + 1;

      //for top songs
      if (!temp[d.song]) {
        temp[d.song] = 1;
        songs.push({});
        songs[songs.length - 1].singer = d.artist;
        songs[songs.length - 1].name = d.song;
        songs[songs.length - 1].songFrequency = 1;
      } else {
        songs[songs.length - 1].songFrequency = songs[songs.length - 1].songFrequency + 1;
      }
    }

    countDate[countDate.length - 1].topsongs.sort(function (a, b) {
      return b.songFrequency - a.songFrequency;
    });

    prevDate = date;
  });

  return countDate;
}

function join(lookupTable, mainTable, lookupKey, mainKey, select) {
  var l = lookupTable.length,
    m = mainTable.length,
    lookupIndex = [],
    output = [];
  for (var i = 0; i < l; i++) { // loop through l items
    var row = lookupTable[i];
    lookupIndex[row[lookupKey]] = row; // create an index for lookup table
  }
  for (var j = 0; j < m; j++) { // loop through m items
    var y = mainTable[j];
    var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
    output.push(select(y, x)); // select only the columns you need
  }
  return output;
}

parseCSV('datasets/scrobbles-akerblomman-1617639941.csv');



// import d3 from "d3";
// var d3 = d3;

// var fs = require('fs');
// const path = require('path');
// const mysqlConnection = require('./connection');
// const fastcsv = require('fast-csv');

var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({ columns: true }, function (err, records) {
  console.log(records);
});

fs.createReadStream(__dirname + '../../datasets/lastfm/scrobbles-mibbie99-1617637884.csv').pipe(parser);


//Hard coded directory has been used.
//Put your path here...
// const currDir = path.join('../../datasets/lastfm');

// console.log(currDir)
//Function to get the filenames present
//in the directory
// const readdir = (dirname) => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(dirname, (error, filenames) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(filenames);
//         console.log(filenames);
//       }
//     });
//   });
// };

// function parseCSV(file) {
//   var timeParser = d3.timeParse("%d %b %Y, %H:%M");
//   var data = d3.csv(file, function (d) {
//     console.log("hi")
//     };
//   });
// for()
// $.ajax({
//   url: 'csv_data.csv',
//   dataType: 'text',
// }).done(successFunction);

//   // process songs played on each date 
//   var countDate = [];
//   var prevDate = d3.timeDay(data[data.length - 1].timestamp);
//   var temp = {};
//   var songs = [];

//   data.forEach(function (d) {
//     var date = d3.timeDay(d.timestamp);
//     if (prevDate.valueOf() !== date.valueOf()) {
//       countDate.push({});
//       countDate[countDate.length - 1].date = d3.timeDay(d.timestamp);
//       countDate[countDate.length - 1].frequency = 1;
//       countDate[countDate.length - 1].topsongs = [];

//       //for top songs
//       songs = countDate[countDate.length - 1].topsongs;

//       temp = {};
//       temp[d.song] = 1;
//       songs.push({});
//       songs[songs.length - 1].singer = d.artist;
//       songs[songs.length - 1].name = d.song;
//       songs[songs.length - 1].songFrequency = 1;
//     } else {
//       countDate[countDate.length - 1].frequency = countDate[countDate.length - 1].frequency + 1;

//       //for top songs
//       if (!temp[d.song]) {
//         temp[d.song] = 1;
//         songs.push({});
//         songs[songs.length - 1].singer = d.artist;
//         songs[songs.length - 1].name = d.song;
//         songs[songs.length - 1].songFrequency = 1;
//       } else {
//         songs[songs.length - 1].songFrequency = songs[songs.length - 1].songFrequency + 1;
//       }
//     }

//     countDate[countDate.length - 1].topsongs.sort(function (a, b) {
//       return b.songFrequency - a.songFrequency;
//     });

//     prevDate = date;
//   });

//   return countDate;
// }

// function join(lookupTable, mainTable, lookupKey, mainKey, select) {
//   var l = lookupTable.length,
//     m = mainTable.length,
//     lookupIndex = [],
//     output = [];
//   for (var i = 0; i < l; i++) { // loop through l items
//     var row = lookupTable[i];
//     lookupIndex[row[lookupKey]] = row; // create an index for lookup table
//   }
//   for (var j = 0; j < m; j++) { // loop through m items
//     var y = mainTable[j];
//     var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
//     output.push(select(y, x)); // select only the columns you need
//   }
//   return output;
// }

// parseCSV('datasets/scrobbles-akerblomman-1617639941.csv');

// function hi() {
//     console.log("hi") 
// }
// console.log("hi")

//dateParser = d3.timeParse("%m/%e/%Y");
