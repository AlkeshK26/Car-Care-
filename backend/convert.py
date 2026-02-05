import pandas as pd
import os

input_file = 'indian_cars.csv' 

if os.path.exists(input_file):
    try:
        df = pd.read_csv(input_file)
        print("CSV file read ho gayi!")

        # Aapke columns: 'Brand' aur 'Model'
        if 'Brand' in df.columns and 'Model' in df.columns:
            # Hum Brand, Model aur Year ka data nikal rahe hain
            clean_df = df[['Brand', 'Model', 'Year']].drop_duplicates()
            
            # JSON file create karna
            clean_df.to_json('cars.json', orient='records', indent=4)
            print("Success! 'cars.json' file backend folder mein ban gayi hai.")
        else:
            print(f"Error: Columns nahi mile. Milna chahiye: Brand, Model. Mila: {df.columns.tolist()}")

    except Exception as e:
        print(f"Galti hui: {e}")
else:
    print(f"Error: {input_file} file nahi mili.")