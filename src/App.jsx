import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

const referenceAsset = (name) => `/assets/reference/${name}`;
const officialAsset = (name) => `/assets/official/${name}`;
const generatedAsset = (name) => `/assets/generated/${name}`;
const orderUrl = 'https://wa.me/918089898999';

const menuItems = [
  { title: 'Biriyani', description: 'Fragrant rice, unforgettable taste.', image: 'menu-biriyani-hq.jpg', alt: 'Malabar biriyani with grilled chicken' },
  { title: 'Grills', description: 'Charcoal flavours that hit different.', image: 'menu-grill-hq.jpg', alt: 'Charcoal grilled chicken' },
  { title: 'Starters', description: 'Perfect to start your meal.', image: 'menu-starters-hq.jpg', alt: 'Spicy chicken starter' },
  { title: 'Shawarma', description: 'Juicy, flavour-packed and satisfying.', image: 'menu-shawarma-hq.jpg', alt: 'Chillies Rumali Shawarma' },
  { title: 'Rice Dishes', description: 'Comforting and delicious.', image: 'menu-rice-hq.jpg', alt: 'Fragrant rice dish' },
];

const locations = [
  { name: 'Wandoor', address: 'Nilambur Road, opposite bus stand', phone: '+918606186666', image: 'location-wandoor-new.png', source: 'generated', map: 'https://www.google.com/maps/place/Chillies+Restaurant/@11.2445001,76.2030182,966m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba63b1576ac3abf:0x8afab220bc63ce89!8m2!3d11.2445001!4d76.2030182!16s%2Fg%2F11t7k_2c0f?entry=ttu' },
  { name: 'Anchachavidi', address: 'Near high school, Anchachavidi', phone: '+918943608000', image: 'location-anchachavidi-new.png', source: 'generated', map: 'https://www.google.com/maps/place/Chillies+Restaurant+Anchachavidi/data=!4m2!3m1!1s0x0:0xf41500c0e16c0890' },
  { name: 'Pullikalodi', address: 'Main Road, Khadeeja Building', phone: '+917025222260', image: 'location-pullikalodi-new.png', source: 'generated', map: 'https://maps.google.com/?q=Chillies+Restaurant+Pullikalodi+Kerala' },
  { name: 'Thiruvalli', address: 'Near Thiruvalli Panchayat', phone: '+918089898999', image: 'location-thiruvali-color.png', source: 'generated', map: 'https://maps.google.com/?q=Chillies+Restaurant+near+Thiruvalli+Panchayat' },
];

const reviews = [
  { quote: '“Best biriyani in town! The flavour is just next level. Always a great experience. The ambience and service make it even better.”', name: 'Raseel A.', role: 'Regular Customer', image: 'customer-raseel.webp' },
  { quote: '“The food, ambience and service are all excellent. Perfect place for family and friends. Chillies never disappoints!”', name: 'Shahana P.', role: 'Food Lover', image: 'customer-shahana.webp' },
  { quote: '“Their grilled chicken is a must try. Consistent quality and amazing taste every time. Chillies always feels like home.”', name: 'Faisal K.', role: 'Regular Customer', image: 'customer-faisal.webp' },
];

function Arrow({ className = '', direction = 'right' }) {
  return <svg aria-hidden="true" className={`arrow${direction === 'left' ? ' arrow-left' : ''} ${className}`} viewBox="0 0 32 18" fill="none">
    <path d="M2 9h26m-8-7 8 7-8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function LineIcon({ name }) {
  const drawings = {
    utensils: <><path d="M7 2v8M4 2v5a3 3 0 0 0 6 0V2M7 10v12M17 2v20M17 2c-2 2-3 5-3 8h3" /></>,
    leaf: <><path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16Z"/><path d="M3 21c4-5 8-8 14-12"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2z"/><path d="M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1h-3"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    chilli: <><path d="M20 4c-3-1-5 1-7 3-2 2-4 3-8 3-2 0-3 2-2 4 2 4 7 6 11 3 3-2 4-6 6-10Z"/><path d="M5 10c0-2 1-4 3-5"/></>,
    heart: <path d="M20.8 8.7c0 5-8.8 11.3-8.8 11.3S3.2 13.7 3.2 8.7A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z"/>,
  };
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{drawings[name]}</svg>;
}

function WhatsAppIcon() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.1L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.4Z"/><path d="M8.4 8.3c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2 2 .3.2.5.2.7-.1l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1 .6-1.7.6-1 0-2.5-.5-4-1.8-1.5-1.3-2.6-3-2.8-4.2-.2-.8.1-1.4.7-2.1Z"/></svg>;
}

function InstagramIcon() {
  return <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>;
}

function BagIcon() {
  return <svg className="bag-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Chillies Restaurant home"><img src={officialAsset('chillies-logo.png')} alt="Chillies Restaurant" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = referenceAsset('logo-board.webp'); }} /></a>;
}

