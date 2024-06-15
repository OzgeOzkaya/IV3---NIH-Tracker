// filters.js

document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    setupEventListeners();
});

function populateDropdowns() {
    const fundedCountrySelect = document.getElementById('funded-country');
    const yearSelect = document.getElementById('year');
    const projectTermsSelect = document.getElementById('project-terms');
    const icNameSelect = document.getElementById('ic-name');
    const orgNameSelect = document.getElementById('org-name');

    const fundedCountries = [...new Set(dataset.map(d => d.ORG_COUNTRY))];
    const years = [...new Set(dataset.map(d => d.FY))];
    const projectTerms = [...new Set(dataset.map(d => d.PROJECT_TERMS))];
    const icNames = [...new Set(dataset.map(d => d.IC_NAME))];
    const orgNames = [...new Set(dataset.map(d => d.ORG_NAME))];

    fundedCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        fundedCountrySelect.appendChild(option);
    });

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    projectTerms.forEach(term => {
        const option = document.createElement('option');
        option.value = term;
        option.textContent = term;
        projectTermsSelect.appendChild(option);
    });

    icNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        icNameSelect.appendChild(option);
    });

    orgNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        orgNameSelect.appendChild(option);
    });
}

function setupEventListeners() {
    const fundedCountrySelect = document.getElementById('funded-country');
    const yearSelect = document.getElementById('year');
    const projectTermsSelect = document.getElementById('project-terms');
    const icNameSelect = document.getElementById('ic-name');
    const orgNameSelect = document.getElementById('org-name');

    fundedCountrySelect.addEventListener('change', filterData);
    yearSelect.addEventListener('change', filterData);
    projectTermsSelect.addEventListener('change', filterData);
    icNameSelect.addEventListener('change', filterData);
    orgNameSelect.addEventListener('change', filterData);
}

function filterData() {
    const fundedCountry = document.getElementById('funded-country').value;
    const year = document.getElementById('year').value;
    const projectTerms = document.getElementById('project-terms').value;
    const icName = document.getElementById('ic-name').value;
    const orgName = document.getElementById('org-name').value;

    let filteredData = dataset;

    if (fundedCountry) {
        filteredData = filteredData.filter(d => d.ORG_COUNTRY === fundedCountry);
    }

    if (year) {
        filteredData = filteredData.filter(d => d.FY == year);
    }

    if (projectTerms) {
        filteredData = filteredData.filter(d => d.PROJECT_TERMS === projectTerms);
    }

    if (icName) {
        filteredData = filteredData.filter(d => d.IC_NAME === icName);
    }

    if (orgName) {
        filteredData = filteredData.filter(d => d.ORG_NAME === orgName);
    }

    // Update charts with filtered data
    createWorldMap(filteredData);
    createBarChart(filteredData);
    createTreemap(filteredData);
    createLineChart(filteredData);
}
