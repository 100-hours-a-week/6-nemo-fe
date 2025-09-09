<div align="center">
  <img width="400" height="162" alt="Nemo_Logo 복사본" src="https://github.com/user-attachments/assets/8a54b942-1342-43a1-b31c-3e97cf331afb" />
</div><br/>

# NE:MO - 네가 찾는 모임, 네모

## <span id='1'>1. 서비스 소개</span>
"오늘 저녁에 누가 오지?"
"다음 모임 일정이 언제였더라?"
"모임원들한테 하나하나 연락하려니 너무 번거롭네..."

모임을 관리하는 일이 스트레스였다면,
내가 원하는 모임을 어디에서 찾아야 할지 고민이었다면,

‘네모’가 그 답이 되어 드립니다.

NE:MO는 모임 운영에 필요한 모든 기능을 담은 올인원 모임 관리 서비스입니다.

✨ 주요 기능 안내

1️⃣ 관심사별 모임 생성 & 관리
취미, 스터디, 동호회 등 다양한 카테고리로 모임을 만들고 체계적으로 운영할 수 있어요.

2️⃣ 관심 모임 탐색
회원가입 없이도 다양한 모임을 둘러볼 수 있어요.
내 관심사에 꼭 맞는 모임을 찾아보세요.

3️⃣ 참석 현황 한눈에 확인
참석 / 불참 / 미응답 현황을 한 화면에서!
개별 확인 없이 효율적인 참석자 관리가 가능합니다.

4️⃣ 내 모든 모임 일정, 한곳에서 관리
내가 참여 중인 모든 모임과 일정을 ‘내 정보’ 탭에서 통합 관리해보세요.
참석 가능 여부도 한눈에 확인할 수 있어요.

🔗 *배포 URL*: https://nemo.ai.kr<br> (현재 한정된 비용으로 Closed 상태입니다)

