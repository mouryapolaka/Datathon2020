from flask import Flask, render_template, jsonify, request
import pandas as pd
from random import sample

skill_corr_df = pd.read_csv('data/corr_matrix.csv', index_col = 'skill_name')

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/get_json', methods=['GET','POST'])
def get_json():

    if request.method == 'POST':
        skills = request.form.getlist('skills')
    else:
        skills = ['PYTHON','AWS']

    df = pd.DataFrame({'Skills' : list(skill_corr_df.keys())})

    for i in skills:
        corr_values = list(skill_corr_df[i])
        df[i] = corr_values

    df["Correlation"] = df[[i for i in skills]].sum(axis=1)

    df = df.sort_values(by ='Correlation', ascending=False)

    for i in skills:
        df = df[df.Skills != i]

    corr_values_labels = list(df['Skills'][:10])
    corr_values = list(df['Correlation'][:10])

    # return jsonify({'labels': corr_values_labels, 'data': sample(range(1,11),10)})
    return jsonify({'labels': corr_values_labels, 'data': corr_values})

if __name__ == '__main__':
    app.run(debug=True)