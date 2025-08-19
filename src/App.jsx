
import React, { useState, useEffect } from 'react'

function Navbar({ menuOpen, setMenuOpen }){
  function handleNavClick(e, selector){
    e.preventDefault()
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#top" onClick={(e)=>handleNavClick(e,'#top')}>
          <svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="12" fill="#0ea5e9"/><path d="M8 38h26V22H16l-8 8v8z" fill="#fff"/><path d="M34 22h14l6 8v8H34z" fill="#e2e8f0"/><circle cx="18" cy="46" r="5" fill="#111827"/><circle cx="46" cy="46" r="5" fill="#111827"/></svg>
          <span>DPST TRUCKING INC</span>
        </a>
        <button className="hamburger" onClick={()=> setMenuOpen(v=>!v)} aria-expanded={menuOpen} aria-controls="mobile-menu">☰</button>
        <nav className={`nav-links ${menuOpen? 'open' : ''}`} id="mobile-menu">
          <a href="#services" onClick={(e)=>handleNavClick(e,'#services')}>Services</a>
          <a href="#why" onClick={(e)=>handleNavClick(e,'#why')}>Why Us</a>
          <a href="#testimonials" onClick={(e)=>handleNavClick(e,'#testimonials')}>Reviews</a>
          <a href="#track" onClick={(e)=>handleNavClick(e,'#track')}>Track</a>
          <a href="#quote" onClick={(e)=>handleNavClick(e,'#quote')} className="btn">Get a Quote</a>
          <a href="tel:+166144440000" className="btn btn-outline">Call</a>
          <a href="mailto:DIMMY_87@yahoo.co.in" className="btn btn-outline">Email</a>
        </nav>
      </div>
    </header>
  )
}

