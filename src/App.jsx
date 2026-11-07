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
  { title: 'Biriyani', description: 'Fragrant rice, unforgettable taste.', image: 'menu-biriyani-hq.jpg', alt: 'Authentic Malabar Dum Biriyani served at Chillies Restaurant Wandoor, Kerala', category: 'Main Course' },
  { title: 'Grills', description: 'Charcoal flavours that hit different.', image: 'menu-grill-hq.jpg', alt: 'Charcoal grilled chicken and Al Faham at Chillies Restaurant Kerala', category: 'Grills' },
  { title: 'Starters', description: 'Perfect to start your meal.', image: 'menu-starters-hq.jpg', alt: 'Spicy chicken starter platters at Chillies Restaurant', category: 'Starters' },
  { title: 'Shawarma', description: 'Juicy, flavour-packed and satisfying.', image: 'menu-shawarma-hq.jpg', alt: 'Chillies authentic Rumali Shawarma rolls', category: 'Shawarma' },
  { title: 'Rice Dishes', description: 'Comforting and delicious.', image: 'menu-rice-hq.jpg', alt: 'Fragrant Ghee Rice and Mandhi in Malappuram, Kerala', category: 'Rice Dishes' },
];

const locations = [
  {
    name: 'Wandoor',
    locality: 'Wandoor',
    region: 'Kerala',
    postalCode: '679328',
    lat: '11.2445',
    lng: '76.2030',
    address: 'Nilambur Road, opposite bus stand',
    phone: '+918606186666',
    image: 'location-wandoor-new.png',
    source: 'generated',
    map: 'https://www.google.com/maps/place/Chillies+Restaurant/@11.2445001,76.2030182,966m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba63b1576ac3abf:0x8afab220bc63ce89!8m2!3d11.2445001!4d76.2030182!16s%2Fg%2F11t7k_2c0f?entry=ttu'
  },
  {
    name: 'Anchachavidi',
    locality: 'Anchachavidi',
    region: 'Kerala',
    postalCode: '676525',
    lat: '11.2335',
    lng: '76.2570',
    address: 'Near high school, Anchachavidi',
    phone: '+918943608000',
    image: 'location-anchachavidi-new.png',
    source: 'generated',
    map: 'https://www.google.com/maps/place/Chillies+Restaurant+Anchachavidi/data=!4m2!3m1!1s0x0:0xf41500c0e16c0890'
  },
  {
    name: 'Pullikalodi',
    locality: 'Pullikalodi',
    region: 'Kerala',
    postalCode: '676525',
    lat: '11.2150',
    lng: '76.2420',
    address: 'Main Road, Khadeeja Building',
    phone: '+917025222260',
    image: 'location-pullikalodi-new.png',
    source: 'generated',
    map: 'https://maps.google.com/?q=Chillies+Restaurant+Pullikalodi+Kerala'
  },
  {
    name: 'Thiruvalli',
    locality: 'Thiruvalli',
    region: 'Kerala',
    postalCode: '679323',
    lat: '11.1680',
    lng: '76.1950',
    address: 'Near Thiruvalli Panchayat',
    phone: '+918089898999',
    image: 'location-thiruvali-color.png',
    source: 'generated',
    map: 'https://maps.google.com/?q=Chillies+Restaurant+near+Thiruvalli+Panchayat'
  },
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
    leaf: <><path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16Z" /><path d="M3 21c4-5 8-8 14-12" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2z" /><path d="M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1h-3" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    chilli: <><path d="M20 4c-3-1-5 1-7 3-2 2-4 3-8 3-2 0-3 2-2 4 2 4 7 6 11 3 3-2 4-6 6-10Z" /><path d="M5 10c0-2 1-4 3-5" /></>,
    heart: <path d="M20.8 8.7c0 5-8.8 11.3-8.8 11.3S3.2 13.7 3.2 8.7A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />,
  };
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{drawings[name]}</svg>;
}

function WhatsAppIcon() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.1L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.4Z" /><path d="M8.4 8.3c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2 2 .3.2.5.2.7-.1l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1 .6-1.7.6-1 0-2.5-.5-4-1.8-1.5-1.3-2.6-3-2.8-4.2-.2-.8.1-1.4.7-2.1Z" /></svg>;
}

