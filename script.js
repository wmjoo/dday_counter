// 이벤트 정보 (타임스탬프와 이름)
const events = {
    '2026-03-28T14:00:00+09:00': '2026 KBO 프로야구 개막',
    '2027-01-01T00:00:00+09:00': '2027년 새해'
};

let targetDate = null;
let timerInterval = null;

// DOM 요소 가져오기
const eventSelector = document.getElementById('event-selector');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const eventDateEl = document.getElementById('event-date');
const currentTimeEl = document.getElementById('current-time');

// 이벤트 선택 시 처리
eventSelector.addEventListener('change', function() {
    const selectedTimestamp = this.value;
    targetDate = new Date(selectedTimestamp);
    updateEventDate();
    updateTimer();
});

// 현재 시간 업데이트 함수
function updateCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // Back to the Future 스타일 포맷: YYYY.MM.DD HH:MM (초 제거)
    currentTimeEl.textContent = `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 이벤트 일자 업데이트 함수
function updateEventDate() {
    if (!targetDate) {
        const defaultTimestamp = eventSelector.value;
        targetDate = new Date(defaultTimestamp);
    }
    
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const hours = String(targetDate.getHours()).padStart(2, '0');
    const minutes = String(targetDate.getMinutes()).padStart(2, '0');
    
    // Back to the Future 스타일 포맷: YYYY.MM.DD HH:MM (초 제거)
    eventDateEl.textContent = `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 타이머 업데이트 함수
function updateTimer() {
    if (!targetDate) {
        const defaultTimestamp = eventSelector.value;
        targetDate = new Date(defaultTimestamp);
        updateEventDate();
    }

    const now = new Date();
    const difference = targetDate - now;

    // 현재 시간 업데이트
    updateCurrentTime();

    if (difference <= 0) {
        // 시간이 지났을 경우
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    // 초 계산
    const totalSeconds = Math.floor(difference / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    
    // 분 계산
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    
    // 시간 계산
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    // 화면 업데이트
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// 초기화
function init() {
    // 기본값 설정 (첫 번째 옵션)
    const defaultTimestamp = eventSelector.value;
    targetDate = new Date(defaultTimestamp);
    updateEventDate();
    
    // 타이머 시작
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000); // 1초마다 업데이트
}

// 페이지 로드 시 초기화
init();

