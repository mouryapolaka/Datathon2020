from flask import Flask, render_template, jsonify, request
import pandas as pd
from random import sample

cor_matrix = pd.read_csv('data/corr_matrix.csv', index_col = 'skill_name')

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/recommend_skills', methods=['GET', 'POST'])
def recommend_skill():

    if request.method == 'POST':
        skill = request.form['skill']

    recommended_skills = cor_matrix[skill]
    recommended_skills = recommended_skills.sort_values(ascending=False)
    recommended_skills.dropna(inplace=True)

    recommended_skills_list = list(recommended_skills.keys())
    recommended_skills_list.pop(0)

    a = jsonify({'results' : recommended_skills_list[:2]})

    return a

if __name__ == '__main__':
    app.run(debug=True)