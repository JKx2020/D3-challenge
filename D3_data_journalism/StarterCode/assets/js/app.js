// @TODO: YOUR CODE HERE

//wrap the chart code in a function that automatically resizes the chart
function makeResponsive() {

    //clear any SVG area upon resize
    var svgArea = d3.select("#scatter").select("svg");

    if (!svgArea.empty()) {
      svgArea.remove();
    }

    //define svg parameters
    var svgWidth = 1100;
    var svgHeight = 700;

    //define margins
    var chartMargins ={
        top: 30,
        bottom: 60,
        left: 60,
        right: 30
    };

    //define chart dimensions
    var chartWidth = svgWidth-chartMargins.left-chartMargins.right;
    var chartHeight = svgHeight-chartMargins.top-chartMargins.bottom;

    //create svg element
    var svg = d3.select("#scatter")
        .append("svg")
        .classed("chart", true)
        .attr("height", svgHeight)
        .attr("width", svgWidth);
        //.attr("viewBox", `0 0 100 100`)


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
            .domain([0, 28])
            .range([chartHeight, 0]);

        var xScale = d3.scaleLinear ()
            .domain([20, 38])
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
        var circlesGroup = chartGroup.selectAll(".stateCircle")
            .data(statData)
            .enter()
            .append("circle")
            .classed("stateCircle", true)
            .attr("cx", d => xScale(d.obesity))
            .attr("cy", d => yScale(d.healthcare))
            .attr("r", "9")
            .attr("fill", "blue");
        
        //add state abbr labes to the dots
        var stateLabel = chartGroup.selectAll(".stateText")
            .data(statData)
            .enter()
            .append("text")
            .classed("stateText", true)
            .attr("x", d => xScale(d.obesity))
            .attr("y", d => yScale(d.healthcare))
            .text(d => d.abbr);
            

        //initialize the tool tip, add the tooltip to the chart, create event listener to trigger the tooltip
        //initialize the tooltip
        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .offset([80, -60])
            .html(function (d) {
                return (`State: ${d.state}<br>% Lacks Healthcare: ${d.healthcare}<br>% Obese: ${d.obesity}`);
            });
        
        //add the tooltip to the chartGroup
        chartGroup.call(toolTip);

        //create the event listener
        circlesGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
        })
            .on("mouseout", function(data, index) {
                toolTip.hide(data);
            });

        //Create x-axis label
        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth/2}, ${chartHeight+chartMargins.top+10})`)
            .classed("aText", true)
            .text("% of Population Obese by State");

        //create y-axis label
        chartGroup.append("text")
            .attr("transform", `rotate(-90)`)
            .attr("y", -30)
            .attr("x", 0-(chartHeight/2))
            .attr("class", "aText")
            .text("% of Population Without Health Insurance by State")

    });

}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);