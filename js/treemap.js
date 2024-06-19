function createTreemap(filteredData = null) {
    const data = filteredData ? filteredData : dataset;

    // Create a map to calculate the average total cost and count for each project term
    const termSums = {};
    const termCounts = {};

    data.forEach(curr => {
        curr.PROJECT_TERMS.forEach(term => {
            if (termSums[term]) {
                termSums[term] += curr.TOTAL_COST;
                termCounts[term] += 1;
            } else {
                termSums[term] = curr.TOTAL_COST;
                termCounts[term] = 1;
            }
        });
    });

    // Convert the termSums and termCounts maps to an array of objects for the treemap
    const treemapData = Object.keys(termSums).map(term => ({
        name: term,
        value: termSums[term] / termCounts[term], // Calculate the average total cost
        count: termCounts[term] // Add the count
    }));

    // Sort the treemapData by count first, then by average total cost
    treemapData.sort((a, b) => b.count - a.count || b.value - a.value);

    // Limit the number of terms to at most 50
    const limitedTreemapData = treemapData.slice(0, 75);

    const width = document.getElementById('treemap').clientWidth;
    const height = document.getElementById('treemap').clientHeight;

    d3.select("#treemap svg").remove();

    const svg = d3.select("#treemap").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Project Term Distribution");

    const treemapGroup = svg.append("g")
        .attr("transform", "translate(0,30)"); // Adjust the translation to account for the title height

    const root = d3.hierarchy({ name: "root", children: limitedTreemapData }).sum(d => d.value);

    d3.treemap()
        .size([width, height - 30]) // Adjust the height to account for the title height
        .padding(2)(root);

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

    const nodes = treemapGroup.selectAll("rect")
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
                .html(`<strong>${d.data.name}</strong><br>Avg Total Cost: $${d3.format(",.2f")(d.data.value)}<br>Count: ${d.data.count}`)
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

    treemapGroup.selectAll("text")
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
