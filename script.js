// 이벤트 정보 (타임스탬프와 이름)
const events = {
    '2026-03-28T14:00:00+09:00': '2026 KBO 프로야구 개막',
    '2025-12-31T23:59:59+09:00': '2025년 마지막 날',
    '2026-01-01T00:00:00+09:00': '2026년 새해'
};

let targetDate = null;
let timerInterval = null;

// DOM 요소 가져오기
const eventSelector = document.getElementById('event-selector');
const eventName = document.getElementById('event-name');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');

// 이벤트 선택 시 처리
eventSelector.addEventListener('change', function() {
    const selectedTimestamp = this.value;
    targetDate = new Date(selectedTimestamp);
    eventName.textContent = events[selectedTimestamp];
    updateTimer();
});

// 타이머 업데이트 함수
function updateTimer() {
    if (!targetDate) {
        const defaultTimestamp = eventSelector.value;
        targetDate = new Date(defaultTimestamp);
        eventName.textContent = events[defaultTimestamp];
    }

    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        // 시간이 지났을 경우
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minutesEl.textContent = '0';
        secondsEl.textContent = '0';
        millisecondsEl.textContent = '0';
        return;
    }

    // 밀리초 계산
    const milliseconds = difference % 1000;
    const totalSeconds = Math.floor(difference / 1000);
    
    // 초 계산
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
    millisecondsEl.textContent = Math.floor(milliseconds / 10).toString().padStart(2, '0');
}

// 초기화
function init() {
    // 기본값 설정 (첫 번째 옵션)
    const defaultTimestamp = eventSelector.value;
    targetDate = new Date(defaultTimestamp);
    eventName.textContent = events[defaultTimestamp];
    
    // 타이머 시작
    updateTimer();
    timerInterval = setInterval(updateTimer, 10); // 10ms마다 업데이트 (밀리초 표시)
}

// 페이지 로드 시 초기화
init();

