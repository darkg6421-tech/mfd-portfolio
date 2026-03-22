import { useState, useEffect, useCallback } from “react”;

// ─── SAMPLE DATA ─────────────────────────────────────────────────────────────
const ADMIN_CREDENTIALS = { email: “admin@mfdportfolio.com”, password: “admin123” };

const AMC_LIST = [“UTI”, “SBI”, “ABSL”, “HDFC”, “ICICI Pru”, “Mirae Asset”, “Axis”, “Kotak”, “Nippon”, “DSP”];

const FUND_COLORS = {
UTI: “#E63946”, SBI: “#2196F3”, ABSL: “#FF9800”, HDFC: “#4CAF50”,
“ICICI Pru”: “#9C27B0”, “Mirae Asset”: “#00BCD4”, Axis: “#FF5722”,
Kotak: “#795548”, Nippon: “#F44336”, DSP: “#607D8B”
};

const generateClients = () => {
const names = [
“Ramesh Sharma”,“Sunita Patel”,“Vikram Singh”,“Priya Gupta”,“Anil Kumar”,
“Meena Joshi”,“Suresh Yadav”,“Kavita Mehta”,“Rajesh Verma”,“Anjali Nair”,
“Deepak Tiwari”,“Pooja Agarwal”,“Manoj Mishra”,“Rekha Dubey”,“Santosh Roy”,
“Geeta Rao”,“Ravi Bhandari”,“Nisha Kapoor”,“Ashok Srivastava”,“Uma Pandey”,
“Dilip Chaudhary”,“Suman Das”,“Pramod Jain”,“Lalita Bajaj”,“Hemant Chopra”,
“Saroj Thakur”,“Vinod Malhotra”,“Champa Saxena”,“Kishore Kulkarni”,“Usha Bhatt”,
“Narayan Pillai”,“Savita Khatri”,“Jagdish Patil”,“Kamla Iyer”,“Bharat Shah”,
“Shanti Reddy”,“Govind Menon”,“Radha Krishnan”,“Mohan Shukla”,“Lata Desai”,
“Pankaj Ghosh”,“Mamta Sen”,“Dinesh Mukherjee”,“Sudha Banerjee”,“Harish Pandey”,
“Asha Rawat”,“Sanjay Chatterjee”,“Manju Biswas”,“Ramakant Bose”,“Ganga Devi”
];
const funds = [
{ name: “UTI Nifty 50 Index Fund”, amc: “UTI”, nav: 125.43, type: “Equity” },
{ name: “SBI Blue Chip Fund”, amc: “SBI”, nav: 67.82, type: “Equity” },
{ name: “ABSL Frontline Equity”, amc: “ABSL”, nav: 342.15, type: “Equity” },
{ name: “HDFC Mid-Cap Opportunities”, amc: “HDFC”, nav: 98.76, type: “Equity” },
{ name: “UTI Flexi Cap Fund”, amc: “UTI”, nav: 215.30, type: “Equity” },
{ name: “SBI Magnum Gilt Fund”, amc: “SBI”, nav: 55.20, type: “Debt” },
{ name: “ABSL Tax Relief 96”, amc: “ABSL”, nav: 480.60, type: “ELSS” },
{ name: “HDFC Balanced Advantage”, amc: “HDFC”, nav: 310.45, type: “Hybrid” },
{ name: “ICICI Pru Bluechip”, amc: “ICICI Pru”, nav: 88.32, type: “Equity” },
{ name: “Mirae Asset Large Cap”, amc: “Mirae Asset”, nav: 92.15, type: “Equity” },
];

return names.map((name, i) => {
const clientFunds = Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () =>
funds[Math.floor(Math.random() * funds.length)]
).filter((v, idx, arr) => arr.findIndex(x => x.name === v.name) === idx);

```
const sipDay = Math.floor(Math.random() * 28) + 1;
const sipDate = new Date();
sipDate.setDate(sipDay);

const investments = clientFunds.map(f => {
  const units = Math.random() * 500 + 50;
  const invested = Math.random() * 150000 + 10000;
  const sipAmount = [1000, 2000, 3000, 5000, 10000][Math.floor(Math.random() * 5)];
  const sipActive = Math.random() > 0.15;
  const startDate = new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1);
  const endMonths = Math.floor(Math.random() * 36) + 6;
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + endMonths);

  return {
    fund: f.name, amc: f.amc, type: f.type,
    nav: f.nav, units: parseFloat(units.toFixed(3)),
    invested: parseFloat(invested.toFixed(2)),
    sipAmount, sipActive, sipDay,
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    currentValue: parseFloat((units * f.nav).toFixed(2))
  };
});

const totalInvested = investments.reduce((s, x) => s + x.invested, 0);
const currentValue = investments.reduce((s, x) => s + x.currentValue, 0);

return {
  id: i + 1,
  name, email: `${name.toLowerCase().replace(/\s/g, ".")}@email.com`,
  password: "client123", phone: `98${Math.floor(Math.random() * 90000000 + 10000000)}`,
  pan: `ABCDE${1000 + i}F`, investments,
  totalInvested: parseFloat(totalInvested.toFixed(2)),
  currentValue: parseFloat(currentValue.toFixed(2)),
  gain: parseFloat((currentValue - totalInvested).toFixed(2)),
  gainPct: parseFloat(((currentValue - totalInvested) / totalInvested * 100).toFixed(2)),
  sipDay, joinDate: "2020-04-01"
};
```

});
};

