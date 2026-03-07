import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ProjectPage from "./pages/ProjectPage";

/* ─── Intersection observer hook ────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Skills Section Components ─────────────────────────────── */
function ToolTag({ name }) {
  return (
    <span style={{
      padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
      color: "#cbd5e1", background: "rgba(15,23,42,0.9)",
      border: "1px solid rgba(51,65,85,0.6)",
    }}>
      {name}
    </span>
  );
}

function LanguageCard({ name, code, level, color }) {
  return (
    <div style={{
      background: "rgba(8,15,26,0.9)", border: "1px solid rgba(51,65,85,0.6)",
      borderRadius: 14, padding: "20px 24px", flex: "1 1 200px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>{name}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: color, background: `${color}18`, border: `1px solid ${color}35`, padding: "2px 8px", borderRadius: 20 }}>
          {code}
        </span>
      </div>
      <div style={{ fontSize: 12, color: "#64748b" }}>{level}</div>
    </div>
  );
}

/* ─── Featured project card ──────────────────────────────────── */
function FeaturedProject({ title, subtitle, description, achievements, achievementsLabel, tags, githubUrl, color, index, panel }) {
  const isEven = index % 2 === 0;
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 mb-10"
      style={{ background: "rgba(15,23,42,0.8)" }}>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
          <p className="text-cyan-400 font-semibold text-sm mb-4">{subtitle}</p>
          <p className="text-gray-400 leading-relaxed mb-6">{description}</p>
          <p className="text-xs font-bold tracking-widest text-cyan-500 mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-cyan-500"></span>
            {achievementsLabel}
          </p>
          <ul className="space-y-2 mb-6">
            {achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                <span className="text-cyan-400 mt-0.5">⚡</span>{a}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((t) => (
              <span key={t} className="px-3 py-1 text-xs rounded-full border border-slate-600 text-gray-300">{t}</span>
            ))}
          </div>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-600 text-sm text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View Code
            </a>
          )}
        </div>

        {/* ── Info panel ── */}
        <div className="md:w-64 flex flex-col justify-center p-7 relative"
          style={{ background: `linear-gradient(160deg, ${color}10, ${color}04)`, borderLeft: `1px solid ${color}20` }}>
          <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 0%, ${color}10, transparent 70%)`, pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            {panel.map((row, i) => (
              <div key={i}>
                <div style={{ display:"flex", flexDirection:"column", gap:3, padding:"12px 0" }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:`${color}99`, textTransform:"uppercase" }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize:13, fontWeight:500, color: i === panel.length - 1 ? color : "#cbd5e1", lineHeight:1.4 }}>
                    {row.value}
                  </span>
                </div>
                {i < panel.length - 1 && (
                  <div style={{ height:1, background:"rgba(51,65,85,0.5)" }} />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── CV Download Modal ──────────────────────────────────────── */
function CVModal({ onClose, lang }) {
  const isDE = lang === "de";
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "linear-gradient(135deg, #0d1a2e, #0a1628)",
        border: "1px solid rgba(6,182,212,0.3)",
        borderRadius: 24, padding: "40px 44px", maxWidth: 440, width: "90%",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        animation: "fadeUp 0.3s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #06b6d4, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#e2e8f0", fontFamily: "'Outfit', sans-serif" }}>
                {isDE ? "Lebenslauf herunterladen" : "Download CV"}
              </h3>
            </div>
            <p style={{ color: "#64748b", fontSize: 13 }}>
              {isDE ? "Wähle deine bevorzugte Sprache" : "Choose your preferred language"}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#64748b", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <div style={{ height: 1, background: "rgba(6,182,212,0.15)", margin: "20px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Deutsch", sub: isDE ? "Deutsche Version" : "German version", file: "/deutsch-cv.pdf", dlName: "Zahir_Hussain_Lebenslauf_DE.pdf", accent: "#3b82f6", accentBg: "rgba(59,130,246,0.06)", accentBorder: "rgba(59,130,246,0.2)" },
            { label: "English", sub: isDE ? "Englische Version" : "English version", file: "/english-cv.pdf", dlName: "Zahir_Hussain_CV_EN.pdf", accent: "#06b6d4", accentBg: "rgba(6,182,212,0.06)", accentBorder: "rgba(6,182,212,0.2)" },
          ].map((opt) => (
            <a key={opt.label} href={opt.file} download={opt.dlName} onClick={onClose}
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: opt.accentBg, border: `1px solid ${opt.accentBorder}`, borderRadius: 16, textDecoration: "none", transition: "all 0.25s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = opt.accentBg.replace("0.06", "0.14"); e.currentTarget.style.borderColor = opt.accent + "80"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = opt.accentBg; e.currentTarget.style.borderColor = opt.accentBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${opt.accent}22`, border: `1px solid ${opt.accent}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" fill="none" stroke={opt.accent} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{opt.sub}</div>
              </div>
              <svg width="16" height="16" fill="none" stroke={opt.accent} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════════════════════════ */
const translations = {
  en: {
    nav: ["About", "Experience", "Projects", "Skills", "Contact"],
    navIds: ["about", "experience", "projects", "skills", "contact"],
    badge: "Available for opportunities",
    heroTitle: "AI Researcher & Intelligent Systems Developer",
    heroDesc: "Applied AI Engineer working at the intersection of machine learning research and intelligent system development. I design data-driven models and end-to-end AI solutions that transform real-world data into reliable decision support systems, bridging academic research with practical engineering applications.",
    exploreBtn: "Explore My Work",
    downloadBtn: "Download CV",
    whoIAm: "WHO I AM",
    aboutTitle: "About Me",
    aboutParas: [
      "I enjoy working at the intersection of research and real systems. My curiosity lies in understanding how models behave, how data shapes decisions, and how experiments turn ideas into reliable solutions.",
      "I like building systems where algorithms are not just trained, but carefully evaluated, questioned, and improved. And I also like exploring data, designing experiments, and turning research ideas into working solutions.",
    ],
    capCards: [
      { icon: "🧠", title: "ML & AI", desc: "Supervised learning, neural networks, predictive modeling, model evaluation" },
      { icon: "</>", title: "Systems Development", desc: "Backend APIs, service integration, Docker environments, system deployment" },
      { icon: "🔬", title: "Research Workflows", desc: "Experiment design, reproducible pipelines, model validation, performance analysis" },
      { icon: "📊", title: "Data Systems", desc: "Time-series analysis, large dataset processing, data preparation pipelines" },
    ],
    drivesTitle: "What Drives Me",
    drivesText: "I focus on applying machine learning to real operational problems. My goal is to build systems where models are not only trained and evaluated, but integrated into software environments where they support practical decision making.",
    whereWorked: "WHERE I'VE WORKED",
    expTitle: "Experience",
    eduTitle: "Education",
    experiences: [
      {
        role: "AI Systems Developer (Research Project)",
        company: "Technische Hochschule Würzburg-Schweinfurt (THWS)",
        period: "Dec 2025 – Present",
        points: [
          "Enhanced a conversational AI assistant within a web application by improving tool interactions and assistant prompt configuration for reliable calendar automation.",
          "Designed and implemented four AI tool interfaces for calendar management (create, check, update, delete events) by defining tool schemas and connecting backend APIs using Node.js and REST.",
          "Supported system deployment in a Docker-based environment and implemented an HTTPS proxy solution to enable secure communication between AI tools and backend services.",
        ],
      },
      {
        role: "CTO – AI & Intelligent Systems",
        company: "Reborse Startup",
        period: "Jun 2025 – Present",
        points: [
          "Contributed to backend development and system architecture for a platform supporting structured data access and core application services.",
          "Developed an AI-powered chatbot to assist users with platform interactions and automated responses.",
          "Designed and evaluated AI system components with focus on inference reliability, backend integration, and scalable application workflows.",
        ],
      },
      {
        role: "Associate Professional Software Engineer",
        company: "Vels Construction",
        period: "Feb 2022 – Feb 2023",
        points: [
          "Processed and analyzed structured datasets containing more than 50,000 records using Python.",
          "Developed automated data workflows and quantitative models that reduced operational downtime by approximately 25%.",
          "Performed longitudinal data analysis to support operational performance evaluation.",
        ],
      },
    ],
    education: [
      { level: "MASTER'S DEGREE", degree: "Master's in Artificial Intelligence", school: "THWS Würzburg-Schweinfurt", period: "Mar 2023 – Jan 2026" },
      { level: "BACHELOR'S DEGREE", degree: "Bachelor's in Computer Science & Engineering", school: "Kalasalingam University, India", period: "May 2018 – Apr 2022" },
    ],
    whatBuilt: "WHAT I'VE BUILT",
    projectsTitle: "Featured Projects",
    projectsSubtitle: "Real-world AI systems with clearly scoped research and engineering outcomes",
    viewAllGithub: "View All on GitHub",
    achievementsLabel: "KEY ACHIEVEMENTS",
    projects: [
      {
        title: "AI-Based Heat Demand Forecasting",
        subtitle: "Master's Thesis — Applied Machine Learning",
        description: "Developed machine learning models to forecast heat demand in a district heating network using real operational time-series data. The study evaluates multiple model families across several forecasting horizons and compares curated feature sets with larger engineered feature sets to analyze accuracy, training complexity, and operational feasibility.",
        achievements: [
          "Built an end-to-end machine learning pipeline using real operational district heating data",
          "Compared Linear Regression, SVR, Feed-Forward Neural Networks, and LSTM models",
          "Evaluated forecasting horizons from 1 to 72 hours using 38,784 hourly observations",
          "Designed reproducible experimentation pipelines with systematic model comparison",
          "Explored reinforcement learning approaches for operational optimization",
        ],
        tags: ["Python", "Scikit-learn", "TensorFlow", "LSTM", "Time Series", "Pandas"],
        color: "#06b6d4",
        githubUrl: "https://github.com/anwar-prog/AI-Based-Heat-Demand-Forecasting",
        panel: [
          { label: "Domain",   value: "Energy AI" },
          { label: "Dataset",  value: "38,784 hourly records" },
          { label: "Models",   value: "LR · SVR · FFNN · LSTM" },
          { label: "Role",     value: "ML Research" },
          { label: "Outcome",  value: "SVR best for day-ahead forecasting" },
        ],
      },
      {
        title: "3D Object Detection",
        subtitle: "Computer Vision — Industrial Inspection",
        description: "Developed a deep learning system for identifying maturity levels of manufacturing components using images captured by a 2D camera. The system combines real production images with synthetic 3D-CAD data and uses a VGG-based convolutional neural network to perform classification under varying real-world conditions.",
        achievements: [
          "Implemented a CNN-based recognition system using a VGG ImageNet architecture",
          "Combined real industrial images with synthetic 3D-CAD data for training",
          "Applied data augmentation to improve robustness against lighting and view variations",
          "Used transfer learning to leverage pre-trained feature representations",
          "Designed the system with focus on computational efficiency for real-time inspection",
        ],
        tags: ["Computer Vision", "CNN", "VGG", "Transfer Learning", "Python", "PyTorch"],
        color: "#8b5cf6",
        githubUrl: "https://github.com/anwar-prog/3D-Object-Detection",
        panel: [
          { label: "Domain",     value: "Computer Vision" },
          { label: "Input",      value: "Industrial images + CAD data" },
          { label: "Model",      value: "VGG CNN" },
          { label: "Techniques", value: "Transfer Learning" },
          { label: "Outcome",    value: "Real-time inspection capability" },
        ],
      },
      {
        title: "Reinforcement Learning Blackjack",
        subtitle: "Sequential Decision Making",
        description: "Implemented reinforcement learning algorithms to study decision-making strategies in simulated blackjack environments. The work evaluates how reinforcement learning policies compare with traditional rule-based strategies under different game rule variations.",
        achievements: [
          "Implemented a Q-learning agent to improve the standard blackjack strategy",
          "Integrated rule variations including high-low counting and Zen counting systems",
          "Evaluated policy performance using simulation-based experiments",
          "Compared reinforcement learning strategies against traditional blackjack decision rules",
        ],
        tags: ["Python", "Reinforcement Learning", "Q-Learning", "Simulation", "Policy Optimization"],
        color: "#10b981",
        githubUrl: "https://github.com/anwar-prog/Reinforcement-Learning-Approaches-to-Blackjack",
        panel: [
          { label: "Domain",      value: "Reinforcement Learning" },
          { label: "Algorithm",   value: "Q-Learning" },
          { label: "Environment", value: "Blackjack simulator" },
          { label: "Variants",    value: "Hi-Lo + Zen counting" },
          { label: "Outcome",     value: "Improved decision strategy" },
        ],
      },
    ],
    pubSectionLabel: "RESEARCH",
    pubTitle: "Publication",
    publications: [
      {
        title: "Automated Sugarcane Disease Recognition using Faster R-CNN and an Android Application",
        journal: "IEEE",
        year: "Apr 2022",
        description: "Developed a Faster R-CNN based computer vision system to detect sugarcane leaf diseases from image data. The model was trained using a dataset of approximately 1,500 images containing healthy and diseased leaves. An Android application was implemented as the user interface to capture leaf images and perform disease detection through the trained model.",
        ieeeUrl: "https://ieeexplore.ieee.org/document/9776685",
        githubUrl: "https://github.com/anwar-prog/Automated-Sugarcane-Disease-Recognition",
      },
    ],
    whatIKnow: "TOOLS & LANGUAGES",
    skillsTitle: "Skills",
    skillsNote: "Actively learning NLP and cloud-based ML deployment on AWS.",
    toolGroups: [
      {
        category: "Machine Learning & AI",
        tools: ["Python", "Scikit-learn", "TensorFlow", "Keras", "PyTorch", "NumPy", "Pandas"],
      },
      {
        category: "Systems & Backend",
        tools: ["Node.js", "React", "MongoDB", "Firebase", "Docker", "Git", "REST APIs"],
      },
    ],
    languages: [
      { name: "English", code: "C2", level: "Proficient", color: "#06b6d4" },
      { name: "German", code: "B1", level: "Intermediate", color: "#3b82f6" },
      { name: "Tamil", code: "Native", level: "Native speaker", color: "#10b981" },
    ],
    getInTouch: "GET IN TOUCH",
    contactTitle: "Let's Connect",
    contactSubtitle: "Open to AI engineering, machine learning, and research roles",
    contactCards: [
      { label: "Email", value: "zsharikanwar@gmail.com" },
      { label: "LinkedIn", value: "linkedin.com/in/zahirhussain" },
      { label: "GitHub", value: "github.com/anwar-prog" },
      { label: "Location", value: "Würzburg, Germany" },
    ],
    locationCard: [
      "Based in Würzburg, Germany",
      "Open to relocation across the EU",
      "Authorized to work in Germany",
    ],
    ctaTitle: "Ready to Build Something Impactful?",
    ctaText: "I'm actively seeking opportunities in AI engineering and research where I can apply ML expertise to solve real-world problems. Whether it's a full-time role or a research collaboration — let's talk.",
    ctaBtn: "Get In Touch",
    footer: "Built with React & TailwindCSS",
    easterHint: "You made it to the end… try pressing the last letter of the alphabet on your keyboard.",
  },

  de: {
    nav: ["Über mich", "Erfahrung", "Projekte", "Fähigkeiten", "Kontakt"],
    navIds: ["about", "experience", "projects", "skills", "contact"],
    badge: "Offen für Stellenangebote",
    heroTitle: "KI-Forscher & Entwickler Intelligenter Systeme",
    heroDesc: "Angewandter KI-Ingenieur an der Schnittstelle von ML-Forschung und intelligenter Systementwicklung. Ich entwerfe datengetriebene Modelle und End-to-End-KI-Lösungen, die reale Daten in verlässliche Entscheidungsunterstützungssysteme übersetzen — Brücke zwischen akademischer Forschung und praktischer Ingenieuranwendung.",
    exploreBtn: "Meine Arbeit entdecken",
    downloadBtn: "Lebenslauf herunterladen",
    whoIAm: "WER ICH BIN",
    aboutTitle: "Über mich",
    aboutParas: [
      "Ich arbeite gerne an der Schnittstelle zwischen Forschung und realen Systemen. Meine Neugier gilt dem Verständnis, wie Modelle funktionieren, wie Daten Entscheidungen formen und wie Experimente Ideen in zuverlässige Lösungen verwandeln.",
      "Ich baue Systeme, in denen Algorithmen nicht nur trainiert, sondern sorgfältig evaluiert, hinterfragt und verbessert werden. Außerdem erkunde ich gerne Daten, gestalte Experimente und überführe Forschungsideen in funktionierende Lösungen.",
    ],
    capCards: [
      { icon: "🧠", title: "ML & KI", desc: "Überwachtes Lernen, neuronale Netze, prädiktive Modellierung, Modellbewertung" },
      { icon: "</>", title: "Systementwicklung", desc: "Backend-APIs, Service-Integration, Docker-Umgebungen, System-Deployment" },
      { icon: "🔬", title: "Forschungsworkflows", desc: "Experimentdesign, reproduzierbare Pipelines, Modellvalidierung, Leistungsanalyse" },
      { icon: "📊", title: "Datensysteme", desc: "Zeitreihenanalyse, Verarbeitung großer Datensätze, Datenvorbereitung" },
    ],
    drivesTitle: "Was mich antreibt",
    drivesText: "Ich konzentriere mich auf die Anwendung von maschinellem Lernen auf reale Betriebsprobleme. Mein Ziel ist es, Systeme zu entwickeln, in denen Modelle nicht nur trainiert und bewertet, sondern in Softwareumgebungen integriert werden, wo sie praktische Entscheidungen unterstützen.",
    whereWorked: "WO ICH GEARBEITET HABE",
    expTitle: "Erfahrung",
    eduTitle: "Ausbildung",
    experiences: [
      {
        role: "KI-Systementwickler (Forschungsprojekt)",
        company: "Technische Hochschule Würzburg-Schweinfurt (THWS)",
        period: "Dez. 2025 – Heute",
        points: [
          "Einen konversationellen KI-Assistenten in einer Webanwendung verbessert – durch optimierte Tool-Interaktionen und Prompt-Konfiguration für zuverlässige Kalenderautomatisierung.",
          "Vier KI-Tool-Schnittstellen für die Kalenderverwaltung (Erstellen, Prüfen, Aktualisieren, Löschen von Terminen) entwickelt – durch Definition von Tool-Schemas und Anbindung von Backend-APIs mit Node.js und REST.",
          "System-Deployment in einer Docker-Umgebung unterstützt und eine HTTPS-Proxy-Lösung implementiert, um sichere Kommunikation zwischen KI-Tools und Backend-Diensten zu gewährleisten.",
        ],
      },
      {
        role: "CTO – KI & Intelligente Systeme",
        company: "Reborse Startup",
        period: "Jun. 2025 – Heute",
        points: [
          "Zur Backend-Entwicklung und Systemarchitektur einer Plattform beigetragen, die strukturierten Datenzugriff und Kernanwendungsdienste unterstützt.",
          "Einen KI-gestützten Chatbot entwickelt, der Nutzern bei Plattforminteraktionen und automatisierten Antworten hilft.",
          "KI-Systemkomponenten mit Fokus auf Inferenzzuverlässigkeit, Backend-Integration und skalierbare Anwendungs-Workflows konzipiert und bewertet.",
        ],
      },
      {
        role: "Softwareentwickler (Associate Professional)",
        company: "Vels Construction",
        period: "Feb. 2022 – Feb. 2023",
        points: [
          "Strukturierte Datensätze mit mehr als 50.000 Datensätzen mit Python verarbeitet und analysiert.",
          "Automatisierte Daten-Workflows und quantitative Modelle entwickelt, die die Betriebsausfallzeit um ca. 25 % reduzierten.",
          "Längsschnittdatenanalyse zur Unterstützung der operativen Leistungsbewertung durchgeführt.",
        ],
      },
    ],
    education: [
      { level: "MASTERABSCHLUSS", degree: "Master in Künstlicher Intelligenz", school: "THWS Würzburg-Schweinfurt", period: "März 2023 – Jan. 2026" },
      { level: "BACHELORABSCHLUSS", degree: "Bachelor in Informatik & Ingenieurwesen", school: "Kalasalingam University, Indien", period: "Mai 2018 – Apr. 2022" },
    ],
    whatBuilt: "WAS ICH GEBAUT HABE",
    projectsTitle: "Ausgewählte Projekte",
    projectsSubtitle: "Reale KI-Systeme mit klar definierten Forschungs- und Ingenieurergebnissen",
    viewAllGithub: "Alle auf GitHub ansehen",
    achievementsLabel: "WICHTIGE LEISTUNGEN",
    projects: [
      {
        title: "KI-basierte Wärmebedarfsprognose",
        subtitle: "Masterarbeit — Angewandtes Maschinelles Lernen",
        description: "ML-Modelle zur Prognose des Wärmebedarfs in einem Fernwärmenetz mit realen Betriebszeitreihendaten entwickelt. Die Studie bewertet mehrere Modellfamilien über verschiedene Prognosehorizonte und vergleicht kuratierte mit größeren Feature-Sets.",
        achievements: [
          "End-to-End-ML-Pipeline mit realen Fernwärme-Betriebsdaten aufgebaut",
          "Lineare Regression, SVR, Feed-Forward Neuronale Netze und LSTM verglichen",
          "Prognosehorizonte von 1 bis 72 Stunden mit 38.784 Stundenbeobachtungen bewertet",
          "Reproduzierbare Experimentierpipelines mit systematischem Modellvergleich konzipiert",
          "RL-Ansätze für Betriebsoptimierung untersucht",
        ],
        tags: ["Python", "Scikit-learn", "TensorFlow", "LSTM", "Zeitreihen", "Pandas"],
        color: "#06b6d4",
        githubUrl: "https://github.com/anwar-prog/AI-Based-Heat-Demand-Forecasting",
        panel: [
          { label: "Bereich",   value: "Energie-KI" },
          { label: "Datensatz", value: "38.784 Stundeneinträge" },
          { label: "Modelle",   value: "LR · SVR · FFNN · LSTM" },
          { label: "Rolle",     value: "ML-Forschung" },
          { label: "Ergebnis",  value: "SVR am besten für Tagesprognose" },
        ],
      },
      {
        title: "3D-Objekterkennung",
        subtitle: "Computer Vision — Industrielle Inspektion",
        description: "Deep-Learning-System zur Identifizierung von Reifegraden von Fertigungskomponenten mit einer 2D-Kamera entwickelt. Das System kombiniert echte Produktionsbilder mit synthetischen 3D-CAD-Daten und nutzt ein VGG-basiertes CNN.",
        achievements: [
          "CNN-basiertes Erkennungssystem mit VGG ImageNet-Architektur implementiert",
          "Echte Industriebilder mit synthetischen 3D-CAD-Daten kombiniert",
          "Datenerweiterung für Robustheit gegen Beleuchtungs- und Ansichtsvariationen",
          "Transfer Learning für vortrainierte Feature-Repräsentationen genutzt",
          "System mit Fokus auf Recheneffizienz für Echtzeit-Inspektion entwickelt",
        ],
        tags: ["Computer Vision", "CNN", "VGG", "Transfer Learning", "Python", "PyTorch"],
        color: "#8b5cf6",
        githubUrl: "https://github.com/anwar-prog/3D-Object-Detection",
        panel: [
          { label: "Bereich",     value: "Computer Vision" },
          { label: "Eingabe",     value: "Industriebilder + CAD-Daten" },
          { label: "Modell",      value: "VGG CNN" },
          { label: "Techniken",   value: "Transfer Learning" },
          { label: "Ergebnis",    value: "Echtzeit-Inspektionsfähigkeit" },
        ],
      },
      {
        title: "Bestärkendes Lernen: Blackjack",
        subtitle: "Sequentielle Entscheidungsfindung",
        description: "RL-Algorithmen zur Untersuchung von Entscheidungsstrategien in simulierten Blackjack-Umgebungen implementiert. Die Arbeit bewertet, wie RL-Strategien im Vergleich zu regelbasierten Ansätzen abschneiden.",
        achievements: [
          "Q-Learning-Agent zur Verbesserung der Standard-Blackjack-Strategie implementiert",
          "Regelvariationen inkl. High-Low- und Zen-Zählsysteme integriert",
          "Strategieleistung durch simulationsbasierte Experimente bewertet",
          "RL-Strategien gegen traditionelle Blackjack-Entscheidungsregeln verglichen",
        ],
        tags: ["Python", "Bestärkendes Lernen", "Q-Learning", "Simulation", "Policy-Optimierung"],
        color: "#10b981",
        githubUrl: "https://github.com/anwar-prog/Reinforcement-Learning-Approaches-to-Blackjack",
        panel: [
          { label: "Bereich",      value: "Bestärkendes Lernen" },
          { label: "Algorithmus",  value: "Q-Learning" },
          { label: "Umgebung",     value: "Blackjack-Simulator" },
          { label: "Varianten",    value: "Hi-Lo + Zen-Zählung" },
          { label: "Ergebnis",     value: "Verbesserte Entscheidungsstrategie" },
        ],
      },
    ],
    pubSectionLabel: "FORSCHUNG",
    pubTitle: "Publikation",
    publications: [
      {
        title: "Automatisierte Erkennung von Zuckerrohrkrankheiten mit Faster R-CNN und einer Android-Anwendung",
        journal: "IEEE",
        year: "Apr. 2022",
        description: "Faster-R-CNN-basiertes Computer-Vision-System zur Erkennung von Zuckerrohrblattkrankheiten entwickelt. Das Modell wurde mit ca. 1.500 Bildern trainiert. Eine Android-Anwendung wurde als Benutzeroberfläche implementiert.",
        ieeeUrl: "https://ieeexplore.ieee.org/document/9776685",
        githubUrl: "https://github.com/anwar-prog/Automated-Sugarcane-Disease-Recognition",
      },
    ],
    whatIKnow: "WERKZEUGE & SPRACHEN",
    skillsTitle: "Fähigkeiten",
    skillsNote: "Aktiv am Lernen: NLP und Cloud-basiertes ML-Deployment auf AWS.",
    toolGroups: [
      {
        category: "Maschinelles Lernen & KI",
        tools: ["Python", "Scikit-learn", "TensorFlow", "Keras", "PyTorch", "NumPy", "Pandas"],
      },
      {
        category: "Systeme & Backend",
        tools: ["Node.js", "React", "MongoDB", "Firebase", "Docker", "Git", "REST APIs"],
      },
    ],
    languages: [
      { name: "Englisch", code: "C2", level: "Fließend", color: "#06b6d4" },
      { name: "Deutsch", code: "B1", level: "Mittelstufe", color: "#3b82f6" },
      { name: "Tamil", code: "Native", level: "Muttersprache", color: "#10b981" },
    ],
    getInTouch: "KONTAKT AUFNEHMEN",
    contactTitle: "Lass uns verbinden",
    contactSubtitle: "Offen für KI-Engineering, maschinelles Lernen und Forschungsrollen",
    contactCards: [
      { label: "E-Mail", value: "zsharikanwar@gmail.com" },
      { label: "LinkedIn", value: "linkedin.com/in/zahirhussain" },
      { label: "GitHub", value: "github.com/anwar-prog" },
      { label: "Standort", value: "Würzburg, Deutschland" },
    ],
    locationCard: [
      "Wohnhaft in Würzburg, Deutschland",
      "Offen für Umzug innerhalb der EU",
      "Arbeitserlaubnis in Deutschland",
    ],
    ctaTitle: "Bereit, etwas Wirkungsvolles zu bauen?",
    ctaText: "Ich suche aktiv nach Möglichkeiten im KI-Engineering und in der Forschung. Ob Vollzeitstelle oder Forschungskooperation — ich freue mich auf das Gespräch.",
    ctaBtn: "Kontakt aufnehmen",
    footer: "Erstellt mit React & TailwindCSS",
    easterHint: "Du hast es bis zum Ende geschafft… drück den letzten Buchstaben des Alphabets auf deiner Tastatur.",
  },
};

/* ─── Easter Egg Modal ───────────────────────────────────────── */
function EasterEggModal({ onClose, lang }) {
  const isDE = lang === "de";
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setOpacity(0), 6000);
    const closeTimer = setTimeout(() => onClose(), 8000);
    return () => { clearTimeout(fadeTimer); clearTimeout(closeTimer); };
  }, []);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(0,0,0,0.55)", backdropFilter:"blur(10px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:20,
      opacity, transition:"opacity 2s ease",
    }}>
      {/* Glow pulse behind card */}
      <div style={{
        position:"absolute", width:420, height:280, borderRadius:"50%",
        background:"radial-gradient(ellipse, rgba(6,182,212,0.18), transparent 70%)",
        animation:"eggGlow 1.2s ease-out forwards", pointerEvents:"none",
      }} />

      <div onClick={(e) => e.stopPropagation()} style={{
        background:"linear-gradient(135deg,#0b1829,#08121f)",
        border:"1px solid rgba(6,182,212,0.25)", borderRadius:20,
        padding:"28px 36px", maxWidth:520, width:"100%",
        boxShadow:"0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(6,182,212,0.06)",
        animation:"eggAppear 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        textAlign:"center",
      }}>
        {/* Badge */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(6,182,212,0.1)", border:"1px solid rgba(6,182,212,0.25)", borderRadius:20, padding:"3px 11px", marginBottom:16 }}>
          <span style={{ fontSize:10 }}>🔓</span>
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", color:"#06b6d4", textTransform:"uppercase" }}>
            {isDE ? "Easter Egg Entsperrt" : "Easter Egg Unlocked"}
          </span>
        </div>

        {/* Star */}

        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:19, color:"#06b6d4", marginBottom:16, whiteSpace:"nowrap" }}>
          {isDE ? "Respekt!! Du hast Z gedrückt" : "Respect!! You pressed Z"}
        </h3>

        <p style={{ color:"#64748b", fontSize:12, lineHeight:1.9, margin:0 }}>
          {isDE ? "Was wahrscheinlich eines von zwei Dingen bedeutet:" : "Which probably means one of two things:"}<br/>
          <span style={{ color:"#94a3b8" }}>
            {isDE
              ? <>Wenn du <strong style={{ color:"#e2e8f0" }}>einstellst</strong> → LinkedIn und E-Mail warten oben.<br/>Wenn du <strong style={{ color:"#e2e8f0" }}>erkundest</strong> → danke für die Neugier.</>
              : <>If you're <strong style={{ color:"#e2e8f0" }}>hiring</strong> → LinkedIn and email are waiting above.<br/>If you're <strong style={{ color:"#e2e8f0" }}>exploring</strong> → thanks for the curiosity.</>}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ─── Contact Modal ──────────────────────────────────────────── */
function ContactModal({ onClose, lang }) {
  const isDE = lang === "de";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const subjects = isDE
    ? ["Jobangebot", "Forschungskooperation", "Projektgespräch", "Nur Hallo sagen"]
    : ["Job opportunity", "Research collaboration", "Project discussion", "Just saying hello"];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = isDE ? "Bitte gib deinen Namen ein." : "Please enter your name.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = isDE ? "Bitte gib eine gültige E-Mail ein." : "Please enter a valid email.";
    if (!form.message.trim()) e.message = isDE ? "Bitte schreib eine Nachricht." : "Please write a message.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xreyzoyn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  const field = (key) => ({
    style: {
      width: "100%", background: "rgba(15,23,42,0.8)",
      border: `1px solid ${errors[key] ? "rgba(248,113,113,0.5)" : "rgba(51,65,85,0.7)"}`,
      borderRadius: 12, padding: "11px 14px", color: "#e2e8f0", fontSize: 14,
      fontFamily: "'Outfit',sans-serif", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
    },
    onFocus: (e) => { e.target.style.borderColor = errors[key] ? "rgba(248,113,113,0.7)" : "rgba(6,182,212,0.5)"; },
    onBlur: (e) => { e.target.style.borderColor = errors[key] ? "rgba(248,113,113,0.5)" : "rgba(51,65,85,0.7)"; },
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((ev) => ({ ...ev, [key]: null }));
    },
  });

  const ErrorMsg = ({ k }) => errors[k]
    ? <p style={{ color: "#f87171", fontSize: 11, marginTop: 4, marginLeft: 2 }}>{errors[k]}</p>
    : null;

  const labelStyle = { fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: "#64748b", textTransform: "uppercase", marginBottom: 5, display: "block" };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "linear-gradient(135deg, #0d1a2e, #0a1628)",
        border: "1px solid rgba(6,182,212,0.3)", borderRadius: 24,
        padding: "36px 40px", maxWidth: 460, width: "100%",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)", animation: "fadeUp 0.3s ease",
        maxHeight: "90vh", overflowY: "auto",
      }}>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="28" height="28" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 22, color: "#e2e8f0", marginBottom: 12 }}>
              {isDE ? "Nachricht gesendet!" : "Message sent!"}
            </h3>
            <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
              {isDE ? "Vielen Dank. Ich melde mich so schnell wie möglich." : "Thanks for reaching out. I'll get back to you as soon as possible."}
            </p>
            <button onClick={onClose} className="btn-primary" style={{ margin: "0 auto" }}>
              {isDE ? "Schließen" : "Close"}
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#06b6d4,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#e2e8f0", fontFamily: "'Outfit',sans-serif" }}>
                    {isDE ? "Nachricht senden" : "Get In Touch"}
                  </h3>
                </div>
                <p style={{ color: "#64748b", fontSize: 13 }}>
                  {isDE ? "Ich antworte in der Regel innerhalb eines Tages." : "I typically respond within a day."}
                </p>
              </div>
              <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#64748b", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
            </div>

            <div style={{ height: 1, background: "rgba(6,182,212,0.15)", margin: "18px 0" }} />

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              <div>
                <label style={labelStyle}>{isDE ? "Name" : "Name"} <span style={{ color: "#f87171" }}>*</span></label>
                <input value={form.name} placeholder={isDE ? "Dein Name" : "Your name"} {...field("name")} />
                <ErrorMsg k="name" />
              </div>

              <div>
                <label style={labelStyle}>{isDE ? "E-Mail" : "Email"} <span style={{ color: "#f87171" }}>*</span></label>
                <input value={form.email} type="email" placeholder={isDE ? "Deine E-Mail-Adresse" : "Your email address"} {...field("email")} />
                <ErrorMsg k="email" />
              </div>

              <div>
                <label style={labelStyle}>{isDE ? "Betreff" : "Subject"} <span style={{ color: "#475569", fontWeight: 400, textTransform: "none", fontSize: 10 }}>{isDE ? "(optional)" : "(optional)"}</span></label>
                <select value={form.subject}
                  style={{ ...field("subject").style, color: form.subject ? "#e2e8f0" : "#64748b", cursor: "pointer" }}
                  onFocus={field("subject").onFocus} onBlur={field("subject").onBlur}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}>
                  <option value="" style={{ background: "#0d1a2e" }}>{isDE ? "Worum geht es?" : "What is this about?"}</option>
                  {subjects.map((s) => <option key={s} value={s} style={{ background: "#0d1a2e" }}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>{isDE ? "Nachricht" : "Message"} <span style={{ color: "#f87171" }}>*</span></label>
                <textarea value={form.message} placeholder={isDE ? "Was liegt dir am Herzen…" : "Tell me what you have in mind…"}
                  style={{ ...field("message").style, resize: "none", minHeight: 100 }}
                  onFocus={field("message").onFocus} onBlur={field("message").onBlur}
                  onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); if (errors.message) setErrors((ev) => ({ ...ev, message: null })); }} />
                <ErrorMsg k="message" />
              </div>

            </div>

            {/* Send */}
            <button onClick={handleSubmit} disabled={status === "sending"} className="btn-primary"
              style={{ width: "100%", marginTop: 20, justifyContent: "center", opacity: status === "sending" ? 0.8 : 1 }}>
              {status === "sending" ? (
                <>{isDE ? "Wird gesendet…" : "Sending…"}</>
              ) : (
                <>{isDE ? "Nachricht senden" : "Send Message"}
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </>
              )}
            </button>

            {/* Fallback */}
            <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#475569" }}>
              {isDE ? "Lieber direkt schreiben?" : "Prefer direct email?"}{" "}
              <a href="mailto:zsharikanwar@gmail.com" target="_blank" rel="noreferrer" style={{ color: "#06b6d4", textDecoration: "none" }}>zsharikanwar@gmail.com</a>
            </p>
            {status === "error" && (
              <p style={{ textAlign: "center", marginTop: 8, fontSize: 12, color: "#f87171" }}>
                {isDE ? "Etwas ist schiefgelaufen. Bitte schreib direkt per E-Mail." : "Something went wrong. Please try via email."}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [logoExpanded, setLogoExpanded] = useState(false);
  const [lang, setLang] = useState("de");
  const [showCVModal, setShowCVModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLocationCard, setShowLocationCard] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);

  const t = translations[lang];

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setLogoExpanded(window.scrollY > window.innerHeight * 0.7);
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.6));
      setHeroOpacity(fade);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowCVModal(false);
        setShowContactModal(false);
        setShowLocationCard(false);
      }
      if (e.key === "z" || e.key === "Z") {
        setShowEasterEgg(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const contactHrefs = [
    "mailto:zsharikanwar@gmail.com",
    "https://www.linkedin.com/in/sharik-anwar-zahir-hussain/",
    "https://github.com/anwar-prog",
    null,
  ];
  const contactIconBgs = [
    "linear-gradient(135deg, #06b6d4, #3b82f6)",
    "linear-gradient(135deg, #0ea5e9, #06b6d4)",
    "linear-gradient(135deg, #10b981, #06b6d4)",
    "linear-gradient(135deg, #8b5cf6, #06b6d4)",
  ];
  const contactIcons = [
    <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>,
    <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  ];

  return (
    <Routes>
      <Route path="/" element={
        <div style={{ background: "#080f1a", color: "white", fontFamily: "'Outfit', sans-serif" }}>

          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

          <style>{`
            * { box-sizing: border-box; }
            html { scroll-behavior: smooth; }
            body { margin: 0; }
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #080f1a; }
            ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #06b6d4, #3b82f6); border-radius: 10px; }
            ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
            * { scrollbar-width: thin; scrollbar-color: #06b6d4 #080f1a; }
            @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
            @keyframes pulseGlow { 0%,100% { box-shadow:0 0 0 0 rgba(6,182,212,0.3); } 50% { box-shadow:0 0 0 12px rgba(6,182,212,0); } }
            @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-8px); } }
            @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
            .fade-up { animation: fadeUp 0.7s ease both; }
            .delay-1 { animation-delay:0.15s; } .delay-2 { animation-delay:0.30s; }
            .delay-3 { animation-delay:0.45s; } .delay-4 { animation-delay:0.60s; }
            .shimmer-text { background:linear-gradient(90deg,#06b6d4,#ffffff,#06b6d4); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 3s linear infinite; }
            .section-title { font-family:'Outfit',sans-serif; font-weight:800; }
            .card-hover { transition:transform 0.3s ease,border-color 0.3s ease,box-shadow 0.3s ease; }
            .card-hover:hover { transform:translateY(-4px); border-color:rgba(6,182,212,0.4); box-shadow:0 20px 60px rgba(6,182,212,0.08); }
            .btn-primary { background:linear-gradient(135deg,#06b6d4,#3b82f6); border:none; color:white; padding:12px 28px; border-radius:50px; font-weight:600; font-size:14px; cursor:pointer; transition:all 0.3s ease; animation:pulseGlow 2.5s infinite; text-decoration:none; display:inline-flex; align-items:center; gap:8px; font-family:'Outfit',sans-serif; }
            .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(6,182,212,0.4); }
            .btn-secondary { background:transparent; border:1.5px solid rgba(255,255,255,0.25); color:white; padding:12px 28px; border-radius:50px; font-weight:600; font-size:14px; cursor:pointer; transition:all 0.3s ease; text-decoration:none; display:inline-flex; align-items:center; gap:8px; font-family:'Outfit',sans-serif; }
            .btn-secondary:hover { border-color:#06b6d4; color:#06b6d4; transform:translateY(-2px); }
            .grid-bg { background-image:linear-gradient(rgba(6,182,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.04) 1px,transparent 1px); background-size:60px 60px; }
            .underline-accent { display:inline-block; position:relative; }
            .underline-accent::after { content:''; position:absolute; bottom:-8px; left:50%; transform:translateX(-50%); width:60px; height:3px; background:linear-gradient(90deg,#06b6d4,#3b82f6); border-radius:2px; }
            @keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
            @keyframes eggAppear { from { opacity:0; transform:scale(0.82); } to { opacity:1; transform:scale(1); } }
            @keyframes eggGlow { 0% { opacity:0; transform:scale(0.6); } 40% { opacity:1; transform:scale(1.1); } 100% { opacity:0; transform:scale(1.4); } }
            @keyframes expandName { from { opacity:0; max-width:0; } to { opacity:1; max-width:200px; } }
            @keyframes collapseName { from { opacity:1; max-width:200px; } to { opacity:0; max-width:0; } }
            .logo-name-expand { display:inline-block; overflow:hidden; white-space:nowrap; animation: expandName 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
            .logo-name-collapse { display:inline-block; overflow:hidden; white-space:nowrap; animation: collapseName 0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
            .lang-btn { background:transparent; border:1.5px solid rgba(255,255,255,0.12); color:#64748b; padding:5px 13px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s ease; font-family:'Outfit',sans-serif; }
            .lang-btn.active { background:rgba(6,182,212,0.15); border-color:rgba(6,182,212,0.5); color:#06b6d4; }
            .lang-btn:hover:not(.active) { border-color:rgba(255,255,255,0.25); color:#94a3b8; }
          `}</style>

          {/* ══ NAVBAR ══════════════════════════════════════════════ */}
          <nav style={{
            position: "fixed", top: 0, width: "100%", zIndex: 100, padding: "0 24px",
            transition: "all 0.4s ease",
            background: scrolled ? "rgba(8,15,26,0.95)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(6,182,212,0.1)" : "1px solid transparent",
          }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 72 }}>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 20, color: "#06b6d4", textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center", overflow: "hidden" }}>
                {/* Z badge — visible only at top */}
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: logoExpanded ? 0 : 32,
                  height: 32, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  fontSize: 17, fontWeight: 900, color: "white",
                  opacity: logoExpanded ? 0 : 1,
                  overflow: "hidden",
                  transition: "width 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
                }}>Z</span>
                {/* Full name — fades in when scrolled */}
                <span style={{
                  maxWidth: logoExpanded ? 220 : 0,
                  opacity: logoExpanded ? 1 : 0,
                  overflow: "hidden", whiteSpace: "nowrap",
                  transition: "max-width 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
                }}>Zahir Hussain</span>
              </a>
              <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                {t.nav.map((item, i) => (
                  <a key={item} href={`#${t.navIds[i]}`}
                    style={{ color: "#94a3b8", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.target.style.color = "#06b6d4")}
                    onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}>
                    {item}
                  </a>
                ))}
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: 8, background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: "4px 6px", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <button className={`lang-btn${lang === "de" ? " active" : ""}`} onClick={() => setLang("de")}>DE</button>
                  <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
                </div>
                {[
                  { href: "https://github.com/anwar-prog", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg> },
                  { href: "https://www.linkedin.com/in/sharik-anwar-zahir-hussain/", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                ].map(({ href, icon }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer"
                    style={{ color: "#64748b", transition: "color 0.2s", display: "flex" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#06b6d4")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}>
                    {icon}
                  </a>
                ))}
                {/* Email icon → opens contact modal */}
                <button onClick={() => setShowContactModal(true)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#06b6d4")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </button>
              </div>
            </div>
          </nav>

          {/* ══ HERO ═════════════════════════════════════════════════ */}
          <section className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(6,182,212,0.12) 0%, transparent 70%)" }} />
            <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", top:"10%", left:"5%", background:"radial-gradient(circle,rgba(6,182,212,0.06),transparent 70%)", animation:"float 6s ease-in-out infinite", pointerEvents:"none" }} />
            <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", bottom:"15%", right:"8%", background:"radial-gradient(circle,rgba(59,130,246,0.06),transparent 70%)", animation:"float 8s ease-in-out infinite 2s", pointerEvents:"none" }} />

            <div style={{ maxWidth: 760, position: "relative", zIndex: 1, opacity: heroOpacity, transform: `translateY(${(1 - heroOpacity) * -30}px)`, transition: "opacity 0.05s linear, transform 0.05s linear" }}>
              <div className={heroVisible ? "fade-up" : ""} style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.25)", borderRadius:50, padding:"8px 18px", marginBottom:36, fontSize:13, color:"#94a3b8" }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", display:"inline-block", animation:"pulseGlow 2s infinite" }} />
                {t.badge}
                <a href="https://www.linkedin.com/in/sharik-anwar-zahir-hussain/" target="_blank" rel="noreferrer"
                  style={{ background:"rgba(6,182,212,0.15)", borderRadius:50, padding:"2px 8px", color:"#06b6d4", fontSize:11, textDecoration:"none", fontWeight:600 }}>
                  LinkedIn →
                </a>
              </div>

              <h1 className={`section-title shimmer-text ${heroVisible ? "fade-up delay-1" : ""}`}
                style={{ fontSize:"clamp(40px,7vw,80px)", lineHeight:1.05, marginBottom:20 }}>
                Zahir Hussain
              </h1>

              <h2 className={heroVisible ? "fade-up delay-2" : ""}
                style={{ fontSize:"clamp(15px,2.2vw,20px)", color:"#94a3b8", fontWeight:400, marginBottom:24 }}>
                {t.heroTitle}
              </h2>

              <p className={heroVisible ? "fade-up delay-3" : ""}
                style={{ fontSize:15.5, color:"#64748b", lineHeight:1.85, maxWidth:620, margin:"0 auto 44px" }}>
                {t.heroDesc}
              </p>

              <div className={heroVisible ? "fade-up delay-4" : ""}
                style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
                <a href="#projects" className="btn-primary">{t.exploreBtn}</a>
                <button className="btn-secondary" onClick={() => setShowCVModal(true)}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  {t.downloadBtn}
                </button>
              </div>
            </div>
          </section>

          {/* ══ ABOUT ════════════════════════════════════════════════ */}
          <section id="about" style={{ padding:"120px 24px", maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, alignItems:"start" }}>
              <div style={{ paddingRight:40 }}>
                <p style={{ color:"#06b6d4", fontSize:13, fontWeight:600, letterSpacing:"0.1em", marginBottom:16 }}>{t.whoIAm}</p>
                <h2 className="section-title underline-accent" style={{ fontSize:"clamp(28px,4vw,44px)", marginBottom:32, lineHeight:1.2 }}>{t.aboutTitle}</h2>
                {t.aboutParas.map((para, i) => (
                  <p key={i} style={{ color:"#94a3b8", lineHeight:1.9, marginBottom:18, fontSize:15 }}>{para}</p>
                ))}
              </div>
              {/* Portrait column */}
              <div style={{ position:"relative", display:"flex", justifyContent:"flex-end", alignItems:"flex-start", marginTop:"-8px" }}>
                {/* Bottom fade */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:120, background:"linear-gradient(to top, #080f1a 0%, transparent 100%)", zIndex:2, pointerEvents:"none" }} />
                <img src="/dp.png" alt="Zahir Hussain"
                  style={{
                    width:"82%", maxWidth:340, position:"relative", zIndex:1,
                    display:"block",
                    mixBlendMode:"screen",
                    filter:"brightness(0.95) contrast(1.05)",
                  }}
                />
              </div>
            </div>
            <div style={{ marginTop:60, borderRadius:20, padding:"40px 48px", textAlign:"center", background:"linear-gradient(135deg,rgba(6,182,212,0.06),rgba(59,130,246,0.06))", border:"1px solid rgba(6,182,212,0.15)" }}>
              <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:20, marginBottom:16 }}>{t.drivesTitle}</h3>
              <p style={{ color:"#94a3b8", maxWidth:640, margin:"0 auto", lineHeight:1.8, fontSize:15 }}>{t.drivesText}</p>
            </div>
          </section>

          {/* ══ EXPERIENCE ═══════════════════════════════════════════ */}
          <section id="experience" style={{ padding:"120px 24px", background:"rgba(15,23,42,0.5)" }}>
            <div style={{ maxWidth:900, margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:72 }}>
                <p style={{ color:"#06b6d4", fontSize:13, fontWeight:600, letterSpacing:"0.1em", marginBottom:16 }}>{t.whereWorked}</p>
                <h2 className="section-title underline-accent" style={{ fontSize:"clamp(28px,4vw,44px)" }}>{t.expTitle}</h2>
              </div>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:20, top:0, bottom:0, width:1, background:"linear-gradient(to bottom,#06b6d4,rgba(6,182,212,0.1))" }} />
                {t.experiences.map((exp, i) => (
                  <div key={i} className="card-hover" style={{ marginLeft:52, marginBottom:24, position:"relative", background:"rgba(8,15,26,0.9)", border:"1px solid rgba(51,65,85,0.6)", borderRadius:16, padding:"28px 32px" }}>
                    <div style={{ position:"absolute", left:-43, top:32, width:12, height:12, borderRadius:"50%", background:"#06b6d4", border:"2px solid #080f1a", boxShadow:"0 0 0 4px rgba(6,182,212,0.2)" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8, marginBottom:6 }}>
                      <h3 style={{ fontWeight:700, fontSize:17, color:"#e2e8f0" }}>{exp.role}</h3>
                      <span style={{ color:"#475569", fontSize:13, fontWeight:500, whiteSpace:"nowrap" }}>{exp.period}</span>
                    </div>
                    <p style={{ color:"#06b6d4", fontSize:13, fontWeight:600, marginBottom:16 }}>{exp.company}</p>
                    <ul style={{ margin:0, padding:0, listStyle:"none" }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ display:"flex", gap:10, marginBottom:8, color:"#64748b", fontSize:14, lineHeight:1.6 }}>
                          <span style={{ color:"#06b6d4", marginTop:2, flexShrink:0 }}>▸</span>{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:60 }}>
                <h3 className="section-title" style={{ fontSize:22, marginBottom:24, color:"#e2e8f0" }}>{t.eduTitle}</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                  {t.education.map((ed) => (
                    <div key={ed.degree} style={{ background:"rgba(8,15,26,0.9)", border:"1px solid rgba(51,65,85,0.6)", borderRadius:16, padding:"24px 28px" }}>
                      <div style={{ color:"#06b6d4", fontSize:11, fontWeight:700, letterSpacing:"0.08em", marginBottom:10 }}>🎓 {ed.level}</div>
                      <div style={{ fontWeight:700, fontSize:15, marginBottom:6, color:"#e2e8f0" }}>{ed.degree}</div>
                      <div style={{ color:"#64748b", fontSize:13, marginBottom:4 }}>{ed.school}</div>
                      <div style={{ color:"#475569", fontSize:12 }}>{ed.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══ PROJECTS ═════════════════════════════════════════════ */}
          <section id="projects" style={{ padding:"120px 24px" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:72 }}>
                <p style={{ color:"#06b6d4", fontSize:13, fontWeight:600, letterSpacing:"0.1em", marginBottom:16 }}>{t.whatBuilt}</p>
                <h2 className="section-title underline-accent" style={{ fontSize:"clamp(28px,4vw,44px)", marginBottom:16 }}>{t.projectsTitle}</h2>
                <p style={{ color:"#64748b", fontSize:15 }}>{t.projectsSubtitle}</p>
              </div>
              {t.projects.map((project, i) => (
                <FeaturedProject key={i} {...project} achievementsLabel={t.achievementsLabel} index={i} />
              ))}
              <div style={{ textAlign:"center", marginTop:16 }}>
                <a href="https://github.com/anwar-prog" target="_blank" rel="noreferrer" className="btn-primary">{t.viewAllGithub}</a>
              </div>
            </div>
          </section>

          {/* ══ PUBLICATIONS ═════════════════════════════════════════ */}
          <section style={{ padding:"80px 24px", background:"rgba(15,23,42,0.5)" }}>
            <div style={{ maxWidth:900, margin:"0 auto" }}>
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
                <div style={{ flex:1, height:1, background:"rgba(6,182,212,0.15)" }} />
                <p style={{ color:"#06b6d4", fontSize:12, fontWeight:700, letterSpacing:"0.12em", whiteSpace:"nowrap" }}>{t.pubSectionLabel}</p>
                <div style={{ flex:1, height:1, background:"rgba(6,182,212,0.15)" }} />
              </div>
              <h2 className="section-title" style={{ fontSize:"clamp(22px,3vw,34px)", marginBottom:32 }}>{t.pubTitle}</h2>
              {t.publications.map((pub, i) => (
                <div key={i} className="card-hover" style={{ background:"rgba(8,15,26,0.9)", border:"1px solid rgba(51,65,85,0.6)", borderRadius:16, padding:"28px 32px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:10 }}>
                    <h3 style={{ fontWeight:700, fontSize:16, color:"#e2e8f0", lineHeight:1.4, maxWidth:"70%" }}>{pub.title}</h3>
                    <span style={{ color:"#475569", fontSize:13, fontWeight:500, whiteSpace:"nowrap" }}>{pub.year}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                    <span style={{ background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", color:"#f87171", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{pub.journal}</span>
                  </div>
                  <p style={{ color:"#64748b", fontSize:14, lineHeight:1.7, marginBottom:20 }}>{pub.description}</p>
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                    <a href={pub.ieeeUrl} target="_blank" rel="noreferrer"
                      style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 16px", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:50, fontSize:12, fontWeight:600, color:"#f87171", textDecoration:"none", transition:"all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background="rgba(239,68,68,0.2)"; e.currentTarget.style.borderColor="rgba(239,68,68,0.5)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background="rgba(239,68,68,0.1)"; e.currentTarget.style.borderColor="rgba(239,68,68,0.25)"; }}>
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                      IEEE Paper
                    </a>
                    <a href={pub.githubUrl} target="_blank" rel="noreferrer"
                      style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 16px", background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.2)", borderRadius:50, fontSize:12, fontWeight:600, color:"#06b6d4", textDecoration:"none", transition:"all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background="rgba(6,182,212,0.15)"; e.currentTarget.style.borderColor="rgba(6,182,212,0.4)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background="rgba(6,182,212,0.08)"; e.currentTarget.style.borderColor="rgba(6,182,212,0.2)"; }}>
                      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      View Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══ SKILLS ═══════════════════════════════════════════════ */}
          <section id="skills" style={{ padding:"120px 24px" }}>
            <div style={{ maxWidth:1000, margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:64 }}>
                <p style={{ color:"#06b6d4", fontSize:13, fontWeight:600, letterSpacing:"0.1em", marginBottom:16 }}>{t.whatIKnow}</p>
                <h2 className="section-title underline-accent" style={{ fontSize:"clamp(28px,4vw,44px)" }}>{t.skillsTitle}</h2>
              </div>

              {/* Tool groups */}
              <div style={{ background:"rgba(8,15,26,0.8)", border:"1px solid rgba(51,65,85,0.6)", borderRadius:20, padding:"36px 40px", marginBottom:24 }}>
                {t.toolGroups.map((group, gi) => (
                  <div key={group.category} style={{ marginBottom: gi < t.toolGroups.length - 1 ? 32 : 0 }}>
                    <p style={{ color:"#06b6d4", fontSize:11, fontWeight:700, letterSpacing:"0.1em", marginBottom:14, textTransform:"uppercase" }}>
                      {group.category}
                    </p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                      {group.tools.map((tool) => <ToolTag key={tool} name={tool} />)}
                    </div>
                    {gi < t.toolGroups.length - 1 && (
                      <div style={{ height:1, background:"rgba(51,65,85,0.4)", margin:"28px 0 0" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                {t.languages.map((lang) => (
                  <LanguageCard key={lang.name} {...lang} />
                ))}
              </div>

              <p style={{ textAlign:"center", color:"#475569", marginTop:32, fontSize:13, fontStyle:"italic" }}>{t.skillsNote}</p>
            </div>
          </section>

          {/* ══ CONTACT ══════════════════════════════════════════════ */}
          <section id="contact" style={{ padding:"120px 24px", background:"rgba(15,23,42,0.5)" }}>
            <div style={{ maxWidth:900, margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:64 }}>
                <p style={{ color:"#06b6d4", fontSize:13, fontWeight:600, letterSpacing:"0.1em", marginBottom:16 }}>{t.getInTouch}</p>
                <h2 className="section-title underline-accent" style={{ fontSize:"clamp(28px,4vw,44px)", marginBottom:16 }}>{t.contactTitle}</h2>
                <p style={{ color:"#64748b", fontSize:15 }}>{t.contactSubtitle}</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:48 }}>
                {t.contactCards.map((c, i) => {
                  const isLocation = i === 3;
                  const isEmail = i === 0;
                  if (isEmail) {
                    return (
                      <button key={c.label} onClick={() => setShowContactModal(true)}
                        className="card-hover"
                        style={{ display:"block", width:"100%", textAlign:"center", background:"rgba(15,23,42,0.8)", border:"1px solid rgba(51,65,85,0.6)", borderRadius:16, padding:"28px 20px", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                        <div style={{ width:52, height:52, borderRadius:"50%", background:contactIconBgs[i], display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>{contactIcons[i]}</div>
                        <div style={{ fontWeight:700, fontSize:14, marginBottom:6, color:"#e2e8f0" }}>{c.label}</div>
                        <div style={{ color:"#475569", fontSize:12, wordBreak:"break-all" }}>{c.value}</div>
                      </button>
                    );
                  }
                  if (isLocation) {
                    return (
                      <div key={c.label} style={{ position:"relative" }}>
                        <button onClick={() => setShowLocationCard(v => !v)}
                          className="card-hover"
                          style={{ display:"block", width:"100%", textAlign:"center", background:"rgba(15,23,42,0.8)", border:"1px solid rgba(51,65,85,0.6)", borderRadius:16, padding:"28px 20px", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                          <div style={{ width:52, height:52, borderRadius:"50%", background:contactIconBgs[i], display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>{contactIcons[i]}</div>
                          <div style={{ fontWeight:700, fontSize:14, marginBottom:6, color:"#e2e8f0" }}>{c.label}</div>
                          <div style={{ color:"#475569", fontSize:12 }}>{c.value}</div>
                        </button>
                        {showLocationCard && (
                          <>
                            {/* Outside click overlay */}
                            <div onClick={() => setShowLocationCard(false)} style={{ position:"fixed", inset:0, zIndex:99 }} />
                            <div style={{
                              position:"absolute", bottom:"calc(100% + 12px)", left:"50%", transform:"translateX(-50%)",
                              background:"linear-gradient(135deg,#0d1a2e,#0a1628)",
                              border:"1px solid rgba(139,92,246,0.35)", borderRadius:14,
                              padding:"18px 22px", width:240, zIndex:100, textAlign:"left",
                              boxShadow:"0 20px 50px rgba(0,0,0,0.5)",
                              animation:"slideUp 0.3s cubic-bezier(0.4,0,0.2,1) forwards",
                            }}>
                              <div style={{ position:"absolute", bottom:-7, left:"50%", transform:"translateX(-50%)", width:12, height:12, background:"#0d1a2e", border:"1px solid rgba(139,92,246,0.35)", borderTop:"none", borderLeft:"none", rotate:"45deg" }} />
                              {[
                                { icon:"📍", text: t.locationCard[0] },
                                { icon:"✈️", text: t.locationCard[1] },
                                { icon:"✅", text: t.locationCard[2] },
                              ].map((row, ri) => (
                                <div key={ri} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom: ri < 2 ? 12 : 0 }}>
                                  <span style={{ fontSize:14, flexShrink:0, marginTop:1 }}>{row.icon}</span>
                                  <span style={{ fontSize:13, color:"#cbd5e1", lineHeight:1.5 }}>{row.text}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  }
                  return (
                    <a key={c.label} href={contactHrefs[i]} target="_blank" rel="noreferrer" className="card-hover"
                      style={{ display:"block", textDecoration:"none", background:"rgba(15,23,42,0.8)", border:"1px solid rgba(51,65,85,0.6)", borderRadius:16, padding:"28px 20px", textAlign:"center", cursor:"pointer" }}>
                      <div style={{ width:52, height:52, borderRadius:"50%", background:contactIconBgs[i], display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>{contactIcons[i]}</div>
                      <div style={{ fontWeight:700, fontSize:14, marginBottom:6, color:"#e2e8f0" }}>{c.label}</div>
                      <div style={{ color:"#475569", fontSize:12, wordBreak:"break-all" }}>{c.value}</div>
                    </a>
                  );
                })}
              </div>
              <div style={{ borderRadius:20, padding:"52px 48px", textAlign:"center", background:"linear-gradient(135deg,rgba(6,182,212,0.08),rgba(59,130,246,0.08))", border:"1px solid rgba(6,182,212,0.2)" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" style={{ display:"inline-block", marginBottom:20 }}>
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                <h3 className="section-title" style={{ fontSize:24, marginBottom:16 }}>{t.ctaTitle}</h3>
                <p style={{ color:"#64748b", maxWidth:520, margin:"0 auto 32px", lineHeight:1.8, fontSize:15 }}>{t.ctaText}</p>
                <button onClick={() => setShowContactModal(true)} className="btn-primary">{t.ctaBtn}</button>
              </div>
            </div>
          </section>

          {/* ══ FOOTER ═══════════════════════════════════════════════ */}
          <footer style={{ borderTop:"1px solid rgba(51,65,85,0.4)", padding:"32px 24px 28px", textAlign:"center", color:"#334155", fontSize:13, background:"rgba(8,15,26,0.9)", position:"relative" }}>
            <div style={{ marginBottom:12 }}>
              © {new Date().getFullYear()} Sharik Anwar Zahir Hussain &nbsp;·&nbsp; {t.footer}
            </div>
            <div style={{ fontSize:12, color:"#1e293b" }}>
              {t.easterHint}
            </div>

            {/* Easter egg modal */}
            {showEasterEgg && (
              <EasterEggModal onClose={() => setShowEasterEgg(false)} lang={lang} />
            )}
          </footer>

          {/* ══ CV MODAL ═════════════════════════════════════════════ */}
          {showCVModal && <CVModal onClose={() => setShowCVModal(false)} lang={lang} />}
          {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} lang={lang} />}

        </div>
      } />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;