# D-Day 카운터

남은 시간을 일, 시간, 분, 초, 밀리초로 표시하는 심플한 타이머 웹페이지입니다.

## 기능

- 드롭다운으로 여러 이벤트 선택 가능
- 첫 번째 이벤트가 기본값으로 설정됨
- 실시간으로 남은 시간 표시 (일, 시간, 분, 초, 밀리초)
- KST 시간대 지원

## GitHub Pages 배포 방법

1. 이 저장소를 GitHub에 푸시합니다:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. GitHub 저장소 설정에서:
   - Settings → Pages
   - Source를 "Deploy from a branch"로 선택
   - Branch를 "main"으로, 폴더를 "/ (root)"로 선택
   - Save 클릭

3. 몇 분 후 `https://<your-username>.github.io/dday_counter/`에서 확인할 수 있습니다.

## 커스터마이징

`script.js` 파일의 `events` 객체에 새로운 이벤트를 추가하거나 수정할 수 있습니다:

```javascript
const events = {
    '2026-03-28T14:00:00+09:00': '2026 KBO 프로야구 개막',
    // 새로운 이벤트 추가
    'YYYY-MM-DDTHH:mm:ss+09:00': '이벤트 이름'
};
```

`index.html`의 `<select>` 요소에도 동일한 타임스탬프를 추가해야 합니다.

