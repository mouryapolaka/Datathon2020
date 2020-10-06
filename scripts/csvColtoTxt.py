import pandas as pd

FILE = "/Users/michellesun/dev/Datathon2020/data/skills.csv"

data = pd.read_csv(FILE)
output = open("data/skills.txt",'w')
for row in data['skill_name']:
    s = row + '\n'
    output.write(s)
output.close()