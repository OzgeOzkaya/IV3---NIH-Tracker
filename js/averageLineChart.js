function createAverageLineChart(lineData = []) {
    // Prepare the data for the line chart by calculating mean TOTAL_COST per year
    if (lineData.length === 0) {
        lineData = d3.rollups(
            dataset,
            v => d3.mean(v, d => d.TOTAL_COST),
            d => d.FY
        ).map(([year, avgCost]) => ({ year: +year, avgCost }));
    }

    // Sort the data chronologically by year
    lineData.sort((a, b) => a.year - b.year);

    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = document.getElementById('average-line-chart').clientWidth - margin.left - margin.right;
    const height = document.getElementById('average-line-chart').clientHeight - margin.top - margin.bottom;

    d3.select("#average-line-chart svg").remove();

    const svg = d3.select("#average-line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain(d3.extent(lineData, d => d.year))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(lineData, d => d.avgCost)])
        .range([height, 0]);

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.avgCost));

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d / 1000}k`));

    svg.append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Average Total Cost per Year");
}

createAverageLineChart();
