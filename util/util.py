import json
import glob
import csv
import pandas as pd 
import os 
import io

from datetime import datetime
from collections import defaultdict

# read csv file

def parseCSV(file):
    username = file.split('/')[1].split('-')[1]
    writeJSON(file, username)

# process the csv file
# merge with mood data
# write csv file to userData.js file

def writeJSON(fil, username):
    path = os.path.join('datasets/lastfm', username, ".json")
    with open('userData.txt', 'w') as json_file:
        json_file.write('var = ')
        json_file.write(username)
        print(username)
        # json.dump(file, json_file)
        # json_file.write('\n')

# def parseAll():
#     path = "datasets/*.csv"
#     for file in glob.glob(path):
#         parseCSV(file)
#         print(file)
 
def dailyData(ar):
    countDate = []
    prevDate = datetime.strptime(ar[len(ar)-1]['utc_time'], '%Y-%m-%dT%H:%M:%SZ')
    # print(prevDate)
    temp = {}
    songs = []  
    # for i in ar:
    #     date = ar[len(ar)-1]['utc_time']
#   data.forEach(function(d) {
#     var date = d3.timeDay(d.timestamp);
#     if(prevDate.valueOf() !== date.valueOf()){
#       countDate.push({});
#       countDate[countDate.length-1].date = d3.timeDay(d.timestamp);
#       countDate[countDate.length-1].frequency = 1;
#       countDate[countDate.length-1].topsongs = [];

#       //for top songs
#       songs = countDate[countDate.length-1].topsongs;
      
#       temp = {};
#       temp[d.song] = 1;
#         songs.push({});
#         songs[songs.length-1].singer = d.artist;
#         songs[songs.length-1].name = d.song;
#         songs[songs.length-1].songFrequency = 1;
#     } else {
#       countDate[countDate.length-1].frequency = countDate[countDate.length-1].frequency + 1;
      
#       //for top songs
#       if(!temp[d.song]){
#         temp[d.song] = 1;
#         songs.push({});
#         songs[songs.length-1].singer = d.artist;
#         songs[songs.length-1].name = d.song;
#         songs[songs.length-1].songFrequency = 1;
#       } else {
#         songs[songs.length-1].songFrequency = songs[songs.length-1].songFrequency + 1;
#       }
#      }
    
#     countDate[countDate.length-1].topsongs.sort(function(a,b) {
#             return b.songFrequency - a.songFrequency;
#           })
    
#     // var top = countDate[countDate.length-1].topsongs;
#     // if(top[d.song] === undefined){
#     //   top[d.song] = 1;
#     // } else {
#     //   top[d.song] = top[d.song] + 1;
#     // }

#     prevDate = date;
#   }); 
#   return countDate;

# df_list = [] 

folder = os.listdir('datasets/lastfm')

def loadfiles(f):
    # jsonArray = []
    count = 0

    moodpath = os.path.join('datasets/daily-mood.csv')

    for filename in f:
        
        startpath = os.path.join('datasets/lastfm', filename)

        username = startpath.split('-')[1]
        # print("var " + username + " = ")
        print(username.lower() + ", ")
        
        endpath = os.path.join('datasets/output', username + '.json')
        dataArray = [] 

        with open(startpath, 'r', encoding='utf-8') as csvf:
            csvReader = csv.DictReader(csvf) 
            
            for row in csvReader: 
                columns = defaultdict()

                for (k,v) in row.items(): # go over each column name and value 
                    if(k == 'uts' or k == 'artist_mbid' or k == 'album_mbid' or k == 'track_mbid'):
                        continue
                    elif(k == 'utc_time'):
                        columns[k] = datetime.strptime(v, '%d %b %Y, %H:%M').strftime('%Y-%m-%dT%H:%M:%SZ')
                    else:
                        columns[k] = v
                dataArray.append(columns)
                # print(row)
            # print(jsonArray)     

        dailyData(dataArray)
        # for row in jsonArray:

        with open(endpath, 'w', encoding='utf-8') as jsonf: 
            jsonString = json.dumps(dataArray, indent=4)
            jsonf.write(jsonString)

        count = count + 1
    # for filename in f:
    #     df = pd.read_csv(path)
    #     # for row in df:
    #     #     jsonArray.append(row)

    #     # print(jsonArray)
    #     df_list.append(df)
    #     print(filename)

    # data = pd.concat(df_list)
    # data.to_csv('final.csv')  

loadfiles(folder)

# parseAll()
# parseCSV('datasets/scrobbles-akerblomman-1617639941.csv')
