/**
 * Module 6: FlightAware Style Live Flight Tracking & Pomodoro Timer Service
 */
const studyModeModule = {
  // Timer State
  focusMinutes: 25,
  breakMinutes: 5,
  secondsRemaining: 25 * 60,
  timerState: 'stopped', // 'stopped', 'running', 'paused'
  timerInterval: null,
  currentSubject: '자료구조 및 알고리즘',
  flightProgress: 0, // 0 to 1

  // Audio Engine
  audioCtx: null,
  noiseNode: null,
  gainNode: null,
  filterNode: null,
  isAudioPlaying: false,
  volume: 0.3,

  // Map & Flight State
  flightMap: null,
  airplaneMarker: null,
  flightPathPolyline: null,
  currentRouteKey: 'icn_cdg',

  routes: {
    icn_cdg: {
      flightNo: '대한항공 KE901 (KAL901)',
      aircraft: 'Boeing 777-300ER (B77W)',
      originCode: 'ICN / RKSI',
      originName: '인천국제공항 (Seoul/Incheon)',
      depTime: '13:25 KST (정시 이륙)',
      destCode: 'CDG / LFPG',
      destName: '파리 샤를드골 공항 (Paris CDG)',
      arrTime: '18:30 CET (정시 도착)',
      totalDistKm: 8900,
      coords: [
        [37.4606, 126.4407], // ICN
        [40.0000, 116.4000], // Beijing
        [43.0000, 87.6000],   // Urumqi
        [55.7558, 37.6173],   // Moscow
        [52.5200, 13.4050],   // Berlin
        [48.8566, 2.3522]    // CDG
      ],
      waypoints: [
        { name: 'RKSI (ICN)', location: '인천국제공항 이륙', time: '13:25 KST', alt: '0 ft', status: 'passed' },
        { name: 'ZBAA (BJD)', location: '베이징 비행관제구역', time: '15:10 KST', alt: '34,000 ft', status: 'passed' },
        { name: 'UUEE (SVO)', location: '모스크바 상공 순항', time: '19:40 MSK', alt: '36,000 ft', status: 'enroute' },
        { name: 'EDDB (BER)', location: '베를린 진입 웨이포인트', time: '21:15 CET', alt: '36,000 ft', status: 'scheduled' },
        { name: 'LFPG (CDG)', location: '파리 샤를드골 최종 착륙', time: '22:30 CET', alt: '0 ft', status: 'scheduled' }
      ]
    },
    icn_nrt: {
      flightNo: '아시아나 OZ102 (AAR102)',
      aircraft: 'Airbus A350-900 (A359)',
      originCode: 'ICN / RKSI',
      originName: '인천국제공항 (Seoul/Incheon)',
      depTime: '09:00 KST (정시 이륙)',
      destCode: 'NRT / RJAA',
      destName: '도쿄 나리타 공항 (Tokyo Narita)',
      arrTime: '11:15 JST (정시 도착)',
      totalDistKm: 1260,
      coords: [
        [37.4606, 126.4407], // ICN
        [37.5500, 129.0000], // East Sea
        [36.6500, 137.1500], // Toyama
        [35.7647, 140.3863]  // NRT
      ],
      waypoints: [
        { name: 'RKSI (ICN)', location: '인천국제공항 이륙', time: '09:00 KST', alt: '0 ft', status: 'passed' },
        { name: 'KANSU', location: '동해 상공 웨이포인트', time: '09:40 KST', alt: '31,000 ft', status: 'enroute' },
        { name: 'RJAA (NRT)', location: '도쿄 나리타 최종 착륙', time: '11:15 JST', alt: '0 ft', status: 'scheduled' }
      ]
    },
    icn_jfk: {
      flightNo: '대한항공 KE081 (KAL081)',
      aircraft: 'Airbus A380-800 (A388)',
      originCode: 'ICN / RKSI',
      originName: '인천국제공항 (Seoul/Incheon)',
      depTime: '10:00 KST (정시 이륙)',
      destCode: 'JFK / KJFK',
      destName: '뉴욕 존 F. 케네디 공항 (New York JFK)',
      arrTime: '11:20 EST (정시 도착)',
      totalDistKm: 11050,
      coords: [
        [37.4606, 126.4407], // ICN
        [45.0000, 142.0000], // Sakhalin
        [61.2181, -149.9003], // Anchorage
        [49.2827, -123.1207], // Vancouver
        [40.6413, -73.7781]  // JFK
      ],
      waypoints: [
        { name: 'RKSI (ICN)', location: '인천국제공항 이륙', time: '10:00 KST', alt: '0 ft', status: 'passed' },
        { name: 'PANC (ANC)', location: '앵커리지 상공 순항', time: '18:30 AKST', alt: '38,000 ft', status: 'enroute' },
        { name: 'CYVR (YVR)', location: '밴쿠버 진입 웨이포인트', time: '22:10 PST', alt: '38,000 ft', status: 'scheduled' },
        { name: 'KJFK (JFK)', location: '뉴욕 JFK 최종 착륙', time: '11:20 EST', alt: '0 ft', status: 'scheduled' }
      ]
    },
    icn_lhr: {
      flightNo: '아시아나 OZ521 (AAR521)',
      aircraft: 'Boeing 777-200ER (B772)',
      originCode: 'ICN / RKSI',
      originName: '인천국제공항 (Seoul/Incheon)',
      depTime: '12:30 KST (정시 이륙)',
      destCode: 'LHR / EGLL',
      destName: '런던 히드로 공항 (London Heathrow)',
      arrTime: '17:30 BST (정시 도착)',
      totalDistKm: 8860,
      coords: [
        [37.4606, 126.4407], // ICN
        [52.0000, 104.0000], // Irkutsk
        [60.1699, 24.9384],  // Helsinki
        [51.4700, -0.4543]   // LHR
      ],
      waypoints: [
        { name: 'RKSI (ICN)', location: '인천국제공항 이륙', time: '12:30 KST', alt: '0 ft', status: 'passed' },
        { name: 'EFHK (HEL)', location: '헬싱키 진입 웨이포인트', time: '18:50 EEST', alt: '36,000 ft', status: 'enroute' },
        { name: 'EGLL (LHR)', location: '런던 히드로 최종 착륙', time: '17:30 BST', alt: '0 ft', status: 'scheduled' }
      ]
    }
  },

  // Study Logs
  studyLogs: [
    { id: 'log1', date: '2026-08-12', subject: '자료구조 및 알고리즘', minutes: 50, scope: 'Red-Black Tree 삽입/삭제 알고리즘 5문제 해결' },
    { id: 'log2', date: '2026-08-13', subject: '운영체제', minutes: 25, scope: '세마포어와 뮤텍스 락 차이점 노트 정돈' }
  ],

  init() {
    this.renderStudyLogs();
    this.setupListeners();
    this.updateTimerDisplay();
    this.setupMapObserver();
  },

  setupListeners() {
    const subjSelect = document.getElementById('studySubjectSelect');
    if (subjSelect) {
      subjSelect.onchange = (e) => {
        this.currentSubject = e.target.value;
      };
    }
  },

  setupMapObserver() {
    const container = document.getElementById('flightRouteMap');
    if (!container || this.observerInitialized) return;
    this.observerInitialized = true;

    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.initFlightMap();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(container);
    }
  },

  // ---------------- REALTIME SATELLITE FLIGHT RADAR MAP ----------------
  initFlightMap() {
    const container = document.getElementById('flightRouteMap');
    if (!container) return;

    if (this.flightMap) {
      [50, 200, 500, 1000].forEach(delay => {
        setTimeout(() => {
          if (this.flightMap) this.flightMap.invalidateSize();
        }, delay);
      });
      return;
    }

    // FlightAware Radar Tile Map with Esri World Satellite / Dark theme
    this.flightMap = L.map('flightRouteMap', { zoomControl: true }).setView([45.0, 50.0], 2);

    // Primary Esri World Imagery Satellite Tile Layer
    const esriTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: '&copy; FlightAware Radar &copy; Esri World Imagery'
    });

    // Fallback CartoDB Dark / OSM Tile Layer
    const darkTile = L.tileLayer('https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; FlightAware Radar &copy; CARTO &copy; OpenStreetMap'
    });

    esriTile.addTo(this.flightMap);

    this.drawRoute();

    [100, 300, 600, 1200].forEach(delay => {
      setTimeout(() => {
        if (this.flightMap) this.flightMap.invalidateSize();
      }, delay);
    });
  },

  changeRoute(routeKey) {
    if (!this.routes[routeKey]) return;
    this.currentRouteKey = routeKey;
    this.drawRoute();
  },

  drawRoute() {
    if (!this.flightMap) return;

    const routeData = this.routes[this.currentRouteKey] || this.routes.icn_cdg;

    // Update FlightAware Banner Telemetry
    const flightNoEl = document.getElementById('faFlightNo');
    const aircraftTypeEl = document.getElementById('faAircraftType');
    const origCodeEl = document.getElementById('faOriginCode');
    const origNameEl = document.getElementById('faOriginName');
    const depTimeEl = document.getElementById('faDepTime');
    const destCodeEl = document.getElementById('faDestCode');
    const destNameEl = document.getElementById('faDestName');
    const arrTimeEl = document.getElementById('faArrTime');

    if (flightNoEl) flightNoEl.innerText = routeData.flightNo;
    if (aircraftTypeEl) aircraftTypeEl.innerText = routeData.aircraft;
    if (origCodeEl) origCodeEl.innerText = routeData.originCode;
    if (origNameEl) origNameEl.innerText = routeData.originName;
    if (depTimeEl) depTimeEl.innerText = routeData.depTime;
    if (destCodeEl) destCodeEl.innerText = routeData.destCode;
    if (destNameEl) destNameEl.innerText = routeData.destName;
    if (arrTimeEl) arrTimeEl.innerText = routeData.arrTime;

    this.renderWaypoints(routeData.waypoints);

    // Clear old layers
    if (this.flightPathPolyline) this.flightMap.removeLayer(this.flightPathPolyline);
    if (this.airplaneMarker) this.flightMap.removeLayer(this.airplaneMarker);

    // Draw FlightAware Cyan Route Vector Polyline
    this.flightPathPolyline = L.polyline(routeData.coords, {
      color: '#38BDF8',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.95
    }).addTo(this.flightMap);

    // Custom FlightAware Airplane Marker with Vector Tag
    const planeIcon = L.divIcon({
      className: 'custom-plane-icon',
      html: `
        <div style="position:relative; display:flex; align-items:center;">
          <div style="color:#F59E0B; font-size:24px; filter:drop-shadow(0 0 8px rgba(245,158,11,0.9)); transform:rotate(45deg);">✈️</div>
          <div style="margin-left:6px; background:rgba(15,23,42,0.9); border:1px solid #38BDF8; padding:2px 6px; border-radius:4px; font-size:0.65rem; color:#fff; font-weight:700; white-space:nowrap; font-family:sans-serif; box-shadow:0 2px 8px rgba(0,0,0,0.8);">
            ${routeData.flightNo.split(' ')[1] || 'KE901'} | 36,000ft
          </div>
        </div>
      `,
      iconSize: [120, 30],
      iconAnchor: [12, 15]
    });

    this.airplaneMarker = L.marker(routeData.coords[0], { icon: planeIcon }).addTo(this.flightMap);
    this.flightMap.fitBounds(this.flightPathPolyline.getBounds(), { padding: [30, 30] });

    this.updateAirplanePosition(this.flightProgress);
  },

  renderWaypoints(waypoints) {
    const tbody = document.getElementById('faWaypointTable');
    if (!tbody || !waypoints) return;

    tbody.innerHTML = waypoints.map(w => `
      <tr>
        <td style="font-weight:700; color:#38BDF8;">${w.name}</td>
        <td style="color:#F1F5F9;">${w.location}</td>
        <td style="color:#94A3B8;">${w.time}</td>
        <td style="color:#F59E0B; font-weight:600;">${w.alt}</td>
        <td>
          ${w.status === 'passed' ? '<span class="badge badge-success">🟢 통과</span>' :
            w.status === 'enroute' ? '<span class="badge badge-warning">🟡 순항 중</span>' :
            '<span class="badge badge-secondary">⚪ 예정</span>'}
        </td>
      </tr>
    `).join('');
  },

  updateAirplanePosition(progress) {
    if (!this.routes[this.currentRouteKey]) return;

    const routeData = this.routes[this.currentRouteKey];
    const coords = routeData.coords;
    const totalSegments = coords.length - 1;
    const scaledProgress = Math.min(Math.max(progress, 0), 1) * totalSegments;
    const index = Math.floor(scaledProgress);
    const segmentProgress = scaledProgress - index;

    if (this.airplaneMarker) {
      if (index >= totalSegments) {
        this.airplaneMarker.setLatLng(coords[totalSegments]);
      } else {
        const start = coords[index];
        const end = coords[index + 1];
        const lat = start[0] + (end[0] - start[0]) * segmentProgress;
        const lng = start[1] + (end[1] - start[1]) * segmentProgress;
        this.airplaneMarker.setLatLng([lat, lng]);
      }
    }

    // Telemetry Progress Bar & Metrics Update
    const pct = Math.floor(progress * 100);
    const travelledKm = Math.floor(routeData.totalDistKm * progress);
    const remainKm = routeData.totalDistKm - travelledKm;

    const progressBar = document.getElementById('faProgressBar');
    const elapsedStr = document.getElementById('faElapsedStr');
    const remainStr = document.getElementById('faRemainingTimeStr');
    const distStr = document.getElementById('faDistanceStr');

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (elapsedStr) elapsedStr.innerHTML = `비행 진행: <strong>${pct}%</strong>`;
    
    const remMins = Math.floor(this.secondsRemaining / 60);
    const remSecs = this.secondsRemaining % 60;
    if (remainStr) remainStr.innerText = `⏳ ${remMins}분 ${remSecs < 10 ? '0' + remSecs : remSecs}초 남음`;

    if (distStr) distStr.innerText = `총 ${routeData.totalDistKm.toLocaleString()} km 중 ${travelledKm.toLocaleString()} km 운항 (남은 거리: ${remainKm.toLocaleString()} km)`;

    const speedEl = document.getElementById('telemetrySpeed');
    if (speedEl) speedEl.innerText = `${Math.floor(865 + Math.random() * 20)} km/h (475 kt)`;
  },

  // ---------------- TIMER CONTROLS ----------------
  setTimerMode(focusMins, breakMins) {
    if (this.timerState === 'running') {
      if (!confirm('현재 진행 중인 FlightAware 집중 타이머를 새로 시작하시겠습니까?')) return;
    }
    this.pauseTimer();
    this.focusMinutes = focusMins;
    this.breakMinutes = breakMins;
    this.secondsRemaining = focusMins * 60;
    this.timerState = 'stopped';
    this.flightProgress = 0;
    this.updateTimerDisplay();
    this.updateAirplanePosition(0);
    app.showToast(`[FlightAware 설정] ${focusMins}분 집중 / ${breakMins}분 휴식 항로 선택됨`, 'info');
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
        app.showToast('🎉 FlightAware 비행 완주! 오늘의 공부 학습 범위를 기록해 보세요.', 'success');
        this.openFinishModal();
      }
    }, 1000);

    const startBtn = document.getElementById('startStudyBtn');
    const pauseBtn = document.getElementById('pauseStudyBtn');
    if (startBtn) startBtn.classList.add('hidden');
    if (pauseBtn) pauseBtn.classList.remove('hidden');

    app.showToast('✈️ FlightAware 실시간 항공 레이더 & 집중 타이머 시작!', 'success');
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
      if (audioBadge) audioBadge.innerHTML = `<i data-lucide="volume-2"></i> ✈️ 기내 ASMR 재생 중`;
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
      <div class="activity-card" style="margin-bottom:0.5rem; border-left:4px solid var(--primary); background:#1E293B;">
        <div class="activity-main">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:0.88rem; color:#fff;">[${l.subject}] ${l.minutes}분 집중 완료</strong>
            <span class="badge badge-accent">${l.date}</span>
          </div>
          <div style="font-size:0.8rem; color:#94A3B8; margin-top:0.3rem;">
            📝 <strong>학습 범위:</strong> ${l.scope}
          </div>
        </div>
      </div>
    `).join('');
  }
};
