# Import important libraries
import joblib
import pandas as pd
import sys
import json

# Load model
loaded_model = joblib.load("python/prices-model.joblib")
# Make a prediction
predict = loaded_model.predict(pd.DataFrame({
    "Avg. Area Income": [float(sys.argv[1])],
    "Avg. Area House Age": [float(sys.argv[2])],
    "Avg. Area Number of Rooms": [float(sys.argv[3])],
    "Avg. Area Number of Bedrooms": [float(sys.argv[4])],
    "Area Population": [float(sys.argv[5])],
}))

# Output prediction
print(json.dumps({"price": round(predict[0],3)}))