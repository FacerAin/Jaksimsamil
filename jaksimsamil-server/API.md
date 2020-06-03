# Jaksimsamil API Documentation

## Overview

- TBA

## URL

- TBA

## Usage

- TBA

## Example

- TBA

## API Table

| group   | description              | method | URL                        | Detail   | Auth      |
| ------- | ------------------------ | ------ | -------------------------- | -------- | --------- |
| user    | 유저 등록                | POST   | api/user                   | 바로가기 | JWT Token |
| user    | 유저 삭제                | DELETE | api/user:id                | 바로가기 | JWT Token |
| user    | 특정 유저 조회           | GET    | api/user:id                | 바로가기 | None      |
| user    | 전체 유저 조회           | GET    | api/user                   | 바로가기 | JWT Token |
| friend  | 유저 친구 등록           | POST   | api/friend                 | 바로가기 | JWT Token |
| friend  | 유저의 친구 조회         | GET    | api/friend:id              | 바로가기 | None      |
| profile | 유저가 푼 문제 조회      | GET    | api/profile/solved:id      | 바로가기 | None      |
| profile | 유저가 푼 문제 개수 조회 | GET    | api/profile/solvednum:id   | 바로가기 | None      |
| profile | 추천 문제 조회           | GET    | api/profile/recommendps:id | 바로가기 | None      |
| notify  | 슬랙 메시지 전송 요청    | POST   | api/notify/slack           | 바로가기 | Jwt Token |
| auth    | 로그인                   | POST   | api/auth/login             | 바로가기 | None      |
| auth    | 로그아웃                 | GET    | api/auth/logout            | 바로가기 | JWT Token |
