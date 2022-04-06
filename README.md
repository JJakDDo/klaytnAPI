# klaytnAPI
caver-js를 활용한 간단한 클레이튼 API 서버 만들기  
## 최신 블록 검색
최신 N개의 블록을 응답으로 보낸다.

`GET /blocks`

### query
amount (int) 응답 개수
### response
Array 블록 객체가 담겨진 배열
## 블록 검색 기능
블록에 대한 정보를 응답으로 보낸다.

`GET /blocks/{Block Number or Hash}`

### parameter
Block Number or Hash 조회하고자 하는 블록의 번호 또는 해쉬값
### response
200 - Object 블록 객체  
400 - {message: "The block does not exist"}
## 트랜잭션 검색 기능
트랜잭션에 대한 정보를 응답으로 보낸다.

`GET /txs/{Transction Hash}`

### parameter
Transaction Hash 조회하고자 하는 트랜잭션의 해쉬값
### response
200 - Object 트랜잭션 객체  
400 - {message: "The transaction does not exist"}


## Account 검색 기능
Account에 대한 정보를 응답으로 보낸다.

`GET /accounts/{address}`

### parameter
address 조회하고자 하는 account의 주소값
### response
200 - Object 응답 객체  
|key|설명|
|------|---|
|type|EOA, SCA, KIP7 Token, KIP17 Token|
|name|KIP7 Token 또는 KIP17 Token의 이름|
|symbol|KIP7 Token 또는 KIP17 Token의 심볼|
|decimals|KIP7 Token의 소수점|
|totalSupply|KIP7 Token 또는 KIP17 Token의 총 발행량|
|data|account 정보에 대한 객체|  

400 - {message: "The account does not exist"}
