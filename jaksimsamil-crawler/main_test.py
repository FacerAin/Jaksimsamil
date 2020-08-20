import requests
from bs4 import BeautifulSoup
import pandas as pd
from dotenv import load_dotenv
import sys
import pymongo
import os
from datetime import datetime
import json
import numpy as np

SAVE_EVERY = 10
SAVE_PATH = 'problems.csv'


def setup():
    try:
        load_dotenv(dotenv_path='../jaksimsamil-server/.env')
        client = pymongo.MongoClient(
            '/'.join(os.getenv('MONGO_URL').split('/')[:-1]))
        print('MongoDB Connected')
        return client
    except FileNotFoundError:
        print('.env is not found', file=sys.stderr)
        exit(1)


def save(df, path='problems.csv'):
    print('Saving to {}...'.format(path), end='')
    df.to_csv(path)
    print('Done.')


def get_khu_problem_list():
    pageNum = 1
    idx = 0
    problems = pd.DataFrame(columns=['problemNum', 'problemTitle',
                                     'solvedacLevel', 'submitNum', 'correctNum', 'category', 'count'])
    while True:
        res = requests.get(
            'https://www.acmicpc.net/school/ranklist/211/{}'.format(pageNum))
        status_code = res.status_code
        if status_code == 404:
            break
        soup = BeautifulSoup(res.text, 'html.parser')
        userlinks = soup.select('#ranklist > tbody > tr > td:nth-child(2) > a')
        for userlink in userlinks:
            href = userlink['href']
            res = requests.get('https://acmicpc.net'+href)
            print('Collecting user data...:', href.split('/')[-1])
            user_soup = BeautifulSoup(res.text, 'html.parser')
            problemNums = user_soup.select(
                'body > div.wrapper > div.container.content > div.row > div:nth-child(2) > div:nth-child(3) > div.col-md-9 > div:nth-child(1) > div.panel-body > span.problem_number')
            for problemNum in problemNums:
                if not problemNum.text in problems['problemNum'].tolist():
                    problems = problems.append(
                        {'problemNum': problemNum.text, 'count': 1}, ignore_index=True)
                else:
                    problems.loc[problems.problemNum == problemNum.text,
                                 'count'] = problems.loc[problems.problemNum == problemNum.text, 'count']+1
            if idx % SAVE_EVERY == 0:
                save(problems, SAVE_PATH)
            idx += 1
        pageNum += 1
    save(problems, SAVE_PATH)
    return problems


def get_problem_info(problems):
    for idx, problemNum in enumerate(problems['problemNum'].values):
        res = requests.get('https://acmicpc.net/problem/{}'.format(problemNum))
        print('Collecting problem data...:', problemNum)
        soup = BeautifulSoup(res.text, 'html.parser')
        problemTitle = soup.select('#problem_title')[0].text
        soup = soup.select('#problem-info > tbody > tr > td')
        submitNum = soup[2].text
        correctNum = soup[4].text
        problems.loc[problems.problemNum ==
                     problemNum, 'problemTitle'] = problemTitle
        problems.loc[problems.problemNum ==
                     problemNum, 'submitNum'] = submitNum
        problems.loc[problems.problemNum ==
                     problemNum, 'correctNum'] = correctNum
        if idx % SAVE_EVERY == 0:
            save(problems, SAVE_PATH)
    save(problems, SAVE_PATH)
    return problems


def get_solvedac_level(problems):
    for idx, problemNum in enumerate(problems['problemNum'].values):
        res = requests.get(
            'https://api.solved.ac/v2/search/problems.json?query={}&page=1&sort=id&sort_direction=ascending'.format(problemNum))
        print('Collecting solved.ac level data...:', problemNum)
        result = json.loads(res.text)
        for problem in result['result']['problems']:
            if problem['id'] == problemNum:
                problems.loc[problems.problemNum == problemNum,
                             'solvedacLevel'] = problem['level']
                print("solvedacLevel: ", problem['level'])
                break
        if idx % SAVE_EVERY == 0:
            save(problems, SAVE_PATH)
    save(problems, SAVE_PATH)
    return problems


def get_category(problems):
    problems.sort_values(['problemNum'], inplace=True, ignore_index=True)
    problems['category'] = problems['category'].fillna(json.dumps([]))
    pageNum = 1
    res = requests.get(
        'https://api.solved.ac/v2/tags/stats.json?page={}'.format(pageNum))
    tagsResult = json.loads(res.text)
    totalPages = tagsResult['result']['total_page']
    tags = []
    tags.extend(tagsResult['result']['tags'])
    for pageNum in range(2, totalPages+1):
        res = requests.get(
            'https://api.solved.ac/v2/tags/stats.json?page={}'.format(pageNum))
        tagsResult = json.loads(res.text)
        tags.extend(tagsResult['result']['tags'])
    print('total tags:', len(tags))
    for tag in tags:
        problemList = []
        pageNum = 1
        res = requests.get(
            'https://api.solved.ac/v2/search/problems.json?query=solvable:true+tag:{}&page={}&sort=id&sort_direction=ascending'.format(tag['tag_name'], pageNum))
        problemResult = json.loads(res.text)
        totalPages = problemResult['result']['total_page']
        problemList.extend(problemResult['result']['problems'])
        for pageNum in range(2, totalPages+1):
            res = requests.get(
                'https://api.solved.ac/v2/search/problems.json?query=solvable:true+tag:{}&page={}&sort=id&sort_direction=ascending'.format(tag['tag_name'], pageNum))
            problemResult = json.loads(res.text)
            problemList.extend(problemResult['result']['problems'])
        idx = 0
        problemListLen = len(problemList)
        for problemNum in problems['problemNum'].values:
            if idx < problemListLen and problemList[idx]['id'] == problemNum:
                category = json.loads(
                    problems.loc[problems.problemNum == problemNum, 'category'].values[0])
                category.append(tag['full_name_ko'])
                print("category: ", category)
                problems.loc[problems.problemNum == problemNum, 'category'] = json.dumps(
                    category, ensure_ascii=False)
                idx += 1
                print('Problem {} in category {}'.format(
                    problemNum, tag['full_name_ko']))
        save(problems, SAVE_PATH)
    return problems


def update_database(problems, client):
    database = client['jaksimsamil']
    collection = database['problem']
    dictedProblems = problems.to_dict('records')
    print('len of records:', len(dictedProblems))
    for dictedProblem in dictedProblems:
        dictedProblem['category'] = json.loads(dictedProblem['category'])
        collection.update_one({'problemNum': dictedProblem['problemNum']}, {
                              '$set': dictedProblem}, upsert=True)


if __name__ == "__main__":
    startTime = datetime.now()
    client = setup()
    problems = get_khu_problem_list()
    problems = get_problem_info(problems)
    problems = get_solvedac_level(problems)
    problems = get_category(problems)
    update_database(problems, client)
    print('Time elapsed :', (datetime.now()-startTime)/60, 'mins')
