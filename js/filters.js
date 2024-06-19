// filters.js

document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    setupEventListeners();
    setupResetButton();
});

function populateDropdowns() {
    updateDropdowns(dataset);
}

function updateDropdowns(data) {
    const fundedCountryInput = document.getElementById('funded-country');
    const yearInput = document.getElementById('year');
    const projectTermsInput = document.getElementById('project-terms');
    const icNameInput = document.getElementById('ic-name');
    const orgNameInput = document.getElementById('org-name');

    const fundedCountryList = document.getElementById('funded-country-list');
    const yearList = document.getElementById('year-list');
    const projectTermsList = document.getElementById('project-terms-list');
    const icNameList = document.getElementById('ic-name-list');
    const orgNameList = document.getElementById('org-name-list');

    // Save current selections
    const fundedCountryValue = fundedCountryInput.value;
    const yearValue = yearInput.value;
    const projectTermsValue = projectTermsInput.value;
    const icNameValue = icNameInput.value;
    const orgNameValue = orgNameInput.value;

    // Clear existing options
    fundedCountryList.innerHTML = '';
    yearList.innerHTML = '';
    projectTermsList.innerHTML = '';
    icNameList.innerHTML = '';
    orgNameList.innerHTML = '';

    // Get unique values based on filtered data and sort them alphabetically
    const fundedCountries = [...new Set(data.map(d => worldData[d.ORG_COUNTRY]?.countryName || d.ORG_COUNTRY))].sort();
    const years = [...new Set(data.map(d => d.FY))].sort((a, b) => a - b);
    const projectTerms = [...new Set(data.flatMap(d => d.PROJECT_TERMS))].sort();
    const icNames = [...new Set(data.map(d => d.IC_NAME))].sort();
    const orgNames = [...new Set(data.map(d => d.ORG_NAME))].sort();

    fundedCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        fundedCountryList.appendChild(option);
    });

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        yearList.appendChild(option);
    });

    projectTerms.forEach(term => {
        const option = document.createElement('option');
        option.value = term;
        projectTermsList.appendChild(option);
    });

    icNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        icNameList.appendChild(option);
    });

    orgNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        orgNameList.appendChild(option);
    });

    // Restore previous selections
    fundedCountryInput.value = fundedCountryValue;
    yearInput.value = yearValue;
    projectTermsInput.value = projectTermsValue;
    icNameInput.value = icNameValue;
    orgNameInput.value = orgNameValue;
}

function setupEventListeners() {
    const fundedCountryInput = document.getElementById('funded-country');
    const yearInput = document.getElementById('year');
    const projectTermsInput = document.getElementById('project-terms');
    const icNameInput = document.getElementById('ic-name');
    const orgNameInput = document.getElementById('org-name');
    const downloadButton = document.getElementById('download-data');

    fundedCountryInput.addEventListener('input', filterData);
    yearInput.addEventListener('input', filterData);
    projectTermsInput.addEventListener('input', filterData);
    icNameInput.addEventListener('input', filterData);
    orgNameInput.addEventListener('input', filterData);
    downloadButton.addEventListener('click', downloadFilteredData);
}

function setupResetButton() {
    const resetButton = document.getElementById('reset-filters');
    resetButton.addEventListener('click', resetFilters);
}

function resetFilters() {
    document.getElementById('funded-country').value = '';
    document.getElementById('year').value = '';
    document.getElementById('project-terms').value = '';
    document.getElementById('ic-name').value = '';
    document.getElementById('org-name').value = '';

    // Reset dropdowns and charts to show the full dataset
    updateDropdowns(dataset);
    createWorldMap(dataset);
    createBarChart(dataset);
    createTreemap(dataset);
    createLineChart(dataset);
}

function filterData() {
    const fundedCountry = document.getElementById('funded-country').value;
    const year = document.getElementById('year').value;
    const projectTerms = document.getElementById('project-terms').value;
    const icName = document.getElementById('ic-name').value;
    const orgName = document.getElementById('org-name').value;

    let filteredData = dataset;

    if (fundedCountry) {
        filteredData = filteredData.filter(d => (worldData[d.ORG_COUNTRY]?.countryName || d.ORG_COUNTRY).toLowerCase().includes(fundedCountry.toLowerCase()));
    }

    if (year) {
        filteredData = filteredData.filter(d => d.FY.toString().includes(year));
    }

    if (projectTerms) {
        filteredData = filteredData.filter(d => d.PROJECT_TERMS.some(term => term.toLowerCase().includes(projectTerms.toLowerCase())));
    }

    if (icName) {
        filteredData = filteredData.filter(d => d.IC_NAME.toLowerCase().includes(icName.toLowerCase()));
    }

    if (orgName) {
        filteredData = filteredData.filter(d => d.ORG_NAME.toLowerCase().includes(orgName.toLowerCase()));
    }

    // Update datalists with filtered data
    updateDropdowns(filteredData);

    // Update charts with filtered data
    createWorldMap(filteredData);
    createBarChart(filteredData);
    createTreemap(filteredData);
    createLineChart(filteredData);
}

function downloadFilteredData() {
    const fundedCountry = document.getElementById('funded-country').value;
    const year = document.getElementById('year').value;
    const projectTerms = document.getElementById('project-terms').value;
    const icName = document.getElementById('ic-name').value;
    const orgName = document.getElementById('org-name').value;

    let filteredData = dataset;

    if (fundedCountry) {
        filteredData = filteredData.filter(d => (worldData[d.ORG_COUNTRY]?.countryName || d.ORG_COUNTRY).toLowerCase().includes(fundedCountry.toLowerCase()));
    }

    if (year) {
        filteredData = filteredData.filter(d => d.FY.toString().includes(year));
    }

    if (projectTerms) {
        filteredData = filteredData.filter(d => d.PROJECT_TERMS.some(term => term.toLowerCase().includes(projectTerms.toLowerCase())));
    }

    if (icName) {
        filteredData = filteredData.filter(d => d.IC_NAME.toLowerCase().includes(icName.toLowerCase()));
    }

    if (orgName) {
        filteredData = filteredData.filter(d => d.ORG_NAME.toLowerCase().includes(orgName.toLowerCase()));
    }

    // Remove the PROJECT_TERMS field from the data
    const dataToExport = filteredData.map(({ PROJECT_TERMS, ...rest }) => rest);

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "filtered_data.xlsx");
}
