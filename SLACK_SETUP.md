# Slack 연동 설정 가이드

## 1. Slack Incoming Webhook 생성

1. [Slack API 웹사이트](https://api.slack.com/apps)에 접속
2. "Create New App" 클릭
3. "From scratch" 선택
4. App 이름과 워크스페이스를 선택하고 "Create App" 클릭
5. 왼쪽 메뉴에서 "Incoming Webhooks" 클릭
6. "Activate Incoming Webhooks" 토글을 ON으로 설정
7. "Add New Webhook to Workspace" 클릭
8. 알림을 받을 채널을 선택하고 "Allow" 클릭
9. 생성된 Webhook URL을 복사 (형식: `https://hooks.slack.com/services/...`)

## 2. 환경 변수 설정

### 로컬 개발 환경

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 배포 환경 (Vercel)

1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables로 이동
3. 다음 환경 변수를 추가:
   - **Name**: `SLACK_WEBHOOK_URL`
   - **Value**: 위에서 복사한 Webhook URL
   - **Environment**: Production, Preview, Development 모두 선택
4. "Save" 클릭

## 3. 테스트

폼을 제출하면 선택한 Slack 채널에 다음과 같은 알림이 전송됩니다:

- 🎉 새로운 지원자 등록 헤더
- 이름, 연락처, 지역, 유입 경로 정보
- 등록 시간

## 문제 해결

- **알림이 오지 않는 경우**:
  - `.env.local` 파일이 프로젝트 루트에 있는지 확인
  - 환경 변수 이름이 정확한지 확인 (`SLACK_WEBHOOK_URL`)
  - Webhook URL이 올바른지 확인
  - Vercel에 배포한 경우 환경 변수를 추가했는지 확인하고 재배포

- **에러가 발생하는 경우**:
  - 브라우저 콘솔에서 에러 메시지 확인
  - Vercel 로그에서 API Route 에러 확인

