import { useState, useRef, useCallback } from "react";

// ─── WEATHER ICONS ─────────────────────────────────────────────
function WeatherIcon({ condition, size = 36 }) {
  const c = (condition || "").toLowerCase();
  const isThunder = c.includes("thunder") || c.includes("storm");
  const isSnowy = c.includes("snow") || c.includes("blizzard") || c.includes("sleet");
  const isRainy = c.includes("rain") || c.includes("shower") || c.includes("drizzle");
  const isPartly = c.includes("partly") || c.includes("partial") || c.includes("cloud") || c.includes("overcast");
  const isSunny = c.includes("sunny") || c.includes("clear") || c.includes("sun");
  const isWindy = c.includes("wind") || c.includes("breezy");
  const s = size, cx = s/2, cy = s/2;
  const sunC = "#F59E0B", cloudC = "#94A3B8", rainC = "#60A5FA", snowC = "#BAE6FD";

  if (isThunder) return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
    <ellipse cx={cx} cy={cy-3} rx={s*.32} ry={s*.18} fill={cloudC}/>
    <ellipse cx={cx-s*.1} cy={cy-1} rx={s*.22} ry={s*.15} fill={cloudC}/>
    <ellipse cx={cx+s*.08} cy={cy} rx={s*.28} ry={s*.16} fill="#718096"/>
    {[0,1,2].map(i=><line key={i} x1={cx-4+i*4} y1={cy+6} x2={cx-6+i*4} y2={cy+13} stroke={rainC} strokeWidth="1.5" strokeLinecap="round"/>)}
    <polygon points={`${cx+2},${cy+2} ${cx-2},${cy+8} ${cx+1},${cy+8} ${cx-3},${cy+15} ${cx+4},${cy+7} ${cx+1},${cy+7}`} fill="#FBBF24"/>
  </svg>;

  if (isSnowy) return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
    <circle cx={cx+s*.1} cy={cy-s*.15} r={s*.13} fill={sunC} opacity=".8"/>
    <ellipse cx={cx} cy={cy-1} rx={s*.32} ry={s*.17} fill={cloudC}/>
    <ellipse cx={cx-s*.08} cy={cy+1} rx={s*.22} ry={s*.14} fill={cloudC}/>
    {[-s*.18,-s*.06,s*.06,s*.18].map((dx,i)=><circle key={i} cx={cx+dx} cy={cy+s*.32} r={2} fill={snowC}/>)}
  </svg>;

  if (isRainy && isPartly) return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
    <circle cx={cx+s*.12} cy={cy-s*.2} r={s*.14} fill={sunC} opacity=".9"/>
    <ellipse cx={cx-s*.02} cy={cy-2} rx={s*.32} ry={s*.17} fill={cloudC}/>
    <ellipse cx={cx-s*.1} cy={cy+1} rx={s*.22} ry={s*.14} fill={cloudC}/>
    {[-s*.15,-s*.03,s*.09].map((dx,i)=><line key={i} x1={cx+dx} y1={cy+s*.2} x2={cx+dx-3} y2={cy+s*.36} stroke={rainC} strokeWidth="1.5" strokeLinecap="round"/>)}
  </svg>;

  if (isRainy) return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
    <ellipse cx={cx} cy={cy-4} rx={s*.34} ry={s*.19} fill={cloudC}/>
    <ellipse cx={cx-s*.1} cy={cy-1} rx={s*.24} ry={s*.16} fill="#718096"/>
    <ellipse cx={cx+s*.08} cy={cy-2} rx={s*.28} ry={s*.17} fill="#718096"/>
    {[-s*.18,-s*.06,s*.06,s*.18].map((dx,i)=><line key={i} x1={cx+dx} y1={cy+s*.14} x2={cx+dx-4} y2={cy+s*.33} stroke={rainC} strokeWidth="1.8" strokeLinecap="round"/>)}
  </svg>;

  if (isPartly) return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
    <circle cx={cx-s*.08} cy={cy-s*.08} r={s*.2} fill={sunC}/>
    {[0,45,90,135,180,225,270,315].map((a,i)=>{const r1=s*.24,r2=s*.3,rad=a*Math.PI/180;return <line key={i} x1={cx-s*.08+Math.cos(rad)*r1} y1={cy-s*.08+Math.sin(rad)*r1} x2={cx-s*.08+Math.cos(rad)*r2} y2={cy-s*.08+Math.sin(rad)*r2} stroke={sunC} strokeWidth="2" strokeLinecap="round"/>;})}
    <ellipse cx={cx+s*.08} cy={cy+s*.04} rx={s*.3} ry={s*.17} fill={cloudC}/>
    <ellipse cx={cx-s*.02} cy={cy+s*.06} rx={s*.22} ry={s*.14} fill={cloudC}/>
  </svg>;

  if (isSunny) return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
    <circle cx={cx} cy={cy} r={s*.22} fill={sunC}/>
    {[0,45,90,135,180,225,270,315].map((a,i)=>{const r1=s*.28,r2=s*.37,rad=a*Math.PI/180;return <line key={i} x1={cx+Math.cos(rad)*r1} y1={cy+Math.sin(rad)*r1} x2={cx+Math.cos(rad)*r2} y2={cy+Math.sin(rad)*r2} stroke={sunC} strokeWidth="2.5" strokeLinecap="round"/>;})}
  </svg>;

  if (isWindy) return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
    <ellipse cx={cx} cy={cy-2} rx={s*.3} ry={s*.16} fill={cloudC}/>
    <ellipse cx={cx-s*.08} cy={cy+2} rx={s*.22} ry={s*.13} fill={cloudC}/>
    {[0,1,2].map(i=><path key={i} d={`M${cx-s*.3} ${cy+s*.18+i*5} Q${cx} ${cy+s*.1+i*5} ${cx+s*.28} ${cy+s*.18+i*5}`} fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>)}
  </svg>;

  return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
    <circle cx={cx-s*.06} cy={cy-s*.06} r={s*.18} fill={sunC}/>
    <ellipse cx={cx+s*.06} cy={cy+s*.04} rx={s*.28} ry={s*.16} fill={cloudC}/>
    <ellipse cx={cx-s*.04} cy={cy+s*.07} rx={s*.2} ry={s*.13} fill={cloudC}/>
  </svg>;
}

function parseForecastLine(line) {
  const lo = line.toLowerCase();
  let condition = "partly cloudy";
  if (lo.includes("thunder")||lo.includes("storm")) condition="thunderstorm";
  else if (lo.includes("snow")||lo.includes("blizzard")) condition="snowy";
  else if ((lo.includes("rain")||lo.includes("shower"))&&lo.includes("partly")) condition="partly rainy";
  else if (lo.includes("rain")||lo.includes("shower")||lo.includes("drizzle")) condition="rainy";
  else if (lo.includes("partly")||lo.includes("cloud")) condition="partly cloudy";
  else if (lo.includes("clear")||lo.includes("sunny")||lo.includes("sun")) condition="sunny";
  else if (lo.includes("wind")||lo.includes("breezy")) condition="windy";
  const temps = line.match(/-?\d+/g)||[];
  const high = temps[0]?parseInt(temps[0]):null;
  const low = temps[1]?parseInt(temps[1]):null;
  const dayMatch = line.match(/Day\s*(\d+)/i);
  const dateMatch = line.match(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i);
  const dayLabel = dateMatch?dateMatch[0].slice(0,3):(dayMatch?`D${dayMatch[1]}`:"");
  return { condition, high, low, dayLabel };
}