function Button({ children, href, variant = 'red', className = '', ...props }) {
  return <a className={`button button-${variant} ${className}`} href={href} {...props}>{children}</a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#top');
  const links = [['Home', '#top'], ['Menu', '#menu'], ['Our Story', '#story'], ['Locations', '#locations'], ['Contact', '#contact']];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map(([, href]) => document.querySelector(href)).filter(Boolean);
    if (!('IntersectionObserver' in window) || sections.length === 0) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.1, 0.25, 0.5] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="top">
      <Brand />
      <nav className={`main-nav${menuOpen ? ' open' : ''}`} id="main-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <a className={activeHref === href ? 'active' : ''} href={href} key={href} onClick={() => { setActiveHref(href); closeMenu(); }}>{label}</a>)}
      </nav>
      <Button href={orderUrl} className="header-order" target="_blank" rel="noreferrer"><WhatsAppIcon /> Order Now <Arrow /></Button>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-paper" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow" data-typewriter>Chillies Restaurant <i>·</i> Est. 2009</p>
        <h1 id="hero-title"><span className="hero-line"><span>Good</span></span><span className="hero-line">Food <em>Brings</em></span><span className="hero-line"><span>People</span></span><span className="hero-line"><span>Together<span className="red-dot">.</span></span></span></h1>
        <p className="hero-description">Experience the authentic taste of Kerala with our fragrant Malabar Dum Biriyani, charcoal-grilled favourites and much more.</p>
        <div className="hero-actions"><Button href={orderUrl} target="_blank" rel="noreferrer"><WhatsAppIcon /> Order Now <Arrow /></Button><a className="text-link" href="#menu">Explore Menu <span className="link-arrow"><Arrow /></span></a></div>
      </div>
      <div className="hero-visual" aria-label="Malabar dum biriyani served with charcoal-grilled chicken">
        <svg className="hero-brush" viewBox="0 0 820 760" preserveAspectRatio="none" aria-hidden="true"><path d="M118 112 C209 42 337 54 431 46 C554 36 671 64 734 145 C791 219 784 336 774 436 C764 545 738 628 645 664 C556 699 440 685 338 690 C224 695 122 701 65 633 C12 580 23 443 31 339 C39 237 37 174 118 112 Z" fill="#FFC414"/></svg>
        <img className="hero-brush-rim" data-ornament src={generatedAsset('yellow-brush-ring.png')} alt="" aria-hidden="true" />
        <span className="hero-food-shadow" aria-hidden="true" />
        <img className="hero-food" src={generatedAsset('hero-bucket-branded.png')} alt="Malabar biriyani and grilled chicken in a Chillies takeaway bucket" fetchPriority="high" />
        <div className="hero-note hero-note-malay" data-draw><span>Malabar</span><strong>Dum Biriyani</strong><svg viewBox="0 0 110 48" aria-hidden="true"><path d="M4 8c20 1 30 31 61 23 13-3 23-15 37-18m-3 0 13-3-6 12" /></svg></div>
        <div className="hero-note hero-note-taste" data-draw><span>Same Great Taste</span><strong>Always!</strong><svg viewBox="0 0 120 24" aria-hidden="true"><path d="M3 16c32-14 78-12 114-4" /></svg></div>
        <img className="hero-spice-doodle" data-ornament src={generatedAsset('star-anise-outline.png')} alt="" aria-hidden="true" />
      </div>
      <img className="hero-stamp" data-ornament src={referenceAsset('menu-food-stamp-transparent.png')} alt="Good food, good people" />
      <ul className="hero-side-list"><li><LineIcon name="utensils"/><span>Signature<br/>dishes</span></li><li><LineIcon name="leaf"/><span>Fresh<br/>ingredients</span></li><li><LineIcon name="users"/><span>Family<br/>friendly</span></li><li><LineIcon name="pin"/><span>Multiple<br/>locations</span></li></ul>
      <span className="hero-bottom-note">Authentic Kerala flavours · Since 2009</span>
    </section>
  );
}