function Hero(){
  function goQuote(e){ e.preventDefault(); document.querySelector('#quote')?.scrollIntoView({behavior:'smooth'}) }
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <div className="pills"><span className="pill">Containers (FCL/LCL)</span><span className="pill">RoRo</span><span className="pill">Vehicles</span><span className="pill">Relocations</span></div>
          <h1>Welcome to <span style={{color:'var(--brand)'}}>DPST TRUCKING INC</span></h1>
          <p className="sub">Fast, secure international logistics with weekly sailings and expert paperwork.</p>
          <div style={{display:'flex', gap:'.6rem', flexWrap:'wrap'}}>
            <a className="btn" href="#quote" onClick={goQuote}>Get a Quote</a>
            <a className="btn btn-outline" href="https://wa.me/+166144440000" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="hero-card">
          <h2 style={{marginTop:0}}>Trusted by shippers worldwide</h2>
          <div className="kpis">
            <div className="kpi"><div>🚢</div><h3>12k+</h3><p>Containers</p></div>
            <div className="kpi"><div>🚗</div><h3>9k+</h3><p>Cars</p></div>
            <div className="kpi"><div>📦</div><h3>18 yrs</h3><p>Experience</p></div>
            <div className="kpi"><div>🏠</div><h3>4k+</h3><p>Relocations</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services(){
  const items = [
    { key:'FCL', title:'Ship a Container Overseas', desc:'Full container (FCL) with weekly sailings.', type:'Maritime Container', emoji:'🧱' },
    { key:'LCL', title:'Shared Container (LCL)', desc:'Shared space for cost‑effective shipping.', type:'LCL', emoji:'📦' },
    { key:'RoRo', title:'Roll On Roll Off (RoRo)', desc:'Vehicle transport without container.', type:'RoRo', emoji:'🛳️' },
    { key:'Vehicle', title:'Ship a Car Overseas', desc:'Door-to-port car shipping with compliance.', type:'Vehicle', emoji:'🚘' },
    { key:'Motorcycle', title:'Ship a Motorcycle Overseas', desc:'Crated motorcycle shipping.', type:'Motorcycle', emoji:'🏍️' },
    { key:'Relocation', title:'Household Relocations', desc:'Complete moving support.', type:'Household / Relocation', emoji:'🏠' },
  ]
  function startQuote(svc){
    window.dispatchEvent(new CustomEvent('prefillQuote', {
      detail: {
        commodity: svc.key === 'Vehicle' ? 'Vehicle' : (svc.key === 'Motorcycle' ? 'Motorcycle' : (svc.key === 'Relocation' ? 'Household / Relocation' : (svc.key === 'LCL' ? 'Shared Container (LCL)' : 'Container (FCL)'))),
        type: svc.type
      }
    }))
    document.querySelector('#quote')?.scrollIntoView({ behavior:'smooth' })
  }
  return (
    <section className="section" id="services">
      <div className="container">
        <h2>Core Services</h2>
        <div className="grid grid-3">
          {items.map((s,i)=> (
            <article className="card" key={i}>
              <div style={{fontSize:'20px'}}>{s.emoji}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="actions">
                <button className="btn btn-outline" onClick={()=>alert(`${s.title}\n\n${s.desc}`)}>Learn more</button>
                <button className="btn" onClick={()=>startQuote(s)}>Start a Quote</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Track(){
  const demoStatuses = [
    { step:'Booked', detail:'We have received your booking.' },
    { step:'At Origin', detail:'Cargo is at origin terminal.' },
    { step:'On Vessel', detail:'Vessel departed origin port.' },
    { step:'Arrived', detail:'Arrived at destination port.' },
    { step:'Ready for Pickup', detail:'Ready for pickup/clearance.' },
  ]
  const [id,setId] = useState('')
  const [status,setStatus] = useState(null)
  function onTrack(e){
    e.preventDefault()
    if(!id.trim()) return
    let sum=0; for(let i=0;i<id.length;i++) sum += id.charCodeAt(i)
    const idx = Math.min(demoStatuses.length-1, sum % demoStatuses.length)
    setStatus({ currentIndex: idx, current: demoStatuses[idx] })
  }
  return (
    <section className="section" id="track">
      <div className="container">
        <h2>Track Your Shipment (Demo)</h2>
        <div className="card">
          <form onSubmit={onTrack} style={{display:'flex', gap:'.6rem', flexWrap:'wrap'}}>
            <input className="input" placeholder="Enter Tracking ID (e.g., DPST12345)" value={id} onChange={e=>setId(e.target.value)} />
            <button className="btn">Check Status</button>
          </form>
          {status && (<div style={{marginTop:'.8rem'}}><div className="small">Tracking ID: <b>{id}</b></div><p><b>{status.current.step}</b> — {status.current.detail}</p></div>)}
        </div>
      </div>
    </section>
  )
}

function QuoteForm(){
  const [form, setForm] = useState({ name:'', phone:'', email:'', confirmEmail:'', commodity:'Container (FCL)', type:'Maritime Container', origin:'', destination:'', date:'', message:'' })
  const [status,setStatus] = useState(null)
  function onChange(e){ const {name,value} = e.target; setForm(p=>({...p,[name]:value})) }
  function onSubmit(e){
    e.preventDefault()
    if(form.email !== form.confirmEmail){ setStatus({type:'error', msg:'Email and Confirm Email must match.'}); return }
    if(!form.name || !form.email){ setStatus({type:'error', msg:'Please fill out required fields.'}); return }
    console.log('Quote Request:', form)
    setStatus({type:'ok', msg:'Thanks! We received your request. Our team will contact you shortly.'})
    e.currentTarget.reset()
  }
  useEffect(()=>{
    function handler(ev){ const { commodity, type } = ev.detail || {}; setForm(p=>({...p, commodity: commodity || p.commodity, type: type || p.type})) }
    window.addEventListener('prefillQuote', handler); return ()=> window.removeEventListener('prefillQuote', handler)
  }, [])
  return (
    <section className="section" id="quote">
      <div className="container">
        <h2>Get a Quote</h2>
        <form className="card" onSubmit={onSubmit} noValidate style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1rem'}}>
          <div><label className="small" htmlFor="name">Full Name</label><input className="input" id="name" name="name" onChange={onChange} placeholder="Jane Doe" required/></div>
          <div><label className="small" htmlFor="phone">Phone</label><input className="input" id="phone" name="phone" onChange={onChange} placeholder="66144440000"/></div>
          <div><label className="small" htmlFor="email">Email</label><input className="input" id="email" type="email" name="email" onChange={onChange} required placeholder="dpsttrucking2021@yahoo.com"/></div>
          <div><label className="small" htmlFor="confirmEmail">Confirm Email</label><input className="input" id="confirmEmail" type="email" name="confirmEmail" onChange={onChange} required placeholder="dpsttrucking2021@yahoo.com"/></div>
          <div><label className="small" htmlFor="commodity">Commodity</label><select id="commodity" name="commodity" onChange={onChange} defaultValue={form.commodity}><option>Container (FCL)</option><option>Shared Container (LCL)</option><option>Vehicle</option><option>Motorcycle</option><option>Household / Relocation</option><option>Other</option></select></div>
          <div><label className="small" htmlFor="type">Shipment Type</label><select id="type" name="type" onChange={onChange} defaultValue={form.type}><option>Maritime Container</option><option>LCL</option><option>RoRo</option><option>Air Freight</option></select></div>
          <div><label className="small" htmlFor="origin">Origin</label><input className="input" id="origin" name="origin" onChange={onChange} placeholder="e.g., Houston, TX"/></div>
          <div><label className="small" htmlFor="destination">Destination</label><input className="input" id="destination" name="destination" onChange={onChange} placeholder="e.g., Hamburg, DE"/></div>
          <div><label className="small" htmlFor="date">Expected Shipping Date</label><input className="input" id="date" type="date" name="date" onChange={onChange}/></div>
          <div style={{gridColumn:'1 / -1'}}><label className="small" htmlFor="message">Message</label><textarea id="message" className="input" name="message" onChange={onChange} placeholder="Tell us about your cargo..." /></div>
          {status && (<div className="small" style={{gridColumn:'1/-1', color: status.type==='error'?'var(--danger)':'var(--accent)'}}>{status.msg}</div>)}
          <div style={{gridColumn:'1 / -1', display:'flex', gap:'.6rem', justifyContent:'flex-end'}}>
            <a className="btn btn-outline" href="tel:+166144440000">Call</a>
            <a className="btn btn-outline" href="mailto:DIMMY_87@yahoo.co.in">Email</a>
            <a className="btn btn-outline" href="https://wa.me/+166144440000" target="_blank" rel="noreferrer">WhatsApp</a>
            <button className="btn">Submit Request</button>
          </div>
        </form>
      </div>
    </section>
  )
}

function Contact(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' })
  const [notice, setNotice] = useState(null)
  function onChange(e){ const {name,value} = e.target; setForm(p=>({...p,[name]:value})) }
  function onSubmit(e){ e.preventDefault(); if(!form.name || !form.email || !form.message){ setNotice({type:'error', msg:'Please fill required fields.'}); return } console.log('Contact message:', form); setNotice({type:'ok', msg:'Thanks! Your message has been received.'}); e.currentTarget.reset() }
  return (
    <section className="section" id="contact">
      <div className="container">
        <h2>Contact Us</h2>
        <div className="card">
          <p className="small"><b>Billing Address:</b> 3301 Areana Boulevard Apt 12, Sacramento, CA 95834</p>
          <p className="small"><b>Phone:</b> <a href="tel:66144440000">+166144440000</a></p>
          <p className="small"><b>Email:</b> <a href="mailto:dpsttrucking2021@yahoo.com">DIMMY_87@yahoo.co.in</a></p>
        </div>
        <form className="card" onSubmit={onSubmit} noValidate style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1rem', marginTop:'1rem'}}>
          <div><label className="small" htmlFor="cname">Your Name</label><input id="cname" className="input" name="name" onChange={onChange} required/></div>
          <div><label className="small" htmlFor="cemail">Email</label><input id="cemail" className="input" type="email" name="email" onChange={onChange} required/></div>
          <div><label className="small" htmlFor="cphone">Phone</label><input id="cphone" className="input" name="phone" onChange={onChange}/></div>
          <div style={{gridColumn:'1 / -1'}}><label className="small" htmlFor="cmsg">Message</label><textarea id="cmsg" className="input" name="message" onChange={onChange} required/></div>
          {notice && (<div className="small" style={{gridColumn:'1/-1', color: notice.type==='error'?'var(--danger)':'var(--accent)'}}>{notice.msg}</div>)}
          <div style={{gridColumn:'1 / -1', display:'flex', gap:'.6rem', justifyContent:'flex-end'}}>
            <a className="btn btn-outline" href="tel:66144440000">Call</a>
            <a className="btn btn-outline" href="mailto:DIMMY_87@yahoo.co.in">Email</a>
            <a className="btn btn-outline" href="https://wa.me/+166144440000" target="_blank" rel="noreferrer">WhatsApp</a>
            <button className="btn">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="footer">
      <div className="container" style={{display:'flex', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap'}}>
        <div className="brand"><svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="12" fill="#0ea5e9"/><path d='M8 38h26V22H16l-8 8v8z' fill='#fff'/><path d='M34 22h14l6 8v8H34z' fill='#e2e8f0'/><circle cx='18' cy='46' r='5' fill='#111827'/><circle cx='46' cy='46' r='5' fill='#111827'/></svg><span>DPST TRUCKING INC</span></div>
        <nav className="nav-links"><a href="#services">Services</a><a href="#why">Why Us</a><a href="#testimonials">Reviews</a><a href="#track">Track</a><a href="#quote">Quote</a><a href="#contact">Contact</a></nav>
        <p className="small">© {new Date().getFullYear()} DPST TRUCKING INC. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App(){
  const [menuOpen, setMenuOpen] = useState(false)
  return (<><Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><main onClick={()=> menuOpen && setMenuOpen(false)}><Hero/><Services/><Track/><QuoteForm/><Contact/></main><Footer/></>)
}
