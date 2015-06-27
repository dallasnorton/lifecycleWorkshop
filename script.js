var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
  width = 1000 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

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

var data = [];
for (var i = 0; i < 20; i++) {
  data.push({
    'Id': i,
    'Value': Math.floor(Math.random() * 20)
  });
}


xScale.domain(data.map(function(d) {
  return d.Id;
}));
yScale.domain([0, d3.max(data, function(d) {
  return d.Value;
})]);

svg.append("g")
  .attr({
    "class": "x axis",
    "transform": "translate(0," + height + ")"
  })
  .call(xAxis);
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);



function redraw() {

  var top = data.sort(function(a, b) {
    return d3.descending(a.Value, b.Value);
  }).slice(0, 10);

  xScale.domain(top.map(function(d) {
    return d.Id;
  }));


  svg.selectAll('.x.axis')
    .transition()
    .duration(1000)
    .call(xAxis);

  var bars = svg.selectAll(".bar")
    .data(top, function(d) {
      return d.Id;
    });

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
    .on('mouseover', function() {
      d3.select(this)
        .style({
          'fill': '#BADA55',
        });
    })
    .on('mouseout', function() {
      d3.select(this)
        .style({
          'fill': null,
        });
    })
    .transition()
    .duration(1000)
    .attr({
      "y": function(d) {
        return yScale(d.Value);
      },
      "height": function(d) {
        return height - yScale(d.Value);
      },
    });

  bars
    .transition()
    .duration(1000)
    .attr({
      "width": xScale.rangeBand(),
      'x': function(d) {
        return xScale(d.Id);
      },
      "y": function(d) {
        return yScale(d.Value);
      },
      "height": function(d) {
        return height - yScale(d.Value);
      },
    });

  bars.exit()
    .transition()
    .duration(500)
    .attr({
      'x': function(d) {
        return xScale.range()[1];
      },
      "y": function(d) {
        return yScale.range()[0];
      },
      "height": function(d) {
        return 0;
      },
    })
    .each('end', function() {
      d3.select(this).remove();
    });
}

var changeDataTimeout = setInterval(function() {
  for (var i = 0; i < data.length; i++) {
    data[i].Value = Math.floor(Math.random() * 20);
  }

  redraw()
}, 5000);

redraw();