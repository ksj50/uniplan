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
      { id: 'td1', title: '프로젝트 요구사항 정의서 작성', assignee: '김대학(나)', done: true },
      { id: 'td2', title: 'Leaflet 지도 API 연동 및 중간지점 산출 로직 구현', assignee: '이철수', done: false },
      { id: 'td3', title: 'UI Glassmorphic CSS 스타일링 가이드 적용', assignee: '박영희', done: false }
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
    ]
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
    this.renderSharedLinks();
    this.renderPhotoGallery();
    this.renderChatSystem();
    this.renderAvailabilityMatrix();
  },

  renderTodoList() {
    const container = document.getElementById('teamTodoList');
    if (!container) return;

    container.innerHTML = this.activeRoom.todos.map(t => `
      <div class="activity-card mb-2" style="padding:0.75rem 1rem;">
        <div style="display:flex; align-items:center; gap:0.8rem; width:100%;">
          <input type="checkbox" ${t.done ? 'checked' : ''} onchange="projectsModule.toggleTodo('${t.id}')">
          <div style="flex:1;">
            <div style="font-size:0.88rem; ${t.done ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${t.title}</div>
            <div class="text-xs text-muted">담당자: ${t.assignee}</div>
          </div>
          <span class="badge ${t.done ? 'badge-success' : 'badge-warning'}">${t.done ? '완료' : '진행 중'}</span>
        </div>
      </div>
    `).join('');
  },

  toggleTodo(id) {
    const todo = this.activeRoom.todos.find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      this.renderTodoList();
    }
  },

  addTodo() {
    const title = prompt('새 To-Do 할 일 제목을 입력하세요:');
    if (title && title.trim()) {
      this.activeRoom.todos.push({
        id: 'td' + Date.now(),
        title: title.trim(),
        assignee: '김대학(나)',
        done: false
      });
      this.renderTodoList();
      app.showToast('새 To-Do 항목이 추가되었습니다.', 'success');
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
    this.openPhotoUploadModal();
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
      this.openPhotoUploadModal();
      this.processFiles(e.dataTransfer.files);
    }
  },

  handleFilesSelected(e) {
    if (e.target && e.target.files && e.target.files.length > 0) {
      this.processFiles(e.target.files);
    }
  },

  handleDirectFilesSelected(e) {
    if (e.target && e.target.files && e.target.files.length > 0) {
      this.openPhotoUploadModal();
      this.processFiles(e.target.files);
    }
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
        <div class="overlay">
          <div class="photo-meta">
            <span class="photo-uploader"><i data-lucide="user" style="width:12px;height:12px;"></i> ${p.uploader}</span>
            <span class="photo-date">${p.date}</span>
          </div>
          <div class="photo-actions" onclick="event.stopPropagation()">
            <button class="btn-gallery-del" title="사진 삭제" onclick="projectsModule.deleteGalleryPhoto('${p.id}', event)">
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

  viewPhotoDetail(id) {
    const photo = this.activeRoom.photos.find(p => p.id === id);
    if (!photo) return;

    const img = document.getElementById('photoDetailImg');
    const title = document.getElementById('photoDetailTitle');
    const uploader = document.getElementById('photoDetailUploader');
    const date = document.getElementById('photoDetailDate');
    const downloadBtn = document.getElementById('photoDetailDownloadBtn');

    if (img) img.src = photo.url;
    if (title) title.innerHTML = `<i data-lucide="image"></i> ${photo.name || '공유 사진'}`;
    if (uploader) uploader.innerHTML = `<i data-lucide="user"></i> 업로더: <strong>${photo.uploader}</strong>`;
    if (date) date.innerHTML = `<i data-lucide="calendar"></i> 업로드일: <strong>${photo.date}</strong>`;
    if (downloadBtn) {
      downloadBtn.href = photo.url;
      downloadBtn.download = photo.name || `photo_${photo.id}.jpg`;
    }

    app.openModal('photoDetailModal');
    if (window.lucide) lucide.createIcons();
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

  renderAvailabilityMatrix() {
    const container = document.getElementById('availabilityGrid');
    if (!container) return;

    const days = ['시간', '월', '화', '수', '목', '금', '토', '일'];
    const times = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

    let html = days.map(d => `<div class="avail-cell avail-header">${d}</div>`).join('');

    times.forEach(t => {
      html += `<div class="avail-cell avail-header">${t}</div>`;
      for (let i = 1; i <= 7; i++) {
        // Simulating matches (Match 4 = all 4 members available on Wed 16:00 & Thu 18:00)
        let matchClass = '';
        let label = '';

        if ((i === 3 && t === '16:00') || (i === 4 && t === '18:00')) {
          matchClass = 'match-4';
          label = '4명 전원 가능!';
        } else if ((i === 1 && t === '14:00') || (i === 5 && t === '16:00')) {
          matchClass = 'match-3';
          label = '3명 가능';
        } else {
          matchClass = 'match-2';
          label = '2명 가능';
        }

        html += `<div class="avail-cell avail-slot ${matchClass}" title="${days[i]}요일 ${t}">${label}</div>`;
      }
    });

    container.innerHTML = html;
  },

  calculateCommonTime() {
    const resultBox = document.getElementById('commonTimeResult');
    if (resultBox) {
      resultBox.innerHTML = `
        <i data-lucide="sparkles"></i>
        <div>
          <strong>[팀원 4명 최적 공통 모임 시간 산출 완료]</strong><br>
          1순위: <strong>수요일 16:00 ~ 18:00 (4명 전원 참석 가능)</strong><br>
          2순위: <strong>목요일 18:00 ~ 20:00 (4명 전원 참석 가능)</strong>
        </div>
      `;
    }
    app.showToast('팀원 전원이 참여 가능한 모임 시간이 산출되었습니다.', 'success');
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

    if (tabId === 'location') {
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
