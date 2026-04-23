// ===== 全局状态 =====
let currentPage = 'dashboard';
const charts = {};

// ===== 菜单折叠 =====
function toggleNavGroup(header) {
  const items = header.nextElementSibling;
  const isCollapsed = header.classList.toggle('collapsed');
  if (isCollapsed) {
    items.style.maxHeight = '0px';
    items.classList.add('collapsed');
  } else {
    items.classList.remove('collapsed');
    items.style.maxHeight = items.scrollHeight + 'px';
  }
}

// 初始化所有菜单组为展开状态
function initNavGroups() {
  document.querySelectorAll('.nav-group-items').forEach(el => {
    el.style.maxHeight = el.scrollHeight + 'px';
  });
}

// ===== 导航切换 =====
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const page = item.dataset.page;
    if (page && page !== currentPage) {
      navigateTo(page);
    }
  });
});

function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) {
    navItem.classList.add('active');
    // 确保所属的菜单组是展开的
    const groupItems = navItem.closest('.nav-group-items');
    if (groupItems && groupItems.classList.contains('collapsed')) {
      const header = groupItems.previousElementSibling;
      if (header) toggleNavGroup(header);
    }
  }
  
  const pageNames = {
    dashboard: '工作台',
    order: '订单报表',
    budget: '预算管理',
    customer: '客户分析',
    purchase: '采购管理',
    finance: '结算财务',
    inventory: '库存分析',
    design: '设计分析',
    production: '生产排产',
    datasource: '数据源管理',
    'report-builder': '自定义报表',
    permissions: '权限管理',
    'offline-data': '线下数据维护'
  };
  
  // 面包屑增加板块路径
  const pageGroups = {
    order: '订单 & 销售',
    budget: '订单 & 销售',
    customer: '订单 & 销售',
    purchase: '采购',
    finance: '财务',
    inventory: '生产',
    design: '生产',
    production: '生产'
  };
  
  const group = pageGroups[page];
  const breadcrumb = document.getElementById('breadcrumb');
  if (group) {
    breadcrumb.innerHTML = `<span style="color:var(--text-light);font-weight:400;">${group}</span> <span style="margin:0 6px;color:var(--text-light);">/</span> <span>${pageNames[page] || page}</span>`;
  } else {
    breadcrumb.innerHTML = `<span>${pageNames[page] || page}</span>`;
  }
  
  renderPage(page);
}

// ===== 页面渲染 =====
function renderPage(page) {
  Object.values(charts).forEach(c => c.dispose());
  Object.keys(charts).forEach(k => delete charts[k]);
  
  const container = document.getElementById('pageContainer');
  const renderers = {
    dashboard: renderDashboard,
    order: renderOrder,
    budget: renderBudget,
    customer: renderCustomer,
    purchase: renderPurchase,
    finance: renderFinance,
    inventory: renderInventory,
    design: renderDesign,
    production: renderProduction,
    datasource: renderDatasource,
    'report-builder': renderReportBuilder,
    permissions: renderPermissions,
    'offline-data': renderOfflineData
  };
  
  const renderer = renderers[page];
  if (renderer) {
    container.innerHTML = `<div class="page-content">${renderer()}</div>`;
    if (typeof initPageCharts === 'function') initPageCharts(page);
  } else {
    container.innerHTML = `<div class="page-content"><div class="empty-state"><div class="icon">🚧</div><div class="title">功能开发中</div><div class="desc">该模块正在建设中，敬请期待</div></div></div>`;
  }
}

// ===== 工具函数 =====
function generateMonths() {
  return ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
}

function randData(count, min, max) {
  return Array.from({length: count}, () => Math.round(min + Math.random() * (max - min)));
}

function formatNum(n) {
  if (n >= 10000) return (n/10000).toFixed(1) + '万';
  return n.toLocaleString();
}

// 初始化
navigateTo('dashboard');
// 延迟初始化菜单组高度（等待DOM渲染完成）
setTimeout(initNavGroups, 100);
