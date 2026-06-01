// @ts-nocheck
"use client";
import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { id:"cricket",  icon:"🏏", label:"Cricket",  accent:"#0EA5E9" },
  { id:"gaming",   icon:"🎮", label:"Gaming",   accent:"#8B5CF6" },
  { id:"music",    icon:"🎵", label:"Music",    accent:"#EC4899" },
  { id:"beauty",   icon:"💄", label:"Beauty",   accent:"#F97316" },
  { id:"tech",     icon:"💻", label:"Tech",     accent:"#3B82F6" },
  { id:"food",     icon:"🍕", label:"Food",     accent:"#EF4444" },
  { id:"fitness",  icon:"💪", label:"Fitness",  accent:"#10B981" },
  { id:"finance",  icon:"📈", label:"Finance",  accent:"#059669" },
  { id:"movies",   icon:"🎬", label:"Movies",   accent:"#DC2626" },
  { id:"travel",   icon:"✈️", label:"Travel",   accent:"#06B6D4" },
  { id:"fashion",  icon:"👗", label:"Fashion",  accent:"#A855F7" },
  { id:"comedy",   icon:"😂", label:"Comedy",   accent:"#F59E0B" },
];

const IG_TRENDS = [
  { tag:"#IPL2026",       views:"2.3B", cat:"Cricket",   accent:"#0EA5E9", emoji:"🏏" },
  { tag:"#AIArt",         views:"1.8B", cat:"Tech",      accent:"#8B5CF6", emoji:"🤖" },
  { tag:"#SummerVibes",   views:"4.1B", cat:"Lifestyle", accent:"#F97316", emoji:"☀️" },
  { tag:"#NightRoutine",  views:"890M", cat:"Beauty",    accent:"#EC4899", emoji:"✨" },
  { tag:"#FoodTok",       views:"3.2B", cat:"Food",      accent:"#EF4444", emoji:"🍕" },
  { tag:"#GymMotivation", views:"1.1B", cat:"Fitness",   accent:"#10B981", emoji:"💪" },
];

const IG_STORIES = [
  { name:"Cricket", emoji:"🏏", accent:"#0EA5E9" },
  { name:"Gaming",  emoji:"🎮", accent:"#8B5CF6" },
  { name:"Beauty",  emoji:"💄", accent:"#EC4899" },
  { name:"Food",    emoji:"🍕", accent:"#EF4444" },
  { name:"Travel",  emoji:"✈️", accent:"#06B6D4" },
  { name:"Fashion", emoji:"👗", accent:"#A855F7" },
  { name:"Fitness", emoji:"💪", accent:"#10B981" },
  { name:"Tech",    emoji:"💻", accent:"#3B82F6" },
];

const TICKER = ["🔥 IPL 2026 Finals","✨ Glass Skin Tutorial","💻 AI Tools Exploding","🏆 Olympics 2026","📱 iPhone 17 Leaks","🎬 Bollywood Blockbusters","🍕 Street Food Vlogs","✈️ Budget Travel Hacks","😂 Comedy Reels","🎵 Summer Hits"];
const HERO_WORDS = ["Content Creators","YouTubers","Instagrammers","TikTokers","Streamers"];

