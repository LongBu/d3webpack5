import * as d3 from 'd3';
import csvPath from './worldcup.csv';

d3.csv(csvPath).then(function(data){
  overallTeamViz(data);
});
function overallTeamViz(incomingData) {
  d3.select("svg")
    .append("g")
      .attr("id", "teamsG")
      .attr("transform", "translate(50,300)")
    .selectAll("g")
    .data(incomingData)
    .enter()
    .append("g")
      .attr("class", "overallG")
      .attr("transform", (d, i) =>`translate(${(i * 50)}, 0)`);

  var teamG = d3.selectAll("g.overallG");

  teamG
    .append("circle")
      .attr("r", 20);

  teamG
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", 30)
      .text(d => d.team);
    // var dataKeys = Object.keys(incomingData)
  var dataKeys = Object.keys(incomingData[0])
    .filter(d => d !== "team" && d !== "region");

  d3.select("#controls").selectAll("button.teams")
    .data(dataKeys).enter()
    .append("button")
      .on("click", buttonClick)
      .html(d => d);

  function buttonClick(event) {
    // var att = event.target.__data__;
    var att = event.target.innerHTML;
    // var att = event.currentTarget.innerHTML;
    var maxValue = d3.max(incomingData, d => parseFloat(d[att]));
    // var maxValue = d3.max(incomingData, d => parseFloat(d[datapoint]));
    var radiusScale = d3.scaleLinear()
      .domain([ 0, maxValue ]).range([ 2, 20 ]);
    // d3.selectAll("g.overallG").select("circle")
    //   .attr("r", d => radiusScale(d[datapoint]));
    d3.selectAll("g.overallG").select("circle")
      .attr("r", d => radiusScale(d[att]));
  }
}
