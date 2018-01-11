import logging, datetime, os, json, math
import pandas as pd

from flask import Flask, render_template, request

basedir = os.path.dirname(os.path.realpath(__file__))

# set up logging
logging.basicConfig(level=logging.DEBUG)
logging.info("Starting the MGH Visualization Platform...")

app = Flask(__name__)


@app.route("/")
def home():
    # Parse PANAS data
    filenames = ['P1-PANAS.csv', 'P2-PANAS.csv', 'P3-PANAS.csv', 'P4-PANAS.csv', 'P5-PANAS.csv']
    panas_dict = {}

    for filename in filenames:
        df = pd.read_csv(filename)
        # print(df.columns.values)
        column_names = list(df.columns.values)
        column_quant_names = column_names[12:32] # numerical column names

        x_arr = []
        # y_arr = []
        pos_arr = []
        neg_arr = []

        for index, row in df.iterrows():
            # print("Date & Time: %s %s" % (row[column_names[2]], row[column_names[3]]))
            # print("Sum: %s" % row[column_quant_names].sum(axis=0)) # need to sum by each row only
            if not math.isnan(row[column_quant_names].sum(axis=0)):
                # print(type(row[column_names[2]] + " " + row[column_names[3]]))
                # print(type(row[column_names[2]]))
                row.fillna(0, inplace=True)
                x_arr.append(row[column_names[8]] + " " + row[column_names[9]])
                # y_arr.append(row[column_quant_names].sum(axis=0))
                pos_arr.append([
                    row[column_names[12]],
                    row[column_names[14]],
                    row[column_names[16]],
                    row[column_names[20]],
                    row[column_names[21]],
                    row[column_names[23]],
                    row[column_names[25]],
                    row[column_names[27]],
                    row[column_names[28]],
                    row[column_names[30]]
                ])
                neg_arr.append([
                    row[column_names[13]],
                    row[column_names[15]],
                    row[column_names[17]],
                    row[column_names[18]],
                    row[column_names[19]],
                    row[column_names[22]],
                    row[column_names[24]],
                    row[column_names[26]],
                    row[column_names[29]],
                    row[column_names[31]]
                ])

        # positive_scores and negative_scores are arrays of arrays
        panas_dict[filename[:-4]] = {
            'date': x_arr,
            'positive_scores': pos_arr,
            'negative_scores': neg_arr,
        }

    print(panas_dict)

    # Parse Clinical Scales data
    clinical_df = pd.read_csv('Clinical-Scales-Demo.csv')
    # print(clinical_df)
    # columns = list(clinical_df.columns.values)
    clinical_dict = {}

    for index, row in clinical_df.iterrows():
        if row['Record ID'] not in clinical_dict:
            clinical_dict[row['Record ID']] = {
                'HAM-D-17': {
                    'date': [],
                    'score': []
                },
                'HAM-D-28': {
                    'date': [],
                    'score': []
                },
                'HAM-A': {
                    'date': [],
                    'score': []
                },
                'PSS': {
                    'date': [],
                    'score': []
                },
                'ERS': {
                    'date': [],
                    'score': []
                },
                'RRS': {
                    'date': [],
                    'score': []
                },
            }
        clinical_dict[row['Record ID']]['HAM-D-17']['date'].append(row['Date of Record'])
        clinical_dict[row['Record ID']]['HAM-D-17']['score'].append(row['Total HAM-D-17 SCORE'])
        clinical_dict[row['Record ID']]['HAM-D-28']['date'].append(row['Date of Record'])
        clinical_dict[row['Record ID']]['HAM-D-28']['score'].append(row['HAM-D-28 Total'])
        clinical_dict[row['Record ID']]['HAM-A']['date'].append(row['Date of Record'])
        clinical_dict[row['Record ID']]['HAM-A']['score'].append(row['HAM-A Total Score'])
        clinical_dict[row['Record ID']]['PSS']['date'].append(row['Date of Record'])
        clinical_dict[row['Record ID']]['PSS']['score'].append(row['PSS Total Score'])
        clinical_dict[row['Record ID']]['ERS']['date'].append(row['Date of Record'])
        clinical_dict[row['Record ID']]['ERS']['score'].append(row['Total ERS Score'])
        clinical_dict[row['Record ID']]['RRS']['date'].append(row['Date of Record'])
        clinical_dict[row['Record ID']]['RRS']['score'].append(row['Total RRS Score'])

    # print(clinical_dict)

    return render_template("plots.html",
                            panas_data=json.dumps(panas_dict),
                            clinical_data=json.dumps(clinical_dict))

if __name__ == "__main__":
    app.debug = True
    app.run()
