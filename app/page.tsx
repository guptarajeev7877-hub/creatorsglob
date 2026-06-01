// @ts-nocheck
"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const COLORS = ["#FF6B6B","#FFD60A","#4ECDC4","#FF9F1C","#A78BFA","#FF6B9D","#63F5C0","#4CC9F0","#FF006E","#06D6A0"];

const CATEGORIES = [
  { id:"cricket",  icon:"🏏", label:"Cricket",  grad:"linear-gradient(135deg,#00b4d8,#0096c7)", glow:"#00b4d844" },
  { id:"gaming",   icon:"🎮", label:"Gaming",   grad:"linear-gradient(135deg,#7209b7,#560bad)", glow:"#7209b744" },
  { id:"music",    icon:"🎵", label:"Music",    grad:"linear-gradient(135deg,#f72585,#b5179e)", glow:"#f7258544" },
  { id:"beauty",   icon:"💄", label:"Beauty",   grad:"linear-gradient(135deg,#ff9a3c,#ff6b6b)", glow:"#ff9a3c44" },
  { id:"tech",     icon:"💻", label:"Tech",     grad:"linear-gradient(135deg,#4361ee,#3a0ca3)", glow:"#4361ee44" },
  { id:"food",     icon:"🍕", label:"Food",     grad:"linear-gradient(135deg,#f77f00,#d62828)", glow:"#f77f0044" },
  { id:"fitness",  icon:"💪", label:"Fitness",  grad:"linear-gradient(135deg,#06d6a0,#1b9aaa)", glow:"#06d6a044" },
  { id:"finance",  icon:"📈", label:"Finance",  grad:"linear-gradient(135deg,#2dc653,#007f5f)", glow:"#2dc65344" },
  { id:"movies",   icon:"🎬", label:"Movies",   grad:"linear-gradient(135deg,#e63946,#c1121f)", glow:"#e6394644" },
  { id:"travel",   icon:"✈️", label:"Travel",   grad:"linear-gradient(135deg,#48cae4,#0096c7)", glow:"#48cae444" },
  { id:"fashion",  icon:"👗", label:"Fashion",  grad:"linear-gradient(135deg,#ff006e,#8338ec)", glow:"#ff006e44" },
  { id:"comedy",   icon:"😂", label:"Comedy",   grad:"linear-gradient(135deg,#ffbe0b,#fb5607)", glow:"#ffbe0b44" },
];

const IG_TRENDS = [
  { tag:"#IPL2026",       views:"2.3B", cat:"Cricket",   color:"#00b4d8", emoji:"🏏" },
  { tag:"#AIArt",         views:"1.8B", cat:"Tech",      color:"#7209b7", emoji:"🤖" },
  { tag:"#SummerVibes",   views:"4.1B", cat:"Lifestyle", color:"#ff9a3c", emoji:"☀️" },
  { tag:"#NightRoutine",  views:"890M", cat:"Beauty",    color:"#f72585", emoji:"✨" },
  { tag:"#FoodTok",       views:"3.2B", cat:"Food",      color:"#f77f00", emoji:"🍕" },
  { tag:"#GymMotivation", views:"1.1B", cat:"Fitness",   color:"#06d6a0", emoji:"💪" },
];

const IG_STORIES = [
  { name:"Cricket", emoji:"🏏", c:"#00b4d8" },
  { name:"Gaming",  emoji:"🎮", c:"#7209b7" },
  { name:"Beauty",  emoji:"💄", c:"#f72585" },
  { name:"Food",    emoji:"🍕", c:"#f77f00" },
  { name:"Travel",  emoji:"✈️", c:"#48cae4" },
  { name:"Fashion", emoji:"👗", c:"#ff006e" },
  { name:"Fitness", emoji:"💪", c:"#06d6a0" },
  { name:"Tech",    emoji:"💻", c:"#4361ee" },
];

const TICKER = ["🔥 IPL 2026 Finals trending","🎵 Summer Hits playlist viral","💻 AI tools exploding","🏆 Olympics 2026 countdown","📱 New iPhone leaks","🎬 Bollywood blockbusters","💄 Glass skin tutorial viral","🍕 Street food vlogs trending","✈️ Budget travel hacks","😂 Comedy reels blowing up"];

const FLOAT_EMOJIS = ["🌟","💥","🎊","🎉","✨","🌈","💫","🎈","🦋","🌺","⭐","🎶","💝","🎯","🚀","🎸","🌸","💐"];
const HERO_WORDS   = ["Content Creators","YouTubers","Instagrammers","TikTokers","Streamers","Bloggers"];
// Floating glowing orbs
const ORBS = [
  { id:0, size:220, x:5,  y:10, color:"#FF6B6B", dur:14, delay:0   },
  { id:1, size:180, x:80, y:5,  color:"#FFD60A", dur:18, delay:2   },
  { id:2, size:260, x:60, y:60, color:"#4ECDC4", dur:16, delay:1   },
  { id:3, size:150, x:15, y:70, color:"#A78BFA", dur:12, delay:3   },
  { id:4, size:200, x:45, y:30, color:"#FF6B9D", dur:20, delay:0.5 },
  { id:5, size:170, x:90, y:80, color:"#63F5C0", dur:15, delay:4   },
  { id:6, size:130, x:30, y:90, color:"#FF9F1C", dur:11, delay:1.5 },
];

