/* Unique Vacations India — Shared site logic */

const SITE = {
    name: 'Unique Vacations India',
    tagline: 'Journey Beyond Imagination',
    logo: 'images/logo.png',
    domain: 'uniquevacations.in',
    whatsapp: '919166010400',
    email: 'info@uniquevacations.in',
    phone: '+91 91660 10400'
};

const NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'destinations.html', label: 'Destinations' },
    { href: 'packages.html', label: 'Packages' },
    { href: 'about.html', label: 'About' },
    { href: 'contact.html', label: 'Contact' },
    { href: 'faq.html', label: 'FAQ' }
];

const FOOTER_LINKS = {
    explore: [
        { href: 'destinations.html', label: 'Destinations' },
        { href: 'packages.html', label: 'Tour Packages' },
        { href: 'about.html', label: 'About Us' },
        { href: 'faq.html', label: 'FAQ' }
    ],
    legal: [
        { href: 'privacy.html', label: 'Privacy Policy' },
        { href: 'terms.html', label: 'Terms & Conditions' },
        { href: 'refund.html', label: 'Cancellation Policy' }
    ],
    contact: [
        { href: 'contact.html', label: 'Contact Us' },
        { href: `https://wa.me/${SITE.whatsapp}`, label: 'WhatsApp' },
        { href: `mailto:${SITE.email}`, label: 'Email Us' }
    ]
};

function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
}

function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    const page = currentPage();
    const links = NAV_LINKS.map(l =>
        `<a href="${l.href}" class="${page === l.href ? 'active' : ''}">${l.label}</a>`
    ).join('');

    el.innerHTML = `
    <header class="site-header">
        <div class="container nav">
            <a class="brand" href="index.html">
                <img src="${SITE.logo}" alt="${SITE.name}" class="brand-logo">
            </a>
            <button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <nav class="nav-links" id="nav-links">${links}</nav>
            <div class="nav-actions">
                <a class="btn btn-outline btn-sm" href="contact.html">Enquire</a>
                <a class="btn btn-accent btn-sm" href="packages.html">Book Now</a>
            </div>
        </div>
    </header>`;

    document.getElementById('nav-toggle')?.addEventListener('click', () => {
        const nav = document.getElementById('nav-links');
        const open = nav?.classList.toggle('open');
        document.getElementById('nav-toggle')?.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;

    const list = (items) => items.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('');

    el.innerHTML = `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <img src="${SITE.logo}" alt="${SITE.name}" class="footer-logo">
                    <p style="color:var(--muted);font-size:0.88rem;margin-top:12px;">${SITE.tagline}. Curated travel experiences across India — from golden deserts to emerald backwaters.</p>
                    <div class="social-links">
                        <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="YouTube">▶</a>
                    </div>
                </div>
                <div>
                    <h4>Explore</h4>
                    <ul>${list(FOOTER_LINKS.explore)}</ul>
                </div>
                <div>
                    <h4>Legal</h4>
                    <ul>${list(FOOTER_LINKS.legal)}</ul>
                </div>
                <div>
                    <h4>Contact</h4>
                    <ul>${list(FOOTER_LINKS.contact)}</ul>
                    <p style="margin-top:12px;font-size:0.85rem;color:var(--muted);">
                        ${SITE.phone}<br>
                        ${SITE.email}
                    </p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved. | ${SITE.domain}</p>
            </div>
        </div>
    </footer>`;
}

function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.2
        }));
    }

    function draw() {
        ctx.fillStyle = '#faf8f5';
        ctx.fillRect(0, 0, w, h);

        const grad = ctx.createRadialGradient(w * 0.3, h * 0.2, 0, w * 0.5, h * 0.5, w);
        grad.addColorStop(0, 'rgba(25, 118, 210, 0.08)');
        grad.addColorStop(0.5, 'rgba(245, 124, 0, 0.05)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > w) p.dx *= -1;
            if (p.y < 0 || p.y > h) p.dy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(46, 125, 50, ${p.opacity * 0.6})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
}

function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
}

function initContactForm() {
    document.querySelectorAll('form[data-contact]').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Thank you! Our travel expert will contact you within 24 hours.');
            form.reset();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    initHeroCanvas();
    initReveal();
    initContactForm();
});
