let selectedCountry = null;

function createWorldMap(filteredData = null) {
    const data = filteredData ? filteredData : dataset;

    // Clear existing map
    d3.select("#world-map svg").remove();

    const width = document.getElementById('world-map').clientWidth;
    const height = document.getElementById('world-map').clientHeight;
    const projection = d3.geoMercator().scale(130).translate([width / 2, height / 1.5]);

    // Create SVG
    const svg = d3.select("#world-map").append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Countries Received Funds");

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

    // Load external data and create the map
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(worldGeojson) {

        // Process filtered data to get the funded average and org names by country
        const worldDataFiltered = {};
        data.forEach(d => {
            if (worldDataFiltered[d.ORG_COUNTRY]) {
                worldDataFiltered[d.ORG_COUNTRY].orgNames.push(d.ORG_NAME);
            } else {
                worldDataFiltered[d.ORG_COUNTRY] = {
                    orgNames: [d.ORG_NAME],
                    countryName: d.ORG_COUNTRY
                };
            }
        });

        // Create a color scale
        const colorScale = d3.scaleSequential()
            .domain([0, d3.max(Object.values(worldDataFiltered), d => d.orgNames.length)])
            .interpolator(d3.interpolateOrRd);

        // Draw the map
        const countries = svg.append("g")
            .selectAll("path")
            .data(worldGeojson.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => {
                const countryCode = d.id;
                return worldDataFiltered[countryCode] ? colorScale(worldDataFiltered[countryCode].orgNames.length) : '#b8b8b8';
            })
            .style("stroke", "black")
            .style("opacity", .8)
            .on("mouseover", function(event, d) {
                const countryCode = d.id;
                if (worldDataFiltered[countryCode]) {
                    const orgNamesList = worldDataFiltered[countryCode].orgNames.map(name => `<li>${name}</li>`).join('');
                    tooltip
                        .html(`<strong>${worldDataFiltered[countryCode].countryName}</strong><br><strong>Organizations:</strong><ul>${orgNamesList}</ul>`)
                        .style("display", "block");
                    d3.select(this).style("opacity", 1).style("stroke-width", 2).style("fill", '#e41a1c');
                }
            })
            .on("mousemove", function(event) {
                tooltip
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function(event, d) {
                tooltip.style("display", "none");
                d3.select(this).style("opacity", .8).style("stroke-width", 1).style("fill", d => {
                    if (d.id === selectedCountry) {
                        return '#ffcc00';
                    }
                    const countryCode = d.id;
                    return worldDataFiltered[countryCode] ? colorScale(worldDataFiltered[countryCode].orgNames.length) : '#b8b8b8';
                });
            })
            .on("click", function(event, d) {
                const countryCode = d.id;
                if (selectedCountry === countryCode) {
                    selectedCountry = null;
                    updateBarChart(null);
                    updateTreemap(null);
                    updateLineChart(null);
                } else {
                    selectedCountry = countryCode;
                    updateBarChart(data.filter(data => data.ORG_COUNTRY === countryCode));
                    updateTreemap(data.filter(data => data.ORG_COUNTRY === countryCode));
                    updateLineChart(data.filter(data => data.ORG_COUNTRY === countryCode));
                }
                updateMapColors();
            });

        function updateMapColors() {
            countries
                .attr("fill", d => {
                    if (d.id === selectedCountry) {
                        return '#ffcc00';
                    }
                    const countryCode = d.id;
                    return worldDataFiltered[countryCode] ? colorScale(worldDataFiltered[countryCode].orgNames.length) : '#b8b8b8';
                })
                .style("opacity", d => (selectedCountry && d.id !== selectedCountry) ? 0.3 : 1);
        }
    });
}

createWorldMap(dataset);
