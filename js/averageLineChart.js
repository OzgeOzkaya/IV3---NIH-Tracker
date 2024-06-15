function createLineChart(filteredData = null) {
    const data = filteredData ? filteredData : dataset;
    const yearlyData = d3.groups(data, d => d.FY).map(([key, values]) => {
        const avg = d3.mean(values, d => d.TOTAL_COST);
        return { year: key, avgCost: avg };
    });

    yearlyData.sort((a, b) => a.year - b.year);

    const margin = { top: 40, right: 30, bottom: 40, left: 50 };
    const width = document.getElementById('average-line-chart').clientWidth - margin.left - margin.right;
    const height = document.getElementById('average-line-chart').clientHeight - margin.top - margin.bottom;

    d3.select("#average-line-chart svg").remove();

    const svg = d3.select("#average-line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Average Total Cost per Year");

    const x = d3.scaleLinear()
        .domain([d3.min(yearlyData, d => d.year), d3.max(yearlyData, d => d.year)])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(yearlyData, d => d.avgCost)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("path")
        .datum(yearlyData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x(d.year))
            .y(d => y(d.avgCost))
        );
}

createLineChart();
