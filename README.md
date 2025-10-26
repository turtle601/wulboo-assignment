# 기술 스택

- **프론트엔드**: Next.js 15, Tailwind CSS v4, Storybook, Zustand, TanStack Query
- **백엔드**: Express, Cookie Parser

## 실행 방법

```
nvm use v22.17.0 // 노드 버전 v22 맞추기
yarn
yarn dev
yarn mock (다른 터미널에서 실행)
```

### FSD 아키텍처

A. FSD 아키텍처
기능 중심으로 폴더를 구성, 도메인 로직과 UI 컴포넌트를 확실하게 분리, 계층화를 효과적으로 하기 위해 FSD 아키텍처를 적용하였습니다. 뿐만 아니라 FSD 의존성 규칙(“상위 폴더(레이어)의 함수는 직접 사용할 수 없고, 오직 자신과 하위계층에서 공개된 API만 사용할 수 있다.”) 이 규칙을 통해 단일 의존성 방향을 보장하여 서버 컴포넌트와 클라이언트 컴포넌트를 쉽게 구분할 수 있습니다.

- FSD 공식문서를 토대로 각 폴더의 역할과 책임은 다음과 같이 정의하였습니다.

- app: 애플리케이션 초기화 및 글로벌 설정 (ex. provider, router 설정)

- pages: 말 그대로 pages를 의미

- widget: features 컴포넌트를 묶음 단위로 사용

- features: 사용자 시나리오와 도메인 로직 기능을 담당하는 컴포넌트를 선언

\*entities: entities는 비즈니스 엔티티를 다루는 레이어로, 서버에서 받은 데이터와 기능을 프론트엔드 관점(상태)에 맞춰 매핑하고 변환하는 역할을 담당합니다.

즉, 서버 데이터와 화면에서 실제로 필요한 데이터 사이의 간극을 줄여주는 매핑 레이어라고 보시면 됩니다.
( 또한, tanstack-query가 “서버 상태”를 관리하기 때문에, 이와 관련된 로직 역시 대부분 이 레이어에서 처리하도록 구성했습니다. )

shared: 공용 스타일, 공용 커스텀 훅, 공용 함수, 공용 UI 컴포넌트, 유틸리티한 함수와 컴포넌트를 정의

### SSR

강의 목록 페이지 서버 사이드 렌더링을 구현했습니다.

강의 목록 페이지에서 다양한 정렬 옵션별로 데이터를 미리 prefetch하여 SSR을 구현했습니다. 이를 통해 사용자가 정렬 옵션을 변경할 때 즉시 데이터를 표시할 수 있도록 성능을 최적화했습니다.

### 공용 컴포넌트 설계 방법

평소 리액트 컴포넌트를 개발하면서 기능 + UI 결합된 형태로 컴포넌트를 개발할 경우 확장성이 떨어진다는 문제점을 겪고 있었습니다.

따라서 UI 없이 로직, 혹은 필요한 기능이나 스타일만 제공하는 "Headless 컴포넌트"를 구축, 변동 사항이 많은 스타일은 props나 children을 통해 제어권을 넘겨주어 컴포넌트를 설계하도록 구성하였습니다.

뿐만 아니라 UI 기능이 복잡한 경우 "합성 컴포넌트 패턴" ( SRP 원칙을 지킨 작은 기능들의 컴포넌트의 조합 ) 을 적용하여 확장성이 높은 컴포넌트을 설계하였습니다.

### 테스트

Storybook을 활용해 애플리케이션의 비즈니스 로직이나 데이터 의존성 없이, 순수하게 컴포넌트 자체만을 렌더링하고 테스트하고, 추상화된 UI 컴포넌트들을 격리된 환경에서 개발하고 테스트할 수 있게 해주기 때문에 사용했습니다.

Storybook을 활용한 컴포넌트 기반 개발(CDD)을 통해:

- **격리된 환경**: 비즈니스 로직이나 데이터 의존성 없이 순수한 컴포넌트만 테스트
- **재사용성**: 추상화된 UI 컴포넌트들을 독립적으로 개발하고 테스트
- **시각적 테스트**: 다양한 props와 상태에 따른 컴포넌트 렌더링 결과 확인

### 에러 핸들링 방법

- 1. 서버 컴포넌트 (인증)
     (로그인 유저만 볼 수 있는 컨텐츠) -> 유저 볼 수 있게
     ( 로그인 하지 않은 유저만 볼 수있는컨텐츠) -> 로그인 유저가 볼 수 없게

- 2. mutation error (POST 요청 에러)
     post 요청 후 API 에러 응답을 받을 경우 modal을 통해 안내 메세지를 주고 있습니다.