function MenuSection() {
  const trackRef = useRef(null);
  const runwayRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  useEffect(() => {
    const track = trackRef.current;
    const runway = runwayRef.current;
    if (!track || !runway) return undefined;
    const desktop = window.matchMedia('(min-width: 761px)');
    if (!desktop.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const getCycleWidth = () => {
      const cards = [...track.querySelectorAll('.food-card')];
      return cards.length >= menuItems.length * 2
        ? cards[menuItems.length].getBoundingClientRect().left - cards[0].getBoundingClientRect().left
        : 0;
    };
    if (!getCycleWidth()) return undefined;
    const context = gsap.context(() => {
      gsap.fromTo(track, { x: 0 }, {
        x: () => -getCycleWidth(),
        ease: 'none',
        scrollTrigger: { trigger: runway, start: 'top 90%', end: 'bottom 10%', scrub: 0.75, invalidateOnRefresh: true },
      });
    }, runway);
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(track);
    const refreshAfterImages = [...track.querySelectorAll('img')].map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    });
    Promise.all(refreshAfterImages).then(() => ScrollTrigger.refresh());
    return () => {
      context.revert();
      observer.disconnect();
    };
  }, []);
  const scrollToCard = (index) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll('.food-card:not([data-loop-copy])')[index];
    if (!track || !card) return;
    const trackBounds = track.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    const cardCenter = cardBounds.left + cardBounds.width / 2;
    track.scrollTo({ left: track.scrollLeft + cardCenter - (trackBounds.left + track.clientWidth / 2), behavior: 'smooth' });
  };
  const moveCards = (direction) => scrollToCard(Math.max(0, Math.min(menuItems.length - 1, activeCard + direction)));

  return (
    <section className="menu-section section-paper" id="menu">
      <div className="menu-pin-runway" ref={runwayRef}><div className="menu-stage">
      <div className="section-heading menu-heading"><div data-reveal><p className="eyebrow" data-typewriter><i /> Our Menu <i /></p><h2>Flavours<br />for Every Mood<span className="red-dot">.</span></h2><p>From charcoal-grilled classics to comforting rice dishes,<br className="desktop-only" /> explore a menu made for every appetite.</p><Button href="https://chilliesgroup.com/menu.php">View Full Menu <Arrow /></Button></div><div className="menu-art" data-reveal><div className="hand-note">Real ingredients<br/><strong>Real taste!</strong><svg viewBox="0 0 130 32" aria-hidden="true" data-draw><path d="M3 20c36-18 79-18 120-8m-8 0 10-1-4 10"/></svg></div><img className="menu-stamp" data-ornament src={referenceAsset('menu-food-stamp-transparent.png')} alt="Good food, good people" /></div></div>
      <div className="menu-carousel menu-train"><button className="carousel-arrow carousel-prev" onClick={() => moveCards(-1)} aria-label="Previous menu categories"><Arrow direction="left" /></button><div className="food-grid" ref={trackRef} onScroll={(event) => { const track = event.currentTarget; const center = track.getBoundingClientRect().left + track.clientWidth / 2; const cards = [...track.querySelectorAll('.food-card')]; const nearest = cards.reduce((bestIndex, card, index) => Math.abs(card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - center) < Math.abs(cards[bestIndex].getBoundingClientRect().left + cards[bestIndex].getBoundingClientRect().width / 2 - center) ? index : bestIndex, 0); setActiveCard(nearest % menuItems.length); }}>
        {[0, 1, 2, 3].flatMap((copy) => menuItems.map((item, i) => <a className="food-card" href="https://chilliesgroup.com/menu.php" key={`${copy}-${item.title}`} data-loop-copy={copy !== 1 ? 'true' : undefined} aria-hidden={copy !== 1} tabIndex={copy !== 1 ? -1 : 0} data-reveal={copy === 1 ? '' : undefined} style={{ '--reveal-order': i }}><img src={item.source ? officialAsset(item.source) : referenceAsset(item.image)} alt={copy === 1 ? item.alt : ''} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = referenceAsset(item.image); }} /><div className="food-info"><h3>{item.title}</h3><p>{item.description}</p><span className="round-arrow"><Arrow /></span></div></a>))}
      </div><button className="carousel-arrow carousel-next" onClick={() => moveCards(1)} aria-label="Next menu categories"><Arrow /></button><div className="carousel-dots" aria-label="Menu category pages">{menuItems.map((item, i) => <button key={item.title} className={activeCard === i ? 'active' : ''} aria-label={`Show ${item.title}`} onClick={() => scrollToCard(i)} />)}</div></div>
      </div></div>
      <div className="signature-band"><img data-reveal src={generatedAsset('hero-biryani.webp')} alt="Malabar Dum Biriyani with fresh accompaniments" loading="lazy" decoding="async"/><div data-reveal><p className="eyebrow" data-typewriter>Signature Dish</p><h2>Malabar<br />Dum <em>Biriyani</em></h2><p>A perfect blend of aromatic rice, tender meat<br className="desktop-only" /> and authentic spices — a taste that keeps<br className="desktop-only" /> bringing you back.</p><Button href="https://chilliesgroup.com/menu.php" variant="light">Explore Biriyani <Arrow /></Button></div><div className="signature-art" aria-hidden="true"><div className="signature-art-group"><img className="signature-art-image botanical-art" src={generatedAsset('botanical-sprig.png')} alt=""/><img className="signature-art-image leaf-art" src={generatedAsset('heart-leaf-outline.png')} alt=""/></div><span>The taste<br/><b>that stays</b></span></div></div>
    </section>
  );
}

