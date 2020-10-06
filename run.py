from flask import Flask, render_template, jsonify, request
import pandas as pd
from random import sample

skill_corr_df = pd.read_csv('data/corr_matrix.csv', index_col = 'skill_name')

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)