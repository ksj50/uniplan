/**
 * Module 1: Graduation Requirement Check (졸업 요건 확인)
 */
const graduationModule = {
  // Requirement Criteria
  requirements: [
    { id: 'total_credits', name: '총 이수 학점', required: '130 학점', current: 102, isMet: false, uncertain: false, note: '28 학점 부족' },
    { id: 'major_credits', name: '전공 필수/선택 학점', required: '54 학점', current: 48, isMet: false, uncertain: false, note: '전공 6 학점 부족' },
    { id: 'ge_credits', name: '교양 필수/선택 학점', required: '30 학점', current: 30, isMet: true, uncertain: false, note: '충족 완료' },
    { id: 'language_score', name: '공인 어학 성적', required: 'TOEIC 800 이상', current: 'TOEIC 850점', isMet: true, uncertain: false, note: '충족 완료' },
    { id: 'capstone', name: '졸업 작품 / 캡스톤', required: '합격 (Pass)', current: '진행 중', isMet: false, uncertain: true, note: '불확실: 최종 심사 필요' },
    { id: 'volunteer_hours', name: '사회봉사 이수 시간', required: '30 시간', current: 20, isMet: false, uncertain: false, note: '10 시간 부족' }
  ],

  init() {
    this.renderRequirementsTable();
    this.renderRecommendations();
  },

  renderRequirementsTable() {
    const tbody = document.querySelector('#gradRequirementsTable tbody');
    if (!tbody) return;

    tbody.innerHTML = this.requirements.map(item => `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>${item.required}</td>
        <td>${item.current} ${typeof item.current === 'number' ? '학점/시간' : ''}</td>
        <td>
          <span class="badge ${item.isMet ? 'badge-success' : 'badge-danger'}">
            ${item.isMet ? '충족 완료' : '미충족'}
          </span>
        </td>
        <td>
          ${item.uncertain ? `
            <span class="badge badge-warning" style="cursor:pointer;" onclick="graduationModule.verifyUncertainItem('${item.id}')">
              <i data-lucide="help-circle"></i> 재확인 필요
            </span>
          ` : '<span class="text-xs text-muted">확인됨</span>'}
        </td>
      </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  renderRecommendations() {
    const container = document.getElementById('unmetRecommendationsList');
    if (!container) return;

    const unmetItems = this.requirements.filter(r => !r.isMet);

    container.innerHTML = unmetItems.map(item => `
      <div class="activity-card" style="margin-bottom: 0.8rem;">
        <div class="activity-main">
          <div class="title" style="color: var(--warning); font-size: 0.95rem;">
            <i data-lucide="alert-circle" style="width:16px; vertical-align:-2px;"></i> ${item.name} 달성 가이드
          </div>
          <div class="summary">${item.note} - 추천 조치 사항:</div>
          <div class="activity-meta">
            ${this.getRecommendationTip(item.id)}
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  getRecommendationTip(id) {
    switch (id) {
      case 'total_credits':
        return '<span>• 다음 학기 계절학기(3학점) + 정규학기(18학점) 수강 권장</span>';
      case 'major_credits':
        return '<span>• [알고리즘응용], [데이터베이스설계] 전공 2과목 이수 필요</span>';
      case 'capstone':
        return '<span>• 캡스톤 지도교수님 서명 및 결과보고서 제출 확인 필요</span>';
      case 'volunteer_hours':
        return '<span>• 교내 봉사 프로그램 (주말 10시간) 신청 가능</span>';
      default:
        return '<span>• 학과 사무실에 이수 내역 재확인</span>';
    }
  },

  dismissAlert() {
    const alertBox = document.getElementById('sixMonthAlert');
    if (alertBox) {
      alertBox.classList.add('hidden');
      app.showToast('성적 및 졸업 요건 정보가 업데이트되었습니다.', 'success');
    }
  },

  verifyUncertainItem(id) {
    const item = this.requirements.find(r => r.id === id);
    if (item) {
      const confirmResult = confirm(`[${item.name}] 정보가 확실하지 않습니다. 학과 사무실에 확인 후 상태를 완료 처리하시겠습니까?`);
      if (confirmResult) {
        item.uncertain = false;
        item.isMet = true;
        item.current = '합격 (확인 완료)';
        this.renderRequirementsTable();
        this.renderRecommendations();
        app.showToast(`[${item.name}] 상태가 충족 완료로 변경되었습니다.`, 'success');
      }
    }
  },

  generate3Plans() {
    const plansSection = document.getElementById('recommendedPlansSection');
    const plansGrid = document.getElementById('recommendedPlansGrid');
    if (!plansSection || !plansGrid) return;

    plansSection.classList.remove('hidden');

    plansGrid.innerHTML = `
      <div class="glass-card">
        <div class="card-header">
          <span class="badge badge-accent">플랜 A</span>
          <h4 style="font-size:1.1rem; font-weight:700;">7학기 조기 졸업 스피드 플랜</h4>
        </div>
        <p class="text-sm text-muted mb-3">계절학기와 최대 수강 학점을 활용하여 1학기 빠르게 졸업하는 플랜입니다.</p>
        <ul style="font-size:0.85rem; padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem; color:var(--text-main);">
          <li>4학년 1학기: 21학점 수강 (전공 15학점 + 교양 6학점)</li>
          <li>여름 계절학기: 6학점 완료</li>
          <li>캡스톤 디자인 조기 제출 및 평가</li>
          <li>어학 성적 및 봉사활동 10시간 방학 중 완료</li>
        </ul>
        <button class="btn btn-sm btn-primary w-full mt-3" onclick="app.showToast('플랜 A가 내 기본 달성 플랜으로 지정되었습니다.', 'success')">이 플랜 선택</button>
      </div>

      <div class="glass-card">
        <div class="card-header">
          <span class="badge badge-success">플랜 B (추천)</span>
          <h4 style="font-size:1.1rem; font-weight:700;">학점 & 대외활동 밸런스 플랜</h4>
        </div>
        <p class="text-sm text-muted mb-3">학업과 대외활동/인턴십을 병행하며 학점을 균형있게 채우는 정석 플랜입니다.</p>
        <ul style="font-size:0.85rem; padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem; color:var(--text-main);">
          <li>4학년 1학기: 15학점 수강 + 대외활동 서포터즈 병행</li>
          <li>4학년 2학기: 13학점 수강 + 캡스톤 최종 수료</li>
          <li>여유있는 스케줄로 취업 코딩테스트 및 면접 대비</li>
        </ul>
        <button class="btn btn-sm btn-gradient w-full mt-3" onclick="app.showToast('플랜 B(추천)가 내 기본 달성 플랜으로 지정되었습니다.', 'success')">이 플랜 선택</button>
      </div>

      <div class="glass-card">
        <div class="card-header">
          <span class="badge badge-warning">플랜 C</span>
          <h4 style="font-size:1.1rem; font-weight:700;">전공 심화 & 연구 중심 플랜</h4>
        </div>
        <p class="text-sm text-muted mb-3">대학원 진학 및 R&D 분야를 목표로 전공 논문 및 심화 과목에 집중하는 플랜입니다.</p>
        <ul style="font-size:0.85rem; padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem; color:var(--text-main);">
          <li>4학년 1학기: 전공 심화 프로젝트 18학점 이수</li>
          <li>연구실 학부 연구생(URP) 참가를 통한 논문 작성</li>
          <li>전공 학점 60학점 초과 달성 목표</li>
        </ul>
        <button class="btn btn-sm btn-primary w-full mt-3" onclick="app.showToast('플랜 C가 내 기본 달성 플랜으로 지정되었습니다.', 'success')">이 플랜 선택</button>
      </div>
    `;

    plansSection.scrollIntoView({ behavior: 'smooth' });
    app.showToast('AI가 분석한 맞춤형 졸업 플랜 3종이 생성되었습니다!', 'info');
  }
};