function InstagramIcon() {
  return <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
}

function BagIcon() {
  return <svg className="bag-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
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
        <svg className="hero-brush" viewBox="0 0 820 760" preserveAspectRatio="none" aria-hidden="true"><path d="M118 112 C209 42 337 54 431 46 C554 36 671 64 734 145 C791 219 784 336 774 436 C764 545 738 628 645 664 C556 699 440 685 338 690 C224 695 122 701 65 633 C12 580 23 443 31 339 C39 237 37 174 118 112 Z" fill="#FFC414" /></svg>
        <img className="hero-brush-rim" data-ornament src={generatedAsset('yellow-brush-ring.png')} alt="" aria-hidden="true" />
        <span className="hero-food-shadow" aria-hidden="true" />
        <img className="hero-food" src={generatedAsset('hero-bucket-branded.png')} alt="Authentic Malabar Dum Biriyani and charcoal grilled chicken in Chillies takeaway bucket in Wandoor, Kerala" fetchPriority="high" />
        <div className="hero-note hero-note-malay" data-draw><span>Malabar</span><strong>Dum Biriyani</strong><svg viewBox="0 0 110 48" aria-hidden="true"><path d="M4 8c20 1 30 31 61 23 13-3 23-15 37-18m-3 0 13-3-6 12" /></svg></div>
        <div className="hero-note hero-note-taste" data-draw><span>Same Great Taste</span><strong>Always!</strong><svg viewBox="0 0 120 24" aria-hidden="true"><path d="M3 16c32-14 78-12 114-4" /></svg></div>
        <img className="hero-spice-doodle" data-ornament src={generatedAsset('star-anise-outline.png')} alt="" aria-hidden="true" />
      </div>
      <img className="hero-stamp" data-ornament src={referenceAsset('menu-food-stamp-transparent.png')} alt="Good food, good people" />
      <ul className="hero-side-list"><li><LineIcon name="utensils" /><span>Signature<br />dishes</span></li><li><LineIcon name="leaf" /><span>Fresh<br />ingredients</span></li><li><LineIcon name="users" /><span>Family<br />friendly</span></li><li><LineIcon name="pin" /><span>Multiple<br />locations</span></li></ul>
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
        <div className="section-heading menu-heading"><div data-reveal><p className="eyebrow" data-typewriter><i /> Our Menu <i /></p><h2>Flavours<br />for Every Mood<span className="red-dot">.</span></h2><p>From charcoal-grilled classics to comforting rice dishes,<br className="desktop-only" /> explore a menu made for every appetite.</p><Button href="https://chilliesgroup.com/menu.php">View Full Menu <Arrow /></Button></div><div className="menu-art" data-reveal><div className="hand-note">Real ingredients<br /><strong>Real taste!</strong><svg viewBox="0 0 130 32" aria-hidden="true" data-draw><path d="M3 20c36-18 79-18 120-8m-8 0 10-1-4 10" /></svg></div><img className="menu-stamp" data-ornament src={referenceAsset('menu-food-stamp-transparent.png')} alt="Good food, good people" /></div></div>
        <div className="menu-carousel menu-train"><button className="carousel-arrow carousel-prev" onClick={() => moveCards(-1)} aria-label="Previous menu categories"><Arrow direction="left" /></button><div className="food-grid" ref={trackRef} onScroll={(event) => { const track = event.currentTarget; const center = track.getBoundingClientRect().left + track.clientWidth / 2; const cards = [...track.querySelectorAll('.food-card')]; const nearest = cards.reduce((bestIndex, card, index) => Math.abs(card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - center) < Math.abs(cards[bestIndex].getBoundingClientRect().left + cards[bestIndex].getBoundingClientRect().width / 2 - center) ? index : bestIndex, 0); setActiveCard(nearest % menuItems.length); }}>
          {[0, 1, 2, 3].flatMap((copy) => menuItems.map((item, i) => <a className="food-card" href="https://chilliesgroup.com/menu.php" key={`${copy}-${item.title}`} data-loop-copy={copy !== 1 ? 'true' : undefined} aria-hidden={copy !== 1} tabIndex={copy !== 1 ? -1 : 0} data-reveal={copy === 1 ? '' : undefined} style={{ '--reveal-order': i }} itemScope itemType="https://schema.org/MenuItem"><meta itemProp="menuAddOn" content={item.category} /><img src={item.source ? officialAsset(item.source) : referenceAsset(item.image)} alt={copy === 1 ? item.alt : ''} loading="lazy" decoding="async" itemProp="image" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = referenceAsset(item.image); }} /><div className="food-info"><h3 itemProp="name">{item.title}</h3><p itemProp="description">{item.description}</p><span className="round-arrow" aria-label={`View ${item.title} menu`}><Arrow /></span></div></a>))}
        </div><button className="carousel-arrow carousel-next" onClick={() => moveCards(1)} aria-label="Next menu categories"><Arrow /></button><div className="carousel-dots" aria-label="Menu category pages">{menuItems.map((item, i) => <button key={item.title} className={activeCard === i ? 'active' : ''} aria-label={`Show ${item.title}`} onClick={() => scrollToCard(i)} />)}</div></div>
      </div></div>
      <div className="signature-band" itemScope itemType="https://schema.org/MenuItem"><meta itemProp="name" content="Malabar Dum Biriyani" /><meta itemProp="description" content="Aromatic rice, tender meat and authentic Malabar spices." /><img data-reveal src={generatedAsset('hero-biryani.webp')} alt="Signature Malabar Dum Biriyani at Chillies Restaurant Wandoor, Kerala" loading="lazy" decoding="async" itemProp="image" /><div data-reveal><p className="eyebrow" data-typewriter>Signature Dish</p><h2>Malabar<br />Dum <em>Biriyani</em></h2><p>A perfect blend of aromatic rice, tender meat<br className="desktop-only" /> and authentic spices — a taste that keeps<br className="desktop-only" /> bringing you back.</p><Button href="https://chilliesgroup.com/menu.php" variant="light">Explore Biriyani <Arrow /></Button></div><div className="signature-art" aria-hidden="true"><div className="signature-art-group"><img className="signature-art-image botanical-art" src={generatedAsset('botanical-sprig.png')} alt="" /><img className="signature-art-image leaf-art" src={generatedAsset('heart-leaf-outline.png')} alt="" /></div><span>The taste<br /><b>that stays</b></span></div></div>
    </section>
  );
}

