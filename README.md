
# :rocket: Portfolio 
**Sticky Memo & Simple Board**   
   
   
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-FFCC33?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/MySQL-025E8C?style=flat-square&logo=MySQL&logoColor=white"/>

## Description

> 웹에서 구현한 **Sticky Memo(스티커 메모)** 와 **Simple Board(게시판)** 입니다   
> `Node.js` 기반으로 개발되었으며 `MySQL` DB를 사용합니다
>  

![sticky-memo-1](https://user-images.githubusercontent.com/52145267/113465248-8940bf00-946d-11eb-9f3d-ea5f5945438c.gif)

### Sticky Memo(스티커메모)
- 스티커 메모를 통해 스케줄을 관리할 수 있습니다. 언제든지 수정 및 삭제가 가능합니다

| Issue | Description |
| ------ | ------ |
| 생성 | 버튼을 통해 동적으로 생성됩니다. 원하는 색을 선택해 새로운 메모를 생성할 수 있습니다 |
| 관리 | `[수정 - 변경 - 삭제]` 가 가능합니다 `ajax` 통신을 통해 비동기 처리합니다   |
   
      
---- 

### Simple Board(게시판)  
- 게시판에서 자유롭게 글을 쓰고 수정할 수 있습니다. 검색을 통해 원하는 게시물을 찾을 수 있습니다
   
   
| Issue | Description |
| ------ | ------ |
| 생성 | 게시물을 쓰고 저장할 수 있습니다. 연결된 DB에 게시물이 저장됩니다 |
| 관리 | `[수정 - 변경 - 삭제]` 할 수 있습니다. 게시물의 id값을 받아 변경을 처리합니다. 글을 누를때마다 조회수가 Update됩니다 |
| 검색 | 검색어를 입력해 게시물을 찾을 수 있습니다. 검색어는 저장된 DB의 게시물들의 제목을 참조합니다 |

![simple-board-1](https://user-images.githubusercontent.com/52145267/113465401-9c07c380-946e-11eb-8a59-6653ee507ca9.gif)   
   


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
  
