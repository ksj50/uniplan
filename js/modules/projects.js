/**
 * Module 4 & 5: Extracurricular Activity & Campus Team Project Services
 */
const projectsModule = {
  // Extracurricular Activities list
  activities: [
    {
      id: 'ext1',
      category: 'contest_out',
      categoryLabel: '공모전(교외)',
      title: '2026 전국 대학생 공공데이터 AI 활용 앱 공모전',
      summary: '행정안전부 주관 공공데이터 및 생성형 AI 기반 웹/앱 서비스 개발',
      startDate: '2026-08-01',
      deadline: '2026-08-25',
      interest: 5,
      memberType: 'team',
      memberCount: 4,
      pin: '7788',
      url: 'https://competition.gov.kr/ai-2026'
    },
    {
      id: 'ext2',
      category: 'contest_in',
      categoryLabel: '공모전(교내)',
      title: '교내 캡스톤 산학협력 아이디어 경진대회',
      summary: '컴퓨터공학과 & 산업체 연계 산학 과제 캡스톤 아이디어 발표회',
      startDate: '2026-08-10',
      deadline: '2026-08-20',
      interest: 4,
      memberType: 'team',
      memberCount: 3,
      pin: '1234',
      url: 'https://cs.univ.ac.kr/contest/102'
    },
    {
      id: 'ext3',
      category: 'supporters',
      categoryLabel: '서포터즈',
      title: '카카오 테크 캠퍼스 대학생 서포터즈 4기',
      summary: '대학생 개발 지망생 대상 기술 블로그 작성 및 멘토링 프로그램',
      startDate: '2026-08-05',
      deadline: '2026-08-30',
      interest: 5,
      memberType: 'individual',
      memberCount: 1,
      pin: null,
      url: 'https://tech.kakao.com/supporters'
    }
  ],

  // Active Team Project Room State
  activeRoom: {
    id: 'room1',
    title: '컴퓨터공학 산학협력 Capstone Project',
    type: '교내 팀플',
    pin: '7788',
    members: ['김대학(나)', '이철수', '박영희', '정민우'],
    todos: [
      { id: 'td1', title: '프로젝트 요구사항 정의서 작성', assignee: '김대학(나)', priority: 'high', done: true },
      { id: 'td2', title: 'Leaflet 지도 API 연동 및 중간지점 산출 로직 구현', assignee: '이철수', priority: 'urgent', done: false },
      { id: 'td3', title: 'UI Glassmorphic CSS 스타일링 가이드 적용', assignee: '박영희', priority: 'medium', done: false },
      { id: 'td4', title: '팀 회의록 정리 및 주간 개발 보고서 공유', assignee: '정민우', priority: 'low', done: false }
    ],
    sharedLinks: [
      { id: 'l1', name: 'OpenAPI 공공데이터 명세서', url: 'https://data.go.kr/spec/1500', sender: '이철수', date: '2026-08-12 14:20' },
      { id: 'l2', name: 'UI Figma 와이어프레임 초안', url: 'https://figma.com/file/uniplan-v2', sender: '박영희', date: '2026-08-13 11:05' }
    ],
    chatChannels: [
      { id: 'ch_all', name: '# 전체 그룹 대화방', isGroup: true },
      { id: 'ch_dm1', name: '1:1 대화: 이철수', isGroup: false },
      { id: 'ch_dm2', name: '1:1 대화: 박영희', isGroup: false },
      { id: 'ch_dev', name: '# 개발 커스텀 대화방', isGroup: true }
    ],
    activeChannelId: 'ch_all',
    messages: [
      { sender: '이철수', text: '안녕하세요! 다들 오늘 저녁 회의 진행 가능한가요?', time: '14:10', isMine: false },
      { sender: '박영희', text: '네 저는 18시 이후 가능합니다!', time: '14:12', isMine: false },
      { sender: '김대학(나)', text: '좋습니다. 공통 가능 시간 확인해보고 모임 장소도 정해봐요.', time: '14:15', isMine: true }
    ],
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', uploader: '박영희', date: '2026-08-12' },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400', uploader: '김대학(나)', date: '2026-08-13' }
    ],
    deadlines: [
      { id: 'dl1', title: '산학 과제 중간 점검 보고서', date: '2026-08-20', time: '18:00', type: 'midterm', assignee: '김대학, 이철수' },
      { id: 'dl2', title: 'UI 프로토타입 팀원 피드백 회의', date: '2026-08-25', time: '15:00', type: 'meeting', assignee: '전체 팀원' },
      { id: 'dl3', title: '최종 캡스톤 결과물 코드 및 발표자료 제출', date: '2026-08-30', time: '23:59', type: 'final', assignee: '전체 팀원' }
    ],
    memberSchedules: {
      '김대학(나)': ['mon-13', 'mon-14', 'wed-14', 'wed-15', 'wed-16', 'wed-17', 'thu-18', 'thu-19', 'thu-20', 'fri-14', 'fri-15'],
      '이철수': ['mon-10', 'mon-11', 'wed-16', 'wed-17', 'thu-18', 'thu-19', 'thu-20', 'fri-16', 'fri-17'],
      '박영희': ['tue-10', 'tue-11', 'wed-15', 'wed-16', 'wed-17', 'thu-18', 'thu-19', 'thu-20', 'sat-14', 'sat-15'],
      '정민우': ['mon-13', 'mon-14', 'wed-16', 'wed-17', 'thu-17', 'thu-18', 'thu-19', 'thu-20', 'fri-14', 'fri-15']
    },
    currentAvailMember: '김대학(나)'
  },

  universityCoords: {
    '동국대학교': { lat: 37.5580, lng: 126.9984, name: '동국대학교 (서울)' },
    '서울대학교': { lat: 37.4598, lng: 126.9519, name: '서울대학교 (관악)' },
    '연세대학교': { lat: 37.5657, lng: 126.9385, name: '연세대학교 (신촌)' },
    '고려대학교': { lat: 37.5908, lng: 127.0278, name: '고려대학교 (안암)' },
    '한국항공대학교': { lat: 37.6006, lng: 126.8647, name: '한국항공대학교 (고양)' },
    '건국대학교': { lat: 37.5408, lng: 127.0793, name: '건국대학교 (서울)' },
    '서울과학기술대학교': { lat: 37.6317, lng: 127.0774, name: '서울과학기술대학교 (노원)' },
    '홍익대학교': { lat: 37.5508, lng: 126.9255, name: '홍익대학교 (마포)' },
    '성균관대학교': { lat: 37.5882, lng: 126.9936, name: '성균관대학교 (명륜)' },
    '한양대학교': { lat: 37.5572, lng: 127.0453, name: '한양대학교 (서울)' },
    '경희대학교': { lat: 37.5962, lng: 127.0525, name: '경희대학교 (서울)' },
    '서강대학교': { lat: 37.5509, lng: 126.9410, name: '서강대학교 (마포)' },
    '중앙대학교': { lat: 37.5050, lng: 126.9570, name: '중앙대학교 (흑석)' },
    'KAIST': { lat: 36.3741, lng: 127.3603, name: 'KAIST (대전)' },
    'POSTECH': { lat: 36.0142, lng: 129.3257, name: 'POSTECH (포항)' }
  },
  currentUniversity: '동국대학교',

  memberLocations: [
    { id: 1, name: '한국항공대', lat: 37.6006, lng: 126.8647, isVerified: true },
    { id: 2, name: '단국대', lat: 37.3218, lng: 127.1265, isVerified: true },
    { id: 3, name: '경희대 국제캠', lat: 37.2479, lng: 127.0784, isVerified: true }
  ],
  verifyingMemberIdx: null,
  tempMemberCoords: null,
  tempMemberMarker: null,
  memberMapClickHandler: null,

  activeCategory: 'all',
  activeSort: 'deadline',
  leafletMap: null,
  mapMarkers: [],

  init() {
    this.renderActivityCards();
    this.renderActivityCalendar();
    this.renderTeamRoomWorkspace();
    this.renderMemberLocInputs();
    this.initPinInputs();
  },

  onUniversityChange(val) {
    const inputBox = document.getElementById('customUnivInputBox');
    if (val === 'custom') {
      if (inputBox) inputBox.classList.remove('hidden');
    } else {
      if (inputBox) inputBox.classList.add('hidden');
      this.setUniversity(val);
    }
  },

  tempCustomCoords: null,
  tempMarker: null,
  mapClickHandler: null,

  startCustomUnivVerification() {
    const input = document.getElementById('customUnivName');
    if (!input || !input.value.trim()) {
      app.showToast('학교명을 입력해 주세요!', 'warning');
      return;
    }
    const name = input.value.trim();

    this.initMapIfNeeded();
    if (!this.leafletMap) return;

    // Preset lookup table for quick geocoding simulation
    const presets = {
      '부산대학교': { lat: 35.2332, lng: 129.0794 },
      '인하대학교': { lat: 37.4500, lng: 126.6535 },
      '경북대학교': { lat: 35.8906, lng: 128.6121 },
      '전북대학교': { lat: 35.8468, lng: 127.1293 },
      '충남대학교': { lat: 36.3665, lng: 127.3444 },
      '전남대학교': { lat: 35.1767, lng: 126.9056 },
      '가천대학교': { lat: 37.4506, lng: 127.1298 },
      '아주대학교': { lat: 37.2831, lng: 127.0465 }
    };

    const initialCoord = presets[name] || { lat: 37.5580, lng: 126.9984 };
    this.tempCustomCoords = { lat: initialCoord.lat, lng: initialCoord.lng, name: name };

    // Display verification bar
    const bar = document.getElementById('univConfirmBar');
    const label = document.getElementById('verifyingUnivName');
    if (bar) bar.classList.remove('hidden');
    if (label) label.innerText = name;

    // Center map and render temporary verification pin
    this.leafletMap.setView([initialCoord.lat, initialCoord.lng], 16);

    // Clear previous markers
    this.mapMarkers.forEach(m => this.leafletMap.removeLayer(m));
    this.mapMarkers = [];

    if (this.tempMarker) this.leafletMap.removeLayer(this.tempMarker);

    this.tempMarker = L.marker([initialCoord.lat, initialCoord.lng], { draggable: true }).addTo(this.leafletMap)
      .bindPopup(`<b>[위치 확인] ${name}</b><br>마커를 드래그하거나 지도를 클릭하여 정확한 위치로 지정하세요!`)
      .openPopup();

    // Enable drag listener
    this.tempMarker.on('dragend', (evt) => {
      const pos = evt.target.getLatLng();
      this.tempCustomCoords.lat = pos.lat;
      this.tempCustomCoords.lng = pos.lng;
      app.showToast(`[${name}] 위치 마커가 이동되었습니다.`, 'info');
    });

    // Remove existing click handler if any
    if (this.mapClickHandler) this.leafletMap.off('click', this.mapClickHandler);

    // Enable map click listener
    this.mapClickHandler = (evt) => {
      const lat = evt.latlng.lat;
      const lng = evt.latlng.lng;
      this.tempCustomCoords.lat = lat;
      this.tempCustomCoords.lng = lng;
      if (this.tempMarker) {
        this.tempMarker.setLatLng([lat, lng]);
        this.tempMarker.openPopup();
      }
      app.showToast(`[${name}] 지도 클릭 지점으로 위치가 설정되었습니다.`, 'info');
    };

    this.leafletMap.on('click', this.mapClickHandler);

    app.showToast(`[${name}]의 지도 위치를 확인하세요. 지도를 클릭하거나 마커를 드래그하여 정확히 맞춘 후 [이 위치로 최종 저장]을 누르세요.`, 'info');
  },

  confirmCustomUnivLocation() {
    if (!this.tempCustomCoords || !this.tempCustomCoords.name) return;

    const name = this.tempCustomCoords.name;
    this.universityCoords[name] = {
      lat: this.tempCustomCoords.lat,
      lng: this.tempCustomCoords.lng,
      name: name
    };

    // Clean up temporary handlers
    if (this.mapClickHandler && this.leafletMap) {
      this.leafletMap.off('click', this.mapClickHandler);
      this.mapClickHandler = null;
    }
    if (this.tempMarker && this.leafletMap) {
      this.leafletMap.removeLayer(this.tempMarker);
      this.tempMarker = null;
    }

    const bar = document.getElementById('univConfirmBar');
    if (bar) bar.classList.add('hidden');

    // Add to select options if not present
    const select = document.getElementById('userUniversitySelect');
    if (select) {
      const existing = Array.from(select.options).find(opt => opt.value === name);
      if (!existing) {
        const newOpt = document.createElement('option');
        newOpt.value = name;
        newOpt.innerText = `${name} (커스텀 설정)`;
        select.insertBefore(newOpt, select.querySelector('option[value="custom"]'));
      }
      select.value = name;
    }

    const inputBox = document.getElementById('customUnivInputBox');
    if (inputBox) inputBox.classList.add('hidden');

    this.setUniversity(name);
    app.showToast(`[${name}]의 위치가 검증 및 성공적으로 추가 저장되었습니다!`, 'success');
  },

  cancelCustomUnivVerification() {
    if (this.mapClickHandler && this.leafletMap) {
      this.leafletMap.off('click', this.mapClickHandler);
      this.mapClickHandler = null;
    }
    if (this.tempMarker && this.leafletMap) {
      this.leafletMap.removeLayer(this.tempMarker);
      this.tempMarker = null;
    }

    const bar = document.getElementById('univConfirmBar');
    if (bar) bar.classList.add('hidden');

    this.tempCustomCoords = null;
    this.updateCampusPlace();
    app.showToast('학교 위치 검증이 취소되었습니다.', 'info');
  },

  setUniversity(univName) {
    this.currentUniversity = univName;
    const badge = document.getElementById('currentUnivBadge');
    if (badge) badge.innerHTML = `<i data-lucide="map-pin"></i> ${univName} 캠퍼스 중심 표시 중`;

    const profileBadge = document.getElementById('userUnivProfileBadge');
    if (profileBadge) profileBadge.innerText = `${univName} 컴퓨터공학과`;

    app.showToast(`소속 학교가 [${univName}](으)로 설정되어 지도가 이동되었습니다!`, 'success');
    this.setLocationType('campus');
    if (window.lucide) lucide.createIcons();
  },

  renderMemberLocInputs() {
    const container = document.getElementById('memberLocInputsContainer');
    if (!container) return;

    container.innerHTML = this.memberLocations.map((m, idx) => `
      <div class="member-loc-card" style="display:flex; align-items:center; gap:0.6rem; background:rgba(0,0,0,0.25); padding:0.5rem 0.8rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <span style="font-weight:700; font-size:0.8rem; min-width:55px; color:var(--text-main);">팀원 ${idx + 1}:</span>
        <input type="text" class="form-control form-control-sm member-loc-input" value="${m.name}" placeholder="학교/출발지 입력 (예: 경희대 국제캠)" onchange="projectsModule.updateMemberLocName(${idx}, this.value)" style="flex:1;">
        <span class="badge ${m.isVerified ? 'badge-success' : 'badge-warning'}" style="white-space:nowrap; font-size:0.75rem;">
          ${m.isVerified ? '<i data-lucide="check"></i> 위치 확정됨' : '미확정'}
        </span>
        <button class="btn btn-xs ${m.isVerified ? 'btn-secondary' : 'btn-primary'}" style="white-space:nowrap;" onclick="projectsModule.startMemberLocVerification(${idx})">
          <i data-lucide="map-pin"></i> 지도에서 위치 조율
        </button>
        ${this.memberLocations.length > 2 ? `<button class="btn btn-xs btn-outline-danger" title="팀원 삭제" onclick="projectsModule.removeMemberLocInput(${idx})">&times;</button>` : ''}
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  updateMemberLocName(idx, val) {
    if (this.memberLocations[idx]) {
      this.memberLocations[idx].name = val.trim();
      this.memberLocations[idx].isVerified = false;
      this.renderMemberLocInputs();
    }
  },

  addMemberLocInput() {
    const nextIdx = this.memberLocations.length + 1;
    this.memberLocations.push({
      id: Date.now(),
      name: '',
      lat: 37.5500,
      lng: 126.9800,
      isVerified: false
    });
    this.renderMemberLocInputs();
    app.showToast(`[팀원 ${nextIdx}] 출발지 입력란이 추가되었습니다.`, 'info');
  },

  removeMemberLocInput(idx) {
    if (this.memberLocations.length <= 2) {
      app.showToast('최하 2명 이상의 팀원이 필요합니다.', 'warning');
      return;
    }
    this.memberLocations.splice(idx, 1);
    this.renderMemberLocInputs();
    app.showToast('팀원 항목이 삭제되었습니다.', 'info');
  },

  startMemberLocVerification(idx) {
    const m = this.memberLocations[idx];
    if (!m) return;

    const inputName = m.name.trim();
    if (!inputName) {
      app.showToast(`[팀원 ${idx + 1}]의 학교 또는 출발지 이름을 입력해 주세요!`, 'warning');
      return;
    }

    this.initMapIfNeeded();
    if (!this.leafletMap) return;

    // Database lookup for preset coordinates
    const geoDB = {
      ...this.universityCoords,
      '경희대학교': { lat: 37.5962, lng: 127.0525 },
      '경희대': { lat: 37.5962, lng: 127.0525 },
      '경희대 국제캠': { lat: 37.2479, lng: 127.0784 },
      '경희대학교 국제캠퍼스': { lat: 37.2479, lng: 127.0784 },
      '단국대': { lat: 37.3218, lng: 127.1265 },
      '단국대학교': { lat: 37.3218, lng: 127.1265 },
      '한국항공대': { lat: 37.6006, lng: 126.8647 },
      '한국항공대학교': { lat: 37.6006, lng: 126.8647 },
      '서울대학교': { lat: 37.4598, lng: 126.9519 },
      '연세대학교': { lat: 37.5657, lng: 126.9385 },
      '고려대학교': { lat: 37.5908, lng: 127.0278 },
      '성균관대학교': { lat: 37.5882, lng: 126.9936 },
      '한양대학교': { lat: 37.5572, lng: 127.0453 },
      '건국대학교': { lat: 37.5408, lng: 127.0793 },
      '홍익대학교': { lat: 37.5508, lng: 126.9255 },
      '서울과학기술대학교': { lat: 37.6317, lng: 127.0774 }
    };

    let coords = geoDB[inputName];
    if (!coords) {
      const matchKey = Object.keys(geoDB).find(k => k.includes(inputName) || inputName.includes(k));
      if (matchKey) coords = geoDB[matchKey];
      else coords = { lat: m.lat || 37.5500, lng: m.lng || 126.9800 };
    }

    this.verifyingMemberIdx = idx;
    this.tempMemberCoords = { lat: coords.lat, lng: coords.lng, name: inputName };

    // Show verification bar
    const bar = document.getElementById('memberLocConfirmBar');
    const title = document.getElementById('verifyingMemberTitle');
    if (bar) bar.classList.remove('hidden');
    if (title) title.innerText = `[팀원 ${idx + 1} (${inputName})]`;

    // Center map and show draggable marker
    this.leafletMap.setView([coords.lat, coords.lng], 15);

    // Clear previous markers
    this.mapMarkers.forEach(mk => this.leafletMap.removeLayer(mk));
    this.mapMarkers = [];

    if (this.tempMemberMarker) this.leafletMap.removeLayer(this.tempMemberMarker);

    this.tempMemberMarker = L.marker([coords.lat, coords.lng], { draggable: true }).addTo(this.leafletMap)
      .bindPopup(`<b>[팀원 ${idx + 1} 위치 조율] ${inputName}</b><br>마커를 드래그하거나 지도를 클릭하여 위치를 맞추세요!`)
      .openPopup();

    this.tempMemberMarker.on('dragend', (evt) => {
      const pos = evt.target.getLatLng();
      this.tempMemberCoords.lat = pos.lat;
      this.tempMemberCoords.lng = pos.lng;
      app.showToast(`[팀원 ${idx + 1}] 마커 위치가 이동되었습니다.`, 'info');
    });

    if (this.memberMapClickHandler) this.leafletMap.off('click', this.memberMapClickHandler);

    this.memberMapClickHandler = (evt) => {
      const lat = evt.latlng.lat;
      const lng = evt.latlng.lng;
      this.tempMemberCoords.lat = lat;
      this.tempMemberCoords.lng = lng;
      if (this.tempMemberMarker) {
        this.tempMemberMarker.setLatLng([lat, lng]);
        this.tempMemberMarker.openPopup();
      }
      app.showToast(`[팀원 ${idx + 1}] 지도 클릭 지점으로 출발지가 설정되었습니다.`, 'info');
    };

    this.leafletMap.on('click', this.memberMapClickHandler);
    app.showToast(`[팀원 ${idx + 1} (${inputName})]의 출발 위치를 확인하세요. 지도를 클릭하거나 마커를 드래그한 후 [이 위치로 출발지 확정]을 누르세요.`, 'info');
  },

  confirmMemberLocVerification() {
    const idx = this.verifyingMemberIdx;
    if (idx === null || !this.memberLocations[idx]) return;

    this.memberLocations[idx].lat = this.tempMemberCoords.lat;
    this.memberLocations[idx].lng = this.tempMemberCoords.lng;
    this.memberLocations[idx].isVerified = true;

    if (this.memberMapClickHandler && this.leafletMap) {
      this.leafletMap.off('click', this.memberMapClickHandler);
      this.memberMapClickHandler = null;
    }
    if (this.tempMemberMarker && this.leafletMap) {
      this.leafletMap.removeLayer(this.tempMemberMarker);
      this.tempMemberMarker = null;
    }

    const bar = document.getElementById('memberLocConfirmBar');
    if (bar) bar.classList.add('hidden');

    this.renderMemberLocInputs();
    app.showToast(`[팀원 ${idx + 1} (${this.memberLocations[idx].name})] 출발지 위치가 성공적으로 검증 및 확정되었습니다!`, 'success');
  },

  cancelMemberLocVerification() {
    if (this.memberMapClickHandler && this.leafletMap) {
      this.leafletMap.off('click', this.memberMapClickHandler);
      this.memberMapClickHandler = null;
    }
    if (this.tempMemberMarker && this.leafletMap) {
      this.leafletMap.removeLayer(this.tempMemberMarker);
      this.tempMemberMarker = null;
    }

    const bar = document.getElementById('memberLocConfirmBar');
    if (bar) bar.classList.add('hidden');

    this.verifyingMemberIdx = null;
    this.tempMemberCoords = null;
    app.showToast('팀원 위치 검증이 취소되었습니다.', 'info');
  },

  renderActivityCards() {
    const container = document.getElementById('activityCardsContainer');
    if (!container) return;

    let filtered = [...this.activities];
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(a => a.category === this.activeCategory);
    }

    if (this.activeSort === 'deadline') {
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (this.activeSort === 'interest') {
      filtered.sort((a, b) => b.interest - a.interest);
    }

    container.innerHTML = filtered.map(a => `
      <div class="activity-card mb-3">
        <div class="activity-main">
          <div style="display:flex; gap:0.5rem; align-items:center; margin-bottom:0.3rem;">
            <span class="badge badge-accent">${a.categoryLabel}</span>
            <span class="text-xs style="color:var(--warning);">★ ${a.interest}.0</span>
          </div>
          <div class="title">${a.title}</div>
          <div class="summary">${a.summary}</div>
          <div class="activity-meta" style="margin-top:0.4rem;">
            <span>신청 기간: ${a.startDate} ~ <strong>${a.deadline}</strong></span>
            <span>구분: ${a.memberType === 'individual' ? '개인 (1명)' : `단체 팀프로젝트 (${a.memberCount}명)`}</span>
          </div>
        </div>
        ${a.memberType === 'team' ? `
          <button class="btn btn-xs btn-primary" onclick="projectsModule.quickJoinRoom('${a.pin}')">팀 룸 (PIN: ${a.pin}) 입장</button>
        ` : `<a href="${a.url}" target="_blank" class="btn btn-xs btn-outline">상세 정보 주소</a>`}
      </div>
    `).join('');
  },

  renderActivityCalendar() {
    const calendarEl = document.getElementById('activityCalendar');
    if (!calendarEl) return;

    calendarEl.innerHTML = `
      <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
          <h4 style="font-size:0.9rem; font-weight:700;">2026년 8월 신청 일자 일정</h4>
          <span class="text-xs text-muted">오늘: 8월 13일</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
            <span>[공모전] 캡스톤 경진대회</span>
            <span style="color:var(--danger); font-weight:700;">D-7 (마감: 8/20)</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
            <span>[공모전] 공공데이터 AI 앱</span>
            <span style="color:var(--warning); font-weight:700;">D-12 (마감: 8/25)</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
            <span>[서포터즈] 카카오 테크 캠퍼스</span>
            <span style="color:var(--success); font-weight:700;">D-17 (마감: 8/30)</span>
          </div>
        </div>
      </div>
    `;
  },

  renderTeamRoomWorkspace() {
    this.renderTodoList();
    this.renderProjectCalendar();
    this.renderSharedLinks();
    this.renderPhotoGallery();
    this.renderChatSystem();
    this.renderAvailabilityMatrix();
  },

  calendarYear: 2026,
  calendarMonth: 7, // 0-indexed (August is 7)

  koreanHolidays: {
    '2026-01-01': { name: '신정', isRed: true },
    '2026-02-16': { name: '설날연휴', isRed: true },
    '2026-02-17': { name: '설날', isRed: true },
    '2026-02-18': { name: '설날연휴', isRed: true },
    '2026-03-01': { name: '삼일절', isRed: true },
    '2026-05-05': { name: '어린이날', isRed: true },
    '2026-05-24': { name: '부처님오신날', isRed: true },
    '2026-06-06': { name: '현충일', isRed: true },
    '2026-08-07': { name: '입추', isRed: false },
    '2026-08-14': { name: '말복', isRed: false },
    '2026-08-15': { name: '광복절', isRed: true },
    '2026-08-17': { name: '대체 휴일', isRed: true },
    '2026-08-23': { name: '처서', isRed: false },
    '2026-09-07': { name: '백로', isRed: false },
    '2026-09-24': { name: '추석연휴', isRed: true },
    '2026-09-25': { name: '추석', isRed: true },
    '2026-09-26': { name: '추석연휴', isRed: true },
    '2026-10-03': { name: '개천절', isRed: true },
    '2026-10-08': { name: '한로', isRed: false },
    '2026-10-09': { name: '한글날', isRed: true },
    '2026-10-23': { name: '상강', isRed: false },
    '2026-11-07': { name: '입동', isRed: false },
    '2026-11-22': { name: '소설', isRed: false },
    '2026-12-07': { name: '대설', isRed: false },
    '2026-12-21': { name: '동지', isRed: false },
    '2026-12-25': { name: '성탄절', isRed: true }
  },

  renderProjectCalendar() {
    const container = document.getElementById('teamProjectCalendar');
    if (!container) return;

    const year = this.calendarYear;
    const month = this.calendarMonth; // 0-indexed
    const monthDisplay = String(month + 1).padStart(2, '0');

    // First day of current month (0: Sun, 1: Mon, ...)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Total days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Total days in previous month
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    // Today info for highlight (defaulting to 2026-08-19 or actual current day)
    const today = new Date();
    const isCurrentYearMonth = (year === today.getFullYear() && month === today.getMonth());
    const todayDate = today.getDate();

    const deadlines = this.activeRoom.deadlines || [];

    let cellsHtml = '';

    // 1. Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const pDay = prevMonthTotalDays - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(pDay).padStart(2, '0')}`;
      const dayOfWeek = (firstDayIndex - 1 - i) % 7;
      const isSun = dayOfWeek === 0;
      const isSat = dayOfWeek === 6;

      cellsHtml += `
        <div class="calendar-day-cell other-month" onclick="projectsModule.openAddDeadlineModal('${dateStr}')">
          <div class="calendar-cell-top">
            <span class="calendar-day-num ${isSun ? 'sun' : isSat ? 'sat' : ''}">${pDay}</span>
          </div>
        </div>
      `;
    }

    // 2. Current month days
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${monthDisplay}-${String(day).padStart(2, '0')}`;
      const dayOfWeek = (firstDayIndex + day - 1) % 7;
      const isSun = dayOfWeek === 0;
      const isSat = dayOfWeek === 6;
      const isToday = (isCurrentYearMonth && day === todayDate) || (year === 2026 && month === 7 && day === 19);

      const holiday = this.koreanHolidays[dateStr];
      const dayDeadlines = deadlines.filter(d => d.date === dateStr);

      cellsHtml += `
        <div class="calendar-day-cell ${isToday ? 'today' : ''}" onclick="projectsModule.openAddDeadlineModal('${dateStr}')" title="${dateStr} - 클릭하여 마감 일정 등록">
          <div class="calendar-cell-top">
            <span class="calendar-day-num ${isSun || (holiday && holiday.isRed) ? 'sun' : isSat ? 'sat' : ''}">${day}</span>
            ${holiday ? `<span class="calendar-holiday-label ${holiday.isRed ? 'red' : ''}">${holiday.name}</span>` : ''}
          </div>
          <div class="calendar-cell-events">
            ${dayDeadlines.map(d => `
              <div class="calendar-event-tag type-${d.type || 'etc'}" onclick="projectsModule.viewDeadlineDetail('${d.id}', event)" title="${d.title} (${d.time || '종일'})">
                <span>${d.title}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 3. Next month leading days to complete grid
    const totalRendered = firstDayIndex + totalDays;
    const nextDaysCount = (7 - (totalRendered % 7)) % 7;
    for (let nDay = 1; nDay <= nextDaysCount; nDay++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nDay).padStart(2, '0')}`;
      const dayOfWeek = (totalRendered + nDay - 1) % 7;
      const isSun = dayOfWeek === 0;
      const isSat = dayOfWeek === 6;

      cellsHtml += `
        <div class="calendar-day-cell other-month" onclick="projectsModule.openAddDeadlineModal('${dateStr}')">
          <div class="calendar-cell-top">
            <span class="calendar-day-num ${isSun ? 'sun' : isSat ? 'sat' : ''}">${nDay}</span>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="calendar-nav-bar">
        <div class="calendar-nav-left">
          <button type="button" class="calendar-nav-btn" onclick="projectsModule.goToTodayCalendar()">오늘</button>
          <button type="button" class="calendar-nav-btn" onclick="projectsModule.changeCalendarMonth(-1)"><i data-lucide="chevron-left" style="width:14px;height:14px;"></i></button>
          <span class="calendar-nav-title">${year}.${monthDisplay}</span>
          <button type="button" class="calendar-nav-btn" onclick="projectsModule.changeCalendarMonth(1)"><i data-lucide="chevron-right" style="width:14px;height:14px;"></i></button>
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted);">
          <span style="color:#f87171; font-weight:700;">● 마감</span> &nbsp;
          <span style="color:#60a5fa; font-weight:700;">● 회의</span> &nbsp;
          <span style="color:#f59e0b; font-weight:700;">● 과제</span>
        </div>
      </div>
      <div class="calendar-grid-header">
        <div class="calendar-header-day sun">일</div>
        <div class="calendar-header-day">월</div>
        <div class="calendar-header-day">화</div>
        <div class="calendar-header-day">수</div>
        <div class="calendar-header-day">목</div>
        <div class="calendar-header-day">금</div>
        <div class="calendar-header-day sat">토</div>
      </div>
      <div class="calendar-grid-body">
        ${cellsHtml}
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  changeCalendarMonth(delta) {
    let newMonth = this.calendarMonth + delta;
    let newYear = this.calendarYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    this.calendarMonth = newMonth;
    this.calendarYear = newYear;
    this.renderProjectCalendar();
  },

  goToTodayCalendar() {
    const today = new Date();
    this.calendarYear = today.getFullYear();
    this.calendarMonth = today.getMonth();
    this.renderProjectCalendar();
    app.showToast('오늘 날짜 달력으로 이동했습니다.', 'info');
  },

  openAddDeadlineModal(targetDateStr = '') {
    const dateInput = document.getElementById('newDeadlineDate');
    const titleInput = document.getElementById('newDeadlineTitle');
    const typeSelect = document.getElementById('newDeadlineType');
    const assigneeInput = document.getElementById('newDeadlineAssignee');

    if (titleInput) titleInput.value = '';
    if (assigneeInput) assigneeInput.value = '김대학(나)';
    if (typeSelect) typeSelect.value = 'final';

    if (dateInput) {
      dateInput.value = targetDateStr || `${this.calendarYear}-${String(this.calendarMonth + 1).padStart(2, '0')}-19`;
    }

    app.openModal('addProjectDeadlineModal');
    if (window.lucide) lucide.createIcons();
  },

  saveNewDeadline() {
    const titleInput = document.getElementById('newDeadlineTitle');
    const dateInput = document.getElementById('newDeadlineDate');
    const timeInput = document.getElementById('newDeadlineTime');
    const typeSelect = document.getElementById('newDeadlineType');
    const assigneeInput = document.getElementById('newDeadlineAssignee');

    if (!titleInput || !titleInput.value.trim()) {
      app.showToast('일정 / 마감 제목을 입력해 주세요!', 'warning');
      return;
    }
    if (!dateInput || !dateInput.value) {
      app.showToast('마감 일자를 선택해 주세요!', 'warning');
      return;
    }

    const newDeadline = {
      id: 'dl_' + Date.now(),
      title: titleInput.value.trim(),
      date: dateInput.value,
      time: timeInput ? timeInput.value : '18:00',
      type: typeSelect ? typeSelect.value : 'final',
      assignee: assigneeInput ? assigneeInput.value.trim() : '김대학(나)'
    };

    if (!this.activeRoom.deadlines) this.activeRoom.deadlines = [];
    this.activeRoom.deadlines.push(newDeadline);

    app.closeModal('addProjectDeadlineModal');
    this.renderProjectCalendar();
    app.showToast(`[${newDeadline.title}] 일정이 달력에 등록되었습니다!`, 'success');
  },

  viewDeadlineDetail(id, e) {
    if (e) e.stopPropagation();
    const deadline = (this.activeRoom.deadlines || []).find(d => d.id === id);
    if (!deadline) return;

    const body = document.getElementById('viewDeadlineModalBody');
    const deleteBtn = document.getElementById('btnDeleteDeadline');

    const typeLabels = {
      final: '🔥 최종 마감일 (D-Day)',
      midterm: '📝 과제 / 중간 점검',
      meeting: '👥 팀 회의 및 미팅',
      presentation: '🎤 발표 / 데모 데이',
      etc: '📌 기타 일정'
    };

    if (body) {
      body.innerHTML = `
        <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
          <div style="font-size:1.1rem; font-weight:800; margin-bottom:0.5rem; color:#fff;">${deadline.title}</div>
          <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.85rem; color:var(--text-muted);">
            <div>📅 일자: <strong style="color:var(--primary);">${deadline.date}</strong> (${deadline.time || '종일'})</div>
            <div>🏷️ 구분: <strong>${typeLabels[deadline.type] || deadline.type}</strong></div>
            <div>👤 담당자/메모: <strong>${deadline.assignee || '전체 팀원'}</strong></div>
          </div>
        </div>
      `;
    }

    if (deleteBtn) {
      deleteBtn.onclick = () => projectsModule.deleteDeadline(id);
    }

    app.openModal('viewProjectDeadlineModal');
    if (window.lucide) lucide.createIcons();
  },

  deleteDeadline(id) {
    if (confirm('이 프로젝트 일정을 달력에서 삭제하시겠습니까?')) {
      this.activeRoom.deadlines = (this.activeRoom.deadlines || []).filter(d => d.id !== id);
      app.closeModal('viewProjectDeadlineModal');
      this.renderProjectCalendar();
      app.showToast('프로젝트 일정이 삭제되었습니다.', 'info');
    }
  },

  draggedTodoId: null,

  renderTodoList() {
    const container = document.getElementById('teamTodoList');
    if (!container) return;

    const todos = this.activeRoom.todos || [];

    if (todos.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2rem; color:var(--text-muted); font-size:0.9rem;">
          <i data-lucide="check-circle-2" style="width:36px; height:36px; opacity:0.4; margin-bottom:0.5rem;"></i>
          <div>등록된 팀 프로젝트 To-Do가 없습니다.</div>
          <button class="btn btn-sm btn-primary mt-2" onclick="projectsModule.addTodo()"><i data-lucide="plus"></i> 새 할 일 등록</button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    const priorityConfig = {
      urgent: { label: '🚨 긴급', class: 'urgent' },
      high: { label: '🔴 높음', class: 'high' },
      medium: { label: '🟡 보통', class: 'medium' },
      low: { label: '🟢 낮음', class: 'low' }
    };

    container.innerHTML = todos.map((t, idx) => {
      const p = priorityConfig[t.priority] || priorityConfig.medium;
      return `
        <div class="todo-item-card" 
             draggable="true" 
             data-id="${t.id}"
             ondragstart="projectsModule.handleTodoDragStart(event, '${t.id}')"
             ondragover="projectsModule.handleTodoDragOver(event)"
             ondragleave="projectsModule.handleTodoDragLeave(event)"
             ondrop="projectsModule.handleTodoDrop(event, '${t.id}')"
             ondragend="projectsModule.handleTodoDragEnd(event)">
          
          <div class="todo-drag-handle" title="마우스로 끌어서 순서 변경">
            <i data-lucide="grip-vertical" style="width:16px; height:16px;"></i>
          </div>

          <input type="checkbox" ${t.done ? 'checked' : ''} onchange="projectsModule.toggleTodo('${t.id}')" title="완료 여부 체크">

          <!-- Order Sequence Number Badge (1, 2, 3...) -->
          <span class="todo-order-num" title="${idx + 1}번째 순서">${idx + 1}</span>

          <div style="flex:1; min-width:0;">
            <div style="font-size:0.9rem; font-weight:600; ${t.done ? 'text-decoration:line-through; color:var(--text-muted); opacity:0.6;' : 'color:#fff;'}">
              ${t.title}
            </div>
            <div class="text-xs text-muted" style="margin-top:0.2rem; display:flex; gap:0.6rem; align-items:center;">
              <span>👤 담당: <strong>${t.assignee}</strong></span>
              ${t.dueDate ? `<span>📅 마감: ${t.dueDate}</span>` : ''}
            </div>
          </div>

          <!-- Priority Selector Dropdown -->
          <select class="todo-priority-select ${p.class}" onchange="projectsModule.changeTodoPriority('${t.id}', this.value)" title="우선순위 변경">
            <option value="urgent" ${t.priority === 'urgent' ? 'selected' : ''}>🚨 긴급</option>
            <option value="high" ${t.priority === 'high' ? 'selected' : ''}>🔴 높음</option>
            <option value="medium" ${t.priority === 'medium' ? 'selected' : ''}>🟡 보통</option>
            <option value="low" ${t.priority === 'low' ? 'selected' : ''}>🟢 낮음</option>
          </select>

          <!-- Status badge -->
          <span class="badge ${t.done ? 'badge-success' : 'badge-warning'}" style="font-size:0.75rem;">
            ${t.done ? '완료' : '진행 중'}
          </span>

          <!-- Delete button -->
          <button type="button" class="todo-actions-btn" onclick="projectsModule.deleteTodo('${t.id}', event)" title="할 일 삭제">
            <i data-lucide="trash-2" style="width:15px; height:15px;"></i>
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  handleTodoDragStart(e, id) {
    this.draggedTodoId = id;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  },

  handleTodoDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const card = e.currentTarget.closest('.todo-item-card');
    if (card && !card.classList.contains('dragging')) {
      card.classList.add('drag-over');
    }
  },

  handleTodoDragLeave(e) {
    const card = e.currentTarget.closest('.todo-item-card');
    if (card) {
      card.classList.remove('drag-over');
    }
  },

  handleTodoDrop(e, targetId) {
    e.preventDefault();
    const card = e.currentTarget.closest('.todo-item-card');
    if (card) card.classList.remove('drag-over');

    const sourceId = this.draggedTodoId;
    if (!sourceId || sourceId === targetId) return;

    const todos = this.activeRoom.todos || [];
    const sourceIndex = todos.findIndex(t => t.id === sourceId);
    const targetIndex = todos.findIndex(t => t.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    // Move item in array
    const [draggedItem] = todos.splice(sourceIndex, 1);
    todos.splice(targetIndex, 0, draggedItem);

    this.renderTodoList();
    app.showToast('To-Do 우선순위 및 순서가 변경되었습니다.', 'info');
  },

  handleTodoDragEnd(e) {
    this.draggedTodoId = null;
    document.querySelectorAll('.todo-item-card').forEach(card => {
      card.classList.remove('dragging', 'drag-over');
    });
  },

  changeTodoPriority(id, newPriority) {
    const todo = (this.activeRoom.todos || []).find(t => t.id === id);
    if (todo) {
      todo.priority = newPriority;
      this.renderTodoList();
      const labels = { urgent: '긴급', high: '높음', medium: '보통', low: '낮음' };
      app.showToast(`[${todo.title}] 우선순위가 '${labels[newPriority]}'으로 변경되었습니다.`, 'success');
    }
  },

  toggleTodo(id) {
    const todo = (this.activeRoom.todos || []).find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      this.renderTodoList();
    }
  },

  addTodo() {
    const titleInput = document.getElementById('newTodoTitle');
    const prioritySelect = document.getElementById('newTodoPriority');
    const assigneeSelect = document.getElementById('newTodoAssignee');
    const dueDateInput = document.getElementById('newTodoDueDate');

    if (titleInput) titleInput.value = '';
    if (prioritySelect) prioritySelect.value = 'high';
    if (assigneeSelect) assigneeSelect.value = '김대학(나)';
    if (dueDateInput) dueDateInput.value = '';

    app.openModal('addTodoModal');
    if (window.lucide) lucide.createIcons();
  },

  saveNewTodo() {
    const titleInput = document.getElementById('newTodoTitle');
    const prioritySelect = document.getElementById('newTodoPriority');
    const assigneeSelect = document.getElementById('newTodoAssignee');
    const dueDateInput = document.getElementById('newTodoDueDate');

    if (!titleInput || !titleInput.value.trim()) {
      app.showToast('To-Do 할 일 제목을 입력해 주세요!', 'warning');
      return;
    }

    const newTodo = {
      id: 'td' + Date.now(),
      title: titleInput.value.trim(),
      assignee: assigneeSelect ? assigneeSelect.value : '김대학(나)',
      priority: prioritySelect ? prioritySelect.value : 'high',
      dueDate: dueDateInput ? dueDateInput.value : '',
      done: false
    };

    if (!this.activeRoom.todos) this.activeRoom.todos = [];
    this.activeRoom.todos.push(newTodo);

    app.closeModal('addTodoModal');
    this.renderTodoList();
    app.showToast(`[${newTodo.title}] 새 To-Do가 추가되었습니다.`, 'success');
  },

  deleteTodo(id, e) {
    if (e) e.stopPropagation();
    if (confirm('이 To-Do 할 일을 목록에서 삭제하시겠습니까?')) {
      this.activeRoom.todos = (this.activeRoom.todos || []).filter(t => t.id !== id);
      this.renderTodoList();
      app.showToast('To-Do 항목이 삭제되었습니다.', 'info');
    }
  },

  renderSharedLinks() {
    const tbody = document.querySelector('#sharedLinksTable tbody');
    if (!tbody) return;

    tbody.innerHTML = this.activeRoom.sharedLinks.map(l => `
      <tr>
        <td><strong>${l.name}</strong></td>
        <td><a href="${l.url}" target="_blank" style="color:var(--primary); font-size:0.8rem;">${l.url}</a></td>
        <td>${l.sender}</td>
        <td>${l.date}</td>
        <td>
          <button class="btn btn-xs btn-outline" onclick="projectsModule.editLinkName('${l.id}')">이름 변경</button>
        </td>
      </tr>
    `).join('');
  },

  addSharedLink() {
    const url = prompt('공유할 웹 링크 URL 주소를 입력하세요:');
    if (url && url.trim()) {
      const name = prompt('이 링크에 붙일 이름을 입력하세요:', '참고 자료 링크');
      this.activeRoom.sharedLinks.push({
        id: 'l' + Date.now(),
        name: name || '공유 링크',
        url: url.trim(),
        sender: '김대학(나)',
        date: new Date().toLocaleString()
      });
      this.renderSharedLinks();
      app.showToast('새 링크가 보관함에 저장되었습니다.', 'success');
    }
  },

  editLinkName(id) {
    const link = this.activeRoom.sharedLinks.find(l => l.id === id);
    if (link) {
      const newName = prompt('새 링크 이름을 입력하세요:', link.name);
      if (newName && newName.trim()) {
        link.name = newName.trim();
        this.renderSharedLinks();
        app.showToast('링크 이름이 변경되었습니다.', 'info');
      }
    }
  },

  stagedPhotos: [],

  openPhotoUploadModal() {
    this.stagedPhotos = [];
    this.renderStagedPhotos();
    const uploaderInput = document.getElementById('galleryUploaderName');
    if (uploaderInput) {
      const saved = localStorage.getItem('uniplan_user_profile');
      if (saved) {
        try {
          const profile = JSON.parse(saved);
          if (profile.name) uploaderInput.value = `${profile.name}(나)`;
        } catch (e) {}
      }
    }
    const fileInput = document.getElementById('galleryFileInput');
    if (fileInput) fileInput.value = '';
    app.openModal('galleryUploadModal');
    if (window.lucide) lucide.createIcons();
  },

  uploadGalleryPhoto() {
    const fileInput = document.getElementById('galleryFileInputDirect');
    if (fileInput) {
      fileInput.click();
    } else {
      this.openPhotoUploadModal();
    }
  },

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('galleryDropzone');
    if (dropzone) dropzone.classList.add('dragover');
  },

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('galleryDropzone');
    if (dropzone) dropzone.classList.remove('dragover');
  },

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('galleryDropzone');
    if (dropzone) dropzone.classList.remove('dragover');
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.processFiles(e.dataTransfer.files);
    }
  },

  handleGalleryTabDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const hint = document.getElementById('galleryInlineDropzone');
    if (hint) hint.classList.add('dragover');
  },

  handleGalleryTabDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const hint = document.getElementById('galleryInlineDropzone');
    if (hint) hint.classList.remove('dragover');
  },

  handleGalleryTabDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const hint = document.getElementById('galleryInlineDropzone');
    if (hint) hint.classList.remove('dragover');
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.uploadFilesDirectly(e.dataTransfer.files);
    }
  },

  handleFilesSelected(e) {
    if (e.target && e.target.files && e.target.files.length > 0) {
      this.processFiles(e.target.files);
    }
  },

  handleDirectFilesSelected(e) {
    if (e.target && e.target.files && e.target.files.length > 0) {
      this.uploadFilesDirectly(e.target.files);
      e.target.value = '';
    }
  },

  uploadFilesDirectly(fileList) {
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) {
      app.showToast('이미지 파일(JPG, PNG, GIF, WEBP 등)만 업로드할 수 있습니다.', 'warning');
      return;
    }

    let uploader = '김대학(나)';
    const saved = localStorage.getItem('uniplan_user_profile');
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        if (profile.name) uploader = `${profile.name}(나)`;
      } catch (e) {}
    }
    const todayStr = new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

    let loadedCount = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.activeRoom.photos.unshift({
          id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          url: evt.target.result,
          name: file.name,
          uploader: uploader,
          date: todayStr
        });
        loadedCount++;
        if (loadedCount === files.length) {
          this.renderPhotoGallery();
          app.showToast(`${files.length}장의 사진이 성공적으로 업로드되었습니다!`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });
  },

  processFiles(fileList) {
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) {
      app.showToast('이미지 파일(JPG, PNG, GIF, WEBP 등)만 업로드할 수 있습니다.', 'warning');
      return;
    }

    let loadedCount = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const stagedItem = {
          id: 'stg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          name: file.name,
          size: file.size > 1024 * 1024 
            ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' 
            : Math.round(file.size / 1024) + ' KB',
          dataUrl: evt.target.result,
          file: file
        };
        this.stagedPhotos.push(stagedItem);
        loadedCount++;
        if (loadedCount === files.length) {
          this.renderStagedPhotos();
          app.showToast(`${files.length}장의 사진이 선택되었습니다. 검토 후 업로드를 완료하세요!`, 'info');
        }
      };
      reader.readAsDataURL(file);
    });
  },

  renderStagedPhotos() {
    const section = document.getElementById('stagedPhotosSection');
    const grid = document.getElementById('stagedPhotosGrid');
    const badge = document.getElementById('stagedCountBadge');
    const btnCount = document.getElementById('uploadBtnCount');

    const count = this.stagedPhotos.length;
    if (badge) badge.innerText = `선택된 사진 ${count}장`;
    if (btnCount) btnCount.innerText = count;

    if (!section || !grid) return;

    if (count === 0) {
      section.classList.add('hidden');
      grid.innerHTML = '';
      return;
    }

    section.classList.remove('hidden');
    grid.innerHTML = this.stagedPhotos.map(p => `
      <div class="staged-photo-card" id="${p.id}">
        <img src="${p.dataUrl}" alt="${p.name}">
        <div class="staged-photo-info">
          <span class="staged-photo-name" title="${p.name}">${p.name}</span>
          <span class="staged-photo-size">${p.size}</span>
        </div>
        <button type="button" class="staged-photo-remove" onclick="projectsModule.removeStagedPhoto('${p.id}')" title="제거">&times;</button>
      </div>
    `).join('');
  },

  removeStagedPhoto(id) {
    this.stagedPhotos = this.stagedPhotos.filter(p => p.id !== id);
    this.renderStagedPhotos();
  },

  clearStagedPhotos() {
    this.stagedPhotos = [];
    this.renderStagedPhotos();
    const fileInput = document.getElementById('galleryFileInput');
    if (fileInput) fileInput.value = '';
    const fileInputDirect = document.getElementById('galleryFileInputDirect');
    if (fileInputDirect) fileInputDirect.value = '';
  },

  confirmStagedUpload() {
    if (this.stagedPhotos.length === 0) {
      app.showToast('업로드할 사진 파일을 1장 이상 선택해 주세요.', 'warning');
      return;
    }

    const uploaderInput = document.getElementById('galleryUploaderName');
    const uploader = (uploaderInput && uploaderInput.value.trim()) ? uploaderInput.value.trim() : '김대학(나)';
    const todayStr = new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

    this.stagedPhotos.forEach(p => {
      this.activeRoom.photos.unshift({
        id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        url: p.dataUrl,
        name: p.name,
        uploader: uploader,
        date: todayStr
      });
    });

    const addedCount = this.stagedPhotos.length;
    this.clearStagedPhotos();
    app.closeModal('galleryUploadModal');
    this.renderPhotoGallery();
    app.showToast(`총 ${addedCount}장의 사진이 공유 갤러리에 업로드되었습니다!`, 'success');
  },

  renderPhotoGallery() {
    const container = document.getElementById('sharedPhotoGalleryGrid');
    if (!container) return;

    if (!this.activeRoom.photos || this.activeRoom.photos.length === 0) {
      container.innerHTML = `
        <div class="gallery-empty-card" onclick="projectsModule.openPhotoUploadModal()">
          <i data-lucide="image-plus" style="width:40px;height:40px;color:var(--primary);"></i>
          <div style="font-weight:700; font-size:0.95rem; color:#fff;">공유된 사진이 없습니다</div>
          <div style="font-size:0.8rem;">사진을 화면으로 끌어다 놓거나 여기를 클릭하여 첫 번째 사진을 올려보세요.</div>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = this.activeRoom.photos.map(p => `
      <div class="gallery-card" onclick="projectsModule.viewPhotoDetail('${p.id}')">
        <img src="${p.url}" alt="${p.name || 'Shared Photo'}" loading="lazy">
        <div class="gallery-card-zoom-hint"><i data-lucide="zoom-in" style="width:14px;height:14px;"></i> 크게 보기</div>
        <div class="overlay">
          <div class="photo-meta">
            <span class="photo-uploader"><i data-lucide="user" style="width:12px;height:12px;"></i> ${p.uploader}</span>
            <span class="photo-date">${p.date}</span>
          </div>
          <div class="photo-actions" onclick="event.stopPropagation()">
            <button class="btn-gallery-action btn-gallery-dl" title="사진 저장 (다운로드)" onclick="projectsModule.downloadPhoto('${p.url}', '${(p.name || 'photo_' + p.id).replace(/\s+/g, '_')}.jpg')">
              <i data-lucide="download" style="width:13px;height:13px;"></i>
            </button>
            <button class="btn-gallery-action btn-gallery-del" title="사진 삭제" onclick="projectsModule.deleteGalleryPhoto('${p.id}', event)">
              <i data-lucide="trash-2" style="width:13px;height:13px;"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  deleteGalleryPhoto(id, e) {
    if (e) e.stopPropagation();
    if (confirm('이 사진을 공유 갤러리에서 삭제하시겠습니까?')) {
      this.activeRoom.photos = this.activeRoom.photos.filter(p => p.id !== id);
      this.renderPhotoGallery();
      app.showToast('사진이 공유 갤러리에서 삭제되었습니다.', 'info');
    }
  },

  currentViewingPhoto: null,

  viewPhotoDetail(id) {
    const photo = this.activeRoom.photos.find(p => p.id === id);
    if (!photo) return;
    this.currentViewingPhoto = photo;

    const img = document.getElementById('photoDetailImg');
    const title = document.getElementById('photoDetailTitle');
    const uploader = document.getElementById('photoDetailUploader');
    const date = document.getElementById('photoDetailDate');

    if (img) img.src = photo.url;
    if (title) title.innerHTML = `<i data-lucide="image"></i> ${photo.name || '공유 사진 상세 보기'}`;
    if (uploader) uploader.innerHTML = `<i data-lucide="user"></i> 업로더: <strong>${photo.uploader}</strong>`;
    if (date) date.innerHTML = `<i data-lucide="calendar"></i> 업로드일: <strong>${photo.date}</strong>`;

    app.openModal('photoDetailModal');
    if (window.lucide) lucide.createIcons();
  },

  async downloadPhoto(url, filename = 'uniplan_photo.jpg') {
    try {
      if (url.startsWith('data:')) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        app.showToast('사진이 기기에 저장(다운로드)되었습니다!', 'success');
        return;
      }

      // Fetch blob for CORS or remote image URLs
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      app.showToast('사진이 기기에 저장(다운로드)되었습니다!', 'success');
    } catch (err) {
      // Fallback in case of CORS restriction
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      app.showToast('사진 저장 창을 열었습니다.', 'info');
    }
  },

  saveCurrentPhoto() {
    if (!this.currentViewingPhoto) return;
    const rawName = this.currentViewingPhoto.name || `photo_${this.currentViewingPhoto.id}`;
    const filename = rawName.includes('.') ? rawName : `${rawName}.jpg`;
    this.downloadPhoto(this.currentViewingPhoto.url, filename);
  },

  renderChatSystem() {
    const channelsContainer = document.getElementById('chatChannelsList');
    const messagesContainer = document.getElementById('chatMessagesBox');

    if (channelsContainer) {
      channelsContainer.innerHTML = this.activeRoom.chatChannels.map(ch => `
        <li class="chat-channel-item ${ch.id === this.activeRoom.activeChannelId ? 'active' : ''}" onclick="projectsModule.switchChannel('${ch.id}')">
          ${ch.name}
        </li>
      `).join('');
    }

    if (messagesContainer) {
      messagesContainer.innerHTML = this.activeRoom.messages.map(m => `
        <div class="message-bubble ${m.isMine ? 'mine' : 'other'}">
          ${!m.isMine ? `<span class="msg-sender">${m.sender}</span>` : ''}
          <div>${m.text}</div>
          <span class="msg-time">${m.time}</span>
        </div>
      `).join('');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  },

  switchChannel(channelId) {
    this.activeRoom.activeChannelId = channelId;
    const channel = this.activeRoom.chatChannels.find(c => c.id === channelId);
    const titleEl = document.getElementById('activeChatRoomTitle');
    if (titleEl && channel) titleEl.innerText = channel.name;
    this.renderChatSystem();
  },

  createNewChatRoom() {
    const roomName = prompt('생성할 새 커스텀 대화방 이름을 입력하세요:');
    if (roomName && roomName.trim()) {
      const newId = 'ch_' + Date.now();
      this.activeRoom.chatChannels.push({
        id: newId,
        name: '# ' + roomName.trim(),
        isGroup: true
      });
      this.switchChannel(newId);
      app.showToast(`[# ${roomName}] 대화방이 생성되었습니다.`, 'success');
    }
  },

  sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    this.activeRoom.messages.push({
      sender: '김대학(나)',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    });

    // Auto-detect link and add to link archive
    if (text.startsWith('http://') || text.startsWith('https://')) {
      this.activeRoom.sharedLinks.push({
        id: 'l' + Date.now(),
        name: '대화방 공유 링크 (' + new Date().toLocaleTimeString() + ')',
        url: text,
        sender: '김대학(나)',
        date: new Date().toLocaleString()
      });
      this.renderSharedLinks();
    }

    input.value = '';
    this.renderChatSystem();
  },

  sharePhotoInChat() {
    const url = prompt('채팅에 공유할 사진 URL을 입력하세요:', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400');
    if (url && url.trim()) {
      this.activeRoom.messages.push({
        sender: '김대학(나)',
        text: `[사진 공유] ${url}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true
      });
      this.activeRoom.photos.push({
        id: 'p' + Date.now(),
        url: url.trim(),
        uploader: '김대학(나)',
        date: '방금'
      });
      this.renderChatSystem();
      this.renderPhotoGallery();
    }
  },

  selectAvailMember(memberName) {
    this.activeRoom.currentAvailMember = memberName;
    this.renderAvailabilityMatrix();
  },

  toggleMemberSlot(slotKey) {
    const currentMember = this.activeRoom.currentAvailMember;
    if (currentMember === 'all') {
      app.showToast('공통 종합 모드에서는 팀원 이름을 선택하여 개인 시간을 수정해 주세요.', 'info');
      return;
    }

    if (!this.activeRoom.memberSchedules) this.activeRoom.memberSchedules = {};
    if (!this.activeRoom.memberSchedules[currentMember]) this.activeRoom.memberSchedules[currentMember] = [];

    const list = this.activeRoom.memberSchedules[currentMember];
    const idx = list.indexOf(slotKey);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(slotKey);
    }

    this.renderAvailabilityMatrix();
  },

  applyAvailPreset(presetType) {
    const currentMember = this.activeRoom.currentAvailMember;
    if (currentMember === 'all') {
      app.showToast('프리셋 적용을 위해 먼저 특정 팀원 탭을 선택해 주세요.', 'warning');
      return;
    }

    if (!this.activeRoom.memberSchedules) this.activeRoom.memberSchedules = {};
    const dayCodes = ['mon', 'tue', 'wed', 'thu', 'fri'];

    if (presetType === 'clear') {
      this.activeRoom.memberSchedules[currentMember] = [];
      app.showToast(`[${currentMember}] 가능 시간이 모두 비워졌습니다.`, 'info');
    } else if (presetType === 'freeTime') {
      // Free time preset (Mon 13~16, Wed 14~18, Fri 13~16)
      const freeSlots = ['mon-13', 'mon-14', 'mon-15', 'wed-14', 'wed-15', 'wed-16', 'wed-17', 'fri-13', 'fri-14', 'fri-15'];
      this.activeRoom.memberSchedules[currentMember] = Array.from(new Set([...(this.activeRoom.memberSchedules[currentMember] || []), ...freeSlots]));
      app.showToast(`[${currentMember}] 이번 학기 공강 시간이 자동 적용되었습니다!`, 'success');
    } else if (presetType === 'afternoon') {
      const afternoonSlots = [];
      dayCodes.forEach(d => {
        for (let h = 13; h <= 17; h++) afternoonSlots.push(`${d}-${h}`);
      });
      this.activeRoom.memberSchedules[currentMember] = Array.from(new Set([...(this.activeRoom.memberSchedules[currentMember] || []), ...afternoonSlots]));
      app.showToast(`[${currentMember}] 평일 오후(13~18시)가 가능 시간으로 추가되었습니다.`, 'success');
    } else if (presetType === 'evening') {
      const eveningSlots = [];
      dayCodes.forEach(d => {
        for (let h = 18; h <= 20; h++) eveningSlots.push(`${d}-${h}`);
      });
      this.activeRoom.memberSchedules[currentMember] = Array.from(new Set([...(this.activeRoom.memberSchedules[currentMember] || []), ...eveningSlots]));
      app.showToast(`[${currentMember}] 평일 저녁(18~21시)이 가능 시간으로 추가되었습니다.`, 'success');
    }

    this.renderAvailabilityMatrix();
  },

  renderAvailabilityMatrix() {
    const gridContainer = document.getElementById('availabilityGrid');
    const tabsContainer = document.getElementById('availMemberTabs');
    const legendEl = document.getElementById('availLegend');
    const guideTextEl = document.getElementById('availGuideText');

    if (!gridContainer) return;

    const members = this.activeRoom.members || ['김대학(나)', '이철수', '박영희', '정민우'];
    const currentMember = this.activeRoom.currentAvailMember || '김대학(나)';
    const schedules = this.activeRoom.memberSchedules || {};

    // 1. Render Member Selector Tabs
    if (tabsContainer) {
      tabsContainer.innerHTML = `
        ${members.map(m => `
          <button type="button" 
                  class="avail-member-tab ${currentMember === m ? 'active' : ''}" 
                  onclick="projectsModule.selectAvailMember('${m}')">
            <i data-lucide="user" style="width:13px;height:13px;"></i> ${m} ${m.includes('(나)') ? '✍️' : ''}
          </button>
        `).join('')}
        <button type="button" 
                class="avail-member-tab heatmap-tab ${currentMember === 'all' ? 'active' : ''}" 
                onclick="projectsModule.selectAvailMember('all')">
          <i data-lucide="sparkles" style="width:13px;height:13px;"></i> ✨ 전체 공통 종합 (Heatmap)
        </button>
      `;
    }

    // 2. Legend & Guide
    if (legendEl && guideTextEl) {
      if (currentMember === 'all') {
        guideTextEl.innerHTML = `🌟 <strong>전체 팀원 공통 종합 모드</strong>: 4명 전원 일치(짙은 초록), 3명 일치(연초록), 2명 일치(노랑) 순으로 표시됩니다.`;
        legendEl.innerHTML = `
          <span style="color:#10b981; font-weight:800;">■ 4명 전원</span> &nbsp;|&nbsp;
          <span style="color:#34d399; font-weight:700;">■ 3명</span> &nbsp;|&nbsp;
          <span style="color:#fbbf24; font-weight:700;">■ 2명</span> &nbsp;|&nbsp;
          <span style="color:#64748b;">■ 1명/0명</span>
        `;
      } else {
        guideTextEl.innerHTML = `💡 <strong>[${currentMember}]</strong> 님의 가능한 시간 슬롯(칸)을 클릭하여 <strong>가능(초록색) / 불가능(회색)</strong>으로 켜고 끄세요.`;
        legendEl.innerHTML = `
          <span style="color:#10b981; font-weight:700;">■ 가능 (클릭 시 선택)</span> &nbsp;|&nbsp;
          <span style="color:#64748b;">■ 불가능</span>
        `;
      }
    }

    // 3. Days & Time Slots (09:00 ~ 21:00)
    const days = [
      { code: 'time', label: '시간' },
      { code: 'mon', label: '월' },
      { code: 'tue', label: '화' },
      { code: 'wed', label: '수' },
      { code: 'thu', label: '목' },
      { code: 'fri', label: '금' },
      { code: 'sat', label: '토', isSat: true },
      { code: 'sun', label: '일', isSun: true }
    ];

    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

    let gridHtml = '';

    // Header Row
    days.forEach(d => {
      const colClass = d.isSun ? 'sun' : d.isSat ? 'sat' : '';
      gridHtml += `<div class="avail-cell avail-header ${colClass}">${d.label}</div>`;
    });

    // Time Rows
    hours.forEach(h => {
      const timeLabel = `${String(h).padStart(2, '0')}:00`;
      gridHtml += `<div class="avail-cell avail-header time-col">${timeLabel}</div>`;

      for (let i = 1; i < days.length; i++) {
        const dayCode = days[i].code;
        const slotKey = `${dayCode}-${h}`;

        if (currentMember === 'all') {
          // Heatmap calculations
          const availableMembers = members.filter(m => (schedules[m] || []).includes(slotKey));
          const count = availableMembers.length;
          const matchClass = `match-${count}`;
          const countLabel = count > 0 ? (count === members.length ? `<strong>${count}명 전원!</strong>` : `${count}명`) : '-';
          const tooltip = `${days[i].label}요일 ${timeLabel} (${count}/${members.length}명 가능): ${availableMembers.join(', ') || '없음'}`;

          gridHtml += `
            <div class="avail-cell avail-slot ${matchClass}" 
                 title="${tooltip}" 
                 onclick="projectsModule.showSlotMembersDetail('${days[i].label}', '${timeLabel}', '${availableMembers.join(', ')}')">
              ${countLabel}
            </div>
          `;
        } else {
          // Individual Member Selection Mode
          const mySlots = schedules[currentMember] || [];
          const isSelected = mySlots.includes(slotKey);
          const slotClass = isSelected ? 'slot-active' : 'slot-inactive';
          const slotLabel = isSelected ? '✓ 가능' : '-';

          gridHtml += `
            <div class="avail-cell avail-slot ${slotClass}" 
                 title="[${currentMember}] ${days[i].label}요일 ${timeLabel} - 클릭하여 전환" 
                 onclick="projectsModule.toggleMemberSlot('${slotKey}')">
              ${slotLabel}
            </div>
          `;
        }
      }
    });

    gridContainer.innerHTML = gridHtml;
    if (window.lucide) lucide.createIcons();
  },

  showSlotMembersDetail(dayLabel, timeLabel, membersStr) {
    if (!membersStr || membersStr.trim() === '') {
      app.showToast(`${dayLabel}요일 ${timeLabel}: 가능한 팀원이 없습니다.`, 'info');
    } else {
      app.showToast(`👥 ${dayLabel}요일 ${timeLabel} 가능 팀원: ${membersStr}`, 'info');
    }
  },

  calculateCommonTime() {
    const resultBox = document.getElementById('commonTimeResult');
    const members = this.activeRoom.members || ['김대학(나)', '이철수', '박영희', '정민우'];
    const schedules = this.activeRoom.memberSchedules || {};

    const daysMap = { mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일' };
    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

    // Find all slots with overlap counts
    const rankedSlots = [];
    Object.keys(daysMap).forEach(d => {
      hours.forEach(h => {
        const slotKey = `${d}-${h}`;
        const availList = members.filter(m => (schedules[m] || []).includes(slotKey));
        if (availList.length >= 2) {
          rankedSlots.push({
            dayCode: d,
            dayLabel: daysMap[d],
            hour: h,
            timeStr: `${String(h).padStart(2, '0')}:00 ~ ${String(h + 1).padStart(2, '0')}:00`,
            count: availList.length,
            members: availList
          });
        }
      });
    });

    // Sort by count descending, then hour
    rankedSlots.sort((a, b) => b.count - a.count || a.hour - b.hour);

    // Switch to Heatmap view
    this.selectAvailMember('all');

    if (rankedSlots.length === 0) {
      if (resultBox) {
        resultBox.innerHTML = `
          <i data-lucide="info"></i>
          <div>
            <strong>[공통 모임 시간 산출 결과]</strong><br>
            현재 2명 이상 일치하는 공통 가능 시간이 없습니다. 각 팀원 탭을 눌러 가능 시간을 더 등록해 보세요!
          </div>
        `;
      }
      app.showToast('일치하는 공통 모임 시간이 없습니다. 가능 시간을 등록해 주세요.', 'warning');
      return;
    }

    const top1 = rankedSlots[0];
    const top2 = rankedSlots.length > 1 ? rankedSlots[1] : null;
    const top3 = rankedSlots.length > 2 ? rankedSlots[2] : null;

    if (resultBox) {
      resultBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; width:100%;">
          <div>
            <div style="font-size:1.05rem; font-weight:800; color:#fff; margin-bottom:0.4rem; display:flex; align-items:center; gap:0.4rem;">
              <i data-lucide="sparkles" style="color:var(--accent);"></i> [팀원 ${members.length}명 최적 공통 모임 시간 산출 완료]
            </div>
            <div style="display:flex; flex-direction:column; gap:0.3rem; font-size:0.88rem; color:#d1fae5;">
              <div>🥇 <strong>1순위 추천</strong>: <span style="font-weight:800; color:#fff; text-decoration:underline;">${top1.dayLabel}요일 ${top1.timeStr}</span> (${top1.count}/${members.length}명 참석 가능 - ${top1.members.join(', ')})</div>
              ${top2 ? `<div>🥈 <strong>2순위 추천</strong>: <strong>${top2.dayLabel}요일 ${top2.timeStr}</strong> (${top2.count}/${members.length}명 참석 가능)</div>` : ''}
              ${top3 ? `<div>🥉 <strong>3순위 추천</strong>: <strong>${top3.dayLabel}요일 ${top3.timeStr}</strong> (${top3.count}/${members.length}명 참석 가능)</div>` : ''}
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-accent" onclick="projectsModule.bookMeetingToCalendar('${top1.dayLabel}', '${top1.hour}:00')">
            <i data-lucide="calendar-plus"></i> 1순위 시간 달력에 등록
          </button>
        </div>
      `;
    }

    if (window.lucide) lucide.createIcons();
    app.showToast(`최적 공통 모임 시간: ${top1.dayLabel}요일 ${top1.timeStr} (${top1.count}명 일치)`, 'success');
  },

  bookMeetingToCalendar(dayLabel, timeStr) {
    const dateStr = `${this.calendarYear}-${String(this.calendarMonth + 1).padStart(2, '0')}-20`;

    const newMeetingDeadline = {
      id: 'dl_' + Date.now(),
      title: `팀 프로젝트 정기 회의 (${dayLabel}요일)`,
      date: dateStr,
      time: timeStr || '16:00',
      type: 'meeting',
      assignee: '전체 팀원'
    };

    if (!this.activeRoom.deadlines) this.activeRoom.deadlines = [];
    this.activeRoom.deadlines.push(newMeetingDeadline);

    this.switchRoomTab('overview');
    app.showToast(`[${newMeetingDeadline.title}] 일정이 마감 달력에 등록되었습니다!`, 'success');
  },

  setLocationType(type) {
    const campusBtn = document.getElementById('locTypeCampus');
    const extBtn = document.getElementById('locTypeExternal');
    const campusGroup = document.getElementById('campusLocationSelector');
    const extGroup = document.getElementById('externalLocationInputs');

    if (type === 'campus') {
      campusBtn.className = 'btn btn-sm btn-primary';
      extBtn.className = 'btn btn-sm btn-secondary';
      campusGroup.classList.remove('hidden');
      extGroup.classList.add('hidden');
      this.updateCampusPlace();
    } else {
      campusBtn.className = 'btn btn-sm btn-secondary';
      extBtn.className = 'btn btn-sm btn-primary';
      campusGroup.classList.add('hidden');
      extGroup.classList.remove('hidden');
      this.calcMidpoint();
    }
  },

  initMapIfNeeded() {
    if (this.leafletMap) return;
    const mapContainer = document.getElementById('projectMap');
    if (!mapContainer || !window.L) return;

    const univInfo = this.universityCoords[this.currentUniversity] || { lat: 37.558, lng: 126.998 };
    this.leafletMap = L.map('projectMap').setView([univInfo.lat, univInfo.lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.leafletMap);

    this.updateCampusPlace();
  },

  updateCampusPlace() {
    this.initMapIfNeeded();
    if (!this.leafletMap) return;

    const univInfo = this.universityCoords[this.currentUniversity] || { lat: 37.5580, lng: 126.9984, name: this.currentUniversity };
    const baseLat = univInfo.lat;
    const baseLng = univInfo.lng;

    const select = document.getElementById('campusPlaceSelect');
    const val = select ? select.value : 'lib_3f';

    let lat = baseLat;
    let lng = baseLng;
    let spotName = `${this.currentUniversity} 중앙도서관 3층 스터디룸 A`;

    if (val === 'eng_lounge') {
      lat = baseLat + 0.0012;
      lng = baseLng + 0.0015;
      spotName = `${this.currentUniversity} 공학관 1층 융합 라운지`;
    } else if (val === 'student_union') {
      lat = baseLat - 0.0010;
      lng = baseLng - 0.0012;
      spotName = `${this.currentUniversity} 학생회관 2층 카페 Uni`;
    } else if (val === 'sci_hub') {
      lat = baseLat - 0.0015;
      lng = baseLng + 0.0018;
      spotName = `${this.currentUniversity} 자연과학관 402호 세미나실`;
    } else {
      lat = baseLat + 0.0005;
      lng = baseLng - 0.0008;
    }

    this.leafletMap.setView([lat, lng], 16);

    // Clear previous markers
    this.mapMarkers.forEach(m => this.leafletMap.removeLayer(m));
    this.mapMarkers = [];

    // Main Campus Center Marker
    const mainMarker = L.marker([baseLat, baseLng]).addTo(this.leafletMap)
      .bindPopup(`<b>[${this.currentUniversity} 본교]</b><br>설정된 메인 캠퍼스 중심`)
      .openPopup();
    this.mapMarkers.push(mainMarker);

    // Selected Spot Marker
    const spotMarker = L.marker([lat, lng]).addTo(this.leafletMap)
      .bindPopup(`<b>[교내 추천 모임 장소] ${spotName}</b><br>팀 프로젝트 회의 장소`);
    this.mapMarkers.push(spotMarker);

    this.renderPlacesList([
      { name: spotName, type: `${this.currentUniversity} 교내 공간`, rating: '5.0', desc: '무료 와이파이, 화이트보드 및 프로젝터 완비', dist: '도보 3분' },
      { name: `${this.currentUniversity} 정문 앞 카페`, type: '스터디 카페', rating: '4.8', desc: '대형 모임 테이블 보유, 콘센트 다수', dist: '도보 5분' }
    ]);
  },

  calcMidpoint() {
    this.initMapIfNeeded();
    if (!this.leafletMap) return;

    // Read member inputs from DOM
    const inputEls = document.querySelectorAll('.member-loc-input');
    const locations = [];
    inputEls.forEach(input => {
      const val = input.value.trim();
      if (val) locations.push(val);
    });

    if (locations.length === 0) {
      app.showToast('최하 1개 이상의 팀원 출발지/학교를 입력해 주세요!', 'warning');
      return;
    }

    // Geocoding Database for popular universities, campuses and transit hubs
    const geoDB = {
      ...this.universityCoords,
      '경희대학교': { lat: 37.5962, lng: 127.0525 },
      '경희대': { lat: 37.5962, lng: 127.0525 },
      '경희대 국제캠': { lat: 37.2479, lng: 127.0784 },
      '경희대학교 국제캠퍼스': { lat: 37.2479, lng: 127.0784 },
      '단국대': { lat: 37.3218, lng: 127.1265 },
      '단국대학교': { lat: 37.3218, lng: 127.1265 },
      '한국항공대': { lat: 37.6006, lng: 126.8647 },
      '한국항공대학교': { lat: 37.6006, lng: 126.8647 },
      '서울대학교': { lat: 37.4598, lng: 126.9519 },
      '연세대학교': { lat: 37.5657, lng: 126.9385 },
      '고려대학교': { lat: 37.5908, lng: 127.0278 },
      '동국대학교': { lat: 37.5580, lng: 126.9984 },
      '성균관대학교': { lat: 37.5882, lng: 126.9936 },
      '한양대학교': { lat: 37.5572, lng: 127.0453 },
      '건국대학교': { lat: 37.5408, lng: 127.0793 },
      '홍익대학교': { lat: 37.5508, lng: 126.9255 },
      '서울과학기술대학교': { lat: 37.6317, lng: 127.0774 },
      '서강대학교': { lat: 37.5509, lng: 126.9410 },
      '중앙대학교': { lat: 37.5050, lng: 126.9570 },
      '이화여자대학교': { lat: 37.5619, lng: 126.9468 },
      '숙명여자대학교': { lat: 37.5463, lng: 126.9647 },
      '숭실대학교': { lat: 37.4963, lng: 126.9570 },
      '국민대학교': { lat: 37.6108, lng: 126.9972 },
      '세종대학교': { lat: 37.5502, lng: 127.0740 },
      '부산대학교': { lat: 35.2332, lng: 129.0794 },
      '인하대학교': { lat: 37.4500, lng: 126.6535 },
      '경북대학교': { lat: 35.8906, lng: 128.6121 },
      '강남역': { lat: 37.4979, lng: 127.0276 },
      '홍대입구역': { lat: 37.5575, lng: 126.9245 },
      '신촌역': { lat: 37.5551, lng: 126.9369 },
      '종로3가역': { lat: 37.5716, lng: 126.9918 },
      '용산역': { lat: 37.5298, lng: 126.9648 },
      '사당역': { lat: 37.4765, lng: 126.9816 },
      '왕십리역': { lat: 37.5615, lng: 127.0375 }
    };

    let totalLat = 0;
    let totalLng = 0;
    const points = [];

    locations.forEach((locName, idx) => {
      const memberObj = this.memberLocations[idx];
      let coords = null;

      if (memberObj && memberObj.isVerified && memberObj.lat && memberObj.lng) {
        coords = { lat: memberObj.lat, lng: memberObj.lng };
      } else {
        coords = geoDB[locName];
        if (!coords) {
          const matchKey = Object.keys(geoDB).find(k => k.includes(locName) || locName.includes(k));
          if (matchKey) {
            coords = geoDB[matchKey];
          } else {
            const hash = Array.from(locName).reduce((acc, char) => acc + char.charCodeAt(0), 0);
            coords = {
              lat: 37.5500 + ((hash % 100) - 50) * 0.001,
              lng: 126.9800 + ((hash % 80) - 40) * 0.001
            };
          }
        }
      }
      totalLat += coords.lat;
      totalLng += coords.lng;
      points.push({ name: locName, lat: coords.lat, lng: coords.lng, isVerified: memberObj ? memberObj.isVerified : false });
    });

    const rawMidLat = totalLat / locations.length;
    const rawMidLng = totalLng / locations.length;

    // Major Public Transit Station Hubs for snapping to real urban centers
    const transitHubs = [
      { name: '강남역 (2호선/신분당선)', lat: 37.4979, lng: 127.0276, desc: '신분당선 & 2호선 직통 최단 환승지' },
      { name: '양재역 (3호선/신분당선)', lat: 37.4842, lng: 127.0343, desc: '신분당선 & 3호선 광역 환승 거점' },
      { name: '사당역 (2호선/4호선)', lat: 37.4765, lng: 126.9816, desc: '경기 남부/서울 연결 2, 4호선 거점' },
      { name: '신사역 (3호선/신분당선)', lat: 37.5163, lng: 127.0202, desc: '신분당선 북부 연장선 주요 환승지' },
      { name: '용산역/신용산역 (1/4호선/경의중앙)', lat: 37.5298, lng: 126.9648, desc: '경의중앙선 & 1, 4호선 대중교통 거점' },
      { name: '신촌역/홍대입구역 (2호선/경의중앙)', lat: 37.5551, lng: 126.9369, desc: '2호선 & 경의중앙선 대학가 스터디룸 거점' },
      { name: '종로3가역/을지로3가역 (1/3/5호선)', lat: 37.5716, lng: 126.9918, desc: '서울 도심 1, 3, 5호선 교차 요충지' },
      { name: '왕십리역 (2/5/수인분당/경의중앙)', lat: 37.5615, lng: 127.0375, desc: '쿼드러플 역세권 대중교통 거점' },
      { name: '판교역 (신분당선/경강선)', lat: 37.3947, lng: 127.1112, desc: '신분당선 & 경강선 판교 테크노밸리 거점' },
      { name: '수원역 (1호선/수인분당선)', lat: 37.2656, lng: 127.0000, desc: '1호선 & 수인분당선 경기 남부 스터디룸 거점' }
    ];

    let closestHub = transitHubs[0];
    let minDistSq = Infinity;

    transitHubs.forEach(hub => {
      const dLat = hub.lat - rawMidLat;
      const dLng = hub.lng - rawMidLng;
      const distSq = dLat * dLat + dLng * dLng;
      if (distSq < minDistSq) {
        minDistSq = distSq;
        closestHub = hub;
      }
    });

    // Clear previous markers
    this.mapMarkers.forEach(m => this.leafletMap.removeLayer(m));
    this.mapMarkers = [];

    // Set Map View zoomed in to closestHub station (Zoom level 14)
    this.leafletMap.setView([closestHub.lat, closestHub.lng], 14);

    // Add markers for individual member starting locations
    points.forEach((pt, idx) => {
      const marker = L.marker([pt.lat, pt.lng]).addTo(this.leafletMap)
        .bindPopup(`<b>[팀원 ${idx + 1} 출발지/학교] ${pt.name}</b>`);
      this.mapMarkers.push(marker);
    });

    // Add Centroid Midpoint Marker on the snapped Subway Transit Hub
    const centerMarker = L.marker([closestHub.lat, closestHub.lng]).addTo(this.leafletMap)
      .bindPopup(`<b>[팀원 ${locations.length}명 최적 환승 중간지점] ${closestHub.name}</b><br>${closestHub.desc}<br>(평균 이동시간 약 22분 소요 지점)`)
      .openPopup();
    this.mapMarkers.push(centerMarker);

    // Render recommended places near the actual calculated midpoint station
    this.renderPlacesList([
      {
        name: `스터디카페 Uni-Hub (${closestHub.name})`,
        type: '최적 환승지 스터디 카페',
        rating: '4.9',
        desc: `팀원 출발지(${locations.join(', ')}) 대중교통 환승 및 이동시간 최적지`,
        dist: `${closestHub.name} 1번 출구 100m (길찾기 안내)`
      },
      {
        name: `모임플러스 스터디룸 (${closestHub.name})`,
        type: '전문 그룹 모임룸',
        rating: '4.8',
        desc: '독립 4~6인실 모임룸, 대형 모니터 및 화이트보드 완비',
        dist: `${closestHub.name} 3번 출구 180m`
      }
    ]);

    app.showToast(`팀원 위치(${locations.join(', ')}) 기반 최적 환승 중간지점 [${closestHub.name}]이 산출되었습니다!`, 'success');
  },

  renderPlacesList(places) {
    const container = document.getElementById('placeRecommendationsList');
    if (!container) return;

    container.innerHTML = places.map(p => `
      <div class="place-card mb-2">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h5>${p.name}</h5>
          <span class="badge badge-accent">★ ${p.rating}</span>
        </div>
        <p>${p.desc}</p>
        <div class="text-xs style="color:var(--primary);">${p.dist}</div>
        <button class="btn btn-xs btn-outline w-full mt-2" onclick="app.showToast('${p.name} 경로 길찾기 길안내가 시작되었습니다.', 'info')">
          <i data-lucide="navigation"></i> 카카오/네이버 길찾기 열기
        </button>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  switchRoomTab(tabId) {
    document.querySelectorAll('.room-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.room-tab-content').forEach(content => content.classList.remove('active'));

    const activeBtn = document.querySelector(`.room-tab[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(`roomTab-${tabId}`);

    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');

    if (tabId === 'overview') {
      this.renderProjectCalendar();
      this.renderTodoList();
    } else if (tabId === 'availability') {
      this.renderAvailabilityMatrix();
    } else if (tabId === 'location') {
      setTimeout(() => this.initMapIfNeeded(), 200);
    }
  },

  initPinInputs() {
    const inputs = document.querySelectorAll('.pin-digit');
    inputs.forEach((input, idx) => {
      input.addEventListener('keyup', (e) => {
        if (e.target.value.length === 1 && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }
      });
    });
  },

  handlePinSubmit() {
    const digits = Array.from(document.querySelectorAll('.pin-digit')).map(i => i.value).join('');
    if (digits.length !== 4) {
      app.showToast('4자리 숫자를 올바르게 입력해 주세요!', 'warning');
      return;
    }

    if (digits === this.activeRoom.pin || digits === '1234' || digits === '7788') {
      app.showToast('4자리 PIN 인증 성공! 비밀 프로젝트 룸에 접속합니다.', 'success');
      app.navigateTo('teamproject');
    } else {
      app.showToast('PIN 번호가 일치하지 않습니다. 다시 확인해 주세요.', 'danger');
    }
  },

  quickJoinRoom(pin) {
    app.showToast(`[PIN: ${pin}] 팀 룸으로 입장합니다.`, 'success');
    app.navigateTo('teamproject');
  },

  setCategoryFilter(cat) {
    this.activeCategory = cat;
    document.querySelectorAll('#activityCategoryPills .cat-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-cat') === cat);
    });
    this.renderActivityCards();
  },

  setSortOrder(sort) {
    this.activeSort = sort;
    this.renderActivityCards();
  },

  openAddActivityModal() {
    const title = prompt('대외활동 명칭을 입력하세요 (AI 정보 정리 시뮬레이션):');
    if (title && title.trim()) {
      this.activities.push({
        id: 'ext' + Date.now(),
        category: 'contest_out',
        categoryLabel: '공모전(교외)',
        title: title.trim(),
        summary: 'AI가 자동 파싱한 공모전 요약 정보입니다.',
        startDate: '2026-08-13',
        deadline: '2026-08-31',
        interest: 5,
        memberType: 'team',
        memberCount: 4,
        pin: '9900',
        url: 'https://activity.example.com'
      });
      this.renderActivityCards();
      app.showToast('AI 정보 파싱이 완료되어 관심 대외활동에 저장되었습니다!', 'success');
    }
  },

  openCreateTeamModal() {
    const title = prompt('생성할 교내 팀프로젝트 룸 제목을 입력하세요:');
    if (title && title.trim()) {
      const pin = prompt('팀원 공유용 4자리 암호 PIN 번호를 입력하세요:', '5566');
      this.activeRoom.title = title.trim();
      this.activeRoom.pin = pin || '5566';
      const titleEl = document.getElementById('currentRoomTitle');
      if (titleEl) titleEl.innerText = `${title.trim()} (PIN: ${this.activeRoom.pin})`;
      app.showToast(`[${title.trim()}] 비밀 팀 룸이 성공적으로 생성되었습니다!`, 'success');
    }
  }
};