function StorySection() {
  const values = [['leaf', 'Quality', 'ingredients'], ['chilli', 'Authentic', 'flavours'], ['users', 'Hygienic', 'preparation'], ['sun', 'Warm', 'ambience']];
  const history = [['2009', 'First branch opens in Wandoor, Malappuram'], ['2019', 'Treatley fine dining opens in Wandoor'], ['2020', 'Cloud kitchen opens in Anchachavidi'], ['2021', 'Cloud kitchen becomes a fine dining restaurant in Anchachavidi'], ['2022', 'New launch at Pullikalodi'], ['2026', 'New launch at Thiruvalli']];
  return (
    <section className="story-section section-paper" id="story">
      <div className="story-intro" data-reveal><p className="eyebrow" data-typewriter><i /> Why Chillies <i /></p><h2>More Than<br />Just a Meal<span className="red-dot">.</span></h2><p>Good food is always better when shared. At Chillies, we bring people together with authentic Malabar flavours that feel like home.</p><div className="values">{values.map(([icon, title, detail]) => <span key={title}><LineIcon name={icon} /><span>{title}<br />{detail}</span></span>)}</div></div>
      <div className="story-photo-wrap" data-reveal><img src={generatedAsset('grilled-chicken.webp')} alt="Charcoal-grilled chicken and Al Faham prepared with fresh herbs and spices at Chillies Restaurant" loading="lazy" decoding="async" /></div>
      <div className="story-bottom"><div className="story-bottom-photo" data-reveal><img src={generatedAsset('restaurant-interior.webp')} alt="Warmly lit Chillies restaurant family dining room in Wandoor, Kerala" loading="lazy" decoding="async" /></div><div className="story-bottom-copy" data-reveal><p className="eyebrow" data-typewriter>Our Story</p><h2>A Journey<br />of Great Food.</h2><p>From our first restaurant in Wandoor in 2009 to a growing family of branches across Kerala, Chillies has always been about great food and the people who bring it to the table.</p><Button href="https://chilliesgroup.com/about.php" variant="dark">Discover Our Story <Arrow /></Button></div><div className="timeline" data-reveal>{history.map(([year, text]) => <p key={year}><b>{year}</b><span>{text}</span></p>)}</div></div>
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
          <p>Visit one of our locations, check the details<br className="desktop-only" /> and get directions or call to order.</p>
        </div>
        <div className="locations-art" aria-hidden="true">
          <div className="locations-art-cluster">
            <img className="locations-sprig" src={generatedAsset('botanical-sprig.png')} alt="" />
            <img className="locations-leaf" src={generatedAsset('heart-leaf-outline.png')} alt="" />
            <img className="locations-chilli" src={generatedAsset('chilli-outline.png')} alt="" />
            <img className="locations-spice" src={generatedAsset('star-anise-outline.png')} alt="" />
          </div>
          <svg className="locations-route" viewBox="0 0 160 40" fill="none" data-draw>
            <path d="M4 30C36 8 68 8 92 24s48 18 64-10m-10 2 10-2-4 10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="92" cy="24" r="3.5" fill="#cf1028" stroke="white" strokeWidth="1.5" />
          </svg>
          <span className="locations-art-note">Serving 4 Hubs <i>✦</i></span>
        </div>
        <div className="map-note" data-reveal>Authentic flavours<br /><b>across Kerala</b></div>
      </div>
      <div className="location-carousel"><button className="carousel-arrow carousel-prev" onClick={() => moveLocations(-1)} aria-label="Previous locations"><Arrow direction="left" /></button><div className="location-grid" ref={trackRef} onScroll={(event) => { const track = event.currentTarget; const center = track.getBoundingClientRect().left + track.clientWidth / 2; const cards = [...track.querySelectorAll('.location-card')]; const nearest = cards.reduce((bestIndex, card, index) => Math.abs(card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - center) < Math.abs(cards[bestIndex].getBoundingClientRect().left + cards[bestIndex].getBoundingClientRect().width / 2 - center) ? index : bestIndex, 0); setActiveLocation(nearest); }}>{locations.map((place, i) => (
        <article className="location-card" data-reveal style={{ '--reveal-order': i }} key={place.name} itemScope itemType="https://schema.org/Restaurant">
          <meta itemProp="name" content={`Chillies Restaurant - ${place.name}`} />
          <meta itemProp="servesCuisine" content="Kerala, Malabar Biryani, Charcoal Grill" />
          <meta itemProp="priceRange" content="₹₹" />
          <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates" style={{ display: 'none' }}>
            <meta itemProp="latitude" content={place.lat} />
            <meta itemProp="longitude" content={place.lng} />
          </div>
          <img src={place.source === 'generated' ? generatedAsset(place.image) : referenceAsset(place.image)} alt={`Chillies Restaurant ${place.name} branch in Kerala - Malabar Biryani & Grills`} loading="lazy" decoding="async" itemProp="image" />
          <div className="location-info">
            <h3 itemProp="name">{place.name}</h3>
            <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">{place.address}</span>,{' '}
              <span itemProp="addressLocality">{place.locality}</span>,{' '}
              <span itemProp="addressRegion">{place.region}</span>{' '}
              <span itemProp="postalCode">{place.postalCode}</span>
            </p>
            <div>
              <a href={`tel:${place.phone}`} itemProp="telephone">☎&nbsp; Call</a>
              <a href={place.map} target="_blank" rel="noreferrer" itemProp="hasMap">📍&nbsp; Directions</a>
            </div>
          </div>
        </article>
      ))}</div><button className="carousel-arrow carousel-next" onClick={() => moveLocations(1)} aria-label="Next locations"><Arrow /></button><div className="carousel-dots" aria-label="Location pages">{Array.from({ length: locationCount }, (_, i) => <button key={i} className={activeLocation === i ? 'active' : ''} aria-label={`Show location ${i + 1}`} onClick={() => scrollToLocation(i)} />)}</div></div>
      <div className="locations-ribbon"><img src={referenceAsset('location-sketch.webp')} alt="Hand-drawn architectural sketch of Chillies Restaurant storefront with palm trees" loading="lazy" decoding="async" /><span>Great food<br /><b>in more places.</b></span><i><LineIcon name="pin" />Strategic<br />locations</i><i><LineIcon name="users" />Easy<br />accessibility</i><i><LineIcon name="utensils" />Same great<br />taste</i><i><LineIcon name="heart" />A growing<br />family</i></div>
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
  return <section className={`reviews-section${hasOverflow ? ' has-review-overflow' : ''}`}><div className="review-intro" data-reveal><p className="eyebrow" data-typewriter>What our customers say</p><h2>Flavours That<br />Create <em>Memories.</em></h2><p>From first visits to lifelong favourites,<br /> our guests share what makes Chillies special.</p></div><div className="review-track" id="review-track" ref={trackRef}>{reviews.map(review => <article className="review-card" key={review.name} data-reveal><div className="stars">★★★★★ <span>”</span></div><p>{review.quote}</p><div className="reviewer"><img src={referenceAsset(review.image)} alt="" loading="lazy" decoding="async" /><b>{review.name}<small>{review.role}</small></b></div></article>)}</div>{hasOverflow && <button className="review-next" aria-label="Show next reviews" onClick={moveReviews}>→</button>}</section>;
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

  return <footer id="contact"><section className="footer-cta"><div data-reveal><h2>Hungry?<br />Let’s Get You<br />Something <em>Great.</em></h2><p>Call us or order through WhatsApp for a quick<br className="desktop-only" /> and delicious experience. Great food is always<br className="desktop-only" /> just a few clicks away.</p><div className="footer-actions"><Button href={orderUrl} target="_blank" rel="noreferrer"><BagIcon /> Order Now <Arrow /></Button><Button href={orderUrl} variant="outline" target="_blank" rel="noreferrer"><WhatsAppIcon /> Chat on WhatsApp <Arrow /></Button></div></div><img src={generatedAsset('hero-biryani.webp')} alt="Freshly prepared Malabar Dum Biriyani spread with raita and pickle at Chillies Restaurant Kerala" loading="lazy" decoding="async" data-reveal /></section>
    <div className="footer-main"><div className="footer-brand"><Brand /><p>Authentic flavours. Great food. Good people.</p><div className="socials"><a href="https://instagram.com/" aria-label="Follow Chillies on Instagram" target="_blank" rel="noreferrer"><InstagramIcon /></a><a href="https://facebook.com/chillies_restaurant_" aria-label="Chillies on Facebook" target="_blank" rel="noreferrer">f</a><a href={orderUrl} aria-label="Chillies on WhatsApp" target="_blank" rel="noreferrer"><WhatsAppIcon /></a><a href="https://maps.google.com/?q=Chillies+Restaurant+Wandoor" aria-label="Chillies on Maps" target="_blank" rel="noreferrer"><LineIcon name="pin" /></a></div></div><div className="footer-links"><h3>Quick Links</h3><a href="#top">Home</a><a href="#menu">Our Menu</a><a href="#story">Our Story</a><a href="#locations">Locations</a><a href="#contact">Contact</a></div><div className="footer-locations" itemScope itemType="https://schema.org/Organization"><meta itemProp="name" content="Chillies Restaurant Group" /><h3>Our Locations in Kerala</h3><p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">📍 &nbsp;<strong itemProp="addressLocality">Wandoor</strong> <small itemProp="streetAddress">Nilambur Road, opposite bus stand, Kerala 679328</small></p><p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">📍 &nbsp;<strong itemProp="addressLocality">Anchachavidi</strong> <small itemProp="streetAddress">Near high school, Kerala 676525</small></p><p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">📍 &nbsp;<strong itemProp="addressLocality">Pullikalodi</strong> <small itemProp="streetAddress">Main Road, Khadeeja Building, Kerala 676525</small></p><p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">📍 &nbsp;<strong itemProp="addressLocality">Thiruvalli</strong> <small itemProp="streetAddress">Near Thiruvalli Panchayat, Kerala 679323</small></p></div><div className="footer-news"><h3>Stay Updated</h3><p>Get the latest updates, special offers<br /> and new dishes straight to your inbox.</p><form onSubmit={requestUpdates}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" placeholder="Enter your email address" autoComplete="email" required /><button type="submit" aria-label="Request email updates"><Arrow /></button></form><small role="status">{signupStatus}</small></div></div><div className="footer-bottom"><span>© 2026 Chillies Restaurant. All rights reserved.</span><span>Made with <b>♥</b> for food lovers</span></div>
  </footer>;
}

function useScrollMotion(heroReady = false) {
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

  useEffect(() => {
    if (!heroReady) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from(['.hero .eyebrow', '.hero-description', '.hero-actions'], {
        autoAlpha: 0, y: 34, duration: 1.15, stagger: 0.16,
      }, 0.05)
      .from('.hero-line > *', {
        yPercent: 120, duration: 1.1, stagger: 0.12,
      }, 0.12)
      .from('.hero-food', {
        scale: 0.86, autoAlpha: 0, y: 38, duration: 1.25, ease: 'back.out(1.4)',
      }, 0.22)
      .from('.hero-brush', {
        scale: 0.8, autoAlpha: 0, rotation: -8, duration: 1.3, ease: 'power3.out',
      }, 0.1)
      .from('.hero-side-list li', {
        autoAlpha: 0, x: -22, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      }, 0.38)
      .from('.hero-bottom-note', {
        autoAlpha: 0, y: 10, duration: 0.8, ease: 'power3.out',
      }, 0.5);
    });
    return () => ctx.revert();
  }, [heroReady]);

  return lenisRef;
}

