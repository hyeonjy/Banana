## BANANA : 바로 나누고 나눔받자

<div style="display:flex; width:100%; justifyContent:center;">
  <img width="700" height="350" src="https://github.com/hyeonjy/Banana/assets/101038390/39b025c1-f291-4cf7-8897-a7aa1fa4e717" />
 </div>
 <br/>
<br/>
🍌 BANANA는 사용하지 않지만 가치가 있는 패션 제품을 나누는 커뮤니티 웹사이트입니다.

## 0. 프로젝트 소개
🌏 2인 팀 프로젝트 ( 2023.03 ~  (현재 develop/back branch 에서 작업중) <br/>
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
   <img src="https://github.com/hyeonjy/Banana/assets/101038390/8c5aafa0-21b2-4513-ac35-08868685d6eb" width="500" height="375" />
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

📋 게시물(post) 수정 - 1. 기존 이미지 미리보기 가져오기
- 게시물 작성 시에는 로컬에서 업로드한 이미지의 미리보기를 위해 createObjectURL 로 접근했지만, 게시물 수정시에는 서버로부터 전달받은 base64 타입의 이미지 데이터를 URL로 변환하는데 실패했다.
- 방법을 바꿔 FileReader 객체를 통해 로컬에서 업로드되는 이미지를 base64 타입로 처리했다.

<br/>

개선 이전 - 기존 이미지가 뜨지 않음
```javascript
   // 기존 이미지 미리보기 띄우기
   function base64ToImgUrl(base64) {
      const blob = new Blob([base64], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      return url;
    }
    useEffect(() => {
        if (state) {
          //....
          let imgurls = [];
          for (let i = 0; i < state.item.imgs.length; i++) {
            imgurls.push(base64ToImgUrl(state.item.imgs[i].data)); // base64 데이터 - > ObjectURL
          }
          setImgURLs(imgurls);
       }
    }, [state]);

   // 로컬 이미지 업로드후 미리보기 띄우기
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    //...
    setImgURLs(imageUrlLists);
    
    //...
    
    // 미리보기 이미지 컴포넌트
    <ImgPreview src={imgURL} />
```

개선 이후
```javascript
  // 기존 이미지 미리보기 띄우기
      //....
      let imgurls = [];
      for (let i = 0; i < state.item.imgs.length; i++) {
         imgurls.push(state.item.imgs[i].data); // base64 데이터
      }
      setImgURLs(imgurls);

    //....
    
    // 로컬 이미지 업로드
     const reader = new FileReader();
     reader.onload = () => {
       const base64Data = reader.result;
       setImgURLs((prevImgs) => [...prevImgs, base64Data.split(",")[1]]); // 이미지 미리보기 저장(base64형식)
     };
      
  //...
  // 미리보기 이미지 컴포넌트
  <ImgPreview src={`data:image/jpeg;base64, ${imgURL}`} />
 
```

📋 게시물(post) 수정 - 2. 이미지 삭제
- 어떤 기존 이미지가 삭제되었고 유지되며, 로컬에서 어떤 이미지가 추가&삭제되는지에 대해 처리해야 했다.
- 처음에는 데이터를 모두 지운 다음 업데이트 된 데이터를 다시 insert 하는 방법을 선택했다가, 기존 이미지 데이터(base64형식)을 파일 형태로 전환하는데 어려움을 겪었다.
- 다른 방법으로, 삭제할 데이터의 파일명과 새로 추가한 파일만 서버에 전송하는 방법을 택했다
```javascript
  const [imgURLs, setImgURLs] = useState([]); /**이미지 미리보기 */
  const [imgFileName, setImgFileName] = useState([]); /** 기존 이미지 파일명 (수정) */
  const [deleteFileList, setDeleteFileList] = useState([]); /** 삭제될 파일명 */
  
  useEffect(() => {
    if (state) {
       //.......
       let imgurls = [];
       let imgfilesname = [];
       for (let i = 0; i < state.item.imgs.length; i++) {
          imgurls.push(state.item.imgs[i].data); //base64 데이터 - 미리보기 관련
          imgfilesname.push(state.item.imgs[i].filename);  // 기존 이미지 파일명
       }
       setImgURLs(imgurls);
       setImgFileName(imgfilesname);
    }
  }, [state]);
 
 //...
   // 이미지 삭제시 실행 함수
  const handleDelete = (index) => {
    setImgURLs(imgURLs.filter((_, idx) => idx !== index)); // 미리보기 처리
    if (index < imgFileName.length) { // 기존 이미지 데이터 삭제 
      setDeleteFileList((prev) => [...prev, imgFileName[index]]);
      setImgFileName(imgFileName.filter((_, idx) => idx !== index));
    } else { // 로컬에서 추가된 이미지파일 삭제
      setImgFile(
        imgFile.filter((_, idx) => idx + imgFileName.length !== index)
      );
    }
  };

```

---

📋 Modal 관련 버그 해결
```javascript
  useEffect(() => {
    const body = document.querySelector("body");
    if (imgFullModal || activeGrade) {
      body.classList.add("no-scroll");
    } else if (!imgFullModal && !activeGrade) {
      body.classList.remove("no-scroll");
    }
    return ()=>body.classList.remove("no-scroll");
  }, [imgFullModal, activeGrade]);

```
- 모달 사용 시 스크롤 방지
- 언마운트시(return) 스크롤 방지를 제거해 주지 않을 경우, 모달 active 상태에서 다른 페이지로 이동 시 여전히 스크롤이 막혀있는 상황이 발생 

  ---
  
  📋 React-Swiper currentIdx 버그 해결
```javascript
  // swiper onSlideChange 시 - 현재 이미지의 인덱스 저장 함수
  const handleSlideChange = (swiper) => {
    setImgCurrentIdx(swiper.realIndex);
  };
  
  //...
  
   <StyledSwiper
      //...
      loop={true}
      onSlideChange={handleSlideChange}
   >
   </StyledSwiper>

```
- 기존에 사용했던 swiper.activeIndex는 Swiper 컴포넌트가 loop 모드일 경우에 정확한 인덱스를 반환하지 못함
- swiper.realIndex로 대체

---

📋 useMutation - 찜(아이콘) 상태 변경

```javascript

	const queryClient = useQueryClient();
  const { mutate: mutateHeart } = useMutation(
    (heart) => heartChangeApi(heart),
    {
	// 서버 요청 완료 후 업데이트 완료된 최신 정보를 화면에 그리는 경우
	// onSuccess: () => {
      //   queryClient.invalidateQueries(["postDatail", postId);
      // },

	// 옵티미스틱 업데이트
	onMutate: async (newData) => {
        const previousHeartData = queryClient.getQueryData([
          "postDatail",
          postId,
        ]);
        queryClient.setQueryData(["postDatail", postId], (olddata) => {
          return { ...olddata, heart: !newData.heart };
        });
        return previousHeartData; //요청 실패할 경우 기존 데이터를 사용
      },
	//요청이 실패할 경우 이전상태 유지
      onError: (rollback) => rollback(),

    }
  );

```
- mutation 성공 후 쿼리를 업데이트 하는 방법에서 옵티미스틱 업데이트로 변경함에 따라 빠른 반응속도 

<img src="https://github.com/hyeonjy/Banana/assets/101038390/de5d5016-d9d3-422f-ae68-76dd31d50c7a" width="500" height="375" />


## 5. 파일 구조

