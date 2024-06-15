let selectedICName = null;

// Dimensions and map setup
const width = document.getElementById('world-map').clientWidth;
const height = document.getElementById('world-map').clientHeight;
const projection = d3.geoMercator().scale(130).translate([width / 2, height / 1.5]);

// Color palette
const primaryColor = '#69b3a2';
const secondaryColor = '#404080';
const highlightColor = '#e41a1c';
const selectedColor = '#ffcc00';  // Color for the selected country

let selectedCountry = null;

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
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){

    // Create a color scale
    const colorScale = d3.scaleSequential()
        .domain([0, d3.max(Object.values(worldData), d => d.fundedAvg)])
        .interpolator(d3.interpolateOrRd);

    // Draw the map
    const countries = svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", d => {
            const countryCode = d.id;
            return worldData[countryCode] ? colorScale(worldData[countryCode].fundedAvg) : '#b8b8b8';
        })
        .style("stroke", "black")
        .style("opacity", .8)
        .on("mouseover", function(event, d) {
            const countryCode = d.id;
            if (worldData[countryCode]) {
                tooltip
                    .html(`<strong>${worldData[countryCode].countryName}</strong><br>Funded Average Amount: $${worldData[countryCode].fundedAvg}`)
                    .style("display", "block");
                d3.select(this).style("opacity", 1).style("stroke-width", 2).style("fill", highlightColor);
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
                    return selectedColor;
                }
                const countryCode = d.id;
                return worldData[countryCode] ? colorScale(worldData[countryCode].fundedAvg) : '#b8b8b8';
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
                updateBarChart(countryCode);
                updateTreemap(countryCode);
                updateLineChart(countryCode);
            }
            updateMapColors(); // Ensure the map colors are updated immediately
        });

    function updateMapColors() {
        countries
            .attr("fill", d => {
                if (d.id === selectedCountry) {
                    return selectedColor;
                }
                const countryCode = d.id;
                return worldData[countryCode] ? colorScale(worldData[countryCode].fundedAvg) : '#b8b8b8';
            })
            .style("opacity", d => (selectedCountry && d.id !== selectedCountry) ? 0.3 : 1);
    }

    window.updateWorldMap = function(countryCode) {
        selectedCountry = countryCode;
        updateMapColors();
    }

    window.updateWorldMapFromBar = function(icName) {
        selectedICName = icName;
        selectedCountry = null; // Clear the previously selected country if any
        updateMapColors();
    }
});

function updateBarChart(countryCode) {
    let filteredData;
    if (countryCode) {
        filteredData = dataset.filter(d => d.ORG_COUNTRY === countryCode);
    } else {
        filteredData = dataset;
    }
    
    const barData = filteredData.reduce((acc, curr) => {
        const org = acc.find(d => d.name === curr.IC_NAME);
        if (org) {
            org.value += curr.TOTAL_COST;
        } else {
            acc.push({ name: curr.IC_NAME, value: curr.TOTAL_COST });
        }
        return acc;
    }, []);
    
    createBarChart(barData);
}

function updateTreemap(countryCode) {
    let filteredData;
    if (countryCode) {
        filteredData = dataset.filter(d => d.ORG_COUNTRY === countryCode);
    } else {
        filteredData = dataset;
    }

    const treemapData = filteredData.reduce((acc, curr) => {
        const term = acc.find(d => d.name === curr.PROJECT_TERMS);
        if (term) {
            term.value += curr.TOTAL_COST;
        } else {
            acc.push({ name: curr.PROJECT_TERMS, value: curr.TOTAL_COST });
        }
        return acc;
    }, []);

    createTreemap(treemapData);
}

function updateLineChart(countryCode) {
    let filteredData;
    if (countryCode) {
        filteredData = dataset.filter(d => d.ORG_COUNTRY === countryCode);
    } else {
        filteredData = dataset;
    }

    const lineData = d3.groups(filteredData, d => d.FY).map(([key, values]) => {
        const avg = d3.mean(values, d => d.TOTAL_COST);
        return { year: key, avgCost: avg };
    });

    createAverageLineChart(lineData);
}
