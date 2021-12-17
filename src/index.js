import * as d3 from 'd3';

const scatterData = [{friends: 5, salary: 22000},
  {friends: 3, salary: 18000}, {friends: 10, salary: 88000},
  {friends: 0, salary: 180000}, {friends: 27, salary: 56000},
  {friends: 8, salary: 74000}];

d3.select('svg').selectAll('circle')
    .data(scatterData).enter()
    .append('circle').attr('r', 5)
    .attr('cx', function(d, i) {
      return i * 10;
    })
    .attr('cy', function(d) {
      return d.friends;
    });
