/**
 * Module 6: In-Flight Study Mode & Pomodoro Timer Service
 */
const studyModeModule = {
  // Timer State
  focusMinutes: 25,
  breakMinutes: 5,
  secondsRemaining: 25 * 60,
  timerState: 'stopped', // 'stopped', 'running', 'paused', 'break'
  timerInterval: null,
  currentSubject: '자료구조 및 알고리즘',

  // Audio Noise Generator (Web Audio API)
  audioCtx: null,
  noiseNode: null,
  gainNode: null,
  filterNode: null,
  isAudioPlaying: false,
  volume: 0.3,

  // Map & Flight Path
  flightMap: null,
  airplaneMarker: null,
  flightPathPolyline: null,
  flightProgress: 0, // 0 to 1

  // Flight Path Coordinates (ICN to CDG / HND)
  routeCoords: [
    [37.4606, 126.4407], // Incheon (ICN)
    [40.0000, 116.4000], // Beijing
    [43.0000, 87.6000],   // Urumqi
    [55.7558, 37.6173],   // Moscow
    [52.5200, 13.4050],   // Berlin
    [48.8566, 2.3522]    // Paris (CDG)
  ],

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
    // Subject Selector Sync
    const subjSelect = document.getElementById('studySubjectSelect');
    if (subjSelect) {
      subjSelect.onchange = (e) => {
        this.currentSubject = e.target.value;
      };
    }
  },

  initFlightMap() {
    const container = document.getElementById('flightRouteMap');
    if (!container || this.flightMap) return;

    // Leaflet map initialization
    this.flightMap = L.map('flightRouteMap', { zoomControl: false }).setView([45.0, 60.0], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      attribution: '&copy; CartoDB &copy; OpenStreetMap'
    }).addTo(this.flightMap);

    // Draw Great Circle / Flight Path Line
    this.flightPathPolyline = L.polyline(this.routeCoords, {
      color: '#38BDF8',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.85
    }).addTo(this.flightMap);

    // Custom Airplane Icon
    const planeIcon = L.divIcon({
      className: 'custom-plane-icon',
      html: `<div style="color:#F59E0B; font-size:22px; filter:drop-shadow(0 0 6px rgba(245,158,11,0.8)); transform:rotate(45deg);"><i data-lucide="plane"></i>✈️</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    // Initial position at ICN
    this.airplaneMarker = L.marker(this.routeCoords[0], { icon: planeIcon }).addTo(this.flightMap);
    this.flightMap.fitBounds(this.flightPathPolyline.getBounds(), { padding: [30, 30] });

    if (window.lucide) lucide.createIcons();
  },

  updateAirplanePosition(progress) {
    if (!this.airplaneMarker || !this.routeCoords) return;

    // Calculate interpolated position along routeCoords
    const totalSegments = this.routeCoords.length - 1;
    const scaledProgress = Math.min(Math.max(progress, 0), 1) * totalSegments;
    const index = Math.floor(scaledProgress);
    const segmentProgress = scaledProgress - index;

    if (index >= totalSegments) {
      this.airplaneMarker.setLatLng(this.routeCoords[totalSegments]);
      return;
    }

    const start = this.routeCoords[index];
    const end = this.routeCoords[index + 1];

    const lat = start[0] + (end[0] - start[0]) * segmentProgress;
    const lng = start[1] + (end[1] - start[1]) * segmentProgress;

    this.airplaneMarker.setLatLng([lat, lng]);

    // Update Telemetry Text
    const altEl = document.getElementById('telemetryAlt');
    const speedEl = document.getElementById('telemetrySpeed');
    const distEl = document.getElementById('telemetryDist');

    if (altEl) altEl.innerText = '36,000 ft';
    if (speedEl) speedEl.innerText = `${Math.floor(860 + Math.random() * 20)} km/h`;
    if (distEl) distEl.innerText = `${Math.floor((1 - progress) * 8900)} km`;
  },

  setTimerMode(focusMins, breakMins) {
    if (this.timerState === 'running') {
      if (!confirm('현재 진행 중인 뽀모도로 공부 타이머를 새로 시작하시겠습니까?')) return;
    }
    this.pauseTimer();
    this.focusMinutes = focusMins;
    this.breakMinutes = breakMins;
    this.secondsRemaining = focusMins * 60;
    this.timerState = 'stopped';
    this.updateTimerDisplay();
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

        // Update Flight Progress
        const elapsedSecs = startTotalSecs - this.secondsRemaining;
        const progress = elapsedSecs / startTotalSecs;
        this.updateAirplanePosition(progress);
      } else {
        // Session Finished!
        this.pauseTimer();
        this.playBellSound();
        app.showToast('🎉 뽀모도로 25분 집중 목표 달성! 오늘의 학습 범위를 기록해 보세요.', 'success');
        this.openFinishModal();
      }
    }, 1000);

    const startBtn = document.getElementById('startStudyBtn');
    const pauseBtn = document.getElementById('pauseStudyBtn');
    if (startBtn) startBtn.classList.add('hidden');
    if (pauseBtn) pauseBtn.classList.remove('hidden');

    app.showToast('✈️ 비행기 기내 백색소음 & 뽀모도로 타이머 시작!', 'success');
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

  // Web Audio API Pink/Brown Low-Pass Engine Noise Generator
  startAirplaneAudio() {
    if (this.isAudioPlaying) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // Generate 5-second buffer of Brown Noise (airplane cabin engine rumble)
      const bufferSize = this.audioCtx.sampleRate * 5;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Boost amplitude
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Low-pass filter for cozy cabin engine sound
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.value = 160; // 160Hz low frequency rumble

      // Gain (Volume) control
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.volume;

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.noiseNode.start();
      this.isAudioPlaying = true;

      const audioBadge = document.getElementById('audioStatusBadge');
      if (audioBadge) audioBadge.innerHTML = `<i data-lucide="volume-2"></i> ✈️ 기내 엔진 백색소음 재생 중`;
    } catch (e) {
      console.log('Web Audio Error:', e);
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
    } catch (e) {
      console.log(e);
    }
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
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 chime
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