// ── Confetti pieces (static data, generated once)
const CONFETTI = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 5 + Math.random() * 9,
  color: COLORS[i % COLORS.length],
  delay: Math.random() * 4,
  dur: 3 + Math.random() * 4,
  isCircle: Math.random() > 0.4,
  rot: Math.random() * 360,
  drift: (Math.random() - 0.5) * 80,
}));

// ── Background twinkling stars
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 3 + Math.random() * 5,
  delay: Math.random() * 4,
  dur: 1.5 + Math.random() * 2,
}));

export default function CreatosGlob() {
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"🎉 Hey Creator! Welcome to CreatosGlob!\n\nI'm your AI Trend Assistant — ask me anything:\n• **\"Trending topics on Cricket\"**\n• **\"Write a YouTube script on AI\"**\n• **\"Instagram Reel ideas for Food\"**\n• **\"Thumbnail concepts for Gaming\"**\n\nLet's make you go viral! 🚀"
  }]);
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [genImg, setGenImg]         = useState(null);
  const [apiKeys]                   = useState({ claude: process.env.NEXT_PUBLIC_CLAUDE_KEY || "", gemini: process.env.NEXT_PUBLIC_GEMINI_KEY || "" });
  const [showKeys, setShowKeys]     = useState(false);
  const [imgPrompt, setImgPrompt]   = useState("");
  const [wordIdx, setWordIdx]       = useState(0);
  const [scrollPct, setScrollPct]       = useState(0);
  const [celebBursts, setCelebBursts]   = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const messagesEnd = useRef(null);

  // Word flip
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % HERO_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  // Hide confetti after 5s
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(pct);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Celebration burst on category click
  const triggerCelebration = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const burst = { id: Date.now(), x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setCelebBursts(p => [...p, burst]);
    setTimeout(() => setCelebBursts(p => p.filter(b => b.id !== burst.id)), 1200);
  };

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(p => [...p, { role:"user", content:msg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:"You are an enthusiastic AI Trend Assistant for CreatosGlob.com. For every query provide: 🔥 TOP 5 TRENDS, 📝 FULL SCRIPT, 🖼️ 3 THUMBNAIL IDEAS, 🎯 PLATFORM TIPS, 💡 PRO TIPS. Use emojis. Be exciting and energetic!",
          messages:[{ role:"user", content:msg }]
        })
      });
      const data = await res.json();
      setMessages(p => [...p, { role:"assistant", content: data.content?.[0]?.text || "Oops! Try again 😅" }]);
    } catch { setMessages(p => [...p, { role:"assistant", content:"⚠️ Error! Add Claude API key in ⚙️ Settings." }]); }
    setLoading(false);
  };

  const generateImage = async () => {
    if (!apiKeys.gemini) { setGenImg("NO_KEY"); return; }
    const prompt = imgPrompt || "Viral YouTube thumbnail ultra vibrant colorful Gen-Z happy positive style";
    setImgLoading(true); setGenImg(null);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKeys.gemini}`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ instances:[{ prompt }], parameters:{ sampleCount:1, aspectRatio:"16:9" } })
      });
      const data = await res.json();
      const b64  = data?.predictions?.[0]?.bytesBase64Encoded;
      setGenImg(b64 ? `data:image/png;base64,${b64}` : "ERROR");
    } catch { setGenImg("ERROR"); }
    setImgLoading(false);
  };

  const fmt = (text) => text.split("\n").map((l,i) => (
    <p key={i} style={{margin:"2px 0",lineHeight:1.65}} dangerouslySetInnerHTML={{__html: l.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>") || "&nbsp;"}}/>
  ));

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div style={{fontFamily:"'Poppins',sans-serif",background:"#fffdf5",minHeight:"100vh",overflowX:"hidden"}}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#ff6b6b,#ffd60a);border-radius:3px}

        @keyframes orbDrift{0%{transform:translate(0,0) scale(1)}25%{transform:translate(40px,-50px) scale(1.08)}50%{transform:translate(-30px,-80px) scale(0.94)}75%{transform:translate(50px,-40px) scale(1.04)}100%{transform:translate(0,0) scale(1)}}

        /* ─ Page animations ─ */
        @keyframes confettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(105vh) rotate(720deg);opacity:0}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg) scale(1)}33%{transform:translateY(-22px) rotate(12deg) scale(1.1)}66%{transform:translateY(-10px) rotate(-8deg) scale(0.95)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes wordIn{0%{opacity:0;transform:translateY(22px) scale(0.9)}20%,80%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-22px) scale(0.9)}}
        @keyframes twinkle{0%,100%{opacity:0.2;transform:scale(0.7)}50%{opacity:1;transform:scale(1.3)}}
        @keyframes rainbowBorder{0%{border-color:#ff6b6b}16%{border-color:#ffd60a}33%{border-color:#63f5c0}50%{border-color:#4cc9f0}66%{border-color:#a78bfa}83%{border-color:#ff6b9d}100%{border-color:#ff6b6b}}
        @keyframes sparkPop{0%{opacity:1;transform:translate(-50%,-50%) scale(0)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.4)}100%{opacity:0;transform:translate(-50%,-50%) scale(0.8) translateY(-30px)}}
        @keyframes celebBurst{0%{opacity:1;transform:translate(-50%,-50%) scale(0)}40%{opacity:1;transform:translate(-50%,-50%) scale(1.6)}100%{opacity:0;transform:translate(-50%,-50%) scale(2.5)}}
        @keyframes sunSpin{to{transform:rotate(360deg)}}
        @keyframes waveFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes popIn{0%{opacity:0;transform:scale(0.5)}70%{transform:scale(1.1)}100%{opacity:1;transform:scale(1)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes heartbeat{0%,100%{transform:scale(1)}25%{transform:scale(1.15)}50%{transform:scale(1)}75%{transform:scale(1.08)}}
        @keyframes wiggle{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
        @keyframes colorPop{0%{filter:brightness(1)}50%{filter:brightness(1.3)}100%{filter:brightness(1)}}

        /* ─ Interactive ─ */
        .cat-btn{transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1)!important;animation:popIn 0.5s ease both}
        .cat-btn:hover{transform:translateY(-10px) scale(1.08) rotate(-2deg)!important;filter:brightness(1.1)}
        .cat-btn:active{transform:scale(0.94)!important}
        .ig-card{transition:all 0.22s cubic-bezier(0.34,1.56,0.64,1)!important}
        .ig-card:hover{transform:translateY(-6px) scale(1.02)!important}
        .story-btn{transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1)!important}
        .story-btn:hover{transform:scale(1.18) rotate(3deg)!important}
        .send-btn:hover{transform:scale(1.14) rotate(-5deg)!important}
        .send-btn{transition:all 0.15s cubic-bezier(0.34,1.56,0.64,1)!important}
        .pill-btn:hover{transform:scale(1.08) translateY(-2px)!important}
        .pill-btn{transition:all 0.15s!important}
        .bounce-btn{animation:pulse 2.5s ease infinite}
        .bounce-btn:hover{animation:wiggle 0.4s ease!important}
        .story-ring{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);padding:3px;border-radius:50%;display:inline-block}
        .rainbow-card{animation:rainbowBorder 4s linear infinite}
        .happy-shadow{box-shadow:0 8px 32px rgba(255,107,107,0.18),0 2px 8px rgba(255,214,10,0.12)}
      `}</style>

      {/* ── RAINBOW SCROLL PROGRESS BAR ── */}
      <div style={{position:"fixed",top:0,left:0,zIndex:9999,height:5,width:`${scrollPct}%`,background:"linear-gradient(90deg,#ff6b6b,#ff9f1c,#ffd60a,#63f5c0,#4cc9f0,#a78bfa,#ff6b9d)",transition:"width 0.1s ease",borderRadius:"0 4px 4px 0",boxShadow:"0 0 10px rgba(255,107,107,0.6)"}}/>

      {/* ── FLOATING GLOWING ORBS ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {ORBS.map(o=>(
          <div key={o.id} style={{
            position:"absolute",
            width:o.size, height:o.size,
            borderRadius:"50%",
            background:`radial-gradient(circle at 35% 35%, ${o.color}55, ${o.color}11)`,
            border:`2px solid ${o.color}33`,
            left:`${o.x}%`, top:`${o.y}%`,
            animation:`orbDrift ${o.dur}s ease-in-out ${o.delay}s infinite`,
            filter:`blur(2px)`,
            boxShadow:`0 0 40px ${o.color}44, inset 0 0 30px ${o.color}22`,
          }}/>
        ))}
      </div>

      {/* ── CELEBRATION BURSTS ── */}
      {celebBursts.map(b=>(
        <div key={b.id} style={{position:"fixed",left:b.x,top:b.y,fontSize:48,animation:"celebBurst 1.2s ease forwards",pointerEvents:"none",zIndex:8888}}>🎉</div>
      ))}

      {/* ── CONFETTI RAIN ── */}
      {showConfetti && (
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:7777,overflow:"hidden"}}>
          {CONFETTI.map(c=>(
            <div key={c.id} style={{
              position:"absolute",
              width:c.size,height:c.size,
              background:c.color,
              borderRadius:c.isCircle?"50%":"3px",
              left:`${c.x}%`,top:-20,
              animation:`confettiFall ${c.dur}s ease-in ${c.delay}s forwards`,
              transform:`rotate(${c.rot}deg)`,
            }}/>
          ))}
        </div>
      )}

      {/* ── TWINKLING STARS BG ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {STARS.map(s=>(
          <div key={s.id} style={{
            position:"absolute",left:`${s.x}%`,top:`${s.y}%`,
            fontSize:s.size,animation:`twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            opacity:0.3,
          }}>⭐</div>
        ))}
      </div>

      {/* ── HEADER ── */}
      <header style={{padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,253,245,0.94)",backdropFilter:"blur(20px)",borderBottom:"3px solid #ffd60a44",position:"sticky",top:0,zIndex:100,boxShadow:"0 4px 24px rgba(255,214,10,0.1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:46,height:46,borderRadius:16,fontSize:22,background:"linear-gradient(135deg,#ff6b6b,#ffd60a,#63f5c0,#4cc9f0)",backgroundSize:"300% 300%",animation:"gradShift 3s ease infinite",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(255,107,107,0.35)",animation:"gradShift 3s ease infinite, heartbeat 2s ease infinite"}}>🌐</div>
          <div>
            <div style={{fontWeight:900,fontSize:22,background:"linear-gradient(135deg,#ff6b6b,#ff9f1c,#ffd60a)",backgroundSize:"200%",animation:"gradShift 3s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CreatosGlob</div>
            <div style={{fontSize:10,color:"#ffaa44",letterSpacing:2,textTransform:"uppercase",fontWeight:700}}>✨ AI Trend Engine</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{background:"linear-gradient(135deg,#fff0f0,#fff8e1)",border:"2px solid #ff6b6b44",borderRadius:100,padding:"7px 16px",fontSize:12,fontWeight:700,color:"#ff6b6b",display:"flex",alignItems:"center",gap:6,animation:"heartbeat 2s ease infinite"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#ff6b6b",animation:"pulse 1.2s infinite"}}/>🔥 Live Trends
          </div>
          <div style={{background:"linear-gradient(135deg,#fff0f6,#fffde7)",border:"2px solid #ffd60a55",borderRadius:100,padding:"7px 18px",fontWeight:700,fontSize:13,color:"#ff9f1c",fontFamily:"Poppins,sans-serif"}}>✨ AI Powered</div>
        </div>
      </header>


      {/* ── TICKER ── */}
      <div style={{background:"linear-gradient(135deg,#ff6b6b,#ff9f1c,#ffd60a,#63f5c0,#4cc9f0,#a78bfa)",backgroundSize:"400%",animation:"gradShift 6s ease infinite",padding:"10px 0",overflow:"hidden"}}>
        <div style={{display:"flex",animation:"ticker 26s linear infinite",whiteSpace:"nowrap"}}>
          {[...TICKER,...TICKER].map((t,i)=>(
            <span key={i} style={{color:"#fff",fontSize:13,fontWeight:800,marginRight:52,flexShrink:0,textShadow:"0 1px 4px rgba(0,0,0,0.15)"}}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <div style={{background:"linear-gradient(160deg,#fffde7 0%,#fff0f6 40%,#f0fff4 80%,#e8f4ff 100%)",padding:"80px 20px 72px",textAlign:"center",position:"relative",overflow:"hidden",zIndex:1}}>
        {/* Big floating emoji background */}
        {FLOAT_EMOJIS.map((e,i)=>(
          <div key={i} style={{position:"absolute",fontSize:20+(i%4)*8,left:`${(i*5.8)%95}%`,top:`${(i*14)%85}%`,animation:`float ${3+(i%4)*0.8}s ease-in-out infinite`,animationDelay:`${i*0.22}s`,opacity:0.18,pointerEvents:"none",userSelect:"none",zIndex:0}}>{e}</div>
        ))}

        <div style={{position:"relative",zIndex:1}}>
          {/* Badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#fff0f6,#fffde7)",border:"2.5px solid #ffd60a",borderRadius:100,padding:"9px 22px",fontSize:13,fontWeight:800,color:"#ff9f1c",marginBottom:26,boxShadow:"0 4px 20px rgba(255,214,10,0.2)",animation:"pulse 3s ease infinite"}}>
            <span style={{animation:"spin 4s linear infinite",display:"inline-block"}}>🌟</span>
            #1 AI Platform for Content Creators
            <span style={{animation:"spin 4s linear infinite reverse",display:"inline-block"}}>🌟</span>
          </div>

          {/* Headline */}
          <h1 style={{fontSize:"clamp(2rem,6vw,4.2rem)",fontWeight:900,lineHeight:1.1,marginBottom:14,color:"#222"}}>
            <span style={{display:"block",animation:"slideInLeft 0.8s ease 0.2s both"}}>Made with 💛 for</span>
            <span style={{
              background:"linear-gradient(135deg,#ff6b6b,#ff9f1c,#ffd60a,#63f5c0,#4cc9f0,#a78bfa,#ff6b9d)",
              backgroundSize:"300%",animation:"gradShift 3s ease infinite,wordIn 2.8s ease infinite",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              display:"inline-block",minWidth:340,filter:"drop-shadow(0 2px 8px rgba(255,107,107,0.3))"
            }}>{HERO_WORDS[wordIdx]}</span>
            <span style={{display:"block",fontSize:"clamp(1.3rem,3.5vw,2.4rem)",color:"#444",WebkitTextFillColor:"#444",animation:"slideInRight 0.8s ease 0.4s both"}}>
              Around the World! 🌍
            </span>
          </h1>

          <p style={{fontSize:17,color:"#888",maxWidth:500,margin:"0 auto 36px",lineHeight:1.8,animation:"fadeUp 0.8s ease 0.6s both"}}>
            🎯 Discover viral trends · 📝 Get AI scripts · 🎨 Generate thumbnails · 🚀 Dominate every platform
          </p>

          {/* CTAs */}
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp 0.8s ease 0.8s both"}}>
            <button onClick={()=>scrollTo("chat-section")} className="bounce-btn" style={{background:"linear-gradient(135deg,#ff6b6b,#ff9f1c,#ffd60a)",backgroundSize:"200%",animation:"gradShift 3s ease infinite,pulse 2s ease infinite",border:"none",color:"#fff",padding:"16px 38px",borderRadius:100,fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"Poppins,sans-serif",boxShadow:"0 8px 32px rgba(255,107,107,0.4)",textShadow:"0 1px 4px rgba(0,0,0,0.1)"}}>
              🔥 Explore Trends Now!
            </button>
            <button onClick={()=>scrollTo("ig-section")} style={{background:"linear-gradient(135deg,#fff0f6,#fff8e1)",border:"3px solid #ffd60a",color:"#ff9f1c",padding:"16px 38px",borderRadius:100,fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"Poppins,sans-serif",boxShadow:"0 4px 20px rgba(255,214,10,0.2)",transition:"all 0.2s"}}>
              📸 Instagram Trends ✨
            </button>
          </div>

          {/* Stats */}
          <div style={{display:"flex",gap:48,justifyContent:"center",marginTop:52,flexWrap:"wrap",animation:"fadeUp 0.8s ease 1s both"}}>
            {[["🎯 10K+","Happy Creators"],["📊 50K+","Daily Trends"],["🤖 100%","AI Powered"],["❤️ Free","To Start"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center",animation:"waveFloat 3s ease-in-out infinite",animationDelay:`${Math.random()*1.5}s`}}>
                <div style={{fontSize:26,fontWeight:900,background:"linear-gradient(135deg,#ff6b6b,#ffd60a)",backgroundSize:"200%",animation:"gradShift 3s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{n}</div>
                <div style={{fontSize:13,color:"#aaa",fontWeight:600}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WAVE DIVIDER ── */}
      <div style={{background:"linear-gradient(160deg,#fffde7 0%,#fff0f6 100%)",lineHeight:0}}>
        <svg viewBox="0 0 1200 80" style={{display:"block",width:"100%"}}>
          <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* ── CATEGORIES ── */}
      <div style={{padding:"64px 20px",maxWidth:1100,margin:"0 auto",background:"#fff",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{display:"inline-block",background:"linear-gradient(135deg,#fff0f6,#fffde7)",border:"2.5px solid #ffd60a",borderRadius:100,padding:"8px 22px",fontSize:13,fontWeight:800,color:"#ff9f1c",marginBottom:12,animation:"pulse 2.5s ease infinite"}}>
            🎨 Pick Your Niche
          </div>
          <h2 style={{fontSize:"clamp(1.6rem,4vw,2.6rem)",fontWeight:900,color:"#222"}}>What Do You Create? <span style={{animation:"spin 4s linear infinite",display:"inline-block"}}>🎯</span></h2>
          <p style={{color:"#bbb",marginTop:8,fontSize:14}}>Click any category to instantly get AI-powered trends & scripts!</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:16}}>
          {CATEGORIES.map((cat,i)=>(
            <button key={cat.id} className="cat-btn" onClick={(e)=>{triggerCelebration(e);sendMessage(`Show me top 5 viral trending content ideas, a complete YouTube script, thumbnail concepts, and platform tips for the ${cat.label} niche`);scrollTo("chat-section");}}
              style={{background:cat.grad,border:"none",borderRadius:22,padding:"28px 14px",cursor:"pointer",color:"#fff",display:"flex",flexDirection:"column",alignItems:"center",gap:10,boxShadow:`0 10px 32px ${cat.glow}`,animationDelay:`${i*0.05}s`}}>
              <span style={{fontSize:40,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))",animation:`waveFloat ${2.5+(i%3)*0.5}s ease-in-out infinite`,animationDelay:`${i*0.15}s`}}>{cat.icon}</span>
              <span style={{fontSize:14,fontWeight:800,fontFamily:"Poppins,sans-serif",textShadow:"0 1px 4px rgba(0,0,0,0.15)"}}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── WAVE ── */}
      <div style={{background:"#fff",lineHeight:0}}>
        <svg viewBox="0 0 1200 80" style={{display:"block",width:"100%"}}>
          <path d="M0,40 C200,0 400,80 600,40 C800,0 1000,80 1200,40 L1200,80 L0,80 Z" fill="#fffde7"/>
        </svg>
      </div>

      {/* ── INSTAGRAM SECTION ── */}
      <div id="ig-section" style={{background:"linear-gradient(160deg,#fffde7 0%,#fff0f6 50%,#f0fff4 100%)",padding:"64px 20px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",borderRadius:100,padding:"12px 28px",marginBottom:16,boxShadow:"0 8px 32px rgba(240,148,51,0.35)",animation:"pulse 2s ease infinite"}}>
              <span style={{fontSize:24,animation:"spin 4s linear infinite",display:"inline-block"}}>📸</span>
              <span style={{color:"#fff",fontWeight:900,fontSize:17}}>Instagram Trends</span>
              <span style={{fontSize:18,animation:"heartbeat 1.5s ease infinite",display:"inline-block"}}>❤️</span>
            </div>
            <h2 style={{fontSize:"clamp(1.6rem,4vw,2.6rem)",fontWeight:900,color:"#222"}}>What's Blazing on Instagram 🔥</h2>
            <p style={{color:"#aaa",marginTop:10,fontSize:15}}>Trending hashtags · Viral Reel ideas · Creator growth tips</p>
          </div>

          {/* Story circles */}
          <div style={{display:"flex",gap:20,overflowX:"auto",paddingBottom:16,marginBottom:42,justifyContent:"center",flexWrap:"wrap"}}>
            {IG_STORIES.map((s,i)=>(
              <button key={s.name} className="story-btn" onClick={()=>{sendMessage(`Give me top viral Instagram Reels ideas, trending hashtags, hook lines, best audio suggestions and growth tips for ${s.name} niche in 2026`);scrollTo("chat-section");}}
                style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",animation:`popIn 0.5s ease ${i*0.07}s both`}}>
                <div className="story-ring" style={{animation:"heartbeat 3s ease infinite",animationDelay:`${i*0.2}s`}}>
                  <div style={{width:66,height:66,borderRadius:"50%",background:`${s.c}22`,border:"3px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{s.emoji}</div>
                </div>
                <span style={{fontSize:11,fontWeight:800,color:"#444",fontFamily:"Poppins,sans-serif"}}>{s.name}</span>
              </button>
            ))}
          </div>

          {/* Hashtag cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:18}}>
            {IG_TRENDS.map((t,i)=>(
              <div key={t.tag} className="ig-card rainbow-card" onClick={()=>{sendMessage(`Create a complete viral Instagram Reel script, caption with emojis, best hashtag set (15 hashtags), thumbnail idea and posting strategy for ${t.tag} in ${t.cat} niche`);scrollTo("chat-section");}}
                style={{background:"#fff",borderRadius:24,padding:22,border:`3px solid ${t.color}`,boxShadow:`0 8px 32px ${t.color}22`,cursor:"pointer",animation:`popIn 0.5s ease ${i*0.1}s both`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div style={{background:`${t.color}18`,borderRadius:14,padding:"8px 14px",display:"inline-flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:22,animation:"waveFloat 2s ease-in-out infinite"}}>{t.emoji}</span>
                    <span style={{fontWeight:900,color:t.color,fontSize:16}}>{t.tag}</span>
                  </div>
                  <div style={{background:"linear-gradient(135deg,#ff6b6b,#ffd60a)",borderRadius:100,padding:"5px 12px",fontSize:11,color:"#fff",fontWeight:800,animation:"pulse 2s ease infinite"}}>🔥 Hot!</div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                  <span style={{fontSize:13,color:"#aaa",fontWeight:600}}>📂 {t.cat}</span>
                  <span style={{fontSize:13,fontWeight:800,color:"#333"}}>👁️ {t.views}</span>
                </div>
                <div style={{background:`linear-gradient(135deg,${t.color}15,${t.color}08)`,borderRadius:12,padding:"10px 14px",fontSize:12,color:t.color,fontWeight:700,border:`1.5px dashed ${t.color}44`}}>
                  💡 Tap for AI script & full strategy! →
                </div>
              </div>
            ))}
          </div>

          {/* Growth tips */}
          <div style={{marginTop:40,background:"#fff",borderRadius:28,padding:30,border:"3px solid #ffd60a44",boxShadow:"0 8px 40px rgba(255,214,10,0.12)"}}>
            <div style={{fontWeight:900,fontSize:18,marginBottom:22,color:"#222",display:"flex",alignItems:"center",gap:10}}>
              <span style={{animation:"spin 4s linear infinite",display:"inline-block"}}>💡</span>
              Instagram Growth Tips for 2026
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16}}>
              {[["⏰","Best Post Times","6–9 PM gets 3× more reach"],["📹","Reels Rule","2× more reach than photos"],["#️⃣","Hashtags","5–8 niche tags, not 30"],["🔁","Consistency","4–5 Reels/week for growth"],["🪝","Strong Hooks","First 2 seconds decide all"],["🎵","Trending Audio","5× reach with trending sounds"]].map(([icon,title,tip],i)=>(
                <div key={title} style={{background:"linear-gradient(135deg,#fffde7,#fff0f6)",borderRadius:18,padding:18,border:"2px solid #ffd60a33",animation:`popIn 0.5s ease ${i*0.1}s both`,transition:"transform 0.2s"}}>
                  <div style={{fontSize:26,marginBottom:8,animation:"waveFloat 3s ease-in-out infinite",animationDelay:`${i*0.3}s`,display:"inline-block"}}>{icon}</div>
                  <div style={{fontWeight:800,fontSize:13,marginBottom:5,color:"#222"}}>{title}</div>
                  <div style={{fontSize:12,color:"#888",lineHeight:1.6}}>{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── WAVE ── */}
      <div style={{background:"linear-gradient(160deg,#fffde7,#fff0f6)",lineHeight:0}}>
        <svg viewBox="0 0 1200 80" style={{display:"block",width:"100%"}}>
          <path d="M0,20 C300,80 600,0 900,60 C1050,90 1150,10 1200,30 L1200,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* ── AI CHAT + IMAGE GEN ── */}
      <div id="chat-section" style={{padding:"64px 20px",maxWidth:1100,margin:"0 auto",background:"#fff",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{display:"inline-block",background:"linear-gradient(135deg,#fff0f6,#fffde7)",border:"2.5px solid #ffd60a",borderRadius:100,padding:"8px 22px",fontSize:13,fontWeight:800,color:"#ff9f1c",marginBottom:12}}>
            🤖 AI Assistant
          </div>
          <h2 style={{fontSize:"clamp(1.6rem,4vw,2.6rem)",fontWeight:900,color:"#222"}}>Ask Anything, Get Everything ✨</h2>
          <p style={{color:"#bbb",marginTop:8,fontSize:14}}>Scripts · Trends · Thumbnails · Platform tips — all in seconds!</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:24}}>
          {/* Chat */}
          <div style={{background:"#fff",borderRadius:28,border:"3px solid #ffd60a44",display:"flex",flexDirection:"column",height:580,overflow:"hidden",boxShadow:"0 12px 50px rgba(255,214,10,0.12),0 4px 20px rgba(255,107,107,0.08)"}}>
            <div style={{padding:"18px 22px",borderBottom:"2px solid #fffde7",background:"linear-gradient(135deg,#fffde7,#fff0f6)",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:48,height:48,borderRadius:16,background:"linear-gradient(135deg,#ff6b6b,#ffd60a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,animation:"heartbeat 2s ease infinite",boxShadow:"0 4px 16px rgba(255,107,107,0.35)"}}>🤖</div>
              <div>
                <div style={{fontWeight:900,fontSize:15,color:"#222"}}>Trend AI Assistant 🌟</div>
                <div style={{fontSize:12,color:"#aaa",display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"#63f5c0",animation:"pulse 1.2s infinite"}}/>
                  Online & Ready! · Powered by Claude
                </div>
              </div>
              <div style={{marginLeft:"auto",background:"linear-gradient(135deg,#fffde7,#fff0f6)",borderRadius:10,padding:"4px 12px",fontSize:11,color:"#ff9f1c",fontWeight:800,border:"1.5px solid #ffd60a44"}}>{messages.length} msgs 💬</div>
            </div>

            <div style={{flex:1,overflowY:"auto",padding:"18px",display:"flex",flexDirection:"column",gap:14}}>
              {messages.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"fadeUp 0.35s ease"}}>
                  <div style={{maxWidth:"86%",background:m.role==="user"?"linear-gradient(135deg,#ff6b6b,#ff9f1c,#ffd60a)":"linear-gradient(135deg,#fffde7,#fff0f6)",color:m.role==="user"?"#fff":"#333",padding:"13px 17px",borderRadius:20,fontSize:13,borderBottomRightRadius:m.role==="user"?4:20,borderBottomLeftRadius:m.role==="assistant"?4:20,boxShadow:m.role==="user"?"0 4px 20px rgba(255,107,107,0.3)":"0 4px 16px rgba(255,214,10,0.1)",border:m.role==="assistant"?"2px solid #ffd60a22":"none"}}>
                    {fmt(m.content)}
                  </div>
                </div>
              ))}
              {loading&&(
                <div style={{display:"flex",gap:7,padding:"14px 18px",background:"linear-gradient(135deg,#fffde7,#fff0f6)",borderRadius:20,width:"fit-content",border:"2px solid #ffd60a22"}}>
                  {[0,1,2].map(i=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:"linear-gradient(135deg,#ff6b6b,#ffd60a)",animation:"bounce 1.2s infinite",animationDelay:`${i*0.2}s`}}/>)}
                </div>
              )}
              <div ref={messagesEnd}/>
            </div>

            {/* Quick chips */}
            <div style={{padding:"10px 18px 0",display:"flex",gap:7,flexWrap:"wrap"}}>
              {["🏏 Cricket","🎵 Music scripts","💄 Beauty reels","💻 Tech ideas","😂 Comedy"].map(s=>(
                <button key={s} className="pill-btn" onClick={()=>sendMessage(s+" trends")} style={{background:"linear-gradient(135deg,#fffde7,#fff0f6)",border:"2px solid #ffd60a55",borderRadius:100,padding:"5px 13px",fontSize:11,fontWeight:800,color:"#ff9f1c",cursor:"pointer",fontFamily:"Poppins,sans-serif"}}>{s}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{padding:"12px 18px 16px",borderTop:"2px solid #fffde7",marginTop:8}}>
              <div style={{display:"flex",gap:10}}>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="✨ Ask trends, scripts, ideas..." style={{flex:1,border:"2.5px solid #ffd60a55",borderRadius:14,padding:"12px 16px",fontSize:13,outline:"none",fontFamily:"Poppins,sans-serif",background:"#fffdf5"}}/>
                <button className="send-btn" onClick={()=>sendMessage()} disabled={loading||!input.trim()} style={{background:"linear-gradient(135deg,#ff6b6b,#ffd60a)",border:"none",borderRadius:14,padding:"12px 20px",cursor:"pointer",fontSize:18,opacity:loading||!input.trim()?0.4:1,boxShadow:"0 4px 16px rgba(255,107,107,0.35)"}}>➤</button>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            {/* Image Gen */}
            <div style={{background:"#fff",borderRadius:28,border:"3px solid #ffd60a44",padding:22,boxShadow:"0 12px 50px rgba(255,214,10,0.1)"}}>
              <div style={{fontWeight:900,fontSize:15,marginBottom:4,color:"#222"}}>🎨 AI Thumbnail Maker</div>
              <div style={{fontSize:11,color:"#bc1888",background:"linear-gradient(135deg,#fff0ff,#fffde7)",borderRadius:100,padding:"3px 12px",display:"inline-block",fontWeight:800,marginBottom:14,border:"1.5px solid #bc188833"}}>✨ Powered by Gemini</div>
              <input value={imgPrompt} onChange={e=>setImgPrompt(e.target.value)} placeholder="e.g. Viral cricket IPL thumbnail..." style={{width:"100%",border:"2px solid #ffd60a44",borderRadius:12,padding:"9px 13px",fontSize:12,outline:"none",marginBottom:10,fontFamily:"Poppins,sans-serif",background:"#fffdf5"}}/>
              <button onClick={generateImage} disabled={imgLoading} style={{width:"100%",background:imgLoading?"#f5f5f5":"linear-gradient(135deg,#f09433,#e6683c,#bc1888)",border:"none",borderRadius:12,padding:11,color:imgLoading?"#bbb":"#fff",fontWeight:800,cursor:"pointer",fontSize:13,fontFamily:"Poppins,sans-serif",boxShadow:imgLoading?"none":"0 4px 16px rgba(240,148,51,0.35)"}}>
                {imgLoading?"⏳ Creating magic...":"✨ Generate Thumbnail!"}
              </button>
              <div style={{marginTop:12,borderRadius:16,minHeight:130,background:"linear-gradient(135deg,#fffde7,#fff0f6)",display:"flex",alignItems:"center",justifyContent:"center",border:"2.5px dashed #ffd60a55",overflow:"hidden"}}>
                {imgLoading?<div style={{textAlign:"center",color:"#ff9f1c"}}><div style={{fontSize:36,animation:"spin 1s linear infinite"}}>🎨</div><div style={{fontSize:12,marginTop:6,fontWeight:600}}>Creating magic... ✨</div></div>
                :genImg==="NO_KEY"?<div style={{textAlign:"center",color:"#ff9f1c",padding:16,fontSize:12,fontWeight:600}}>⚠️ Add Gemini API key<br/>in ⚙️ API Keys above</div>
                :genImg==="ERROR"?<div style={{textAlign:"center",color:"#ff6b6b",padding:16,fontSize:12,fontWeight:600}}>❌ Error. Check your<br/>Gemini API key</div>
                :genImg?<img src={genImg} alt="AI Thumbnail" style={{width:"100%",borderRadius:14}}/>
                :<div style={{textAlign:"center",color:"#ddd",fontSize:12}}><div style={{fontSize:36,animation:"waveFloat 2s ease-in-out infinite"}}>🖼️</div><div style={{marginTop:6,fontWeight:600}}>Your thumbnail here</div></div>}
              </div>
            </div>

            {/* Platforms */}
            <div style={{background:"#fff",borderRadius:28,border:"3px solid #ffd60a44",padding:22}}>
              <div style={{fontWeight:900,fontSize:15,marginBottom:16,color:"#222"}}>🎯 Top Platforms</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[{name:"YouTube",icon:"▶️",c:"#ff0000",tag:"Long-form videos"},{name:"Instagram",icon:"📸",c:"#bc1888",tag:"Reels & Stories"},{name:"TikTok",icon:"🎵",c:"#111",tag:"Short viral clips"},{name:"InVideo AI",icon:"🎞️",c:"#8338ec",tag:"AI video maker"},{name:"Canva AI",icon:"🎨",c:"#00c4cc",tag:"Thumbnails & designs"},{name:"Kling AI",icon:"🤖",c:"#ff6b6b",tag:"Image-to-video AI"}].map((p,i)=>(
                  <div key={p.name} style={{display:"flex",alignItems:"center",gap:12,background:`${p.c}09`,border:`2px solid ${p.c}33`,borderRadius:14,padding:"10px 14px",animation:`popIn 0.5s ease ${i*0.08}s both`,transition:"transform 0.2s"}}>
                    <span style={{fontSize:20,animation:"waveFloat 3s ease-in-out infinite",animationDelay:`${i*0.2}s`}}>{p.icon}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:"#222"}}>{p.name}</div>
                      <div style={{fontSize:11,color:"#bbb"}}>{p.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WAVE ── */}
      <div style={{background:"#fff",lineHeight:0}}>
        <svg viewBox="0 0 1200 80" style={{display:"block",width:"100%"}}>
          <path d="M0,40 C200,80 400,0 600,50 C800,90 1000,10 1200,40 L1200,80 L0,80 Z" fill="#fffde7"/>
        </svg>
      </div>

      {/* ── FOOTER ── */}
      <div style={{background:"linear-gradient(135deg,#ff6b6b,#ff9f1c,#ffd60a,#63f5c0,#4cc9f0,#a78bfa,#ff6b9d)",backgroundSize:"400%",animation:"gradShift 6s ease infinite",padding:"40px 20px",textAlign:"center",color:"#fff",position:"relative",overflow:"hidden"}}>
        {["🎉","✨","🌟","🎊","💫","🎈"].map((e,i)=>(
          <div key={i} style={{position:"absolute",fontSize:24,left:`${(i*17)%95}%`,bottom:0,animation:`float ${3+i*0.5}s ease-in-out infinite`,animationDelay:`${i*0.4}s`,opacity:0.3}}>{e}</div>
        ))}
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:28,fontWeight:900,marginBottom:6,textShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>CreatosGlob 🌐</div>
          <div style={{fontSize:15,opacity:0.9,marginBottom:4,fontWeight:600}}>Made with 💛 for Happy Content Creators!</div>
          <div style={{fontSize:13,opacity:0.7}}>creatosglob.com · Powered by Claude + Gemini AI ✨</div>
        </div>
      </div>
    </div>
  );
}