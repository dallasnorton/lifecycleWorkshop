// var svg = d3.select('#responsiveContainer')
//   .append('svg')
//   .attr({
//   	'width': 800,
//   	'height': 800,
//     'viewBox': '0 0 800 800'
//   });

// svg.append('rect')
//   .attr({
//     'width': '100',
//     'height': '200'
//   });


var svg = d3.select('#responsiveContainer')
  .append('svg')
  .attr({
    'viewBox': "0 0 800 800",
  });

svg.append('rect')
  .attr({
    'width': '100',
    'height': '200'
  });

svg.append('text')
  .attr({
    'transform': 'translate(300,300)',
  })
  .text('TEST');