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
      .attr('r', 0)
      .transition()
      .delay(function(d, i) {
        return i * 100;
      })
      .duration(500)
      .attr('r', 40)
      .transition()
      .duration(500)
      .attr('r', 20)
      .attr('r', 20)
      .style('fill', 'pink')
      .style('stroke', 'black')
      .style('stroke-width', '1px');

  teamG
      .append('text')
      .style('text-anchor', 'middle')
      .attr('y', 30)
      .text((d) => d.team);

  teamG.select('text').style('pointer-events', 'none');

  const dataKeys = Object.keys(incomingData[0])
      .filter((d) => d !== 'team' && d !== 'region');

  d3.select('#controls').selectAll('button.teams')
      .data(dataKeys).enter()
      .append('button')
      .on('click', buttonClick)
      .html((d) => d);
  teamG.on('mouseover', function(d, targetData) {
    const teamColor = d3.rgb('pink');
    const self = d.currentTarget;
    // const targetData = d.target.__data__;
    d3.select(self).select('text').classed('active', true).attr('y', 10);
    d3.selectAll('g.overallG').select('circle').style('fill', function(p) {
      if (p.region === targetData.region) {
        return teamColor.darker(.75);
      } else {
        return teamColor.brighter(.5);
      }
    });
    self.parentElement.appendChild(self);
  });
  teamG.on('mouseout', function() {
    d3.selectAll('g.overallG').select('circle').attr('class', '');
    d3.selectAll('g.overallG').select('text')
        .classed('highlight', false).attr('y', 30)
        .classed('active', false)
        .classed('inactive', true);
    d3.selectAll('g.overallG circle').style('fill', 'pink');
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
    const ybRamp = d3.scaleLinear().interpolate(d3.interpolateLab)
        .domain([0, maxValue]).range(['yellow', 'blue']);

    d3.selectAll('g.overallG').select('circle')
        .attr('r', (d) => radiusScale(d[att]))
        .style('fill', (d) => ybRamp(d[att]));
  }
}