[![네모 소개 영상으로 이동합니다](https://user-images.githubusercontent.com/70703716/210714766-f18158b0-8d30-4d4f-a473-e71ef81cf434.png)](https://www.youtube.com/watch?v=U7QXP3ZaaOA)

---
### 목차
   [1. 서비스 소개](#1) 💨  
   [2. 팀원 소개](#2) 💨  
   [3. 프로젝트 기간](#3) 💨  
   [4. 아키텍처](#4) 💨  
   [5. 기술 선정](#5) 💨  
   [6. 성능 개선](#7) 💨  
   [7. 폴더 구조](#10) 💨  
   [8. 컨벤션](#12) 💨  
   [9. 협업 방식](#13) 💨  
   [10. 기타 문서](#14) 💨  
  <!--
   [8. 트러블 슈팅](#8) 💨  
   [9. 기능 시연](#9) 💨  
   [11. 코드 특징과 구현 방식](#11) 💨  
   [6. 테크 스펙](#6) 💨  
   [15. 회고](#14) 💨
   -->
---

## <span id='2'>2. 팀원 소개</span>
> **프론트엔드 개발**과 **팀장** 역할을 맡아 총 6명으로 구성된 팀을 운영하였습니다.

<img width="786" height="436" alt="image" src="https://github.com/user-attachments/assets/3ef5f625-2ca7-4a75-b736-1f1a88e562cd" />

## <span id='3'>3. 프로젝트 기간</span>
**`25/03/31 - 25/08/01`**

| 기간            | 작업 내용                           |
|-----------------|------------------------------------|
| 03.31 ~ 04.13   | 서비스 기획, 화면설계서             |
| 04.14 ~ 04.27   | 기술 선정 및 설계                   |
| 04.28 ~ 05.11   | MVP 개발                           |
| 05.12 ~ 07.27   | 유지보수 및 리팩토링, 기능 업데이트 |


## <span id='4'>4. 아키텍처 </span>
> 버전별 아키텍처와 원본을 [링크](https://www.notion.so/1f187f969ba08077aa30f9447947e35f?source=copy_link)에서 확인하실 수 있습니다.

### 최종(V3) 서비스 아키텍처
<img width="1000" height="620" alt="image" src="https://github.com/user-attachments/assets/5c146abc-a55f-4fb9-8bba-7a06121f339a" />


## <span id='5'>5. 기술 선정</span>
> 저희 서비스에 적합한 기술을 고려하였습니다. **기술 선정 이유**는 포트폴리오에서 확인하실 수 있습니다.

| 분류 | 기술 | 버전 |
| --- | --- | --- |
| 런타임 | Node  | 22.13.0 |
| 언어 | TypeScript | 5.7.3 |
| 코어 | Next.js, React.js | 15.3.1, 19.0.0 |
| 스타일링 | TailwindCSS, tailwind-variants | 4.1.4, 1.0.0 |
| 아키텍처 | FSD |  |
| 상태관리 | Zustand | 5.0.3 |
| 빌드 | Webpack, Turbopack |  |
| 패키지 매니저 | Pnpm | 10.10.0 |
| 테스트 | Jest(Unit)/Playwright,Cypress(E2E) | 29.7.0/ 1.52.0. 14.3.2 |
| 유효성 검사 | Zod, React-hook-form | 3.24.3, 7.56.1 |
| 디자인시스템 | Shadcn | 29.7.0 |
| 기타 | eslint,es-toolkit, prettier, js-conefetti | 9.25.1, 1.36.0, 3.5.3, 0.12.0 |

## <span id='6'>6. 성능 개선</span>
### 1. 낙관적 업데이트를 통한 UI 업데이트 최적화
<div align="center">
  <img width="156" height="347" alt="image" src="https://github.com/user-attachments/assets/b5b825c3-d530-4689-9240-bf8c0c03f94e" />
  <img width="357" height="302" alt="image" src="https://github.com/user-attachments/assets/542c21af-596d-4c2a-a35f-87eead2d23ae" />
  <img width="278" height="301" alt="image" src="https://github.com/user-attachments/assets/47de15ed-d227-4bd1-b586-8c9b005702c4" />
</div>

#### Situation (상황)
일정 참여 응답 시 UI 반영까지 최대 2초 이상 소요되는 문제가 있었고,  
사용자는 액션 결과를 즉시 확인할 수 없었습니다.  
또한 API 통신 과정에서 불필요하게 3번의 렌더링이 발생해 UX가 저하되고 있었습니다.  

#### Task (과제)
사용자가 즉각적으로 액션 결과를 확인할 수 있도록 UI 반응 속도를 개선하고,  
불필요한 렌더링을 줄여 매끄러운 UX를 제공해야 했습니다.  

#### Action (조치)
- React Query의 낙관적 업데이트 패턴을 구현  
- 사용자 액션 발생 시 예상 결과를 즉시 UI에 반영  
- 서버 통신은 백그라운드에서 처리, 실패 시 UI 롤백  

#### Result (성과)
- UI 반응 시간 2초 → **즉시** (100% 개선)  
- 렌더링 횟수 3회 → 1회 (67% 감소)  
- 즉각적인 사용자 피드백 제공 및 매끄러운 UX 구현  
---

### 2. 번들 다이어트를 통한 렌더링 성능 개선
<div align="center">
  <img width="654" height="363" alt="image" src="https://github.com/user-attachments/assets/ae50ba91-2b6e-4d1b-b53a-20c7d0be5c5c" />
</div>

#### Situation (상황)
초기 로딩 시 대용량 JavaScript 번들로 인해 로딩 시간이 길어졌고,  
사용자가 페이지를 빠르게 확인하기 어려웠습니다.  

#### Task (과제)
번들 크기를 줄이고 초기 로딩 속도를 개선해  
사용자가 더 빠르게 콘텐츠를 확인할 수 있도록 해야 했습니다.  

#### Action (조치)
- Next.js Bundle Analyzer로 번들 분석 및 최적화  
- React Server Components(RSC) 전환으로 클라이언트 번들 경량화  
- Dynamic Import를 활용한 코드 스플리팅  

#### Result (성과)
- JavaScript 번들 크기 **24% 감소**  
- 초기 로딩 시간 **45% 단축**  
- FCP(First Contentful Paint) **1.2초 개선**  
---

### 3. 미들웨어 기반 엣지 사이드 인가(Authorization) 처리
<div align="center">
  <img width="373" height="205" alt="image" src="https://github.com/user-attachments/assets/fefa2e1d-c65a-46ea-b3c8-2a1e6e9e7ca0" />
</div>

#### Situation (상황)
인가 로직이 클라이언트 측에서만 수행되면서,  
보호된 페이지 접근 시 UI가 잠깐 렌더링된 뒤 인증 실패로 `/login` 리다이렉트가 발생해  
페이지가 '깜빡이는' 현상이 있었습니다.  

#### Task (과제)
보호된 페이지 접근 시 불필요한 깜빡임을 제거하고,  
사용자 경험을 매끄럽게 개선해야 했습니다.  

#### Action (조치)
- Next.js 미들웨어를 활용해 엣지 사이드 인증 검증  
- 페이지 로드 전에 인증 상태를 사전 확인 후 접근/리다이렉트 처리  

#### Result (성과)
- 로그인 완료 시 보호된 페이지 접근에서 **깜빡임 현상 제거**  
- 안정적이고 매끄러운 UX 제공  
---

### 4. 큐 기반 토큰 재발급 최적화
<div align="center">
  <img width="401" height="130" alt="image" src="https://github.com/user-attachments/assets/349d44e1-8ca3-4824-b7b4-c79451770b05" />
</div>

#### Situation (상황)
토큰 만료 시 여러 API가 동시에 각각 토큰 재발급을 요청하면서  
서버 부하가 증가하는 문제가 있었습니다.  

#### Task (과제)
토큰 만료 상황에서 중복 재발급 요청을 방지하고,  
사용자에게 재로그인 요구 없이 안정적인 API 요청 처리를 보장해야 했습니다.  

#### Action (조치)
- 첫 번째 API 요청만 토큰 재발급을 수행하도록 제한  
- 동시에 요청된 다른 API들은 큐에 저장하여 대기  
- 토큰 재발급이 완료되면 큐에 대기 중인 요청들을 일괄 재실행  

#### Result (성과)
- 불필요한 재발급 요청 제거  
- 토큰 만료 시 재로그인 플로우 제거로 사용자 경험 개선  

<!--
## <span id='8'>8. 트러블 슈팅</span>

1. **이미지 에러 처리** 
* **문제**  
초기에는 에러이미지가 포스팅의 절반을 차지 했습니다. 
* **원인**  
게시자가 계정 등록/포스팅/상품 등록시 이미지를 등록하지 않은 경우 혹은 이미지 URL이 잘못된 경우 앱에서도 이미지가 깨져서 나오게 되었습니다. 
* **해결**  
포스팅시 이미지를 등록하지 않은 경우에는 이미지를 등장시키지 않도록 했고 URL이 잘못된 경우에는 각 케이스에 따라 별도의 대체 이미지를 디자인하여 보여주도록 했습니다.

2. **api요청 형식 오류로 인한 CORB 오류**
* **문제**   
전달한 이미지 파일을 요청 받지 못하는 문제 발생했습니다. 특이한 점은 상태 코드가 200이지만 data 값이 없어서 원인을 찾는 데 어려움을 겪었습니다.
* **원인**  
api에 전달하는 데이터 형식 오류 때문에 발생하게 된 api의 잘못된 값 반환으로 인한 CORB 오류였습니다.
* **해결**  
CORS 개념 이해를 통해 api가 요구하는 알맞은 형식의 데이터 전달로 해결 했습니다.
    
3. **스타일 재작업 필요**
* **문제**
기능 구현 후 각자 담당 페이지를 스타일링 하였는데 코드를 합쳐서 보니 스타일링 통일이 되지 않았습니다.
* **원인**
피그마 디자인을 직접 만든 뒤 그를 토대로 스타일링 작업을 하여 정확한 pixel 값이 맞춰지지 않은 상태였고, 코드 재활용이 가능한 요소에도 4명 각자의 스타일로 마크업과 스타일링이 이루어졌습니다.
* **해결**
기준을 세워서 전체 페이지 마크업과 스타일링을 다시 해야 했고 중간에 스타일드 컴포넌트명 컨벤션이 필요함을 깨닫게 되어 한사람이 전체 코드를 통일하는 작업을 거쳤습니다. 이번과 같이 팀프로젝트에서 최소한의 디자인 파일을 가지고 개발을 하는 경우 한사람이 마크업과 스타일링을 맡아서 진행하거나 명확한 컨벤션을 가지고 모두가 이를 지키며 작업해야 한다는 것을 배웠습니다.

4. **기존에 작성한 기능을 컴포넌트화하여 통일했을 때 겪은 이슈**
* **문제**  
버튼 기능을 구현했는데 버튼 컴포넌트를 통일하면서 조건식과 전달받는 프롭스가 달라져 같은 기능을 다시 구현한 경험이 있습니다.
* **원인**  
컨벤션을 제대로 확인 안 하고 담당 컴포넌트 안에서만 기능 구현을 하고 있었습니다.
* **해결**  
버튼 컴포넌트를 크기에 맞춰 스몰/미디움/라지로 분리함으로써 최소한의 코드 수정을 거쳐 작성 했습니다.

5. **로그인 후 새로고침을 해야만 정보가 로딩됨**
```jsx
axiosPrivate.interceptors.request.use(
  (config) => {
    if (config.method === 'get') {
      document.body.classList.add('loading-indicator');
    }
    if (!TOKEN) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
```
* **문제**  
 로그인 했을 때 토큰 값이 로컬스토리지에 정상적으로 저장 되었으나 api 요청이 거절 되었습니다.
* **원인**  
token 값이 로컬스토리지에 저장 되었지만 api 요청 header에는 여전히 undefined 상태였습니다.
* **해결**  
interceptor 기능을 활용해 header 안에 token이 undefined일 경우 로컬스토리지에서 토큰 값을 다시 불러올 수 있도록 구현 했습니다.

6. **다른 유저 프로필 페이지 이동시 정보 로딩 안됨**
* **문제**  
다른 유저의 프로필 페이지로 이동시 정보 로딩이 안 되는 문제가 있었습니다.
* **원인**  
프로필 페이지 하위 컴포넌트들의 useEffect depth가 빈 배열이어서 하위 컴포넌트들이 리렌더링 되지 않았습니다.
* **해결**  
useEffect의 depth 배열에 useParams로 받아온 user 값을 넣어서 user 값이 변할 때마다 리렌더링과 동시에 유저 정보를 얻어오는 api 요청 함수를 실행하도록 했습니다.





## <span id='9'>9. 기능 시연</span>
링크를 누르면 상세 설명 페이지로 이동합니다.

### 1) 홈+채팅

|              [Splash](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#1-splash)               | [회원가입/프로필 설정](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#2-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%ED%94%84%EB%A1%9C%ED%95%84-%EC%84%A4%EC%A0%95) |         [로그인](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#3-%EB%A1%9C%EA%B7%B8%EC%9D%B8)         |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                <img width=250 src='https://user-images.githubusercontent.com/70703716/210491885-2dcace18-ea58-4ac5-bf98-b74f2eaabdac.gif'>                |                                               <img width=250 src='https://user-images.githubusercontent.com/70703716/210498001-eea42291-6698-498a-908c-9e9d3bef2ad4.gif'>                                                |                     <img width=250 src='https://user-images.githubusercontent.com/70703716/210491123-49105262-ae47-4e4c-afe3-4ed575a4ebab.gif'>                     |
| [**홈 피드**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#4-%ED%99%88-%ED%94%BC%EB%93%9C) |                           [**유저 검색**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#5-%EC%9C%A0%EC%A0%80-%EA%B2%80%EC%83%89)                           | [**날씨/채팅**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#6-%EB%82%A0%EC%94%A8%EC%B1%84%ED%8C%85) |
|                <img width=250 src='https://user-images.githubusercontent.com/70703716/210542124-613770d3-b63c-4297-9176-020007deccf2.gif'>                |                                               <img width=250 src='https://user-images.githubusercontent.com/70703716/210491217-041f56f7-5e88-4db7-b08e-ce949358eaea.gif'>                                                |                     <img width=250 src='https://user-images.githubusercontent.com/70703716/210488539-7ff28cb1-6161-45a7-a626-822e0b72b7f8.gif'>                     |

## 2) 게시물 작성

| [**게시물 등록**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#1-%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EB%93%B1%EB%A1%9D) | [**게시물 수정/삭제**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#2-%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%88%98%EC%A0%95%EC%82%AD%EC%A0%9C) | [**게시물 상세 페이지**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#3-%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%83%81%EC%84%B8-%ED%8E%98%EC%9D%B4%EC%A7%80) |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                           <img width=250 src='https://user-images.githubusercontent.com/70703716/210488458-b40d874b-0d52-4b05-8f9c-afd750c036b1.gif'>                           |                                      <img width=250 src='https://user-images.githubusercontent.com/70703716/210488481-0840f315-b947-4687-90e4-13ff79073bf6.gif'>                                       |                                            <img width=250 src='https://user-images.githubusercontent.com/70703716/210489095-2dd2b3e9-fd2a-4e63-ac5c-5d1d5183adca.gif'>                                             |

## 3) 프로필

|                                   [**내 프로필**](https://user-images.githubusercontent.com/70703716/210562051-686e8c01-8432-4faa-8543-828d6ef021bb.gif)                                    |      [**프로필 수정**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#2-%ED%94%84%EB%A1%9C%ED%95%84-%EC%88%98%EC%A0%95)      | [**상품 등록**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#3-%EC%83%81%ED%92%88-%EB%93%B1%EB%A1%9D) |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                 <img width=250 src='https://user-images.githubusercontent.com/70703716/210562051-686e8c01-8432-4faa-8543-828d6ef021bb.gif'>                                 |                                <img width=250 src='https://user-images.githubusercontent.com/70703716/210492413-9dcd9c4e-dad3-4c3d-807e-d3f74fb19549.gif'>                                |                     <img width=250 src='https://user-images.githubusercontent.com/70703716/210488512-e9582886-87f5-4cce-af6c-27912170d482.gif'>                      |
| [**상품 수정/삭제**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#4-%EC%83%81%ED%92%88-%EC%88%98%EC%A0%95%EC%82%AD%EC%A0%9C) | [**팔로잉/팔로워**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#5-%ED%8C%94%EB%A1%9C%EC%9E%89%ED%8C%94%EB%A1%9C%EC%9B%8C) |  [**로그아웃**](https://github.com/20th-lion/camperz/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#6-%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83)  |
|                                 <img width=250 src='https://user-images.githubusercontent.com/70703716/210488517-05b3ce4b-004a-403e-8c31-9b1f4158c713.gif'>                                 |                                <img width=250 src='https://user-images.githubusercontent.com/70703716/210491754-e77b8eb2-a005-4b45-8be1-c614b6a180ee.gif'>                                |                     <img width=250 src='https://user-images.githubusercontent.com/70703716/210491136-4d216436-bfbe-4776-b012-837e9a1333a3.gif'>                      |
-->


## <span id='7'>7. 폴더 구조</span>
```
│README.md
│package.json
│pnpm-lock.yaml
│tsconfig.json
│next.config.ts
│eslint.config.mjs
│commitlint.config.js
│components.json
│postcss.config.mjs
│lighthouserc.js
│Dockerfile
├─🗃️public
├─🗃️lib
│  └─📁(utils 등)
└─🗃️src
    ├─🗂️app
    │  ├─📁_providers
    │  ├─📁(tabs)
    │  │  ├─📁chatbot
    │  │  ├─📁groups
    │  │  ├─📁my-nemo
    │  │  └─📁my-profile
    │  ├─📁api
    │  │  ├─📁healthcheck
    │  │  └─📁v2
    │  │     └─📁groups
    │  │        └─📁recommendations
    │  │           ├─📁questions
    │  │           └─📁session
    │  ├─📁groups
    │  │  ├─📁[groupId]
    │  │  │  └─📁schedule
    │  │  │     ├─📁[scheduleId]
    │  │  │     └─📁create
    │  │  ├─📁create
    │  │  └─📁search
    │  └─📁login
    │
    ├─🗂️entities
    │  ├─📁chatbot
    │  ├─📁group
    │  ├─📁profile
    │  └─📁schedule
    │
    ├─🗂️features
    │  ├─📁auth
    │  ├─📁category
    │  │  └─📁category-filter
    │  ├─📁create-group
    │  ├─📁create-group-info
    │  ├─📁create-schedule
    │  ├─📁group
    │  │  ├─📁delete-group
    │  │  ├─📁leave-group
    │  │  ├─📁manage-group
    │  │  ├─📁manage-members
    │  │  └─📁update-group-image
    │  ├─📁join-group
    │  ├─📁navigate-back
    │  ├─📁profile
    │  │  ├─📁update-nickname
    │  │  └─📁update-profile-image
    │  ├─📁respond-schedule
    │  ├─📁schedule
    │  └─📁search
    │     └─📁search-groups
    │
    ├─🗂️shared
    │  ├─📁assets
    │  │  ├─📁fonts
    │  │  └─📁images
    │  ├─📁config
    │  │  └─📁sentry
    │  ├─📁constants
    │  ├─📁lib
    │  ├─📁store
    │  ├─📁styles
    │  └─📁ui
    │
    └─🗂️widgets
       ├─📁bottom-navigation
       ├─📁group-details
       ├─📁group-list
       ├─📁my-group-list
       ├─📁my-schedule-list
       └─📁schedule-list
```


<!--
## <span id='11'>11. 코드 특징과 구현 방식</span>
1. **컴포넌트 구조화**  
* common 폴더로 공통 컴포넌트를 구조화 했습니다.
* apis 폴더로 사용되는 api를 일괄 관리 했습니다.
* dummy 폴더로 마크업 구현을 위한 data를 일괄 관리 했습니다.
  
2. **컴포넌트의 재사용성 고려**
    
중복으로 사용되는 입력폼 양식(로그인/회원가입/상품등록/프로필 설정 등)과 페이지는 컴포넌트화하여 재사용성을 높였습니다. 

3. **알기 쉬운 변수명**을 작성하고 **목적에 따라** 기능적 컴포넌트와 스타일드 **컴포넌트명을 구분**하여 사용 했습니다.

4. **custom Hook 사용**  
useModals 훅을 생성하여 모달을 열고 닫는 함수를 반환할 수 있도록 했습니다. 각각의 모달은 Modals 컴포넌트에서 관리하고 AppProvider에서 모달의 여닫음을 관리합니다. 
   
5. **더 나은 사용자 경험**  
* 로딩 애니메이션을 추가하여 사용자가 로딩 상태를 인지할 수 있도록 했습니다.
* 페이지/사진/날씨 로딩에 실패할 경우 대체이미지를 보여줍니다. 
* Footer를 통해 화면에서 바로 접근하기 어려운 페이지를 라우팅 하였습니다.
  
6. **로그인 여부에 따른 페이지 처리**  
로그인 여부에 따라 이동할 수 있는 페이지를 제한 하였습니다. AppProvider에서 로그인 여부와 로그인 및 로그아웃 기능을 관리합니다.

7. **useParams 사용**
* 프로필 페이지 구현  
 useParams를 이용해 사용자의 아이디를 받아와 정보를 띄워줍니다. 내 프로필에서는 상품 등록 및 프로필 수정 페이지로 이동할 수 있는 버튼이 나타나고, 다른 유저의 프로필에서는 팔로우 버튼이 나타납니다.
* 댓글 모달 클릭시 내 댓글이면 삭제, 다른 유저의 댓글이면 신고 기능을 사용할 수 있습니다.

8. **axios 객체 생성**  
토큰 값이 필요한 것과 아닌 것을 각각 구분하여 api 요청 서버의 url과 header 값을 담고 있는 axios 객체를 생성하였습니다. interceptor 기능을 활용해 로그인시 토큰 값에 undefined가 들어있을 경우 토큰 값을 재설정 했습니다. 또한 axios get 요청인 경우 로딩 화면을 구현하기 위해 body 요소에 class를 추가하여 로딩 화면이 나타날 수 있도록 구현 했습니다.

9. **추가기능**으로 OpenWeatherMap API를 이용한 날씨 서비스를 제공합니다.

-->


## <span id='8'>8. 컨벤션</span>
### 8.1 브랜치 전략
```
gir-flow 전략을 적용하되, release 브랜치는 사용하지 않는다. 

케밥케이스를 따른다. (kebab-case)

1. main: 운영 베포용
2. develop: 개발 통합용
3. feature/이슈번호-기능명: 새로운 기능 개발
4. fix/이슈번호-버그명: 개발 중 발견한 버그 수정
5. hotfix/이슈번호-긴급수정명: 운영 중 긴급 수정
6. refactor/이슈번호-기능명: 기능에 대한 리팩토링

> e.g. `feature/3-kebab-case`
> 이외의 브랜치는 팀원들과 상의를 통해 생성한다.
```
### 8.2 커밋 컨벤션
```
> Feat : 내용 (#이슈번호)
> e.g. Feat: 아무말 대잔치입니다 (#5)

- `Feat` : 새로운 기능 추가
- `Design` : CSS 등 사용자 UI 변경
- `Refactor` : 코드 리팩토링
- `Fix` : 버그 수정
- `Comment` : 주석 추가 및 변경만 하는 경우
- `Remove` : 파일, 폴더 삭제 작업만 하는 경우
- `Rename` : 파일 혹은 폴더명을 수정하거나 옮기는 작업만 하는 경우
- `Setting` : 프로젝트 세팅
- `Docs` : 문서 수정
- `Chore`: 그 이외의 잡일/ 버전 코드 수정, 패키지 구조 변경, 파일 이동, 파일이름 변경
```

### 8.3 Issue 컨벤션
[이슈 템플릿 파일](https://github.com/100-hours-a-week/6-nemo-fe/tree/main/.github/ISSUE_TEMPLATE) <br/>

### 8.4 Pull Request 컨벤션
[커밋 템플릿 파일](https://github.com/100-hours-a-week/6-nemo-fe/blob/main/.github/pull_request_template.md)


## <span id='9'>9. 협업 방식</span>
<!--
### - 협업 방법
* 사전 스터디 진행: 팀원들의 리액트 실력을 상향 평준화하고, 깃헙 브랜치 전략에 익숙해지는 시간을 갖음  
([Wiki: 한번의 사이클이 돌아가기까지](https://github.com/20th-lion/camperz/wiki))
  
* [칸반보드](https://www.notion.so/20th-century-lions/eb1ad668043b4b9e803366f97454e35c)와 [회의록](https://www.notion.so/20th-century-lions/22-12-02-4c6c3a8e84ab46be8cc54beacf4f923a) 사용: 전체 흐름과 팀원별 진행 상황을 누구나 쉽게 확인할 수 있도록 함
<img src='https://user-images.githubusercontent.com/108520997/210458662-eed4e867-9f5c-4350-bb14-7bd11e04329d.png'>
  
* 단계적인 목표 날짜를 정하여 스프린트 방식 도입, 데일리 스크럼 진행
  
* 무기명 설문과 투표로 의견 취합, 피그잼 브레인스토밍, 페어 프로그래밍
-->
- 2주 단위 스프린트 진행
- [마일스톤](https://github.com/100-hours-a-week/6-nemo-fe/milestones) 단위 버전 업데이트 진행
- 작업 추적을 용이하도록 설계한 [칸반보드](https://github.com/orgs/100-hours-a-week/projects/146)
- 매일 오전 09:10 ~ 09:30 [데일리 스크럼](https://github.com/100-hours-a-week/6-nemo-wiki/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22%F0%9F%94%86%20%EB%8D%B0%EC%9D%BC%EB%A6%AC%20%EC%8A%A4%ED%81%AC%EB%9F%BC%22)
- 매일 오후 17:50 ~ 18:00 데일리 회고 (작업 병목 상황에 짧게 대해 공유합니다)
- 디스코드를 통한 비동기 커뮤니케이션
- 동기 커뮤니케이션 필요 시, 회의실과 타운홀 활용

## <span id='10'>10. 기타 문서</span>

| 문서(링크) |
|-----------|
| [유저플로우차트](https://app.diagrams.net/#G1e7nN1oqraX8T1OTXxqUEpWDqd-Y8dBZK#%7B%22pageId%22%3A%22SL2EEUvOC3-JrASh9f2n%22%7D) |
| [칸반보드](https://github.com/orgs/100-hours-a-week/projects/146) |
| [프로젝트 Wiki](https://github.com/100-hours-a-week/6-nemo-wiki/wiki) |
| [린캔버스](https://www.figma.com/design/M9ZoQlE43ENtqYhC1ew9BC/%ED%8C%80-6%EC%A1%B0-%EC%84%9C%EB%B9%84%EC%8A%A4%EA%B8%B0%ED%9A%8D?node-id=11967-508&t=g70q6Zr1PtS2LS3e-1) |
| [IA](https://www.figma.com/design/M9ZoQlE43ENtqYhC1ew9BC/%ED%8C%80-6%EC%A1%B0-%EC%84%9C%EB%B9%84%EC%8A%A4%EA%B8%B0%ED%9A%8D?node-id=7937-54125&t=g70q6Zr1PtS2LS3e-1) |
| [화면설계서](https://www.figma.com/design/M9ZoQlE43ENtqYhC1ew9BC/%ED%8C%80-6%EC%A1%B0-%EC%84%9C%EB%B9%84%EC%8A%A4%EA%B8%B0%ED%9A%8D?node-id=7223-21707&t=g70q6Zr1PtS2LS3e-1) |
| [ERD](https://github.com/100-hours-a-week/6-nemo-wiki/wiki/ERD) |
| [API 명세서](https://docs.google.com/spreadsheets/d/1M_VFphwh0QZr7blsEwtBvqLFhf6ugvtMzaih_n2fahs/edit?gid=2058590026#gid=2058590026) | 

<!--
## <span id='15'>15. 회고</span>
|   김진우(Ray)   | 
| :-: |
| 우연찮게 팀장 자리를 맡아서 프로젝트 때문에 마음의 상처를 입는 분이 없도록 하는 게 저의 1순위였습니다. 너무나 좋은 팀원들을 기적처럼 만나서 멋진 첫 프로젝트 경험을 얻고, 또 생각치 못한 좋은 피드백까지 받아서 뿌듯합니다. 처음에 말씀해주셨던 팀원들 각자의 목표를 잊지 않고 있습니다. 우리의 캠퍼즈는 약간의 리팩토링을 거쳐 곧바로 취업에 사용할 수도 있고, 이 경험을 발판 삼아 다음 프로젝트로 도전할 수 있는 계기가 될 수도 있겠습니다. 완벽한 결과물은 아닐 수 있겠지만 목표로 하던 그대로 이루어내었다는 점에 무척 기쁘고요, 번아웃으로 시작한 프로젝트였는데 저도 리액트가 좋아졌습니다. 곧장 다음 프로젝트 시작할 거예요 ㅎㅎㅎ 부트캠프에 참가했던 목표를 20세기라이언에서 모두 이룬 것 같아요. 그동안 저와 함께 해주셔서 우리 20팀원들께 진심으로 감사드립니다. |
-->
