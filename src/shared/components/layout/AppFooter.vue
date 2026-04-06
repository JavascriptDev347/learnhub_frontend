<template>
    <footer class="footer">
        <!-- Background geometric shape -->
        <div class="footer__shape" aria-hidden="true"></div>

        <div class="footer__container">
            <!-- Top Section -->
            <div class="footer__top">
                <!-- Left: Brand + Newsletter -->
                <div class="footer__brand">
                    <span class="footer__logo">EdA</span>
                    <p class="footer__tagline">Get started now try our product</p>
                    <form class="footer__form" @submit.prevent="handleSubscribe">
                        <div class="footer__input-wrapper">
                            <input v-model="email" type="email" placeholder="Enter your email here"
                                class="footer__input" aria-label="Email address" />
                            <button type="submit" class="footer__submit" aria-label="Subscribe">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Right: Links -->
                <nav class="footer__nav" aria-label="Footer navigation">
                    <!-- Quick Links -->
                    <div class="footer__nav-group">
                        <h3 class="footer__nav-title">Quick Links</h3>
                        <ul class="footer__nav-list">
                            <li v-for="link in quickLinks" :key="link.label">
                                <a :href="link.href" class="footer__nav-link">{{ link.label }}</a>
                            </li>
                        </ul>
                    </div>

                    <!-- Support -->
                    <div class="footer__nav-group">
                        <h3 class="footer__nav-title">Support</h3>
                        <ul class="footer__nav-list">
                            <li v-for="link in supportLinks" :key="link.label">
                                <a :href="link.href" class="footer__nav-link">{{ link.label }}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <!-- Divider -->
            <div class="footer__divider"></div>

            <!-- Bottom: Copyright -->
            <div class="footer__bottom">
                <p class="footer__copyright">© 2025 EdA. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface NavLink {
    label: string
    href: string
}

const email = ref<string>('')

const quickLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
]

const supportLinks: NavLink[] = [
    { label: 'Help center', href: '/help' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Report a Problem', href: '/report' },
]

const handleSubscribe = (): void => {
    if (!email.value) return
    console.log('Subscribed with:', email.value)
    email.value = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

/* ─── Root Variables ─────────────────────────────────────────── */
.footer {
    --bg: #0d1117;
    --bg-card: #111827;
    --accent: #e2e8f0;
    --muted: #64748b;
    --text: #cbd5e1;
    --border: rgba(255, 255, 255, 0.07);
    --input-bg: rgba(255, 255, 255, 0.06);
    --input-border: rgba(255, 255, 255, 0.12);
    --btn-bg: #f1f5f9;
    --btn-hover: #ffffff;

    position: relative;
    background-color: var(--bg);
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
}

/* ─── Background Geometric Shape ────────────────────────────── */
.footer__shape {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 80% at 38% 50%, rgba(30, 41, 59, 0.55) 0%, transparent 70%);
    pointer-events: none;
}

.footer__shape::after {
    content: '';
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%) rotate(15deg);
    width: 320px;
    height: 260px;
    background: rgba(255, 255, 255, 0.018);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
}

/* ─── Container ──────────────────────────────────────────────── */
.footer__container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 1.75rem;
}

/* ─── Top Section ────────────────────────────────────────────── */
.footer__top {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

@media (min-width: 768px) {
    .footer__top {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 3rem;
    }
}

/* ─── Brand ──────────────────────────────────────────────────── */
.footer__brand {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 320px;
}

.footer__logo {
    font-family: 'Cinzel', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #f8fafc;
    letter-spacing: 0.03em;
    line-height: 1;
}

.footer__tagline {
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--text);
    line-height: 1.5;
    margin: 0;
}

/* ─── Form ───────────────────────────────────────────────────── */
.footer__form {
    margin-top: 0.25rem;
}

.footer__input-wrapper {
    display: flex;
    align-items: center;
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    max-width: 300px;
}

.footer__input-wrapper:focus-within {
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.04);
}

.footer__input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 0.6rem 0.9rem;
    font-size: 0.8125rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--accent);
    caret-color: var(--accent);
}

.footer__input::placeholder {
    color: var(--muted);
}

.footer__submit {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--btn-bg);
    border: none;
    cursor: pointer;
    width: 38px;
    height: 38px;
    flex-shrink: 0;
    color: #0d1117;
    transition: background 0.2s ease, transform 0.15s ease;
}

.footer__submit:hover {
    background: var(--btn-hover);
    transform: scale(1.05);
}

.footer__submit:active {
    transform: scale(0.97);
}

/* ─── Navigation ─────────────────────────────────────────────── */
.footer__nav {
    display: flex;
    gap: 3rem;
    flex-shrink: 0;
}

@media (max-width: 480px) {
    .footer__nav {
        gap: 2rem;
    }
}

.footer__nav-group {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
}

.footer__nav-title {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #f1f5f9;
    letter-spacing: 0.04em;
    margin: 0 0 0.25rem;
}

.footer__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.footer__nav-link {
    font-size: 0.8125rem;
    font-weight: 300;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s ease;
    white-space: nowrap;
}

.footer__nav-link:hover {
    color: var(--accent);
}

/* ─── Divider ────────────────────────────────────────────────── */
.footer__divider {
    height: 1px;
    background: var(--border);
    margin: 2rem 0 1.25rem;
}

/* ─── Bottom ─────────────────────────────────────────────────── */
.footer__bottom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.footer__copyright {
    font-size: 0.78125rem;
    color: var(--muted);
    margin: 0;
    font-weight: 300;
}
</style>