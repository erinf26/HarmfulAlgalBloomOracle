import pandas as pd
import json

# load the CSV file
file_path = '/Users/erinfoley/Desktop/nasa2024/data/ccri_lakes_withLagosID.csv'
lake_data = pd.read_csv(file_path)

# extract the necessary columns
lakes = lake_data[['site', 'MEAN_lat', 'MEAN_long']].rename(columns={'site': 'name', 'MEAN_lat': 'latitude', 'MEAN_long': 'longitude'}).to_dict(orient='records')

# save the extracted data to a JSON file
lakes_json_path = '/Users/erinfoley/Desktop/nasa2024/data/lakes.json'
with open(lakes_json_path, 'w') as f:
    json.dump(lakes, f)

lakes_json_path