const CLIENTS = generateClients();

// ─── NAV DATA (simulated AMFI) ────────────────────────────────────────────────
const NAV_DATA = {
“UTI Nifty 50 Index Fund”: 125.43,
“SBI Blue Chip Fund”: 67.82,
“ABSL Frontline Equity”: 342.15,
“HDFC Mid-Cap Opportunities”: 98.76,
“UTI Flexi Cap Fund”: 215.30,
“SBI Magnum Gilt Fund”: 55.20,
“ABSL Tax Relief 96”: 480.60,
“HDFC Balanced Advantage”: 310.45,
“ICICI Pru Bluechip”: 88.32,
“Mirae Asset Large Cap”: 92.15,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat(“en-IN”, { style: “currency”, currency: “INR”, maximumFractionDigits: 0 }).format(n);
const fmtN = (n) => new Intl.NumberFormat(“en-IN”).format(n);
const today = new Date();
const daysUntil = (d) => Math.ceil((new Date(d) - today) / (1000 * 60 * 60 * 24));

// ─── MINI CHART ───────────────────────────────────────────────────────────────
const Sparkline = ({ color = “#4CAF50”, positive = true }) => {
const points = Array.from({ length: 12 }, (_, i) => ({
x: i * 30,
y: 40 - (Math.random() * 20 + (positive ? i * 1.5 : -i * 1.5))
}));
const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(” “);
return (
<svg width="90" height="40" viewBox="0 0 330 50">
<path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
<circle cx={points[points.length-1].x} cy={points[points.length-1].y} r="4" fill={color} />
</svg>
);
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color = “#4CAF50”, icon, positive }) => (

  <div style={{
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8,
    backdropFilter: "blur(10px)", position: "relative", overflow: "hidden"
  }}>
    <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80,
      background: `radial-gradient(circle at 100% 0%, ${color}22 0%, transparent 70%)` }} />
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ color: "#888", fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "'DM Serif Display', serif" }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: positive === false ? "#F44336" : positive ? "#4CAF50" : "#888" }}>{sub}</div>}
    {positive !== undefined && <Sparkline color={positive ? "#4CAF50" : "#F44336"} positive={positive} />}
  </div>
);

