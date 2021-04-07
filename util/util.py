import json
import glob

# read csv file


def parseCSV(file):
    username = file.split('/')[1].split('-')[1]
    writeJSON(file, username)

# process the csv file

# merge with mood data

# write csv file to userData.js file


def writeJSON(file, username):
    with open('userData.txt', 'w') as json_file:
        json_file.write('var = ')
        json_file.write(username)
        print(username)
        # json.dump(file, json_file)
        # json_file.write('\n')


def parseAll():
    path = "datasets/*.csv"
    for file in glob.glob(path):
        parseCSV(file)
        print(file)


parseAll()
parseCSV('datasets/scrobbles-akerblomman-1617639941.csv')