function WeatherCard({ weatherData, hasBigSwing }) {
  const days = (weatherData.forecastLines||[]).slice(0,7).map(parseForecastLine);
  return (
    <div style={{ background:"var(--color-background-primary)", borderRadius:"16px", marginBottom:"10px", overflow:"hidden", border:"0.5px solid var(--color-border-tertiary)" }}>
      <div style={{ padding:"12px 16px 10px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
        <span style={{ fontSize:"12px", fontWeight:700, color:"#4285f4", letterSpacing:"0.8px", textTransform:"uppercase" }}>Weather Forecast</span>
        <div style={{ display:"flex", gap:"7px" }}>
          {weatherData.googleUrl&&<a href={weatherData.googleUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"11px", fontWeight:700, color:"white", background:"#4285f4", padding:"3px 9px", borderRadius:"7px", textDecoration:"none" }}>G Google</a>}
          {weatherData.appleUrl&&<a href={weatherData.appleUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"11px", fontWeight:700, color:"var(--color-text-primary)", background:"var(--color-background-secondary)", padding:"3px 9px", borderRadius:"7px", textDecoration:"none", border:"0.5px solid var(--color-border-secondary)" }}>Weather.com</a>}
        </div>
      </div>
      {days.length>0?(
        <div style={{ display:"flex", overflowX:"auto", padding:"12px 8px", gap:"4px" }}>
          {days.map((d,i)=>(
            <div key={i} style={{ flex:"0 0 auto", width:"72px", display:"flex", flexDirection:"column", alignItems:"center", padding:"10px 6px", borderRadius:"12px", background:i===0?"var(--color-background-info)":"var(--color-background-secondary)", gap:"5px" }}>
              <span style={{ fontSize:"11px", fontWeight:700, color:i===0?"var(--color-text-info)":"var(--color-text-secondary)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{d.dayLabel||`D${i+1}`}</span>
              <WeatherIcon condition={d.condition} size={34}/>
              {d.high!==null&&<div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1px" }}>
                <span style={{ fontSize:"13px", fontWeight:700, color:"var(--color-text-primary)", lineHeight:1 }}>{d.high}°</span>
                {d.low!==null&&<span style={{ fontSize:"11px", color:"var(--color-text-secondary)", lineHeight:1 }}>{d.low}°</span>}
              </div>}
            </div>
          ))}
        </div>
      ):(
        <div style={{ padding:"14px 16px" }}>
          <div style={{ fontSize:"13px", color:"var(--color-text-secondary)", lineHeight:1.65 }}>{weatherData.summary}</div>
        </div>
      )}
      {hasBigSwing&&<div style={{ margin:"0 12px 12px", background:"var(--color-background-warning)", borderRadius:"10px", padding:"8px 12px", fontSize:"12px", color:"var(--color-text-warning)" }}>
        Big temperature swing — days ~{weatherData.dayHigh}°C, nights ~{weatherData.nightLow}°C. Pack layers.
      </div>}
      {weatherData.summary&&days.length>0&&<div style={{ padding:"0 16px 12px", paddingTop:"10px", fontSize:"12px", color:"var(--color-text-secondary)", lineHeight:1.6, borderTop:"0.5px solid var(--color-border-tertiary)" }}>{weatherData.summary}</div>}
    </div>
  );
}

// ─── CALENDAR RANGE PICKER ─────────────────────────────────────
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function toStr(d) { return d instanceof Date ? d.toISOString().slice(0,10) : null; }
function fromStr(s) { return s ? new Date(s + "T00:00:00") : null; }
function sameDay(a, b) { return a && b && toStr(a) === toStr(b); }

function CalendarPicker({ startDate, endDate, onChange }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const initDate = startDate ? fromStr(startDate) : today;
  const [calYear, setCalYear] = useState(initDate.getFullYear());
  const [calMonth, setCalMonth] = useState(initDate.getMonth());
  const [hovered, setHovered] = useState(null);
  // selecting: null = nothing selected yet, "end" = start chosen waiting for end
  const [selecting, setSelecting] = useState(startDate ? (endDate ? null : "end") : null);

  const start = fromStr(startDate);
  const end = fromStr(endDate);

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const cells = [];
  for (let i=0; i<firstDay; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(new Date(calYear, calMonth, d));

  function prevMonth() {
    if (calMonth===0) { setCalMonth(11); setCalYear(y=>y-1); }
    else setCalMonth(m=>m-1);
  }
  function nextMonth() {
    if (calMonth===11) { setCalMonth(0); setCalYear(y=>y+1); }
    else setCalMonth(m=>m+1);
  }

  function handleClick(d) {
    if (!d || d < today) return;
    if (selecting === null || selecting === null) {
      // First click always sets departure
      onChange({ startDate: toStr(d), endDate: "" });
      setSelecting("end");
      setHovered(null);
    } else {
      // Second click sets return (or swaps if before start)
      if (start && d < start) {
        onChange({ startDate: toStr(d), endDate: toStr(start) });
      } else if (start && sameDay(d, start)) {
        // clicking same day = clear and restart
        onChange({ startDate: toStr(d), endDate: "" });
        setSelecting("end");
        return;
      } else {
        onChange({ startDate: toStr(start), endDate: toStr(d) });
      }
      setSelecting(null);
      setHovered(null);
    }
  }

  function handleClear() {
    onChange({ startDate: "", endDate: "" });
    setSelecting(null);
    setHovered(null);
  }

  // Determine range preview
  const rangeEnd = selecting === "end" && hovered ? hovered : end;
  const rangeStart = selecting === "end" && hovered && start && hovered < start ? hovered : start;

  function inRange(d) {
    if (!d || !rangeStart || !rangeEnd) return false;
    return d > rangeStart && d < rangeEnd;
  }

  const tripDays = start && end ? Math.round((end-start)/86400000)+1 : null;

  return (
    <div style={{ userSelect:"none" }}>
      {/* Month navigation */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px" }}>
        <button onClick={prevMonth} style={{ background:"none", border:"1.5px solid #e8e8e8", borderRadius:"8px", width:"34px", height:"34px", cursor:"pointer", fontSize:"18px", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>‹</button>
        <span style={{ fontWeight:700, fontSize:"15px", color:"#1a1a2e" }}>{MONTH_NAMES[calMonth]} {calYear}</span>
        <button onClick={nextMonth} style={{ background:"none", border:"1.5px solid #e8e8e8", borderRadius:"8px", width:"34px", height:"34px", cursor:"pointer", fontSize:"18px", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>›</button>
      </div>

      {/* Day headers */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:"2px" }}>
        {DAY_NAMES.map(d=><div key={d} style={{ textAlign:"center", fontSize:"11px", fontWeight:700, color:"#aaa", padding:"4px 0" }}>{d}</div>)}
      </div>

      {/* Days */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px" }} onMouseLeave={()=>selecting==="end"&&setHovered(null)}>
        {cells.map((d,i)=>{
          if (!d) return <div key={i}/>;
          const isStart = sameDay(d, start);
          const isEnd = sameDay(d, end);
          const inR = inRange(d);
          const isPast = d < today;
          const isToday = sameDay(d, today);
          const isHov = selecting==="end" && hovered && sameDay(d, hovered);

          let bg = "transparent";
          let color = isPast ? "#ccc" : "var(--color-text-primary)";
          let borderRadius = "8px";
          let fontWeight = isToday ? 700 : 400;

          if (isStart && end) { bg="linear-gradient(135deg,#667eea,#f64f59)"; color="white"; borderRadius="8px 0 0 8px"; fontWeight=700; }
          else if (isEnd) { bg="linear-gradient(135deg,#667eea,#f64f59)"; color="white"; borderRadius="0 8px 8px 0"; fontWeight=700; }
          else if (isStart) { bg="linear-gradient(135deg,#667eea,#f64f59)"; color="white"; borderRadius="8px"; fontWeight=700; }
          else if (inR) { bg="#ede9fe"; color="#5b21b6"; borderRadius="0"; }
          else if (isHov && selecting==="end") {
            // preview hover
            if (start && d >= start) { bg="#ede9fe"; color="#5b21b6"; }
            else { bg="#fee2e2"; color="#991b1b"; }
          }

          return (
            <div key={i}
              onClick={()=>handleClick(d)}
              onMouseEnter={()=>{ if(selecting==="end" && !isPast) setHovered(d); }}
              style={{ position:"relative", textAlign:"center", padding:"7px 2px", borderRadius, background:bg, color, fontSize:"13px", fontWeight, cursor:isPast?"not-allowed":"pointer", border:isToday&&!isStart&&!isEnd?"1.5px solid #667eea":"1.5px solid transparent", transition:"background 0.08s" }}>
              {d.getDate()}
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div style={{ marginTop:"14px", minHeight:"44px" }}>
        {!start&&(
          <div style={{ fontSize:"13px", color:"#aaa", textAlign:"center", padding:"10px 0" }}>Click any date to set your departure</div>
        )}
        {start&&!end&&(
          <div style={{ fontSize:"13px", color:"#667eea", textAlign:"center", fontWeight:600, padding:"4px 0" }}>
            ✈️ Departing {toStr(start)} — now click your return date
            <div style={{ marginTop:"6px" }}>
              <button onClick={handleClear} style={{ fontSize:"11px", color:"#aaa", background:"none", border:"1px solid #e8e8e8", borderRadius:"6px", padding:"3px 10px", cursor:"pointer" }}>Clear & start over</button>
            </div>
          </div>
        )}
        {start&&end&&(
          <div style={{ display:"flex", gap:"8px", alignItems:"stretch" }}>
            <div style={{ flex:1, background:"#f0f0ff", borderRadius:"10px", padding:"9px 12px", textAlign:"center" }}>
              <div style={{ fontSize:"10px", color:"#667eea", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>✈️ Depart</div>
              <div style={{ fontSize:"14px", fontWeight:700, color:"#1a1a2e", marginTop:"2px" }}>{toStr(start)}</div>
            </div>
            <div style={{ flex:1, background:"#fff0f5", borderRadius:"10px", padding:"9px 12px", textAlign:"center" }}>
              <div style={{ fontSize:"10px", color:"#f64f59", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>🏠 Return</div>
              <div style={{ fontSize:"14px", fontWeight:700, color:"#1a1a2e", marginTop:"2px" }}>{toStr(end)}</div>
            </div>
            <div style={{ background:"#f9f9f9", borderRadius:"10px", padding:"9px 12px", textAlign:"center", minWidth:"54px" }}>
              <div style={{ fontSize:"10px", color:"#888", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>Days</div>
              <div style={{ fontSize:"14px", fontWeight:700, color:"#1a1a2e", marginTop:"2px" }}>{tripDays}</div>
            </div>
            <button onClick={handleClear} style={{ background:"none", border:"1.5px solid #e8e8e8", borderRadius:"10px", padding:"0 10px", cursor:"pointer", color:"#aaa", fontSize:"18px" }} title="Clear dates">×</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MINI CALENDAR (for date adjustment in packing view) ───────
function MiniCalendarModal({ startDate, endDate, onSave, onClose }) {
  const [localStart, setLocalStart] = useState(startDate||"");
  const [localEnd, setLocalEnd] = useState(endDate||"");
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:"20px" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"white", borderRadius:"22px", padding:"28px", maxWidth:"420px", width:"100%", boxShadow:"0 30px 80px rgba(0,0,0,0.35)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
          <h3 style={{ margin:0, fontSize:"16px", fontWeight:800, color:"#1a1a2e" }}>Adjust Travel Dates</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"22px", color:"#aaa", lineHeight:1 }}>×</button>
        </div>
        <CalendarPicker
          startDate={localStart}
          endDate={localEnd}
          onChange={({startDate:s, endDate:e})=>{ setLocalStart(s); setLocalEnd(e); }}
        />
        <div style={{ display:"flex", gap:"10px", marginTop:"20px" }}>
          <button onClick={onClose} style={{ flex:1, padding:"11px", borderRadius:"12px", border:"2px solid #e8e8e8", background:"white", cursor:"pointer", fontWeight:600, color:"#666", fontSize:"14px" }}>Cancel</button>
          <button
            onClick={()=>{ if(localStart&&localEnd){ onSave(localStart, localEnd); onClose(); } }}
            disabled={!localStart||!localEnd}
            style={{ flex:2, padding:"11px", borderRadius:"12px", border:"none", background:localStart&&localEnd?"linear-gradient(135deg,#667eea,#f64f59)":"#e8e8e8", color:localStart&&localEnd?"white":"#bbb", cursor:localStart&&localEnd?"pointer":"not-allowed", fontWeight:700, fontSize:"14px" }}>
            Update Dates
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DESTINATION AUTOCOMPLETE ──────────────────────────────────
function DestinationInput({ value, onChange, onEnter }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  function onInput(val) {
    onChange(val);
    clearTimeout(timer.current);
    if (val.length<2) { setSuggestions([]); setShowDrop(false); return; }
    timer.current = setTimeout(async()=>{
      setLoading(true);
      try {
        const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&limit=6&addressdetails=1&accept-language=en`);
        const data = await resp.json();
        const seen = new Set();
        const results = data.reduce((acc,r)=>{
          const city = r.address?.city||r.address?.town||r.address?.village||r.address?.county||r.name;
          const country = r.address?.country||"";
          const label = country?`${city}, ${country}`:city;
          if (city&&!seen.has(label)) { seen.add(label); acc.push({label,type:r.type}); }
          return acc;
        },[]);
        setSuggestions(results); setShowDrop(results.length>0);
      } catch { setSuggestions([]); }
      setLoading(false);
    }, 320);
  }

  function pick(label) { onChange(label); setSuggestions([]); setShowDrop(false); }

  return (
    <div style={{ position:"relative" }}>
      <div style={{ position:"relative" }}>
        <input value={value} onChange={e=>onInput(e.target.value)}
          onFocus={()=>suggestions.length>0&&setShowDrop(true)}
          onBlur={()=>setTimeout(()=>setShowDrop(false),160)}
          onKeyDown={e=>e.key==="Enter"&&onEnter&&onEnter()}
          placeholder="e.g. Marrakech, Morocco" autoFocus autoComplete="off"
          style={{ width:"100%", padding:"13px 40px 13px 15px", borderRadius:showDrop?"12px 12px 0 0":"12px", border:`2px solid ${showDrop?"#667eea":"#e8e8e8"}`, fontSize:"15px", outline:"none", boxSizing:"border-box" }}/>
        <div style={{ position:"absolute", right:"13px", top:"50%", transform:"translateY(-50%)", fontSize:"16px", pointerEvents:"none" }}>{loading?"⏳":"🔍"}</div>
      </div>
      {showDrop&&suggestions.length>0&&(
        <div style={{ position:"absolute", top:"100%", left:0, right:0, background:"white", border:"2px solid #667eea", borderTop:"none", borderRadius:"0 0 12px 12px", zIndex:50, overflow:"hidden" }}>
          {suggestions.map((s,i)=>(
            <div key={i} onMouseDown={()=>pick(s.label)}
              style={{ padding:"11px 15px", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", borderTop:i>0?"1px solid #f5f5f5":"none", background:"white" }}
              onMouseEnter={e=>e.currentTarget.style.background="#f0f0ff"}
              onMouseLeave={e=>e.currentTarget.style.background="white"}>
              <span style={{ fontSize:"16px" }}>{["city","town","village"].includes(s.type)?"🏙️":s.type==="administrative"?"🗺️":s.type==="country"?"🌍":"📍"}</span>
              <span style={{ fontSize:"14px", color:"#222", fontWeight:500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DESTINATION RULES ─────────────────────────────────────────
const DESTINATION_RULES = [
  { match:["sweden","norway","finland","denmark","iceland","nordic","scandinavia","oslo","stockholm","helsinki","copenhagen","reykjavik","gothenburg","bergen"],
    rules:[{add:{category:"🧖 Nordic Essentials",items:[{name:"Swimsuit / swim trunks (sauna & hot tubs)",essential:true,note:"Sauna culture runs year-round regardless of outside temperature"},{name:"Flip flops / sauna sandals",essential:true},{name:"Quick-dry towel"}]},tag:"nordic"}]},
  { match:["japan","tokyo","kyoto","osaka","nara","sapporo","fukuoka","hiroshima","nagoya"],
    rules:[{add:{category:"🗾 Japan Essentials",items:[{name:"Slip-on shoes (easy on/off for temples)",essential:true},{name:"Cash (many places are cash only)",essential:true},{name:"Small towel / handkerchief"},{name:"Swimsuit (for onsen — check tattoo policies first)",note:"Hot spring bathing is a core cultural experience"}]},tag:"japan"}]},
  { match:["india","mumbai","delhi","goa","jaipur","bangalore","chennai","kolkata","hyderabad","agra"],
    rules:[{add:{category:"🇮🇳 India Essentials",items:[{name:"Modest clothing (covered shoulders & knees for temples)",essential:true},{name:"Stomach tablets / Imodium",essential:true},{name:"Water purification tablets or filter bottle",essential:true},{name:"Insect repellent (DEET)",essential:true},{name:"Scarf / dupatta",note:"Temple visits, dust & sun"}]},tag:"india"}]},
  { match:["saudi","uae","dubai","abu dhabi","qatar","doha","kuwait","bahrain","oman","muscat"],
    rules:[{add:{category:"🕌 Dress Code Essentials",items:[{name:"Modest loose-fitting clothing",essential:true},{name:"Long trousers / long skirt"},{name:"Headscarf (women — required in some areas)",essential:true}]},tag:"gulf"}]},
  { match:["thailand","bali","indonesia","vietnam","cambodia","myanmar","laos","malaysia","bangkok","chiang mai","ubud"],
    rules:[{add:{category:"🌴 Southeast Asia Essentials",items:[{name:"Temple-appropriate clothing (sarong / scarf)",essential:true},{name:"Strong insect repellent",essential:true},{name:"Anti-diarrhoea medication"},{name:"Rehydration salts"},{name:"Waterproof dry bag"},{name:"Swimsuit (beaches, waterfalls, pools)",essential:true}]},tag:"seasia"}]},
  { match:["morocco","marrakech","fes","casablanca","tangier","agadir","essaouira","chefchaouen"],
    rules:[{add:{category:"🧿 Morocco Essentials",items:[{name:"Light layers for warm days",essential:true,note:"Daytime can reach 20°C+ even in winter"},{name:"Warm jacket / fleece for evenings & desert nights",essential:true,note:"Temperatures can drop to 4–8°C at night — swing can be 15°C+"},{name:"Modest clothing for medinas & mosques",essential:true},{name:"Scarf (sun, dust, cold nights, cultural respect)",essential:true},{name:"Cash in dirhams"},{name:"Comfortable closed shoes for cobblestones"}]},tag:"morocco"}]},
  { match:["egypt","cairo","luxor","aswan","sharm el sheikh","hurghada","jordan","amman","petra"],
    rules:[{add:{category:"🏜️ North Africa / Levant Essentials",items:[{name:"Light breathable layers for daytime",essential:true},{name:"Warm layer for evenings (especially Oct–Mar)",essential:true,note:"Desert climates: 20°C+ by day, can drop below 10°C at night"},{name:"Scarf / shawl (dust, sun, modesty)",essential:true},{name:"High SPF sunscreen",essential:true},{name:"Anti-diarrhoea tablets"},{name:"Cash in local currency"}]},tag:"northafrica"}]},
  { match:["australia","sydney","melbourne","brisbane","cairns","perth","adelaide","gold coast"],
    rules:[{add:{category:"🦘 Australia Essentials",items:[{name:"SPF 50+ sunscreen (UV is extreme)",essential:true},{name:"Rash vest / UV swimwear",essential:true},{name:"Insect repellent"}]},tag:"australia"}]},
];

function getDestinationRules(destination) {
  const d=(destination||"").toLowerCase();
  for (const rule of DESTINATION_RULES) {
    if (rule.match.some(k=>d.includes(k))) return rule.rules;
  }
  return [];
}

// ─── PACKING LIST GENERATOR ────────────────────────────────────
function generatePackingList(answers, weatherData) {
  const {transport,activities=[],extras=[],tripStyle,luggageType=[],destination,gender}=answers;
  const isFemale=gender==="female";
  const isFlying=transport==="flying";
  const isLight=tripStyle==="light";
  const isHeavy=tripStyle==="heavy";
  const w=(weatherData?.summary||"").toLowerCase();
  const dayHigh=weatherData?.dayHigh||20;
  const nightLow=weatherData?.nightLow||12;
  const isCold=nightLow<8||w.includes("snow")||w.includes("freez")||w.includes("frost");
  const isCoolNight=nightLow<14&&dayHigh>18;
  const isWarm=dayHigh>22;
  const isHot=dayHigh>28;
  const isRainy=w.includes("rain")||w.includes("shower")||w.includes("storm")||w.includes("drizzle");
  const hasBigSwing=(dayHigh-nightLow)>12;
  const days=answers.startDate&&answers.endDate?Math.max(1,Math.round((new Date(answers.endDate)-new Date(answers.startDate))/86400000)):5;
  const outfits=isLight?Math.min(days,3):isHeavy?days+2:Math.min(days,5);
  const destRules=getDestinationRules(destination);
  const list=[];

  list.push({category:"📄 Documents & Money",items:[
    {name:"Passport / ID",essential:true},{name:"Travel insurance documents",essential:true},{name:"Credit / debit cards",essential:true},{name:"Cash (local currency)",essential:true},
    ...(isFlying?[{name:"Boarding pass / e-ticket",essential:true}]:[]),
    {name:"Hotel / accommodation confirmations"},{name:"Emergency contacts list"},
  ]});

  const clothing=[];
  if (isFemale) {
    clothing.push({name:`${outfits} tops / blouses`,essential:true},{name:`${outfits} bottoms (trousers, skirts, jeans)`,essential:true},{name:`${Math.ceil(outfits*1.2)} pairs of underwear`,essential:true},{name:`${outfits} bras (inc. one strapless)`},{name:`${outfits} pairs of socks`,essential:true},{name:"Comfortable walking shoes / trainers",essential:true},{name:"Sleepwear / pyjamas"});
    if (isWarm||isHot) { clothing.push({name:"Sundress / lightweight dress (x2)"},{name:"Sandals / flat mules"},{name:"Sun hat / wide-brim hat",essential:true},{name:"Lightweight cardigan (for a/c & cool evenings)"}); }
    if (isCold||isCoolNight||hasBigSwing) { clothing.push({name:"Warm coat / puffer jacket",essential:true},{name:"Thermal leggings / base layer"},{name:"Cosy knit jumper / sweater"},{name:"Warm scarf & gloves"}); }
    if (hasBigSwing&&!isCold) clothing.push({name:"Light layers (vest + cardigan)",essential:true,note:`Daytime ~${dayHigh}°C but nights drop to ~${nightLow}°C`});
    if (activities.includes("business")) { clothing.push({name:"Smart blazer / tailored jacket"},{name:"Smart trousers or midi skirt"},{name:"Silk or smart blouse (x2)"},{name:"Smart heels / pointed flats"}); }
    if (activities.includes("nightlife")) { clothing.push({name:"Going-out outfit / dress"},{name:"Evening heels / dressy sandals"},{name:"Small evening bag / clutch"}); }
    if (activities.includes("beach")) { clothing.push({name:"Swimsuit / bikini (x2)",essential:true},{name:"Beach cover-up / kaftan"},{name:"Flip flops / jelly sandals"}); }
    if (activities.includes("hiking")) { clothing.push({name:"Moisture-wicking sports tops"},{name:"Hiking leggings / convertible trousers"},{name:"Hiking boots (broken in!)",essential:true},{name:"Wool / tech socks (x3)"}); }
    if (activities.includes("skiing")) { clothing.push({name:"Ski jacket & ski trousers",essential:true},{name:"Ski helmet",essential:true},{name:"Ski goggles"},{name:"Thermal base layer (x2)"},{name:"Ski gloves"},{name:"Neck gaiter / buff"}); }
    if (activities.includes("spa")) { clothing.push({name:"Swimsuit (for pool / hot tub)",essential:true},{name:"Flip flops for spa area"}); }
  } else {
    clothing.push({name:`${outfits} t-shirts / casual shirts`,essential:true},{name:`${outfits} pairs of trousers / jeans`,essential:true},{name:`${Math.ceil(outfits*1.2)} pairs of underwear`,essential:true},{name:`${outfits} pairs of socks`,essential:true},{name:"Comfortable trainers / walking shoes",essential:true},{name:"Sleepwear / boxers for sleep"});
    if (isWarm||isHot) { clothing.push({name:"Shorts (x2–3)"},{name:"Light linen / breathable shirt"},{name:"Sandals / flip flops"},{name:"Sun cap / baseball cap",essential:true}); }
    if (isCold||isCoolNight||hasBigSwing) { clothing.push({name:"Warm jacket / puffer coat",essential:true},{name:"Thermal base layer top & bottoms"},{name:"Thick jumper / hoodie"},{name:"Warm hat & gloves"}); }
    if (hasBigSwing&&!isCold) clothing.push({name:"Light hoodie or fleece layer",essential:true,note:`Days ~${dayHigh}°C but evenings cool to ~${nightLow}°C`});
    if (activities.includes("business")) { clothing.push({name:"Dress shirts (x2–3)"},{name:"Formal trousers"},{name:"Blazer / suit jacket"},{name:"Dress shoes / smart loafers"}); }
    if (activities.includes("nightlife")) { clothing.push({name:"Smart casual outfit for evenings"},{name:"Smart shoes / Chelsea boots"}); }
    if (activities.includes("beach")) { clothing.push({name:"Swim shorts (x2)",essential:true},{name:"Rash vest (UV protection)"},{name:"Flip flops / waterproof sandals"}); }
    if (activities.includes("hiking")) { clothing.push({name:"Moisture-wicking t-shirts"},{name:"Hiking trousers / cargo shorts"},{name:"Hiking boots (broken in!)",essential:true},{name:"Wool / moisture-wicking socks (x3)"}); }
    if (activities.includes("skiing")) { clothing.push({name:"Ski jacket & salopettes",essential:true},{name:"Ski helmet",essential:true},{name:"Ski goggles"},{name:"Thermal base layer (x2)"},{name:"Ski gloves"},{name:"Neck gaiter / buff"}); }
    if (activities.includes("spa")) { clothing.push({name:"Swim shorts (for pool / hot tub)",essential:true},{name:"Flip flops for spa area"}); }
  }
  if (isRainy) { clothing.push({name:"Waterproof rain jacket",essential:true},{name:"Compact travel umbrella"}); }
  list.push({category:"👕 Clothing",items:clothing});

  const toiletries=[{name:"Toothbrush & toothpaste",essential:true},{name:"Shampoo & conditioner"},{name:"Body wash / soap"},{name:"Deodorant",essential:true},{name:"Face moisturiser / SPF day cream"},{name:"Lip balm (SPF)"}];
  if (isFemale) { toiletries.push({name:"Make-up essentials"},{name:"Make-up remover / micellar water"},{name:"Tampons / sanitary products",essential:true},{name:"Razor / hair removal"},{name:"Hairbrush / styling tools"}); if(isHot||isWarm) toiletries.push({name:"Hair ties / clips (multiple)"}); }
  else { toiletries.push({name:"Razor & shaving cream / electric shaver"},{name:"Hair product / wax / gel"}); }
  if (isWarm||isHot||activities.includes("beach")) { toiletries.push({name:"Sunscreen SPF 50+",essential:true}); if(isFemale) toiletries.push({name:"After-sun / aloe vera gel"}); }
  if (isFlying&&(luggageType.includes("personal")||luggageType.includes("carryon"))) toiletries.push({name:"Travel-size liquids bag (100ml limit)",essential:true});
  list.push({category:"🧴 Toiletries",items:toiletries});

  const health=[{name:"Paracetamol / ibuprofen",essential:true},{name:"Plasters / blister pads"},{name:"Hand sanitiser",essential:true},{name:"Antihistamines"}];
  if (extras.includes("medication")) health.unshift({name:"Prescription medication (full supply + extra)",essential:true});
  if (activities.includes("hiking")||activities.includes("camping")) { health.push({name:"First aid kit"},{name:"Blister treatment / Compeed"}); }
  list.push({category:"💊 Health & Wellness",items:health});

  const tech=[{name:"Phone charger",essential:true},{name:"Universal travel adapter",essential:true},{name:"Portable power bank"},{name:"Earphones / headphones"}];
  if (extras.includes("remote")) { tech.push({name:"Laptop + charger",essential:true},{name:"Portable WiFi / local SIM card"},{name:"Mouse & mousepad"}); }
  if (extras.includes("photography")) { tech.push({name:"Camera + lenses"},{name:"Extra memory cards"},{name:"Tripod (travel size)"},{name:"Camera charger + batteries"}); }
  list.push({category:"🔌 Tech & Electronics",items:tech});

  const actItems=[];
  if (activities.includes("beach")) { actItems.push({name:"Beach towel"},{name:"Snorkelling gear"},{name:"Waterproof phone pouch"}); }
  if (activities.includes("hiking")) { actItems.push({name:"Daypack / hiking backpack",essential:true},{name:"Water bottle (1L+)",essential:true},{name:"Trail snacks / energy bars"},{name:"Trekking poles"},{name:"Headlamp + spare batteries"},{name:"Maps / AllTrails downloaded offline"}); }
  if (activities.includes("camping")) { actItems.push({name:"Tent",essential:true},{name:"Sleeping bag (rated for night temps)",essential:true},{name:"Sleeping mat"},{name:"Camp stove + fuel"},{name:"Eating utensils kit"}); }
  if (activities.includes("fitness")) { actItems.push({name:isFemale?"Sports bra & gym leggings (x3)":"Gym shorts & t-shirts (x3)"},{name:"Sports trainers"},{name:"Jump rope / resistance bands"}); }
  if (actItems.length) list.push({category:"🎯 Activity Gear",items:actItems});

  for (const rule of destRules) {
    if (rule.add) {
      const adjusted={...rule.add,items:rule.add.items.map(item=>({...item,name:isFemale?item.name.replace("Swimsuit / swim trunks","Swimsuit / bikini"):item.name.replace("Swimsuit / swim trunks","Swim trunks")}))};
      list.push(adjusted);
    }
  }

  if (extras.includes("baby")) list.push({category:"👶 Baby Essentials",items:[{name:"Nappies / diapers (+ extras)",essential:true},{name:"Baby food / formula",essential:true},{name:"Baby carrier / stroller"},{name:"Baby wipes (large pack)",essential:true},{name:"Favourite toys / comfort items"},{name:"Changing mat"}]});
  if (extras.includes("pet")) list.push({category:"🐾 Pet Essentials",items:[{name:"Pet carrier",essential:true},{name:"Food & treats",essential:true},{name:"Collapsible water bowl"},{name:"Leash & collar with ID tag",essential:true},{name:"Vet records / pet passport",essential:true}]});

  const misc=[{name:"Reusable shopping bag"},{name:"Luggage lock"},{name:"Travel pillow & eye mask"},{name:"Snacks for the journey"},{name:"Book / e-reader / entertainment"}];
  if (isFlying) misc.push({name:"Luggage tag with contact info",essential:true});
  if (days>7) misc.push({name:"Travel laundry detergent + laundry bag"});
  list.push({category:"🎒 Bag & Misc",items:misc});
  return list;
}

// ─── SURVEY STEPS ──────────────────────────────────────────────
const STEPS = [
  {id:"destination",question:"Where are you headed? 🌍",subtitle:"Enter your destination city or country",type:"destination"},
  {id:"dates",question:"When is your trip? 📅",subtitle:"Click a departure date, then a return date",type:"calendar"},
  {id:"gender",question:"What's your gender? 👤",subtitle:"We'll tailor your packing list accordingly",type:"single",options:[{value:"male",label:"👨 Male"},{value:"female",label:"👩 Female"},{value:"nonbinary",label:"🧑 Non-binary / Prefer not to say"}]},
  {id:"transport",question:"How are you getting there? ✈️",subtitle:"This helps us account for baggage limits",type:"single",options:[{value:"flying",label:"✈️ Flying",desc:"Carry-on or checked bag"},{value:"driving",label:"🚗 Driving",desc:"Flexible packing"},{value:"train",label:"🚂 Train",desc:"Moderate space"},{value:"cruise",label:"🛳️ Cruise",desc:"Lots of room!"}]},
  {id:"luggageType",question:"What's your luggage situation? 🧳",subtitle:"Select all that apply",type:"multi",showIf:a=>a.transport==="flying",options:[{value:"personal",label:"👜 Personal item only"},{value:"carryon",label:"🎒 Carry-on bag"},{value:"checked",label:"🧳 Checked bag"}]},
  {id:"activities",question:"What are you planning to do? 🎯",subtitle:"Pick all that apply",type:"multi",options:[{value:"beach",label:"🏖️ Beach / Swimming"},{value:"hiking",label:"🥾 Hiking / Outdoors"},{value:"city",label:"🏙️ City sightseeing"},{value:"business",label:"💼 Business meetings"},{value:"nightlife",label:"🎉 Nightlife / Dining out"},{value:"skiing",label:"⛷️ Skiing / Snow sports"},{value:"camping",label:"⛺ Camping"},{value:"spa",label:"🧘 Wellness / Spa"}]},
  {id:"tripStyle",question:"What's your packing style? 🎒",subtitle:"Be honest — we won't judge",type:"single",options:[{value:"light",label:"🪶 Ultra light",desc:"Less is more"},{value:"moderate",label:"⚖️ Just right",desc:"Prepared but not overpacked"},{value:"heavy",label:"🧳 Everything but the kitchen sink",desc:"Better safe than sorry"}]},
  {id:"extras",question:"Any special considerations? 💊",subtitle:"Select anything relevant",type:"multi",options:[{value:"baby",label:"👶 Travelling with a baby/toddler"},{value:"pet",label:"🐾 Bringing a pet"},{value:"medication",label:"💊 Regular medication needed"},{value:"photography",label:"📸 Photography / Video gear"},{value:"fitness",label:"🏋️ Gym / Fitness routine"},{value:"remote",label:"💻 Working remotely"}]},
];

// ─── MAIN APP ──────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState("survey");
  const [packingList, setPackingList] = useState([]);
  const [checked, setChecked] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [culturalInsights, setCulturalInsights] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [popupItem, setPopupItem] = useState(null);
  const [expandedCats, setExpandedCats] = useState({});
  const [showDateModal, setShowDateModal] = useState(false);

  const visibleSteps = STEPS.filter(s=>!s.showIf||s.showIf(answers));
  const currentStep = visibleSteps[step];
  const isLast = step===visibleSteps.length-1;
  const progress = (step/visibleSteps.length)*100;

  function handleAnswer(val) { setAnswers(p=>({...p,[currentStep.id]:val})); }
  function handleMultiToggle(val) {
    const curr=answers[currentStep.id]||[];
    setAnswers(p=>({...p,[currentStep.id]:curr.includes(val)?curr.filter(v=>v!==val):[...curr,val]}));
  }
  function canProceed() {
    const a=answers[currentStep.id];
    if (currentStep.type==="destination") return a&&a.trim().length>0;
    if (currentStep.type==="calendar") return answers.startDate&&answers.endDate;
    if (currentStep.type==="single") return !!a;
    return true;
  }
  function goNext() { if(canProceed()) { isLast?handleFinish():setStep(s=>s+1); } }

  async function handleFinish() {
    setPhase("loading"); setLoadingMsg("🌤️ Fetching real-time weather forecast...");
    let wd={summary:"",dayHigh:20,nightLow:12,googleUrl:"",appleUrl:"",forecastLines:[]};
    let insights=[];
    try {
      const dest=answers.destination,start=answers.startDate||"",end=answers.endDate||"";
      const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,tools:[{type:"web_search_20250305",name:"web_search"}],system:`You are a travel weather analyst. Search for the current weather forecast. Pay attention to day/night temperature differences. Return ONLY raw JSON no markdown:
{"summary":"3-sentence weather summary with day AND night temps","dayHigh":<celsius number>,"nightLow":<celsius number>,"forecastLines":["Mon: Sunny, 22°C / 9°C","Tue: Partly cloudy, 19°C / 7°C"],"insights":["non-obvious cultural packing tip"]}`,messages:[{role:"user",content:`Search weather for: ${dest} from ${start} to ${end}.`}]})});
      const data=await resp.json();
      const txt=data.content?.filter(b=>b.type==="text").map(b=>b.text).join(" ")||"";
      try {
        const s=txt.indexOf("{"),e=txt.lastIndexOf("}");
        const parsed=JSON.parse(txt.slice(s,e+1));
        const enc=encodeURIComponent(dest);
        wd={summary:parsed.summary||"",dayHigh:typeof parsed.dayHigh==="number"?parsed.dayHigh:20,nightLow:typeof parsed.nightLow==="number"?parsed.nightLow:12,forecastLines:parsed.forecastLines||[],googleUrl:`https://www.google.com/search?q=weather+${enc}`,appleUrl:`https://weather.com/weather/tenday/l/${enc}`};
        insights=parsed.insights||[];
      } catch { wd.summary=txt.slice(0,300); const enc=encodeURIComponent(dest); wd.googleUrl=`https://www.google.com/search?q=weather+${enc}`; wd.appleUrl=`https://weather.com/weather/tenday/l/${enc}`; }
    } catch { wd.summary="Weather data unavailable. Pack for variable conditions."; }
    setWeatherData(wd); setCulturalInsights(insights);
    setLoadingMsg("🧳 Building your personalised packing list...");
    await new Promise(r=>setTimeout(r,500));
    const list=generatePackingList(answers,wd);
    const initExp={}; list.forEach(c=>{initExp[c.category]=true;});
    setExpandedCats(initExp); setPackingList(list); setPhase("list");
  }

  function handleDateSave(newStart, newEnd) {
    setAnswers(p=>({...p,startDate:newStart,endDate:newEnd}));
    const list=generatePackingList({...answers,startDate:newStart,endDate:newEnd},weatherData);
    const initExp={}; list.forEach(c=>{initExp[c.category]=true;});
    setExpandedCats(initExp); setPackingList(list);
  }

  function toggleCheck(ci,ii) { setChecked(p=>({...p,[`${ci}-${ii}`]:!p[`${ci}-${ii}`]})); }
  function toggleCat(cat) { setExpandedCats(p=>({...p,[cat]:!p[cat]})); }

  const totalItems=packingList.reduce((s,c)=>s+c.items.length,0);
  const packedItems=Object.values(checked).filter(Boolean).length;
  const pct=totalItems?Math.round((packedItems/totalItems)*100):0;
  const days=answers.startDate&&answers.endDate?Math.max(1,Math.round((new Date(answers.endDate)-new Date(answers.startDate))/86400000)):"?";
  const hasBigSwing=weatherData&&(weatherData.dayHigh-weatherData.nightLow)>12;
  const F={fontFamily:"'Segoe UI', system-ui, sans-serif"};

  // ── SURVEY ──
  if (phase==="survey") return (
    <div style={{...F,minHeight:"100vh",background:"linear-gradient(145deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{textAlign:"center",marginBottom:"22px"}}>
        <div style={{fontSize:"36px",marginBottom:"5px"}}>🧳</div>
        <h1 style={{margin:0,fontSize:"20px",fontWeight:800,color:"white"}}>To Pack or Not to Pack</h1>
        <p style={{margin:"3px 0 0",color:"rgba(255,255,255,0.4)",fontSize:"12px",fontStyle:"italic"}}>That is the question.</p>
      </div>
      <div style={{background:"white",borderRadius:"24px",padding:"32px",maxWidth:"520px",width:"100%",boxShadow:"0 30px 80px rgba(0,0,0,0.4)"}}>
        <div style={{marginBottom:"22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"12px",color:"#aaa"}}>
            <span>Question {step+1} of {visibleSteps.length}</span><span>{Math.round(progress)}%</span>
          </div>
          <div style={{height:"5px",background:"#f0f0f0",borderRadius:"99px",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#667eea,#f64f59)",borderRadius:"99px",transition:"width 0.4s"}}/>
          </div>
        </div>
        <h2 style={{fontSize:"20px",fontWeight:700,color:"#1a1a2e",marginBottom:"4px"}}>{currentStep.question}</h2>
        <p style={{color:"#888",marginBottom:"18px",fontSize:"13px"}}>{currentStep.subtitle}</p>

        {currentStep.type==="destination"&&<DestinationInput value={answers.destination||""} onChange={val=>setAnswers(p=>({...p,destination:val}))} onEnter={goNext}/>}

        {currentStep.type==="calendar"&&<CalendarPicker startDate={answers.startDate} endDate={answers.endDate} onChange={dates=>setAnswers(p=>({...p,...dates}))}/>}

        {currentStep.type==="single"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"9px"}}>
            {currentStep.options.map(opt=>{
              const sel=answers[currentStep.id]===opt.value;
              return <button key={opt.value} onClick={()=>handleAnswer(opt.value)}
                style={{padding:"13px 15px",borderRadius:"12px",border:`2px solid ${sel?"#667eea":"#e8e8e8"}`,background:sel?"#f0f0ff":"white",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:600,color:sel?"#667eea":"#333",fontSize:"14px"}}>{opt.label}</div>{opt.desc&&<div style={{fontSize:"12px",color:"#888",marginTop:"2px"}}>{opt.desc}</div>}</div>
                <div style={{width:"18px",height:"18px",borderRadius:"50%",border:`2px solid ${sel?"#667eea":"#ccc"}`,background:sel?"#667eea":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel&&<div style={{width:"6px",height:"6px",borderRadius:"50%",background:"white"}}/>}</div>
              </button>;
            })}
          </div>
        )}

        {currentStep.type==="multi"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"9px"}}>
            {currentStep.options.map(opt=>{
              const sel=(answers[currentStep.id]||[]).includes(opt.value);
              return <button key={opt.value} onClick={()=>handleMultiToggle(opt.value)}
                style={{padding:"11px 13px",borderRadius:"12px",border:`2px solid ${sel?"#667eea":"#e8e8e8"}`,background:sel?"#f0f0ff":"white",cursor:"pointer",textAlign:"left"}}>
                <div style={{fontWeight:600,fontSize:"13px",color:sel?"#667eea":"#333"}}>{opt.label}</div>
              </button>;
            })}
          </div>
        )}

        <div style={{display:"flex",justifyContent:"space-between",marginTop:"24px",gap:"12px"}}>
          {step>0?<button onClick={()=>setStep(s=>s-1)} style={{padding:"12px 18px",borderRadius:"12px",border:"2px solid #e8e8e8",background:"white",cursor:"pointer",fontWeight:600,color:"#666",fontSize:"14px"}}>← Back</button>:<div/>}
          <button onClick={goNext} disabled={!canProceed()} style={{padding:"12px 26px",borderRadius:"12px",border:"none",background:canProceed()?"linear-gradient(135deg,#667eea,#f64f59)":"#e8e8e8",color:canProceed()?"white":"#bbb",cursor:canProceed()?"pointer":"not-allowed",fontWeight:700,fontSize:"14px",flex:1,maxWidth:"220px"}}>
            {isLast?"Build My List 🚀":"Continue →"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── LOADING ──
  if (phase==="loading") return (
    <div style={{...F,minHeight:"100vh",background:"linear-gradient(145deg,#1a1a2e,#0f3460)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center",color:"white"}}>
        <div style={{fontSize:"18px",fontWeight:800,opacity:0.5,marginBottom:"10px",letterSpacing:"1px"}}>TO PACK OR NOT TO PACK</div>
        <div style={{fontSize:"58px",margin:"0 0 14px",animation:"pulse 1.4s ease-in-out infinite",display:"inline-block"}}>🧳</div>
        <h2 style={{fontSize:"18px",fontWeight:700,marginBottom:"6px"}}>{loadingMsg}</h2>
        <p style={{opacity:0.5,fontSize:"13px"}}>{answers.destination}</p>
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`}</style>
    </div>
  );

  // ── PACKING LIST ──
  return (
    <div style={{...F,minHeight:"100vh",background:"#f4f5fa"}}>
      <div style={{background:"linear-gradient(135deg,#1a1a2e,#0f3460)",color:"white",padding:"18px 16px 16px",position:"sticky",top:0,zIndex:10,boxShadow:"0 4px 24px rgba(0,0,0,0.25)"}}>
        <div style={{maxWidth:"640px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
            <div>
              <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",opacity:0.5,textTransform:"uppercase",marginBottom:"3px"}}>To Pack or Not to Pack</div>
              <h1 style={{margin:0,fontSize:"19px",fontWeight:800}}>📍 {answers.destination}</h1>
              <button onClick={()=>setShowDateModal(true)} style={{marginTop:"4px",background:"rgba(255,255,255,0.12)",border:"none",borderRadius:"7px",color:"white",fontSize:"12px",padding:"3px 9px",cursor:"pointer",fontWeight:600,letterSpacing:"0.2px"}}>
                ✏️ {answers.startDate} → {answers.endDate} · {days} day{days!==1?"s":""}
              </button>
            </div>
            <div style={{textAlign:"right",background:"rgba(255,255,255,0.1)",borderRadius:"12px",padding:"9px 13px"}}>
              <div style={{fontSize:"21px",fontWeight:800,lineHeight:1}}>{pct}%</div>
              <div style={{fontSize:"11px",opacity:0.65,marginTop:"2px"}}>{packedItems}/{totalItems} packed</div>
            </div>
          </div>
          <div style={{height:"4px",background:"rgba(255,255,255,0.2)",borderRadius:"99px",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#667eea,#f64f59)",borderRadius:"99px",transition:"width 0.4s"}}/>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"640px",margin:"0 auto",padding:"14px"}}>
        {weatherData?.summary&&<WeatherCard weatherData={weatherData} hasBigSwing={hasBigSwing}/>}

        {culturalInsights.length>0&&(
          <div style={{background:"linear-gradient(135deg,#fff8e7,#fff3cd)",borderRadius:"16px",padding:"14px 18px",marginBottom:"10px",borderLeft:"4px solid #f59e0b"}}>
            <div style={{fontSize:"11px",fontWeight:700,color:"#d97706",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"10px"}}>💡 Smart Packing Insights</div>
            {culturalInsights.map((ins,i)=><div key={i} style={{fontSize:"13px",color:"#555",lineHeight:1.55,marginBottom:i<culturalInsights.length-1?"8px":0,paddingLeft:"14px",borderLeft:"2px solid #f59e0b"}}>{ins}</div>)}
          </div>
        )}

        {packingList.map((cat,ci)=>{
          const catPacked=cat.items.filter((_,ii)=>checked[`${ci}-${ii}`]).length;
          const isOpen=expandedCats[cat.category];
          const allDone=catPacked===cat.items.length;
          return (
            <div key={cat.category} style={{background:"white",borderRadius:"16px",marginBottom:"9px",overflow:"hidden",border:"0.5px solid var(--color-border-tertiary)"}}>
              <button onClick={()=>toggleCat(cat.category)} style={{width:"100%",padding:"14px 16px",border:"none",background:allDone?"#f0fff4":"white",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{fontSize:"18px"}}>{cat.category.split(" ")[0]}</span>
                  <span style={{fontWeight:700,fontSize:"14px",color:allDone?"#16a34a":"#1a1a2e"}}>{cat.category.slice(cat.category.indexOf(" ")+1)}</span>
                  <span style={{background:allDone?"#dcfce7":"#f3f4f6",color:allDone?"#16a34a":"#666",fontSize:"11px",fontWeight:700,padding:"2px 7px",borderRadius:"99px"}}>{catPacked}/{cat.items.length}</span>
                </div>
                <span style={{color:"#bbb",fontSize:"13px"}}>{isOpen?"▲":"▼"}</span>
              </button>
              {isOpen&&(
                <div style={{borderTop:"1px solid #f5f5f5"}}>
                  {cat.items.map((item,ii)=>{
                    const key=`${ci}-${ii}`,isPacked=checked[key];
                    return (
                      <div key={ii} style={{display:"flex",alignItems:"flex-start",padding:"10px 16px",borderBottom:ii<cat.items.length-1?"1px solid #fafafa":"none",gap:"11px",background:isPacked?"#f9fffe":"white"}}>
                        <button onClick={()=>toggleCheck(ci,ii)} style={{width:"21px",height:"21px",borderRadius:"6px",border:`2px solid ${isPacked?"#667eea":"#ddd"}`,background:isPacked?"#667eea":"white",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:0,marginTop:"1px"}}>
                          {isPacked&&<span style={{color:"white",fontSize:"11px",fontWeight:800}}>✓</span>}
                        </button>
                        <div style={{flex:1}}>
                          <span style={{fontSize:"13px",color:isPacked?"#bbb":"#222",textDecoration:isPacked?"line-through":"none",fontWeight:item.essential&&!isPacked?600:400}}>{item.name}</span>
                          {item.essential&&!isPacked&&<span style={{marginLeft:"7px",fontSize:"10px",background:"#fef3c7",color:"#92400e",padding:"1px 6px",borderRadius:"99px",fontWeight:700}}>essential</span>}
                          {item.note&&!isPacked&&<div style={{fontSize:"11px",color:"#999",marginTop:"3px",fontStyle:"italic",lineHeight:1.4}}>💡 {item.note}</div>}
                        </div>
                        <button onClick={()=>setPopupItem(item.name)} style={{padding:"4px 9px",border:"1.5px solid #e0e0e0",borderRadius:"8px",background:"white",color:"#667eea",fontSize:"11px",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>🛒 Shop</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {packedItems===totalItems&&totalItems>0&&(
          <div style={{background:"linear-gradient(135deg,#1a1a2e,#0f3460)",color:"white",borderRadius:"20px",padding:"26px",textAlign:"center",marginTop:"6px"}}>
            <div style={{fontSize:"46px",marginBottom:"10px"}}>🎉</div>
            <div style={{fontWeight:800,fontSize:"19px",marginBottom:"5px"}}>You're packed and ready!</div>
            <div style={{opacity:0.65,fontSize:"13px"}}>Have an incredible trip to {answers.destination} ✈️</div>
          </div>
        )}
        <div style={{height:"30px"}}/>
      </div>

      {/* Date adjustment modal */}
      {showDateModal&&<MiniCalendarModal startDate={answers.startDate} endDate={answers.endDate} onSave={handleDateSave} onClose={()=>setShowDateModal(false)}/>}

      {/* Shop popup */}
      {popupItem&&(
        <div onClick={()=>setPopupItem(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:"22px",padding:"26px",maxWidth:"370px",width:"100%",boxShadow:"0 30px 80px rgba(0,0,0,0.35)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5px"}}>
              <h3 style={{margin:0,fontSize:"15px",fontWeight:800,color:"#1a1a2e"}}>Shop for this item</h3>
              <button onClick={()=>setPopupItem(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"22px",color:"#aaa",lineHeight:1}}>×</button>
            </div>
            <p style={{fontSize:"13px",color:"#888",marginBottom:"16px"}}>"{popupItem}"</p>
            {[{name:"🛒 Amazon",url:`https://www.amazon.com/s?k=${encodeURIComponent(popupItem)}`,color:"#FF9900",bg:"#fff8ee"},{name:"🥾 REI (Outdoor & Travel)",url:`https://www.rei.com/search?q=${encodeURIComponent(popupItem)}`,color:"#5d8a26",bg:"#f3faea"},{name:"🌐 Google Shopping",url:`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(popupItem)}`,color:"#4285f4",bg:"#eef3ff"},{name:"🛍️ eBay",url:`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(popupItem)}`,color:"#e53238",bg:"#fff0f0"},{name:"💊 Boots (Health & Beauty)",url:`https://www.boots.com/search?term=${encodeURIComponent(popupItem)}`,color:"#00558a",bg:"#eef6ff"}].map(s=>(
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 13px",borderRadius:"11px",background:s.bg,marginBottom:"7px",textDecoration:"none",color:"#222",fontWeight:600,fontSize:"13px",border:"1.5px solid transparent"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=s.color}
                onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}>
                {s.name} <span style={{color:s.color,fontWeight:800}}>↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
