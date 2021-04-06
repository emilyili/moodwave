var d3 = d3;

var graph = {

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width + 100, height + 100])
    
  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#34383A");

  var dataset = dailyData.sort(function (a, b) {
    return a.date - b.date;
  })

  //circle chart
  var pie = d3.pie()
  var circ = pie([1, 1, 1, 1])
  var arcOut = d3.arc()
    .innerRadius(25)
    .outerRadius(50)
  
  var arcIn = d3.arc()
    .innerRadius(3)
    .outerRadius(25)
  
  var colorScaleOut = ["#B459DE", "#61ECDB", "#3372D2", "#FD3A3E"]
  var colorScaleIn = ["#E0BCF0", "#B6F6EE", "#B0C8ED", "#FED2D2"]
  
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
    .attr("fill", function (d) {
      return colorScaleIn[d.index];
    })
  
  svg.selectAll("path2")
    .data(circ)
    .enter()
    .append("path")
    .attr("transform", "translate(100,145)")
    .attr("d", arcOut)
    .attr("fill", function (d) {
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
    .data(userData.sort(function (a, b) {
      return a.date - b.date;
    }))
    .join("rect")
    .attr("fill", function (d) {
      if (d.quadrant == 1)
        return "#B459DE";
      if (d.quadrant == 2)
        return "#61ECDB";
      if (d.quadrant == 3)
        return "#3372D2";
      if (d.quadrant == 4)
        return "#FD3A3E";
      if (d.quadrant == 5)
        return "#E0BCF0";
      if (d.quadrant == 6)
        return "#B6F6EE";
      if (d.quadrant == 7)
        return "#B0C8ED";
      if (d.quadrant == 8)
        return "#FED2D2";
      if (d.quadrant == 9)
        return "white";
    })
    .attr("x", (d, i) => x(i))
    .attr("y", d => ((y(d.frequency * 2) + height) / 5) + 100)
    .attr("height", d => (y(0) - y(d.frequency)) * 0.8)
    .attr("width", x.bandwidth() + 1)

    //hover capabilities
    .on("mouseover", function (d, i) {
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
      var circ = pie([1, 1, 1, 1])
      var arcOut = d3.arc()
        .innerRadius(25)
        .outerRadius(50)

      var arcIn = d3.arc()
        .innerRadius(3)
        .outerRadius(25)

      var colorScaleOut = ["#B459DE", "#61ECDB", "#3372D2", "#FD3A3E"]
      var colorScaleIn = ["#E0BCF0", "#B6F6EE", "#B0C8ED", "#FED2D2"]

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
        .attr("fill", function (d) {
          return colorScaleIn[d.index];
        })
      tgrp.selectAll("path2")
        .data(circ)
        .enter()
        .append("path")
        .attr("transform", "translate(100,145)")
        .attr("d", arcOut)
        .attr("fill", function (d) {
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
        .text(function () {
          if (i.topsongs[0].name.length <= 25) {
            return `${i.topsongs[0].name}`;
          } else {
            return `${i.topsongs[0].name}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 340)
        .attr("class", "body")
        .text(function () {
          if (i.topsongs[0].singer.length <= 25) {
            return `${i.topsongs[0].singer}`;
          } else {
            return `${i.topsongs[0].singer}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 365)
        .attr("class", "heading")
        .text(function () {
          if (i.topsongs[1].name.length < 25) {
            return `${i.topsongs[1].name}`;
          } else {
            return `${i.topsongs[1].name}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 380)
        .attr("class", "body")
        .text(function () {
          if (i.topsongs[1].singer.length <= 25) {
            return `${i.topsongs[1].singer}`;
          } else {
            return `${i.topsongs[1].singer}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 405)
        .attr("class", "heading")
        .text(function () {
          if (i.topsongs[2].name.length < 25) {
            return `${i.topsongs[2].name}`;
          } else {
            return `${i.topsongs[2].name}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 420)
        .attr("class", "body")
        .text(function () {
          if (i.topsongs[2].singer.length <= 25) {
            return `${i.topsongs[2].singer}`;
          } else {
            return `${i.topsongs[2].singer}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 445)
        .attr("class", "heading")
        .text(function () {
          if (i.topsongs[3].name.length < 25) {
            return `${i.topsongs[3].name}`;
          } else {
            return `${i.topsongs[3].name}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 460)
        .attr("class", "body")
        .text(function () {
          if (i.topsongs[3].singer.length <= 25) {
            return `${i.topsongs[3].singer}`;
          } else {
            return `${i.topsongs[3].singer}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 485)
        .attr("class", "heading")
        .text(function () {
          if (i.topsongs[4].name.length < 25) {
            return `${i.topsongs[4].name}`;
          } else {
            return `${i.topsongs[4].name}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 65)
        .attr("y", 500)
        .attr("class", "body")
        .text(function () {
          if (i.topsongs[4].singer.length <= 25) {
            return `${i.topsongs[4].singer}`;
          } else {
            return `${i.topsongs[4].singer}`.slice(0, 22) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 25)
        .attr("y", 530)
        .attr("class", "heading")
        .text("mood")
      tgrp.append("text")
        .attr("x", 25)
        .attr("y", 550)
        .attr("class", "body")
        .text(function () {
          if (i.keywords == null) {
            return "____";
          } else if (i.keywords.length <= 30) {
            return `${i.keywords}`;
          } else {
            return `${i.keywords}`.slice(0, 30) + "...";
          }
        })
      tgrp.append("text")
        .attr("x", 25)
        .attr("y", 580)
        .attr("class", "heading")
        .text("reflections")
      tgrp.append("text")
        .attr("x", 25)
        .attr("y", 600)
        .attr("class", "body")
        .text(function () {
          if (i.reflections == null) {
            return "____";
          } else {
            return `${i.reflections}`;
          }
        })
        .attr("dy", 0)
        .call(wrap, x.bandwidth());
    })
    .on("mouseout", function (d) {
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
    .each(function (d) {
      if (temp[d3.timeFormat('%B')(d.date)] == undefined) {
        temp[d3.timeFormat('%B')(d.date)] = 1;
        return d3.timeFormat('%B')(d.date);
      } else {
        return d3.select(this).remove();
      }
    })

  return svg.node();
}