- 3. query error
     global-error에서 처리

- 4. 예상치 못한 에러
     global-error에서 처리

### 시멘틱 태그

```
1. <form>: 폼 제출과 유효성 검사를 위한 시멘틱 구조
2. <fieldset>: 라디오 버튼 그룹을 논리적으로 묶음
3. <input type="radio">: 단일 선택을 위한 시멘틱 태그
4. <input type="checkbox">: 다중 선택을 위한 시멘틱 태그
5. <label>: 접근성을 위한 입력 요소와의 연결
6. <button>: 사용자 액션을 위한 시멘틱 태그
7. role="group": ARIA 역할을 통한 접근성 향상
8. aria-labelledby: 요소 간의 관계 명시
9. aria-checked: 상태 정보 제공
10. sr-only: 스크린 리더 전용 요소
이러한 시멘틱 태그 사용으로 웹 접근성, SEO 최적화, 코드 가독성을 모두 향상시켰습니다! 🎉
```

# 추가 작성
## 도메인 기능 요구사항 분석

### 월급쟁이 부자들 과제에서 가장 중요하게 생각한 기능

월급쟁이부자들 강의 플랫폼을 직접 사용해보고 주어진 과제를 보고 가장 중요하게 생각했던 기능은 다음과 같습니다.

**1. 수강 등록의 데이터 정합성 보장**

이 과제는 **강의 수강 도메인**이기 때문에, 수강 등록 후 **수강 목록과 개설 강의에서 정확한 데이터를 보여주는 것**이 가장 중요하다고 판단했습니다.

**핵심 관점**:

- 수강 신청 시 수강 인원이 정확히 증가하는가?
- 중복 수강이나 본인 개설 강의 신청이 방지되는가?
- 수강 목록과 강의별 인원 수가 실시간으로 정확히 동기화되는가?

**2. Input 데이터의 정확성 및 유효성 검증**

사용자가 입력하는 모든 데이터에 대해 **정확한 Validation**을 수행하는 것이 중요하다고 생각했습니다.

**핵심 관점**:

- 회원가입 시 모든 필드의 형식이 올바른가?
- 비밀번호 보안 요구사항을 충족하는가?
- 전화번호, 이메일 등 실제 사용 가능한 형식인가?
- 사용자에게 명확한 오류 메시지를 제공하는가?

### 요구사항 정리

- 회원가입
    - input Validation을 만족하지 않을 경우 에러 메세지를 보여준다.
        - ( 요구사항 ) 비밀번호는 영문 대문자, 소문자, 숫자 중 2가지 이상 들어가야 한다.
        - ( 요구사항 ) 비밀번호는 6자리 이상 10자리 이하의 수여야 한다.
        - (추가) input 은 모두 Required 여야 한다.
        - (추가) 전화번호는 010-1234-5678 형식의 문자열을 입력해야한다.
        - (추가) 이메일의 정규식 형식의 문자열을 입력해야한다.
        - (추가) submit 시 → input validation을 만족하지 않을 경우 해당 input.focus 기능 구현
    - (추가) 로그인 여부 판단하기
        - 회원가입 시 쿠키를 생성하여 로그인을 할 수 있는가?
        - 생성한 쿠키(user.id를 기반으로 한)가 없을 경우 회원가입 페이지로 redirect
        - 생성한 쿠키(user.id를 기반으로 한)가 있을 경우 강의목록 페이지로 redirect
        
- 수강하기
    - 필터링 기능
        - ( 요구사항 ) 필터링에 맞는 강의 목록을 볼 수 있다.
        - ( 추가사항 ) 내가 개설하거나 수강한 강의 목록은 볼 수 없다.
    - 선택 기능
        - ( 요구사항 ) 강의 목록을 중복 선택 가능하다.
        - ( 추가사항 ) 선택한 강의의 개수를 확인할 수 있다.
        - ( 추가사항 ) 수강 마감된 강의는 신청할 수 없다.
    - 수강하기
        - ( 요구사항 ) 수강 인원이 제대로 증가 했는가?
        - ( 요구사항 ) 내가 수강한 강의를 또 신청햇을 때 수강 목록에 중복되지 않는가?

- 개설하기
    - 선생님이 아닌 사람이 수강신청을 했을 경우 개설이 되지 않는 모달 기능 구현
    - input에 숫자 단위를 입력할 경우, 단위 포함되도록 설계 (UX)
        - 1000 입력 시 → 1,000 으로 표시
    - (추가) submit 시 → input validation을 만족하지 않을 경우 해당 input.focus 기능 구현

