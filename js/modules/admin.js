/**
 * Module 6: Additional Features - Admin Portal & Security Vault
 */
const adminModule = {
  adminPassword: '0154',
  isAuthenticated: false,
  usageChart: null,
  activityChart: null,

  inquiries: [
    { id: 'inq1', user: '김대학', dept: '컴퓨터공학과', category: '졸업 요건', title: '사회봉사 이수 시간 자동 연동 질문', content: '교내 봉사활동 20시간을 이수했는데 30시간으로 업데이트하는 방법을 알려주세요.', date: '2026-08-13 10:15', status: '대기 중' },
    { id: 'inq2', user: '이철수', dept: '기계공학과', category: '알림 오류', title: '시험 기간 카운트다운 알림 수신 시각', content: '시험 15시간 전 알림이 정시에 오는지 확인 부탁드립니다.', date: '2026-08-12 18:40', status: '대기 중' },
    { id: 'inq3', user: '박영희', dept: '경영학과', category: '팀프로젝트', title: '4자리 PIN 방 변경 기능 요청', content: '팀장이 방 PIN을 잊었을 때 재설정할 수 있나요?', date: '2026-08-11 14:02', status: '처리 완료' }
  ],

  init() {
    this.renderInquiries();
  },

  login() {
    const input = document.getElementById('adminPasswordInput');
    const err = document.getElementById('adminAuthErr');
    const overlay = document.getElementById('adminAuthOverlay');
    const portal = document.getElementById('adminPortalContent');

    if (!input) return;

    if (input.value === this.adminPassword) {
      this.isAuthenticated = true;
      overlay.classList.add('hidden');
      portal.classList.remove('hidden');
      if (err) err.classList.add('hidden');

      this.renderCharts();
      this.renderInquiries();
      app.showToast('관리자 인증에 성공하였습니다. 보안 가독 모드로 진입합니다.', 'success');
    } else {
      if (err) err.classList.remove('hidden');
      app.showToast('관리자 비밀번호가 일치하지 않습니다.', 'danger');
    }
  },

  logout() {
    this.isAuthenticated = false;
    document.getElementById('adminAuthOverlay').classList.remove('hidden');
    document.getElementById('adminPortalContent').classList.add('hidden');
    const pwdInput = document.getElementById('adminPasswordInput');
    if (pwdInput) pwdInput.value = '';
    app.showToast('관리자 세션이 종료되었습니다.', 'info');
  },

  changePassword() {
    const current = prompt('현재 관리자 비밀번호를 입력하세요:');
    if (current === this.adminPassword) {
      const next = prompt('새 관리자 비밀번호를 입력하세요:');
      if (next && next.trim()) {
        this.adminPassword = next.trim();
        app.showToast('관리자 비밀번호가 새로 변경되었습니다.', 'success');
      }
    } else {
      app.showToast('현재 비밀번호가 일치하지 않습니다.', 'danger');
    }
  },

  renderInquiries() {
    const container = document.getElementById('adminInquiryList');
    const badge = document.getElementById('inquiryBadgeCount');
    if (!container) return;

    const pending = this.inquiries.filter(i => i.status === '대기 중').length;
    if (badge) badge.innerText = `${pending}건 대기 중`;

    container.innerHTML = this.inquiries.map(i => `
      <div class="activity-card mb-3" style="border-left: 4px solid ${i.status === '대기 중' ? 'var(--warning)' : 'var(--success)'};">
        <div class="activity-main">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="title" style="font-size:0.9rem;">[${i.category}] ${i.title}</div>
            <span class="badge ${i.status === '대기 중' ? 'badge-warning' : 'badge-success'}">${i.status}</span>
          </div>
          <div class="summary" style="margin:0.3rem 0;">작성자: ${i.user} (${i.dept}) | ${i.date}</div>
          <div style="font-size:0.8rem; color:var(--text-main); background:rgba(0,0,0,0.2); padding:0.6rem; border-radius:var(--radius-sm); margin-top:0.4rem;">
            ${i.content}
          </div>
          <div class="activity-meta mt-2">
            ${i.status === '대기 중' ? `
              <button class="btn btn-xs btn-primary" onclick="adminModule.replyInquiry('${i.id}')">답변 및 완결</button>
            ` : '<span class="text-xs text-muted"><i data-lucide="check"></i> 답변 처리 완료</span>'}
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  replyInquiry(id) {
    const inq = this.inquiries.find(i => i.id === id);
    if (inq) {
      const reply = prompt(`[${inq.user}] 님에게 전달할 답변 메세지를 입력하세요:`);
      if (reply && reply.trim()) {
        inq.status = '처리 완료';
        this.renderInquiries();
        app.showToast(`[${inq.user}] 님의 문의 메세지에 답변 발송이 완료되었습니다.`, 'success');
      }
    }
  },

  renderCharts() {
    if (!window.Chart) return;

    // Chart 1: Service Usage Metrics
    const ctx1 = document.getElementById('usageStatsChart');
    if (ctx1) {
      if (this.usageChart) this.usageChart.destroy();
      this.usageChart = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['졸업 요건 확인', '학기중 알림', '시험기간 D-Day', '대외활동 매니저', '팀프로젝트 룸'],
          datasets: [{
            label: '월간 기능 이용 횟수',
            data: [3420, 8910, 6540, 4120, 7890],
            backgroundColor: [
              'rgba(99, 102, 241, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(239, 68, 68, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(16, 185, 129, 0.7)'
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      });
    }

    // Chart 2: Daily Active Student Trend
    const ctx2 = document.getElementById('userActivityChart');
    if (ctx2) {
      if (this.activityChart) this.activityChart.destroy();
      this.activityChart = new Chart(ctx2, {
        type: 'line',
        data: {
          labels: ['8/7', '8/8', '8/9', '8/10', '8/11', '8/12', '8/13'],
          datasets: [{
            label: '일간 활성 사용자 (DAU)',
            data: [820, 890, 950, 1100, 1050, 1210, 1248],
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      });
    }
  },

  toggleApiKeyVisibility(btn) {
    const input = btn.previousElementSibling;
    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerText = '숨기기';
      } else {
        input.type = 'password';
        btn.innerText = '확인';
      }
    }
  }
};
