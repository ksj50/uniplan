/**
 * Module 6: In-Flight Study Mode & 360° 3D Pomodoro Service
 */
const studyModeModule = {
  // Timer State
  focusMinutes: 25,
  breakMinutes: 5,
  secondsRemaining: 25 * 60,
  timerState: 'stopped', // 'stopped', 'running', 'paused'
  timerInterval: null,
  currentSubject: '자료구조 및 알고리즘',

  // Audio Noise Generator (Web Audio API)
  audioCtx: null,
  noiseNode: null,
  gainNode: null,
  filterNode: null,
  isAudioPlaying: false,
  volume: 0.3,

  // 360-Degree Three.js 3D View State
  scene: null,
  camera: null,
  renderer: null,
  lon: 0,
  lat: 0,
  phi: 0,
  theta: 0,
  isUserInteracting: false,
  onPointerDownPointerX: 0,
  onPointerDownPointerY: 0,
  onPointerDownLon: 0,
  onPointerDownLat: 0,
  cloudsGroup: null,

  // Map & Flight Route State
  flightMap: null,
  airplaneMarker: null,
  flightPathPolyline: null,
  currentRouteKey: 'icn_cdg',

  routes: {
    icn_cdg: {
      title: '인천(ICN) ✈️ 파리(CDG)',
      dist: '8,900 km',
      coords: [
        [37.4606, 126.4407], // ICN
        [40.0000, 116.4000], // Beijing
        [43.0000, 87.6000],   // Urumqi
        [55.7558, 37.6173],   // Moscow
        [52.5200, 13.4050],   // Berlin
        [48.8566, 2.3522]    // CDG
      ]
    },
    icn_nrt: {
      title: '인천(ICN) ✈️ 도쿄(NRT)',
      dist: '1,260 km',
      coords: [
        [37.4606, 126.4407], // ICN
        [37.5500, 129.0000], // East Sea
        [36.6500, 137.1500], // Toyama
        [35.7647, 140.3863]  // NRT
      ]
    },
    icn_jfk: {
      title: '인천(ICN) ✈️ 뉴욕(JFK)',
      dist: '11,050 km',
      coords: [
        [37.4606, 126.4407], // ICN
        [45.0000, 142.0000], // Sakhalin
        [61.2181, -149.9003], // Anchorage
        [49.2827, -123.1207], // Vancouver
        [40.6413, -73.7781]  // JFK
      ]
    },
    icn_lhr: {
      title: '인천(ICN) ✈️ 런던(LHR)',
      dist: '8,860 km',
      coords: [
        [37.4606, 126.4407], // ICN
        [52.0000, 104.0000], // Irkutsk
        [60.1699, 24.9384],  // Helsinki
        [51.4700, -0.4543]   // LHR
      ]
    }
  },

  // Study History Logs
  studyLogs: [
    { id: 'log1', date: '2026-08-12', subject: '자료구조 및 알고리즘', minutes: 50, scope: 'Red-Black Tree 삽입/삭제 알고리즘 5문제 해결' },
    { id: 'log2', date: '2026-08-13', subject: '운영체제', minutes: 25, scope: '세마포어와 뮤텍스 락 차이점 노트 정돈' }
  ],

  init() {
    this.renderStudyLogs();
    this.setupListeners();
    this.updateTimerDisplay();
  },

  setupListeners() {
    const subjSelect = document.getElementById('studySubjectSelect');
    if (subjSelect) {
      subjSelect.onchange = (e) => {
        this.currentSubject = e.target.value;
      };
    }
  },

  // ---------------- 360-DEGREE ROTATABLE 3D SCENE ----------------
  init3DPanorama() {
    const container = document.getElementById('panorama360Container');
    if (!container || this.renderer) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 320;

    // Three.js Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    // 360 Sky Sphere Geometry
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    // Canvas procedural sky texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#0F172A');
    grad.addColorStop(0.4, '#1E293B');
    grad.addColorStop(0.7, '#0284C7');
    grad.addColorStop(1.0, '#38BDF8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Add procedurally generated clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * 1024;
      const ry = 250 + Math.random() * 180;
      const rw = 120 + Math.random() * 200;
      const rh = 40 + Math.random() * 60;
      ctx.beginPath();
      ctx.ellipse(rx, ry, rw, rh, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    // Add 3D Floating Clouds
    this.cloudsGroup = new THREE.Group();
    for (let i = 0; i < 15; i++) {
      const cloudGeo = new THREE.SphereGeometry(25 + Math.random() * 25, 12, 12);
      const cloudMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.2
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      cloudMesh.position.set(
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 200 - 50,
        (Math.random() - 0.5) * 600
      );
      this.cloudsGroup.add(cloudMesh);
    }
    this.scene.add(this.cloudsGroup);

    // WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

    // Mouse & Touch 360 Drag Event Listeners
    container.addEventListener('pointerdown', (e) => this.onPointerDown(e), false);
    container.addEventListener('pointermove', (e) => this.onPointerMove(e), false);
    container.addEventListener('pointerup', () => this.onPointerUp(), false);

    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.animate3D();
  },

  onPointerDown(e) {
    this.isUserInteracting = true;
    this.onPointerDownPointerX = e.clientX;
    this.onPointerDownPointerY = e.clientY;
    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;
  },

  onPointerMove(e) {
    if (!this.isUserInteracting) return;
    this.lon = (this.onPointerDownPointerX - e.clientX) * 0.25 + this.onPointerDownLon;
    this.lat = (e.clientY - this.onPointerDownPointerY) * 0.25 + this.onPointerDownLat;
  },

  onPointerUp() {
    this.isUserInteracting = false;
  },

  onWindowResize() {
    const container = document.getElementById('panorama360Container');
    if (!container || !this.renderer || !this.camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  animate3D() {
    requestAnimationFrame(() => this.animate3D());

    if (!this.isUserInteracting) {
      this.lon += 0.04; // Gentle auto-pan
    }

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    this.camera.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.target.y = 500 * Math.cos(this.phi);
    this.camera.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(this.camera.target);

    // Slowly move 3D clouds
    if (this.cloudsGroup) {
      this.cloudsGroup.rotation.y += 0.0008;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  },

  // ---------------- REALTIME SATELLITE FLIGHT MAP ----------------
  initFlightMap() {
    const container = document.getElementById('flightRouteMap');
    if (!container) return;

    if (this.flightMap) {
      setTimeout(() => {
        this.flightMap.invalidateSize();
      }, 200);
      return;
    }

    // Leaflet Satellite World Map
    this.flightMap = L.map('flightRouteMap', { zoomControl: true }).setView([45.0, 50.0], 2);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri World Imagery'
    }).addTo(this.flightMap);

    this.drawRoute();

    setTimeout(() => {
      if (this.flightMap) this.flightMap.invalidateSize();
    }, 300);
  },

  changeRoute(routeKey) {
    if (!this.routes[routeKey]) return;
    this.currentRouteKey = routeKey;
    this.drawRoute();
  },

  drawRoute() {
    if (!this.flightMap) return;

    const routeData = this.routes[this.currentRouteKey] || this.routes.icn_cdg;

    // Update Ticket Boarding Pass Text
    const origCodeEl = document.getElementById('ticketOriginCode');
    const origNameEl = document.getElementById('ticketOriginName');
    const destCodeEl = document.getElementById('ticketDestCode');
    const destNameEl = document.getElementById('ticketDestName');
    const flightTimeEl = document.getElementById('ticketFlightTime');

    if (this.currentRouteKey === 'icn_cdg') {
      if (origCodeEl) origCodeEl.innerText = 'ICN';
      if (origNameEl) origNameEl.innerText = 'Incheon (Seoul)';
      if (destCodeEl) destCodeEl.innerText = 'CDG';
      if (destNameEl) destNameEl.innerText = 'Paris (Charles de Gaulle)';
      if (flightTimeEl) flightTimeEl.innerText = '8h 45m Flight';
    } else if (this.currentRouteKey === 'icn_nrt') {
      if (origCodeEl) origCodeEl.innerText = 'ICN';
      if (origNameEl) origNameEl.innerText = 'Incheon (Seoul)';
      if (destCodeEl) destCodeEl.innerText = 'NRT';
      if (destNameEl) destNameEl.innerText = 'Tokyo (Narita)';
      if (flightTimeEl) flightTimeEl.innerText = '2h 15m Flight';
    } else if (this.currentRouteKey === 'icn_jfk') {
      if (origCodeEl) origCodeEl.innerText = 'ICN';
      if (origNameEl) origNameEl.innerText = 'Incheon (Seoul)';
      if (destCodeEl) destCodeEl.innerText = 'JFK';
      if (destNameEl) destNameEl.innerText = 'New York (John F. Kennedy)';
      if (flightTimeEl) flightTimeEl.innerText = '14h 20m Flight';
    } else if (this.currentRouteKey === 'icn_lhr') {
      if (origCodeEl) origCodeEl.innerText = 'ICN';
      if (origNameEl) origNameEl.innerText = 'Incheon (Seoul)';
      if (destCodeEl) destCodeEl.innerText = 'LHR';
      if (destNameEl) destNameEl.innerText = 'London (Heathrow)';
      if (flightTimeEl) flightTimeEl.innerText = '11h 30m Flight';
    }

    // Sync Passenger Name from User Profile
    const passNameEl = document.getElementById('ticketPassengerName');
    if (passNameEl) {
      const saved = localStorage.getItem('uniplan_user_profile');
      if (saved) {
        try {
          const p = JSON.parse(saved);
          if (p.name) passNameEl.innerText = `${p.name} 학생`;
        } catch (e) {}
      }
    }

    // Clear old lines/markers
    if (this.flightPathPolyline) this.flightMap.removeLayer(this.flightPathPolyline);
    if (this.airplaneMarker) this.flightMap.removeLayer(this.airplaneMarker);

    // Draw glowing flight route line
    this.flightPathPolyline = L.polyline(routeData.coords, {
      color: '#F59E0B',
      weight: 4,
      dashArray: '8, 12',
      opacity: 0.9
    }).addTo(this.flightMap);

    // Custom Glowing Airplane Icon
    const planeIcon = L.divIcon({
      className: 'custom-plane-icon',
      html: `<div style="color:#38BDF8; font-size:24px; filter:drop-shadow(0 0 8px rgba(56,189,248,0.9)); transform:rotate(45deg);">✈️</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    this.airplaneMarker = L.marker(routeData.coords[0], { icon: planeIcon }).addTo(this.flightMap);
    this.flightMap.fitBounds(this.flightPathPolyline.getBounds(), { padding: [30, 30] });

    // Update Telemetry Text
    const routeText = document.getElementById('routeTitleText');
    const distText = document.getElementById('telemetryDist');
    if (routeText) routeText.innerText = routeData.title;
    if (distText) distText.innerText = routeData.dist;

    this.updateAirplanePosition(this.flightProgress);
  },

  updateAirplanePosition(progress) {
    if (!this.airplaneMarker || !this.routes[this.currentRouteKey]) return;

    const routeData = this.routes[this.currentRouteKey];
    const coords = routeData.coords;
    const totalSegments = coords.length - 1;
    const scaledProgress = Math.min(Math.max(progress, 0), 1) * totalSegments;
    const index = Math.floor(scaledProgress);
    const segmentProgress = scaledProgress - index;

    if (index >= totalSegments) {
      this.airplaneMarker.setLatLng(coords[totalSegments]);
      return;
    }

    const start = coords[index];
    const end = coords[index + 1];

    const lat = start[0] + (end[0] - start[0]) * segmentProgress;
    const lng = start[1] + (end[1] - start[1]) * segmentProgress;

    this.airplaneMarker.setLatLng([lat, lng]);

    const speedEl = document.getElementById('telemetrySpeed');
    if (speedEl) speedEl.innerText = `${Math.floor(870 + Math.random() * 25)} km/h`;
  },

  // ---------------- TIMER CONTROL ----------------
  setTimerMode(focusMins, breakMins) {
    if (this.timerState === 'running') {
      if (!confirm('현재 진행 중인 뽀모도로 공부 타이머를 새로 시작하시겠습니까?')) return;
    }
    this.pauseTimer();
    this.focusMinutes = focusMins;
    this.breakMinutes = breakMins;
    this.secondsRemaining = focusMins * 60;
    this.timerState = 'stopped';
    this.flightProgress = 0;
    this.updateTimerDisplay();
    this.updateAirplanePosition(0);
    app.showToast(`[뽀모도로 설정] ${focusMins}분 집중 / ${breakMins}분 휴식 모드 선택됨`, 'info');
  },

  startTimer() {
    if (this.timerState === 'running') return;

    this.timerState = 'running';
    this.startAirplaneAudio();

    const startTotalSecs = this.focusMinutes * 60;

    this.timerInterval = setInterval(() => {
      if (this.secondsRemaining > 0) {
        this.secondsRemaining--;
        this.updateTimerDisplay();

        const elapsedSecs = startTotalSecs - this.secondsRemaining;
        this.flightProgress = elapsedSecs / startTotalSecs;
        this.updateAirplanePosition(this.flightProgress);
      } else {
        this.pauseTimer();
        this.playBellSound();
        app.showToast('🎉 뽀모도로 목표 집중 시간 달성! 오늘 공부한 학습 범위를 기록해 보세요.', 'success');
        this.openFinishModal();
      }
    }, 1000);

    const startBtn = document.getElementById('startStudyBtn');
    const pauseBtn = document.getElementById('pauseStudyBtn');
    if (startBtn) startBtn.classList.add('hidden');
    if (pauseBtn) pauseBtn.classList.remove('hidden');

    app.showToast('✈️ 360° 3D 공부 뷰 & 기내 백색소음 타이머 시작!', 'success');
  },

  pauseTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.timerState = 'paused';
    this.stopAirplaneAudio();

    const startBtn = document.getElementById('startStudyBtn');
    const pauseBtn = document.getElementById('pauseStudyBtn');
    if (startBtn) startBtn.classList.remove('hidden');
    if (pauseBtn) pauseBtn.classList.add('hidden');
  },

  resetTimer() {
    this.pauseTimer();
    this.secondsRemaining = this.focusMinutes * 60;
    this.timerState = 'stopped';
    this.flightProgress = 0;
    this.updateTimerDisplay();
    this.updateAirplanePosition(0);
    app.showToast('타이머가 초기화되었습니다.', 'info');
  },

  updateTimerDisplay() {
    const mins = Math.floor(this.secondsRemaining / 60);
    const secs = this.secondsRemaining % 60;
    const timeStr = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;

    const clockEl = document.getElementById('pomodoroClockDisplay');
    if (clockEl) clockEl.innerText = timeStr;
  },

  // ---------------- AUDIO ENGINE ----------------
  startAirplaneAudio() {
    if (this.isAudioPlaying) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const bufferSize = this.audioCtx.sampleRate * 5;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.value = 160;

      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.volume;

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.noiseNode.start();
      this.isAudioPlaying = true;

      const audioBadge = document.getElementById('audioStatusBadge');
      if (audioBadge) audioBadge.innerHTML = `<i data-lucide="volume-2"></i> ✈️ 기내 엔진 소음 재생 중`;
    } catch (e) {
      console.log(e);
    }
  },

  stopAirplaneAudio() {
    if (!this.isAudioPlaying) return;
    try {
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      this.isAudioPlaying = false;
      const audioBadge = document.getElementById('audioStatusBadge');
      if (audioBadge) audioBadge.innerHTML = `<i data-lucide="volume-x"></i> 기내 소음 일시정지`;
    } catch (e) {}
  },

  toggleAudio() {
    if (this.isAudioPlaying) {
      this.stopAirplaneAudio();
    } else {
      this.startAirplaneAudio();
    }
  },

  setVolume(volVal) {
    this.volume = parseFloat(volVal);
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
  },

  playBellSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {}
  },

  openFinishModal() {
    const modal = document.getElementById('finishStudyModal');
    const subjInput = document.getElementById('finishStudySubject');
    if (subjInput) subjInput.value = this.currentSubject;
    if (modal) modal.classList.remove('hidden');
  },

  saveStudyLog() {
    const subject = document.getElementById('finishStudySubject').value.trim() || this.currentSubject;
    const scope = document.getElementById('finishStudyScope').value.trim();

    if (!scope) {
      app.showToast('오늘 공부한 학습 범위를 간단히 작성해 주세요!', 'warning');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    this.studyLogs.unshift({
      id: 'log_' + Date.now(),
      date: todayStr,
      subject: subject,
      minutes: this.focusMinutes,
      scope: scope
    });

    this.renderStudyLogs();
    app.closeModal('finishStudyModal');
    app.showToast(`[${subject}] ${this.focusMinutes}분 공부 성과 일지가 저장되었습니다!`, 'success');
  },

  renderStudyLogs() {
    const container = document.getElementById('studyLogList');
    if (!container) return;

    if (this.studyLogs.length === 0) {
      container.innerHTML = `<div class="text-muted text-xs">아직 기록된 공부 일지가 없습니다.</div>`;
      return;
    }

    container.innerHTML = this.studyLogs.map(l => `
      <div class="activity-card" style="margin-bottom:0.5rem; border-left:4px solid var(--primary);">
        <div class="activity-main">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:0.88rem;">[${l.subject}] ${l.minutes}분 집중 완료</strong>
            <span class="badge badge-accent">${l.date}</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">
            📝 <strong>학습 범위:</strong> ${l.scope}
          </div>
        </div>
      </div>
    `).join('');
  }
};
