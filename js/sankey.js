function createSankey() {
    // Dummy data for the Sankey diagram
    const data = {
        nodes: [
            { name: "A" },
            { name: "B" },
            { name: "C" },
            { name: "D" },
            { name: "E" }
        ],
        links: [
            { source: 0, target: 1, value: 10 },
            { source: 0, target: 2, value: 50 },
            { source: 0, target: 3, value: 40 },
            { source: 0, target: 4, value: 30 }
        ]
    };

    const width = document.getElementById('sankey').clientWidth;
    const height = 270; // Adjust height to account for the title

    const svg = d3.select("#sankey").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Funded Organizations by NIH Institute or Center");

    const sankey = d3.sankey()
        .nodeWidth(36)
        .nodePadding(20)
        .extent([[1, 30], [width - 1, height - 30]]); // Adjust extent to account for title height

    const { nodes, links } = sankey({
        nodes: data.nodes.map(d => Object.assign({}, d)),
        links: data.links.map(d => Object.assign({}, d))
    });

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeTableau10);

    svg.append("g")
        .selectAll("rect")
        .data(nodes)
        .enter()
        .append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", sankey.nodeWidth())
        .attr("fill", d => color(d.name))
        .attr("stroke", "#000");

    svg.append("g")
        .attr("fill", "none")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke-width", d => Math.max(1, d.width))
        .attr("stroke", "gray")
        .style("stroke-opacity", 0.5);

    svg.append("g")
        .style("font", "12px sans-serif")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("x", d => d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .text(d => d.name)
        .filter(d => d.x0 < width / 2)
        .attr("x", d => d.x1 + 6)
        .attr("text-anchor", "start");
}

createSankey();