function CinematicLoader({ onRevealStart, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const canvasRef = useRef(null);
  const loaderRef = useRef(null);
  const cardRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  const steps = [
    {
      index: '01 / 04',
      tag: 'സുഗന്ധവ്യഞ്ജനങ്ങൾ · Spice Harvest',
      title: 'Infusing Kerala Spices',
      subtitle: 'Wild green cardamom, star anise, cloves & Malabar pepper'
    },
    {
      index: '02 / 04',
      tag: 'ദമ്പർ ബിരിയാണി · Dum Simmer',
      title: 'Dum-Cooking Fragrant Rice',
      subtitle: 'Slow-simmered Kaima in golden Kerala ghee & saffron'
    },
    {
      index: '03 / 04',
      tag: 'കരിങ്കനൽ · Charcoal Embers',
      title: 'Charcoal Grills on Fire',
      subtitle: 'Signature smoky Al Faham & tender charcoal grills'
    },
    {
      index: '04 / 04',
      tag: 'സ്വാഗതം · Malabar Hospitality',
      title: 'Your Table is Ready',
      subtitle: 'Authentic flavours & warm hospitality · Since 2009'
    },
  ];

  // AI Particle Simulator style canvas with cursor physics & glowing ember sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const onPointerMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onPointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    const palette = ['#ffc414', '#cf1028', '#ff6b35', '#ffd700', '#fff5d6'];
    const particleCount = Math.min(42, Math.max(24, Math.floor(window.innerWidth / 30)));

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height * 0.1,
      size: Math.random() * 2.8 + 1.2,
      baseSpeedY: Math.random() * 0.75 + 0.35,
      baseSpeedX: (Math.random() - 0.5) * 0.35,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      wobbleRadius: Math.random() * 1.6 + 0.6,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.65 + 0.25,
      color: palette[Math.floor(Math.random() * palette.length)],
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = mouseRef.current.active;

      particles.forEach((p) => {
        p.angle += p.wobbleSpeed;
        p.pulse += 0.04;
        let vx = p.baseSpeedX + Math.sin(p.angle) * p.wobbleRadius * 0.35;
        let vy = -p.baseSpeedY;

        // Cursor repulsion
        if (hasMouse) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          const maxDist = 130;
          if (distSq < maxDist * maxDist && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 2.0;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }

        p.x += vx;
        p.y += vy;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;

        const currentOpacity = Math.max(0.15, Math.min(1, p.opacity + Math.sin(p.pulse) * 0.18));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowBlur = p.size * 2.5;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Smooth numerical counter and phase progression (3.2 seconds minimum display)
  useEffect(() => {
    const startTime = performance.now();
    const duration = 3200; // 3.2 seconds luxury duration
    let frameId;
    let hasTriggeredReveal = false;

    const tick = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(rawProgress);

      if (rawProgress >= 76) setStepIndex(3);
      else if (rawProgress >= 51) setStepIndex(2);
      else if (rawProgress >= 26) setStepIndex(1);
      else setStepIndex(0);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick);
      } else if (!hasTriggeredReveal) {
        hasTriggeredReveal = true;
        if (loaderRef.current) {
          const tl = gsap.timeline({
            onComplete: () => {
              onComplete?.();
            },
          });
          // Center card exit
          tl.to(cardRef.current, {
            scale: 0.92,
            autoAlpha: 0,
            duration: 0.36,
            ease: 'power3.in',
          });
          // 5 Shutters pull upward
          tl.to('.loader-shutter', {
            yPercent: -102,
            duration: 0.85,
            stagger: 0.065,
            ease: 'power4.inOut',
          }, '-=0.1');
          // Trigger synchronous Hero entrance as the shutters slide open
          tl.call(() => {
            onRevealStart?.();
          }, null, '-=0.45');
        } else {
          onRevealStart?.();
          onComplete?.();
        }
      }
    };
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [onRevealStart, onComplete]);

  const onCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const circleRadius = 100;
  const circumference = 2 * Math.PI * circleRadius; // ~628.32
  const strokeOffset = circumference * (1 - progress / 100);

  return (
    <aside className="cinematic-loader" ref={loaderRef} role="status" aria-label="Loading Chillies Restaurant website">
      {/* 5 Staggered Curtain Shutters for award-winning theatrical reveal */}
      <div className="loader-shutters" aria-hidden="true">
        <span className="loader-shutter shutter-1" />
        <span className="loader-shutter shutter-2" />
        <span className="loader-shutter shutter-3" />
        <span className="loader-shutter shutter-4" />
        <span className="loader-shutter shutter-5" />
      </div>

      <canvas className="loader-particles" ref={canvasRef} aria-hidden="true" />

      {/* Ambient floating spice illustrations */}
      <img className="loader-ambient-spice spice-tl" src={generatedAsset('cardamom-outline.png')} alt="" aria-hidden="true" />
      <img className="loader-ambient-spice spice-tr" src={generatedAsset('star-anise-outline.png')} alt="" aria-hidden="true" />
      <img className="loader-ambient-spice spice-bl" src={generatedAsset('chilli-outline.png')} alt="" aria-hidden="true" />
      <img className="loader-ambient-spice spice-br" src={generatedAsset('heart-leaf-outline.png')} alt="" aria-hidden="true" />

      {/* Center Stage Card (Aceternity Spotlight & Glowing Border Beam) */}
      <div className="loader-center-content" ref={cardRef} onMouseMove={onCardMouseMove}>
        <div className="loader-spotlight" aria-hidden="true" />
        <div className="loader-beam-border" aria-hidden="true" />

        <div className="loader-emblem-wrap">
          <div className="loader-pulse-aura" aria-hidden="true" />

          {/* Circular SVG Liquid Progress Ring (React Bits / Uiverse style) */}
          <svg className="loader-circular-progress" viewBox="0 0 220 220" aria-hidden="true">
            <defs>
              <linearGradient id="loaderRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffc414" />
                <stop offset="60%" stopColor="#ff6b35" />
                <stop offset="100%" stopColor="#cf1028" />
              </linearGradient>
            </defs>
            <circle className="ring-track" cx="110" cy="110" r={circleRadius} />
            <circle
              className="ring-bar"
              cx="110"
              cy="110"
              r={circleRadius}
              stroke="url(#loaderRingGrad)"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
            />
          </svg>

          {/* Astrolabe dashed orbit */}
          <svg className="loader-orbit-ring" viewBox="0 0 240 240" fill="none" aria-hidden="true">
            <circle cx="120" cy="120" r="112" stroke="rgba(255,196,20,0.4)" strokeWidth="1.2" strokeDasharray="5 7" />
            <circle cx="120" cy="120" r="94" stroke="rgba(207,16,40,0.25)" strokeWidth="1" strokeDasharray="3 5" />
          </svg>

          <img className="loader-brush-ring" src={generatedAsset('yellow-brush-ring.png')} alt="" aria-hidden="true" />
          <img className="loader-sprig-badge" src={generatedAsset('botanical-sprig.png')} alt="" aria-hidden="true" />
          <img className="loader-crest-logo" src={officialAsset('chillies-logo.png')} alt="Chillies Restaurant" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = referenceAsset('logo-board.webp'); }} />
        </div>

        {/* Counter Row with Culinary Sizzle Equalizer (React Bits inspired) */}
        <div className="loader-counter-row">
          <div className="loader-equalizer-bars" aria-hidden="true">
            <span className="eq-bar eq-1" />
            <span className="eq-bar eq-2" />
            <span className="eq-bar eq-3" />
            <span className="eq-bar eq-4" />
            <span className="eq-bar eq-5" />
          </div>
          <div className="loader-digit-stack">
            <span className="loader-count-num">{progress.toString().padStart(2, '0')}</span>
            <span className="loader-count-sym">%</span>
          </div>
        </div>

        <div className="loader-step-pill">
          <span className="loader-step-num">{steps[stepIndex].index}</span>
          <span className="loader-step-tag">{steps[stepIndex].tag}</span>
        </div>

        {/* Phase Text Transitions */}
        <div className="loader-phase-box" key={stepIndex}>
          <h2 className="loader-phase-title">{steps[stepIndex].title}</h2>
          <p className="loader-phase-subtitle">{steps[stepIndex].subtitle}</p>
        </div>

        {/* Horizontal Progress Track with Ember Flame Marker */}
        <div className="loader-progress-track" aria-hidden="true">
          <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
          <span className="loader-progress-flame" style={{ left: `${progress}%` }}>🌶</span>
        </div>
      </div>
    </aside>
  );
}

