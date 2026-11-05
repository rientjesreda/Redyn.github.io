import { useState } from 'react'
import './App.css'

const WEB3FORMS_ACCESS_KEY = 'f5aec498-7032-4b5e-aba4-7ceae3a0b994'
const CALENDLY_URL = 'https://calendly.com/redynzakelijk/30min'

const services = [
  { number: '01', icon: '↗', title: 'Websites die voor je werken', text: 'Een professionele website die jouw verhaal vertelt, vertrouwen opbouwt en bezoekers helpt klant te worden.', tags: ['Webdesign', 'Development', 'SEO-basis'] },
  { number: '02', icon: '⟳', title: 'Slimme automatiseringen', text: 'Laat terugkerende taken vanzelf lopen. Meer overzicht voor je bedrijf en meer tijd voor het werk dat ertoe doet.', tags: ['Workflows', 'E-mail', 'Koppelingen'] },
  { number: '03', icon: '✳', title: 'Alles werkt samen', text: 'Van aanvraag tot afspraak: we verbinden jouw website en tools tot een soepele ervaring voor jou en je klant.', tags: ['Formulieren', 'Afspraken', 'Integraties'] },
]

const concepts = [
  { style: 'salon', type: 'SALON · CONCEPT', name: 'Studio Maan', headline: <>Een moment<br />helemaal voor jou.</>, description: 'Een warme eerste indruk voor een salon waar persoonlijke aandacht centraal staat.', action: 'PLAN JE BEZOEK', mark: 'm.' },
  { style: 'install', type: 'INSTALLATIE · CONCEPT', name: 'Vonk techniek', headline: <>Goed geregeld.<br />Klaar voor morgen.</>, description: 'Een heldere website die lokale vakmensen helpt vertrouwen en aanvragen op te bouwen.', action: 'VRAAG EEN OFFERTE AAN', mark: 'V.' },
  { style: 'coach', type: 'COACHING · CONCEPT', name: 'Ruimte studio', headline: <>Meer ruimte<br />voor jouw groei.</>, description: 'Een rustige, persoonlijke uitstraling voor coaches en creatieve ondernemers.', action: 'ONTDEK DE MOGELIJKHEDEN', mark: 'r.' },
]

