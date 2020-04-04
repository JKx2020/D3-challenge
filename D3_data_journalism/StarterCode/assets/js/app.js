// @TODO: YOUR CODE HERE
//define svg parameters
var svgWidth = 1000;
var svgHeight = 1000;

//define margins
var chartMargins ={
    top: 30,
    bottom: 30,
    left: 30,
    right: 30
};

//define chart dimensions
var chartWidth = svgWidth-chartMargins.left-chartMargins.right;
var chartHeight = svgHeight-chartMargins.top-chartMargins.bottom;
//create svg element
var svg = d3.select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//create svg group & append to svg element
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargins.left}, ${chartMargins.top})`);

//pull in csv
d3.csv("../data/data.csv").then(function(data) {
    console.log(data);
})