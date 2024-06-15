function createBarChart(filteredData = null) {
    const data = filteredData ? filteredData : dataset;
    const barData = data.reduce((acc, curr) => {
        const org = acc.find(d => d.name === curr.IC_NAME);
        if (org) {
            org.value += curr.TOTAL_COST;
        } else {
            acc.push({ name: curr.IC_NAME, value: curr.TOTAL_COST });
        }
        return acc;
    }, []);

    // Sort the barData by value
    barData.sort((a, b) => b.value - a.value);

    // Clear existing chart
    d3.select("#bar-chart svg").remove();

    const margin = { top: 40, right: -50, bottom: 40, left: 50 };
    const width = document.getElementById('bar-chart').clientWidth - margin.left - margin.right;
    const barHeight = 30;
    const chartHeight = Math.max(barData.length * barHeight, document.getElementById('bar-chart').clientHeight - margin.top - margin.bottom);

    const svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", chartHeight + margin.top + margin.bottom)
        .attr("class", "scrollable-content")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Funder NIH Institute or Center");

    const x = d3.scaleLinear()
        .domain([0, d3.max(barData, d => d.value) || 0])
        .range([0, width * 0.8]);

    const y = d3.scaleBand()
        .range([0, chartHeight])
        .domain(barData.map(d => d.name))
        .padding(.1);

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("display", "none");

    const bars = svg.selectAll("rect")
        .data(barData)
        .enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth())
        .attr("fill", d => color(d.name))
        .on("mouseover", function(event, d) {
            tooltip
                .html(`<strong>${d.name}</strong><br>Funded Average Amount: $${d.value}`)
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
            d3.select(this).attr("fill", d => color(d.name));
        })
        .on("click", function(event, d) {
            const orgData = dataset.filter(data => data.IC_NAME === d.name);
            updateWorldMap(orgData[0].ORG_COUNTRY);
            updateTreemap(orgData);
            updateLineChart(orgData);
        });

    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "10px");

    svg.append("g").attr("transform", `translate(0, ${chartHeight})`).call(d3.axisBottom(x));
}

createBarChart();
