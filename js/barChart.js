// Track the currently selected bar
let selectedBar = null;

// Create the bar chart
function createBarChart(barData = []) {
    // Default to show all organizations
    if (barData.length === 0) {
        barData = dataset.reduce((acc, curr) => {
            const org = acc.find(d => d.name === curr.IC_NAME);
            if (org) {
                org.value += curr.TOTAL_COST;
            } else {
                acc.push({ name: curr.IC_NAME, value: curr.TOTAL_COST });
            }
            return acc;
        }, []);
    }

    // Sort the barData by value
    barData.sort((a, b) => b.value - a.value);

    const margin = { top: 40, right: -50, bottom: 40, left: 250 }; // Increased left margin to make space for the labels
    const width = document.getElementById('bar-chart').clientWidth - margin.left - margin.right;
    const barHeight = 30; // height of each bar including padding
    const chartHeight = Math.max(barData.length * barHeight, document.getElementById('bar-chart').clientHeight - margin.top - margin.bottom); // Ensure chart height is sufficient

    d3.select("#bar-chart svg").remove();

    const svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", chartHeight + margin.top + margin.bottom)
        .attr("class", "scrollable-content")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Funder NIH Institute or Center");

    const x = d3.scaleLinear()
        .domain([0, d3.max(barData, d => d.value) || 0])
        .range([0, width * 0.8]); // Reduce the range to make bars narrower

    const y = d3.scaleBand()
        .range([0, chartHeight])
        .domain(barData.map(d => d.name))
        .padding(.1);

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeTableau10);

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
            if (d !== selectedBar) {
                d3.select(this).attr("fill", d => color(d.name));
            }
        })
        .on("click", function(event, d) {
            // Update selected bar
            if (selectedBar === d) {
                selectedBar = null;
                updateWorldMap(null);
            } else {
                selectedBar = d;
                const orgData = dataset.find(data => data.IC_NAME === d.name);
                if (orgData) {
                    updateWorldMap(orgData.ORG_COUNTRY);
                }
            }
            updateBarColors();
        });

    function updateBarColors() {
        bars.attr("fill", function(d) {
            if (d === selectedBar) {
                return color(d.name);
            } else if (selectedBar) {
                return "#ccc"; // Faded color
            } else {
                return color(d.name);
            }
        });
    }

    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "10px"); // Adjust the font size here

    svg.append("g").attr("transform", `translate(0, ${chartHeight})`).call(d3.axisBottom(x));
}

// Initial call to create the bar chart with all data
createBarChart();
