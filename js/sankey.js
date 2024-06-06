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
            { source: 0, target: 2, value: 5 },
            { source: 1, target: 3, value: 15 },
            { source: 2, target: 4, value: 10 },
            { source: 3, target: 4, value: 5 }
        ]
    };

    const width = document.getElementById('sankey').clientWidth;
    const height = 400;

    const svg = d3.select("#sankey").append("svg")
        .attr("width", width)
        .attr("height", height);

    const sankey = d3.sankey()
        .nodeWidth(36)
        .nodePadding(20)
        .extent([[1, 1], [width - 1, height - 1]]);

    const { nodes, links } = sankey({
        nodes: data.nodes.map(d => Object.assign({}, d)),
        links: data.links.map(d => Object.assign({}, d))
    });

    svg.append("g")
        .selectAll("rect")
        .data(nodes)
        .enter()
        .append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", sankey.nodeWidth())
        .attr("fill", "#69b3a2")
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
