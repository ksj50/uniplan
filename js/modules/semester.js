/**
 * Module 2: Semester Notification & Timetable/Homework/Video Service
 */
const semesterModule = {
  // Weekly timetable data
  timetable: [
    { id: 'c1', name: '자료구조 및 알고리즘', day: '월', startTime: '10:00', endTime: '12:00', room: '공학관 301호', professor: '김교수' },
    { id: 'c2', name: '운영체제', day: '월', startTime: '13:00', endTime: '15:00', room: '공학관 405호', professor: '박교수' },
    { id: 'c3', name: '웹 프론트엔드 실습', day: '수', startTime: '14:00', endTime: '17:00', room: '정보관 202호', professor: '이교수' },
    { id: 'c4', name: '데이터베이스', day: '목', startTime: '11:00', endTime: '13:00', room: '공학관 204호', professor: '정교수' },
    { id: 'c5', name: '인공지능 개론', day: '목', startTime: '13:00', endTime: '15:00', room: '공학관 204호', professor: '최교수' }
  ],

  // Assignments data with pre-calculated deadlines
  assignments: [
    { id: 'a1', subject: '자료구조 및 알고리즘', title: '과제 2 - Red-Black Tree 구현 및 시간복잡도 분석', deadline: '2026-08-14 23:59', status: '진행 중', alertSent: '12시간 전 알림 전송됨' },
    { id: 'a2', subject: '운영체제', title: '가상 메모리 페이징 알고리즘 비교 보고서', deadline: '2026-08-16 18:00', status: '미착수', alertSent: '24시간 전 알림 예정' }
  ],

  // Video lectures data
  videos: [
    { id: 'v1', subject: '운영체제', title: '[보충강의] 세마포어와 뮤텍스 동기화 실습', uploadDate: '2026-08-10', watchCount: 0, purpose: '최초 수강', alertTriggered: true },
    { id: 'v2', subject: '자료구조 및 알고리즘', title: '[개념강의] 그래프 최단경로 다익스트라 알고리즘', uploadDate: '2026-08-12', watchCount: 1, purpose: '개념 이해', alertTriggered: false },
    { id: 'v3', subject: '웹 프론트엔드 실습', title: '[실습] React State & Lifecycle 완벽 정리', uploadDate: '2026-08-13', watchCount: 2, purpose: '복습', alertTriggered: false }
  ],

  classScheduleRows: [
    { id: 1, day: '월', startTime: '10:00', endTime: '12:00', room: '공학관 301호' },
    { id: 2, day: '수', startTime: '14:00', endTime: '16:00', room: '정보관 202호' }
  ],

  init() {
    this.renderTimetable();
    this.renderAssignments();
    this.renderVideos();
    this.renderDashboardSchedule();
    this.setupButtonListeners();
    this.renderClassScheduleRows();
  },

  setupButtonListeners() {
    const classBtn = document.getElementById('addClassBtn');
    if (classBtn) {
      classBtn.onclick = () => {
        this.renderClassScheduleRows();
        app.openModal('addClassModal');
      };
    }

    const assignBtn = document.getElementById('addAssignmentBtn');
    if (assignBtn) assignBtn.onclick = () => app.openModal('addAssignmentModal');

    const videoBtn = document.getElementById('addVideoBtn');
    if (videoBtn) videoBtn.onclick = () => app.openModal('addVideoModal');
  },

  renderClassScheduleRows() {
    const container = document.getElementById('classScheduleRowsContainer');
    if (!container) return;

    container.innerHTML = this.classScheduleRows.map((row, idx) => `
      <div class="schedule-row-item" style="display:flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.05); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
        <span style="font-weight:700; font-size:0.8rem; min-width:45px; color:var(--text-main);">${idx + 1}회차:</span>
        <select class="form-control form-control-sm row-day" style="width:75px;">
          <option value="월" ${row.day === '월' ? 'selected' : ''}>월요일</option>
          <option value="화" ${row.day === '화' ? 'selected' : ''}>화요일</option>
          <option value="수" ${row.day === '수' ? 'selected' : ''}>수요일</option>
          <option value="목" ${row.day === '목' ? 'selected' : ''}>목요일</option>
          <option value="금" ${row.day === '금' ? 'selected' : ''}>금요일</option>
          <option value="토" ${row.day === '토' ? 'selected' : ''}>토요일</option>
          <option value="일" ${row.day === '일' ? 'selected' : ''}>일요일</option>
        </select>
        <input type="time" class="form-control form-control-sm row-start" value="${row.startTime}" style="width:95px;">
        <span style="font-size:0.8rem;">~</span>
        <input type="time" class="form-control form-control-sm row-end" value="${row.endTime}" style="width:95px;">
        <input type="text" class="form-control form-control-sm row-room" value="${row.room}" placeholder="강의실 (예: 공학관 301호)" style="flex:1;">
        ${this.classScheduleRows.length > 1 ? `<button class="btn btn-xs btn-outline-danger" title="일정 삭제" onclick="semesterModule.removeClassScheduleRow(${idx})">&times;</button>` : ''}
      </div>
    `).join('');
  },

  addClassScheduleRow() {
    const nextIdx = this.classScheduleRows.length + 1;
    this.classScheduleRows.push({
      id: Date.now(),
      day: nextIdx % 2 === 0 ? '수' : '월',
      startTime: '13:00',
      endTime: '15:00',
      room: '공학관 강의실'
    });
    this.renderClassScheduleRows();
  },

  removeClassScheduleRow(idx) {
    if (this.classScheduleRows.length <= 1) return;
    this.classScheduleRows.splice(idx, 1);
    this.renderClassScheduleRows();
  },

  saveNewClass() {
    const name = document.getElementById('newClassName').value.trim();
    const prof = document.getElementById('newClassProf').value.trim() || '담당교수';

    if (!name) {
      app.showToast('교과목 이름을 입력해 주세요!', 'warning');
      return;
    }

    const rowEls = document.querySelectorAll('#classScheduleRowsContainer .schedule-row-item');
    if (rowEls.length === 0) {
      app.showToast('최하 1개 이상의 수업 일정을 입력해 주세요!', 'warning');
      return;
    }

    let addedCount = 0;
    rowEls.forEach((rowEl, idx) => {
      const day = rowEl.querySelector('.row-day').value;
      const startTime = rowEl.querySelector('.row-start').value;
      const endTime = rowEl.querySelector('.row-end').value;
      const room = rowEl.querySelector('.row-room').value.trim() || '강의실';

      this.timetable.push({
        id: 'c_' + Date.now() + '_' + idx,
        name: name,
        day: day,
        startTime: startTime,
        endTime: endTime,
        room: room,
        professor: prof
      });
      addedCount++;
    });

    this.renderTimetable();
    this.renderDashboardSchedule();
    app.closeModal('addClassModal');
    app.showToast(`[${name}] 주 ${addedCount}회 반복 수업 일정 및 강의실이 성공적으로 등록되었습니다!`, 'success');
  },

  saveNewAssignment() {
    const subject = document.getElementById('newAssignSubject').value.trim() || '일반 과목';
    const title = document.getElementById('newAssignTitle').value.trim();
    const deadlineVal = document.getElementById('newAssignDeadline').value;

    if (!title) {
      app.showToast('과제 제목을 입력해 주세요!', 'warning');
      return;
    }

    const deadline = deadlineVal ? deadlineVal.replace('T', ' ') : '2026-08-20 23:59';

    this.assignments.push({
      id: 'a' + Date.now(),
      subject: subject,
      title: title,
      deadline: deadline,
      status: '신규 등록',
      alertSent: '24h/12h/6h/1h 자동 알림 세팅됨'
    });

    this.renderAssignments();
    app.closeModal('addAssignmentModal');
    app.showToast(`과제 [${title}] 마감 알림(24h/12h/6h/1h)이 세팅되었습니다!`, 'success');
  },

  saveNewVideo() {
    const subject = document.getElementById('newVideoSubject').value.trim() || '일반 과목';
    const title = document.getElementById('newVideoTitle').value.trim();
    const purpose = document.getElementById('newVideoPurpose').value;

    if (!title) {
      app.showToast('영상 강의 제목을 입력해 주세요!', 'warning');
      return;
    }

    this.videos.push({
      id: 'v' + Date.now(),
      subject: subject,
      title: title,
      uploadDate: new Date().toISOString().split('T')[0],
      watchCount: 0,
      purpose: purpose,
      alertTriggered: false
    });

    this.renderVideos();
    app.closeModal('addVideoModal');
    app.showToast(`영상 강의 [${title}] (${purpose})가 성공적으로 등록되었습니다!`, 'success');
  },

  deleteClass(id) {
    this.timetable = this.timetable.filter(c => c.id !== id);
    this.renderTimetable();
    this.renderDashboardSchedule();
    app.showToast('수업 일정이 시간표에서 삭제되었습니다.', 'info');
  },

  renderTimetable() {
    const container = document.getElementById('timetableGrid');
    if (!container) return;

    const days = ['월', '화', '수', '목', '금', '토', '일'];

    // Generate 30-min time slots from 09:00 to 18:00
    const timeSlots = [];
    for (let h = 9; h < 18; h++) {
      const hourStr = h < 10 ? '0' + h : '' + h;
      timeSlots.push(`${hourStr}:00`);
      timeSlots.push(`${hourStr}:30`);
    }

    // Color palette mapping
    const palette = [
      { bg: 'rgba(239, 68, 68, 0.22)', border: '#EF4444', text: '#FCA5A5' },
      { bg: 'rgba(16, 185, 129, 0.22)', border: '#10B981', text: '#6EE7B7' },
      { bg: 'rgba(59, 130, 246, 0.22)', border: '#3B82F6', text: '#93C5FD' },
      { bg: 'rgba(168, 85, 247, 0.22)', border: '#A855F7', text: '#E9D5FF' },
      { bg: 'rgba(245, 158, 11, 0.22)', border: '#F59E0B', text: '#FDE68A' },
      { bg: 'rgba(236, 72, 153, 0.22)', border: '#EC4899', text: '#FBCFE8' },
      { bg: 'rgba(20, 184, 166, 0.22)', border: '#14B8A6', text: '#99F6E4' }
    ];

    const courseColorMap = {};
    let colorIdx = 0;
    this.timetable.forEach(c => {
      if (!courseColorMap[c.name]) {
        courseColorMap[c.name] = palette[colorIdx % palette.length];
        colorIdx++;
      }
    });

    // Helper: convert HH:MM to minutes from 00:00
    const toMinutes = (t) => {
      const parts = t.split(':');
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    };

    // Track occupied cells: occupied[day][slotIdx] = true/false
    const occupied = {};
    days.forEach(d => {
      occupied[d] = new Array(timeSlots.length).fill(false);
    });

    // Build matrix HTML with fixed equal column widths
    let tableHtml = `
      <div style="margin-bottom:0.75rem; display:flex; justify-content:space-between; align-items:center;">
        <div class="alert-banner success" style="margin:0; padding:0.5rem 0.8rem; font-size:0.8rem; flex:1;">
          <i data-lucide="clock" style="width:15px;"></i>
          <strong>[월요일 공강 안내]</strong> 12:00 ~ 13:00 (1시간 공강) - 시작 5분전 알림 설정 완료
        </div>
      </div>

      <div class="table-container" style="overflow-x:auto; -webkit-overflow-scrolling:touch; max-height:580px;">
        <table class="custom-table visual-timetable-table" style="width:100%; min-width:700px; table-layout:fixed; border-collapse:collapse; text-align:center; font-size:0.75rem;">
          <thead>
            <tr style="background:rgba(255,255,255,0.08); border-bottom:2px solid var(--border-color);">
              <th style="width:75px; min-width:75px; padding:0.6rem; text-align:center;">시간</th>
              ${days.map(d => `<th style="width:calc((100% - 75px) / 7); padding:0.6rem; text-align:center; border-left:1px solid var(--border-color);">${d}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
    `;

    timeSlots.forEach((slot, slotIdx) => {
      const slotMin = toMinutes(slot);
      const nextSlotMin = slotMin + 30;
      const endStr = `${Math.floor(nextSlotMin/60).toString().padStart(2,'0')}:${(nextSlotMin%60).toString().padStart(2,'0')}`;

      tableHtml += `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); height:32px;">`;
      tableHtml += `<td style="font-weight:700; font-size:0.7rem; color:var(--text-muted); background:rgba(0,0,0,0.2); border-right:1px solid var(--border-color); padding:0.2rem 0.4rem;">${slot}-${endStr}</td>`;

      days.forEach(day => {
        if (occupied[day][slotIdx]) {
          // Cell is covered by a rowspan from an earlier start slot
          return;
        }

        // Find if a class starts at this exact slot
        const matchingClass = this.timetable.find(c => {
          if (c.day !== day) return false;
          const startM = toMinutes(c.startTime);
          return startM === slotMin;
        });

        if (matchingClass) {
          const startM = toMinutes(matchingClass.startTime);
          const endM = toMinutes(matchingClass.endTime);
          const durationSlots = Math.max(1, Math.round((endM - startM) / 30));

          // Mark subsequent slots as occupied
          for (let i = 0; i < durationSlots; i++) {
            if (slotIdx + i < timeSlots.length) {
              occupied[day][slotIdx + i] = true;
            }
          }

          const style = courseColorMap[matchingClass.name] || palette[0];
          tableHtml += `
            <td rowspan="${durationSlots}" style="background:${style.bg}; border-left:4px solid ${style.border}; color:${style.text}; padding:0.4rem 0.3rem; vertical-align:middle; border-radius:var(--radius-xs); border-bottom:1px solid ${style.border};">
              <div style="font-weight:800; font-size:0.82rem; line-height:1.2;">${matchingClass.name}</div>
              <div style="font-size:0.72rem; margin-top:0.2rem; opacity:0.9;">${matchingClass.professor}</div>
              <div style="font-size:0.68rem; opacity:0.8;">(${matchingClass.room})</div>
              <button onclick="semesterModule.deleteClass('${matchingClass.id}')" style="background:none; border:none; color:var(--danger); cursor:pointer; font-size:0.68rem; margin-top:0.3rem; opacity:0.8;" title="수업 삭제">&times; 삭제</button>
            </td>
          `;
        } else {
          // Check if covered by any ongoing class that didn't start exactly at slotMin
          const isCovered = this.timetable.some(c => {
            if (c.day !== day) return false;
            const startM = toMinutes(c.startTime);
            const endM = toMinutes(c.endTime);
            return slotMin >= startM && slotMin < endM;
          });

          if (!isCovered) {
            tableHtml += `<td style="border-right:1px solid rgba(255,255,255,0.03);"></td>`;
          }
        }
      });

      tableHtml += `</tr>`;
    });

    tableHtml += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = tableHtml;
    if (window.lucide) lucide.createIcons();
  },

  renderAssignments() {
    const container = document.getElementById('assignmentList');
    if (!container) return;

    container.innerHTML = this.assignments.map(a => `
      <div class="activity-card" style="margin-bottom:0.6rem;">
        <div class="activity-main">
          <div class="title" style="font-size:0.9rem;">[${a.subject}] ${a.title}</div>
          <div class="summary" style="color:var(--danger);">마감일: ${a.deadline}</div>
          <div class="activity-meta">
            <span class="badge badge-danger">24h / 12h / 6h / 1h 알림 활성</span>
            <span class="text-xs text-muted">${a.alertSent}</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderVideos() {
    const container = document.getElementById('videoTrackerList');
    if (!container) return;

    container.innerHTML = this.videos.map(v => `
      <div class="activity-card" style="margin-bottom:0.6rem; ${v.uploadDate === '2026-08-10' && v.watchCount === 0 ? 'border: 1px solid var(--danger);' : ''}">
        <div class="activity-main">
          <div class="title" style="font-size:0.9rem;">[${v.subject}] ${v.title}</div>
          <div class="summary">업로드일: ${v.uploadDate} | 시청 횟수: ${v.watchCount}회</div>
          <div class="activity-meta" style="margin-top:0.4rem; align-items:center;">
            <label class="text-xs text-muted">수강 목적:</label>
            <select class="form-select-sm" onchange="semesterModule.updateVideoPurpose('${v.id}', this.value)">
              <option value="최초 수강" ${v.purpose === '최초 수강' ? 'selected' : ''}>최초 수강</option>
              <option value="개념 이해" ${v.purpose === '개념 이해' ? 'selected' : ''}>개념 이해</option>
              <option value="복습" ${v.purpose === '복습' ? 'selected' : ''}>복습</option>
              <option value="예습" ${v.purpose === '예습' ? 'selected' : ''}>예습</option>
            </select>
            ${v.uploadDate === '2026-08-10' && v.watchCount === 0 ? `
              <span class="badge badge-danger"><i data-lucide="alert-triangle"></i> 3일 경과 미시청!</span>
            ` : '<span class="badge badge-success">수강 진행 중</span>'}
          </div>
        </div>
        <button class="btn btn-xs btn-primary" onclick="semesterModule.incrementWatch('${v.id}')">1회 시청 완료</button>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
  },

  renderDashboardSchedule() {
    const scheduleContainer = document.getElementById('dashboardScheduleList');
    const videoContainer = document.getElementById('dashboardVideoList');

    if (scheduleContainer) {
      scheduleContainer.innerHTML = `
        <div class="activity-card mb-2">
          <div class="activity-main">
            <div class="title" style="font-size:0.9rem;">자료구조 및 알고리즘 (10:00 ~ 12:00)</div>
            <div class="summary">공학관 301호 | 담당: 김교수</div>
          </div>
          <span class="badge badge-success">수업 종료</span>
        </div>
        <div class="activity-card mb-2" style="background: rgba(245, 158, 11, 0.1); border-color: var(--warning);">
          <div class="activity-main">
            <div class="title" style="font-size:0.9rem; color:var(--warning);">[공강 시간] 12:00 ~ 13:00 (총 1시간)</div>
            <div class="summary">점심 식사 및 중앙도서관 스터디</div>
          </div>
          <span class="badge badge-warning">공강 중</span>
        </div>
        <div class="activity-card">
          <div class="activity-main">
            <div class="title" style="font-size:0.9rem;">운영체제 (13:00 ~ 15:00) - 오늘 마지막 수업</div>
            <div class="summary">공학관 405호 | 연강 및 15시 종료 5분전 알림 전송 예정</div>
          </div>
          <span class="badge badge-accent">13:00 시작</span>
        </div>
      `;
    }

    if (videoContainer) {
      videoContainer.innerHTML = `
        <div class="activity-card" style="border:1px solid var(--danger);">
          <div class="activity-main">
            <div class="title" style="font-size:0.85rem;">[운영체제] 세마포어와 뮤텍스 동기화 실습</div>
            <div class="summary text-xs">업로드: 2026-08-10 (3일 경과 미시청 경고!)</div>
          </div>
          <button class="btn btn-xs btn-danger" onclick="semesterModule.incrementWatch('v1')">지금 시청하기</button>
        </div>
      `;
    }
  },

  updateVideoPurpose(id, purpose) {
    const video = this.videos.find(v => v.id === id);
    if (video) {
      video.purpose = purpose;
      app.showToast(`[${video.title}] 수강 목적이 '${purpose}'(으)로 변경되었습니다.`, 'info');
    }
  },

  incrementWatch(id) {
    const video = this.videos.find(v => v.id === id);
    if (video) {
      video.watchCount += 1;
      video.uploadDate = '최근 시청 완료';
      this.renderVideos();
      this.renderDashboardSchedule();
      app.showToast(`[${video.title}] 시청 횟수가 ${video.watchCount}회로 업데이트되었습니다.`, 'success');
    }
  },

  triggerSim(type) {
    switch (type) {
      case '1h_class':
        app.showToast('[수업 알림] 1시간 후 [운영체제] 수업이 시작됩니다! (공학관 405호)', 'info');
        break;
      case 'gaps':
        app.showToast('[공강 알림] 5분 후 공강이 시작됩니다! (12:00 ~ 13:00, 총 1시간 공강)', 'warning');
        break;
      case 'back_to_back':
        app.showToast('[연강 알림] 5분 후 연강 수업 [운영체제]가 시작됩니다! 이동해 주세요.', 'warning');
        break;
      case 'last_class':
        app.showToast('[마지막 수업 알림] 5분 후 오늘의 마지막 수업이 종료됩니다! 수고하셨습니다.', 'success');
        setTimeout(() => {
          app.openModal('dailyCheckinModal');
        }, 1200);
        break;
      case 'unwatched_video':
        app.showToast('[경고] [운영체제] 영상 강의가 올라온 지 3일이 지났습니다! 1회 시청을 완료하세요.', 'danger');
        break;
    }
  },

  saveDailyCheckin() {
    const subject = document.getElementById('checkinSubjectSelect').value;
    const assignmentTitle = document.getElementById('checkinAssignmentTitle').value.trim();
    const progressNote = document.getElementById('checkinProgressNote').value.trim();
    const videoTitle = document.getElementById('checkinVideoTitle').value.trim();

    if (assignmentTitle) {
      this.assignments.push({
        id: 'a' + Date.now(),
        subject: '선택 과목',
        title: assignmentTitle,
        deadline: '2026-08-20 23:59',
        status: '신규 추가',
        alertSent: '24시간전/12시간전 알림 예약'
      });
      this.renderAssignments();
    }

    if (videoTitle) {
      this.videos.push({
        id: 'v' + Date.now(),
        subject: '선택 과목',
        title: videoTitle,
        uploadDate: '2026-08-13',
        watchCount: 0,
        purpose: '최초 수강',
        alertTriggered: false
      });
      this.renderVideos();
    }

    app.closeModal('dailyCheckinModal');
    app.showToast('오늘의 수업 종료 일지가 성공적으로 저장되었습니다!', 'success');
  }
};
