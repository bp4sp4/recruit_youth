# 지원자 정보 전달 가이드

## 전달 기능 사용 방법

### 1. 기본 전달 프로세스

1. **전달 대상 선택**: 각 지원자 행의 "전달 상태" 컬럼에서 드롭다운을 열어 전달 대상을 선택합니다.
2. **전달하기 버튼 클릭**: 선택한 대상으로 전달하기 버튼을 클릭합니다.
3. **전달 완료 확인**: 전달이 완료되면 "✓ 전달완료" 배지가 표시되고, 전달 대상과 시간이 기록됩니다.

### 2. 효율적인 전달 방법

#### 방법 1: 정보 복사 기능 사용 (권장)

1. **복사 버튼 클릭**: 각 지원자 행의 "관리" 컬럼에 있는 "복사" 버튼을 클릭합니다.
2. **클립보드에 복사됨**: 지원자 정보가 다음 형식으로 복사됩니다:
   ```
   이름: 홍길동
   연락처: 010-1234-5678
   지역: 서울
   유입 경로: 네이버 파워링크
   신청일시: 2025. 12. 19. 오후 2:30
   선택 항목: 항목1, 항목2
   ```
3. **메시지 앱에 붙여넣기**: 카카오톡, 슬랙, 이메일 등 원하는 채널에 붙여넣기합니다.

#### 방법 2: 전달 대상별 필터링

- 전달 완료된 항목은 "✓ 전달완료" 배지로 표시되어 중복 전달을 방지합니다.
- 전달 대상과 시간이 기록되어 추적이 가능합니다.

#### 방법 3: 일괄 전달 (향후 개선 가능)

현재는 개별 전달만 지원하지만, 향후 여러 지원자를 한 번에 선택하여 일괄 전달하는 기능을 추가할 수 있습니다.

### 3. 전달 대상 설정

기본 전달 대상 옵션:
- 담당자 A
- 담당자 B
- 담당자 C
- 기타

**전달 대상 수정 방법**: `components/admin/AdminDashboardClient.tsx` 파일의 `deliveryOptions` 배열을 수정하세요.

```typescript
const deliveryOptions = [
  '담당자 A',
  '담당자 B',
  '담당자 C',
  '기타',
]
```

### 4. 데이터베이스 마이그레이션

전달 기능을 사용하려면 데이터베이스에 다음 필드가 추가되어야 합니다:

```sql
ALTER TABLE consultation_applications
ADD COLUMN delivered_to TEXT,
ADD COLUMN delivered_at TIMESTAMP WITH TIME ZONE;
```

마이그레이션 파일: `supabase/migrations/002_add_delivery_tracking.sql`

**마이그레이션 실행 방법**:
1. Supabase 대시보드에서 SQL Editor 열기
2. `002_add_delivery_tracking.sql` 파일 내용 복사
3. SQL Editor에 붙여넣고 실행

### 5. 권한 설정

Supabase RLS (Row Level Security) 정책에서 UPDATE 권한이 필요합니다:

```sql
-- Authenticated users can update applications
CREATE POLICY "Authenticated users can update applications"
  ON consultation_applications
  FOR UPDATE
  USING (auth.role() = 'authenticated');
```

### 6. 팁

- **빠른 전달**: 복사 버튼을 사용하면 정보를 빠르게 전달할 수 있습니다.
- **중복 방지**: 전달 완료 표시를 확인하여 이미 전달한 지원자를 다시 전달하지 않도록 주의하세요.
- **추적 가능**: 전달 대상과 시간이 기록되어 나중에 누구에게 언제 전달했는지 확인할 수 있습니다.

