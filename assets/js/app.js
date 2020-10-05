var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var chart = d3.select("#scatter").append("div").classed("chart", true);

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("data.csv").then(function(data, err) {
    if (err) throw err;
console.log(healthData)

    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +healthcare;
    });

    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    xMin = d3.min(healthData, function(data) {
        return data.healthcare;
    });
    
    xMax = d3.max(healthData, function(data) {
        return data.healthcare;
    });
    
    yMin = d3.min(healthData, function(data) {
        return data.poverty;
    });
    
    yMax = d3.max(healthData, function(data) {
        return data.poverty;
    });

    xLinearScale.domain([xMin, xMax]);
    yLinearScale.domain([yMin, yMax]);
    
    console.log(xMin);
    console.log(yMax);

    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.healthcare)
        .attr("cy", d => yLinearScale(d.poverty))
        .attr("r", 20)
        .attr("fill", "green")
        .attr("opacity", ".5")
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        }));

        