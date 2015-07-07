var chartData = [];
var chartDrawData = [];
var transitionDuration = 2000;
var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
};
var width = 1000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select('#responsiveContainer')
  .append('svg')
  .attr({
    'viewBox': "0 0 960 500",
  })
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chartData = generateData(20);

(function draw() {
  var bars = svg.selectAll(".bar")
    .data(chartData);

  bars.enter()
    .append("rect")
    .attr({
      "class": "bar",
      "width": 40,
      'x': function(d, i) {
        return i * 46;
      },
      "y": function(d) {
        return 400;
      },
      "height": 0,
    })
    .style({
      'fill': '#2ECC40',
    })
    .transition()
    .duration(transitionDuration)
    .attr({
      "y": function(d) {
        return 400 - (d.Value * 10);
      },
      "height": function(d) {
        return d.Value * 10;
      },
    })
})();


function generateData(numberOfRows) {
  var data = [];
  for (var i = 0; i < numberOfRows; i++) {
    data.push({
      'Id': i,
      'Value': Math.floor(Math.random() * 20)
    });
  }

  return data;
}