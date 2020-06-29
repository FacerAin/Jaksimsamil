# Jaksimsamil

[!issue badge](https://img.shields.io/github/issues/FacerAin/OSS-Jaksimsamil)
[!fork badge](https://img.shields.io/github/forks/FacerAin/OSS-Jaksimsamil)
[!star badge](https://img.shields.io/github/stars/FacerAin/OSS-Jaksimsamil)
[!license badge](https://img.shields.io/github/license/FacerAin/OSS-Jaksimsamil)

## Project Overview

> **Jaksaimsamil PS Helper service**
>
> 작심삼일 알고리즘 문제풀이 도우미 서비스<br/>
>
> > 알고리즘 문제 풀이 스터디를 꾸준히 할 수 있게 돕는 웹 서비스입니다.

![그림1](https://user-images.githubusercontent.com/16442978/85690047-236d1d00-b70e-11ea-8d2b-480593c0daf3.png)

![그림2](https://user-images.githubusercontent.com/16442978/85690058-2536e080-b70e-11ea-98cd-45fdf04084ce.png)

## Features

- 회원가입/로그인 제공
- Online Judge 연동 가능 (Baekjoon)
- 나의 학습 현황 한눈에 보기
- 추천 문제 제공
- Slack 알리미

## Usages

1. Using Slack Notify
   <br>

- Go []

## Getting Started

1. Clone

```
git clone https://github.com/FacerAin/OSS-Jaksimsamil.git
```

2. Install MongoDB(Ubuntu)

```
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start
```

3. Set Serverfile

```
cd Jaksimsamil-server
touch .env
---TYPE THIS IN FILE----
SERVER_PORT= ###
MONGO_URL= ###
JWT_SECRET= ###
```

4. Start Node Server

```
cd Jaksimsamil-server
sudo npm install
node ./index.js #Start Server
```

5. Set Front-end page

```
cd Jaksimsamil-server
sudo npm install
npm start #Start React
```

## Contributing

컨트리뷰션은 언제나 환영입니다. 다음 절차를 지켜주세요!

1. Fork the Project
2. Create your Feature Branch
3. Commit our changes
4. Push to Branch
5. Open a Pull Request

## License

- MIT LICENCE
