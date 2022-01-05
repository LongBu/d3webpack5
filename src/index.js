import {
  axisBottom as d3AxisBottom,
  axisRight as d3AxisRight,
  scaleLinear as d3ScaleLinear,
  select as d3Select,
  csv as d3Csv,
} from 'd3';
import csvPath from './boxplots.csv';

d3Csv(csvPath).then(function(data) {
  scatterplot(data);
});
//  function to add scatter plot/axis-grid
/**
*  The following function to add scatter plot/axis-grid
*  @param {data} data from the csv file
*/
function scatterplot(data) {
  const xScale = d3ScaleLinear().domain([1, 8]).range([20, 470]);
  const yScale = d3ScaleLinear().domain([0, 100]).range([480, 20]);
  const yAxis = d3AxisRight(yScale).ticks(8)
      .tickSize(-470);
  d3Select('svg').append('g')
      .attr('transform', 'translate(470,0)')
      .attr('id', 'yAxisG')
      .call(yAxis);
  const xAxis = d3AxisBottom(xScale).tickSize(-470)
      .tickValues([1, 2, 3, 4, 5, 6, 7]);

  d3Select('svg').append('g')
      .attr('transform', 'translate(0,480)')
      .attr('id', 'xAxisG')
      .call(xAxis);
  d3Select('svg').selectAll('circle.median')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'tweets')
      .attr('r', 5)
      .attr('cx', function(d) {
        return xScale(d.day);
      })
      .attr('cy', function(d) {
        return yScale(d.median);
      })
      .style('fill', 'darkgray');

  d3Select('svg').selectAll('g.box')
      .data(data).enter()
      .append('g')
      .attr('class', 'box')
      .attr('transform', function(d) {
        return 'translate(' + xScale(d.day) +',' + yScale(d.median) + ')';
      })
      .append('rect')
      .attr('width', 20)
      .attr('height', function(d) {
        return yScale(d.q1) - yScale(d.q3);
      });
}