- 내 강의실 (추가기능)
    - 수강생 + 강사: 내가 수강한 강의를 볼 수 있다.
    - 강사: 내가 개설한 강의와 내가 수강한 강의를 볼 수 있다.

## FSD 사용한 이유

- 기능 요구사항 명확하게 관리하고 분리하기 위해서 기능 중심의 설계방법인 [FSD](https://feature-sliced.design/kr/docs)를 적용했습니다. `shared`, `entites`, `features`, `pages`, `app`으로 폴더를 분리, 계층화하였습니다.
- 각 레이어는 제 프로젝트에서 다음과 같은 역할을 맡고 있습니다.

```
app: 애플리케이션 초기화 및 글로벌 설정 (ex.provider)

pages: 말 그대로 pages를 의미

features: 사용자 시나리오와 비즈니스 로직 기능을 담당하는 컴포넌트를 선언

*entities: 공식문서에서는 비즈니스 엔티티를 의미, 저는 서버에서 받은 데이터와 기능들을 프론트엔드의 언어(상태)로 변경, 매핑하는 레이어로 구성했습니다. tanstack-query가 서버 상태를 의미하기 때문에 tanstack-query관련 로직을 주로 작성합니다.

shared: 공용 스타일, 공용 커스텀 훅, 공용 함수, 공용 UI 컴포넌트
```

- 각 레이어는 `하위 레이어`에만 의존할 수 있게 하여 **유지보수성**을 높였습니다.

## 신경써서 구현했던 부분

### useForm 커스텀 훅

> 1 . 구현 배경
> 

프로젝트의 여러 페이지(회원가입, 강의 개설, 수강 신청 등)에서 **폼 입력과 유효성 검증 로직이 반복적으로 필요**했습니다. 각 페이지마다 다음과 같은 공통 기능이 요구되었습니다:

- Input validation (필수값, 정규식, 길이 제한 등)
- 에러 메시지 표시
- Submit 시 유효성 검증 및 포커스 이동
- 폼 데이터 수집 및 제출

또한, 월급쟁이부자들의 도메인을 분석해보았을 때, **회원가입, 강의 개설, 로그인, 강의 리뷰 및 월급쟁이부자들 커뮤니티 등 다양한 폼 처리 기능이 필요**했고, 각각의 폼마다 **서로 다른 유효성 검증 규칙**을 적용해야 했습니다.

이러한 반복되는 로직을 효율적으로 관리하고, **재사용 가능한 폼 관리 솔루션**이 필요하다고 판단하여 `useForm` 커스텀 훅을 구현하게 되었습니다.

> 주요 기능
> 

1. **HTML 기본 Validation 자동 처리**

- `required`, `minLength`, `maxLength`, `pattern` 등 HTML5 기본 속성 자동 검증
- 한글 에러 메시지 자동 매핑

2. **커스텀 Validation 함수 지원**

- 복잡한 비즈니스 로직 검증 가능
- 예: 비밀번호 강도 체크, 전화번호 형식 등

3. **실시간 / 제출 시 검증 선택**

- `isControlled` 옵션으로 실시간 검증 활성화
- Submit 시 자동 검증 및 첫 번째 에러 필드로 포커스 이동

4. **폼 데이터 자동 수집**

- `handleSubmit` 함수로 모든 입력값 자동 수집
- Checkbox, Radio 버튼 처리 지원

---

### 

## 트러블 슈팅

SSR을 구축하기 위해 세션인증 테스트 환경을 직접 구축한 과정을 공유하려고 합니다. 

### 1. MSW + React.js 환경에서의 api 통신

```tsx
'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMocks = async () => {
      if (typeof window !== 'undefined') {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 통과
        });
        setIsReady(true);
      }
    };

    initMocks();
  }, []);

  if (!isReady) {
    return null; // 또는 <LoadingSpinner />
  }

  return <>{children}</>;
}
```

위와 같은 구현 방식의 경우 프로젝트 상단에 해당 코드를 주입하기 때문에 SSR 이 불가능합니다. 

브라우저 내 쿠키 저장 및 api 전송이 가능하지만, SSR이 안된다는 단점이 있습니다.

( + 추가적으로 set-cookie를 활용한 세션인증을 구축한 이유도 빠르게 개발하기 위함이었습니다., msw에서는 set-cookie를 통해서 쿠키를 쉽게 저장, api 통신 시 credential: "include" 속성을 사용하면 api 통신이 가능했기 때문 )

### 2. MSW(Express 서버) + Next.js 환경에서의 api 통신

```tsx
import express from 'express';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from './handlers';

const app = express();
app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(9090);
```

기존의 msw handler 코드를 mswjs/http-middleware를 활용해서 express 로 서버 코드를 띄웠습니다. 이렇게 할 경우 SSR이 되지만 브라우저 내 쿠키 저장 및 인증 관련 기능을 수행할 수 없다는 단점이 있습니다. 

MSW 쿠키에 관련된 공식문서 내용

> 직접 Fetch API의 `Response` 인스턴스를 사용해서 응답 쿠키를 모킹(mocking)하는 것은 문제가 있습니다. 왜냐하면 `Set-Cookie` 헤더는 **금지된 헤더(forbidden header)** 중 하나로, 프로그래밍 방식으로 설정할 수 없기 때문입니다. MSW는 자체 `HttpResponse` 클래스에서 이러한 제약을 우회하여, 응답의 무결성과 보안을 손상시키지 않으면서도 응답 쿠키를 모킹할 수 있게 해줍니다.
> 

### 3. Express 서버 + Next.js 환경에서의 api 통신

1. 서버 cors 설정

```tsx
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authHandlers } from './handlers/auth';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
```

1. 백엔드 서버, 프론트 서버 프록시 설정

```tsx
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:9090/:path*',
      },
    ];
  },
};
```

기존의 MSW Express 서버 방식에서는 쿠키 저장이 되지 않았던 문제를 CORS 설정과 프록시 설정을 통해 해결했습니다.

## 4. 다른 방식은 없었을까? (Next.js API Routes)

### 더 쉬운 방법: Next.js API Routes 활용

Next.js를 활용해 가장 쉽게 개발할 수 있는 방법은 **Next.js의 API Routes 기능**을 활용하는 것입니다.

typescript

`*// app/api/auth/login/route.ts*`

```tsx

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

*// Mock 데이터베이스*
const mockUsers = [
  { 
    id: '1', 
    email: 'user@example.com', 
    password: '$2a$10$H6pXZpZ...' *// 해시된 비밀번호*
  }
];

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  *// 사용자 인증*
  const user = mockUsers.find(u => u.email === email);
  if (!user || !await compare(password, user.password)) {
    return NextResponse.json(
      { error: '인증 실패' },
      { status: 401 }
    );
  }
  
  *// JWT 생성*
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  *// HttpOnly 쿠키 설정*
  const response = NextResponse.json({ message: '로그인 성공' });
  response.cookies.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, *// 7일*
    path: '/'
  });

  return response;
}
```

### 이 방식의 장점

1. **별도 서버 불필요**: Express 서버를 띄울 필요 없이 Next.js 하나로 해결
2. **CORS 설정 불필요**: 같은 도메인이므로 CORS 문제 없음
3. **프록시 설정 불필요**: `/api` 경로가 자동으로 라우팅됨
4. **간단한 배포**: Next.js 프로젝트만 배포하면 끝

### Mock 데이터를 Next.js에서 관리했다면

typescript

`*// lib/mock-db/users.ts*`

```tsx

export const mockUsers = [
  { id: '1', email: 'user@example.com', password: '...' }
];

*// lib/mock-db/courses.ts*
export const mockCourses = [
  { id: '1', title: 'Next.js 마스터하기', ... }
];
```

이렇게 Next.js 내부에서 mock 데이터를 관리했다면 훨씬 더 간단하게 개발할 수 있었을 것입니다.

---

## 5. 그럼에도 불구하고 백엔드 서버를 구축한 이유

### 기존 MSW 핸들러 재사용

프로젝트 초기에는 **MSW + React 환경**에서 개발을 시작했습니다. 이미 작성된 MSW 핸들러 코드가 있었고, 이를 최대한 활용하고 싶었습니다.

typescript

`*// 기존에 작성한 MSW 핸들러*`

```tsx
export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ user: { ... } });
  }),
  http.get('/api/courses', () => {
    return HttpResponse.json(mockCourses);
  }),
  *// ... 수십 개의 핸들러*
];
```

만약 Next.js API Routes 방식으로 전환한다면:

- ❌ 모든 핸들러를 Next.js 구조에 맞게 재작성 필요
- ❌ `HttpResponse` → `NextResponse`로 변경
- ❌ 라우트 파일 구조를 새로 만들어야 함
- ❌ 추가적인 보일러플레이트 코드 작성

### 개발 시간 절약

```tsx

const app = express();

app.post('/api/user', (req, res) => {
  //...
});

app.listen(9090);
```

기존 핸들러 구조를 참고할 수 있어서:

- ✅ Cursor AI로 30분 만에 서버 구축 및 API 코드 작성 완료
- ✅ MSW 핸들러 로직을 Express로 빠르게 전환
- ✅ 실전 백엔드 환경(CORS, 쿠키, 프록시)을 직접 경험

### 아쉬웠던 점

 이번 과제를 진행하며 **확장성과 실전 경험**을 우선시하다 보니, Next.js API Routes라는 간단하고 효율적인 방법 대신 별도의 Express 서버를 구축하는 방향을 선택했습니다. 돌이켜보니 **적정 기술**보다는 **더 복잡한 기술**을 선택한 것 같아 아쉽습니다. 하지만 직접 백엔드 서버를 구축하고 CORS, 쿠키 전송, 프록시 설정 등을 
경험하면서 `credentials`, `SameSite`, `Secure` 같은 쿠키 속성들을 깊이 있게 학습하게 된 계기가 되었습니다. **"복잡한 길로 돌아갔지만, 그 과정에서 더 많이 배웠다"**는 점에서 의미 있는 경험이었다고 생각합니다.

## 추가적으로 구현하고 싶었던 내용

### 무한스크롤 최적화

> 기존 observer scroller의 단점
> 

1. DOM 노드 수 증가

데이터가 추가될수록 화면에 렌더링되는 노드가 기하급수적으로 늘어날 수 있습니다. 각 강의 카드는 여러 DOM 요소로 구성되었기 때문에, 1,000개의 상품이면 실제로는 약 10,000개 이상의 DOM 노드가 생성될수 있습니다. 

2. 메모리 과다 사용

모든 강의 데이터와 이미지를 메모리에 계속 들고 있어야 했습니다. 특히 강의 이미지가 있을 경우 이미지 메모리 사용량이 크기 때문에, 중저가 모바일 기기에서는 렌더링 실패나 앱 크래시 현상이 발생할 수 있습니다.

3. 스크롤 퍼포먼스 저하

가장 치명적인 문제는 스크롤 성능 저하였습니다. 스크롤이 매끄럽지 않고 중간중간 멈췄으며, JavaScript 계산 때문에 렌더링 블로킹이 발생했습니다. FPS(Frames Per Second)가 30 이하로 떨어지는 경우가 많았고, 이는 유저 경험을 종종 해치는 수준이었습니다.

> 해결방법
> 

windowing 기법을 활용, 화면에 보여지는 요소만 렌더링 하도록 구현했습니다. 이를 통해 dom에서는 화면에서 보여지는 강의 상품만 dom에서 그려지도록 개선했습니다.

> 결과

![2025-10-271 29 38-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/52b09b92-cd5c-4957-8266-8fc62fdf87f6)

코드: https://github.com/turtle601/wulboo-assignment/tree/infinity-optimize


### 그 외

월부 과제를 하기 위해 월급쟁이부자들 강의 플랫폼을 살펴보다가 이슈를 발견하여 공유드리려고 합니다.

![2025-10-271 48 25-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/6ae97f71-85e2-4482-ab2c-be6c0a8086a4)


> 문제 상황
> 
- 좋아요를 누르거나 취소할 때 카운트가 +2/-2씩 변경되는 중복 업데이트 현상 발생

> 원인 분석
> 
1. **낙관적 업데이트(Optimistic Update)** 실행으로 UI 즉시 반영 (+1)
2. 서버 POST 요청 성공 후 **응답 데이터로 재업데이트** (+1)
3. 결과적으로 **총 +2 증가**하는 중복 적용 문제

> 해결책
> 

좋아요 시 낙관적 업데이트 구현 → 중복 요청 우려하여 debounce를 구현합니다. → debounce가 끝난 후 요청이 성공했을 경우 상태 업데이트 x, 요청이 실패했을 경우 상태를 이전 상태로 수정, 하는 방향으로 구현을 할 것같다

### 앞으로

 이번 프로젝트를 진행하며 월급쟁이부자들의 도메인을 깊이 이해할 수 있었습니다. 단순히 "강의 플랫폼"이 아닌, 금융 교육을 통해 사람들의 경제적 자유를 돕는 서비스라는 본질을 파악하면서, **기술은 도메인을 이해할 때 비로소 가치를 발휘한다**는 것을 깨달았습니다.

앞으로 월급쟁이부자들에 입사하게 된다면, 이러한 **도메인에 대한 깊은 이해를 바탕으로 프로덕트를 지속적으로 개선**하고, 사용자의 페인 포인트를 발견하고 해결하는 **능동적인 개발자**로 성장하겠습니다. 플랫폼을 유심히 관찰하고 디버깅하며, **더 나은 사용자 경험을 만들어가는 데 기여**하고 싶습니다.