// ─── SIP ALERT BADGE ─────────────────────────────────────────────────────────
const SIPBadge = ({ daysLeft }) => {
if (daysLeft < 0) return <span style={{ background: “#b71c1c22”, color: “#EF9A9A”, padding: “2px 10px”, borderRadius: 20, fontSize: 11 }}>Ended</span>;
if (daysLeft <= 30) return <span style={{ background: “#e65100aa”, color: “#FFCC02”, padding: “2px 10px”, borderRadius: 20, fontSize: 11 }}>⚠️ Ends in {daysLeft}d</span>;
return <span style={{ background: “#1b5e2022”, color: “#A5D6A7”, padding: “2px 10px”, borderRadius: 20, fontSize: 11 }}>Active</span>;
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
const [screen, setScreen] = useState(“login”); // login | admin | client
const [user, setUser] = useState(null);
const [loginEmail, setLoginEmail] = useState(””);
const [loginPass, setLoginPass] = useState(””);
const [loginErr, setLoginErr] = useState(””);
const [navData, setNavData] = useState(NAV_DATA);
const [navStatus, setNavStatus] = useState(“idle”); // idle | loading | done | error
const [adminTab, setAdminTab] = useState(“dashboard”);
const [clientSearch, setClientSearch] = useState(””);
const [selectedClient, setSelectedClient] = useState(null);
const [manualNav, setManualNav] = useState({ fund: “”, nav: “” });
const [showNavModal, setShowNavModal] = useState(false);
const [clients, setClients] = useState(CLIENTS);
const [navLastUpdated, setNavLastUpdated] = useState(null);
const [toast, setToast] = useState(null);

const showToast = (msg, type = “success”) => {
setToast({ msg, type });
setTimeout(() => setToast(null), 3000);
};

// ── LOGIN ──
const handleLogin = () => {
setLoginErr(””);
if (loginEmail === ADMIN_CREDENTIALS.email && loginPass === ADMIN_CREDENTIALS.password) {
setUser({ role: “admin”, name: “Admin (Father)” });
setScreen(“admin”);
return;
}
const client = clients.find(c => c.email === loginEmail && c.password === loginPass);
if (client) { setUser({ role: “client”, data: client }); setScreen(“client”); return; }
setLoginErr(“Invalid email or password. Please try again.”);
};

const handleLogout = () => { setUser(null); setScreen(“login”); setLoginEmail(””); setLoginPass(””); };

// ── AUTO NAV UPDATE ──
const fetchNavFromAMFI = useCallback(async () => {
setNavStatus(“loading”);
showToast(“Fetching NAV from AMFI…”, “info”);
// Simulate AMFI API call (real: https://www.amfiindia.com/spages/NAVAll.txt)
await new Promise(r => setTimeout(r, 2000));
const updated = {};
Object.keys(navData).forEach(k => {
updated[k] = parseFloat((navData[k] * (1 + (Math.random() * 0.04 - 0.015))).toFixed(2));
});
setNavData(updated);
setNavLastUpdated(new Date().toLocaleString(“en-IN”));
// Update client values
setClients(prev => prev.map(c => ({
…c,
investments: c.investments.map(inv => ({
…inv,
nav: updated[inv.fund] || inv.nav,
currentValue: parseFloat((inv.units * (updated[inv.fund] || inv.nav)).toFixed(2))
})),
currentValue: c.investments.reduce((s, inv) => s + inv.units * (updated[inv.fund] || inv.nav), 0),
gain: c.investments.reduce((s, inv) => s + inv.units * (updated[inv.fund] || inv.nav), 0) - c.totalInvested,
gainPct: parseFloat(((c.investments.reduce((s, inv) => s + inv.units * (updated[inv.fund] || inv.nav), 0) - c.totalInvested) / c.totalInvested * 100).toFixed(2))
})));
setNavStatus(“done”);
showToast(“✅ NAV updated successfully from AMFI!”, “success”);
}, [navData]);

const handleManualNavSave = () => {
if (!manualNav.fund || !manualNav.nav) return;
setNavData(prev => ({ …prev, [manualNav.fund]: parseFloat(manualNav.nav) }));
setNavLastUpdated(new Date().toLocaleString(“en-IN”));
showToast(`✅ NAV for ${manualNav.fund} updated manually!`);
setManualNav({ fund: “”, nav: “” });
setShowNavModal(false);
};

// ── DERIVED ──
const filteredClients = clients.filter(c =>
c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
c.pan.toLowerCase().includes(clientSearch.toLowerCase())
);

const totalAUM = clients.reduce((s, c) => s + c.currentValue, 0);
const totalInvested = clients.reduce((s, c) => s + c.totalInvested, 0);
const totalGain = totalAUM - totalInvested;

const todaySIPs = clients.filter(c => c.sipDay === today.getDate());
const sipsEndingSoon = clients.flatMap(c =>
c.investments.filter(inv => inv.sipActive && daysUntil(inv.endDate) >= 0 && daysUntil(inv.endDate) <= 60)
.map(inv => ({ clientName: c.name, …inv }))
);
const expiredSIPs = clients.flatMap(c =>
c.investments.filter(inv => daysUntil(inv.endDate) < 0)
.map(inv => ({ clientName: c.name, …inv }))
);

// ── AMC BREAKDOWN ──
const amcBreakdown = AMC_LIST.map(amc => ({
amc,
value: clients.flatMap(c => c.investments.filter(i => i.amc === amc)).reduce((s, i) => s + i.currentValue, 0),
clients: clients.filter(c => c.investments.some(i => i.amc === amc)).length
})).filter(a => a.value > 0);

// ─────────────────── STYLES ───────────────────────────────────────────────
const s = {
root: {
minHeight: “100vh”, background: “#0a0c14”,
fontFamily: “‘DM Sans’, sans-serif”, color: “#e8e8e8”,
},
loginWrap: {
minHeight: “100vh”, display: “flex”, alignItems: “center”, justifyContent: “center”,
background: “linear-gradient(135deg, #0a0c14 0%, #0d1117 50%, #0a1628 100%)”,
position: “relative”, overflow: “hidden”
},
loginCard: {
background: “rgba(255,255,255,0.04)”, backdropFilter: “blur(20px)”,
border: “1px solid rgba(255,255,255,0.1)”, borderRadius: 24,
padding: “48px 40px”, width: 380, position: “relative”, zIndex: 1
},
input: {
width: “100%”, padding: “14px 16px”, borderRadius: 12, border: “1px solid rgba(255,255,255,0.12)”,
background: “rgba(255,255,255,0.06)”, color: “#fff”, fontSize: 15,
outline: “none”, boxSizing: “border-box”, fontFamily: “inherit”, transition: “border 0.2s”
},
btn: {
width: “100%”, padding: “14px”, borderRadius: 12, border: “none”,
background: “linear-gradient(135deg, #1565C0, #0D47A1)”, color: “#fff”,
fontSize: 16, fontWeight: 700, cursor: “pointer”, letterSpacing: 0.5, transition: “opacity 0.2s”
},
nav: {
display: “flex”, alignItems: “center”, gap: 0, padding: “0 24px”,
background: “rgba(10,12,20,0.95)”, borderBottom: “1px solid rgba(255,255,255,0.07)”,
height: 60, position: “sticky”, top: 0, zIndex: 100, backdropFilter: “blur(20px)”
},
tabBtn: (active) => ({
padding: “8px 18px”, borderRadius: 8, border: “none”, cursor: “pointer”,
background: active ? “rgba(21,101,192,0.3)” : “transparent”,
color: active ? “#64B5F6” : “#888”, fontWeight: active ? 700 : 400,
fontSize: 13, transition: “all 0.2s”, fontFamily: “inherit”
}),
card: {
background: “rgba(255,255,255,0.04)”, border: “1px solid rgba(255,255,255,0.08)”,
borderRadius: 16, padding: 24, backdropFilter: “blur(10px)”
},
table: { width: “100%”, borderCollapse: “collapse” },
th: { padding: “12px 16px”, textAlign: “left”, color: “#666”, fontSize: 12,
fontFamily: “‘Space Mono’, monospace”, letterSpacing: 1, borderBottom: “1px solid rgba(255,255,255,0.06)” },
td: { padding: “14px 16px”, fontSize: 14, borderBottom: “1px solid rgba(255,255,255,0.04)” },
};

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
if (screen === “login”) return (
<div style={s.loginWrap}>
{/* BG blobs */}
{[”#1565C020”,”#0D47A115”,”#01579B18”].map((c, i) => (
<div key={i} style={{
position: “absolute”, borderRadius: “50%”,
width: [400,300,500][i], height: [400,300,500][i],
background: `radial-gradient(circle, ${c}, transparent)`,
top: [”-10%”,“60%”,“30%”][i], left: [“60%”,”-10%”,“40%”][i],
filter: “blur(60px)”, pointerEvents: “none”
}} />
))}
<div style={s.loginCard}>
<div style={{ textAlign: “center”, marginBottom: 36 }}>
<div style={{ fontSize: 42, marginBottom: 8 }}>📊</div>
<h1 style={{ margin: 0, fontSize: 26, fontFamily: “‘DM Serif Display’, serif”, color: “#fff” }}>MFD Portfolio</h1>
<p style={{ margin: “6px 0 0”, color: “#666”, fontSize: 14 }}>Mutual Fund Distributor Management</p>
</div>
<div style={{ display: “flex”, flexDirection: “column”, gap: 16 }}>
<input style={s.input} placeholder=“Email address” type=“email”
value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
onKeyDown={e => e.key === “Enter” && handleLogin()} />
<input style={s.input} placeholder=“Password” type=“password”
value={loginPass} onChange={e => setLoginPass(e.target.value)}
onKeyDown={e => e.key === “Enter” && handleLogin()} />
{loginErr && <div style={{ color: “#EF9A9A”, fontSize: 13, textAlign: “center” }}>{loginErr}</div>}
<button style={s.btn} onClick={handleLogin}>Login →</button>
<div style={{ textAlign: “center”, fontSize: 12, color: “#555”, marginTop: 8 }}>
Admin: admin@mfdportfolio.com / admin123<br />
Client: [client email] / client123
</div>
</div>
</div>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=Space+Mono&display=swap" rel="stylesheet" />
</div>
);

// ─── CLIENT SCREEN ────────────────────────────────────────────────────────
if (screen === “client”) {
const c = user.data;
const clientFromState = clients.find(x => x.id === c.id) || c;
return (
<div style={s.root}>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=Space+Mono&display=swap" rel="stylesheet" />
<nav style={s.nav}>
<span style={{ fontSize: 20, marginRight: 10 }}>📊</span>
<span style={{ fontWeight: 700, fontSize: 16, color: “#fff” }}>My Portfolio</span>
<div style={{ marginLeft: “auto”, display: “flex”, alignItems: “center”, gap: 16 }}>
<span style={{ color: “#888”, fontSize: 13 }}>👤 {clientFromState.name}</span>
<button onClick={handleLogout} style={{ …s.tabBtn(false), border: “1px solid rgba(255,255,255,0.1)” }}>Logout</button>
</div>
</nav>
<div style={{ maxWidth: 960, margin: “0 auto”, padding: “32px 20px” }}>
{/* Summary */}
<div style={{ display: “grid”, gridTemplateColumns: “repeat(auto-fit,minmax(200px,1fr))”, gap: 16, marginBottom: 28 }}>
<StatCard label="Current Value" value={fmt(clientFromState.currentValue)} icon="💼" color="#1565C0" positive={clientFromState.gain > 0} />
<StatCard label="Total Invested" value={fmt(clientFromState.totalInvested)} icon="💰" color="#FF9800" />
<StatCard label=“Total Gain/Loss” value={fmt(Math.abs(clientFromState.gain))}
sub={`${clientFromState.gain >= 0 ? "▲" : "▼"} ${Math.abs(clientFromState.gainPct)}%`}
icon={clientFromState.gain >= 0 ? “📈” : “📉”} color={clientFromState.gain >= 0 ? “#4CAF50” : “#F44336”} positive={clientFromState.gain >= 0} />
<StatCard label="Funds Held" value={clientFromState.investments.length} icon="🗂" color="#9C27B0" />
</div>

```
      {/* Investments table */}
      <div style={s.card}>
        <h3 style={{ margin: "0 0 20px", fontFamily: "'DM Serif Display', serif", fontSize: 20 }}>📋 My Investments</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={s.table}>
            <thead>
              <tr>
                {["Fund Name","AMC","Type","Units","NAV (₹)","Invested","Current Value","Gain/Loss","SIP","SIP Amt","Ends"].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientFromState.investments.map((inv, i) => {
                const liveNav = navData[inv.fund] || inv.nav;
                const curVal = inv.units * liveNav;
                const gain = curVal - inv.invested;
                const gainPct = (gain / inv.invested * 100).toFixed(2);
                const d = daysUntil(inv.endDate);
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                    <td style={s.td}>
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>{inv.fund}</div>
                    </td>
                    <td style={s.td}>
                      <span style={{ background: FUND_COLORS[inv.amc] + "33", color: FUND_COLORS[inv.amc], padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{inv.amc}</span>
                    </td>
                    <td style={{ ...s.td, color: "#aaa", fontSize: 12 }}>{inv.type}</td>
                    <td style={{ ...s.td, fontFamily: "'Space Mono', monospace", fontSize: 12 }}>{inv.units}</td>
                    <td style={{ ...s.td, fontFamily: "'Space Mono', monospace", color: "#64B5F6" }}>₹{liveNav}</td>
                    <td style={s.td}>{fmt(inv.invested)}</td>
                    <td style={{ ...s.td, fontWeight: 700 }}>{fmt(curVal)}</td>
                    <td style={{ ...s.td, color: gain >= 0 ? "#4CAF50" : "#F44336", fontWeight: 600 }}>
                      {gain >= 0 ? "+" : ""}{fmt(gain)}<br />
                      <span style={{ fontSize: 11 }}>{gain >= 0 ? "▲" : "▼"}{Math.abs(gainPct)}%</span>
                    </td>
                    <td style={s.td}>{inv.sipActive ? "✅ Active" : "❌ Inactive"}</td>
                    <td style={{ ...s.td, fontFamily: "'Space Mono', monospace" }}>₹{fmtN(inv.sipAmount)}</td>
                    <td style={s.td}><SIPBadge daysLeft={d} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIP Calendar */}
      <div style={{ ...s.card, marginTop: 20 }}>
        <h3 style={{ margin: "0 0 16px", fontFamily: "'DM Serif Display', serif", fontSize: 20 }}>📅 SIP Schedule</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {clientFromState.investments.filter(inv => inv.sipActive).map((inv, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{inv.amc}</div>
              <div style={{ fontSize: 12, color: "#ccc", marginBottom: 8, fontWeight: 600 }}>{inv.fund.split(" ").slice(0, 3).join(" ")}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#64B5F6", fontFamily: "'Space Mono', monospace" }}>
                {inv.sipDay}<span style={{ fontSize: 12, color: "#888" }}> of month</span>
              </div>
              <div style={{ fontSize: 13, color: "#4CAF50", fontWeight: 600, marginTop: 4 }}>₹{fmtN(inv.sipAmount)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
```

}

// ─── ADMIN SCREEN ─────────────────────────────────────────────────────────
const tabs = [“dashboard”, “clients”, “sip-tracker”, “nav-update”, “amc-view”];
const tabLabels = { dashboard: “📊 Dashboard”, clients: “👥 Clients”, “sip-tracker”: “📅 SIP Tracker”, “nav-update”: “📈 NAV Update”, “amc-view”: “🏦 AMC View” };

return (
<div style={s.root}>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=Space+Mono&display=swap" rel="stylesheet" />

```
  {/* TOAST */}
  {toast && (
    <div style={{
      position: "fixed", top: 20, right: 20, zIndex: 9999,
      background: toast.type === "success" ? "#1b5e20" : toast.type === "info" ? "#0D47A1" : "#b71c1c",
      color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)", animation: "slideIn 0.3s ease"
    }}>{toast.msg}</div>
  )}

  {/* NAV MODAL */}
  {showNavModal && (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...s.card, width: 420, border: "1px solid rgba(255,255,255,0.15)" }}>
        <h3 style={{ margin: "0 0 20px", fontFamily: "'DM Serif Display', serif" }}>✏️ Manual NAV Update</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <select style={{ ...s.input, appearance: "auto" }} value={manualNav.fund}
            onChange={e => setManualNav(p => ({ ...p, fund: e.target.value }))}>
            <option value="">Select Fund</option>
            {Object.keys(navData).map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <input style={s.input} type="number" step="0.01" placeholder="Enter NAV value"
            value={manualNav.nav} onChange={e => setManualNav(p => ({ ...p, nav: e.target.value }))} />
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={handleManualNavSave} style={{ ...s.btn, flex: 1 }}>Save NAV</button>
            <button onClick={() => setShowNavModal(false)} style={{ ...s.btn, flex: 1, background: "rgba(255,255,255,0.08)" }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* CLIENT DETAIL MODAL */}
  {selectedClient && (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div style={{ ...s.card, width: "100%", maxWidth: 820, border: "1px solid rgba(255,255,255,0.15)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: "'DM Serif Display', serif" }}>{selectedClient.name}</h2>
            <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>{selectedClient.email} · {selectedClient.pan}</p>
          </div>
          <button onClick={() => setSelectedClient(null)} style={{ ...s.tabBtn(false), fontSize: 20, padding: "4px 12px" }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          <StatCard label="Current Value" value={fmt(selectedClient.currentValue)} icon="💼" color="#1565C0" />
          <StatCard label="Total Invested" value={fmt(selectedClient.totalInvested)} icon="💰" color="#FF9800" />
          <StatCard label="Gain" value={fmt(Math.abs(selectedClient.gain))}
            sub={`${selectedClient.gain >= 0 ? "▲" : "▼"} ${Math.abs(selectedClient.gainPct)}%`}
            icon="📈" color={selectedClient.gain >= 0 ? "#4CAF50" : "#F44336"} positive={selectedClient.gain >= 0} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={s.table}>
            <thead>
              <tr>
                {["Fund","AMC","Units","NAV","Invested","Value","Gain","SIP Date","SIP Amt","Ends"].map(h => <th key={h} style={s.th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {selectedClient.investments.map((inv, i) => {
                const liveNav = navData[inv.fund] || inv.nav;
                const curVal = inv.units * liveNav;
                const gain = curVal - inv.invested;
                const d = daysUntil(inv.endDate);
                return (
                  <tr key={i}>
                    <td style={{ ...s.td, fontSize: 12, color: "#fff", fontWeight: 600 }}>{inv.fund}</td>
                    <td style={s.td}><span style={{ background: FUND_COLORS[inv.amc] + "33", color: FUND_COLORS[inv.amc], padding: "2px 8px", borderRadius: 20, fontSize: 11 }}>{inv.amc}</span></td>
                    <td style={{ ...s.td, fontFamily: "'Space Mono', monospace", fontSize: 12 }}>{inv.units}</td>
                    <td style={{ ...s.td, color: "#64B5F6", fontFamily: "'Space Mono', monospace" }}>₹{liveNav}</td>
                    <td style={s.td}>{fmt(inv.invested)}</td>
                    <td style={{ ...s.td, fontWeight: 700 }}>{fmt(curVal)}</td>
                    <td style={{ ...s.td, color: gain >= 0 ? "#4CAF50" : "#F44336" }}>
                      {gain >= 0 ? "+" : ""}{fmt(gain)}<br />
                      <span style={{ fontSize: 11 }}>{gain >= 0 ? "▲" : "▼"}{Math.abs((gain / inv.invested * 100).toFixed(1))}%</span>
                    </td>
                    <td style={{ ...s.td, fontFamily: "'Space Mono', monospace", fontSize: 12 }}>Day {inv.sipDay}</td>
                    <td style={{ ...s.td, color: "#4CAF50" }}>₹{fmtN(inv.sipAmount)}</td>
                    <td style={s.td}><SIPBadge daysLeft={d} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}

  {/* NAVBAR */}
  <nav style={s.nav}>
    <span style={{ fontSize: 20, marginRight: 10 }}>📊</span>
    <span style={{ fontWeight: 800, fontSize: 16, color: "#fff", marginRight: 24, fontFamily: "'DM Serif Display', serif" }}>MFD Portfolio</span>
    <div style={{ display: "flex", gap: 4 }}>
      {tabs.map(t => (
        <button key={t} style={s.tabBtn(adminTab === t)} onClick={() => setAdminTab(t)}>{tabLabels[t]}</button>
      ))}
    </div>
    <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
      {navLastUpdated && <span style={{ fontSize: 11, color: "#555" }}>NAV: {navLastUpdated}</span>}
      <button onClick={handleLogout} style={{ ...s.tabBtn(false), border: "1px solid rgba(255,255,255,0.1)" }}>Logout</button>
    </div>
  </nav>

  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px" }}>

    {/* ── DASHBOARD ── */}
    {adminTab === "dashboard" && (
      <div>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#fff" }}>Good morning, Admin 👋</h2>
          <p style={{ margin: "6px 0 0", color: "#666" }}>{today.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 28 }}>
          <StatCard label="Total AUM" value={fmt(totalAUM)} icon="🏦" color="#1565C0" positive={totalGain > 0} />
          <StatCard label="Total Invested" value={fmt(totalInvested)} icon="💰" color="#FF9800" />
          <StatCard label="Total Gain" value={fmt(Math.abs(totalGain))}
            sub={`${totalGain >= 0 ? "▲" : "▼"} ${Math.abs((totalGain / totalInvested * 100).toFixed(2))}%`}
            icon="📈" color={totalGain >= 0 ? "#4CAF50" : "#F44336"} positive={totalGain >= 0} />
          <StatCard label="Total Clients" value={clients.length} icon="👥" color="#9C27B0" />
          <StatCard label="Today's SIPs" value={todaySIPs.length} icon="📅" color="#00BCD4" />
          <StatCard label="SIPs Ending Soon" value={sipsEndingSoon.length} icon="⚠️" color="#FF5722" />
        </div>

        {/* Today's SIPs */}
        {todaySIPs.length > 0 && (
          <div style={{ ...s.card, marginBottom: 20, border: "1px solid rgba(0,188,212,0.3)" }}>
            <h3 style={{ margin: "0 0 16px", color: "#4DD0E1" }}>📅 Today's SIP Deductions ({todaySIPs.length} clients)</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {todaySIPs.map(c => (
                <div key={c.id} onClick={() => setSelectedClient(c)} style={{
                  background: "rgba(0,188,212,0.1)", border: "1px solid rgba(0,188,212,0.2)",
                  borderRadius: 10, padding: "10px 16px", cursor: "pointer", transition: "all 0.2s"
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {fmt(c.investments.filter(i => i.sipActive).reduce((s, i) => s + i.sipAmount, 0))} SIP today
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AMC Breakdown */}
        <div style={s.card}>
          <h3 style={{ margin: "0 0 20px", fontFamily: "'DM Serif Display', serif", fontSize: 20 }}>🏦 AUM by AMC</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
            {amcBreakdown.sort((a, b) => b.value - a.value).map(a => (
              <div key={a.amc} style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid ${FUND_COLORS[a.amc]}33`,
                borderRadius: 12, padding: 16
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: FUND_COLORS[a.amc] }}>{a.amc}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{a.clients} clients</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>{fmt(a.value)}</div>
                <div style={{ marginTop: 8, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${(a.value / totalAUM * 100).toFixed(0)}%`, background: FUND_COLORS[a.amc], borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{(a.value / totalAUM * 100).toFixed(1)}% of AUM</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* ── CLIENTS TAB ── */}
    {adminTab === "clients" && (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontFamily: "'DM Serif Display', serif" }}>👥 All Clients ({filteredClients.length})</h2>
          <input style={{ ...s.input, width: 280 }} placeholder="🔍 Search by name / email / PAN..."
            value={clientSearch} onChange={e => setClientSearch(e.target.value)} />
        </div>
        <div style={s.card}>
          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  {["Client","PAN","Phone","Funds","Invested","Current Value","Gain/Loss","SIP Day","Action"].map(h => <th key={h} style={s.th}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(c => (
                  <tr key={c.id} style={{ cursor: "pointer" }} onClick={() => setSelectedClient(c)}>
                    <td style={s.td}>
                      <div style={{ fontWeight: 600, color: "#fff" }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "#666" }}>{c.email}</div>
                    </td>
                    <td style={{ ...s.td, fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#aaa" }}>{c.pan}</td>
                    <td style={{ ...s.td, fontSize: 12, color: "#aaa" }}>{c.phone}</td>
                    <td style={{ ...s.td, textAlign: "center" }}>
                      <span style={{ background: "#1565C022", color: "#64B5F6", padding: "2px 10px", borderRadius: 20, fontWeight: 700 }}>{c.investments.length}</span>
                    </td>
                    <td style={s.td}>{fmt(c.totalInvested)}</td>
                    <td style={{ ...s.td, fontWeight: 700 }}>{fmt(c.currentValue)}</td>
                    <td style={{ ...s.td, color: c.gain >= 0 ? "#4CAF50" : "#F44336", fontWeight: 600 }}>
                      {c.gain >= 0 ? "+" : ""}{fmt(c.gain)}<br />
                      <span style={{ fontSize: 11 }}>{c.gain >= 0 ? "▲" : "▼"}{Math.abs(c.gainPct)}%</span>
                    </td>
                    <td style={{ ...s.td, fontFamily: "'Space Mono', monospace" }}>Day {c.sipDay}</td>
                    <td style={s.td} onClick={e => { e.stopPropagation(); setSelectedClient(c); }}>
                      <button style={{ background: "#1565C033", color: "#64B5F6", border: "1px solid #1565C055", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}

    {/* ── SIP TRACKER ── */}
    {adminTab === "sip-tracker" && (
      <div>
        <h2 style={{ margin: "0 0 24px", fontFamily: "'DM Serif Display', serif" }}>📅 SIP Tracker</h2>

        {/* Monthly calendar view */}
        <div style={{ ...s.card, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 16px" }}>📆 Monthly SIP Calendar</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} style={{ textAlign: "center", color: "#666", fontSize: 12, padding: "4px 0" }}>{d}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
              const daySIPs = clients.filter(c => c.sipDay === day);
              const isToday = day === today.getDate();
              return (
                <div key={day} style={{
                  background: isToday ? "rgba(21,101,192,0.3)" : daySIPs.length > 0 ? "rgba(76,175,80,0.1)" : "rgba(255,255,255,0.03)",
                  border: isToday ? "1px solid #1565C0" : daySIPs.length > 0 ? "1px solid rgba(76,175,80,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10, padding: "10px 6px", textAlign: "center", cursor: daySIPs.length > 0 ? "pointer" : "default"
                }}>
                  <div style={{ fontSize: 14, fontWeight: isToday ? 700 : 400, color: isToday ? "#64B5F6" : "#ccc" }}>{day}</div>
                  {daySIPs.length > 0 && <div style={{ fontSize: 10, color: "#4CAF50", marginTop: 2 }}>{daySIPs.length} SIPs</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ending soon */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: "#FFCC02" }}>⚠️ SIPs Ending in 60 Days ({sipsEndingSoon.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 340, overflowY: "auto" }}>
              {sipsEndingSoon.length === 0 && <div style={{ color: "#666" }}>No SIPs ending soon 🎉</div>}
              {sipsEndingSoon.map((s_, i) => (
                <div key={i} style={{ background: "rgba(255,152,0,0.08)", border: "1px solid rgba(255,152,0,0.2)", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontWeight: 600 }}>{s_.clientName}</div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>{s_.fund}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ color: "#4CAF50", fontWeight: 600 }}>₹{fmtN(s_.sipAmount)}/mo</span>
                    <SIPBadge daysLeft={daysUntil(s_.endDate)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: "#EF9A9A" }}>❌ Expired SIPs ({expiredSIPs.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 340, overflowY: "auto" }}>
              {expiredSIPs.length === 0 && <div style={{ color: "#666" }}>No expired SIPs</div>}
              {expiredSIPs.map((s_, i) => (
                <div key={i} style={{ background: "rgba(244,67,54,0.06)", border: "1px solid rgba(244,67,54,0.15)", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontWeight: 600 }}>{s_.clientName}</div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>{s_.fund}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ color: "#888" }}>₹{fmtN(s_.sipAmount)}/mo</span>
                    <span style={{ fontSize: 11, color: "#EF9A9A" }}>Ended: {s_.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ── NAV UPDATE ── */}
    {adminTab === "nav-update" && (
      <div>
        <h2 style={{ margin: "0 0 8px", fontFamily: "'DM Serif Display', serif" }}>📈 NAV Management</h2>
        <p style={{ margin: "0 0 24px", color: "#666" }}>Auto-fetch from AMFI or update manually per fund</p>

        <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <button onClick={fetchNavFromAMFI} disabled={navStatus === "loading"} style={{
            ...s.btn, width: "auto", padding: "14px 32px",
            background: navStatus === "loading" ? "#333" : "linear-gradient(135deg, #1565C0, #0D47A1)",
            opacity: navStatus === "loading" ? 0.7 : 1
          }}>
            {navStatus === "loading" ? "⏳ Fetching from AMFI..." : "🔄 Auto-Fetch NAV from AMFI"}
          </button>
          <button onClick={() => setShowNavModal(true)} style={{ ...s.btn, width: "auto", padding: "14px 32px", background: "rgba(255,255,255,0.08)" }}>
            ✏️ Manual NAV Update
          </button>
        </div>

        {navLastUpdated && (
          <div style={{ ...s.card, marginBottom: 20, border: "1px solid rgba(76,175,80,0.3)", background: "rgba(76,175,80,0.06)" }}>
            ✅ Last updated: <strong>{navLastUpdated}</strong> · All client portfolios reflect latest NAV
          </div>
        )}

        <div style={s.card}>
          <h3 style={{ margin: "0 0 20px" }}>Current NAV Values</h3>
          <table style={s.table}>
            <thead>
              <tr>
                {["Fund Name","AMC","NAV (₹)","Type","Action"].map(h => <th key={h} style={s.th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {Object.entries(navData).map(([fund, nav], i) => {
                const amc = fund.split(" ")[0];
                const amcKey = AMC_LIST.find(a => fund.includes(a)) || amc;
                return (
                  <tr key={i}>
                    <td style={{ ...s.td, fontWeight: 600, color: "#fff" }}>{fund}</td>
                    <td style={s.td}>
                      <span style={{ background: (FUND_COLORS[amcKey] || "#555") + "33", color: FUND_COLORS[amcKey] || "#aaa", padding: "3px 10px", borderRadius: 20, fontSize: 12 }}>{amcKey}</span>
                    </td>
                    <td style={{ ...s.td, fontFamily: "'Space Mono', monospace", color: "#64B5F6", fontWeight: 700 }}>₹{nav}</td>
                    <td style={{ ...s.td, color: "#aaa", fontSize: 12 }}>Equity</td>
                    <td style={s.td}>
                      <button onClick={() => { setManualNav({ fund, nav: nav.toString() }); setShowNavModal(true); }}
                        style={{ background: "#1565C033", color: "#64B5F6", border: "1px solid #1565C055", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12 }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* ── AMC VIEW ── */}
    {adminTab === "amc-view" && (
      <div>
        <h2 style={{ margin: "0 0 24px", fontFamily: "'DM Serif Display', serif" }}>🏦 AMC-wise Breakdown</h2>
        {amcBreakdown.sort((a, b) => b.value - a.value).map(amc => {
          const amcClients = clients.filter(c => c.investments.some(i => i.amc === amc.amc));
          return (
            <div key={amc.amc} style={{ ...s.card, marginBottom: 16, borderLeft: `4px solid ${FUND_COLORS[amc.amc] || "#555"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, color: FUND_COLORS[amc.amc], fontSize: 22, fontFamily: "'DM Serif Display', serif" }}>{amc.amc}</h3>
                  <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{amc.clients} clients · {(amc.value / totalAUM * 100).toFixed(1)}% of AUM</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>{fmt(amc.value)}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>Total AUM</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {amcClients.slice(0, 10).map(c => (
                  <div key={c.id} onClick={() => setSelectedClient(c)} style={{
                    background: (FUND_COLORS[amc.amc] || "#555") + "15", border: `1px solid ${(FUND_COLORS[amc.amc] || "#555")}33`,
                    borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13
                  }}>
                    {c.name} · {fmt(c.investments.filter(i => i.amc === amc.amc).reduce((s, i) => s + i.currentValue, 0))}
                  </div>
                ))}
                {amcClients.length > 10 && <div style={{ color: "#666", padding: "6px 14px", fontSize: 13 }}>+{amcClients.length - 10} more</div>}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>

  <style>{`
    @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
    * { box-sizing: border-box; }
    tr:hover { background: rgba(255,255,255,0.03) !important; }
  `}</style>
</div>
```

);
}
