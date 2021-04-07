import d3 from "d3";
var d3 = d3;

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




//dateParser = d3.timeParse("%m/%e/%Y");

