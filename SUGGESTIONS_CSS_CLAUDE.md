/* =====================================
   FLESHBOOK - ANIMATIONS CSS
   Thème: Horror/Gothic Social Network
   ===================================== */

/* Variables CSS pour une cohérence thématique */
:root {
  --blood-red: #b00;
  --dark-red: #800;
  --flesh-pink: #f5e6e6;
  --shadow-black: rgba(20, 0, 20, 0.92);
  --blood-glow: 0 0 20px rgba(187, 0, 0, 0.6);
}

/* ========== ANIMATIONS DE BASE ========== */

@keyframes bloodDrip {
  0% { transform: translateY(-5px); opacity: 0; }
  50% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(3px); opacity: 0.8; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 5px var(--dark-red); }
  50% { box-shadow: var(--blood-glow); }
}

@keyframes fadeInUp {
  0% { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes slideInLeft {
  0% { 
    opacity: 0; 
    transform: translateX(-100px); 
  }
  100% { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

@keyframes flickerText {
  0%, 100% { opacity: 1; text-shadow: 0 0 5px var(--blood-red); }
  25% { opacity: 0.8; text-shadow: 0 0 10px var(--blood-red); }
  50% { opacity: 0.9; text-shadow: 0 0 15px var(--blood-red); }
  75% { opacity: 0.7; text-shadow: 0 0 8px var(--blood-red); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.05); }
  75% { transform: scale(0.95); }
}

@keyframes ghostlyFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(1deg); }
  66% { transform: translateY(8px) rotate(-1deg); }
}

@keyframes bloodFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes creepyScale {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(2deg); }
  100% { transform: scale(1) rotate(0deg); }
}

/* ========== SIDEBAR ANIMATIONS ========== */

.sidebar {
  animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.sidebar-user-item {
  transition: all 0.3s ease;
  position: relative;
}

.sidebar-user-item:hover {
  transform: translateX(5px);
  background: linear-gradient(90deg, rgba(187, 0, 0, 0.1), rgba(187, 0, 0, 0.05));
  animation: pulseGlow 2s infinite;
}

.sidebar-user-avatar {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.sidebar-user-item:hover .sidebar-user-avatar {
  transform: scale(1.1) rotate(5deg);
  box-shadow: var(--blood-glow);
}

.sidebar-section-title {
  animation: flickerText 3s infinite;
  position: relative;
}

.sidebar-section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--blood-red), transparent);
  animation: bloodFlow 4s infinite, slideWidth 2s ease-out forwards;
}

@keyframes slideWidth {
  to { width: 100%; }
}

/* ========== HEADER & LOGO ANIMATIONS ========== */

.fleshbook-logo {
  animation: heartbeat 2s infinite, flickerText 4s infinite;
}

.fleshbook-logo:hover {
  animation: creepyScale 0.6s ease-in-out;
}

/* ========== POSTS ANIMATIONS ========== */

.post-item {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
  transition: all 0.3s ease;
}

.post-item:nth-child(1) { animation-delay: 0.1s; }
.post-item:nth-child(2) { animation-delay: 0.2s; }
.post-item:nth-child(3) { animation-delay: 0.3s; }
.post-item:nth-child(4) { animation-delay: 0.4s; }

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(187, 0, 0, 0.3);
  border-color: var(--blood-red);
}

.post-author {
  transition: all 0.3s ease;
}

.post-author:hover {
  color: var(--blood-red);
  text-shadow: 0 0 10px var(--blood-red);
}

.post-timestamp {
  animation: ghostlyFloat 6s infinite ease-in-out;
}

/* ========== BOUTONS & INTERACTIONS ========== */

.btn-primary {
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  background: linear-gradient(45deg, var(--dark-red), var(--blood-red));
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--blood-glow);
  animation: pulseGlow 1.5s infinite;
}

.btn-primary:active {
  transform: translateY(0px) scale(0.98);
}

/* ========== FORM ANIMATIONS ========== */

.form-input {
  transition: all 0.3s ease;
  position: relative;
}

.form-input:focus {
  border-color: var(--blood-red);
  box-shadow: var(--blood-glow);
  transform: scale(1.02);
}

.form-textarea:focus {
  animation: pulseGlow 2s infinite;
}

/* ========== LOADING & STATES ========== */

@keyframes bloodSpin {
  0% { transform: rotate(0deg); border-color: var(--blood-red) transparent transparent transparent; }
  25% { border-color: transparent var(--blood-red) transparent transparent; }
  50% { border-color: transparent transparent var(--blood-red) transparent; }
  75% { border-color: transparent transparent transparent var(--blood-red); }
  100% { transform: rotate(360deg); border-color: var(--blood-red) transparent transparent transparent; }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-radius: 50%;
  animation: bloodSpin 1.2s infinite;
}

/* ========== HOVER EFFECTS SPÉCIAUX ========== */

.creepy-hover {
  position: relative;
  transition: all 0.3s ease;
}

.creepy-hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(187, 0, 0, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.creepy-hover:hover::after {
  opacity: 1;
  animation: pulseGlow 1s infinite;
}

/* ========== NOTIFICATIONS ========== */

@keyframes slideInRight {
  0% { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  100% { 
    transform: translateX(0); 
    opacity: 1; 
  }
}

.notification {
  animation: slideInRight 0.5s ease-out;
  transition: all 0.3s ease;
}

.notification:hover {
  transform: scale(1.05);
  animation: heartbeat 1s infinite;
}

/* ========== RESPONSIVE & PERFORMANCE ========== */

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Optimisation GPU */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* ========== CLASSES UTILITAIRES ========== */

.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

.blood-text {
  background: linear-gradient(45deg, var(--blood-red), #ff0000, var(--dark-red));
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bloodFlow 3s infinite;
}

.floating-element {
  animation: ghostlyFloat 4s infinite ease-in-out;
}

.pulsing-border {
  animation: pulseGlow 2s infinite;
}

/* ========== DARK MODE TRANSITIONS ========== */

.theme-transition {
  transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
}