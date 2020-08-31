# API Documentation - Challenge  

1. POST /api/challenge/getChallenge  
- 챌린지 상세 정보 조회  
- input(body)  
```javascript
{
    "challengeName": String
}
```
1. POST /api/challenge/addChallenge  
- 챌린지 추가  
- input(body)
```javascript
{
    "challengeName":String,
    "startDate":Date,
    "endDate":Date,
    "durationPerSession": String, // "1d"=1 day, "2w"=2 weeks, "3m"=3 months
    "goalPerSession":Number
}
```
1. GET /api/challenge/list?status  
- 챌린지 목록 조회
- input(query)
```
status=(one of ["all","enrolled","progress","end"])
```
1. POST /api/challenge/participate  
- 챌린지 참가
- input(body)
```javascript
{
    "username":String,
    "challengeName":String
}
```