function createTreemap(data = []) {
    // Default to show all project terms
    if (data.length === 0) {
        data = dataset.reduce((acc, curr) => {
            const term = acc.find(d => d.name === curr.PROJECT_TERMS);
            if (term) {
                term.value += curr.TOTAL_COST;
            } else {
                acc.push({ name: curr.PROJECT_TERMS, value: curr.TOTAL_COST });
            }
            return acc;
        }, []);
    }

    const width = document.getElementById('treemap').clientWidth;
    const height = document.getElementById('treemap').clientHeight;

    d3.select("#treemap svg").remove();

    const svg = d3.select("#treemap").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0,0)");

    const root = d3.hierarchy({ name: "root", children: data }).sum(d => d.value);

    d3.treemap()
        .size([width, height])
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
        .attr("y", d => d.y0)
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
        .attr("y", d => d.y0 + 20)
        .text(d => d.data.name)
        .attr("font-size", "10px")
        .attr("fill", "white");
}

createTreemap();
