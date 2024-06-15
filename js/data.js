const dataset = [
    { APPLICATION_ID: 1, AWARD_NOTICE_DATE: "2020-01-01", FY: 2020, IC_NAME: "NIDDK", NIH_SPENDING_CATS: "Research", ORG_CITY: "New York", ORG_COUNTRY: "USA", ORG_DEPT: "Dept A", ORG_NAME: "JESSE BROWN VA MEDICAL CENTER", PHR: "PHR A", PROJECT_TERMS: "Diabetes, Kidney Disease", PROJECT_TITLE: "Investigation of Diabetes Management", DIRECT_COST_AMT: 50000, INDIRECT_COST_AMT: 10000, TOTAL_COST: 60000 },
    { APPLICATION_ID: 2, AWARD_NOTICE_DATE: "2020-01-01", FY: 2020, IC_NAME: "NIMH", NIH_SPENDING_CATS: "Research", ORG_CITY: "Chicago", ORG_COUNTRY: "USA", ORG_DEPT: "Dept B", ORG_NAME: "VETERANS HEALTH ADMINISTRATION", PHR: "PHR B", PROJECT_TERMS: "Mental Health, PTSD", PROJECT_TITLE: "PTSD Treatment in Veterans", DIRECT_COST_AMT: 80000, INDIRECT_COST_AMT: 20000, TOTAL_COST: 100000 },
    { APPLICATION_ID: 3, AWARD_NOTICE_DATE: "2020-01-01", FY: 2020, IC_NAME: "NIAID", NIH_SPENDING_CATS: "Research", ORG_CITY: "Los Angeles", ORG_COUNTRY: "USA", ORG_DEPT: "Dept C", ORG_NAME: "DURHAM VA MEDICAL CENTER", PHR: "PHR C", PROJECT_TERMS: "Infectious Diseases, HIV", PROJECT_TITLE: "HIV Vaccine Development", DIRECT_COST_AMT: 30000, INDIRECT_COST_AMT: 15000, TOTAL_COST: 45000 },
    { APPLICATION_ID: 4, AWARD_NOTICE_DATE: "2020-01-01", FY: 2020, IC_NAME: "NCI", NIH_SPENDING_CATS: "Research", ORG_CITY: "Toronto", ORG_COUNTRY: "CAN", ORG_DEPT: "Dept D", ORG_NAME: "UNIVERSITY OF TORONTO", PHR: "PHR D", PROJECT_TERMS: "Cancer Research", PROJECT_TITLE: "Breast Cancer Genomics", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 5, AWARD_NOTICE_DATE: "2020-03-01", FY: 2020, IC_NAME: "NHLBI", NIH_SPENDING_CATS: "Research", ORG_CITY: "Vienna", ORG_COUNTRY: "AUT", ORG_DEPT: "Dept E", ORG_NAME: "TUWIEN", PHR: "PHR E", PROJECT_TERMS: "Cardiovascular Disease", PROJECT_TITLE: "Heart Disease in Europe", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 6, AWARD_NOTICE_DATE: "2020-03-01", FY: 2020, IC_NAME: "NIGMS", NIH_SPENDING_CATS: "Research", ORG_CITY: "Ankara", ORG_COUNTRY: "TUR", ORG_DEPT: "Dept F", ORG_NAME: "HACETTEPE UNIVERSITY", PHR: "PHR F", PROJECT_TERMS: "Genomics, Bioinformatics", PROJECT_TITLE: "Genomic Analysis of Turkish Population", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 7, AWARD_NOTICE_DATE: "2020-03-01", FY: 2020, IC_NAME: "NIA", NIH_SPENDING_CATS: "Research", ORG_CITY: "Berlin", ORG_COUNTRY: "DEU", ORG_DEPT: "Dept G", ORG_NAME: "CHARITÉ - UNIVERSITÄTSMEDIZIN BERLIN", PHR: "PHR G", PROJECT_TERMS: "Aging, Alzheimer's Disease", PROJECT_TITLE: "Alzheimer's Disease Progression", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 8, AWARD_NOTICE_DATE: "2020-03-01", FY: 2020, IC_NAME: "NIDCR", NIH_SPENDING_CATS: "Research", ORG_CITY: "Paris", ORG_COUNTRY: "FRA", ORG_DEPT: "Dept H", ORG_NAME: "INSERM", PHR: "PHR H", PROJECT_TERMS: "Oral Health, Dental Research", PROJECT_TITLE: "Dental Caries in Children", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 9, AWARD_NOTICE_DATE: "2019-03-01", FY: 2019, IC_NAME: "NIBIB", NIH_SPENDING_CATS: "Research", ORG_CITY: "São Paulo", ORG_COUNTRY: "BRA", ORG_DEPT: "Dept I", ORG_NAME: "UNIVERSITY OF SÃO PAULO", PHR: "PHR I", PROJECT_TERMS: "Biomedical Engineering", PROJECT_TITLE: "Wearable Health Monitors", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 10, AWARD_NOTICE_DATE: "2023-03-01", FY: 2023, IC_NAME: "NIMHD", NIH_SPENDING_CATS: "Research", ORG_CITY: "Mexico City", ORG_COUNTRY: "MEX", ORG_DEPT: "Dept J", ORG_NAME: "NATIONAL INSTITUTE OF PUBLIC HEALTH", PHR: "PHR J", PROJECT_TERMS: "Health Disparities", PROJECT_TITLE: "Healthcare Access in Rural Mexico", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 11, AWARD_NOTICE_DATE: "2022-03-01", FY: 2022, IC_NAME: "NCCIH", NIH_SPENDING_CATS: "Research", ORG_CITY: "Moscow", ORG_COUNTRY: "RUS", ORG_DEPT: "Dept K", ORG_NAME: "MOSCOW STATE UNIVERSITY", PHR: "PHR K", PROJECT_TERMS: "Complementary Medicine", PROJECT_TITLE: "Herbal Treatments for Anxiety", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 12, AWARD_NOTICE_DATE: "2021-03-01", FY: 2021, IC_NAME: "NIDA", NIH_SPENDING_CATS: "Research", ORG_CITY: "St. Petersburg", ORG_COUNTRY: "RUS", ORG_DEPT: "Dept L", ORG_NAME: "ST. PETERSBURG STATE UNIVERSITY", PHR: "PHR L", PROJECT_TERMS: "Substance Abuse, Addiction", PROJECT_TITLE: "Opioid Addiction Treatments", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 50000 },
    { APPLICATION_ID: 13, AWARD_NOTICE_DATE: "2021-03-01", FY: 2021, IC_NAME: "NIDA", NIH_SPENDING_CATS: "Research", ORG_CITY: "St. Petersburg", ORG_COUNTRY: "RUS", ORG_DEPT: "Dept L", ORG_NAME: "ST. PETERSBURG STATE UNIVERSITY", PHR: "PHR L", PROJECT_TERMS: "Substance Abuse, Addiction", PROJECT_TITLE: "Opioid Addiction Treatments", DIRECT_COST_AMT: 45000, INDIRECT_COST_AMT: 5000, TOTAL_COST: 30000 }
];


