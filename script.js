var chartData = [];
var chartDrawData = [];
var transitionDuration = 2000;

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


chartData = generateData(20);

sortData(chartData);


xScale.domain(chartData.map(function(d) {
  return d.Id;
}));
yScale.domain([0, d3.max(chartData, function(d) {
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
  chartDrawData = chartData.slice(0, Math.floor(Math.random() * 15) + 5);

  xScale.domain(chartDrawData.map(function(d) {
    return d.Id;
  }));

  svg.selectAll('.x.axis')
    .transition()
    .duration(transitionDuration)
    .delay(transitionDuration)
    .call(xAxis);

  var bars = svg.selectAll(".bar")
    .data(chartDrawData, function(d) {
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
    .style({
      'fill': '#2ECC40',
    })
    .on('mouseover', function() {
      d3.select(this)
        .style({
          'fill': '#01FF70',
        });
    })
    .on('mouseout', function() {
      d3.select(this)
        .style({
          'fill': null,
        });
    })
    .transition()
    .duration(transitionDuration)
    .delay(transitionDuration)
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
    .duration(transitionDuration)
    .delay(transitionDuration)
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
    })
    .each('end', function() {
      d3.select(this)
        .transition()
        .duration(transitionDuration)
        .style({
          'fill': '#0074D9',
        });
    });

  bars.exit()
    .transition()
    .duration(transitionDuration)
    .attr({
      "width": 0,
      'transform': function(d) {
        return 'translate(' + xScale.rangeBand() / 2 + ',0)';
      }
    })
    .style({
      'fill': '#FF4136',
    })
    .each('end', function() {
      d3.select(this).remove();
    });
}

var changeDataTimeout = setInterval(function() {
  randomizeData(chartData);

  sortData(chartData);

  redraw()
}, transitionDuration * 3);

redraw();


function randomizeData(data) {
  for (var i = 0; i < data.length; i++) {
    data[i].Value = Math.floor(Math.random() * 20);
  }
}


function generateData(length) {
  var data = [];
  for (var i = 0; i < length; i++) {
    data.push({
      'Id': i,
      'Value': Math.floor(Math.random() * 20)
    });
  }

  return data;
}

function sortData(data) {
  data.sort(function(a, b) {
    return d3.ascending(a.Value, b.Value);
  });
}