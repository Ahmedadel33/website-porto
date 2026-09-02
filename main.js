/**
 * Mahmoud Abdallah - Data Analyst Portfolio Scripts
 * Handles interactive charts, project modals, filtering, theme toggle, and ROI calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initThemeToggle();
  initMobileMenu();
  initProjectFilters();
  initCharts();
  initRoiCalculator();
  initContactForm();
  initScrollAnimations();
});

/* -------------------------------------------------------------
 * 1. Typing Effect in Hero Section
 * ------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const roles = [
    'Power BI & DAX Specialist',
    'Advanced Excel Data Strategist',
    'SQL & Python Analytics Practitioner',
    'Business Intelligence & KPI Architect'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2200; // Pause at top
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* -------------------------------------------------------------
 * 2. Dark / Light Theme Toggle
 * ------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-toggle-icon');
  if (!themeBtn) return;

  // Check saved theme preference
  const savedTheme = localStorage.getItem('mahmoud_portfolio_theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
    if (themeIcon) themeIcon.className = 'fas fa-moon text-slate-700 text-lg';
  } else {
    document.documentElement.classList.remove('light');
    if (themeIcon) themeIcon.className = 'fas fa-sun text-amber-400 text-lg';
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('mahmoud_portfolio_theme', isLight ? 'light' : 'dark');
    if (themeIcon) {
      themeIcon.className = isLight 
        ? 'fas fa-moon text-slate-700 text-lg' 
        : 'fas fa-sun text-amber-400 text-lg';
    }
    // Re-render chart colors if needed
    updateChartColors();
  });
}

/* -------------------------------------------------------------
 * 3. Mobile Menu Navigation
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* -------------------------------------------------------------
 * 4. Project Filtering
 * ------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 5. Chart.js Interactive Dashboards
 * ------------------------------------------------------------- */
let realEstateChartInstance = null;
let marketingChartInstance = null;
let ecommerceChartInstance = null;

function updateChartColors() {
  const isLight = document.documentElement.classList.contains('light');
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLight ? '#475569' : '#94a3b8';

  [realEstateChartInstance, marketingChartInstance, ecommerceChartInstance].forEach(chart => {
    if (chart && chart.options.scales) {
      if (chart.options.scales.x) {
        chart.options.scales.x.grid.color = gridColor;
        chart.options.scales.x.ticks.color = textColor;
      }
      if (chart.options.scales.y) {
        chart.options.scales.y.grid.color = gridColor;
        chart.options.scales.y.ticks.color = textColor;
      }
      chart.update();
    }
  });
}

function initCharts() {
  const isLight = document.documentElement.classList.contains('light');
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLight ? '#475569' : '#94a3b8';

  // 1. Real Estate Price Trends Chart
  const reCtx = document.getElementById('realEstateChart');
  if (reCtx) {
    realEstateChartInstance = new Chart(reCtx, {
      type: 'line',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
          {
            label: 'Single Family ($K)',
            data: [550, 580, 620, 680, 710, 740, 750, 780, 810],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#38bdf8'
          },
          {
            label: 'Condos ($K)',
            data: [310, 325, 340, 355, 370, 385, 390, 410, 425],
            borderColor: '#818cf8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: '#818cf8'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } } },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#38bdf8',
            bodyColor: '#f8fafc',
            borderColor: '#334155',
            borderWidth: 1
          }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, callback: v => '$' + v + 'k' } }
        }
      }
    });
  }

  // 2. Marketing Analytics Campaign ROI Chart
  const mktCtx = document.getElementById('marketingChart');
  if (mktCtx) {
    marketingChartInstance = new Chart(mktCtx, {
      type: 'bar',
      data: {
        labels: ['Google Ads', 'Meta Brand', 'LinkedIn Lead', 'SEO Organic', 'Email Funnel'],
        datasets: [
          {
            label: 'Revenue ($K)',
            data: [120, 95, 78, 110, 64],
            backgroundColor: '#34d399',
            borderRadius: 6
          },
          {
            label: 'Spend ($K)',
            data: [35, 30, 25, 12, 8],
            backgroundColor: '#818cf8',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } } },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#34d399',
            bodyColor: '#f8fafc',
            borderColor: '#334155',
            borderWidth: 1
          }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, callback: v => '$' + v + 'k' } }
        }
      }
    });
  }

  // 3. E-Commerce Category Distribution Chart (Doughnut)
  const ecomCtx = document.getElementById('ecommerceChart');
  if (ecomCtx) {
    ecommerceChartInstance = new Chart(ecomCtx, {
      type: 'doughnut',
      data: {
        labels: ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Accessories'],
        datasets: [{
          data: [38, 26, 18, 12, 6],
          backgroundColor: [
            '#0ea5e9',
            '#6366f1',
            '#f59e0b',
            '#10b981',
            '#a855f7'
          ],
          borderWidth: 2,
          borderColor: isLight ? '#ffffff' : '#0f172a'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } } }
        },
        cutout: '70%'
      }
    });
  }
}

