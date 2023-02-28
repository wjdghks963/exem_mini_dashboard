# 엑셈 사전 과제

## 실행 방법

    1. `npm i`
    2. `npm start`

## 개발 환경 및 사용 라이브러리

- IDE
   - webstorm
- CRA
   - 빠른 React 환경 설정
- typescript
  - 정적 타입으로 런타임 에러 줄임
- styled-component
  - css-in-js 스타일
- msw
   - Dev 환경에서 mock server api 제공
- chart.js & react-chartjs-2
  - 차트 표현
- react-query
  - 서버 상태관리
- react-beautiful-dnd
  - drag and drop 구현 라이브러리



## git log description

1. Initialize project using Create React App
    - CRA 설정 init

2. init
    - 불필요한 asset 삭제
    - msw 서버 세팅
    - 필요한 라이브러리 설치
    - reset-css 적용
   
3번 부턴 commit에 작성함


## 수행과정

### 서버 설정

1. msw를 worker를 이용해 서버 작동
    - setupWorker로 worker를 만들고 index.tsx에서 dev 환경일때 server 작동
   
2. pie,value resolver에서 배열 요소에 data 속성이 없으면 500에러
    - 배열은 360의 크기로 만들어지는데 만약 데이터를 넣는 for문 안에서 360번째 index에 접근하면 error를 발생시키는 버그를 발생해 만약 360번 index에 접근하려고 할시 break로 접근하지 못하게 반복문을 탈출
   ```javascript
        if(dataInd === 360) break
    ```


### 비지니스 로직

1. 10초 마다 데이터 갱신
    - 해결 : react-query의 옵션 {refetchInterval: 10000 }을 이용해 자동 갱신

2. selector를 사용해 현재로부터 10,30,60분 전의 데이터를 나타냄
    - 해결 : app.tsx에서 selector의 value를 상태로 두고 차트들에게 props로 보냄 

3. 차트 하나 추가
   - selector를 이용해 선택한 차트 바로 interface에 추가

### 로직을 수행하기 위한 libs

1. unixtime 변환
    - unixtime로 지금에서 10, 30, 60분 차이를 계산한 값을 구해야함
    - 해결 : unixtimeConverter.ts로 unix to date & date to unix 함수 작성
   
2. react-query를 사용하는데 중복되는 queryfn 작성해야함
    - 해결 : getData.ts로 fetch로 json을 받는 함수 작성
 
### react-query 이용해 서버 상태 관리

1. react-query에서 isLoading, error를 중복으로 받음
   - 해결 : chart에서 공통적으로 사용하는 Layout 작성해 분기 처리해 차트마다 써야하는 중복 제거
2. 만약 10초 전에 다시 다른 시간을 선택
    - 상태관리 라이브러리이기때문에 만약 10초가 지나기 전에 같은 값을 다시 보기 위해서 refetching할 필요 없음


### components

1. LineChart
    - chart.js를 이용해 register로 option 설정하고 dataset, label 설정 
    - criticalPoint를 넘어서면 빨간점 표시
2. PieChart
   - chart.js를 이용해 register로 option 설정하고 dataset, label 설정
   - 5개의 데이터가 무조건 온다는 가정하에 색 5가지로 표현
3. ValueChart
   - styled-component로 div를 이용해 표시
   - bytes -> kb로 바꾸는 로직
4. Selector
   - 재사용성을 위해 제너릭 타입을 이용해 타입 작성
   - props가 다양하게 들어올 수 있음
   - 기본값이 없고 선택해주세요를 표시할 props추가
   - setState를 받아 state가 바로 적용됨
   - 애니메이션
5. ChartLayout
   - Chart들이 공통적으로 가지고 있는 isLoading, error를 가지고 상황에 맞는 컴포넌트 리턴
   - 해당 컴포넌트 div에 state를 이용해 조절 가능 width, vh


### 진행하면서 헤멨던 점

1. msw resolver
   - 유닉스 타임이 밀리세컨드 기준이었던 점
   - pie.ts에서 접근이 불가능한 데이터 접근시 내는 에러 처리
2. dnd 사용
   - dnd가 요소 선택의 우선권 선점해 css resize 사용 못함
     - react state & styled-component 사용해 처리
3. 차트 추가
   - 차트를 추가하는 방법을 고민
     - ref와 state 고민 중 동기적(repaint)으로 처리해야했기 때문에 state 사용  



# 선택 구현 사항 

- 사용자가 대시보드에 3종의 차트 중 원하는 것 **하나**를 추가할 수 있는 기능을 구현 해주세요.
  - 오른쪽 Selector로 차트 타입을 선택하면 바로 인터페이스에 추가 
  - 다른 차트를 고른다면 다른 차트로 교체됨
- 값 차트의 값을 항상 소수 점 위 3자리, 소수 점 아래 2자리까지만 보이도록 해주세요.
  - 값이 너무 작아 bytes to mib가 아닌 bytes to kb 기준으로 표시함 
- 값 차트가 특정 기준 값 이상일 때, 값의 색상이 변하는 기능을 개발해주세요.
  - Line chart에서 값이 8000000이상이라면 빨간점 표시
  - Value chart에서 값이 4 이상이라면 빨간 글자로 바뀜
- 대시보드 페이지의 차트들의 위치와 크기를 원하는 대로 조작할 수 있도록 만들어주세요.
  - react state를 이용해 조절
  - react-dnd를 사용해 위치 조작 가능