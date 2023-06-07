## BANANA : 바로 나누고 나눔받자

<div>
  <img src="https://github.com/hyeonjy/Banana/assets/101038390/39b025c1-f291-4cf7-8897-a7aa1fa4e717" />
 </div>
 <br/>
<br/>
🍌 BANANA는 사용하지 않지만 가치가 있는 패션 제품을 나누는 커뮤니티 웹사이트입니다.

## 0. 프로젝트 소개
🌏 2인 팀 프로젝트 ( 2023.03 ~ ing ) <br/>
🌏 프로젝트 목표 : 재활용 & 재사용 인식 증대 및 환경 친화적인 소비문화 조성
```
 옷은 우리 생활에서 필수적인 요소 중 하나이지만, 옷 산업은 많은 환경 문제를 야기합니다. 
 섬유 제조 과정에서 발생하는 대량의 물 사용과 화학 물질 배출, 옷 생산과 소비로 인한 폐기물의 증가는 환경에 심각한 영향을 미치고 있습니다. 
 이에 대한 해결책 중 하나는 "재활용"과 "재사용"입니다. 
 입지 않은 옷을 다른 사람들과 공유하고 나눔하는 것은 환경 친화적인 소비 문화를 조성하고, 자원의 효율적인 사용을 촉진할 수 있는 좋은 방법입니다.
 
 BANANA 나눔 커뮤니티로 활용함으로써 환경에 대한 인식과 관심을 높일 수 있습니다. 
 누구나 자신이 입지 않은 옷을 기부하고, 필요로 하는 사람들에게 나눔할 수 있는 플랫폼을 제공합니다.
```


## 1. Contributor
|황지나|김현지|
|:---:|:---:|
|<img alt="황지나" src="https://avatars.githubusercontent.com/u/101038390?v=4" height="100" width="100">|<img alt="김현지" src="https://avatars.githubusercontent.com/u/86361624?v=4" height="100" width="100">|
|[@hwangJN](https://github.com/hwangJN)|[@hyeonjy](https://github.com/hyeonjy)|
|wlsk401@gmail.com|hg024246@gmail.com|

## 2. 사용 기술 

<div style="display:flex">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=black"/>
  <img alt="reactquery" src="https://img.shields.io/badge/reactquery-FF4154.svg?&style=for-the-badge&logo=reactquery&logoColor=black"/>
  <img alt="styledcomponents" src="https://img.shields.io/badge/styledcomponents-DB7093.svg?&style=for-the-badge&logo=styledcomponents&logoColor=black"/>
  <img alt="reacthookform" src="https://img.shields.io/badge/reacthookform-EC5990.svg?&style=for-the-badge&logo=reacthookform&logoColor=black"/>
 
</div>

<div style="display:flex">
  <img alt="nodedotjs" src="https://img.shields.io/badge/nodedotjs-339933.svg?&style=for-the-badge&logo=nodedotjs&logoColor=black"/>
  <img alt="mysql" src="https://img.shields.io/badge/mysql-4479A1.svg?&style=for-the-badge&logo=mysql&logoColor=black"/> 
</div>
<br/>

✏️ 사용 라이브러리
- React Query : 상태관리 (useQuery, useMutation)
- Styled-components : 컴포넌트 기반 스타일링
- react-device-detect : BrowserView 와 MobileView 로 나누어 작업  
- React-hook-form : form 을 구현 및 유효성 검사
- React Swiper & Slick : 이미지 Slider 구현
- React-loading-skeleton : 로딩 UI&UX 개선
- react-js-pagination : 페이지네이션

## 3. 구현 기능 
### 1. 나눔 글 작성
 -  React-hook-form 라이브러리를 활용한 유효성 검사 후 에러 메세지가 표시됩니다.
 -  이미지 파일 추가 & 삭제 & 대표사진을 확인할 수 있습니다.
 
 <div style="display:flex; gap:10px;">
   <img src="https://github.com/hyeonjy/Banana/assets/101038390/0c30f7e6-7ef1-4ddc-a42c-a431575a6ab9" width="500" height="375" />
   <img src="https://github.com/hyeonjy/Banana/assets/101038390/503e4f8b-00c9-4cca-b07f-2c90dddb1bce" width="500" height="375" />
 </div>
<br/>
<br/>
 
### 2. 나눔 글 페이지 & 이미지 슬라이더
- React-Swiper & Slick Library를 사용하였습니다.
- 이미지를 크게 보는 경우 modal 형태로 나타나도록 구현했습니다.
 <div style="display:flex; gap:10px; ">
   <img src="https://github.com/hyeonjy/Banana/assets/101038390/f56ad33c-a7c2-4cf6-b92f-17b79362a504" width="500" height="375" />
   <img src="https://github.com/hyeonjy/Banana/assets/101038390/3193c73f-7572-43aa-946c-56e64bb952c4" width="500" height="375" />
</div>
<br/>
<br/>

### 3. 위시리스트 추가 &  목록 확인
- React Query 와 Optimistic Update를 활용하였습니다
- 서버 요청 완료 전 UI를 업데이트를 통해 빠른 반응속도를 느낄 수 있습니다.
 <div style="display:flex; gap:10px; ">
<img src="https://github.com/hyeonjy/Banana/assets/101038390/e4381f0d-a574-4f73-9ab5-5e79b67823d3" width="500" height="375" />
</div>
<br/>
<br/>

### 4. 나의 나눔목록 & 스켈레톤 컴포넌트
- 로그인 유저의 마이페이지에서 나눔 목록을 확인합니다.
- React-loading-skeleton library를 통해 스켈레톤 컴포넌트를 구현했습니다.
 <div style="display:flex; gap:10px; ">
<img src="https://github.com/hyeonjy/Banana/assets/101038390/e44d0052-5d85-4c7a-8c30-270f09ad78f6" width="500" height="375" />
</div>
<br/>
<br/>

### 5. 글 작성자의 프로필 확인 
- 다른 유저의 나눔 목록, 유저가 받은 후기를 확인할 수 있습니다.
 <div style="display:flex; gap:10px; ">
<img src="https://github.com/hyeonjy/Banana/assets/101038390/abcd1425-5183-4d59-a29a-3948022ddbf1" width="500" height="375" />
</div>
<br/>
<br/>

### 6. 게시물 검색 기능
- 검색 키워드가 제목 혹은 내용에 포함되는 게시물을 검색할 수 있습니다.

 <div style="display:flex; gap:10px; ">
<img src="https://github.com/hyeonjy/Banana/assets/101038390/e8bafa0a-5351-429d-beb4-47870bd4d4e9" width="700" height="375" />
</div>
<br/>
<br/>

### 7. 최신순, 조회순 등 게시물 정렬 기능 (카테고리)
- 등록순, 조회순 등 게시물을 정렬할 수 있습니다. 
 <div style="display:flex; gap:10px; ">
<img src="https://github.com/hyeonjy/Banana/assets/101038390/59a14fee-4e56-47b6-a781-e5230d7d09d9" width="500" height="375" />
</div>
<br/>
<br/>

### 8. (예정) WebSocket을 이용한 채팅 기능 구현


## 4. 개발 기록
  
## 5. 파일 구조

