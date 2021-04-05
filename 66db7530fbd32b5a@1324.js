import define1 from "./cb0b2c11a90bc8ee@258.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["scrobbles-ylime329-1616440318.csv",new URL("./files/df3e62d5e953f647de908500920b2e62fdee6f4b6dd7f24a1bf21169779ca4295bfd005bea4e73ba20963f6ab47a3d1a67578b49867d3f2a8cd6ab1e045ba85a",import.meta.url)],["daily-mood-331.csv",new URL("./files/e8396eebc83791c7fb225829a4c4fbb3984b68b537b305a66f336c073561f58b65136ab26da089ac8950ed72557c122b6aca88846422617a1b81292674b73af8",import.meta.url)],["JamppaFL.csv",new URL("./files/2e334de38df8857461184802e6e8b540b5e2ad111f45d9038f6f31edcd2c082bd5901c87a75ec713723b785bb1e062270f15a4bdaa5c2cc4a702e218e2530bba",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# MoodWave`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
  .title {  
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    fill: #FFFFFF;
  }
  .heading {
   font-family: Montserrat;
   font-style: normal;
   font-weight: bold;
   font-size: 12px;
   line-height: 15px;
   fill: #FFFFFF;
  }
  .body {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    fill: #FFFFFF;
    overflow: hidden;
  }