const worldData = {
    USA: { fundedAvg: 70, countryName: "United States" },
    CAN: { fundedAvg: 55, countryName: "Canada" },
    AUT: { fundedAvg: 65, countryName: "Austria" },
    GER: { fundedAvg: 75, countryName: "Germany" },
    FRA: { fundedAvg: 70, countryName: "France" },
    TUR: { fundedAvg: 60, countryName: "Turkey" },
    BRA: { fundedAvg: 50, countryName: "Brazil" },
    MEX: { fundedAvg: 45, countryName: "Mexico" },
    RUS: { fundedAvg: 55, countryName: "Russia" },
    IND: { fundedAvg: 40, countryName: "India" },
    CHN: { fundedAvg: 65, countryName: "China" },
    JPN: { fundedAvg: 70, countryName: "Japan" },
    AUS: { fundedAvg: 60, countryName: "Australia" },
    ITA: { fundedAvg: 55, countryName: "Italy" },
    UK: { fundedAvg: 75, countryName: "United Kingdom" },
    KOR: { fundedAvg: 50, countryName: "South Korea" },
    ESP: { fundedAvg: 60, countryName: "Spain" },
    NLD: { fundedAvg: 65, countryName: "Netherlands" },
    CHE: { fundedAvg: 70, countryName: "Switzerland" },
    SWE: { fundedAvg: 60, countryName: "Sweden" }
};

