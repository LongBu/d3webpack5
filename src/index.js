import {
  axisBottom as d3AxisBottom,
  axisLeft as d3AxisLeft,
  axisRight as d3AxisRight,
  scaleLinear as d3ScaleLinear,
  select as d3Select,
  extent as d3Extent,
} from 'd3';
const WIDTH = 480;
const HEIGHT = 500;
const MARGIN = {top: 10, right: 10, bottom: 20, left: 10};
const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;
const scatterData = [{friends: 5, salary: 22000},
  {friends: 3, salary: 18000}, {friends: 10, salary: 88000},
  {friends: 0, salary: 180000}, {friends: 27, salary: 56000},
  {friends: 8, salary: 74000}];


const xExtent = d3Extent(scatterData, function(d) {
  return d.salary;
});
const yExtent = d3Extent(scatterData, function(d) {
  return d.friends;
});
const xScale = d3ScaleLinear().domain(xExtent).range([0, INNER_WIDTH]);
const yScale = d3ScaleLinear().domain(yExtent).range([0, INNER_HEIGHT]);
const svg = d3Select('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')
    .attr('transform', 'translate(' + MARGIN.left + ',' + MARGIN.top + ')');

const xAxis = d3AxisBottom(xScale).ticks(10);
const yAxis = d3AxisRight(yScale).ticks(10);
// borrowed grid lines from https://www.essycode.com/posts/adding-gridlines-chart-d3/
const xAxisGrid = d3AxisBottom(xScale).tickSize(-INNER_HEIGHT)
    .tickFormat('').ticks(10);
const yAxisGrid = d3AxisLeft(yScale).tickSize(-INNER_WIDTH)
    .tickFormat('').ticks(10);

// Create grids.
svg.append('g')
    .attr('class', 'x axis-grid')
    .attr('transform', 'translate(0,' + INNER_HEIGHT + ')')
    .call(xAxisGrid);
svg.append('g')
    .attr('class', 'y axis-grid')
    .call(yAxisGrid);
// Create axes.
svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + INNER_HEIGHT + ')')
    .call(xAxis);
svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + INNER_WIDTH + ',0)')
    .call(yAxis);

d3Select('svg').selectAll('circle')
    .data(scatterData).enter()
    .append('circle').attr('r', 5)
    .attr('cx', function(d) {
      return xScale(d.salary) + MARGIN.left;
    })
    .attr('cy', function(d) {
      return yScale(d.friends) + MARGIN.top;
    });