/* -------------------------------------------------------------
 * 6. Interactive Project Modal Handler
 * ------------------------------------------------------------- */
const projectModalData = {
  'real-estate': {
    title: 'Real Estate Market Performance Dashboard',
    subtitle: 'Power BI | DAX | Power Query | Market Intelligence',
    image: 'assets/real_estate_dashboard.jpg',
    description: 'An executive Power BI dashboard built to analyze quarterly real estate trends, neighborhood valuation shifts, sales velocity, and inventory movement across metropolitan regions.',
    kpis: [
      { label: 'Total Volume', value: '$385.2M', detail: '+12.4% YoY' },
      { label: 'Avg Unit Price', value: '$515.8K', detail: '+8.7% vs Target' },
      { label: 'Units Liquidated', value: '748', detail: '42 Avg Days on Market' }
    ],
    highlights: [
      'Engineered complex DAX measures calculating Time Intelligence (YTD, Prior Year Comparison, Running Total).',
      'Integrated dynamic spatial visual (Azure Map layer) showing neighborhood sales intensity and median price per sq.ft.',
      'Constructed Automated Data Refresh pipeline using Power Query M script connected to SQL database server.'
    ],
    daxSnippet: `// Calculated DAX Measure for Sales YoY Growth %
Sales_YoY_Growth = 
VAR CurrentSales = SUM(FactSales[TotalAmount])
VAR PreviousYearSales = CALCULATE(
    SUM(FactSales[TotalAmount]),
    SAMEPERIODLASTYEAR('DimDate'[Date])
)
RETURN
DIVIDE(CurrentSales - PreviousYearSales, PreviousYearSales, 0)`
  },
  'marketing': {
    title: 'Multi-Channel Marketing Analytics & Attribution',
    subtitle: 'Power BI | Advanced Excel | SQL | Marketing ROI',
    image: 'assets/marketing_analytics_dashboard.jpg',
    description: 'Comprehensive business intelligence dashboard providing granular insights into digital campaign expenditure, conversion funnel dynamics, and customer acquisition efficiency (CAC vs LTV).',
    kpis: [
      { label: 'Total Revenue Generated', value: '$245,780', detail: '+18% vs Last Month' },
      { label: 'Blended ROI', value: '312%', detail: '4.1x Return on Ad Spend' },
      { label: 'Average CPA', value: '$18.50', detail: '-8.3% Cost Reduction' }
    ],
    highlights: [
      'Mapped customer funnel conversion metrics from impressions to paid subscriptions with stage-by-stage drop-off analytics.',
      'Developed custom RFM (Recency, Frequency, Monetary) customer segmentation matrix in Excel & Power BI.',
      'Optimized marketing spend allocation resulting in a 15% improvement in lead-to-opportunity conversion.'
    ],
    daxSnippet: `// Customer Acquisition Cost (CAC) Efficiency Metric
CAC_Per_Channel = 
VAR ChannelSpend = SUM(MarketingSpend[Cost])
VAR ConvertedLeads = COUNTROWS(FILTER(Leads, Leads[Status] = "Converted"))
RETURN 
IF(ConvertedLeads > 0, DIVIDE(ChannelSpend, ConvertedLeads), BLANK())`
  },
  'ecommerce': {
    title: 'E-Commerce Sales Performance & Customer Analytics',
    subtitle: 'Power BI | SQL | Python (Pandas) | Inventory Optimization',
    image: 'assets/ecommerce_dashboard.jpg',
    description: 'Operational & strategic dashboard designed for e-commerce executive leadership, tracking order volumes, SKU performance, geographical distribution, and customer retention metrics.',
    kpis: [
      { label: 'Gross Revenue', value: '$485,210', detail: '7,892 Completed Orders' },
      { label: 'Customer Retention Rate', value: '68.5%', detail: '+3.2% Quarter-over-Quarter' },
      { label: 'Avg Order Value (AOV)', value: '$135.45', detail: 'Basket size: 3.4 items' }
    ],
    highlights: [
      'Extracted & pre-processed 150k+ transaction records using Python (Pandas) and SQL window functions.',
      'Built automated anomaly detection alert system in Power BI for inventory stockout warnings.',
      'Visualized category revenue contribution with interactive visual slicers (Date Range, Region, Payment Gateway).'
    ],
    daxSnippet: `// Customer Retention Rate (Cohort Analysis)
Customer_Retention_Rate = 
VAR ActiveCustomers = DISTINCTCOUNT(Orders[CustomerID])
VAR RepeatCustomers = CALCULATE(
    DISTINCTCOUNT(Orders[CustomerID]),
    FILTER(Orders, Orders[OrderCount] > 1)
)
RETURN DIVIDE(RepeatCustomers, ActiveCustomers, 0)`
  }
};

