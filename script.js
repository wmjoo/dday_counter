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
const customSelectorWrapper = document.getElementById('custom-date-selector');
const yearSelector = document.getElementById('year-selector');
const monthSelector = document.getElementById('month-selector');
const daySelector = document.getElementById('day-selector');
const hourSelector = document.getElementById('hour-selector');
const minuteSelector = document.getElementById('minute-selector');

// 이벤트 선택 시 처리
eventSelector.addEventListener('change', function() {
    if (this.value === 'custom') {
        customSelectorWrapper.style.display = 'flex';
        setupCustomDateSelector();
    } else {
        customSelectorWrapper.style.display = 'none';
        const selectedTimestamp = this.value;
        targetDate = new Date(selectedTimestamp);
        updateEventDate();
        updateTimer();
    }
});

// 사용자 지정 날짜 선택기 설정
function setupCustomDateSelector() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // 연도 선택 (현재 연도부터 10년 후까지)
    yearSelector.innerHTML = '';
    for (let year = currentYear; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelector.appendChild(option);
    }
    
    // 월 선택
    monthSelector.innerHTML = '';
    const startMonth = currentYear === parseInt(yearSelector.value) ? currentMonth : 1;
    for (let month = startMonth; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        if (month === startMonth) option.selected = true;
        monthSelector.appendChild(option);
    }
    
    updateDaySelector();
    updateHourSelector();
    updateMinuteSelector();
    
    // 이벤트 리스너 추가
    yearSelector.addEventListener('change', function() {
        updateMonthSelector();
        updateDaySelector();
        updateHourSelector();
        updateMinuteSelector();
        updateCustomDate();
    });
    
    monthSelector.addEventListener('change', function() {
        updateDaySelector();
        updateHourSelector();
        updateMinuteSelector();
        updateCustomDate();
    });
    
    daySelector.addEventListener('change', function() {
        updateHourSelector();
        updateMinuteSelector();
        updateCustomDate();
    });
    
    hourSelector.addEventListener('change', function() {
        updateMinuteSelector();
        updateCustomDate();
    });
    
    minuteSelector.addEventListener('change', function() {
        updateCustomDate();
    });
    
    // 초기 날짜 설정
    updateCustomDate();
}

// 월 선택기 업데이트
function updateMonthSelector() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const selectedYear = parseInt(yearSelector.value);
    
    monthSelector.innerHTML = '';
    const startMonth = selectedYear === currentYear ? currentMonth : 1;
    for (let month = startMonth; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        if (month === startMonth) option.selected = true;
        monthSelector.appendChild(option);
    }
}

// 일 선택기 업데이트
function updateDaySelector() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    const selectedYear = parseInt(yearSelector.value);
    const selectedMonth = parseInt(monthSelector.value);
    
    // 해당 월의 마지막 날짜 계산
    const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
    
    daySelector.innerHTML = '';
    const startDay = (selectedYear === currentYear && selectedMonth === currentMonth) ? currentDay : 1;
    for (let day = startDay; day <= lastDay; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        if (day === startDay) option.selected = true;
        daySelector.appendChild(option);
    }
}

// 시 선택기 업데이트
function updateHourSelector() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    const currentHour = now.getHours();
    const selectedYear = parseInt(yearSelector.value);
    const selectedMonth = parseInt(monthSelector.value);
    const selectedDay = parseInt(daySelector.value);
    
    hourSelector.innerHTML = '';
    const isToday = (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay === currentDay);
    const startHour = isToday ? Math.min(currentHour + 1, 23) : 0;
    
    if (isToday && currentHour >= 23) {
        // 오늘이고 23시 이후면 선택 불가 (다음 날로 이동해야 함)
        hourSelector.innerHTML = '<option value="">선택 불가</option>';
        return;
    }
    
    for (let hour = startHour; hour < 24; hour++) {
        const option = document.createElement('option');
        option.value = hour;
        option.textContent = String(hour).padStart(2, '0');
        if (hour === startHour) option.selected = true;
        hourSelector.appendChild(option);
    }
}

// 분 선택기 업데이트
function updateMinuteSelector() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const selectedYear = parseInt(yearSelector.value);
    const selectedMonth = parseInt(monthSelector.value);
    const selectedDay = parseInt(daySelector.value);
    const selectedHour = parseInt(hourSelector.value);
    
    minuteSelector.innerHTML = '';
    const isToday = (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay === currentDay);
    const isCurrentHour = (selectedHour === currentHour);
    const startMinute = (isToday && isCurrentHour) ? currentMinute + 1 : 0;
    
    for (let minute = startMinute; minute < 60; minute++) {
        const option = document.createElement('option');
        option.value = minute;
        option.textContent = String(minute).padStart(2, '0');
        if (minute === startMinute) option.selected = true;
        minuteSelector.appendChild(option);
    }
}

// 사용자 지정 날짜 업데이트
function updateCustomDate() {
    const year = parseInt(yearSelector.value);
    const month = parseInt(monthSelector.value) - 1; // JavaScript 월은 0부터 시작
    const day = parseInt(daySelector.value);
    const hour = parseInt(hourSelector.value);
    const minute = parseInt(minuteSelector.value);
    
    // KST 시간대로 설정 (로컬 시간으로 생성)
    targetDate = new Date(year, month, day, hour, minute, 0);
    
    updateEventDate();
    updateTimer();
}

// 요일 배열
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// 현재 시간 업데이트 함수
function updateCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dayOfWeek = weekDays[now.getDay()];
    
    // 포맷: YYYY.MM.DD (DAY) HH:MM
    currentTimeEl.textContent = `${year}.${month}.${day} (${dayOfWeek}) ${hours}:${minutes}`;
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
    const dayOfWeek = weekDays[targetDate.getDay()];
    
    // 포맷: YYYY.MM.DD (DAY) HH:MM
    eventDateEl.textContent = `${year}.${month}.${day} (${dayOfWeek}) ${hours}:${minutes}`;
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