function StorySection() {
  const values = [['leaf', 'Quality', 'ingredients'], ['chilli', 'Authentic', 'flavours'], ['users', 'Hygienic', 'preparation'], ['sun', 'Warm', 'ambience']];
  const history = [['2009', 'First branch opens in Wandoor'], ['2019', 'Treatley fine dining opens'], ['2020', 'Cloud kitchen opens in Anchachavidi'], ['2021', 'Cloud kitchen becomes a fine dining restaurant'], ['2022', 'New launch at Pullikalodi'], ['2026', 'New launch at Diwali']];
  return (
    <section className="story-section section-paper" id="story">
      <div className="story-intro" data-reveal><p className="eyebrow" data-typewriter><i /> Why Chillies <i /></p><h2>More Than<br />Just a Meal<span className="red-dot">.</span></h2><p>Good food is always better when shared. At Chillies, we bring people together with flavours that feel like home.</p><div className="values">{values.map(([icon, title, detail]) => <span key={title}><LineIcon name={icon}/><span>{title}<br/>{detail}</span></span>)}</div></div>
      <div className="story-photo-wrap" data-reveal><img src={generatedAsset('grilled-chicken.webp')} alt="Charcoal-grilled chicken prepared with fresh herbs and spices" loading="lazy" decoding="async"/></div>
      <div className="story-bottom"><div className="story-bottom-photo" data-reveal><img src={generatedAsset('restaurant-interior.webp')} alt="Warmly lit Chillies restaurant dining room" loading="lazy" decoding="async"/></div><div className="story-bottom-copy" data-reveal><p className="eyebrow" data-typewriter>Our Story</p><h2>A Journey<br />of Great Food.</h2><p>From a single restaurant in 2009 to a growing family of locations, Chillies has always been about great food and the people who bring it to the table.</p><Button href="https://chilliesgroup.com/about.php" variant="dark">Discover Our Story <Arrow /></Button></div><div className="timeline" data-reveal>{history.map(([year, text]) => <p key={year}><b>{year}</b><span>{text}</span></p>)}</div></div>
    </section>
  );
}

function LocationsSection() {
  const trackRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState(0);
  const locationCount = locations.length;
  const scrollToLocation = (index) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll('.location-card')[index];
    if (!track || !card) return;
    const trackBounds = track.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    const cardCenter = cardBounds.left + cardBounds.width / 2;
    track.scrollTo({ left: track.scrollLeft + cardCenter - (trackBounds.left + track.clientWidth / 2), behavior: 'smooth' });
  };
  const moveLocations = (direction) => scrollToLocation(Math.max(0, Math.min(locationCount - 1, activeLocation + direction)));

  return (
    <section className="locations-section section-paper" id="locations">
      <div className="locations-heading">
        <div data-reveal>
          <p className="eyebrow" data-typewriter><i /> Our Locations <i /></p>
          <h2>Good Food,<br />Closer to <em>You.</em></h2>
          <p>Visit one of our locations, check the details<br className="desktop-only"/> and get directions or call to order.</p>
        </div>
        <div className="locations-art" aria-hidden="true">
          <div className="locations-art-cluster">
            <img className="locations-sprig" src={generatedAsset('botanical-sprig.png')} alt=""/>
            <img className="locations-leaf" src={generatedAsset('heart-leaf-outline.png')} alt=""/>
            <img className="locations-chilli" src={generatedAsset('chilli-outline.png')} alt=""/>
            <img className="locations-spice" src={generatedAsset('star-anise-outline.png')} alt=""/>
          </div>
          <svg className="locations-route" viewBox="0 0 160 40" fill="none" data-draw>
            <path d="M4 30C36 8 68 8 92 24s48 18 64-10m-10 2 10-2-4 10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="92" cy="24" r="3.5" fill="#cf1028" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span className="locations-art-note">Serving 4 Hubs <i>✦</i></span>
        </div>
        <div className="map-note" data-reveal>Authentic flavours<br /><b>across Kerala</b></div>
      </div>
      <div className="location-carousel"><button className="carousel-arrow carousel-prev" onClick={() => moveLocations(-1)} aria-label="Previous locations"><Arrow direction="left" /></button><div className="location-grid" ref={trackRef} onScroll={(event) => { const track = event.currentTarget; const center = track.getBoundingClientRect().left + track.clientWidth / 2; const cards = [...track.querySelectorAll('.location-card')]; const nearest = cards.reduce((bestIndex, card, index) => Math.abs(card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - center) < Math.abs(cards[bestIndex].getBoundingClientRect().left + cards[bestIndex].getBoundingClientRect().width / 2 - center) ? index : bestIndex, 0); setActiveLocation(nearest); }}>{locations.map((place, i) => <article className="location-card" data-reveal style={{ '--reveal-order': i }} key={place.name}><img src={place.source === 'generated' ? generatedAsset(place.image) : referenceAsset(place.image)} alt={`Chillies ${place.name} restaurant`} loading="lazy" decoding="async"/><div className="location-info"><h3>{place.name}</h3><p>{place.address}</p><div><a href={`tel:${place.phone}`}>☎&nbsp; Call</a><a href={place.map} target="_blank" rel="noreferrer">📍&nbsp; Directions</a></div></div></article>)}</div><button className="carousel-arrow carousel-next" onClick={() => moveLocations(1)} aria-label="Next locations"><Arrow /></button><div className="carousel-dots" aria-label="Location pages">{Array.from({ length: locationCount }, (_, i) => <button key={i} className={activeLocation === i ? 'active' : ''} aria-label={`Show location ${i + 1}`} onClick={() => scrollToLocation(i)} />)}</div></div>
      <div className="locations-ribbon"><img src={referenceAsset('location-sketch.webp')} alt="Hand-drawn Chillies storefront illustration from the design" loading="lazy" decoding="async"/><span>Great food<br /><b>in more places.</b></span><i><LineIcon name="pin"/>Strategic<br/>locations</i><i><LineIcon name="users"/>Easy<br/>accessibility</i><i><LineIcon name="utensils"/>Same great<br/>taste</i><i><LineIcon name="heart"/>A growing<br/>family</i></div>
    </section>
  );
}

