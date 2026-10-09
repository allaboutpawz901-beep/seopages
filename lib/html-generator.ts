import { GuidePageData } from './types';

export function generateStandaloneHtml(data: GuidePageData): string {
  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': data.metaTitle,
    'description': data.metaDescription,
    'image': [data.heroImageUrl],
    'datePublished': '2026-01-15T08:00:00+08:00',
    'dateModified': '2026-10-07T12:00:00+08:00',
    'author': {
      '@type': 'Person',
      'name': data.author.name,
      'jobTitle': data.author.role,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'All About Pawz',
      'url': 'https://www.aapawz.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.aapawz.com/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': data.canonicalUrl,
    },
  };

  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.aapawz.com',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': data.pillar,
        'item': `https://www.aapawz.com/guides#${data.pillar.toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': data.heroTitle,
        'item': data.canonicalUrl,
      },
    ],
  };

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': data.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  const jsonLdArticleStr = JSON.stringify(schemaArticle, null, 2);
  const jsonLdBreadcrumbsStr = JSON.stringify(schemaBreadcrumbs, null, 2);
  const jsonLdFaqStr = JSON.stringify(schemaFaq, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.metaTitle}</title>
  <meta name="description" content="${data.metaDescription}">
  <meta name="keywords" content="${data.targetKeyword}, ${data.secondaryKeywords.join(', ')}">
  <link rel="canonical" href="${data.canonicalUrl}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

  <!-- OpenGraph Metadata -->
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${data.metaTitle}">
  <meta property="og:description" content="${data.metaDescription}">
  <meta property="og:url" content="${data.canonicalUrl}">
  <meta property="og:site_name" content="All About Pawz">
  <meta property="og:image" content="${data.heroImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.metaTitle}">
  <meta name="twitter:description" content="${data.metaDescription}">
  <meta name="twitter:image" content="${data.heroImageUrl}">

  <!-- Schema.org JSON-LD Structured Data -->
  <script type="application/ld+json">
${jsonLdArticleStr}
  </script>
  <script type="application/ld+json">
${jsonLdBreadcrumbsStr}
  </script>
  <script type="application/ld+json">
${jsonLdFaqStr}
  </script>

  <!-- Typography & Amazon-Inspired Stylesheet -->
  <style>
    :root {
      --primary-orange: #FF6200;
      --primary-orange-hover: #E05600;
      --bg-cream: #F7F4EE;
      --text-dark: #111827;
      --text-muted: #4B5563;
      --border-subtle: #E5E7EB;
      --card-bg: #FFFFFF;
      --green-accent: #059669;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    *, *::before, *::after {
      border-radius: 0px !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--text-dark);
      background-color: #FFFFFF;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    .container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* TOP BAR */
    .topbar {
      border-bottom: 1px solid var(--border-subtle);
      background: #FFFFFF;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .topbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 68px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #111827;
    }
    .brand-paw {
      color: var(--primary-orange);
      font-size: 22px;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 24px;
      font-size: 14px;
      font-weight: 500;
      color: #4B5563;
    }
    .nav-links a:hover {
      color: #111827;
    }
    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .btn-orange {
      background-color: var(--primary-orange);
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 0px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background-color 0.15s ease;
    }
    .btn-orange:hover {
      background-color: var(--primary-orange-hover);
    }
    .btn-outline {
      background: transparent;
      border: 1px solid #D1D5DB;
      color: #111827;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 0px;
      cursor: pointer;
    }

    /* BREADCRUMB */
    .breadcrumb-bar {
      padding: 12px 0;
      font-size: 13px;
      color: #6B7280;
    }
    .breadcrumb-bar a {
      color: #4B5563;
    }
    .breadcrumb-bar a:hover {
      text-decoration: underline;
    }
    .breadcrumb-bar span {
      margin: 0 6px;
    }

    /* HERO SECTION */
    .hero-container {
      background-color: var(--bg-cream);
      border-radius: 0px;
      border: 1px solid #E5E7EB;
      padding: 48px;
      margin: 12px 0 48px 0;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 40px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .hero-title {
      font-size: 44px;
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #111827;
      margin-bottom: 16px;
    }
    .hero-subtitle {
      font-size: 18px;
      line-height: 1.5;
      color: #4B5563;
      margin-bottom: 28px;
      max-width: 580px;
    }
    .hero-cta-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hero-btn-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .hero-subtext {
      font-size: 12px;
      color: #6B7280;
    }
    .hero-image-wrap {
      position: relative;
      border-radius: 0px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
      background: #E5E7EB;
    }
    .hero-image-wrap img {
      width: 100%;
      height: 340px;
      object-fit: cover;
      display: block;
    }
    /* INCENTIVES 3-CARD ROW */
    .incentives-section {
      margin: 48px 0;
    }
    .incentives-header {
      margin-bottom: 28px;
    }
    .section-headline {
      font-size: 34px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #111827;
      margin-bottom: 8px;
    }
    .section-subhead {
      font-size: 16px;
      color: #4B5563;
      margin-bottom: 6px;
    }
    .link-arrow {
      color: #111827;
      font-weight: 600;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .link-arrow:hover {
      color: var(--primary-orange);
    }
    .cards-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 24px;
    }
    .card-incentive {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 0px;
      padding: 28px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .card-incentive:hover {
      box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    }
    .card-icon {
      width: 44px;
      height: 44px;
      border-radius: 0px;
      background: #F3F4F6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-bottom: 20px;
      color: #111827;
    }
    .card-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #111827;
    }
    .checklist {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .checklist-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 14px;
      color: #4B5563;
      line-height: 1.45;
    }
    .check-mark {
      color: #10B981;
      font-weight: 800;
      font-size: 15px;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .check-bold {
      font-weight: 700;
      color: #111827;
    }

    /* WHY SECTION (2-COL) */
    .why-section {
      background: #F9FAFB;
      border-radius: 0px;
      border: 1px solid #E5E7EB;
      padding: 56px 48px;
      margin: 64px 0;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
    }
    .why-features-list {
      display: flex;
      flex-direction: column;
      gap: 28px;
      margin: 28px 0;
    }
    .why-feature-row {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }
    .why-feature-icon {
      font-size: 22px;
      color: #111827;
      margin-top: 2px;
    }
    .why-feature-title {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 4px;
    }
    .why-feature-desc {
      font-size: 14px;
      color: #4B5563;
      line-height: 1.5;
    }
    .testimonials-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .testimonial-card {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 0px;
      padding: 28px;
    }
    .testimonial-quote {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      color: #111827;
      margin-bottom: 20px;
    }
    .testimonial-author-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .testimonial-avatar {
      width: 44px;
      height: 44px;
      border-radius: 0px;
      object-fit: cover;
      background: #D1D5DB;
    }
    .testimonial-author-name {
      font-size: 14px;
      font-weight: 700;
      color: #111827;
    }
    .testimonial-author-role {
      font-size: 12px;
      color: #6B7280;
    }

    /* ARTICLE BODY & LAYOUT */
    .article-wrap {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 48px;
      margin: 56px 0;
    }
    .toc-sticky {
      position: sticky;
      top: 90px;
      align-self: start;
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 0px;
      padding: 20px;
    }
    .toc-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #4B5563;
      margin-bottom: 12px;
    }
    .toc-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 14px;
    }
    .toc-links a {
      color: #4B5563;
      padding: 4px 0;
    }
    .toc-links a:hover {
      color: var(--primary-orange);
      font-weight: 600;
    }
    .article-content {
      font-size: 16px;
      line-height: 1.7;
      color: #374151;
    }
    .article-content h2 {
      font-size: 26px;
      font-weight: 800;
      color: #111827;
      margin: 40px 0 16px 0;
      letter-spacing: -0.01em;
      border-bottom: 1px solid #E5E7EB;
      padding-bottom: 8px;
    }
    .article-content p {
      margin-bottom: 16px;
    }
    .article-content ul {
      margin: 16px 0 24px 20px;
    }
    .article-content li {
      margin-bottom: 8px;
    }
    .callout-box {
      border-radius: 0px;
      padding: 20px;
      margin: 24px 0;
    }
    .callout-pro {
      background: #FEF3C7;
      border-left: 4px solid #D97706;
      color: #92400E;
    }
    .callout-vet {
      background: #EFF6FF;
      border-left: 4px solid #2563EB;
      color: #1E40AF;
    }
    .callout-title {
      font-weight: 700;
      margin-bottom: 4px;
    }

    /* DATA TABLE */
    .table-container {
      overflow-x: auto;
      margin: 24px 0;
      border: 1px solid #E5E7EB;
      border-radius: 0px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      text-align: left;
    }
    th {
      background: #F9FAFB;
      font-weight: 700;
      color: #111827;
      padding: 12px 16px;
      border-bottom: 1px solid #E5E7EB;
    }
    td {
      padding: 12px 16px;
      border-bottom: 1px solid #E5E7EB;
      color: #4B5563;
    }
    tr:last-child td {
      border-bottom: none;
    }

    /* RELATED PRODUCTS */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin: 28px 0;
    }
    .product-card {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 0px;
      padding: 16px;
      display: flex;
      flex-direction: column;
    }
    .product-name {
      font-size: 15px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 4px;
    }
    .product-price {
      font-size: 16px;
      font-weight: 800;
      color: #111827;
      margin: 8px 0;
    }

    /* FAQ ACCORDION */
    .faq-block {
      border-top: 1px solid #E5E7EB;
      padding: 18px 0;
    }
    .faq-question {
      font-size: 17px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 8px;
    }
    .faq-answer {
      font-size: 15px;
      color: #4B5563;
      line-height: 1.5;
    }

    /* FOOTER */
    .footer {
      background: #111827;
      color: #9CA3AF;
      padding: 64px 0 32px 0;
      margin-top: 80px;
      font-size: 14px;
    }
    .footer a {
      color: #D1D5DB;
    }
    .footer a:hover {
      color: #FFFFFF;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 40px;
      margin-bottom: 48px;
    }
    .footer-col-title {
      color: #FFFFFF;
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 16px;
    }
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .footer-bottom {
      border-top: 1px solid #1F2937;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      .hero-container {
        grid-template-columns: 1fr;
        padding: 32px 24px;
      }
      .cards-grid-3 {
        grid-template-columns: 1fr;
      }
      .why-section {
        grid-template-columns: 1fr;
        padding: 32px 24px;
      }
      .article-wrap {
        grid-template-columns: 1fr;
      }
      .toc-sticky {
        display: none;
      }
      .products-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 600px) {
      .hero-title {
        font-size: 32px;
      }
      .nav-links {
        display: none;
      }
      .products-grid {
        grid-template-columns: 1fr;
      }
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- TOP BAR -->
  <header class="topbar">
    <div class="container topbar-inner">
      <a href="https://www.aapawz.com" class="brand">
        <span class="brand-paw">🐾</span>
        <span>All About Pawz</span>
      </a>

      <nav class="nav-links">
        <a href="#feeding">Feeding & Watering</a>
        <a href="#grooming">Grooming</a>
        <a href="#beds">Beds & Crates</a>
        <a href="#wellness">Wellness</a>
        <a href="#guides">Guides & Articles</a>
        <a href="#local">Memphis, TN</a>
      </nav>

      <div class="topbar-actions">
        <button class="btn-orange">
          <span>${data.heroCtaText.replace('*', '')}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  </header>

  <!-- BREADCRUMB BAR -->
  <div class="container breadcrumb-bar">
    <a href="https://www.aapawz.com">Home</a>
    <span>/</span>
    <a href="https://www.aapawz.com${data.archetype === 'product_category'
      ? data.path.split('/').filter(Boolean).length > 1 ? `/${data.path.split('/').filter(Boolean).slice(0, -1).join('/')}` : data.path
      : `/guides#${data.pillar.toLowerCase()}`}">${data.pillar}</a>
    <span>/</span>
    <strong>${data.heroTitle}</strong>
  </div>

  <main class="container">

    <!-- HERO SECTION (Amazon Style Screenshot 3) -->
    <section class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">${data.heroTitle}</h1>
        <p class="hero-subtitle">${data.heroSubheadline}</p>
        
        <div class="hero-cta-group">
          <div class="hero-btn-row">
            <button class="btn-orange" style="font-size: 16px; padding: 14px 28px;">
              ${data.heroCtaText}
            </button>
          </div>
          <p class="hero-subtext">${data.heroFootnote}</p>
        </div>
      </div>

      <div class="hero-image-wrap">
        <img src="${data.heroImageUrl}" alt="${data.heroImageAlt}" loading="lazy">
      </div>
    </section>

    <!-- 3-CARD INCENTIVES / TAKEAWAYS SECTION (Amazon Style Screenshot 1) -->
    <section class="incentives-section">
      <div class="incentives-header">
        <h2 class="section-headline">${data.incentivesHeadline}</h2>
        <p class="section-subhead">
          ${data.incentivesSubhead}
          <a href="#details" class="link-arrow" style="margin-left: 8px;">${data.incentivesLinkText}</a>
        </p>
      </div>

      <div class="cards-grid-3">
        ${data.takeawayCards.map(card => `
        <div class="card-incentive">
          <div class="card-icon">
            ${card.icon === 'scissors' ? '✂️' : card.icon === 'sparkles' ? '🧼' : card.icon === 'clock' ? '⏱️' : card.icon === 'shield' ? '🛡️' : '🐾'}
          </div>
          <h3 class="card-title">${card.title}</h3>
          <ul class="checklist">
            ${card.items.map(item => `
            <li class="checklist-item">
              <span class="check-mark">✓</span>
              <span><span class="check-bold">${item.highlight}</span> ${item.text}</span>
            </li>
            `).join('')}
          </ul>
        </div>
        `).join('')}
      </div>
    </section>

    <!-- WHY ALL ABOUT PAWZ 2-COL SECTION (Amazon Style Screenshot 2) -->
    <section class="why-section">
      <div>
        <h2 class="section-headline" style="font-size: 32px;">${data.whyHeadline}</h2>
        
        <div class="why-features-list">
          ${data.whyFeatures.map(feat => `
          <div class="why-feature-row">
            <span class="why-feature-icon">✔</span>
            <div>
              <h4 class="why-feature-title">${feat.title}</h4>
              <p class="why-feature-desc">${feat.description}</p>
            </div>
          </div>
          `).join('')}
        </div>

        <button class="btn-outline">
          ${data.whyCtaText}
        </button>
      </div>

      <div class="testimonials-col">
        ${data.testimonials.map(item => `
        <div class="testimonial-card">
          <p class="testimonial-quote">${item.quote}</p>
          <div class="testimonial-author-row">
            <img src="${item.avatarUrl}" alt="${item.authorName}" class="testimonial-avatar">
            <div>
              <p class="testimonial-author-name">${item.authorName}</p>
              <p class="testimonial-author-role">${item.authorRole}</p>
            </div>
          </div>
          <a href="#reviews" class="link-arrow" style="font-size: 13px;">${item.storyLinkText}</a>
        </div>
        `).join('')}
      </div>
    </section>

    <!-- ARTICLE BODY & STICKY TABLE OF CONTENTS -->
    <section class="article-wrap" id="details">
      <aside>
        <div class="toc-sticky">
          <div class="toc-title">Table of Contents</div>
          <nav class="toc-links">
            ${data.tableOfContents.map(toc => `
            <a href="#${toc.id}">${toc.label}</a>
            `).join('')}
          </nav>
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280;">
            <p><strong>Reviewer:</strong> ${data.veterinaryReviewer ? data.veterinaryReviewer.name : 'All About Pawz Vet Team'}</p>
            <p><strong>Updated:</strong> ${data.lastUpdated}</p>
          </div>
        </div>
      </aside>

      <article class="article-content">
        <p style="font-size: 18px; line-height: 1.6; color: #111827; font-weight: 500; margin-bottom: 28px;">
          ${data.introSummary}
        </p>

        ${data.sections.map(sec => `
        <section id="${sec.id}">
          <h2>${sec.title}</h2>
          <p>${sec.content}</p>

          ${sec.tips ? `
          <ul>
            ${sec.tips.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
          ` : ''}

          ${sec.callout ? `
          <div class="callout-box ${sec.callout.type === 'pro-tip' ? 'callout-pro' : 'callout-vet'}">
            <div class="callout-title">${sec.callout.type === 'pro-tip' ? '💡 PRO-TIP: ' : '🩺 VETERINARY NOTE: '}${sec.callout.title}</div>
            <p style="margin: 0;">${sec.callout.text}</p>
          </div>
          ` : ''}

          ${sec.tableData ? `
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  ${sec.tableData.headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${sec.tableData.rows.map(row => `
                <tr>
                  ${row.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : ''}
        </section>
        `).join('')}

        <!-- RECOMMENDED SUPPLIES & GEAR -->
        <section id="recommended-gear" style="margin-top: 48px;">
          <h2>Groomer-Recommended Gear & Mid-South Supplies</h2>
          <p>Equip your pet care station with professional tools proven to maintain hygiene between salon appointments:</p>
          
          <div class="products-grid">
            ${data.relatedProducts.map(p => `
            <div class="product-card">
              <div class="product-name">${p.name}</div>
              <div style="font-size: 12px; color: #6B7280;">${p.category}</div>
              <div class="product-price">${p.price}</div>
              <p style="font-size: 12px; color: #4B5563; flex-grow: 1;">${p.description}</p>
              <button class="btn-orange" style="margin-top: 12px; width: 100%; justify-content: center; font-size: 13px; padding: 8px;">
                View Product
              </button>
            </div>
            `).join('')}
          </div>
        </section>

        <!-- FAQ SECTION -->
        <section id="faq" style="margin-top: 48px;">
          <h2>Frequently Asked Questions</h2>
          <p style="margin-bottom: 24px;">Common questions from Mid-South pet parents answered by certified stylists:</p>

          <div>
            ${data.faqs.map(faq => `
            <div class="faq-block">
              <h3 class="faq-question">${faq.question}</h3>
              <p class="faq-answer">${faq.answer}</p>
            </div>
            `).join('')}
          </div>
        </section>
      </article>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <div class="brand" style="color: #FFFFFF; margin-bottom: 12px;">
          <span class="brand-paw">🐾</span>
          <span>All About Pawz</span>
        </div>
        <p style="font-size: 13px; line-height: 1.6; max-width: 320px; margin-bottom: 16px;">
          Mid-South’s premier full-service pet grooming salon, nutrition depot, and fear-free care destination. Dedicated to healthy coats, gentle handling, and happy tails.
        </p>
        <p style="font-size: 12px; color: #9CA3AF;">
          <strong>Rabies Policy:</strong> In compliance with Tennessee Health Code, verifiable proof of rabies vaccination is mandatory for all canine and feline guests.
        </p>
      </div>

      <div>
        <h4 class="footer-col-title">Service Areas</h4>
        <div class="footer-links">
          <a href="#memphis">Memphis, TN</a>
          <a href="#bartlett">Bartlett, TN</a>
          <a href="#collierville">Collierville, TN</a>
          <a href="#germantown">Germantown, TN</a>
          <a href="#arlington">Arlington, TN</a>
          <a href="#millington">Millington, TN</a>
        </div>
      </div>

      <div>
        <h4 class="footer-col-title">Pillars & Guides</h4>
        <div class="footer-links">
          <a href="#grooming">Breed Grooming Guides</a>
          <a href="#nutrition">Diet & Nutrition Finder</a>
          <a href="#wellness">Vaccines & Health</a>
          <a href="#buying-guides">Buying Guides & Kits</a>
          <a href="#coat-types">Double Coat Care</a>
        </div>
      </div>

      <div>
        <h4 class="footer-col-title">Contact & Salon</h4>
        <div class="footer-links">
          <span>📍 Greater Memphis Area, TN</span>
          <span>📞 (901) 555-PAWZ</span>
          <span>✉️ allaboutpawz901@gmail.com</span>
          <span>🕒 Mon - Sat: 7:30 AM - 5:30 PM</span>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>© 2026 All About Pawz. All rights reserved. Memphis, Tennessee.</p>
      <div style="display: flex; gap: 16px;">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#rabies">Rabies Verification</a>
      </div>
    </div>
  </footer>

</body>
</html>`;
}
