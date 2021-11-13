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
}
