# Jaksimsamil Server Documentation

## Overview

- KOA 프레임워크 기반의 REST-API로 동작합니다.
- API 문서는 아래를 참고해주세요.

## Usage

- Starting Server

```
npm install
npm update
node index.js
```

## Example

```
POST http://facerain.dcom.club/profile/getprofile
{
    username: 'syw5141',
}
```

## API Table

| group   | description                            | method | URL                     | Detail                                 | Auth      |
| ------- | -------------------------------------- | ------ | ----------------------- | -------------------------------------- | --------- |
| profile | 유저가 푼 문제 조회(백준)              | GET    | api/profile/solvedBJ:id | [바로가기](/src/api/profile/README.md) | None      |
| profile | 유저가 푼 문제 동기화(백준)            | PATCH  | api/profile/syncBJ      | [바로가기](/src/api/profile/README.md) | None      |
| profile | 유저 정보 수정                         | POST   | api/profile/setprofile  | [바로가기](/src/api/profile/README.md) | JWT TOKEN |
| profile | 유저 정보 받아오기                     | POST   | api/profile/getprofile  | [바로가기](/src/api/profile/README.md) | JWT       |
| profile | 추천 문제 조회                         | POST   | api/profile/recommend   | [바로가기](/src/api/profile/README.md) | None      |
| profile | 친구 추가                              | POST   | /api/profile/addfriend  | [바로가기](/src/api/profile/README.md) | JWT TOKEN |
| notify  | 슬랙 메시지 전송 요청 (목표 성취 여부) | POST   | api/notify/goal         | [바로가기](/src/api/notify/README.md)  | Jwt Token |
| notify  | 슬랙 메시지 전송 요청 (문제 추천)      | POST   | api/notify/recommend    | [바로가기](/src/api/notify/README.md)  | None      |
| auth    | 로그인                                 | POST   | api/auth/login          | [바로가기](/src/api/auth/README.md)    | None      |
| auth    | 로그아웃                               | POST   | api/auth/logout         | [바로가기](/src/api/auth/README.md)    | JWT Token |
| auth    | 회원가입                               | POST   | api/auth/register       | [바로가기](/src/api/auth/README.md)    | None      |
| auth    | 로그인 확인                            | GET    | api/auth/check          | [바로가기](/src/api/auth/README.md)    | None      |
