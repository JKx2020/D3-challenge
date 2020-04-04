// @TODO: YOUR CODE HERE
//define svg parameters
var svgWidth = 500;
var svgHeight = 500;

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
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//create svg group & append to svg element
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargins.left}, ${chartMargins.top})`);

//pull in csv
d3.csv("assets/data/data.csv").then(function(statData) {
    console.log(statData);

    //loop thru the data and cast the stats as numbers
    statData.forEach(function(data) {
        data.healthcare = +data.healthcare; 
        data.obesity = +data.obesity;
        
    });
   
    //create a scale for x & y data
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(statData, d => d.healthcare)])
        .range([chartHeight, 0]);

    var xScale = d3.scaleLinear ()
        .domain([0, d3.max(statData, d => d.obesity)])
        .range([0, chartWidth]);

    //create the axis for x and y, pass in the scale functions
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    //append two SVG group elements to the chartGroup area and include the bottom and left axis inside
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
    chartGroup.append("g")
        .call(yAxis);
    
    //create one SVG circle per piece stat
    chartGroup.selectAll(".dot")
        .data(statData)
        .enter()
        .append("circle")
            .attr("cx", d => xScale(d.obesity))
            .attr("cy", d => yScale(d.healthcare))
            .attr("r", 5)
            .attr("fill", "blue")


});