</style>
`
)});
  main.variable(observer("username")).define("username", function(){return(
"chinaskixx"
)});
  main.variable(observer("data")).define("data", ["d3","url","timeParser"], function(d3,url,timeParser){return(
d3.csv(url, function(d) {
  return {
    timestamp : timeParser(d.utc_time),
    artist : d.artist,
    album : d.album,
    song : d.track
  };
})
)});
  main.variable(observer("dailyData")).define("dailyData", ["d3","data"], function(d3,data)
{
  // process songs played on each date 
  var countDate = [];
  var prevDate = d3.timeDay(data[data.length-1].timestamp);
  var temp = {};
  var songs = []
  data.forEach(function(d) {
    var date = d3.timeDay(d.timestamp);
    if(prevDate.valueOf() !== date.valueOf()){
      countDate.push({});
      countDate[countDate.length-1].date = d3.timeDay(d.timestamp);
      countDate[countDate.length-1].frequency = 1;
      countDate[countDate.length-1].topsongs = [];

      //for top songs
      songs = countDate[countDate.length-1].topsongs;
      
      temp = {};
      temp[d.song] = 1;
        songs.push({});
        songs[songs.length-1].singer = d.artist;
        songs[songs.length-1].name = d.song;
        songs[songs.length-1].songFrequency = 1;
    } else {
      countDate[countDate.length-1].frequency = countDate[countDate.length-1].frequency + 1;
      
      //for top songs
      if(!temp[d.song]){
        temp[d.song] = 1;
        songs.push({});
        songs[songs.length-1].singer = d.artist;
        songs[songs.length-1].name = d.song;
        songs[songs.length-1].songFrequency = 1;
      } else {
        songs[songs.length-1].songFrequency = songs[songs.length-1].songFrequency + 1;
      }
     }
    
    countDate[countDate.length-1].topsongs.sort(function(a,b) {
            return b.songFrequency - a.songFrequency;
          })
    
    // var top = countDate[countDate.length-1].topsongs;
    // if(top[d.song] === undefined){
    //   top[d.song] = 1;
    // } else {
    //   top[d.song] = top[d.song] + 1;
    // }

    prevDate = date;
  }); 
  return countDate;
}
);
  main.variable(observer("songSort")).define("songSort", ["dailyData"], function(dailyData){return(
dailyData[0].topsongs
)});
  main.variable(observer("moodData")).define("moodData", ["d3","moodUrl","dateParser","classifyQuadrant"], function(d3,moodUrl,dateParser,classifyQuadrant){return(
d3.csv(moodUrl, function(d) {
  return {
    username : d.username,
    date : dateParser(d.date),
    x : +d.coordinates.split(",")[0],
    y : +d.coordinates.split(",")[1],
    quadrant : classifyQuadrant(+d.coordinates.split(",")[0], +d.coordinates.split(",")[1]),
    keywords : d.keywords,
    reflections : d.reflections
  };
})
)});
  main.variable(observer("userMood")).define("userMood", ["moodData","username"], function(moodData,username){return(
moodData.filter(function(d) {
  return d["username"] == username;
})
)});
  main.variable(observer("join")).define("join", function(){return(
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
)});
  main.variable(observer("userData")).define("userData", ["join","userMood","dailyData"], function(join,userMood,dailyData){return(
join(userMood, dailyData, "date", "date", function(lastfm, mood) {
  return {
    date : lastfm.date,
    frequency : lastfm.frequency,
    topsongs : lastfm.topsongs,
    x : (mood !== undefined) ? mood.x : null,
    y : (mood !== undefined) ? mood.y : null,
    quadrant : (mood !== undefined) ? mood.quadrant : null,
    keywords : (mood !== undefined) ? mood.keywords : null,
    reflections : (mood !== undefined) ? mood.reflections : null
  };
})
)});
  main.variable(observer("graph")).define("graph", ["d3","width","height","dailyData","userData","x","y","wrap","xAxis"], function(d3,width,height,dailyData,userData,x,y,wrap,xAxis)
{
  
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width + 100, height + 100])
    
  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#34383A");

  var dataset = dailyData.sort(function(a,b) {
            return a.date - b.date;
          })
  
  //circle chart
  var pie = d3.pie()
  var circ = pie([1,1,1,1])
  var arcOut = d3.arc()
    .innerRadius(25)
    .outerRadius(50)
  
  var arcIn = d3.arc()
    .innerRadius(3)
    .outerRadius(25)
  
  var colorScaleOut = ["#B459DE","#61ECDB","#3372D2","#FD3A3E"]
  var colorScaleIn = ["#E0BCF0","#B6F6EE","#B0C8ED","#FED2D2"]
  
  svg.append("circle")
    .attr("cx", 100)
    .attr("cy", 145)
    .attr("r", 3)
    .attr("fill", "white")
  
  svg.selectAll("path")
    .data(circ)
    .enter()
    .append("path")
    .attr("transform", "translate(100,145)")
    .attr("d", arcIn)
    .attr("fill", function(d) {
      return colorScaleIn[d.index];
    })
  
  svg.selectAll("path2")
    .data(circ)
    .enter()
    .append("path")
    .attr("transform", "translate(100,145)")
    .attr("d", arcOut)
    .attr("fill", function(d) {
      return colorScaleOut[d.index];
    })
  
  //legend descriptions
  var tgrp = svg.append("g") 
    tgrp.append("text")
      .attr("x", 25)
      .attr("y", 50)
      .attr("class", "title")
      .text("Mood Waves")
    tgrp.append("rect")
      .attr("x", 0)
      .attr("y", 240)
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", "#FD3A3E")
    tgrp.append("text")
      .attr("x", 60)
      .attr("y", 250)
      .attr("class", "heading")
      .text("tense, nervous,")
    tgrp.append("text")
      .attr("x", 60)
      .attr("y", 270)
      .attr("class", "heading")
      .text("stressed, upset")
    tgrp.append("rect")
      .attr("x", 0)
      .attr("y", 300)
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", "#B459DE")
    tgrp.append("text")
      .attr("x", 60)
      .attr("y", 310)
      .attr("class", "heading")
      .text("alert, excited,")
    tgrp.append("text")
      .attr("x", 60)
      .attr("y", 330)
      .attr("class", "heading")
      .text("elated, happy")
    tgrp.append("rect")
      .attr("x", 0)
      .attr("y", 360)
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", "#61ECDB")
    tgrp.append("text")
      .attr("x", 60)
      .attr("y", 370)
      .attr("class", "heading")
      .text("content, serene,")
    tgrp.append("text")
      .attr("x", 60)
      .attr("y", 390)
      .attr("class", "heading")
      .text("relaxed, calm")
    tgrp.append("rect")
      .attr("x", 0)
      .attr("y", 420)
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", "#3372D2")
    tgrp.append("text")
      .attr("x", 60)
      .attr("y", 430)
      .attr("class", "heading")
      .text("tired, bored,")
    tgrp.append("text")
      .attr("x", 60)
      .attr("y", 450)
      .attr("class", "heading")
      .text("depressed, sad")
  
  //bar graph
  svg.append("g")
    .selectAll("rect")
    .data(userData.sort(function(a,b) {
            return a.date - b.date;
          }))
    .join("rect")
    .attr("fill", function(d) {
      if(d.quadrant == 1)
        return "#B459DE";
      if(d.quadrant == 2)
        return "#61ECDB";
      if(d.quadrant == 3)
        return "#3372D2";
      if(d.quadrant == 4)
        return "#FD3A3E";
      if(d.quadrant == 5)
        return "#E0BCF0";
      if(d.quadrant == 6)
        return "#B6F6EE";
      if(d.quadrant == 7)
        return "#B0C8ED";
      if(d.quadrant == 8)
        return "#FED2D2";
      if(d.quadrant == 9)
        return "white";
    })
    .attr("x", (d, i) => x(i))
    .attr("y", d => ((y(d.frequency * 2) + height) / 5) + 100)
    .attr("height", d => (y(0) - y(d.frequency)) * 0.8)
    .attr("width", x.bandwidth() + 1)
  
    //hover capabilities
    .on("mouseover", function(d, i) {
			d3.select(this)
			.attr("opacity", "25%");
      var xpos = 0;
      var ypos = 0;
			var tgrp = svg.append("g")
        .attr("id", "tooltip")
        tgrp.append("rect")
          .attr("width", "249px")
          .attr("height", "90%")
          .attr("fill", "#34383A")
    
        //title
        tgrp.append("text")
          .attr("x", 25)
          .attr("y", 50)
          .attr("class", "title")
          .text("Mood Waves")
    
          //circle chart
          var pie = d3.pie()
          var circ = pie([1,1,1,1])
          var arcOut = d3.arc()
            .innerRadius(25)
            .outerRadius(50)

          var arcIn = d3.arc()
            .innerRadius(3)
            .outerRadius(25)

          var colorScaleOut = ["#B459DE","#61ECDB","#3372D2","#FD3A3E"]
          var colorScaleIn = ["#E0BCF0","#B6F6EE","#B0C8ED","#FED2D2"]

          tgrp.append("circle")
            .attr("cx", 100)
            .attr("cy", 145)
            .attr("r", 3)
            .attr("fill", "white")

          tgrp.selectAll("path")
            .data(circ)
            .enter()
            .append("path")
            .attr("transform", "translate(100,145)")
            .attr("d", arcIn)
            .attr("fill", function(d) {
              return colorScaleIn[d.index];
            })
          tgrp.selectAll("path2")
            .data(circ)
            .enter()
            .append("path")
            .attr("transform", "translate(100,145)")
            .attr("d", arcOut)
            .attr("fill", function(d) {
              return colorScaleOut[d.index];
            })
    
        //details
        tgrp.append("text")
          .attr("x", 25)
          .attr("y", 250)
          .attr("class", "heading")
          .text(`${d3.timeFormat('%b %d, %Y')(i.date)}`)
        tgrp.append("text")
          .attr("x", 25)
          .attr("y", 270)
          .attr("class", "body")
          .text("You listened to " + `${i.frequency}` + " songs.")
        tgrp.append("text")
          .attr("x", 25)
          .attr("y", 300)
          .attr("class", "heading")
          .text("top songs")
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 325)
          .attr("class", "heading")
          .text(function() {
            if(i.topsongs[0].name.length <= 25) {
              return `${i.topsongs[0].name}`;
            } else {
              return `${i.topsongs[0].name}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 340)
          .attr("class", "body")
          .text(function() {
            if(i.topsongs[0].singer.length <= 25) {
              return `${i.topsongs[0].singer}`;
            } else {
              return `${i.topsongs[0].singer}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 365)
          .attr("class", "heading")
          .text(function() {
            if(i.topsongs[1].name.length < 25) {
              return `${i.topsongs[1].name}`;
            } else {
              return `${i.topsongs[1].name}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 380)
          .attr("class", "body")
          .text(function() {
            if(i.topsongs[1].singer.length <= 25) {
              return `${i.topsongs[1].singer}`;
            } else {
              return `${i.topsongs[1].singer}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 405)
          .attr("class", "heading")
          .text(function() {
            if(i.topsongs[2].name.length < 25) {
              return `${i.topsongs[2].name}`;
            } else {
              return `${i.topsongs[2].name}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 420)
          .attr("class", "body")
          .text(function() {
            if(i.topsongs[2].singer.length <= 25) {
              return `${i.topsongs[2].singer}`;
            } else {
              return `${i.topsongs[2].singer}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 445)
          .attr("class", "heading")
          .text(function() {
            if(i.topsongs[3].name.length < 25) {
              return `${i.topsongs[3].name}`;
            } else {
              return `${i.topsongs[3].name}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 460)
          .attr("class", "body")
          .text(function() {
            if(i.topsongs[3].singer.length <= 25) {
              return `${i.topsongs[3].singer}`;
            } else {
              return `${i.topsongs[3].singer}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 485)
          .attr("class", "heading")
          .text(function() {
            if(i.topsongs[4].name.length < 25) {
              return `${i.topsongs[4].name}`;
            } else {
              return `${i.topsongs[4].name}`.slice(0,22) + "...";
            }})
        tgrp.append("text")
          .attr("x", 65)
          .attr("y", 500)
          .attr("class", "body")
          .text(function() {
            if(i.topsongs[4].singer.length <= 25) {
              return `${i.topsongs[4].singer}`;
            } else {
              return `${i.topsongs[4].singer}`.slice(0,22) + "...";
          }})
        tgrp.append("text")
          .attr("x", 25)
          .attr("y", 530)
          .attr("class", "heading")
          .text("mood")
        tgrp.append("text")
          .attr("x", 25)
          .attr("y", 550)
          .attr("class", "body")
          .text(function() {
             if(i.keywords == null) {
              return "____";
            } else if(i.keywords.length <= 30) {
              return `${i.keywords}`;
            } else {
              return `${i.keywords}`.slice(0,30) + "...";
            }})
        tgrp.append("text")
          .attr("x", 25)
          .attr("y", 580)
          .attr("class", "heading")
          .text("reflections")
        tgrp.append("text")
          .attr("x", 25)
          .attr("y", 600)
          .attr("class", "body")
          .text(function() {
            if(i.reflections == null) {
              return "____";
            } else {
              return `${i.reflections}`;
          }})
          .attr("dy", 0)
          .call(wrap, x.bandwidth());
			})
			.on("mouseout", function(d) {
			  d3.select(this)
			  .transition().duration(250)
			  .attr("opacity", "100%");
			  d3.select("#tooltip").remove();
			});

  //x axis formatting
  var temp = []
  svg.append("g")
    .call(xAxis)
    .selectAll(".tick text")
    .attr("fill", "white")
    .data(dataset)
    .each(function(d) {
      if (temp[d3.timeFormat('%B')(d.date)] == undefined) {
        temp[d3.timeFormat('%B')(d.date)] = 1;
        return d3.timeFormat('%B')(d.date);
      } else {
        return d3.select(this).remove();
      }
    })

  return svg.node();
}
);
  main.variable(observer("wrap")).define("wrap", ["d3"], function(d3){return(
function wrap(text) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 25).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > 200) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 25).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
)});
  main.variable(observer("classifyQuadrant")).define("classifyQuadrant", ["innerQuad"], function(innerQuad){return(
function classifyQuadrant(x, y) {
  if (x >= 0 && y > 0){
    if (innerQuad(x,y)){
      return 5;
    } else {
      return 1;
    }
  }
  else if (x > 0 && y <= 0){
    if (innerQuad(x,y)){
      return 6;
    } else {
      return 2;
    }
  }
  else if (x <= 0 && y < 0){
    if (innerQuad(x,y)){
      return 7;
    } else {
      return 3;
    }
  }
  else if (x < 0 && y >= 0){
    if (innerQuad(x,y)){
      return 8;
    } else {
      return 4;
    }
  }
  else {
    return 9;
  }
}
)});
  main.variable(observer("innerQuad")).define("innerQuad", function(){return(
function innerQuad(x, y) {
  return Math.sqrt(x*x + y*y) < 3;
}
)});
  main.variable(observer("x")).define("x", ["d3","dailyData","margin","width"], function(d3,dailyData,margin,width){return(
d3.scaleBand()
    .domain(d3.range(dailyData.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
)});
  main.variable(observer("y")).define("y", ["d3","dailyData","height","margin"], function(d3,dailyData,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(dailyData, d => d.frequency)]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","dailyData"], function(height,margin,d3,x,dailyData){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("color", "white")
    .call(d3.axisBottom(x).tickFormat(i => d3.timeFormat('%B')(new Date(dailyData[i].date))).tickSizeOuter(0))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data","dailyData"], function(margin,d3,y,data,dailyData){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "white")
        .attr("text-anchor", "start")
        .text(dailyData.y))
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 30, right: -100, bottom: -50, left: 250}
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Spotify API`
)});
  main.variable(observer("spotify")).define("spotify", ["require"], function(require){return(
require('spotify-web-api-js')
)});
  main.variable(observer("api")).define("api", ["require","token"], async function(require,token)
{
  const SpotifyWebApi = await require('https://bundle.run/spotify-web-api-node@4.0.0');
  const api = new SpotifyWebApi({
    clientId: '93febf29f64649a8b1675c59304fa249',
    clientSecret: '7ee44bfbd5ae44d5a9597ae3da9c4743',
    //redirectUri: 'http://localhost:8888/callback'
  });
  api.setAccessToken(token);
  return api;
}
);
  main.variable(observer("viewof token")).define("viewof token", ["getTokenView"], function(getTokenView){return(
getTokenView('93febf29f64649a8b1675c59304fa249')
)});
  main.variable(observer("token")).define("token", ["Generators", "viewof token"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("getTokenView", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`## Appendix`
)});
  main.variable(observer("timeParser")).define("timeParser", ["d3"], function(d3){return(
d3.timeParse("%d %b %Y, %H:%M")
)});
  main.variable(observer("dateParser")).define("dateParser", ["d3"], function(d3){return(
d3.timeParse("%m/%e/%Y")
)});
  main.variable(observer("url")).define("url", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("scrobbles-ylime329-1616440318.csv").url()
)});
  main.variable(observer("lastfmUser")).define("lastfmUser", ["username"], function(username){return(
`${username}.csv`
)});
  main.variable(observer("lastfmUrl")).define("lastfmUrl", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("JamppaFL.csv").url()
)});
  main.variable(observer("moodUrl")).define("moodUrl", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("daily-mood-331.csv").url()
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("graph2")).define("graph2", ["d3","width","height","dailyData","x","y","xAxis","yAxis"], function(d3,width,height,dailyData,x,y,xAxis,yAxis)
{
  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(dailyData)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.frequency))
      // .attr("y", d => (y(d.frequency * 2) + height) / 4)
      .attr("height", d => y(0) - y(d.frequency))
      .attr("width", x.bandwidth())
    .on("mouseover", function(d, i) {
			d3.select(this)
			.attr("fill", "red");
			// Get this bar's x/y values, then augment for the tooltip
			var xpos = parseFloat(d3.select(this).attr("x"));
			var ypos = parseFloat(d3.select(this).attr("y"));
			// Create the tooltip label as an SVG group `tgrp` with a text and a rect inside
			var tgrp = svg.append("g")
        .attr("id", "tooltip")
        .attr("transform", (d, i) => `translate(${xpos},${ypos})`);
        tgrp.append("rect")
          .attr("width", "140px")
          .attr("height", "22px")
          .attr("fill", "lightblue")
        tgrp.append("text")
        .attr("x", 5)
        .attr("y", 14)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(`${i.frequency}`);
			})
			.on("mouseout", function(d) {
			d3.select(this) // see note above
			.transition().duration(250) // try changing these
			.attr("fill", "steelblue");
			// Remove the tooltip
			d3.select("#tooltip").remove();
			});

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}
);
  return main;
}
