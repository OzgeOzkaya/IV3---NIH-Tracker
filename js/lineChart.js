function createLineChart() {
    // Dummy data for line chart
    const lineData = [
        { date: new Date(2019, 0, 1), value: 30 },
        { date: new Date(2020, 0, 1), value: 80 },
        { date: new Date(2021, 0, 1), value: 45 },
        { date: new Date(2022, 0, 1), value: 60 },
        { date: new Date(2023, 0, 1), value: 40 }
    ];

    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = document.getElementById('line-chart').clientWidth - margin.left - margin.right;
    const height = document.getElementById('line-chart').clientHeight - margin.top - margin.bottom;

    const svg = d3.select("#line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
        .domain([new Date(2019, 0, 1), new Date(2023, 0, 1)])
        .range([0, width]);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%Y")));

    const y = d3.scaleLinear()
        .domain([0, d3.max(lineData, d => d.value)])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    // Tooltip setup
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("display", "none");

    svg.append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", primaryColor)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))
        );

    svg.selectAll("circle")
        .data(lineData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 4)
        .attr("fill", primaryColor)
        .on("mouseover", function(event, d) {
            tooltip
                .html(`<strong>${d3.timeFormat("%Y")(d.date)}</strong><br>Funded Average Amount: $${d.value}`)
                .style("display", "block");
            d3.select(this).attr("fill", highlightColor);
        })
        .on("mousemove", function(event) {
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function(event, d) {
            tooltip.style("display", "none");
            d3.select(this).attr("fill", primaryColor);
        });
}

createLineChart();
