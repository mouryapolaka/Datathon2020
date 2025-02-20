from flask import Flask, render_template, jsonify, request
import pandas as pd

skill_corr_df = pd.read_csv('data/corr_matrix.csv', index_col = 'skill_name')
roles_skills_df = pd.read_csv('data/roles_skills.csv')
seek_df = pd.read_csv('data/seek_df.csv')
seek_df = seek_df[seek_df.geo != 'NZ']

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

@app.route('/role_skills', methods=['GET','POST'])
def get_role_skills():
    if request.method == 'POST':
        role = request.form['role']
    else:
        role = "Computer Programmers"

    temp_df = roles_skills_df[roles_skills_df['Title'] == role].sort_values('Data Value', axis=0, ascending=False, inplace=False, kind='quicksort')

    df = pd.DataFrame({'Skill' : [], 'Rating' : []})
    df['Skill'] = [skill.capitalize() for skill in list(temp_df['Element Name'])]
    df['Rating'] = [rating for rating in list(temp_df['Data Value'])]

    skills = list(df['Skill'][:20])
    ratings = list(df['Rating'][:20])

    return jsonify({'skills': skills, 'ratings': ratings, 'role': role})

@app.route('/location_category', methods=['GET','POST'])
def get_location_category():
    if request.method == 'POST':
        location = request.form['location']
    else:
        location = "Brisbane"


    category_list = list(seek_df[seek_df['city'] == location].category.unique())
    category_frequency = list(seek_df[seek_df['city'] == location].category.value_counts())
    
    return jsonify({'categories': category_list[:20], 'frequency': category_frequency[:20], 'location': location})


@app.route('/job_type', methods=['GET','POST'])
def get_job_type():
    print(request.form)
    if request.method == 'POST':
        location = request.form.getlist('location')
        category = request.form.getlist('category')
    else:
        location = "Brisbane"
        category = "Accounting"
    
    print(location)
    print(category)
    df = seek_df.loc[(seek_df['city'] == location[0]) & (seek_df['category'] == category[0])]
    job_type = ['Full Time', 'Contract/Temp', 'Part Time', 'Casual/Vacation']
    freq = list(df.job_type.value_counts())

    return jsonify({'job_type': job_type, 'frequency': freq})

@app.route('/get_skills', methods=['GET'])
def get_skills():
    filename = "data/skills.txt"    
    output = []
    with open(filename, 'r', encoding="utf") as file:
        for line in file:
            output.append(line.strip())
    return jsonify({'data': output})

@app.route('/get_roles', methods=['GET'])
def get_roles():
    df = pd.read_csv('data/roles.csv')
    output = df['0'].tolist()
    return jsonify({'data': output})

@app.route('/get_locations', methods=['GET'])
def get_locations():
    df = pd.read_csv('data/cities.csv')
    output = df['0'].tolist()
    return jsonify({'data': output})

@app.route('/get_categories', methods=['GET'])
def get_categories():
    df = pd.read_csv('data/categories.csv')
    output = df['0'].tolist()
    return jsonify({'data': output})
    

if __name__ == '__main__':
    app.run(debug=True)