import pandas as pd

# Import datasets
data_2019 = pd.read_csv('./data/raw/RePORTER_PRJ_C_FY2019.csv')
data_2020 = pd.read_csv('./data/raw/RePORTER_PRJ_C_FY2020.csv')
data_2021 = pd.read_csv('./data/raw/RePORTER_PRJ_C_FY2021.csv')
data_2022 = pd.read_csv('./data/raw/RePORTER_PRJ_C_FY2022.csv')
data_2023 = pd.read_csv('./data/raw/RePORTER_PRJ_C_FY2023.csv')

# Specify the columns to keep
columns_to_keep = [
    'APPLICATION_ID', 'AWARD_NOTICE_DATE', 'FY', 'ED_INST_TYPE', 'IC_NAME',
    'NIH_SPENDING_CATS', 'ORG_CITY', 'ORG_COUNTRY', 'ORG_DEPT', 'ORG_NAME',
    'PHR', 'PROJECT_TERMS', 'PROJECT_TITLE', 'DIRECT_COST_AMT', 
    'INDIRECT_COST_AMT', 'TOTAL_COST'
]

# Filter datasets to keep only the specified columns
data_2019_filtered = data_2019[columns_to_keep]
data_2020_filtered = data_2020[columns_to_keep]
data_2021_filtered = data_2021[columns_to_keep]
data_2022_filtered = data_2022[columns_to_keep]
data_2023_filtered = data_2023[columns_to_keep]

# Concatenate all datasets into one
all_data = pd.concat([data_2019_filtered, data_2020_filtered, data_2021_filtered, data_2022_filtered, data_2023_filtered])

# Optionally, reset the index of the concatenated DataFrame
all_data.reset_index(drop=True, inplace=True)

# Display the concatenated dataset
print(all_data)

# Save the concatenated dataset to a new CSV file if needed
all_data.to_csv('./data/processed/NIH_combined_data.csv', index=False)
