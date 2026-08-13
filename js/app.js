/**
 * Master Application Controller & Router (UniPlan)
 */
const app = {
  notifications: [
    { id: 'n1', title: '공강 5분전 알림', message: '월요일 12:00 ~ 13:00 (1시간 공강) 시작 5분전입니다.', time: '방금', isRead: false, type: 'warning' },
    { id: 'n2', title: '과제 마감 12시간 전', message: '[자료구조] 과제 2 마감일이 12시간 남았습니다!', time: '1시간 전', isRead: false, type: 'danger' },
    { id: 'n3', title: '시험 D-3 알림', message: '[자료구조 및 알고리즘] 시험이 3일 후 시작됩니다.', time: '2시간 전', isRead: false, type: 'info' }
  ],

  init() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupNotificationCenter();
    this.setupEventListeners();
    this.requestNotificationPermission();

    // Initialize all modules
    if (window.graduationModule) graduationModule.init();
    if (window.semesterModule) semesterModule.init();
    if (window.examModule) examModule.init();
    if (window.projectsModule) projectsModule.init();
    if (window.adminModule) adminModule.init();
    if (window.studyModeModule) studyModeModule.init();

    this.renderNotifications();
    this.checkOnboarding();
    console.log('UniPlan Application Initialized Successfully.');
  },

  checkOnboarding() {
    const saved = localStorage.getItem('uniplan_user_profile');
    if (!saved) {
      setTimeout(() => {
        this.openOnboardingModal();
      }, 600);
    } else {
      try {
        const profile = JSON.parse(saved);
        this.applyUserProfile(profile);
      } catch (e) {
        console.error('Profile load error:', e);
      }
    }
  },

  currentOnboardStep: 1,

  goToOnboardStep(stepNum) {
    this.currentOnboardStep = stepNum;
    const step1 = document.getElementById('onboardStep1');
    const step2 = document.getElementById('onboardStep2');
    const bar1 = document.getElementById('onboardStep1Bar');
    const bar2 = document.getElementById('onboardStep2Bar');
    const sub = document.getElementById('onboardStepSub');

    if (stepNum === 1) {
      if (step1) step1.classList.remove('hidden');
      if (step2) step2.classList.add('hidden');
      if (bar1) bar1.style.background = 'var(--primary)';
      if (bar2) bar2.style.background = 'var(--border-color)';
      if (sub) sub.innerText = '1/2단계: 프로필 기본 정보 설정';
    } else {
      if (step1) step1.classList.add('hidden');
      if (step2) step2.classList.remove('hidden');
      if (bar1) bar1.style.background = 'var(--primary)';
      if (bar2) bar2.style.background = 'var(--primary)';
      if (sub) sub.innerText = '2/2단계: 내 졸업 요건 및 취득 상태 입력';
    }
    if (window.lucide) lucide.createIcons();
  },

  skipOnboarding() {
    this.closeModal('onboardingModal');
    const defaultProfile = { name: '김대학', univ: '동국대학교', grade: '3학년', major: '컴퓨터공학과', onboarded: true };
    localStorage.setItem('uniplan_user_profile', JSON.stringify(defaultProfile));
    this.applyUserProfile(defaultProfile);
    this.showToast('기본 설정으로 플래너를 시작합니다. 언제든지 사이드바 프로필이나 [1. 졸업 요건 확인] 메뉴에서 수정하실 수 있습니다.', 'info');
  },

  openOnboardingModal() {
    this.goToOnboardStep(1);
    const modal = document.getElementById('onboardingModal');
    if (modal) modal.classList.remove('hidden');

    const saved = localStorage.getItem('uniplan_user_profile');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (document.getElementById('onboardName')) document.getElementById('onboardName').value = p.name || '';
        if (document.getElementById('onboardUniv')) document.getElementById('onboardUniv').value = p.univ || '동국대학교';
        if (document.getElementById('onboardGrade')) document.getElementById('onboardGrade').value = p.grade || '3학년';
        if (document.getElementById('onboardMajor')) document.getElementById('onboardMajor').value = p.major || '컴퓨터공학과';
      } catch (e) {}
    }
    if (window.lucide) lucide.createIcons();
  },

  handleOnboardUnivChange(val) {
    const customInput = document.getElementById('onboardCustomUniv');
    if (val === 'custom') {
      if (customInput) customInput.classList.remove('hidden');
    } else {
      if (customInput) customInput.classList.add('hidden');
    }
  },

  saveOnboardingProfile() {
    const nameEl = document.getElementById('onboardName');
    const univSelect = document.getElementById('onboardUniv');
    const customUnivEl = document.getElementById('onboardCustomUniv');
    const gradeEl = document.getElementById('onboardGrade');
    const majorEl = document.getElementById('onboardMajor');

    const name = nameEl ? nameEl.value.trim() : '김대학';
    let univ = univSelect ? univSelect.value : '동국대학교';
    if (univ === 'custom') {
      univ = customUnivEl && customUnivEl.value.trim() ? customUnivEl.value.trim() : '직접입력대학교';
    }
    const grade = gradeEl ? gradeEl.value : '3학년';
    const major = majorEl ? majorEl.value.trim() : '컴퓨터공학과';

    if (!name) {
      this.showToast('이름을 입력해 주세요!', 'warning');
      return;
    }
    if (!major) {
      this.showToast('전공/학과를 입력해 주세요!', 'warning');
      return;
    }

    // Save Step 2 Graduation Requirements if entered
    const reqTotal = document.getElementById('onboardReqTotalCredits') ? parseInt(document.getElementById('onboardReqTotalCredits').value) || 130 : 130;
    const reqAcquired = document.getElementById('onboardAcquiredTotalCredits') ? parseInt(document.getElementById('onboardAcquiredTotalCredits').value) || 75 : 75;
    const reqMajor = document.getElementById('onboardReqMajorCredits') ? parseInt(document.getElementById('onboardReqMajorCredits').value) || 60 : 60;
    const reqGeneral = document.getElementById('onboardReqGeneralCredits') ? parseInt(document.getElementById('onboardReqGeneralCredits').value) || 30 : 30;
    const reqLang = document.getElementById('onboardReqLang') ? document.getElementById('onboardReqLang').value : 'TOEIC 750점 이상';
    const reqVolunteer = document.getElementById('onboardReqVolunteer') ? document.getElementById('onboardReqVolunteer').value : '30시간 이상';

    if (window.graduationModule) {
      graduationModule.requirements.totalCredits = reqTotal;
      graduationModule.requirements.majorCredits = reqMajor;
      graduationModule.requirements.generalCredits = reqGeneral;
      graduationModule.requirements.language = reqLang;
      graduationModule.requirements.volunteer = reqVolunteer;
      graduationModule.userStatus.totalCredits = reqAcquired;
      if (typeof graduationModule.renderGraduationTable === 'function') {
        graduationModule.renderGraduationTable();
      }
    }

    const profile = { name, univ, grade, major, reqTotal, reqAcquired, onboarded: true };
    localStorage.setItem('uniplan_user_profile', JSON.stringify(profile));

    this.applyUserProfile(profile);
    this.closeModal('onboardingModal');
    this.showToast(`[${name}]님 환영합니다! ${univ} ${major} ${grade} & 졸업 요건 설정이 완료되었습니다.`, 'success');
  },

  applyUserProfile(p) {
    if (!p) return;
    const avatarEl = document.getElementById('userProfileAvatar');
    const nameEl = document.getElementById('userProfileName');
    const badgeEl = document.getElementById('userUnivProfileBadge');

    if (avatarEl) avatarEl.innerText = p.name ? p.name.substring(0, 2) : '김대';
    if (nameEl) nameEl.innerText = `${p.name} 학생`;
    if (badgeEl) badgeEl.innerText = `${p.univ} ${p.major} ${p.grade}`;

    // Sync with university maps and dropdowns
    if (window.projectsModule && p.univ) {
      const select = document.getElementById('userUniversitySelect');
      if (select) select.value = p.univ;
      projectsModule.setUniversity(p.univ);
    }
  },

  requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.showToast('휴대폰 푸시 알림 권한이 허용되었습니다! (수업, 과제, 시험 알림 수신)', 'success');
          }
        });
      }, 2000);
    }
  },

  sendNativeNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, { body: body });
      } catch (e) {
        console.log('Native notification error:', e);
      }
    }
  },

  toggleMobileNav() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('hidden');
  },

  setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = btn.getAttribute('data-view');
        this.navigateTo(viewId);
      });
    });
  },

  navigateTo(viewId) {
    // Close mobile drawer on item selection
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.add('hidden');

    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
    });

    // Update active section view
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSec = document.getElementById(`view-${viewId}`);
    if (targetSec) {
      targetSec.classList.add('active');
    }

    // Update Top Header titles
    const titleMap = {
      dashboard: { title: '통합 대시보드', sub: '오늘의 주요 수업 일정, 과제 마감, 시험 D-Day 및 알림 현황' },
      graduation: { title: '1. 졸업 요건 확인', sub: '총 이수학점, 전공/교양 기준 및 충족 여부 분석 & AI 추천 3플랜' },
      semester: { title: '2. 학기중 알림 & 시간표', sub: '수업/연강/공강 5분전 자동 알림, 과제 24h/12h/6h/1h 마감 및 영상강의 관리' },
      exam: { title: '3. 시험 기간 & 회독 노트', sub: '시험 D-Day 카운트다운,과목별 N회독 체크 및 사진 노트 PDF 자동 변환' },
      extracurricular: { title: '4. 대외 활동 매니저', sub: '공모전, 서포터즈 AI 정보 파싱, 관심도/마감순 정렬 & 4자리 PIN 팀 룸' },
      teamproject: { title: '5. 교내 팀프로젝트', sub: '공통 회의 시간 자동 계산, 교내/외부 중간지점 지도 추천, 1:1/단체대화 및 갤러리' },
      studymode: { title: '6. ✈️ 비행기 공부 모드', sub: '비행기 창밖 풍경, 기내 엔진 백색소음, 뽀모도로 타이머 & 실시간 항로 지도' },
      admin: { title: '7. 관리자 & 보안 센터', sub: '서비스 이용 통계, 1:1 문의 메세지 관리 및 유료 API 보안 키 암호화 래퍼' }
    };

    const info = titleMap[viewId] || titleMap.dashboard;
    document.getElementById('pageTitle').innerText = info.title;
    document.getElementById('pageSubtitle').innerText = info.sub;

    if (viewId === 'teamproject' && window.projectsModule) {
      setTimeout(() => projectsModule.initMapIfNeeded(), 300);
    }

    if (viewId === 'studymode' && window.studyModeModule) {
      setTimeout(() => {
        studyModeModule.initFlightMap();
      }, 250);
    }
  },

  setupThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      document.body.classList.toggle('dark-theme');
      const isLight = document.body.classList.contains('light-theme');
      document.querySelector('.theme-label').innerText = isLight ? '라이트 모드' : '다크 모드';
      this.showToast(`${isLight ? '라이트' : '다크'} 모드로 변경되었습니다.`, 'info');
    });
  },

  setupNotificationCenter() {
    const bellBtn = document.getElementById('notifBellBtn');
    const dropdown = document.getElementById('notifDropdown');
    const clearBtn = document.getElementById('clearNotifBtn');

    if (bellBtn && dropdown) {
      bellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.notifications.forEach(n => n.isRead = true);
        this.renderNotifications();
        this.showToast('모든 알림을 읽음 처리했습니다.', 'info');
      });
    }
  },

  renderNotifications() {
    const badge = document.getElementById('notifBadge');
    const countEl = document.getElementById('notifCount');
    const listEl = document.getElementById('notifList');

    if (!badge || !listEl) return;

    const unread = this.notifications.filter(n => !n.isRead).length;
    badge.innerText = unread;
    if (countEl) countEl.innerText = unread;

    if (unread === 0) {
      badge.classList.add('hidden');
    } else {
      badge.classList.remove('hidden');
    }

    listEl.innerHTML = this.notifications.map(n => `
      <div class="activity-card mb-2" style="background:rgba(0,0,0,0.2); padding:0.6rem 0.8rem; border-left:3px solid var(--${n.type || 'primary'}); ${n.isRead ? 'opacity:0.6;' : ''}">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:0.8rem;">${n.title}</strong>
          <span class="text-xs text-muted">${n.time}</span>
        </div>
        <div style="font-size:0.75rem; margin-top:0.2rem; color:var(--text-muted);">${n.message}</div>
      </div>
    `).join('');
  },

  setupEventListeners() {
    const helpBtn = document.getElementById('helpInquiryBtn');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => this.openModal('inquiryModal'));
    }

    const checkinBtn = document.getElementById('triggerCheckinBtn');
    if (checkinBtn) {
      checkinBtn.addEventListener('click', () => this.openModal('dailyCheckinModal'));
    }
  },

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('hidden');
      const todayStr = new Date().toISOString().split('T')[0];
      if (id === 'addAssignmentModal') {
        const dateInput = document.getElementById('newAssignDate');
        if (dateInput && !dateInput.value) dateInput.value = todayStr;
      } else if (id === 'addExamModal') {
        const dateInput = document.getElementById('newExamDate');
        if (dateInput && !dateInput.value) dateInput.value = todayStr;
      }
    }
  },

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
  },

  submitUserInquiry() {
    const categorySelect = document.getElementById('inquiryCategory');
    const titleInput = document.getElementById('inquiryTitle');
    const contentInput = document.getElementById('inquiryContent');

    if (!titleInput.value.trim() || !contentInput.value.trim()) {
      this.showToast('문의 제목과 내용을 모두 입력해 주세요.', 'warning');
      return;
    }

    if (window.adminModule) {
      adminModule.inquiries.unshift({
        id: 'inq' + Date.now(),
        user: '김대학(나)',
        dept: '컴퓨터공학과',
        category: categorySelect.options[categorySelect.selectedIndex].text,
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        date: new Date().toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        status: '대기 중'
      });
      adminModule.renderInquiries();
    }

    titleInput.value = '';
    contentInput.value = '';
    this.closeModal('inquiryModal');
    this.showToast('관리자에게 문의 메시지가 성공적으로 전송되었습니다!', 'success');
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = `var(--${type === 'danger' ? 'danger' : type === 'warning' ? 'warning' : type === 'success' ? 'success' : 'primary'})`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'danger') iconName = 'alert-octagon';

    toast.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Bootstrap application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
