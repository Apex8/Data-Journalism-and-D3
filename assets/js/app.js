var svgWidth = parseInt(d3.select('#scatter').style('width'));
var svgHeight = svgWidth - svgWidth / 3.9;
var margin = 20;
var pad = 40;
var labelArea = 110;
var width = svgWidth - 2 * margin - 2 * pad;
var height = svgHeight - 2 * margin;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr('class', 'chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var data;

d3.csv("assets/data/data.csv").then(function (data, err) {
    if (err) throw err;

    data = data;

    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xMin;
    var xMax;
    var yMin;
    var yMax;

    xMin = d3.min(data, function (data) {
        return data.healthcare;
    });

    xMax = d3.max(data, function (data) {
        return data.healthcare;
    });

    yMin = d3.min(data, function (data) {
        return data.poverty;
    });

    yMax = d3.max(data, function (data) {
        return data.poverty;
    });

    var xScale = xLinearScale.domain([xMin, xMax]);
    var yScale = yLinearScale.domain([yMin, yMax]);

    chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.healthcare +2))
        .attr("cy", d => yScale(d.poverty +1))
        .attr("r", 20)
        .attr("fill", "green")
        .attr("opacity", ".5")
        .on("mouseout", function (data) {
            toolTip.hide(data);
        });

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.abbr}`);
        });

    chartGroup.call(toolTip);

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })

        .on("mouseout", function (data) {
            toolTip.hide(data);
        });

    chartGroup.append("text")
        .style("font-size", "10px")
        .selectAll("tspan")
        .data(data)
        .enter()
        .append("tspan")
        .attr("x", function (data) {
            return xScale(data.healthcare + 1.4);
        })
        .attr("y", function (data) {
            return yScale(data.poverty + .2);
        })
        .text(function (data) {
            return data.abbr
        });

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 1.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare(%)");

    chartGroup.append("g")
        .attr("transform", `translate(${width / 1.5}, ${height + margin.top + 40})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
});