export default function CreatosGlob() {
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"Welcome to CreatosGlob ✦\n\nI'm your AI content strategist. Ask me anything:\n• **\"Top cricket trends right now\"**\n• **\"Write a YouTube script on AI\"**\n• **\"Instagram Reel ideas for Food\"**\n• **\"Viral thumbnail concepts for Gaming\"**"
  }]);
  const [input, setInput]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [imgLoading, setImgLoading]     = useState(false);
  const [genImg, setGenImg]             = useState(null);
  const [imgPrompt, setImgPrompt]       = useState("");
  const [wordIdx, setWordIdx]           = useState(0);
  const [scrollPct, setScrollPct]       = useState(0);
  const [activeTab, setActiveTab]       = useState("chat");
  const messagesEnd = useRef(null);

  useEffect(()=>{ window.scrollTo(0,0); },[]);
  useEffect(()=>{const t=setInterval(()=>setWordIdx(i=>(i+1)%HERO_WORDS.length),3000);return()=>clearInterval(t);},[]);
  useEffect(()=>{messagesEnd.current?.scrollIntoView({behavior:"smooth"});},[messages,loading]);
  useEffect(()=>{ window.scrollTo(0,0); },[]);
  useEffect(()=>{
    const fn=()=>{const e=document.documentElement;setScrollPct((e.scrollTop/(e.scrollHeight-e.clientHeight))*100);};
    window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);
  },[]);

  const sendMessage=async(text)=>{
    const msg=text||input.trim(); if(!msg) return;
    setInput(""); setActiveTab("chat");
    setMessages(p=>[...p,{role:"user",content:msg}]);
    setLoading(true);
    try{
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          system:`You are CreatosBot — a smart, friendly AI assistant on CreatosGlob.com for content creators. You have two modes:

1. CONTENT MODE (when asked about trends, scripts, niches, content ideas):
Always provide ALL of these sections:
🔥 TOP 5 CURRENT TRENDS — specific, real trending topics
📝 FULL READY-TO-USE SCRIPT — complete script with hook, body, CTA
#️⃣ HASHTAGS — 10-15 best hashtags to use
🖼️ THUMBNAIL IDEAS — 3 creative concepts
🎯 PLATFORM STRATEGY — where & when to post
🎬 FREE VIDEO TOOLS — always include these free platforms:
  • CapCut (free, best for Reels/TikTok editing)
  • InVideo AI (free tier, script to video)
  • Canva Video (free, templates + editing)
  • Runway ML (free credits, AI video effects)
  • Pika Labs (free, AI video generation)
  • Kling AI (free credits, image to video)
  • DaVinci Resolve (free, professional editing)
💡 PRO TIPS — 3 actionable growth tips

2. CONVERSATION MODE (when user asks questions like "will this go viral?", "what should I post today?", "is this a good idea?", "how do I grow faster?"):
Respond naturally and helpfully like a knowledgeable creator friend. Be encouraging, honest, and give real actionable advice. Keep it conversational with emojis.

IMPORTANT: Always be friendly, energetic and supportive. Main focus is content creation but answer ANY question the user asks. Never ignore a question.`,
          messages:[{role:"user",content:msg}]
        })
      });
      const data=await res.json();
      setMessages(p=>[...p,{role:"assistant",content:data.content?.[0]?.text||"Something went wrong, please try again."}]);
    }catch{setMessages(p=>[...p,{role:"assistant",content:"Connection error. Please try again."}]);}
    setLoading(false);
  };

  const downloadImage=async()=>{
    try{
      const response=await fetch(genImg);
      const blob=await response.blob();
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url; a.download="creatosglob-thumbnail.jpg";
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    }catch{ window.open(genImg,"_blank"); }
  };

  const generateImage=async()=>{
    const prompt=imgPrompt||"Viral YouTube thumbnail professional vibrant modern style";
    setImgLoading(true); setGenImg(null); setActiveTab("image");
    try{
      const res=await fetch("/api/image",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
      const data=await res.json();
      setGenImg(data.imageUrl?"img":data.imageUrl||"ERROR");
      if(data.imageUrl) setGenImg(data.imageUrl);
      else setGenImg("ERROR");
    }catch{setGenImg("ERROR");}
    setImgLoading(false);
  };

  const fmt=(text)=>text.split("\n").map((l,i)=>(
    <p key={i} style={{margin:"3px 0",lineHeight:1.7}} dangerouslySetInnerHTML={{__html:l.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")||"&nbsp;"}}/>
  ));

  const scrollTo=(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#F8F7FF",minHeight:"100vh",overflowX:"hidden",color:"#1a1a2e"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#c4b5fd;border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes wordFade{0%{opacity:0;transform:translateY(12px)}15%,85%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-12px)}}
        @keyframes floatSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px #8B5CF633}50%{box-shadow:0 0 40px #8B5CF655}}

        .cat-btn{transition:all 0.2s cubic-bezier(0.34,1.4,0.64,1)!important}
        .cat-btn:hover{transform:translateY(-6px) scale(1.04)!important}
        .ig-card{transition:all 0.2s ease!important;cursor:pointer}
        .ig-card:hover{transform:translateY(-4px)!important;box-shadow:0 16px 48px rgba(0,0,0,0.12)!important}
        .story-btn{transition:transform 0.2s ease!important;cursor:pointer;border:none;background:none}
        .story-btn:hover{transform:scale(1.1)!important}
        .send-btn:hover{opacity:0.85!important}
        .send-btn{transition:opacity 0.15s!important}
        .nav-link{transition:color 0.15s!important;text-decoration:none;color:#6b7280;font-weight:500;font-size:14px;cursor:pointer}
        .nav-link:hover{color:#1a1a2e!important}
        .pill:hover{background:#1a1a2e!important;color:white!important}
        .pill{transition:all 0.15s!important;cursor:pointer}
        .tab-btn{transition:all 0.2s!important;cursor:pointer;border:none}
        .tab-btn:hover{background:#f3f0ff!important}

        @media(max-width:768px){
          .hero-grid{flex-direction:column!important}
          .chat-grid{grid-template-columns:1fr!important}
          .cat-grid{grid-template-columns:repeat(3,1fr)!important}
          .ig-grid{grid-template-columns:1fr!important}
          .tips-grid{grid-template-columns:repeat(2,1fr)!important}
          .stat-row{gap:24px!important}
          .header-nav{display:none!important}
          .hero-title{font-size:clamp(2rem,8vw,3rem)!important}
          .hero-sub{font-size:15px!important}
          .section-pad{padding:48px 16px!important}
          .chat-height{height:70vh!important;min-height:500px!important}
          .hide-mobile{display:none!important}
          .ticker-text{font-size:12px!important}
        }
      `}</style>

      {/* SCROLL PROGRESS */}
      <div style={{position:"fixed",top:0,left:0,zIndex:9999,height:3,width:`${scrollPct}%`,background:"linear-gradient(90deg,#8B5CF6,#EC4899,#F97316)",transition:"width 0.1s ease"}}/>

      {/* HEADER */}
      <header style={{padding:"0 32px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(248,247,255,0.9)",backdropFilter:"blur(16px)",borderBottom:"1px solid #ede9fe",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#8B5CF6,#EC4899)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:"0 4px 12px rgba(139,92,246,0.3)"}}>✦</div>
          <div>
            <span style={{fontWeight:700,fontSize:18,color:"#1a1a2e",letterSpacing:"-0.3px"}}>Creatos</span>
            <span style={{fontWeight:700,fontSize:18,background:"linear-gradient(135deg,#8B5CF6,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"-0.3px"}}>Glob</span>
          </div>
        </div>
        <nav className="header-nav" style={{display:"flex",gap:32,alignItems:"center"}}>
          <span className="nav-link" onClick={()=>scrollTo("categories-section")}>Niches</span>
          <span className="nav-link" onClick={()=>scrollTo("ig-section")}>Instagram</span>
          <span className="nav-link" onClick={()=>scrollTo("chat-section")}>AI Tools</span>
        </nav>
        <button onClick={()=>scrollTo("chat-section")} style={{background:"#1a1a2e",color:"white",border:"none",padding:"9px 20px",borderRadius:100,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans,sans-serif",letterSpacing:"-0.2px"}}>
          Try AI Free →
        </button>
      </header>

      {/* TICKER */}
      <div style={{background:"#1a1a2e",padding:"9px 0",overflow:"hidden"}}>
        <div style={{display:"flex",animation:"ticker 30s linear infinite",whiteSpace:"nowrap"}}>
          {[...TICKER,...TICKER,...TICKER,...TICKER].map((t,i)=>(
            <span key={i} className="ticker-text" style={{color:"#a78bfa",fontSize:12,fontWeight:500,marginRight:48,flexShrink:0,letterSpacing:"0.5px",textTransform:"uppercase"}}>
              {t} <span style={{color:"#4a4a6a",margin:"0 24px 0 0"}}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{padding:"88px 32px 80px",maxWidth:1200,margin:"0 auto",position:"relative"}}>
        {/* Decorative blobs */}
        <div style={{position:"absolute",top:-40,right:-60,width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-40,left:-60,width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(236,72,153,0.07) 0%,transparent 70%)",pointerEvents:"none"}}/>

        <div style={{textAlign:"center",position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"white",border:"1px solid #ede9fe",borderRadius:100,padding:"8px 18px",fontSize:12,fontWeight:600,color:"#8B5CF6",marginBottom:32,boxShadow:"0 2px 12px rgba(139,92,246,0.1)",letterSpacing:"0.5px",textTransform:"uppercase"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#8B5CF6",animation:"pulse 2s infinite",display:"inline-block"}}/>
            AI-Powered Trend Intelligence
          </div>

          <h1 className="hero-title" style={{fontSize:"clamp(2.4rem,5vw,4.2rem)",fontFamily:"Playfair Display,serif",fontWeight:900,lineHeight:1.08,marginBottom:16,color:"#1a1a2e",letterSpacing:"-1px"}}>
            The Creative Edge<br/>
            <span style={{position:"relative",display:"inline-block"}}>
              for{" "}
              <span style={{background:"linear-gradient(135deg,#8B5CF6,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"wordFade 3s ease infinite"}}>
                {HERO_WORDS[wordIdx]}
              </span>
            </span>
          </h1>

          <p className="hero-sub" style={{fontSize:17,color:"#6b7280",maxWidth:520,margin:"0 auto 40px",lineHeight:1.75,fontWeight:400}}>
            Discover what's viral before it peaks. Get AI-written scripts, stunning thumbnails, and data-driven strategies — all in one place.
          </p>

          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:64}}>
            <button onClick={()=>scrollTo("chat-section")} style={{background:"linear-gradient(135deg,#8B5CF6,#7C3AED)",color:"white",border:"none",padding:"14px 32px",borderRadius:100,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans,sans-serif",boxShadow:"0 8px 24px rgba(139,92,246,0.35)",letterSpacing:"-0.2px"}}>
              Start for Free ✦
            </button>
            <button onClick={()=>scrollTo("ig-section")} style={{background:"white",border:"1.5px solid #e5e7eb",color:"#1a1a2e",padding:"14px 32px",borderRadius:100,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans,sans-serif",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              Instagram Trends →
            </button>
          </div>

          <div className="stat-row" style={{display:"flex",gap:48,justifyContent:"center",flexWrap:"wrap"}}>
            {[["10K+","Creators"],["50K+","Daily Trends"],["100%","AI Powered"],["Free","To Start"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center",animation:"fadeUp 0.6s ease both"}}>
                <div style={{fontSize:22,fontWeight:700,color:"#1a1a2e",fontFamily:"Playfair Display,serif"}}>{n}</div>
                <div style={{fontSize:12,color:"#9ca3af",fontWeight:500,letterSpacing:"0.5px",textTransform:"uppercase",marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,#ede9fe,transparent)",maxWidth:1200,margin:"0 auto"}}/>

      {/* CATEGORIES */}
      <section id="categories-section" className="section-pad" style={{padding:"72px 32px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{marginBottom:40}}>
          <div style={{fontSize:11,fontWeight:700,color:"#8B5CF6",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>Content Niches</div>
          <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontFamily:"Playfair Display,serif",fontWeight:700,color:"#1a1a2e",letterSpacing:"-0.5px"}}>What do you create?</h2>
          <p style={{color:"#9ca3af",marginTop:8,fontSize:14}}>Select a niche to get AI-powered trends and full scripts instantly</p>
        </div>
        <div className="cat-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12}}>
          {CATEGORIES.map((cat,i)=>(
            <button key={cat.id} className="cat-btn"
              onClick={()=>{sendMessage(`Give me top 5 viral trending content ideas, complete YouTube script, thumbnail concepts and platform tips for the ${cat.label} niche`);scrollTo("chat-section");}}
              style={{background:"white",border:`1.5px solid #f3f4f6`,borderRadius:16,padding:"20px 12px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:10,boxShadow:"0 2px 8px rgba(0,0,0,0.04)",animationDelay:`${i*0.04}s`,animation:"scaleIn 0.5s ease both"}}>
              <div style={{width:48,height:48,borderRadius:14,background:`${cat.accent}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{cat.icon}</div>
              <span style={{fontSize:13,fontWeight:600,color:"#374151",fontFamily:"DM Sans,sans-serif"}}>{cat.label}</span>
              <span style={{fontSize:11,color:cat.accent,fontWeight:500}}>Explore →</span>
            </button>
          ))}
        </div>
      </section>

      <div style={{height:1,background:"linear-gradient(90deg,transparent,#ede9fe,transparent)",maxWidth:1200,margin:"0 auto"}}/>

      {/* INSTAGRAM */}
      <section id="ig-section" className="section-pad" style={{padding:"72px 32px",background:"#fdfcff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{marginBottom:40,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"#EC4899",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>Instagram</div>
              <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontFamily:"Playfair Display,serif",fontWeight:700,color:"#1a1a2e",letterSpacing:"-0.5px"}}>What's trending right now</h2>
              <p style={{color:"#9ca3af",marginTop:8,fontSize:14}}>Click any trend or story for AI-generated scripts & strategies</p>
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#f09433,#bc1888)",borderRadius:100,padding:"8px 18px"}}>
              <span style={{color:"white",fontWeight:700,fontSize:13}}>📸 Live Trends</span>
            </div>
          </div>

          {/* Story circles */}
          <div style={{display:"flex",gap:20,overflowX:"auto",paddingBottom:16,marginBottom:40,WebkitOverflowScrolling:"touch"}}>
            {IG_STORIES.map((s,i)=>(
              <button key={s.name} className="story-btn" onClick={()=>{sendMessage(`Give me top viral Instagram Reels ideas, trending hashtags, hook lines, and growth tips for ${s.name} niche in 2026`);scrollTo("chat-section");}}>
                <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                  <div style={{padding:2.5,borderRadius:"50%",background:`linear-gradient(45deg,${s.accent},#f09433)`,boxShadow:`0 4px 16px ${s.accent}33`}}>
                    <div style={{width:60,height:60,borderRadius:"50%",background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{s.emoji}</div>
                  </div>
                  <span style={{fontSize:11,fontWeight:600,color:"#374151",whiteSpace:"nowrap"}}>{s.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Trend cards */}
          <div className="ig-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
            {IG_TRENDS.map((t)=>(
              <div key={t.tag} className="ig-card"
                onClick={()=>{sendMessage(`Create complete viral Instagram Reel script, caption, hashtag set and posting strategy for ${t.tag} in ${t.cat} niche`);scrollTo("chat-section");}}
                style={{background:"white",borderRadius:20,padding:20,border:"1.5px solid #f3f4f6",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:40,height:40,borderRadius:12,background:`${t.accent}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{t.emoji}</div>
                    <div>
                      <div style={{fontWeight:700,color:t.accent,fontSize:15}}>{t.tag}</div>
                      <div style={{fontSize:12,color:"#9ca3af"}}>{t.cat}</div>
                    </div>
                  </div>
                  <div style={{background:"#fef3c7",borderRadius:100,padding:"4px 10px",fontSize:11,color:"#92400e",fontWeight:600}}>🔥 Hot</div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#fafafa",borderRadius:12}}>
                  <span style={{fontSize:12,color:"#6b7280",fontWeight:500}}>👁 {t.views} views</span>
                  <span style={{fontSize:12,color:t.accent,fontWeight:600}}>Get AI Script →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div style={{marginTop:32,background:"white",borderRadius:24,padding:28,border:"1.5px solid #ede9fe"}}>
            <h3 style={{fontFamily:"Playfair Display,serif",fontWeight:700,fontSize:18,marginBottom:20,color:"#1a1a2e"}}>Instagram Growth Playbook 2026</h3>
            <div className="tips-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14}}>
              {[["⏰","Post Timing","6–9 PM = 3× more reach"],["📹","Reels First","2× reach over photos"],["#️⃣","5–8 Hashtags","Niche tags beat broad ones"],["🔁","4–5 Reels/week","Consistency beats virality"],["🪝","2-Second Hook","Opens decide everything"],["🎵","Trending Audio","5× reach boost instantly"]].map(([icon,title,tip])=>(
                <div key={title} style={{padding:16,background:"#fafafa",borderRadius:14,border:"1px solid #f3f4f6"}}>
                  <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
                  <div style={{fontWeight:700,fontSize:13,color:"#1a1a2e",marginBottom:4}}>{title}</div>
                  <div style={{fontSize:12,color:"#9ca3af",lineHeight:1.5}}>{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{height:1,background:"linear-gradient(90deg,transparent,#ede9fe,transparent)",maxWidth:1200,margin:"0 auto"}}/>

      {/* AI TOOLS */}
      <section id="chat-section" className="section-pad" style={{padding:"72px 32px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{marginBottom:40}}>
          <div style={{fontSize:11,fontWeight:700,color:"#8B5CF6",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>AI Tools</div>
          <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontFamily:"Playfair Display,serif",fontWeight:700,color:"#1a1a2e",letterSpacing:"-0.5px"}}>Your AI content studio</h2>
          <p style={{color:"#9ca3af",marginTop:8,fontSize:14}}>Scripts · Trends · Thumbnails · Strategies — powered by AI</p>
        </div>

        <div className="chat-grid" style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:20}}>

          {/* CHAT */}
          <div className="chat-height" style={{background:"white",borderRadius:24,border:"1.5px solid #ede9fe",display:"flex",flexDirection:"column",height:580,overflow:"hidden",boxShadow:"0 4px 24px rgba(139,92,246,0.07)"}}>
            {/* Chat header */}
            <div style={{padding:"16px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#8B5CF6,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:"0 4px 12px rgba(139,92,246,0.3)"}}>✦</div>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#1a1a2e"}}>Trend AI Assistant</div>
                <div style={{fontSize:12,color:"#10b981",display:"flex",alignItems:"center",gap:4,fontWeight:500}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:"#10b981",display:"inline-block"}}/>
                  Online · Powered by Groq AI
                </div>
              </div>
              <div style={{marginLeft:"auto",fontSize:12,color:"#9ca3af",fontWeight:500}}>{messages.length} messages</div>
            </div>

            {/* Messages */}
            <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12}}>
              {messages.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"fadeUp 0.3s ease"}}>
                  <div style={{maxWidth:"84%",background:m.role==="user"?"linear-gradient(135deg,#8B5CF6,#7C3AED)":"#F9FAFB",color:m.role==="user"?"white":"#374151",padding:"12px 16px",borderRadius:16,fontSize:13,lineHeight:1.65,borderBottomRightRadius:m.role==="user"?4:16,borderBottomLeftRadius:m.role==="assistant"?4:16,boxShadow:m.role==="user"?"0 4px 16px rgba(139,92,246,0.25)":"0 1px 4px rgba(0,0,0,0.05)",border:m.role==="assistant"?"1px solid #f3f4f6":"none"}}>
                    {fmt(m.content)}
                  </div>
                </div>
              ))}
              {loading&&<div style={{display:"flex",gap:5,padding:"12px 16px",background:"#F9FAFB",borderRadius:16,width:"fit-content",border:"1px solid #f3f4f6"}}>
                {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#8B5CF6",animation:"pulse 1.2s infinite",animationDelay:`${i*0.2}s`}}/>)}
              </div>}
              <div ref={messagesEnd}/>
            </div>

            {/* Quick chips */}
            <div style={{padding:"8px 16px",display:"flex",gap:6,flexWrap:"wrap",borderTop:"1px solid #fafafa"}}>
              {["🏏 Cricket trends","💡 Will this go viral?","💄 Beauty script","🎬 Free video tools","🚀 Grow faster"].map(s=>(
                <button key={s} className="pill" onClick={()=>sendMessage(s)} style={{background:"#f3f4f6",border:"none",borderRadius:100,padding:"5px 12px",fontSize:11,fontWeight:600,color:"#374151",fontFamily:"DM Sans,sans-serif"}}>{s}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{padding:"12px 16px 16px",borderTop:"1px solid #f3f4f6"}}>
              <div style={{display:"flex",gap:10,background:"#f9fafb",borderRadius:14,padding:"4px 4px 4px 16px",border:"1.5px solid #ede9fe"}}>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask about trends, scripts, ideas..." style={{flex:1,border:"none",background:"transparent",fontSize:13,outline:"none",fontFamily:"DM Sans,sans-serif",color:"#374151",padding:"8px 0"}}/>
                <button className="send-btn" onClick={()=>sendMessage()} disabled={loading||!input.trim()} style={{background:"linear-gradient(135deg,#8B5CF6,#7C3AED)",border:"none",borderRadius:10,padding:"10px 18px",cursor:"pointer",color:"white",fontSize:16,opacity:loading||!input.trim()?0.4:1}}>➤</button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>

            {/* Tabs */}
            <div style={{display:"flex",background:"#f3f4f6",borderRadius:12,padding:3}}>
              {[["image","🎨 Thumbnails"],["platforms","🎯 Platforms"]].map(([tab,label])=>(
                <button key={tab} className="tab-btn" onClick={()=>setActiveTab(tab)} style={{flex:1,padding:"9px 8px",borderRadius:10,fontSize:12,fontWeight:600,color:activeTab===tab?"#8B5CF6":"#9ca3af",background:activeTab===tab?"white":"transparent",boxShadow:activeTab===tab?"0 1px 4px rgba(0,0,0,0.08)":"none",fontFamily:"DM Sans,sans-serif"}}>{label}</button>
              ))}
            </div>

            {/* Image Generator */}
            {activeTab==="image"&&(
              <div style={{background:"white",borderRadius:20,border:"1.5px solid #ede9fe",padding:20,boxShadow:"0 4px 24px rgba(139,92,246,0.07)"}}>
                <div style={{fontWeight:700,fontSize:14,color:"#1a1a2e",marginBottom:4}}>AI Thumbnail Maker</div>
                <div style={{fontSize:11,color:"#10b981",fontWeight:600,marginBottom:14,display:"flex",alignItems:"center",gap:4}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:"#10b981",display:"inline-block"}}/>Free · No API key needed
                </div>
                <input value={imgPrompt} onChange={e=>setImgPrompt(e.target.value)} placeholder="e.g. IPL cricket viral thumbnail..." style={{width:"100%",border:"1.5px solid #ede9fe",borderRadius:10,padding:"9px 12px",fontSize:12,outline:"none",marginBottom:10,fontFamily:"DM Sans,sans-serif",background:"#fafafa",color:"#374151"}}/>
                <button onClick={generateImage} disabled={imgLoading} style={{width:"100%",background:imgLoading?"#f3f4f6":"linear-gradient(135deg,#8B5CF6,#EC4899)",border:"none",borderRadius:10,padding:11,color:imgLoading?"#9ca3af":"white",fontWeight:700,cursor:"pointer",fontSize:13,fontFamily:"DM Sans,sans-serif"}}>
                  {imgLoading?"Creating thumbnail...":"Generate Thumbnail ✦"}
                </button>
                <div style={{marginTop:12,borderRadius:14,minHeight:120,background:"#fafafa",display:"flex",alignItems:"center",justifyContent:"center",border:"1.5px dashed #ede9fe",overflow:"hidden",position:"relative"}}>
                  {imgLoading?<div style={{textAlign:"center",color:"#8B5CF6",padding:20}}><div style={{fontSize:28,animation:"spin 1s linear infinite",display:"inline-block"}}>✦</div><div style={{fontSize:12,marginTop:8,fontWeight:500}}>Creating your thumbnail...</div></div>
                  :genImg==="ERROR"?<div style={{textAlign:"center",color:"#ef4444",padding:16,fontSize:12,fontWeight:500}}>Error generating. Please try again.</div>
                  :genImg?<>
                    <img src={genImg} alt="AI Thumbnail" style={{width:"100%",borderRadius:14}}/>
                    <button onClick={downloadImage} style={{position:"absolute",bottom:10,right:10,background:"linear-gradient(135deg,#8B5CF6,#EC4899)",border:"none",borderRadius:100,padding:"8px 16px",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",boxShadow:"0 4px 12px rgba(139,92,246,0.4)",display:"flex",alignItems:"center",gap:6}}>
                      ⬇️ Download
                    </button>
                  </>
                  :<div style={{textAlign:"center",color:"#d1d5db",fontSize:12,padding:20}}><div style={{fontSize:32,marginBottom:8}}>🖼</div>Thumbnail appears here</div>}
                </div>
              </div>
            )}

            {/* Platforms */}
            {activeTab==="platforms"&&(
              <div style={{background:"white",borderRadius:20,border:"1.5px solid #ede9fe",padding:20,boxShadow:"0 4px 24px rgba(139,92,246,0.07)"}}>
                <div style={{fontWeight:700,fontSize:14,color:"#1a1a2e",marginBottom:16}}>Top Platforms for Creators</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {[{name:"YouTube",icon:"▶️",c:"#FF0000",tag:"Long-form & Shorts"},{name:"Instagram",icon:"📸",c:"#E1306C",tag:"Reels & Stories"},{name:"TikTok",icon:"🎵",c:"#000000",tag:"Viral short videos"},{name:"InVideo AI",icon:"🎞️",c:"#8B5CF6",tag:"AI video creation"},{name:"Canva AI",icon:"🎨",c:"#00C4CC",tag:"Thumbnails & graphics"},{name:"Kling AI",icon:"🤖",c:"#F97316",tag:"Image to video AI"}].map(p=>(
                    <div key={p.name} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:12,border:"1px solid #f3f4f6",background:"#fafafa"}}>
                      <span style={{fontSize:18}}>{p.icon}</span>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:"#1a1a2e"}}>{p.name}</div>
                        <div style={{fontSize:11,color:"#9ca3af"}}>{p.tag}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active tab = chat — show thumbnail panel collapsed */}
            {activeTab==="chat"&&(
              <div style={{background:"white",borderRadius:20,border:"1.5px solid #ede9fe",padding:20}}>
                <div style={{fontWeight:700,fontSize:14,color:"#1a1a2e",marginBottom:12}}>Quick Actions</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[["🎨","Generate Thumbnail","Create AI thumbnail","image"],["🎯","See Platforms","Best platforms for you","platforms"]].map(([icon,title,sub,tab])=>(
                    <button key={title} onClick={()=>setActiveTab(tab)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,border:"1.5px solid #ede9fe",background:"#fafafa",cursor:"pointer",textAlign:"left",fontFamily:"DM Sans,sans-serif",transition:"all 0.15s"}}>
                      <span style={{fontSize:20}}>{icon}</span>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:"#1a1a2e"}}>{title}</div>
                        <div style={{fontSize:11,color:"#9ca3af"}}>{sub}</div>
                      </div>
                      <span style={{marginLeft:"auto",color:"#8B5CF6",fontSize:14}}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#1a1a2e",padding:"40px 32px",marginTop:0}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#8B5CF6,#EC4899)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✦</div>
              <span style={{fontWeight:700,fontSize:16,color:"white"}}>CreatosGlob</span>
            </div>
            <p style={{fontSize:13,color:"#6b7280"}}>AI-powered trend intelligence for content creators</p>
          </div>
          <div style={{fontSize:13,color:"#4b5563",textAlign:"right"}}>
            <div style={{color:"#9ca3af"}}>creatorsglob.com</div>
            <div style={{marginTop:4,color:"#6b7280"}}>Powered by Groq AI + Pollinations ✦</div>
          </div>
        </div>
      </footer>
    </div>
  );
}