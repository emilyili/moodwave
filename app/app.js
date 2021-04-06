var d3 = d3;

var svg = d3.select("#dataviz_area")
svg.append("circle")
  .attr("cx", 2).attr("cy", 2).attr("r", 40).style("fill", "blue");
svg.append("circle")
  .attr("cx", 140).attr("cy", 70).attr("r", 40).style("fill", "red");
svg.append("circle")
  .attr("cx", 300).attr("cy", 100).attr("r", 40).style("fill", "yellow");
console.log("hello0");
return svg;