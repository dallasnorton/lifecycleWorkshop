var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(formatPercent);



var svg = d3.select('#responsiveContainer')
  .append('svg')
  .attr({

    'viewBox': "0 0 960 500",
  })
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = [{
  'letter': 'A',
  'frequency': 0.08167
}, {
  'letter': 'B',
  'frequency': 0.01492
}, {
  'letter': 'C',
  'frequency': 0.02780
}, {
  'letter': 'D',
  'frequency': 0.04253
}, {
  'letter': 'E',
  'frequency': 0.12702
}, {
  'letter': 'F',
  'frequency': 0.02288
}, {
  'letter': 'G',
  'frequency': 0.02022
}, {
  'letter': 'H',
  'frequency': 0.06094
}, {
  'letter': 'I',
  'frequency': 0.06973
}, {
  'letter': 'J',
  'frequency': 0.00153
}, {
  'letter': 'K',
  'frequency': 0.00747
}, {
  'letter': 'L',
  'frequency': 0.04025
}, {
  'letter': 'M',
  'frequency': 0.02517
}, {
  'letter': 'N',
  'frequency': 0.06749
}, {
  'letter': 'O',
  'frequency': 0.07507
}, {
  'letter': 'P',
  'frequency': 0.01929
}, {
  'letter': 'Q',
  'frequency': 0.00098
}, {
  'letter': 'R',
  'frequency': 0.05987
}, {
  'letter': 'S',
  'frequency': 0.06333
}, {
  'letter': 'T',
  'frequency': 0.09056
}, {
  'letter': 'U',
  'frequency': 0.02758
}, {
  'letter': 'V',
  'frequency': 0.01037
}, {
  'letter': 'W',
  'frequency': 0.02465
}, {
  'letter': 'X',
  'frequency': 0.00150
}, {
  'letter': 'Y',
  'frequency': 0.01971
}, {
  'letter': 'Z',
  'frequency': 0.00074
}];
// d3.tsv("data.tsv", function(error, data) {

//   data.forEach(function(d) {
//     d.frequency = +d.frequency;
//   });

x.domain(data.map(function(d) {
  return d.letter;
}));
y.domain([0, d3.max(data, function(d) {
  return d.frequency;
})]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Frequency");

svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .style({
    'fill': 'steelblue',
  })
  .attr("class", "bar")
  .attr("x", function(d) {
    return x(d.letter);
  })
  .attr("width", x.rangeBand())
  .attr("y", function(d) {
    return y(d.frequency);
  })
  .attr("height", function(d) {
    return height - y(d.frequency);
  })
  .on('mouseover', function() {
    console.log(this);
    d3.select(this)
      .style({
        'fill': 'green',
      });
  })
  .on('mouseout', function() {
    console.log(this);
    d3.select(this)
      .style({
        'fill': null,
      });
  });

// d3.select("input").on("change", change);

// var sortTimeout = setTimeout(function() {
//   d3.select("input").property("checked", true).each(change);
// }, 2000);

// function change() {
//     clearTimeout(sortTimeout);

//     // Copy-on-write since tweens are evaluated after a delay.
//     var x0 = x.domain(data.sort(this.checked ? function(a, b) {
//           return b.frequency - a.frequency;
//         } : function(a, b) {
//           return d3.ascending(a.letter, b.letter);
//         })
//         .map(function(d) {
//           return d.letter;
//         }))
//       .copy();

//     svg.selectAll(".bar")
//       .sort(function(a, b) {
//         return x0(a.letter) - x0(b.letter);
//       });

//     var transition = svg.transition().duration(750),
//       delay = function(d, i) {
//         return i * 50;
//       };

//     transition.selectAll(".bar")
//       .delay(delay)
//       .attr("x", function(d) {
//         return x0(d.letter);
//       });

//     transition.select(".x.axis")
//       .call(xAxis)
//       .selectAll("g")
//       .delay(delay);
//   }
//   // });