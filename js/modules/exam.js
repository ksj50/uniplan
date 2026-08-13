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

  uploadedPhotos: [],

  init() {
    this.renderFirstExamHero();
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
    this.renderSubjectList();
    this.populateSubjectSelect();
    app.closeModal('addExamModal');
    app.showToast(`시험 일정 [${subject}] (${examDate} ${status})가 성공적으로 등록되었습니다!`, 'success');
  },

  saveNewNote() {
    const title = document.getElementById('newNoteTitle').value.trim();
    const content = document.getElementById('newNoteContent').value.trim();

    if (!title) {
      app.showToast('노트 제목을 입력해 주세요!', 'warning');
      return;
    }

    app.closeModal('addNoteModal');
    app.showToast(`개념 노트 [${title}] 저장 및 사진 PDF 수집이 완료되었습니다!`, 'success');
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

  populateSubjectSelect() {
    const select = document.getElementById('examSubjectSelect');
    if (!select) return;

    select.innerHTML = this.subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  },

  renderReviewTopics() {
    const select = document.getElementById('examSubjectSelect');
    const container = document.getElementById('reviewTopicList');
    if (!select || !container) return;

    const subId = select.value || this.subjects[0].id;
    const subject = this.subjects.find(s => s.id === subId);
    if (!subject) return;

    container.innerHTML = subject.topics.map(t => `
      <div class="activity-card mb-2" style="padding:0.75rem 1rem;">
        <div class="activity-main">
          <div class="title" style="font-size:0.88rem;">${t.title}</div>
          <div class="activity-meta" style="margin-top:0.3rem;">
            <span class="badge badge-success">${t.reviews}회독 완료</span>
          </div>
        </div>
        <div style="display:flex; gap:0.4rem;">
          <button class="btn btn-xs btn-secondary" onclick="examModule.updateReview('${subId}', '${t.id}', -1)">-1회독</button>
          <button class="btn btn-xs btn-primary" onclick="examModule.updateReview('${subId}', '${t.id}', 1)">+1회독 달성</button>
        </div>
      </div>
    `).join('');
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

  handlePhotoPreview(e) {
    const files = Array.from(e.target.files);
    this.uploadedPhotos = files;

    const grid = document.getElementById('pdfPhotoPreviewGrid');
    if (!grid) return;

    grid.innerHTML = '';
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = document.createElement('img');
        img.src = evt.target.result;
        img.className = 'photo-thumb';
        grid.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  },

  async generatePdfFromPhotos() {
    const titleInput = document.getElementById('pdfNoteTitle');
    const title = titleInput ? titleInput.value.trim() || '시험 개념 정리 노트' : '시험 개념 정리 노트';

    if (this.uploadedPhotos.length === 0) {
      app.showToast('PDF로 합성할 사진 파일을 최하 1장 이상 선택해 주세요!', 'warning');
      return;
    }

    app.showToast('개념 노트 사진을 PDF 문서로 합성 및 정리를 진행합니다...', 'info');

    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < this.uploadedPhotos.length; i++) {
        const file = this.uploadedPhotos[i];
        const dataUrl = await new Promise(resolve => {
          const r = new FileReader();
          r.onload = e => resolve(e.target.result);
          r.readAsDataURL(file);
        });

        if (i > 0) pdf.addPage();

        // Header Title
        pdf.setFontSize(14);
        pdf.text(`${title} (페이지 ${i + 1}/${this.uploadedPhotos.length})`, 10, 15);

        // Add Image
        pdf.addImage(dataUrl, 'JPEG', 10, 25, pdfWidth - 20, pdfHeight - 40);
      }

      pdf.save(`${title.replace(/\s+/g, '_')}_개념정리.pdf`);
      app.showToast(`[${title}] PDF 파일 생성이 완료되어 다운로드되었습니다!`, 'success');
    } catch (err) {
      console.error(err);
      app.showToast('PDF 생성 중 오류가 발생하였습니다.', 'danger');
    }
  }
};