const steps = [
  { number: '01', title: 'Even kennismaken', text: 'Wat doe je, waar loop je tegenaan en wat wil je bereiken? We beginnen met een eerlijk gesprek.' },
  { number: '02', title: 'Een plan op maat', text: 'Je krijgt een helder voorstel met de juiste aanpak, concrete stappen en duidelijke afspraken.' },
  { number: '03', title: 'Samen aan de slag', text: 'Ik bouw, jij denkt mee. Na de oplevering weet je hoe alles werkt en kun je zelf vooruit.' },
]

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')
  const [formError, setFormError] = useState('')

  async function handleContactSubmit(event) {
    event.preventDefault()
    setFormStatus('sending')
    setFormError('')

    const form = event.currentTarget
    const formData = new FormData(form)
    if (!WEB3FORMS_ACCESS_KEY) {
      setFormStatus('error')
      setFormError('Het formulier is nog niet gekoppeld. Voeg eerst je Web3Forms Access Key toe.')
      return
    }
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12000)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || result.body?.message || 'Versturen is niet gelukt. Probeer het later nog eens.')
      }

      form.reset()
      setFormStatus('success')
    } catch (error) {
      setFormStatus('error')
      setFormError(error.name === 'AbortError'
        ? 'De e-maildienst reageert niet. Probeer het opnieuw of mail me rechtstreeks.'
        : error.message || 'Je bericht is niet verstuurd. Controleer je verbinding en mail me rechtstreeks.')
      console.error('Contactformulier verzenden mislukt:', error)
    } finally {
      window.clearTimeout(timeout)
    }
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Redyn, naar de startpagina"><img src={`${import.meta.env.BASE_URL}redyn-logo.png`} alt="Redyn — Websites & Automatisering" /></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Hoofdnavigatie">
          <a href="#diensten" onClick={() => setMenuOpen(false)}>Wat ik doe</a>
          <a href="#voorbeelden" onClick={() => setMenuOpen(false)}>Voorbeelden</a>
          <a href="#werkwijze" onClick={() => setMenuOpen(false)}>Werkwijze</a>
          <a className="nav-cta" href="#call" onClick={() => setMenuOpen(false)}>Plan een call <Arrow diagonal /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> WEBDESIGN & AUTOMATISERING</span>
            <h1>Jij runt je bedrijf.<br />Ik regel de <span className="highlight">digitale</span><br className="desktop-break" /> basis<span className="period">.</span></h1>
            <p className="hero-description">Een website die klanten aantrekt. Slimme automatiseringen die je tijd teruggeven. Alles op maat voor jouw onderneming.</p>
            <div className="hero-actions"><a className="button button-dark" href="#contact">Vertel me over je plannen <Arrow diagonal /></a><a className="text-link" href="#diensten">Ontdek wat ik voor je kan doen <Arrow /></a></div>
            <div className="hero-footnote"><div className="avatar-stack"><span>W</span><span>A</span><span>S</span></div><span>Persoonlijk contact. Korte lijnen.<br /><strong>Geen ingewikkeld gedoe.</strong></span></div>
          </div>
          <div className="hero-art" aria-label="Sfeervolle werkplek met laptop" role="img">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-note note-top"><span className="note-icon">↗</span><span><strong>Een sterkere online start</strong><small>op jouw voorwaarden</small></span></div>
            <div className="art-window"><div className="window-bar"><span /><span /><span /><span className="window-label">jouwbedrijf.nl</span></div><div className="window-content"><div className="window-brand">jouw<span>merk</span></div><div className="window-title">Goed werk.<br /><span>Een sterke eerste indruk.</span></div><div className="window-line" /><div className="window-button">ONTDEK MEER <Arrow diagonal /></div><div className="window-orb" /><div className="window-foot">STRATEGIE &nbsp;·&nbsp; DESIGN &nbsp;·&nbsp; GROEI</div></div></div>
            <div className="art-note note-bottom"><span className="note-spark">✳</span><span><strong>Meer tijd voor je vak</strong><small>de rest loopt vanzelf</small></span></div>
            <span className="art-caption">GOEDE IDEEËN VERDIENEN EEN GOEDE WEBSITE</span>
          </div>
          <a className="scroll-hint" href="#diensten"><span className="scroll-line" /> SCROLL OM TE ONTDEKKEN</a>
        </section>

        <div className="ticker" aria-label="Websites, automatisering, groei"><div className="ticker-track">{Array.from({ length: 4 }, (_, i) => <span key={i}>GOEDE WEBSITES <i>✳</i> SLIMME AUTOMATISERING <i>✳</i> MEER TIJD VOOR JOU <i>✳</i></span>)}</div></div>

        <section className="services section-pad" id="diensten">
          <div className="section-heading"><div><span className="eyebrow"><span className="section-index">01 /</span> WAT IK VOOR JE DOE</span><h2>Een goed bedrijf verdient<br />een <span className="serif-accent">sterke basis.</span></h2></div><p className="section-intro">Geen one-size-fits-all pakket. We kijken wat jouw bedrijf nodig heeft en bouwen iets dat écht bij je past.</p></div>
          <div className="service-list">{services.map((service) => <article className="service-card" key={service.number}><span className="service-number">{service.number} <i>—</i> DIENST</span><div className="service-icon">{service.icon}</div><div className="service-body"><h3>{service.title}</h3><p>{service.text}</p><div className="tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><a className="service-arrow" href="#contact" aria-label={`Meer weten over ${service.title}`}><Arrow diagonal /></a></article>)}</div>
        </section>

        <section className="portfolio section-pad" id="voorbeelden">
          <div className="section-heading"><div><span className="eyebrow"><span className="section-index">✳</span> IDEEËN VOOR JOUW WEBSITE</span><h2>Een paar mogelijke<br /><span className="serif-accent">richtingen.</span></h2></div><p className="section-intro">Elk bedrijf is anders. Deze demo’s laten zien hoe uitstraling en inhoud kunnen aansluiten bij jouw branche.</p></div>
          <div className="concept-grid">{concepts.map((concept) => <article className={`concept-card concept-${concept.style}`} key={concept.style}>
            <div className="concept-preview" aria-label={`Visueel demo-ontwerp voor ${concept.type.toLowerCase()}`}>
              <div className="concept-browser"><span /><span /><span /><small>voorbeeld.website</small></div>
              <div className="concept-site"><div className="concept-nav"><strong>{concept.name}</strong><span>OVER ONS　 DIENSTEN　 CONTACT</span></div><div className="concept-hero"><div className="concept-copy"><span className="concept-overline">{concept.type.split(' · ')[0]} · PERSOONLIJK & VAKKUNDIG</span><h3>{concept.headline}</h3><p>Een fijne ervaring begint met een eerste stap.</p><span className="concept-cta">{concept.action} <Arrow diagonal /></span></div><div className="concept-art"><span className="concept-art-mark">{concept.mark}</span><span className="concept-art-sun" /></div></div><div className="concept-bottom"><span>GOED WERK, MET AANDACHT GEMAAKT</span><span>↗</span></div></div>
            </div>
            <div className="concept-info"><span className="concept-label">{concept.type}</span><h3>{concept.name}</h3><p>{concept.description}</p></div>
          </article>)}</div>
          <p className="concept-disclaimer">Dit zijn fictieve voorbeelden om mogelijke stijlen te laten zien, geen klantprojecten.</p>
        </section>

        <section className="manifesto"><div className="manifesto-inner"><span className="eyebrow"><span className="section-index">02 /</span> KLEINER BEDRIJF, STERKE UITSTRALING</span><p>Je hoeft geen groot bedrijf te zijn om <span className="manifesto-mark">professioneel</span> voor de dag te komen. Je moet alleen laten zien wat jou goed maakt.</p><div className="manifesto-bottom"><span>GOED GEBOUWD. HELDER UITGELEGD. HELEMAAL VAN JOU.</span><span className="manifesto-star">✳</span></div></div></section>

        <section className="process section-pad" id="werkwijze"><div className="section-heading"><div><span className="eyebrow"><span className="section-index">03 /</span> HOE WE SAMENWERKEN</span><h2>Van eerste idee<br />naar <span className="serif-accent">lekker geregeld.</span></h2></div><p className="section-intro">Je hoeft niet precies te weten wat je nodig hebt. Daar komen we samen wel achter.</p></div><div className="steps">{steps.map((step) => <article className="step" key={step.number}><span className="step-number">{step.number}<i> ↗</i></span><h3>{step.title}</h3><p>{step.text}</p><div className="step-rule" /></article>)}</div></section>

        <section className="call-section" id="call"><div className="call-inner"><div className="call-copy"><span className="eyebrow"><span className="section-index">✳</span> GEWOON EVEN KENNISMAKEN</span><h2>Liever even<br /><span className="serif-accent">samen sparren?</span></h2><p>Plan een vrijblijvend gesprek en vertel me waar je mee bezig bent. Dan kijken we samen wat een goede volgende stap is.</p><a className="button button-dark" href={CALENDLY_URL || '#contact'} target={CALENDLY_URL ? '_blank' : undefined} rel={CALENDLY_URL ? 'noreferrer' : undefined}>{CALENDLY_URL ? 'Kies een moment in mijn agenda' : 'Vraag een kennismaking aan'} <Arrow diagonal /></a><span className="call-footnote">{CALENDLY_URL ? 'Je afspraak wordt direct in mijn agenda ingepland.' : 'Je kunt ook eerst een bericht sturen via het contactformulier.'}</span></div><div className="call-visual" aria-hidden="true"><span className="call-visual-orbit" /><div className="call-calendar"><span className="calendar-caption">EEN GOED GESPREK BEGINT MET</span><strong>een eerste<br /><i>kennismaking.</i></strong><span className="calendar-arrow">↗</span></div><span className="call-spark">✳</span></div></div></section>

        <section className="contact" id="contact"><div className="contact-inner"><span className="eyebrow"><span className="section-index">04 /</span> TIJD OM TE BEGINNEN?</span><h2>Jouw plan. Mijn<br /><span className="serif-accent">volgende project.</span></h2><p>Vertel me waar je aan denkt. Dan kijken we samen wat er mogelijk is. Vrijblijvend, en gewoon in begrijpelijke taal.</p>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row"><label>Je naam<input name="name" type="text" autoComplete="name" placeholder="Hoe mogen we je noemen?" required maxLength={100} /></label><label>Je e-mailadres<input name="email" type="email" autoComplete="email" placeholder="jij@voorbeeld.nl" required maxLength={254} /></label></div>
            <label>Waar kan ik je mee helpen?<textarea name="message" placeholder="Vertel kort iets over je idee of vraag…" required rows={4} maxLength={5000} /></label>
            <input type="hidden" name="subject" value="Nieuw bericht via de Redyn website" />
            <input className="form-honey" type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" />
            <div className="form-submit-row"><button className="button button-light" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Bericht wordt verstuurd…' : 'Verstuur je bericht'} <Arrow diagonal /></button><span className="form-feedback" aria-live="polite">{formStatus === 'success' && 'Bedankt! Je bericht is verstuurd. Ik neem snel contact met je op.'}{formStatus === 'error' && <>{formError} <a href="mailto:redynzakelijk@gmail.com">Open je e-mail</a>.</>}</span></div>
            <span className="form-privacy">Je gegevens worden via FormSubmit verwerkt om je bericht bij mij af te leveren.</span>
          </form>
          <span className="contact-note">KLEINE VRAAG OF GROOT IDEE — JE BENT WELKOM.</span><span className="contact-decoration" aria-hidden="true">r.</span></div></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#home" aria-label="Redyn, naar boven"><img src={`${import.meta.env.BASE_URL}redyn-logo.png`} alt="Redyn — Websites & Automatisering" /></a><span>Websites & slimme automatisering voor ondernemers.</span><a className="footer-top" href="#home">TERUG NAAR BOVEN ↑</a><span className="footer-copy">© {new Date().getFullYear()} REDYN</span></footer>
    </>
  )
}

export default App
