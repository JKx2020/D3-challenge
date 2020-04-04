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
d3.csv("assets/data/data.csv").then(function(statData) {
    console.log(statData);
    var healthcare = []
    //loop thru the data and cast the stats as numbers
    statData.forEach(function(data) {
        data.healthcare = +data.healthcare; 
        data.obesity = +data.obesity;
        
    });
   
    //create a scale for x & y data
    var yScale = {
        domain:([0, d3.max(data, d => data.healthcare)])
        range: ([chartHeight, 0]);
    };
    var xScale = {
        domain:([0, d3.max(data, d => data.obesity)])
        range: ([0, chartWidth]);
    };

});