function ReviewsSection() {
  const trackRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const updateOverflow = () => setHasOverflow(track.scrollWidth > track.clientWidth + 1);
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(track);
    updateOverflow();
    return () => observer.disconnect();
  }, []);

  const moveReviews = () => {
    const track = trackRef.current;
    const card = track?.querySelector('.review-card');
    if (card) track.scrollBy({ left: card.getBoundingClientRect().width + 14, behavior: 'smooth' });
  };
  return <section className={`reviews-section${hasOverflow ? ' has-review-overflow' : ''}`}><div className="review-intro" data-reveal><p className="eyebrow" data-typewriter>What our customers say</p><h2>Flavours That<br />Create <em>Memories.</em></h2><p>From first visits to lifelong favourites,<br /> our guests share what makes Chillies special.</p></div><div className="review-track" id="review-track" ref={trackRef}>{reviews.map(review => <article className="review-card" key={review.name} data-reveal><div className="stars">★★★★★ <span>”</span></div><p>{review.quote}</p><div className="reviewer"><img src={referenceAsset(review.image)} alt="" loading="lazy" decoding="async"/><b>{review.name}<small>{review.role}</small></b></div></article>)}</div>{hasOverflow && <button className="review-next" aria-label="Show next reviews" onClick={moveReviews}>→</button>}</section>;
}

function Footer() {
  const [signupStatus, setSignupStatus] = useState('Opens your email app to send your request.');
  const requestUpdates = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    const subject = encodeURIComponent('Chillies Restaurant updates');
    const body = encodeURIComponent(`Please add ${email} to your updates list.`);
    window.location.href = `mailto:chillieswdr@gmail.com?subject=${subject}&body=${body}`;
    setSignupStatus('Your email app should open with a draft addressed to Chillies.');
    event.currentTarget.reset();
  };

  return <footer id="contact"><section className="footer-cta"><div data-reveal><h2>Hungry?<br/>Let’s Get You<br/>Something <em>Great.</em></h2><p>Call us or order through WhatsApp for a quick<br className="desktop-only"/> and delicious experience. Great food is always<br className="desktop-only"/> just a few clicks away.</p><div className="footer-actions"><Button href={orderUrl} target="_blank" rel="noreferrer"><BagIcon /> Order Now <Arrow /></Button><Button href={orderUrl} variant="outline" target="_blank" rel="noreferrer"><WhatsAppIcon /> Chat on WhatsApp <Arrow /></Button></div></div><img src={generatedAsset('hero-biryani.webp')} alt="A freshly prepared biriyani spread" loading="lazy" decoding="async" data-reveal/></section>
    <div className="footer-main"><div className="footer-brand"><Brand /><p>Authentic flavours. Great food. Good people.</p><div className="socials"><a href="https://instagram.com/" aria-label="Follow Chillies on Instagram" target="_blank" rel="noreferrer"><InstagramIcon /></a><a href="https://facebook.com/chillies_restaurant_" aria-label="Chillies on Facebook" target="_blank" rel="noreferrer">f</a><a href={orderUrl} aria-label="Chillies on WhatsApp" target="_blank" rel="noreferrer"><WhatsAppIcon /></a><a href="https://maps.google.com/?q=Chillies+Restaurant+Wandoor" aria-label="Chillies on Maps" target="_blank" rel="noreferrer"><LineIcon name="pin" /></a></div></div><div className="footer-links"><h3>Quick Links</h3><a href="#top">Home</a><a href="#menu">Our Menu</a><a href="#story">Our Story</a><a href="#locations">Locations</a><a href="#contact">Contact</a></div><div className="footer-locations"><h3>Our Locations</h3><p>📍 &nbsp;Wandoor <small>Nilambur Road, opposite bus stand</small></p><p>📍 &nbsp;Anchachavidi <small>Near high school</small></p><p>📍 &nbsp;Pullikalodi <small>Main Road, Khadeeja Building</small></p><p>📍 &nbsp;Thiruvalli <small>Near Thiruvalli Panchayat</small></p></div><div className="footer-news"><h3>Stay Updated</h3><p>Get the latest updates, special offers<br/> and new dishes straight to your inbox.</p><form onSubmit={requestUpdates}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" placeholder="Enter your email address" autoComplete="email" required/><button type="submit" aria-label="Request email updates"><Arrow /></button></form><small role="status">{signupStatus}</small></div></div><div className="footer-bottom"><span>© 2026 Chillies Restaurant. All rights reserved.</span><span>Made with <b>♥</b> for food lovers</span></div>
  </footer>;
}

