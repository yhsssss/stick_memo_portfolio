
# :rocket: Portfolio 
:white_check_mark: **Sticky 바로가기** [Live Site Here](http://54.180.104.203:8888/planty) :arrow_right:  

## Description

> 웹에서 구현된 스티커 메모와 게시판으로 이루어져 있습니다
> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-FFCC33?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/MySQL-025E8C?style=flat-square&logo=MySQL&logoColor=white"/> 와  을 사용하였습니다   

![sticky-memo-1](https://user-images.githubusercontent.com/52145267/113465248-8940bf00-946d-11eb-9f3d-ea5f5945438c.gif)

- **스티커메모** 버튼을 통해 원하는 색상의 스티커 메모를 생성하여 저장 할 수 있습니다 저장된 스티커 메모는 `[수정 - 변경 - 삭제]` 가 가능합니다

![simple-board-1](https://user-images.githubusercontent.com/52145267/113465401-9c07c380-946e-11eb-8a59-6653ee507ca9.gif)
- **심플보드** 게시판에서는 

## Getting Started

### :clap: step #1 - Install the Dependencies
```
npm install
```

### :clap: step #2 - Database
`mySQL` 설치 후 `/sql/db_info.sql` 실행
`/lib/db.js` DB정보 확인하기

```
 let db = mysql.createConnection({
          host : 'localhost',
          user : '정보입력',
          password : '비밀번호 입력',
          database : 'myboard'
 }); 
```

### :clap: step #3 - Start the Development Server

Node.js 설치후 버전 확인하기
```
node --version
```

서버 구동하기 `http://localhost:8660`에서 구동됩니다
```
npm start
```
  
