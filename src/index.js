import * as d3 from 'd3';
import csvPath from './worldcup.csv';

d3.csv(csvPath).then(function(data) {
  overallTeamViz(data);
});
/**
*  The following processes the incoming team data post async processing of the
*  csv file
*  @param {json} incomingData The incoming world cup teams data-ephemera.
*/
function overallTeamViz(incomingData) {
  d3.select('svg')
      .append('g')
      .attr('id', 'teamsG')
      .attr('transform', 'translate(50,300)')
      .selectAll('g')
      .data(incomingData)
      .enter()
      .append('g')
      .attr('class', 'overallG')
      .attr('transform', (d, i) =>`translate(${(i * 50)}, 0)`);

  const teamG = d3.selectAll('g.overallG');

  teamG
      .append('circle')
      .attr('r', 20)
      .style('fill', 'pink')
      .style('stroke', 'black')
      .style('stroke-width', '1px');

  teamG
      .append('text')
      .style('text-anchor', 'middle')
      .attr('y', 30)
      .text((d) => d.team);

  const dataKeys = Object.keys(incomingData[0])
      .filter((d) => d !== 'team' && d !== 'region');

  d3.select('#controls').selectAll('button.teams')
      .data(dataKeys).enter()
      .append('button')
      .on('click', buttonClick)
      .html((d) => d);
  teamG.on('mouseover', function(d) {
    const targetData = d.target.__data__;
    d3.selectAll('g.overallG').select('circle')
        .style('fill', function(p) {
          return p.region === targetData.region ? 'red' : 'gray';
        });
  });
  teamG.on('mouseout', function() {
    d3.selectAll('g.overallG').select('circle').style('fill', 'pink');
  });
  /**
      *  The following processes the incoming team-country click ephemera
      *  @param {event} event The incoming click event
      */
  function buttonClick(event) {
    const att = event.target.innerHTML;
    const maxValue = d3.max(incomingData, (d) => parseFloat(d[att]));
    const radiusScale = d3.scaleLinear()
        .domain([0, maxValue]).range([2, 20]);
    d3.selectAll('g.overallG').select('circle')
        .attr('r', (d) => radiusScale(d[att]));
  }
}
