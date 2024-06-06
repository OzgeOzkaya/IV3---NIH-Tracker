// Create the treemap
function createTreemap() {
    const data = {
        name: "root",
        children: [
            { name: "chronic pain patient", value: 100 },
            { name: "Clinic", value: 300 },
            { name: "cognitive function", value: 200 }
        ]
    }

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = document.getElementById('treemap').clientWidth - margin.left - margin.right;
    const height = document.getElementById('treemap').clientHeight - margin.top - margin.bottom;

    const svg = d3.select("#treemap").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(data).sum(d => d.value);

    d3.treemap()
        .size([width, height])
        .padding(2)
        (root);

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

    svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", primaryColor)
        .on("mouseover", function(event, d) {
            tooltip
                .html(`<strong>${d.data.name}</strong><br>Funded Average Amount: $${d.data.value}`)
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

    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", d => d.x0 + 5)
        .attr("y", d => d.y0 + 20)
        .text(d => d.data.name)
        .attr("font-size", "15px")
        .attr("fill", "white");
}

createTreemap();
