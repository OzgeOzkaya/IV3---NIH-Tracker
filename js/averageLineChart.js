function createLineChart(data) {
    // Clear any existing chart
    d3.select("#average-line-chart svg").remove();

    // Set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const width = document.getElementById('average-line-chart').clientWidth - margin.left - margin.right;
    const height = document.getElementById('average-line-chart').clientHeight - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3.select("#average-line-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the date / time
    const parseDate = d3.timeParse("%Y");

    // Format the data
    const aggregatedData = d3.rollups(data, v => d3.mean(v, d => d.TOTAL_COST), d => d.FY)
        .map(([key, value]) => ({ year: parseDate(key), totalCost: value }))
        .sort((a, b) => a.year - b.year);

    // Check aggregated data
    console.log("Aggregated Data:", aggregatedData);

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
        .domain(d3.extent(aggregatedData, d => d.year))
        .range([0, width]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat("%Y")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "-0.15em")
        .attr("transform", "rotate(-65)");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(aggregatedData, d => d.totalCost)])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y).tickFormat(d3.format("$.0f")));

    // Add the line
    svg.append("path")
        .datum(aggregatedData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x(d.year))
            .y(d => y(d.totalCost))
        );

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Average Total Cost per Year");
}

// Ensure this function is called with the actual dataset
createLineChart(dataset);
