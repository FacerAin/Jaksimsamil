# Jaksimsamil

![issue badge](https://img.shields.io/github/issues/FacerAin/OSS-Jaksimsamil)
![fork badge](https://img.shields.io/github/forks/FacerAin/OSS-Jaksimsamil)
![star badge](https://img.shields.io/github/stars/FacerAin/OSS-Jaksimsamil)
![license badge](https://img.shields.io/github/license/FacerAin/OSS-Jaksimsamil)

## Project Overview

> **Jaksaimsamil Algorithm Study Helper Service**
>
> 작심삼일 알고리즘 문제풀이 도우미 서비스<br/>
>
> > 알고리즘 문제 풀이 스터디를 꾸준히 할 수 있게 돕는 웹 서비스입니다.
> > <br> [링크](http://facerain.dcom.club)에서 직접 사용해 보세요!

![그림1](https://user-images.githubusercontent.com/16442978/85690047-236d1d00-b70e-11ea-8d2b-480593c0daf3.png)

![그림2](https://user-images.githubusercontent.com/16442978/85690058-2536e080-b70e-11ea-98cd-45fdf04084ce.png)

## Features (ver.1.0.0)

- 회원가입/로그인 제공
- Online Judge 연동 가능 (Baekjoon)
- 나의 학습 현황 한눈에 보기
- 추천 문제 제공
- Slack 알리미

## Upcoming Features

- 친구 추가
- 친구와의 경쟁
- 그룹 추가
- 그룹 추천
- 개선된 문제 추천 (사용자 실력 맞춤형)

## Usages

#### 회원

1. 로그인하여 서비스에 접속 할 수 있습니다.
2. 서비스가 처음이라면, 회원가입을 하세요.
   <br>

#### 설정

1. 백준 아이디를 등록하고 동기화하세요. [상세]()
2. 슬랙 HOOK URL을 등록하세요. [상세]()
3. 일일 목표량을 등록하세요.

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
npm start
```

[링크](/jaksimsamil-server/README.md)에서 API 제공 목록을 볼 수 있습니다.
<br>

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
