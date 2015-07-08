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

var xScale = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1, 1);
var yScale = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");
var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

var svg = d3.select('#responsiveContainer')
  .append('svg')
  .attr({
    'viewBox': "0 0 960 500",
  })
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chartData = generateData(20);

setXScaleDomain(chartData);
setYScaleDomain(chartData);

appendAxes();

(function draw() {
  var bars = svg.selectAll(".bar")
    .data(chartData);

  bars.enter()
    .append("rect")
    .attr({
      "class": "bar",
      "width": xScale.rangeBand(),
      'x': function(d) {
        return xScale(d.Id);
      },
      "y": function(d) {
        return yScale.range()[0]
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
        return yScale(d.Value);
      },
      "height": function(d) {
        return height - yScale(d.Value);
      },
    })
})();

function appendAxes() {
  svg.append("g")
    .attr({
      "class": "x axis",
      "transform": "translate(0," + height + ")"
    })
    .call(xAxis);
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
}

function setXScaleDomain(data) {
  xScale.domain(data.map(function(d) {
    return d.Id;
  }));
}

function setYScaleDomain(data) {
  yScale.domain([0, d3.max(data, function(d) {
    return d.Value;
  })]);
}

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