export default function App() {
  const [loaderMounted, setLoaderMounted] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });
  const [heroReady, setHeroReady] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });
  const lenisRef = useScrollMotion(heroReady);

  useEffect(() => {
    const markImage = (image) => {
      if (!(image instanceof HTMLImageElement)) return;
      if (image.complete) {
        const isReady = image.naturalWidth > 0;
        image.dataset.mediaState = isReady ? 'ready' : 'error';
        image.closest('.food-card, .location-card, .story-photo-wrap, .story-bottom-photo, .signature-band, .footer-cta')?.classList.toggle('has-loaded-image', isReady);
      } else {
        image.dataset.mediaState = 'loading';
        image.closest('.food-card, .location-card, .story-photo-wrap, .story-bottom-photo, .signature-band, .footer-cta')?.classList.add('has-skeleton');
      }
    };
    document.querySelectorAll('img').forEach(markImage);
    const onImageEvent = (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      const isReady = event.type === 'load' && event.target.naturalWidth > 0;
      event.target.dataset.mediaState = isReady ? 'ready' : 'error';
      const parent = event.target.closest('.food-card, .location-card, .story-photo-wrap, .story-bottom-photo, .signature-band, .footer-cta');
      if (parent) {
        parent.classList.toggle('has-loaded-image', isReady);
        parent.classList.remove('has-skeleton');
      }
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
    {loaderMounted && (
      <CinematicLoader
        onRevealStart={() => setHeroReady(true)}
        onComplete={() => setLoaderMounted(false)}
      />
    )}
    <Header /><main><Hero /><MenuSection /><StorySection /><LocationsSection /><ReviewsSection /></main><Footer />
  </>;
}


