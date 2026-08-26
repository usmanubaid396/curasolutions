import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Video, 
  Film, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Award, 
  ChevronRight, 
  Lock, 
  Clock, 
  Sliders, 
  Menu, 
  X, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Info 
} from 'lucide-react';

const FontAndStyleLoader = () => (
  <React.Fragment>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link 
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@200;300;400;500;600;700&display=swap" 
      rel="stylesheet" 
    />
    <style>{`
      :root {
        --color-primary: #0A0A0A;
        --color-secondary: #F5F5F0;
        --color-accent: #C4A77D;
        --color-accent-hover: #B3956B;
        --color-surface: #FFFFFF;
        --color-muted: #8A8A8A;
        --color-border: #E5E5DF;
      }
      
      body {
        background-color: var(--color-secondary);
        color: var(--color-primary);
        font-family: 'Inter', sans-serif;
        overflow-x: hidden;
      }

      .font-serif-heading {
        font-family: 'Cormorant Garamond', serif;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #F5F5F0;
      }
      ::-webkit-scrollbar-thumb {
        background: #C4A77D;
        border-radius: 3px;
      }

      /* Glassmorphism utility */
      .glass-panel {
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(196, 167, 125, 0.2);
      }

      .glass-dark {
        background: rgba(10, 10, 10, 0.85);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(196, 167, 125, 0.25);
      }

      /* Pulse animation for 60BPM clinical heartbeat */
      @keyframes heartbeat {
        0% { transform: scale(1); opacity: 0.03; }
        15% { transform: scale(1.03); opacity: 0.07; }
        30% { transform: scale(1); opacity: 0.03; }
        45% { transform: scale(1.02); opacity: 0.05; }
        60% { transform: scale(1); opacity: 0.03; }
        100% { transform: scale(1); opacity: 0.03; }
      }

      .ambient-pulse {
        animation: heartbeat 2s infinite ease-in-out;
      }

      /* Extruded text shadow */
      .text-extruded {
        text-shadow: 
          0px 1px 0px #B3956B,
          0px 2px 0px #9A7E56,
          0px 3px 0px #826843,
          0px 4px 8px rgba(0,0,0,0.3);
      }
    `}</style>
  </React.Fragment>
);

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, .interactive-hover');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;
    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <React.Fragment>
      <div 
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-[#0A0A0A] rounded-full pointer-events-none z-[9999] -mt-1 -ml-1 transition-transform duration-75 ease-out"
      />
      <div 
        ref={ringRef}
        className={`hidden md:block fixed top-0 left-0 border border-[#C4A77D] rounded-full pointer-events-none z-[9998] -mt-4 -ml-4 transition-all duration-300 ease-out ${
          isHovered ? 'w-12 h-12 -mt-6 -ml-6 bg-[#C4A77D]/10 border-2 border-[#C4A77D]' : 'w-8 h-8'
        }`}
      />
    </React.Fragment>
  );
};

const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "STERILIZING CLINICAL INSTRUMENTS...",
    "CALIBRATING 3D CELLULAR SHADERS...",
    "VERIFYING HIPAA COMPLIANCE LOGS...",
    "PREPARING HIGH-FIDELITY EXPERIENCE..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    const statusTimer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-[10000] flex flex-col items-center justify-center text-[#F5F5F0]">
      <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 border border-[#C4A77D]/30 rounded-full animate-ping opacity-25" />
        <svg className="w-16 h-16 text-[#C4A77D] animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="absolute font-mono text-xs text-[#C4A77D]">{progress}%</div>
      </div>
      
      <p className="font-mono text-xs tracking-widest text-[#C4A77D] uppercase mb-4 h-4">
        {statuses[statusIndex]}
      </p>

      <div className="w-64 h-[2px] bg-[#1A1A1A] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#C4A77D] to-[#E6C896] transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const HeroCanvas = ({ scrollY }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const count = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalY = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const ivory = new THREE.Color('#F5F5F0');
    const gold = new THREE.Color('#C4A77D');
    const softGray = new THREE.Color('#D8D8D0');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 50;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalY[i] = y;

      const mixFactor = Math.random();
      let color = ivory;
      if (mixFactor > 0.7) color = gold;
      else if (mixFactor > 0.4) color = softGray;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 10;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const pos = particles.geometry.attributes.position.array;
      const scrollFactor = Math.min((window.scrollY || scrollY) / 600, 1);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3 + 1] = (originalY[i] * (1 - scrollFactor * 0.9)) + Math.sin(elapsedTime * 0.5 + pos[i3]) * 0.5;
        pos[i3] += Math.cos(elapsedTime * 0.3 + pos[i3 + 1]) * 0.01;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.03 + mouseX * 0.05;
      particles.rotation.x = mouseY * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full" />;
};

const ManifestoCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const material = new THREE.MeshPhongMaterial({
      color: 0xF5F5F0,
      emissive: 0x1A1815,
      specular: 0xC4A77D,
      shininess: 15,
      flatShading: false,
    });

    const geometry = new THREE.IcosahedronGeometry(4, 5);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const w = pos.getZ(i);
      const noise = Math.sin(u * 0.5) * Math.cos(v * 0.5) * 0.8;
      pos.setXYZ(i, u + noise, v + noise, w + noise);
    }
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light1 = new THREE.DirectionalLight(0xFFFFFF, 1.2);
    light1.position.set(10, 15, 10);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xC4A77D, 0.8);
    light2.position.set(-10, -10, -5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mesh.rotation.x = Math.sin(t * 0.2) * 0.3;
      mesh.rotation.y = t * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-80 md:h-[450px] rounded-2xl glass-panel relative overflow-hidden" />;
};

const Navigation = ({ visible, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'difference', label: 'Why Us' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Selected Work' },
    { id: 'process', label: 'Process' },
    { id: 'trust', label: 'Compliance' },
    { id: 'contact', label: 'Start Project' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-lg border border-[#C4A77D]/20">
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-7 h-7 rounded-full border border-[#C4A77D] flex items-center justify-center bg-[#0A0A0A] text-[#C4A77D] font-mono text-xs font-bold transition-transform group-hover:scale-110">
              C
            </div>
            <div>
              <span className="font-serif-heading text-lg font-bold tracking-wider text-[#0A0A0A] block leading-none">
                CURA
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#8A8A8A] block uppercase">
                Clinical Content
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative font-mono text-xs uppercase tracking-wider transition-colors py-1 ${
                  activeSection === item.id ? 'text-[#0A0A0A] font-semibold' : 'text-[#8A8A8A] hover:text-[#0A0A0A]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C4A77D] rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-[#0A0A0A] text-[#F5F5F0] hover:bg-[#C4A77D] hover:text-[#0A0A0A] text-xs font-mono tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 group shadow-sm"
            >
              <span>CONSULTATION</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0A0A0A]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 glass-dark rounded-2xl p-6 shadow-2xl border border-[#C4A77D]/30 z-50 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="text-left font-serif-heading text-xl text-[#F5F5F0] hover:text-[#C4A77D] py-2 border-b border-[#333] flex items-center justify-between"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-[#C4A77D]" />
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 bg-[#C4A77D] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest py-3.5 rounded-xl uppercase flex items-center justify-center gap-2"
          >
            Request Strategy Call
          </button>
        </div>
      )}
    </header>
  );
};

const HeroSection = ({ onNavigate }) => {
  const [hoverDepth, setHoverDepth] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      <HeroCanvas scrollY={0} />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#C4A77D]/30 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#C4A77D] animate-ping" />
          <span className="font-mono text-xs tracking-widest uppercase text-[#0A0A0A] font-medium">
            Medical Aesthetics Content Agency
          </span>
        </div>

        <h1 
          onMouseEnter={() => setHoverDepth(true)}
          onMouseLeave={() => setHoverDepth(false)}
          className={`font-serif-heading text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#0A0A0A] leading-[1.08] mb-8 transition-transform duration-500 ease-out ${
            hoverDepth ? 'scale-[1.01] tracking-wide' : ''
          }`}
        >
          Content that fills <br className="hidden md:inline" />
          <span className="italic font-serif-heading text-[#C4A77D] font-normal">consultation rooms.</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-[#8A8A8A] font-light leading-relaxed mb-10">
          Production, post-production, and patient acquisition strategy — built exclusively for aesthetic clinics, plastic surgeons, dermatologists, and medspas.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => onNavigate('work')}
            className="w-full sm:w-auto bg-[#0A0A0A] text-[#F5F5F0] hover:bg-[#C4A77D] hover:text-[#0A0A0A] font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group"
          >
            <span>See Our Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto border border-[#0A0A0A]/20 hover:border-[#C4A77D] glass-panel text-[#0A0A0A] hover:text-[#C4A77D] font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Start a Project</span>
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-[#E5E5DF] pt-8">
          <div>
            <div className="font-serif-heading text-3xl font-normal text-[#0A0A0A]">340%</div>
            <div className="font-mono text-[10px] uppercase text-[#8A8A8A] tracking-wider mt-1">Avg. Booking Increase</div>
          </div>
          <div>
            <div className="font-serif-heading text-3xl font-normal text-[#0A0A0A]">100%</div>
            <div className="font-mono text-[10px] uppercase text-[#8A8A8A] tracking-wider mt-1">HIPAA & Compliance Safe</div>
          </div>
          <div>
            <div className="font-serif-heading text-3xl font-normal text-[#0A0A0A]">50+</div>
            <div className="font-mono text-[10px] uppercase text-[#8A8A8A] tracking-wider mt-1">Clinics & Surgeons</div>
          </div>
          <div>
            <div className="font-serif-heading text-3xl font-normal text-[#0A0A0A]">4.8M</div>
            <div className="font-mono text-[10px] uppercase text-[#8A8A8A] tracking-wider mt-1">Patient Views Generated</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ManifestoSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: "Clinical Environment Shooting",
      desc: "We shoot in actual consult rooms, not rented lofts. Our directors know what a cannula looks like, understand lighting for skin texture, and respect patient privacy during delicate procedures."
    },
    {
      title: "Platform-Native Medical Edits",
      desc: "Every edit is platform-native — TikTok pacing for awareness, long-form YouTube documentary cuts for high-ticket authority, and cinematic Instagram Reels for local patient reach."
    },
    {
      title: "Search-Driven Patient Growth",
      desc: "Growth strategy built on patient search behavior: how real patients actually look for a rhinoplasty or injectable provider, not generic playbooks repurposed from fashion brands."
    }
  ];

  return (
    <section id="difference" className="w-full py-28 px-6 bg-[#F5F5F0] border-t border-[#E5E5DF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4A77D] block mb-3">
              02 / The Difference
            </span>
            <h2 className="font-serif-heading text-4xl md:text-5xl font-normal text-[#0A0A0A] leading-tight mb-6">
              Generic agencies don't understand patient privacy. Or clinical compliance.
            </h2>
            <p className="text-[#8A8A8A] font-light text-lg mb-8 leading-relaxed">
              Medical aesthetics requires surgical precision in storytelling. We eliminate the gap between marketing creativity and medical ethics.
            </p>

            <div className="space-y-3">
              {pillars.map((pillar, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                    activeTab === idx 
                      ? 'bg-[#0A0A0A] text-[#F5F5F0] border-[#0A0A0A] shadow-md' 
                      : 'glass-panel text-[#0A0A0A] border-[#E5E5DF] hover:border-[#C4A77D]'
                  }`}
                >
                  <span className="font-mono text-xs uppercase tracking-wider font-medium">
                    0{idx + 1}. {pillar.title}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === idx ? 'translate-x-1 text-[#C4A77D]' : 'text-[#8A8A8A]'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <ManifestoCanvas />

            <div className="glass-panel p-8 rounded-2xl border border-[#C4A77D]/20">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-[#C4A77D]" />
                <h3 className="font-serif-heading text-2xl font-normal text-[#0A0A0A]">
                  {pillars[activeTab].title}
                </h3>
              </div>
              <p className="text-[#8A8A8A] leading-relaxed font-light text-base">
                {pillars[activeTab].desc}
              </p>

              <div className="mt-6 pt-6 border-t border-[#E5E5DF] grid grid-cols-2 gap-4 font-mono text-xs text-[#0A0A0A]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A77D]" />
                  <span>Sterile Set Protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A77D]" />
                  <span>B&A Consent Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A77D]" />
                  <span>Platform Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A77D]" />
                  <span>MD Narrative Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const [activeBand, setActiveBand] = useState(0);

  const services = [
    {
      id: "01",
      title: "Production",
      icon: Video,
      tagline: "Pro-Grade On-Location & Studio Filming",
      description: "Pro-grade content shot on cinema cameras. On-location at your clinic or in our purpose-built studio. Talking-head interviews, procedure walkthroughs, patient stories, before-and-after documentation — all planned and directed, never improvised.",
      deliverables: ["4K Cinema Procedure Capture", "Doctor Authority Interviews", "Patient Journey Documentaries", "Lighting & Sound Engineering"]
    },
    {
      id: "02",
      title: "Post-Production",
      icon: Film,
      tagline: "Compliance-Aware Platform Native Editing",
      description: "Every frame edited for the platform it's going to — not cut down from one master file. Captions, pacing, color grading for clinical accuracy, and compliance-aware handling of sensitive footage. Edited by experts who know what a consult room actually looks like.",
      deliverables: ["TikTok & Reels High-Retention Cuts", "Medical Color Correction", "Clinical Anatomy Graphics", "Sound Design & Micro-Captions"]
    },
    {
      id: "03",
      title: "Growth Strategy",
      icon: TrendingUp,
      tagline: "Patient Acquisition & Consultation Funnels",
      description: "Posting cadence, platform strategy, and audience growth built around how patients actually search for a doctor — not generic social playbooks repurposed from fitness or fashion brands.",
      deliverables: ["Search-Driven Content Mapping", "Local Patient Geo-Targeting", "Consultation Conversion Funnels", "Monthly ROI & Analytics"]
    }
  ];

  return (
    <section id="services" className="w-full py-28 px-6 bg-[#0A0A0A] text-[#F5F5F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4A77D] block mb-3">
              03 / What We Do
            </span>
            <h2 className="font-serif-heading text-4xl md:text-6xl font-normal text-[#F5F5F0]">
              Three Core Disciplines. <br />
              <span className="italic text-[#C4A77D]">One Clinical Standard.</span>
            </h2>
          </div>
          <p className="text-[#8A8A8A] font-light max-w-md mt-4 md:mt-0 text-sm">
            Designed as an end-to-end media engine for aesthetic practices looking to scale consultation inquiries.
          </p>
        </div>

        <div className="space-y-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeBand === index;

            return (
              <div 
                key={service.id}
                onClick={() => setActiveBand(index)}
                className={`group rounded-2xl p-8 transition-all duration-500 cursor-pointer border ${
                  isActive 
                    ? 'glass-dark border-[#C4A77D] shadow-2xl scale-[1.01]' 
                    : 'bg-[#121212] border-[#222] hover:border-[#C4A77D]/40'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <span className="font-serif-heading text-3xl md:text-4xl text-[#C4A77D] font-light">
                      {service.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-[#C4A77D]" />
                        <h3 className="font-serif-heading text-2xl md:text-3xl text-[#F5F5F0]">
                          {service.title}
                        </h3>
                      </div>
                      <p className="font-mono text-xs text-[#8A8A8A] tracking-wider uppercase mt-1">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="lg:max-w-xl">
                    <p className="text-[#A0A0A0] font-light text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {isActive && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-[#333]">
                        {service.deliverables.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 font-mono text-[11px] text-[#C4A77D]">
                            <Sparkles className="w-3 h-3 text-[#C4A77D]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="self-end lg:self-center">
                    <div className={`w-10 h-10 rounded-full border border-[#C4A77D]/30 flex items-center justify-center transition-transform ${
                      isActive ? 'bg-[#C4A77D] text-[#0A0A0A] rotate-90' : 'text-[#C4A77D] group-hover:bg-[#C4A77D]/10'
                    }`}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const WorkSection = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const cases = [
    {
      id: 1,
      doctor: "Dr. Sarah Chen",
      clinic: "Facial Aesthetics Clinic",
      location: "Beverly Hills, CA",
      metric: "+340%",
      metricLabel: "Consultation Bookings",
      timeframe: "90 Days",
      summary: "Rebrand + high-ticket facial sculpture video series demystifying deep-plane facelifts.",
      details: "Transformed Dr. Chen's digital presence from sterile medical photos to cinematic 4K patient narrative documentaries. Developed platform-safe before/after video reveals adhering strictly to California medical board guidelines.",
      deliverables: ["12x Cinematic Patient Stories", "24x Reels & TikTok Edits", "Local Search Funnel Optimization"]
    },
    {
      id: 2,
      doctor: "Westside Dermatology",
      clinic: "Clinical & Laser Center",
      location: "Santa Monica, CA",
      metric: "2.4M",
      metricLabel: "Organic TikTok Views",
      timeframe: "30 Days",
      summary: "Procedure education series demystifying RF microneedling and laser resurfacing.",
      details: "Created an educational 'Micro-Dose Medical' short-form video framework. Turned complex dermatological procedures into digestible, high-retention social videos that converted viewers into direct consultation requests.",
      deliverables: ["Educational Video System", "Doctor Authority Q&A", "12k New Targeted Followers"]
    },
    {
      id: 3,
      doctor: "Elite Plastic Surgery",
      clinic: "Surgical Arts Suite",
      location: "New York, NY",
      metric: "-40%",
      metricLabel: "No-Show Consult Rate",
      timeframe: "60 Days",
      summary: "Documentary-style pre-consultation orientation video system for prospective surgical patients.",
      details: "Built an interactive video onboarding sequence sent to patients prior to their first surgical consultation. Demystified recovery timelines, surgical expectations, and doctor philosophy.",
      deliverables: ["Pre-Consultation Video Kit", "Surgical Walkthroughs", "Patient Trust Docuseries"]
    },
    {
      id: 4,
      doctor: "Glow Medspa",
      clinic: "Aesthetic & Wellness Lounge",
      location: "Miami, FL",
      metric: "180%",
      metricLabel: "ROI on Ad Spend",
      timeframe: "45 Days",
      summary: "Compliance-first Before & After campaign for body contouring and injectable treatments.",
      details: "Designed an ad creative system engineered around privacy-conscious before-and-after reveals. Leveraged platform-approved visual techniques to scale conversion without ad account flags.",
      deliverables: ["Meta & TikTok Ad Creatives", "Landing Page Video Integrations", "Compliance Audit"]
    }
  ];

  return (
    <section id="work" className="w-full py-28 px-6 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4A77D] block mb-3">
              04 / Selected Work
            </span>
            <h2 className="font-serif-heading text-4xl md:text-6xl font-normal text-[#0A0A0A]">
              Clinical Evidence. <br />
              <span className="italic text-[#C4A77D]">Measurable Outcomes.</span>
            </h2>
          </div>
          <p className="text-[#8A8A8A] font-light max-w-md mt-4 md:mt-0 text-sm">
            Peel back clinical metrics. Click to inspect full case study logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="group relative glass-panel rounded-2xl p-8 border border-[#E5E5DF] hover:border-[#C4A77D] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5DF]">
                <div>
                  <h3 className="font-serif-heading text-2xl font-normal text-[#0A0A0A]">
                    {item.doctor}
                  </h3>
                  <p className="font-mono text-xs text-[#8A8A8A]">
                    {item.clinic} — {item.location}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#C4A77D]/30 flex items-center justify-center text-[#C4A77D] group-hover:bg-[#C4A77D] group-hover:text-[#0A0A0A] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              <div className="my-6">
                <div className="font-serif-heading text-5xl font-normal text-[#0A0A0A] text-extruded">
                  {item.metric}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#C4A77D] font-medium mt-1">
                  {item.metricLabel} ({item.timeframe})
                </div>
              </div>

              <p className="text-[#8A8A8A] font-light text-sm leading-relaxed mb-6">
                {item.summary}
              </p>

              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#C4A77D]/20 to-transparent rounded-bl-2xl transition-transform group-hover:scale-125" />
            </div>
          ))}
        </div>
      </div>

      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0A0A0A]/80 backdrop-blur-md">
          <div className="glass-panel max-w-2xl w-full rounded-2xl p-8 border border-[#C4A77D] relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedCase(null)}
              className="absolute top-6 right-6 p-2 text-[#0A0A0A] hover:text-[#C4A77D]"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="font-mono text-xs uppercase text-[#C4A77D] tracking-widest block mb-2">
              Clinical Case Log #{selectedCase.id}
            </span>
            <h3 className="font-serif-heading text-3xl text-[#0A0A0A] mb-1">
              {selectedCase.doctor}
            </h3>
            <p className="font-mono text-xs text-[#8A8A8A] mb-6">
              {selectedCase.clinic} • {selectedCase.location}
            </p>

            <div className="bg-[#0A0A0A] text-[#F5F5F0] p-6 rounded-xl mb-6 flex items-center justify-between">
              <div>
                <div className="font-serif-heading text-4xl text-[#C4A77D]">{selectedCase.metric}</div>
                <div className="font-mono text-xs text-[#8A8A8A] uppercase">{selectedCase.metricLabel}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-[#C4A77D]">{selectedCase.timeframe}</div>
                <div className="font-mono text-[10px] text-[#8A8A8A] uppercase">Time To Outcome</div>
              </div>
            </div>

            <h4 className="font-serif-heading text-xl text-[#0A0A0A] mb-2">Strategy Overview</h4>
            <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6 font-light">
              {selectedCase.details}
            </p>

            <h4 className="font-serif-heading text-xl text-[#0A0A0A] mb-3">Key Deliverables</h4>
            <div className="space-y-2 mb-8">
              {selectedCase.deliverables.map((d, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-mono text-[#0A0A0A] bg-[#F5F5F0] p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A77D]" />
                  <span>{d}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedCase(null)}
              className="w-full bg-[#0A0A0A] text-[#F5F5F0] font-mono text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#C4A77D] hover:text-[#0A0A0A] transition-colors"
            >
              Close Case File
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: "01",
      name: "Discovery & Compliance Audit",
      desc: "We audit your current digital presence, analyze regional competitor content, and map patient search behavior in your market.",
      detail: "Review existing patient consultation conversion rates and legal disclaimers."
    },
    {
      num: "02",
      name: "Platform & Production Strategy",
      desc: "Platform selection, content pillars, and a 90-day production calendar — built around your clinic's schedule, not ours.",
      detail: "Zero-downtime shoot scheduling mapped around surgeries and injectables."
    },
    {
      num: "03",
      name: "Sterile-Set On-Location Filming",
      desc: "Shoot days planned around your patient flow. Minimal disruption. Maximum output. 4K cinema equipment handled by trained crew.",
      detail: "Pro-grade audio, lighting designed for skin tone accuracy, and privacy protocols."
    },
    {
      num: "04",
      name: "Platform-Native Post & Deployment",
      desc: "Platform-optimized edits, compliance-aware review, scheduled deployment, and real-time performance tracking.",
      detail: "Color correction, captions, audio engineering, and B&A blurring where required."
    },
    {
      num: "05",
      name: "Consultation Funnel Optimization",
      desc: "Monthly performance reviews, content iteration, and strategy refinement based on actual consultation booking data.",
      detail: "Continuous iteration to lower patient acquisition cost."
    }
  ];

  return (
    <section id="process" className="w-full py-28 px-6 bg-[#0A0A0A] text-[#F5F5F0]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C4A77D] block mb-3">
            05 / Methodology
          </span>
          <h2 className="font-serif-heading text-4xl md:text-6xl font-normal text-[#F5F5F0]">
            How We Work with Clinics
          </h2>
          <p className="text-[#8A8A8A] font-light max-w-xl mx-auto mt-4 text-sm">
            A surgical 5-step process designed for zero disruption to your patient schedule.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-[#222] md:left-1/2 md:-ml-[1px]" />
          
          <div 
            className="absolute left-6 top-0 w-[2px] bg-gradient-to-b from-[#C4A77D] to-[#E6C896] md:left-1/2 md:-ml-[1px] transition-all duration-500 ease-out"
            style={{ height: `${(activeStep / steps.length) * 100}%` }}
          />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = activeStep >= stepNum;

              return (
                <div 
                  key={step.num}
                  onClick={() => setActiveStep(stepNum)}
                  className={`relative flex flex-col md:flex-row items-start cursor-pointer group ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-6 -translate-x-1/2 md:left-1/2 top-0 z-10 w-12 h-12 rounded-full border-2 bg-[#0A0A0A] flex items-center justify-center font-mono text-xs transition-all duration-300 shadow-xl"
                    style={{
                      borderColor: isActive ? '#C4A77D' : '#333',
                      color: isActive ? '#C4A77D' : '#666'
                    }}
                  >
                    {step.num}
                  </div>

                  <div className="ml-16 md:ml-0 md:w-1/2 md:px-12">
                    <div className={`p-6 rounded-2xl transition-all duration-300 border ${
                      activeStep === stepNum 
                        ? 'glass-dark border-[#C4A77D] shadow-xl' 
                        : 'bg-[#121212] border-[#222] hover:border-[#333]'
                    }`}>
                      <h3 className="font-serif-heading text-2xl text-[#F5F5F0] mb-2">
                        {step.name}
                      </h3>
                      <p className="text-[#8A8A8A] font-light text-sm leading-relaxed mb-4">
                        {step.desc}
                      </p>
                      <div className="font-mono text-[11px] text-[#C4A77D] flex items-center gap-2 pt-3 border-t border-[#222]">
                        <Info className="w-3.5 h-3.5 text-[#C4A77D]" />
                        <span>{step.detail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => {
  const trustSignals = [
    {
      icon: ShieldCheck,
      title: "HIPAA-Aware Workflows",
      desc: "Encrypted asset handling, verified patient consent frameworks, and compliant storage."
    },
    {
      icon: Calendar,
      title: "Clinic-Friendly Scheduling",
      desc: "Zero patient downtime. Filming designed around surgical blocks and room availability."
    },
    {
      icon: Lock,
      title: "Compliance-First Review",
      desc: "Every edit pre-screened for medical board advertising rules and social guidelines."
    },
    {
      icon: Users,
      title: "50+ Aesthetics Clients",
      desc: "Exclusively serving dermatologists, plastic surgeons, and high-end medspas."
    },
    {
      icon: Award,
      title: "In-House Medical Advisory",
      desc: "Internal medical reviewer ensures anatomical and procedural terminology accuracy."
    },
    {
      icon: Sliders,
      title: "Platform Partnerships",
      desc: "Verified ad partner strategies across Meta, TikTok, Google, and YouTube."
    }
  ];

  return (
    <section id="trust" className="w-full py-28 px-6 bg-[#F5F5F0] border-t border-[#E5E5DF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C4A77D] block mb-3">
            06 / Clinical Standards
          </span>
          <h2 className="font-serif-heading text-4xl md:text-6xl font-normal text-[#0A0A0A]">
            Built for Clinical Environments
          </h2>
          <p className="text-[#8A8A8A] font-light max-w-xl mx-auto mt-4 text-sm">
            We operate with the same rigor, privacy, and precision required in your operating room.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="group glass-panel rounded-2xl p-8 border border-[#E5E5DF] hover:border-[#C4A77D] transition-all duration-300 hover:shadow-lg relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] text-[#C4A77D] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-heading text-2xl font-normal text-[#0A0A0A] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#8A8A8A] font-light text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#C4A77D]/10 rounded-full blur-xl group-hover:bg-[#C4A77D]/20 transition-all" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    clinic: '',
    email: '',
    phone: '',
    service: 'Full Service',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-28 px-6 bg-[#0A0A0A] text-[#F5F5F0] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-[#C4A77D] ambient-pulse pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4A77D] block mb-3">
              07 / Start A Project
            </span>
            <h2 className="font-serif-heading text-4xl md:text-6xl font-normal text-[#F5F5F0] leading-tight mb-6">
              Let's fill your consultation calendar.
            </h2>
            <p className="text-[#8A8A8A] font-light text-lg mb-8 leading-relaxed">
              Tell us about your clinic. We'll respond within 24 hours with a custom patient acquisition strategy outline.
            </p>

            <div className="space-y-4 border-t border-[#222] pt-8 font-mono text-xs text-[#8A8A8A]">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C4A77D]" />
                <span>Los Angeles • New York • London</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C4A77D]" />
                <span>consult@curaclinical.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C4A77D]" />
                <span>Strategy Call Turnaround: 24 Hours</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-dark rounded-3xl p-8 md:p-10 border border-[#C4A77D]/30 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#C4A77D] text-[#0A0A0A] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-heading text-3xl text-[#F5F5F0] mb-3">
                    Strategy Request Received
                  </h3>
                  <p className="text-[#8A8A8A] font-light text-sm max-w-md mx-auto">
                    Thank you, {formData.name}. Our medical marketing team will review {formData.clinic}'s digital presence and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs uppercase text-[#8A8A8A] mb-2">
                        Your Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Sarah Chen"
                        className="w-full bg-[#141414] border border-[#333] focus:border-[#C4A77D] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase text-[#8A8A8A] mb-2">
                        Clinic / Practice Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.clinic}
                        onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                        placeholder="Beverly Hills Aesthetics"
                        className="w-full bg-[#141414] border border-[#333] focus:border-[#C4A77D] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs uppercase text-[#8A8A8A] mb-2">
                        Direct Email *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="doctor@clinic.com"
                        className="w-full bg-[#141414] border border-[#333] focus:border-[#C4A77D] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase text-[#8A8A8A] mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (310) 000-0000"
                        className="w-full bg-[#141414] border border-[#333] focus:border-[#C4A77D] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-[#8A8A8A] mb-2">
                      Primary Service Needed
                    </label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#141414] border border-[#333] focus:border-[#C4A77D] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
                    >
                      <option value="Production">Production (On-Location Filming)</option>
                      <option value="Post">Post-Production (Video Editing)</option>
                      <option value="Growth">Growth Strategy (Patient Acquisition)</option>
                      <option value="Full Service">Full Service Engine (Recommended)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-[#8A8A8A] mb-2">
                      Tell Us About Your Practice
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Current monthly consultation volume, target procedures (e.g. Facelifts, Injectables)..."
                      className="w-full bg-[#141414] border border-[#333] focus:border-[#C4A77D] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#C4A77D] hover:bg-[#E6C896] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group active:scale-[0.99]"
                  >
                    <span>Request Strategy Call</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A0A0A] text-[#F5F5F0] border-t border-[#222] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#222]">
          <div>
            <h3 className="font-serif-heading text-4xl md:text-5xl font-bold tracking-wider text-extruded text-[#F5F5F0]">
              CURA CLINICAL
            </h3>
            <p className="font-mono text-xs text-[#8A8A8A] uppercase tracking-widest mt-2">
              Medical Aesthetics Content Marketing Agency
            </p>
          </div>

          <div className="flex flex-wrap gap-8 font-mono text-xs text-[#8A8A8A]">
            <div>
              <span className="text-[#C4A77D] block mb-1">LOS ANGELES</span>
              <span>Beverly Hills Suite 400</span>
            </div>
            <div>
              <span className="text-[#C4A77D] block mb-1">NEW YORK</span>
              <span>Madison Ave Floor 18</span>
            </div>
            <div>
              <span className="text-[#C4A77D] block mb-1">LONDON</span>
              <span>Harley Street Studios</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#666]">
          <p>© 2026 CURA CLINICAL CONTENT AGENCY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-[#C4A77D] transition-colors">LINKEDIN</a>
            <a href="#hero" className="hover:text-[#C4A77D] transition-colors">INSTAGRAM</a>
            <a href="#hero" className="hover:text-[#C4A77D] transition-colors">HIPAA PRIVACY STATEMENT</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      const sections = ['hero', 'difference', 'services', 'work', 'process', 'trust', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F0] text-[#0A0A0A] selection:bg-[#C4A77D] selection:text-[#0A0A0A]">
      <FontAndStyleLoader />
      <CustomCursor />

      {loading ? (
        <LoadingScreen onFinished={() => setLoading(false)} />
      ) : (
        <React.Fragment>
          <Navigation 
            visible={scrollY > 150} 
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />

          <main>
            <HeroSection onNavigate={scrollToSection} />
            <ManifestoSection />
            <ServicesSection />
            <WorkSection />
            <ProcessSection />
            <TrustSection />
            <ContactSection />
          </main>

          <Footer />
        </React.Fragment>
      )}
    </div>
  );
}
