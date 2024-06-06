// Create the treemap chart
function createTreemap() {
    const data = {
        name: "root",
        children: [
            { name: "Chronic pain patient", value: 200 },
            { name: "Clinic", value: 190 },
            { name: "Cognitive function", value: 165 },
            { name: "Candidate Disease", value: 160 },
            { name: "Histology", value: 155 },
            { name: "Epigenetic Process", value: 120 },
            { name: "Functional disorder", value: 112 },
            { name: "DLG4 gene", value: 90 },
            { name: "Constriction", value: 89 },
            { name: "Biological Models", value: 56 },
            { name: "Behavioral Medicine", value: 45 }
        ]
    }

    const width = document.getElementById('treemap').clientWidth;
    const height = document.getElementById('treemap').clientHeight;

    const svg = d3.select("#treemap").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0,0)");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Funded Application Areas");

    const root = d3.hierarchy(data).sum(d => d.value);

    d3.treemap()
        .size([width, height - 30])  // Adjust size to account for title
        .padding(2)(root);

    // Color scale
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

    const nodes = svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0 + 30)  // Adjust position to account for title
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .style("fill", d => color(d.data.name))
        .on("mouseover", function(event, d) {
            tooltip
                .html(`<strong>${d.data.name}</strong><br>Value: ${d.data.value}`)
                .style("display", "block");
            d3.select(this).attr("opacity", 0.7);
        })
        .on("mousemove", function(event) {
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function(event, d) {
            tooltip.style("display", "none");
            d3.select(this).attr("opacity", 1);
        });

    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", d => d.x0 + 5)
        .attr("y", d => d.y0 + 45)  // Adjust position to account for title
        .text(d => d.data.name)
        .attr("font-size", "12px")
        .attr("fill", "white")
        .attr("clip-path", d => `url(#clip-${d.data.name.replace(/\s+/g, '-')})`);  // Add clip-path to ensure text stays within bounds

    // Add clip-paths for text elements
    svg.selectAll("defs")
        .data(root.leaves())
        .enter()
        .append("defs")
        .append("clipPath")
        .attr("id", d => `clip-${d.data.name.replace(/\s+/g, '-')}`)
        .append("rect")
        .attr("x", d => d.x0 + 5)
        .attr("y", d => d.y0 + 30)
        .attr("width", d => d.x1 - d.x0 - 10)
        .attr("height", d => d.y1 - d.y0);
}

createTreemap();
