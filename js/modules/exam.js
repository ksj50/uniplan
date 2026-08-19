/**
 * Module 3: Exam Period Service (시험 기간 서비스)
 */
const examModule = {
  // Exam subjects list
  subjects: [
    {
      id: 'sub1',
      name: '자료구조 및 알고리즘',
      type: '확정 일정',
      examDate: '2026-08-17 09:00', // First exam date
      examDurationMinutes: 120,
      scope: 'Chapter 1~8 (트리, 그래프, 정렬, 다이나믹 프로그래밍)',
      isExamActive: false, // Suppress alert during active exam
      topics: [
        { id: 't1', title: '이진 탐색 트리 (BST) 및 AVL 트리 회전', reviews: 3 },
        { id: 't2', title: '다익스트라 & 최단 경로 알고리즘', reviews: 2 },
        { id: 't3', title: '동적 계획법 (DP) 배낭 문제', reviews: 1 },
        { id: 't4', title: '퀵 정렬 & 병합 정렬 시간복잡도 증명', reviews: 0 }
      ]
    },
    {
      id: 'sub2',
      name: '운영체제',
      type: '확정 일정',
      examDate: '2026-08-18 13:00',
      examDurationMinutes: 90,
      scope: 'Chapter 5~10 (프로세스 동기화, 데드락, 가상 메모리)',
      isExamActive: false,
      topics: [
        { id: 't5', title: '세마포어 & 뮤텍스 생산자-소비자 문제', reviews: 2 },
        { id: 't6', title: '교착상태 4가지 필요조건 및 은행원 알고리즘', reviews: 1 },
        { id: 't7', title: '페이지 교체 알고리즘 (LRU, LFU, FIFO)', reviews: 2 }
      ]
    },
    {
      id: 'sub3',
      name: '웹 프론트엔드 실습',
      type: '예상 일정',
      examDate: '2026-08-19 14:00',
      examDurationMinutes: 120,
      scope: 'Vanilla JS, CSS Glassmorphism, SPA 라우팅 구현',
      isExamActive: false,
      topics: [
        { id: 't8', title: 'ES6+ Promise 및 Async/Await 비동기 처리', reviews: 1 },
        { id: 't9', title: 'DOM 이벤트 버블링 & 캡처링 방지', reviews: 1 }
      ]
    }
  ],

  currentViewMode: 'calendar',
  calendarYear: 2026,
  calendarMonth: 7, // August (0-indexed)

  koreanHolidays: {
    '2026-01-01': { name: '신정', isRed: true },
    '2026-02-16': { name: '설날연휴', isRed: true },
    '2026-02-17': { name: '설날', isRed: true },
    '2026-02-18': { name: '설날연휴', isRed: true },
    '2026-03-01': { name: '3·1절', isRed: true },
    '2026-05-05': { name: '어린이날', isRed: true },
    '2026-05-24': { name: '부처님오신날', isRed: true },
    '2026-06-06': { name: '현충일', isRed: true },
    '2026-08-15': { name: '광복절', isRed: true },
    '2026-09-24': { name: '추석연휴', isRed: true },
    '2026-09-25': { name: '추석', isRed: true },
    '2026-09-26': { name: '추석연휴', isRed: true },
    '2026-10-03': { name: '개천절', isRed: true },
    '2026-10-09': { name: '한글날', isRed: true },
    '2026-12-25': { name: '크리스마스', isRed: true }
  },

  uploadedPhotos: [],

  init() {
    this.renderFirstExamHero();
    this.renderExamCalendar();
    this.renderSubjectList();
    this.populateSubjectSelect();
    this.renderReviewTopics();
    this.startCountdownTimer();
    this.setupButtonListeners();
  },

  setupButtonListeners() {
    const examBtn = document.getElementById('addExamBtn');
    if (examBtn) examBtn.onclick = () => app.openModal('addExamModal');

    const noteBtn = document.getElementById('addNoteBtn');
    if (noteBtn) noteBtn.onclick = () => app.openModal('addNoteModal');
  },

  format12to24(ampm, hVal, mVal) {
    let h = parseInt(hVal) || 9;
    let m = parseInt(mVal) || 0;
    if (h < 1) h = 1;
    if (h > 12) h = 12;
    if (m < 0) m = 0;
    if (m > 59) m = 59;

    if (ampm === '오후' && h < 12) h += 12;
    if (ampm === '오전' && h === 12) h = 0;

    return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
  },

  saveNewExam() {
    const subject = document.getElementById('newExamSubject').value.trim();
    const dateVal = document.getElementById('newExamDate').value;
    const ampm = document.getElementById('newExamAmpm').value;
    const hourVal = document.getElementById('newExamHour').value;
    const minVal = document.getElementById('newExamMin').value;
    const status = document.getElementById('newExamStatus').value;

    if (!subject) {
      app.showToast('시험 과목명을 입력해 주세요!', 'warning');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const dateStr = dateVal || todayStr;
    const timeStr = this.format12to24(ampm, hourVal, minVal);
    const examDate = `${dateStr} ${timeStr}`;

    this.subjects.push({
      id: 'sub' + Date.now(),
      name: subject,
      type: status,
      examDate: examDate,
      examDurationMinutes: 120,
      scope: '전체 범위 요약',
      isExamActive: false,
      topics: [
        { id: 't' + Date.now(), title: `${subject} 핵심 개념 검토`, reviews: 0 }
      ]
    });

    this.renderFirstExamHero();
    this.renderExamCalendar();
    this.renderSubjectList();
    this.populateSubjectSelect();
    app.closeModal('addExamModal');
    app.showToast(`시험 일정 [${subject}] (${examDate} ${status})가 성공적으로 등록되었습니다!`, 'success');
  },

  async saveNewNote() {
    const titleInput = document.getElementById('newNoteTitle');
    const contentInput = document.getElementById('newNoteContent');
    const photoInput = document.getElementById('notePhotoInput');

    const title = titleInput ? titleInput.value.trim() : '';
    const content = contentInput ? contentInput.value.trim() : '';
    const files = (photoInput && photoInput.files) ? Array.from(photoInput.files) : [];

    if (!title && files.length === 0 && !content) {
      app.showToast('노트 제목 또는 사진/메모를 입력해 주세요!', 'warning');
      return;
    }

    const finalTitle = title || '시험 개념 정리 노트';
    app.closeModal('addNoteModal');

    if (files.length > 0) {
      this.uploadedPhotos = [...this.uploadedPhotos, ...files];
      const pdfTitleEl = document.getElementById('pdfNoteTitle');
      if (pdfTitleEl) pdfTitleEl.value = finalTitle;
      this.renderPhotoPreviews();
      await this.generatePdfFromPhotos(finalTitle, content);
    } else {
      await this.generatePdfFromTextOnly(finalTitle, content);
    }
  },

  renderFirstExamHero() {
    // First exam sorting
    const sorted = [...this.subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate));
    const first = sorted[0];

    const titleEl = document.getElementById('firstExamTitle');
    const ddayEl = document.getElementById('firstExamDDay');

    if (titleEl && ddayEl && first) {
      titleEl.innerText = `${first.name} (${first.type})`;
      ddayEl.innerText = this.formatCountdown(first.examDate);
    }

    const dashboardEl = document.getElementById('dashboardExamCountdown');
    if (dashboardEl && first) {
      dashboardEl.innerHTML = `
        <div style="text-align:center; padding: 0.5rem 0;">
          <span class="badge badge-danger" style="margin-bottom:0.4rem; font-size:0.8rem;">D-Day D-3</span>
          <h4 style="font-size:1.2rem; font-weight:700;">${first.name}</h4>
          <div style="font-size:1.6rem; font-weight:800; color:#FCA5A5; font-family:'Outfit',sans-serif; margin-top:0.3rem;">
            ${this.formatCountdown(first.examDate)}
          </div>
          <span class="text-xs text-muted">알림: 3일/1일/15시간/3시간/1시간전 자동 전송</span>
        </div>
      `;
    }
  },

  renderSubjectList() {
    const container = document.getElementById('examSubjectList');
    if (!container) return;

    container.innerHTML = this.subjects.map(s => {
      const countdownStr = this.formatCountdown(s.examDate);
      return `
        <div class="activity-card mb-3" style="border-left: 4px solid ${s.type === '확정 일정' ? 'var(--primary)' : 'var(--warning)'};">
          <div class="activity-main">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div class="title" style="font-size:1rem;">${s.name}</div>
              <span class="badge ${s.type === '확정 일정' ? 'badge-primary' : 'badge-warning'}">${s.type}</span>
            </div>
            <div class="summary" style="margin:0.3rem 0;">시험 일시: <strong>${s.examDate}</strong> (소요 ${s.examDurationMinutes}분)</div>
            <div class="text-xs text-muted">범위: ${s.scope}</div>
            <div class="activity-meta mt-2">
              <span class="badge badge-accent">남은 시간: ${countdownStr}</span>
              ${s.type === '예상 일정' ? `
                <button class="btn btn-xs btn-outline" onclick="examModule.confirmSchedule('${s.id}')">확정 일정으로 변경</button>
              ` : '<span class="text-xs text-muted"><i data-lucide="check"></i> 일정 확정 완료</span>'}
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  setExamViewMode(mode) {
    this.currentViewMode = mode;
    const btnCal = document.getElementById('btnExamViewCalendar');
    const btnList = document.getElementById('btnExamViewList');
    const calContainer = document.getElementById('examCalendarViewContainer');
    const listContainer = document.getElementById('examListViewContainer');

    if (btnCal) {
      btnCal.className = mode === 'calendar' ? 'btn btn-xs btn-primary active' : 'btn btn-xs btn-outline';
      btnCal.style.border = mode === 'calendar' ? '' : 'none';
    }
    if (btnList) {
      btnList.className = mode === 'list' ? 'btn btn-xs btn-primary active' : 'btn btn-xs btn-outline';
      btnList.style.border = mode === 'list' ? '' : 'none';
    }

    if (calContainer) calContainer.classList.toggle('hidden', mode !== 'calendar');
    if (listContainer) listContainer.classList.toggle('hidden', mode !== 'list');

    if (mode === 'calendar') {
      this.renderExamCalendar();
    } else {
      this.renderSubjectList();
    }
    if (window.lucide) lucide.createIcons();
  },

  changeExamCalendarMonth(delta) {
    this.calendarMonth += delta;
    if (this.calendarMonth < 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    } else if (this.calendarMonth > 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    }
    this.renderExamCalendar();
  },

  goToTodayExamCalendar() {
    this.calendarYear = 2026;
    this.calendarMonth = 7; // August
    this.renderExamCalendar();
  },

  renderExamCalendar() {
    const gridBody = document.getElementById('examCalendarGridBody');
    const titleEl = document.getElementById('examCalendarMonthYear');
    if (!gridBody) return;

    const year = this.calendarYear;
    const month = this.calendarMonth; // 0-indexed

    if (titleEl) {
      titleEl.innerText = `${year}년 ${month + 1}월`;
    }

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon...
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let html = '';

    // 1. Previous Month Spillover Days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDay = prevLastDate - i;
      const prevDateObj = new Date(year, month - 1, prevDay);
      const prevDayOfWeek = prevDateObj.getDay();
      const numClass = prevDayOfWeek === 0 ? 'sun' : prevDayOfWeek === 6 ? 'sat' : '';
      const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(prevDay).padStart(2, '0')}`;
      const holiday = this.koreanHolidays[dateKey];

      html += `
        <div class="calendar-day-cell other-month">
          <div class="calendar-cell-top">
            <span class="calendar-day-num ${numClass}">${prevDay}</span>
            ${holiday ? `<span class="calendar-holiday-label ${holiday.isRed ? 'red' : ''}">${holiday.name}</span>` : ''}
          </div>
        </div>
      `;
    }

    // 2. Current Month Days
    for (let day = 1; day <= lastDate; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const currDateObj = new Date(year, month, day);
      const dayOfWeek = currDateObj.getDay();
      const numClass = dayOfWeek === 0 ? 'sun' : dayOfWeek === 6 ? 'sat' : '';
      const holiday = this.koreanHolidays[dateKey];

      // Simulated Today highlight (2026-08-19)
      const isToday = (year === 2026 && month === 7 && day === 19);

      // Find exams on this day
      const dayExams = this.subjects.filter(s => {
        if (!s.examDate) return false;
        return s.examDate.startsWith(dateKey);
      });

      let examsHtml = dayExams.map(s => {
        const timeStr = s.examDate.split(' ')[1] || '';
        const isConfirmed = s.type === '확정 일정';
        const typeClass = isConfirmed ? 'type-confirmed' : 'type-estimated';
        const statusLabel = isConfirmed ? '확정' : '예상';

        return `
          <div class="exam-cal-badge ${typeClass}" 
               title="${s.name} (${s.type}) - ${s.examDate}\n시험 범위: ${s.scope}"
               onclick="examModule.viewExamDetail('${s.id}')">
            <span>⏰ ${timeStr}</span>
            <span style="font-weight:700;">${s.name}</span>
            <span style="font-size:0.6rem; opacity:0.85;">(${statusLabel})</span>
          </div>
        `;
      }).join('');

      html += `
        <div class="calendar-day-cell ${isToday ? 'today' : ''}" 
             onclick="if(event.target === this) examModule.openAddExamForDate('${dateKey}')">
          <div class="calendar-cell-top">
            <span class="calendar-day-num ${numClass}">${day}</span>
            ${holiday ? `<span class="calendar-holiday-label ${holiday.isRed ? 'red' : ''}">${holiday.name}</span>` : ''}
          </div>
          <div class="calendar-events-wrap">
            ${examsHtml}
          </div>
        </div>
      `;
    }

    // 3. Next Month Spillover Days
    const totalCellsFilled = firstDayIndex + lastDate;
    const remainingCells = (7 - (totalCellsFilled % 7)) % 7;
    for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
      const nextDateObj = new Date(year, month + 1, nextDay);
      const nextDayOfWeek = nextDateObj.getDay();
      const numClass = nextDayOfWeek === 0 ? 'sun' : nextDayOfWeek === 6 ? 'sat' : '';
      const dateKey = `${year}-${String(month + 2).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;
      const holiday = this.koreanHolidays[dateKey];

      html += `
        <div class="calendar-day-cell other-month">
          <div class="calendar-cell-top">
            <span class="calendar-day-num ${numClass}">${nextDay}</span>
            ${holiday ? `<span class="calendar-holiday-label ${holiday.isRed ? 'red' : ''}">${holiday.name}</span>` : ''}
          </div>
        </div>
      `;
    }

    gridBody.innerHTML = html;
  },

  viewExamDetail(subId) {
    const sub = this.subjects.find(s => s.id === subId);
    if (!sub) return;

    const select = document.getElementById('examSubjectSelect');
    if (select) {
      select.value = sub.id;
      this.renderReviewTopics();
    }
    app.showToast(`📖 [${sub.name}] 시험일: ${sub.examDate} (${sub.type})\n범위: ${sub.scope}\n우측 회독 체크리스트가 해당 과목으로 전환되었습니다.`, 'info');
  },

  openAddExamForDate(dateKey) {
    app.openModal('addExamModal');
    const dateInput = document.getElementById('examDateInput');
    if (dateInput) dateInput.value = dateKey;
  },

  populateSubjectSelect() {
    const select = document.getElementById('examSubjectSelect');
    const modalSelect = document.getElementById('modalTopicSubject');
    
    const optionsHtml = this.subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

    if (select) {
      const currentVal = select.value;
      select.innerHTML = optionsHtml;
      if (currentVal && this.subjects.some(s => s.id === currentVal)) {
        select.value = currentVal;
      }
    }

    if (modalSelect) {
      modalSelect.innerHTML = optionsHtml;
    }
  },

  renderReviewTopics() {
    const select = document.getElementById('examSubjectSelect');
    const container = document.getElementById('reviewTopicList');
    if (!container) return;

    const subId = (select && select.value) || (this.subjects[0] ? this.subjects[0].id : null);
    if (!subId) {
      container.innerHTML = '<div class="text-center text-muted p-4">등록된 시험 과목이 없습니다.</div>';
      return;
    }

    const subject = this.subjects.find(s => s.id === subId);
    if (!subject) return;

    if (!subject.topics || subject.topics.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-md); border:1px dashed var(--border-color);">
          <i data-lucide="book-open" style="width:36px; height:36px; color:var(--text-muted); margin-bottom:0.5rem;"></i>
          <h4 style="font-size:0.95rem; color:#fff; font-weight:600;">[${subject.name}] 등록된 시험 범위가 없습니다.</h4>
          <p class="text-xs text-muted" style="margin:0.4rem 0 1rem 0;">위의 빠른 입력창 또는 아래 버튼을 눌러 첫 번째 시험 범위를 추가하세요!</p>
          <button type="button" class="btn btn-sm btn-primary" onclick="examModule.openAddTopicModal('${subject.id}')">
            <i data-lucide="plus"></i> 첫 시험 범위 추가하기
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = subject.topics.map((t, idx) => {
      const target = t.targetReviews || 3;
      const current = t.reviews || 0;
      const progressPercent = Math.min(100, Math.round((current / target) * 100));
      const isCompleted = current >= target;

      // Generate 1..target (or up to 5) clickable round pills
      const maxPills = Math.max(target, 5);
      let pillsHtml = '';
      for (let r = 1; r <= maxPills; r++) {
        const isActive = r <= current;
        pillsHtml += `
          <button type="button" 
                  class="round-pill-btn ${isActive ? 'active' : ''}" 
                  onclick="examModule.setExactReview('${subId}', '${t.id}', ${r})"
                  title="${r}회독 달성 토글">
            ${isActive ? `✓ ${r}회독` : `${r}회독`}
          </button>
        `;
      }

      return `
        <div class="review-topic-card" data-topic-id="${t.id}">
          <div class="review-topic-header">
            <div class="review-topic-title">
              <span style="color:var(--accent); font-size:0.8rem; font-family:'Outfit',sans-serif; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); border-radius:4px; padding:0.1rem 0.4rem;">#${idx + 1}</span>
              <span>${t.title}</span>
            </div>
            <div class="review-topic-actions">
              <button type="button" class="btn btn-xs btn-outline" onclick="examModule.openEditTopicModal('${subId}', '${t.id}')" title="범위 수정">
                <i data-lucide="edit-3" style="width:13px; height:13px;"></i> 수정
              </button>
              <button type="button" class="btn btn-xs btn-outline-danger" onclick="examModule.deleteTopic('${subId}', '${t.id}')" title="삭제">
                <i data-lucide="trash-2" style="width:13px; height:13px;"></i>
              </button>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="review-progress-mini">
            <div class="review-progress-bar" style="width: ${progressPercent}%;"></div>
          </div>

          <!-- Pills and controls -->
          <div class="review-pills-row">
            <div class="review-round-pills">
              ${pillsHtml}
            </div>

            <div style="display:flex; align-items:center; gap:0.4rem;">
              <span class="text-xs ${isCompleted ? 'text-success font-bold' : 'text-muted'}">
                ${current}/${target}회독 (${progressPercent}%) ${isCompleted ? '🎉 완료!' : ''}
              </span>
              <button type="button" class="btn btn-xs btn-secondary" style="padding:0.2rem 0.4rem;" onclick="examModule.updateReview('${subId}', '${t.id}', -1)" title="1회독 감소">-1</button>
              <button type="button" class="btn btn-xs btn-primary" style="padding:0.2rem 0.4rem;" onclick="examModule.updateReview('${subId}', '${t.id}', 1)" title="1회독 증가">+1</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  setExactReview(subId, topicId, round) {
    const sub = this.subjects.find(s => s.id === subId);
    if (!sub) return;
    const topic = sub.topics.find(t => t.id === topicId);
    if (!topic) return;

    if (topic.reviews === round) {
      topic.reviews = round - 1;
    } else {
      topic.reviews = round;
    }

    this.renderReviewTopics();
    app.showToast(`[${topic.title}] 회독이 ${topic.reviews}회독으로 설정되었습니다.`, 'success');
  },

  quickAddTopic() {
    const titleInput = document.getElementById('quickTopicTitle');
    const targetSelect = document.getElementById('quickTopicTarget');
    const subjectSelect = document.getElementById('examSubjectSelect');

    const title = titleInput ? titleInput.value.trim() : '';
    if (!title) {
      app.showToast('추가할 시험 범위/단원 제목을 입력해 주세요!', 'warning');
      return;
    }

    const subId = subjectSelect ? subjectSelect.value : (this.subjects[0] ? this.subjects[0].id : null);
    const subject = this.subjects.find(s => s.id === subId);
    if (!subject) return;

    if (!subject.topics) subject.topics = [];

    const target = targetSelect ? parseInt(targetSelect.value) : 3;

    subject.topics.push({
      id: 't_' + Date.now(),
      title: title,
      reviews: 0,
      targetReviews: target || 3
    });

    titleInput.value = '';
    this.renderReviewTopics();
    app.showToast(`[${subject.name}]에 '${title}' 시험 범위가 추가되었습니다!`, 'success');
  },

  openAddTopicModal(targetSubId = null) {
    this.populateSubjectSelect();
    const modalSelect = document.getElementById('modalTopicSubject');
    const currentSub = targetSubId || (document.getElementById('examSubjectSelect') ? document.getElementById('examSubjectSelect').value : null);
    if (modalSelect && currentSub) modalSelect.value = currentSub;

    const titleInput = document.getElementById('modalTopicTitle');
    if (titleInput) titleInput.value = '';

    const initialRevInput = document.getElementById('modalTopicInitialReviews');
    if (initialRevInput) initialRevInput.value = 0;

    app.openModal('addReviewTopicModal');
  },

  saveNewTopicFromModal() {
    const subId = document.getElementById('modalTopicSubject')?.value;
    const title = document.getElementById('modalTopicTitle')?.value.trim();
    const target = parseInt(document.getElementById('modalTopicTarget')?.value || '3');
    const initialReviews = parseInt(document.getElementById('modalTopicInitialReviews')?.value || '0');

    if (!title) {
      app.showToast('시험 범위/단원 명칭을 입력해 주세요!', 'warning');
      return;
    }

    const subject = this.subjects.find(s => s.id === subId);
    if (!subject) return;

    if (!subject.topics) subject.topics = [];

    subject.topics.push({
      id: 't_' + Date.now(),
      title: title,
      reviews: Math.max(0, initialReviews),
      targetReviews: target
    });

    const mainSelect = document.getElementById('examSubjectSelect');
    if (mainSelect) mainSelect.value = subId;

    app.closeModal('addReviewTopicModal');
    this.renderReviewTopics();
    app.showToast(`[${subject.name}] 시험 범위 '${title}'이(가) 등록되었습니다!`, 'success');
  },

  openEditTopicModal(subId, topicId) {
    const sub = this.subjects.find(s => s.id === subId);
    if (!sub) return;
    const topic = sub.topics.find(t => t.id === topicId);
    if (!topic) return;

    document.getElementById('editTopicSubId').value = subId;
    document.getElementById('editTopicId').value = topicId;
    document.getElementById('editTopicTitle').value = topic.title;
    document.getElementById('editTopicTarget').value = topic.targetReviews || 3;
    document.getElementById('editTopicReviews').value = topic.reviews || 0;

    app.openModal('editReviewTopicModal');
  },

  saveEditedTopic() {
    const subId = document.getElementById('editTopicSubId')?.value;
    const topicId = document.getElementById('editTopicId')?.value;
    const title = document.getElementById('editTopicTitle')?.value.trim();
    const target = parseInt(document.getElementById('editTopicTarget')?.value || '3');
    const reviews = parseInt(document.getElementById('editTopicReviews')?.value || '0');

    if (!title) {
      app.showToast('단원 명칭을 입력해 주세요!', 'warning');
      return;
    }

    const sub = this.subjects.find(s => s.id === subId);
    if (!sub) return;
    const topic = sub.topics.find(t => t.id === topicId);
    if (!topic) return;

    topic.title = title;
    topic.targetReviews = target;
    topic.reviews = Math.max(0, reviews);

    app.closeModal('editReviewTopicModal');
    this.renderReviewTopics();
    app.showToast(`'${title}' 시험 범위가 수정되었습니다!`, 'success');
  },

  deleteTopic(subId, topicId) {
    const sub = this.subjects.find(s => s.id === subId);
    if (!sub) return;
    const idx = sub.topics.findIndex(t => t.id === topicId);
    if (idx > -1) {
      const removed = sub.topics.splice(idx, 1)[0];
      this.renderReviewTopics();
      app.showToast(`[${removed.title}] 시험 범위가 삭제되었습니다.`, 'info');
    }
  },

  deleteTopicFromEditModal() {
    const subId = document.getElementById('editTopicSubId')?.value;
    const topicId = document.getElementById('editTopicId')?.value;
    if (subId && topicId) {
      this.deleteTopic(subId, topicId);
      app.closeModal('editReviewTopicModal');
    }
  },

  updateReview(subId, topicId, delta) {
    const sub = this.subjects.find(s => s.id === subId);
    if (sub) {
      const topic = sub.topics.find(t => t.id === topicId);
      if (topic) {
        topic.reviews = Math.max(0, topic.reviews + delta);
        this.renderReviewTopics();
        app.showToast(`[${topic.title}] 회독 수가 ${topic.reviews}회독으로 업데이트되었습니다.`, 'success');
      }
    }
  },

  confirmSchedule(subId) {
    const sub = this.subjects.find(s => s.id === subId);
    if (sub) {
      sub.type = '확정 일정';
      this.renderExamCalendar();
      this.renderSubjectList();
      this.renderFirstExamHero();
      app.showToast(`[${sub.name}] 일정이 확정 일정으로 정보가 수정되었습니다!`, 'success');
    }
  },

  formatCountdown(targetDateStr) {
    const now = new Date();
    const target = new Date(targetDateStr);
    const diffMs = target - now;

    if (diffMs <= 0) return '시험 진행 중 / 완료';

    const diffHoursTotal = diffMs / (1000 * 60 * 60);

    if (diffHoursTotal >= 24) {
      const days = Math.floor(diffHoursTotal / 24);
      const hours = Math.floor(diffHoursTotal % 24);
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${days}일 ${hours}시간 ${mins}분 전`;
    } else {
      const hours = Math.floor(diffHoursTotal);
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}시간 ${mins}분 전`;
    }
  },

  startCountdownTimer() {
    setInterval(() => {
      this.renderFirstExamHero();
    }, 30000); // refresh every 30 sec
  },

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('pdfDropzone');
    if (dropzone) dropzone.classList.add('dragover');
  },

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('pdfDropzone');
    if (dropzone) dropzone.classList.remove('dragover');
  },

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('pdfDropzone');
    if (dropzone) dropzone.classList.remove('dragover');
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.handlePhotoFiles(Array.from(e.dataTransfer.files));
    }
  },

  handlePhotoPreview(e) {
    if (e.target && e.target.files) {
      this.handlePhotoFiles(Array.from(e.target.files));
    }
  },

  handlePhotoFiles(files) {
    const imgFiles = files.filter(f => f.type.startsWith('image/'));
    if (imgFiles.length === 0) {
      app.showToast('이미지 파일(JPG, PNG, GIF 등)을 선택해 주세요.', 'warning');
      return;
    }

    this.uploadedPhotos = [...this.uploadedPhotos, ...imgFiles];
    this.renderPhotoPreviews();
  },

  renderPhotoPreviews() {
    const grid = document.getElementById('pdfPhotoPreviewGrid');
    if (!grid) return;

    grid.innerHTML = '';
    this.uploadedPhotos.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const wrap = document.createElement('div');
        wrap.className = 'staged-photo-card';
        wrap.style.height = '85px';
        wrap.innerHTML = `
          <img src="${evt.target.result}" alt="${file.name}">
          <button type="button" class="staged-photo-remove" onclick="examModule.removeUploadedPhoto(${index})" title="삭제">&times;</button>
        `;
        grid.appendChild(wrap);
      };
      reader.readAsDataURL(file);
    });
  },

  removeUploadedPhoto(index) {
    this.uploadedPhotos.splice(index, 1);
    this.renderPhotoPreviews();
  },

  async generatePdfFromPhotos(customTitle = null, textNote = '') {
    const titleInput = document.getElementById('pdfNoteTitle');
    const title = customTitle || (titleInput ? titleInput.value.trim() : '') || '시험 개념 요약 및 사진 노트';

    if (this.uploadedPhotos.length === 0 && !textNote) {
      app.showToast('PDF로 합성할 사진 파일을 최하 1장 이상 선택해 주세요!', 'warning');
      return;
    }

    const btn = document.getElementById('generatePdfBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> PDF 문서 생성 및 렌더링 중...`;
      if (window.lucide) lucide.createIcons();
    }

    app.showToast('개념 노트 사진을 고화질 PDF 문서로 합성 및 렌더링을 진행합니다...', 'info');

    try {
      // 1. Get jsPDF constructor
      const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
      if (!jsPDFClass) {
        throw new Error('jsPDF 라이브러리를 찾을 수 없습니다.');
      }

      const pdf = new jsPDFClass('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // High-res A4 canvas dimensions (1240 x 1754 px at 150 DPI)
      const canvasWidth = 1240;
      const canvasHeight = 1754;

      const totalPages = Math.max(1, this.uploadedPhotos.length);

      for (let i = 0; i < totalPages; i++) {
        const file = this.uploadedPhotos[i];

        // Create high-res offscreen page canvas
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = canvasHeight;
        const ctx = pageCanvas.getContext('2d');

        // Background: Clean white
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Header Background Banner
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(40, 40, canvasWidth - 80, 110);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, canvasWidth - 80, 110);

        // Header Badge & Title
        ctx.fillStyle = '#4f46e5';
        ctx.font = 'bold 24px "Noto Sans KR", -apple-system, sans-serif';
        ctx.fillText('UniPlan 스마트 시험 개념 노트', 65, 80);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 32px "Noto Sans KR", -apple-system, sans-serif';
        const displayTitle = title.length > 32 ? title.substring(0, 32) + '...' : title;
        ctx.fillText(displayTitle, 65, 125);

        // Page info & Date on right
        ctx.fillStyle = '#64748b';
        ctx.font = '600 22px "Outfit", "Noto Sans KR", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`Page ${i + 1} of ${totalPages}`, canvasWidth - 65, 85);
        ctx.font = '18px "Noto Sans KR", sans-serif';
        const todayStr = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
        ctx.fillText(`생성일: ${todayStr}`, canvasWidth - 65, 120);
        ctx.textAlign = 'left'; // Reset

        // If file exists, load and draw image with aspect ratio preservation
        if (file) {
          const imgDataUrl = await new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = e => resolve(e.target.result);
            r.onerror = reject;
            r.readAsDataURL(file);
          });

          const img = await new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = imgDataUrl;
          });

          // Compute max bounds for image area
          const maxImgWidth = canvasWidth - 100;
          const maxImgHeight = canvasHeight - 260; // Leaves room for header and footer

          let drawWidth = img.naturalWidth || img.width;
          let drawHeight = img.naturalHeight || img.height;

          const ratio = Math.min(maxImgWidth / drawWidth, maxImgHeight / drawHeight);
          drawWidth = drawWidth * ratio;
          drawHeight = drawHeight * ratio;

          const drawX = (canvasWidth - drawWidth) / 2;
          const drawY = 175 + (maxImgHeight - drawHeight) / 2;

          // Draw photo container shadow & frame
          ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
          ctx.fillRect(drawX - 6, drawY - 6, drawWidth + 12, drawHeight + 12);
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(drawX, drawY, drawWidth, drawHeight);

          // Draw Image
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        } else if (textNote) {
          // Render text note
          ctx.fillStyle = '#1e293b';
          ctx.font = '24px "Noto Sans KR", sans-serif';
          const lines = textNote.split('\n');
          let yPos = 200;
          lines.forEach(line => {
            ctx.fillText(line, 65, yPos);
            yPos += 36;
          });
        }

        // Footer
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px "Noto Sans KR", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('UniPlan - 대학 생활 통합 플래너 & 시험 개념 관리 시스템', canvasWidth / 2, canvasHeight - 40);
        ctx.textAlign = 'left';

        // Add page to PDF
        if (i > 0) pdf.addPage();
        const pageDataUrl = pageCanvas.toDataURL('image/jpeg', 0.92);
        pdf.addImage(pageDataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      // Download PDF
      const sanitizedFilename = `${title.replace(/[\/\\:*?"<>|]/g, '_').replace(/\s+/g, '_')}_개념노트.pdf`;
      pdf.save(sanitizedFilename);

      app.showToast(`🎉 [${title}] 고화질 PDF 문서가 성공적으로 생성 및 다운로드되었습니다!`, 'success');
    } catch (err) {
      console.error('PDF Generation Error:', err);
      app.showToast('PDF 생성 중 오류가 발생하였습니다: ' + (err.message || '사진 형식을 확인해 주세요.'), 'danger');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="file-down"></i> 업로드 사진 PDF로 합성 및 다운로드`;
        if (window.lucide) lucide.createIcons();
      }
    }
  },

  async generatePdfFromTextOnly(title, content) {
    this.uploadedPhotos = [];
    await this.generatePdfFromPhotos(title, content);
  }
};