function useScrollMotion() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;
    if (!prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ autoRaf: false, duration: 1.2, smoothWheel: true, wheelMultiplier: 0.82, touchMultiplier: 1.1 });
      lenisRef.current = lenis;
    }
    const onSectionLink = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      let target;
      try { target = hash && document.querySelector(decodeURIComponent(hash)); } catch { return; }
      if (!target) return;
      event.preventDefault();
      const headerOffset = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
      if (lenis) {
        lenis.scrollTo(target, { offset: hash === '#top' ? 0 : -headerOffset, duration: 0.9 });
      } else {
        const top = hash === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      window.history.pushState(null, '', hash);
    };
    document.addEventListener('click', onSectionLink);
    const tick = lenis ? (time) => lenis.raf(time * 1000) : null;
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const context = lenis ? gsap.context(() => {
      gsap.from(['.hero .eyebrow', '.hero-description', '.hero-actions'], {
        autoAlpha: 0, y: 34, duration: 1.15, stagger: 0.18, ease: 'power4.out', delay: 0.14,
      });
      gsap.from('.hero-line > *', {
        yPercent: 120, duration: 1.05, stagger: 0.14, ease: 'power4.out', delay: 0.2,
      });

      // Side list items stagger in from left
      gsap.from('.hero-side-list li', {
        autoAlpha: 0, x: -22, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.6,
      });

      // Hero bottom note fade in
      gsap.from('.hero-bottom-note', {
        autoAlpha: 0, y: 10, duration: 0.8, ease: 'power3.out', delay: 0.85,
      });

      gsap.utils.toArray('[data-draw]').forEach((drawing) => {
        const paths = [...drawing.querySelectorAll('path')];
        gsap.fromTo(paths, {
          strokeDasharray: (_, path) => `${path.getTotalLength()} ${path.getTotalLength()}`,
          strokeDashoffset: (_, path) => path.getTotalLength(),
        }, {
          strokeDashoffset: 0, duration: 1.05, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: drawing, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray('[data-reveal]').forEach((item) => {
        gsap.fromTo(item, { autoAlpha: 0, y: 44 }, {
          autoAlpha: 1, y: 0, duration: 1.05, delay: Number(item.style.getPropertyValue('--reveal-order') || 0) * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 91%', once: true, invalidateOnRefresh: true },
        });
      });

      gsap.utils.toArray('[data-typewriter]').forEach((target) => {
        if (!target.classList.contains('typewriter-split')) {
          const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
          const textNodes = [];
          while (walker.nextNode()) {
            if (walker.currentNode.nodeValue.length) textNodes.push(walker.currentNode);
          }
          textNodes.forEach((textNode) => {
            const fragment = document.createDocumentFragment();
            [...textNode.nodeValue].forEach((character) => {
              if (/\s/.test(character)) fragment.append(document.createTextNode(character));
              else {
                const letter = document.createElement('span');
                letter.className = 'typing-char';
                letter.textContent = character;
                fragment.append(letter);
              }
            });
            textNode.replaceWith(fragment);
          });
          target.classList.add('typewriter-split');
        }
        gsap.fromTo(target.querySelectorAll('.typing-char'), { autoAlpha: 0 }, {
          autoAlpha: 1,
          duration: 0.02,
          stagger: 0.032,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: target, start: 'top 94%', once: true },
        });
      });

      gsap.utils.toArray('main h2, .footer-cta h2').forEach((heading) => {
        if (!heading.classList.contains('words-split')) {
          const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
          const textNodes = [];
          while (walker.nextNode()) {
            if (walker.currentNode.nodeValue.trim()) textNodes.push(walker.currentNode);
          }
          textNodes.forEach((textNode) => {
            const fragment = document.createDocumentFragment();
            textNode.nodeValue.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) fragment.append(document.createTextNode(part));
              else {
                const word = document.createElement('span');
                word.className = 'heading-word';
                word.textContent = part;
                fragment.append(word);
              }
            });
            textNode.replaceWith(fragment);
          });
          heading.classList.add('words-split');
        }
        const words = heading.querySelectorAll('.heading-word');
        gsap.fromTo(words, { yPercent: 120, autoAlpha: 0 }, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.78,
          stagger: 0.05,
          ease: 'power4.out',
          immediateRender: false,
          scrollTrigger: { trigger: heading, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray('.menu-heading > div:first-child > p:not(.eyebrow), .story-intro > p:not(.eyebrow), .story-bottom-copy > p:not(.eyebrow), .locations-heading > div:first-child > p:not(.eyebrow), .review-intro > p:not(.eyebrow), .instagram-section > div:first-child > p:not(.eyebrow)').forEach((paragraph, index) => {
        gsap.fromTo(paragraph, { autoAlpha: 0, y: 18, clipPath: 'inset(0 0 100% 0)' }, {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.95,
          delay: (index % 3) * 0.09,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: paragraph, start: 'top 91%', once: true },
        });
      });

      gsap.utils.toArray('[data-ornament]').forEach((item, index) => {
        const direction = index % 2 === 0 ? '100% 0 0 0' : '0 100% 0 0';
        gsap.fromTo(item, {
          autoAlpha: 0,
          clipPath: `inset(${direction})`,
          y: 12,
          scale: 0.96,
        }, {
          autoAlpha: 1,
          clipPath: 'inset(0 0 0 0)',
          y: 0,
          scale: 1,
          duration: 1.4,
          delay: (index % 4) * 0.22,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray('.hero-actions .text-link > span, .hero-actions .button .arrow, .carousel-arrow, .food-card:not([data-loop-copy]) .round-arrow').forEach((arrow, index) => {
        gsap.fromTo(arrow, { autoAlpha: 0, scale: 0.72, y: 8 }, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: (index % 5) * 0.12,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: arrow, start: 'top 90%', once: true },
        });
      });

      // Eyebrow labels slide in with a scale and clip animation
      gsap.utils.toArray('.menu-heading .eyebrow, .story-intro .eyebrow, .story-bottom-copy .eyebrow, .locations-heading .eyebrow, .review-intro .eyebrow, .signature-band .eyebrow, .footer-cta .eyebrow').forEach((eyebrow) => {
        gsap.fromTo(eyebrow, { autoAlpha: 0, x: -18, clipPath: 'inset(0 100% 0 0)' }, {
          autoAlpha: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: eyebrow, start: 'top 92%', once: true },
        });
      });

      // Value icons in the story section pop in with scale
      gsap.utils.toArray('.values > span').forEach((item, index) => {
        gsap.fromTo(item, { autoAlpha: 0, y: 20, scale: 0.9 }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: item, start: 'top 92%', once: true },
        });
      });

      // Timeline items cascade in from left
      gsap.utils.toArray('.timeline p').forEach((item, index) => {
        gsap.fromTo(item, { autoAlpha: 0, x: -24 }, {
          autoAlpha: 1,
          x: 0,
          duration: 0.65,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 93%', once: true },
        });
      });

      // Location cards stagger in with a subtle rotation
      gsap.utils.toArray('.location-card').forEach((card, index) => {
        gsap.fromTo(card, { autoAlpha: 0, y: 40, rotateY: 4 }, {
          autoAlpha: 1,
          y: 0,
          rotateY: 0,
          duration: 0.85,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        });
      });

      // Locations art botanical images float in
      gsap.utils.toArray('.locations-art > img').forEach((img, index) => {
        gsap.fromTo(img, { autoAlpha: 0, scale: 0.7, rotate: index === 0 ? -15 : 15 }, {
          autoAlpha: 1,
          scale: 1,
          rotate: index === 0 ? -9 : 12,
          duration: 1,
          delay: index * 0.15,
          ease: 'back.out(1.3)',
          scrollTrigger: { trigger: img, start: 'top 90%', once: true },
        });
      });

      // Review cards reveal with a lift
      gsap.utils.toArray('.review-card').forEach((card, index) => {
        gsap.fromTo(card, { autoAlpha: 0, y: 36, scale: 0.96 }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        });
      });

      // Signature band elements animate in sequence
      gsap.fromTo('.signature-band > img', { autoAlpha: 0, x: -40, scale: 0.97 }, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.signature-band', start: 'top 85%', once: true },
      });
      gsap.fromTo('.signature-art-group .signature-art-image', { autoAlpha: 0, y: 28, scale: 0.85 }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.signature-art', start: 'top 90%', once: true },
      });
      gsap.fromTo('.signature-art > span', { autoAlpha: 0, y: 14 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.signature-art', start: 'top 88%', once: true },
      });

      // Footer CTA content slides in
      gsap.from('.footer-cta > div > *', {
        autoAlpha: 0,
        y: 30,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-cta', start: 'top 82%', once: true },
      });

      // Footer main columns cascade in
      gsap.utils.toArray('.footer-main > *').forEach((col, index) => {
        gsap.fromTo(col, { autoAlpha: 0, y: 26 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: col, start: 'top 94%', once: true },
        });
      });

      // Locations ribbon items slide in from below
      gsap.utils.toArray('.locations-ribbon > *').forEach((item, index) => {
        gsap.fromTo(item, { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 94%', once: true },
        });
      });

      gsap.fromTo('.hero-food', { scale: 1.035, yPercent: 1 }, {
        scale: 1, yPercent: -4, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
      });
      gsap.fromTo('.signature-band > img', { scale: 0.98 }, {
        scale: 1.02, ease: 'none',
        scrollTrigger: { trigger: '.signature-band', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
      gsap.fromTo('.story-photo-wrap > img', { scale: 1.13 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.story-photo-wrap', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.fromTo('.footer-cta > img', { yPercent: 7 }, {
        yPercent: -5, ease: 'none',
        scrollTrigger: { trigger: '.footer-cta', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
    }) : null;

    return () => {
      context?.revert();
      document.removeEventListener('click', onSectionLink);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export default function App() {
  const lenisRef = useScrollMotion();
  const [pageLoading, setPageLoading] = useState(true);
  const [loadStep, setLoadStep] = useState(0);

  const loadingMessages = [
    'Infusing authentic Malabar spices…',
    'Slow-dum cooking the Biriyani…',
    'Charcoal-grilling to perfection…',
    'Your table is ready. Welcome to Chillies!'
  ];

  useEffect(() => {
    const stepTimers = [
      window.setTimeout(() => setLoadStep(1), 850),
      window.setTimeout(() => setLoadStep(2), 1700),
      window.setTimeout(() => setLoadStep(3), 2500),
    ];

    const startedAt = performance.now();
    const heroImage = document.querySelector('.hero-food');
    let finished = false;
    let minTimer;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackTimer);
      // Ensure at least 3 full seconds of smooth, welcoming experience
      const remaining = Math.max(0, 3100 - (performance.now() - startedAt));
      minTimer = window.setTimeout(() => setPageLoading(false), remaining);
    };
    const fallbackTimer = window.setTimeout(finish, 5200);
    if (!heroImage || heroImage.complete) finish();
    else {
      heroImage.addEventListener('load', finish, { once: true });
      heroImage.addEventListener('error', finish, { once: true });
    }
    return () => {
      stepTimers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(minTimer);
      heroImage?.removeEventListener('load', finish);
      heroImage?.removeEventListener('error', finish);
    };
  }, []);

  useEffect(() => {
    const markImage = (image) => {
      if (!(image instanceof HTMLImageElement)) return;
      if (image.complete) {
        image.dataset.mediaState = image.naturalWidth > 0 ? 'ready' : 'error';
      } else {
        image.dataset.mediaState = 'loading';
      }
    };
    document.querySelectorAll('img').forEach(markImage);
    const onImageEvent = (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      event.target.dataset.mediaState = event.type === 'load' ? 'ready' : 'error';
    };
    document.addEventListener('load', onImageEvent, true);
    document.addEventListener('error', onImageEvent, true);
    return () => {
      document.removeEventListener('load', onImageEvent, true);
      document.removeEventListener('error', onImageEvent, true);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#top') return undefined;

    let target;
    try {
      target = document.querySelector(decodeURIComponent(window.location.hash));
    } catch {
      return undefined;
    }
    if (!target) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const headerOffset = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
      const top = window.location.hash === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lenisRef]);

  return <>
    <div className={`page-loader${pageLoading ? ' is-loading' : ''}`} role="status" aria-live="polite" aria-hidden={!pageLoading}>
      <img className="loader-spice loader-spice-tl" src={generatedAsset('cardamom-outline.png')} alt="" aria-hidden="true" />
      <img className="loader-spice loader-spice-tr" src={generatedAsset('star-anise-outline.png')} alt="" aria-hidden="true" />
      <img className="loader-spice loader-spice-bl" src={generatedAsset('chilli-outline.png')} alt="" aria-hidden="true" />
      <img className="loader-spice loader-spice-br" src={generatedAsset('heart-leaf-outline.png')} alt="" aria-hidden="true" />

      <div className="loader-card" aria-hidden="true">
        <div className="loader-emblem">
          <img className="loader-brush" src={generatedAsset('yellow-brush-ring.png')} alt="" />
          <img className="loader-sprig" src={generatedAsset('botanical-sprig.png')} alt="" />
          <img className="loader-logo" src={officialAsset('chillies-logo.png')} alt="" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = referenceAsset('logo-board.webp'); }} />
        </div>
        <span className="loader-kicker">Chillies Restaurant · Est. 2009</span>
        <span className="loader-caption key={loadStep}">{loadingMessages[loadStep]}</span>
        <div className="loader-progress-wrap">
          <div className="loader-progress"><i style={{ width: `${(loadStep + 1) * 25}%` }} /></div>
          <span className="loader-tag">{(loadStep + 1) * 25}%</span>
        </div>
      </div>
    </div>
    <Header /><main><Hero /><MenuSection /><StorySection /><LocationsSection /><ReviewsSection /></main><Footer />
  </>;
}