window.openProjectModal = function(key) {
  const data = projectModalData[key];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-body-content');

  content.innerHTML = `
    <div class="space-y-6">
      <!-- Modal Header Image -->
      <div class="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
        <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
          <div>
            <span class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full badge-glow-cyan mb-2 inline-block">${data.subtitle}</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white leading-tight">${data.title}</h2>
          </div>
        </div>
      </div>

      <!-- Description -->
      <p class="text-slate-300 dark:text-slate-300 text-base leading-relaxed">${data.description}</p>

      <!-- KPI Cards Row -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        ${data.kpis.map(k => `
          <div class="glass-card p-4 rounded-xl border border-slate-800 text-center">
            <div class="text-xs text-slate-400 font-medium uppercase">${k.label}</div>
            <div class="text-2xl font-extrabold text-cyan-400 mt-1">${k.value}</div>
            <div class="text-xs text-emerald-400 font-semibold mt-1">${k.detail}</div>
          </div>
        `).join('')}
      </div>

      <!-- Key Project Highlights -->
      <div class="space-y-3">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <i class="fas fa-check-circle text-cyan-400"></i> Technical Implementation Highlights
        </h3>
        <ul class="space-y-2 text-sm text-slate-300">
          ${data.highlights.map(h => `
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- DAX / SQL Code Feature snippet -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <i class="fas fa-code text-indigo-400"></i> Featured Code / DAX Formula
          </h3>
          <span class="text-xs text-slate-500">Copy-ready</span>
        </div>
        <pre class="bg-slate-900/90 text-cyan-300 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 leading-relaxed font-mono"><code>${data.daxSnippet}</code></pre>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = 'auto';
};

/* -------------------------------------------------------------
 * 7. Interactive Business Analytics ROI Calculator
 * ------------------------------------------------------------- */
function initRoiCalculator() {
  const recordsInput = document.getElementById('roi-records');
  const hoursInput = document.getElementById('roi-hours');
  
  const recordsVal = document.getElementById('roi-records-val');
  const hoursVal = document.getElementById('roi-hours-val');

  const resSavedHours = document.getElementById('res-saved-hours');
  const resErrorReduction = document.getElementById('res-error-reduction');
  const resEstimatedRoi = document.getElementById('res-estimated-roi');

  if (!recordsInput || !hoursInput) return;

  function calculate() {
    const records = parseInt(recordsInput.value, 10);
    const hours = parseInt(hoursInput.value, 10);

    recordsVal.textContent = records.toLocaleString();
    hoursVal.textContent = hours + ' hrs';

    // Business Intelligence ROI Formulas:
    // Automated ETL reduces reporting time by 75%
    const savedHoursMonth = Math.round(hours * 0.75 * 4); // 4 weeks
    const errorReduction = Math.min(99, Math.round(85 + (records / 5000)));
    const annualSavings = Math.round(savedHoursMonth * 12 * 45); // $45/hr estimated analyst time cost

    if (resSavedHours) resSavedHours.textContent = savedHoursMonth + ' hrs/mo';
    if (resErrorReduction) resErrorReduction.textContent = errorReduction + '%';
    if (resEstimatedRoi) resEstimatedRoi.textContent = '$' + annualSavings.toLocaleString() + '/yr';
  }

  recordsInput.addEventListener('input', calculate);
  hoursInput.addEventListener('input', calculate);
  calculate();
}

/* -------------------------------------------------------------
 * 8. Contact Form Handling
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation feedback
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Sending...`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<i class="fas fa-check mr-2"></i> Message Sent!`;
      btn.classList.remove('bg-cyan-500', 'hover:bg-cyan-400');
      btn.classList.add('bg-emerald-500');

      if (toast) {
        toast.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(() => {
          toast.classList.add('translate-y-20', 'opacity-0');
        }, 4000);
      }

      form.reset();

      setTimeout(() => {
        btn.innerHTML = origText;
        btn.disabled = false;
        btn.classList.remove('bg-emerald-500');
        btn.classList.add('bg-cyan-500', 'hover:bg-cyan-400');
      }, 3000);
    }, 1200);
  });
}

/* -------------------------------------------------------------
 * 9. Scroll Animations (IntersectionObserver)
 * ------------------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
    observer.observe(el);
  });
}
