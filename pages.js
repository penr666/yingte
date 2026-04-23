// ===== 工作台首页 =====
function renderDashboard() {
  return `
    <div class="page-header">
      <div class="page-title">工作台</div>
      <div class="page-desc">数据概览与快捷入口</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card blue">
        ${statIcon('order','blue')}
        <div class="stat-info">
          <div class="stat-label">本月新增订单</div>
          <div class="stat-value">1,285 万包</div>
          <div class="stat-change up">↑ 12.3% 同比</div>
        </div>
      </div>
      <div class="stat-card green">
        ${statIcon('trending','green')}
        <div class="stat-info">
          <div class="stat-label">本月发货量</div>
          <div class="stat-value">1,024 万包</div>
          <div class="stat-change up">↑ 8.5% 同比</div>
        </div>
      </div>
      <div class="stat-card yellow">
        ${statIcon('budget','yellow')}
        <div class="stat-info">
          <div class="stat-label">本月订单金额</div>
          <div class="stat-value">$3,560 万</div>
          <div class="stat-change up">↑ 15.2% 同比</div>
        </div>
      </div>
      <div class="stat-card purple">
        ${statIcon('customer','purple')}
        <div class="stat-info">
          <div class="stat-label">活跃客户数</div>
          <div class="stat-value">186</div>
          <div class="stat-change up">↑ 5 新增</div>
        </div>
      </div>
      <div class="stat-card red">
        ${statIcon('inventory','red')}
        <div class="stat-info">
          <div class="stat-label">当前库存总量</div>
          <div class="stat-value">2,350 万包</div>
          <div class="stat-change down">↓ 3.2%</div>
        </div>
      </div>
    </div>
    <div class="chart-grid cols-2">
      <div class="chart-box">
        <div class="chart-title">${icon('trending')} 年度订单趋势</div>
        <div class="chart-container" id="dash-order-trend"></div>
      </div>
      <div class="chart-box">
        <div class="chart-title">${icon('trophy')} 客户TOP5（订单金额）</div>
        <div class="chart-container" id="dash-customer-top"></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">${icon('list')} 常用报表快捷入口</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">
        <a href="#" onclick="navigateTo('order');return false;" class="shortcut-card">
          ${scIcon('order','blue')}<span style="font-size:13px;font-weight:500;">订单统计</span>
        </a>
        <a href="#" onclick="navigateTo('order');return false;" class="shortcut-card">
          ${scIcon('trending','green')}<span style="font-size:13px;font-weight:500;">发货数量</span>
        </a>
        <a href="#" onclick="navigateTo('finance');return false;" class="shortcut-card">
          ${scIcon('finance','yellow')}<span style="font-size:13px;font-weight:500;">欠款状况</span>
        </a>
        <a href="#" onclick="navigateTo('inventory');return false;" class="shortcut-card">
          ${scIcon('inventory','red')}<span style="font-size:13px;font-weight:500;">库存分析</span>
        </a>
        <a href="#" onclick="navigateTo('budget');return false;" class="shortcut-card">
          ${scIcon('budget','purple')}<span style="font-size:13px;font-weight:500;">滚动预算</span>
        </a>
        <a href="#" onclick="navigateTo('production');return false;" class="shortcut-card">
          ${scIcon('production','blue')}<span style="font-size:13px;font-weight:500;">排产计划</span>
        </a>
      </div>
    </div>
  `;
}

// ===== 订单报表页面 =====
function renderOrder() {
  return `
    <div class="page-header">
      <div class="page-title">订单报表</div>
      <div class="page-desc">订单数据统计、对比与分析</div>
    </div>
    <div class="tab-bar">
      <div class="tab-item active" onclick="switchOrderTab(this,'order-stat')">统计报表</div>
      <div class="tab-item" onclick="switchOrderTab(this,'order-compare')">同比对比</div>
      <div class="tab-item" onclick="switchOrderTab(this,'order-budget')">预算对比</div>
    </div>
    
    <div id="order-stat">
      <div class="filter-bar">
        <label>时间范围</label>
        <select><option>2026年</option><option>2025年</option></select>
        <label>包型</label>
        <select><option>全部</option><option>自然包</option><option>1000m</option><option>250m</option></select>
        <label>客户</label>
        <select><option>全部客户</option><option>客户A</option><option>客户B</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出Excel</button>
      </div>
      <div class="stat-grid">
        <div class="stat-card blue">
          ${statIcon('order','blue')}
          <div class="stat-info">
            <div class="stat-label">年度订单总量</div>
            <div class="stat-value">15,420 万包</div>
            <div class="stat-change up">↑ 10.2% 同比</div>
          </div>
        </div>
        <div class="stat-card green">
          ${statIcon('trending','green')}
          <div class="stat-info">
            <div class="stat-label">年度发货总量</div>
            <div class="stat-value">12,860 万包</div>
            <div class="stat-change up">↑ 8.7% 同比</div>
          </div>
        </div>
        <div class="stat-card yellow">
          ${statIcon('budget','yellow')}
          <div class="stat-info">
            <div class="stat-label">年度订单金额</div>
            <div class="stat-value">$42,350 万</div>
            <div class="stat-change up">↑ 14.5% 同比</div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-bottom:20px;">
        <div class="card-header">
          <div class="card-title">${icon('info')} 包型换算说明</div>
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap;padding:8px 0;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="tag tag-blue">自然包</span>
            <span style="color:var(--text-secondary);font-size:13px;">= 1个1000m包</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="tag tag-blue">自然包</span>
            <span style="color:var(--text-secondary);font-size:13px;">= 4个250m包</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="tag tag-green">1000m包</span>
            <span style="color:var(--text-secondary);font-size:13px;">= 4个250m包</span>
          </div>
        </div>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 订单统计（按月 · 包型分类）</div>
          <div class="chart-container" id="order-stat-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 发货数量（按月 · 包型分类）</div>
          <div class="chart-container" id="order-ship-chart"></div>
        </div>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('trending')} 订单金额趋势（按月）</div>
          <div class="chart-container" id="order-amount-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('table')} 订单明细（含包型换算）</div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th rowspan="2">月份</th>
                  <th colspan="3" style="text-align:center;border-bottom:1px solid var(--border);">原始订单量(万包)</th>
                  <th colspan="2" style="text-align:center;border-bottom:1px solid var(--border);background:#F0F4FF;">换算为自然包(万包)</th>
                  <th rowspan="2">金额($万)</th>
                </tr>
                <tr>
                  <th>自然包</th><th>1000m</th><th>250m</th>
                  <th style="background:#F0F4FF;">1000m→自然包</th><th style="background:#F0F4FF;">250m→自然包</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1月</td><td class="num">320</td><td class="num">580</td><td class="num">385</td><td class="num" style="background:#F8FAFC;">580</td><td class="num" style="background:#F8FAFC;">96.3</td><td class="num">3,560</td></tr>
                <tr><td>2月</td><td class="num">285</td><td class="num">520</td><td class="num">340</td><td class="num" style="background:#F8FAFC;">520</td><td class="num" style="background:#F8FAFC;">85.0</td><td class="num">3,180</td></tr>
                <tr><td>3月</td><td class="num">350</td><td class="num">620</td><td class="num">410</td><td class="num" style="background:#F8FAFC;">620</td><td class="num" style="background:#F8FAFC;">102.5</td><td class="num">3,820</td></tr>
                <tr><td>4月</td><td class="num">310</td><td class="num">560</td><td class="num">375</td><td class="num" style="background:#F8FAFC;">560</td><td class="num" style="background:#F8FAFC;">93.8</td><td class="num">3,450</td></tr>
                <tr><td>5月</td><td class="num">340</td><td class="num">600</td><td class="num">395</td><td class="num" style="background:#F8FAFC;">600</td><td class="num" style="background:#F8FAFC;">98.8</td><td class="num">3,700</td></tr>
                <tr><td>6月</td><td class="num">330</td><td class="num">580</td><td class="num">370</td><td class="num" style="background:#F8FAFC;">580</td><td class="num" style="background:#F8FAFC;">92.5</td><td class="num">3,550</td></tr>
                <tr><td>7月</td><td class="num">350</td><td class="num">610</td><td class="num">390</td><td class="num" style="background:#F8FAFC;">610</td><td class="num" style="background:#F8FAFC;">97.5</td><td class="num">3,720</td></tr>
                <tr><td>8月</td><td class="num">320</td><td class="num">570</td><td class="num">400</td><td class="num" style="background:#F8FAFC;">570</td><td class="num" style="background:#F8FAFC;">100.0</td><td class="num">3,480</td></tr>
                <tr><td>9月</td><td class="num">360</td><td class="num">630</td><td class="num">410</td><td class="num" style="background:#F8FAFC;">630</td><td class="num" style="background:#F8FAFC;">102.5</td><td class="num">3,880</td></tr>
                <tr><td>10月</td><td class="num">340</td><td class="num">600</td><td class="num">380</td><td class="num" style="background:#F8FAFC;">600</td><td class="num" style="background:#F8FAFC;">95.0</td><td class="num">3,660</td></tr>
                <tr><td>11月</td><td class="num">350</td><td class="num">620</td><td class="num">410</td><td class="num" style="background:#F8FAFC;">620</td><td class="num" style="background:#F8FAFC;">102.5</td><td class="num">3,820</td></tr>
                <tr><td>12月</td><td class="num">370</td><td class="num">650</td><td class="num">430</td><td class="num" style="background:#F8FAFC;">650</td><td class="num" style="background:#F8FAFC;">107.5</td><td class="num">4,010</td></tr>
                <tr style="font-weight:600;background:#F8FAFC;">
                  <td>合计</td><td class="num">3,975</td><td class="num">7,120</td><td class="num">4,735</td>
                  <td class="num" style="background:#F0F4FF;">7,120</td><td class="num" style="background:#F0F4FF;">1,183.8</td>
                  <td class="num">44,330</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 发货明细（含包型换算）</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th rowspan="2">月份</th>
                <th colspan="3" style="text-align:center;border-bottom:1px solid var(--border);">原始发货量(万包)</th>
                <th colspan="2" style="text-align:center;border-bottom:1px solid var(--border);background:#F0F4FF;">换算为自然包(万包)</th>
                <th rowspan="2">换算后合计<br><span style="font-weight:400;font-size:11px;">(万自然包)</span></th>
              </tr>
              <tr>
                <th>自然包</th><th>1000m</th><th>250m</th>
                <th style="background:#F0F4FF;">1000m→自然包</th><th style="background:#F0F4FF;">250m→自然包</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1月</td><td class="num">260</td><td class="num">470</td><td class="num">294</td><td class="num" style="background:#F8FAFC;">470</td><td class="num" style="background:#F8FAFC;">73.5</td><td class="num" style="font-weight:600;">803.5</td></tr>
              <tr><td>2月</td><td class="num">230</td><td class="num">420</td><td class="num">330</td><td class="num" style="background:#F8FAFC;">420</td><td class="num" style="background:#F8FAFC;">82.5</td><td class="num" style="font-weight:600;">732.5</td></tr>
              <tr><td>3月</td><td class="num">280</td><td class="num">500</td><td class="num">340</td><td class="num" style="background:#F8FAFC;">500</td><td class="num" style="background:#F8FAFC;">85.0</td><td class="num" style="font-weight:600;">865.0</td></tr>
              <tr><td>4月</td><td class="num">250</td><td class="num">450</td><td class="num">350</td><td class="num" style="background:#F8FAFC;">450</td><td class="num" style="background:#F8FAFC;">87.5</td><td class="num" style="font-weight:600;">787.5</td></tr>
              <tr><td>5月</td><td class="num">270</td><td class="num">480</td><td class="num">350</td><td class="num" style="background:#F8FAFC;">480</td><td class="num" style="background:#F8FAFC;">87.5</td><td class="num" style="font-weight:600;">837.5</td></tr>
              <tr><td>6月</td><td class="num">260</td><td class="num">460</td><td class="num">340</td><td class="num" style="background:#F8FAFC;">460</td><td class="num" style="background:#F8FAFC;">85.0</td><td class="num" style="font-weight:600;">805.0</td></tr>
              <tr><td>7月</td><td class="num">280</td><td class="num">490</td><td class="num">350</td><td class="num" style="background:#F8FAFC;">490</td><td class="num" style="background:#F8FAFC;">87.5</td><td class="num" style="font-weight:600;">857.5</td></tr>
              <tr><td>8月</td><td class="num">255</td><td class="num">460</td><td class="num">365</td><td class="num" style="background:#F8FAFC;">460</td><td class="num" style="background:#F8FAFC;">91.3</td><td class="num" style="font-weight:600;">806.3</td></tr>
              <tr><td>9月</td><td class="num">290</td><td class="num">510</td><td class="num">350</td><td class="num" style="background:#F8FAFC;">510</td><td class="num" style="background:#F8FAFC;">87.5</td><td class="num" style="font-weight:600;">887.5</td></tr>
              <tr><td>10月</td><td class="num">270</td><td class="num">480</td><td class="num">340</td><td class="num" style="background:#F8FAFC;">480</td><td class="num" style="background:#F8FAFC;">85.0</td><td class="num" style="font-weight:600;">835.0</td></tr>
              <tr><td>11月</td><td class="num">280</td><td class="num">500</td><td class="num">360</td><td class="num" style="background:#F8FAFC;">500</td><td class="num" style="background:#F8FAFC;">90.0</td><td class="num" style="font-weight:600;">870.0</td></tr>
              <tr><td>12月</td><td class="num">300</td><td class="num">520</td><td class="num">380</td><td class="num" style="background:#F8FAFC;">520</td><td class="num" style="background:#F8FAFC;">95.0</td><td class="num" style="font-weight:600;">915.0</td></tr>
              <tr style="font-weight:600;background:#F8FAFC;">
                <td>合计</td><td class="num">3,225</td><td class="num">5,740</td><td class="num">4,065</td>
                <td class="num" style="background:#F0F4FF;">5,740</td><td class="num" style="background:#F0F4FF;">1,016.3</td>
                <td class="num" style="background:#F0F4FF;">9,981.3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="order-compare" style="display:none;">
      <div class="filter-bar">
        <label>对比年份</label>
        <select><option>2026 vs 2025</option><option>2025 vs 2024</option></select>
        <label>维度</label>
        <select><option>按客户</option><option>按规格</option><option>合计</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出Excel</button>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 订单数量同比</div>
          <div class="chart-container" id="order-yoy-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 发货数量同比</div>
          <div class="chart-container" id="ship-yoy-chart"></div>
        </div>
      </div>
      <div class="chart-grid cols-1">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 订单金额同比</div>
          <div class="chart-container" id="amount-yoy-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 同比数据明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>月份</th><th>本年订单量(万包)</th><th>去年订单量(万包)</th><th>同比增减(万包)</th><th>同比%</th><th>本年金额($万)</th><th>去年金额($万)</th><th>金额同比%</th></tr></thead>
            <tbody>
              <tr><td>1月</td><td class="num">1,285</td><td class="num">1,145</td><td class="num positive">+140</td><td class="num positive">+12.2%</td><td class="num">3,560</td><td class="num">3,180</td><td class="num positive">+11.9%</td></tr>
              <tr><td>2月</td><td class="num">1,145</td><td class="num">1,020</td><td class="num positive">+125</td><td class="num positive">+12.3%</td><td class="num">3,180</td><td class="num">2,850</td><td class="num positive">+11.6%</td></tr>
              <tr><td>3月</td><td class="num">1,380</td><td class="num">1,230</td><td class="num positive">+150</td><td class="num positive">+12.2%</td><td class="num">3,820</td><td class="num">3,400</td><td class="num positive">+12.4%</td></tr>
              <tr><td>4月</td><td class="num">1,245</td><td class="num">1,150</td><td class="num positive">+95</td><td class="num positive">+8.3%</td><td class="num">3,450</td><td class="num">3,100</td><td class="num positive">+11.3%</td></tr>
              <tr><td>5月</td><td class="num">1,335</td><td class="num">1,210</td><td class="num positive">+125</td><td class="num positive">+10.3%</td><td class="num">3,700</td><td class="num">3,280</td><td class="num positive">+12.8%</td></tr>
              <tr><td>6月</td><td class="num">1,280</td><td class="num">1,160</td><td class="num positive">+120</td><td class="num positive">+10.3%</td><td class="num">3,550</td><td class="num">3,150</td><td class="num positive">+12.7%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="order-budget" style="display:none;">
      <div class="filter-bar">
        <label>对比类型</label>
        <select><option>订单销售额 vs 预算</option><option>发货销售额 vs 预算</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出Excel</button>
      </div>
      <div class="chart-grid cols-1">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 订单销售额与年度预算、滚动预算对比</div>
          <div class="chart-container" id="order-vs-budget-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 对比数据明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>月份</th><th>实际销售额($万)</th><th>年度预算($万)</th><th>滚动预算($万)</th><th>vs年度预算</th><th>vs滚动预算</th></tr></thead>
            <tbody>
              <tr><td>1月</td><td class="num">3,560</td><td class="num">3,400</td><td class="num">3,500</td><td class="num positive">+4.7%</td><td class="num positive">+1.7%</td></tr>
              <tr><td>2月</td><td class="num">3,180</td><td class="num">3,200</td><td class="num">3,150</td><td class="num negative">-0.6%</td><td class="num positive">+1.0%</td></tr>
              <tr><td>3月</td><td class="num">3,820</td><td class="num">3,500</td><td class="num">3,650</td><td class="num positive">+9.1%</td><td class="num positive">+4.7%</td></tr>
              <tr><td>4月</td><td class="num">3,450</td><td class="num">3,400</td><td class="num">3,420</td><td class="num positive">+1.5%</td><td class="num positive">+0.9%</td></tr>
              <tr><td>5月</td><td class="num">3,700</td><td class="num">3,650</td><td class="num">3,600</td><td class="num positive">+1.4%</td><td class="num positive">+2.8%</td></tr>
              <tr><td>6月</td><td class="num">3,550</td><td class="num">3,500</td><td class="num">3,480</td><td class="num positive">+1.4%</td><td class="num positive">+2.0%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function switchOrderTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['order-stat','order-compare','order-budget'].forEach(id => {
    document.getElementById(id).style.display = id === tabId ? '' : 'none';
  });
  if (tabId === 'order-compare') {
    setTimeout(() => initPageCharts('order-compare'), 50);
  } else if (tabId === 'order-budget') {
    setTimeout(() => initPageCharts('order-budget'), 50);
  }
}

// ===== 预算管理 =====
function renderBudget() {
  return `
    <div class="page-header">
      <div class="page-title">预算管理</div>
      <div class="page-desc">年度预算与滚动预算查看及维护</div>
    </div>
    <div class="tab-bar">
      <div class="tab-item active" onclick="switchBudgetTab(this,'budget-annual')">年度预算</div>
      <div class="tab-item" onclick="switchBudgetTab(this,'budget-rolling')">滚动预算</div>
    </div>
    <div id="budget-annual">
      <div class="filter-bar">
        <label>预算年度</label><select><option>2026</option><option>2025</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">上传新版本</button>
        <button class="btn btn-outline">导出明细</button>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">${icon('table')} 年度预算明细</div>
          <span class="tag tag-green">确定版本 · 不再变更</span>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>月份</th><th>预算量(万包)</th><th>预算价($/千包)</th><th>预算金额($万)</th><th>客户分类</th><th>规格</th></tr></thead>
            <tbody>
              <tr><td>1月</td><td class="num">1,200</td><td class="num">2,850</td><td class="num">3,420</td><td>VMI客户</td><td>全部</td></tr>
              <tr><td>2月</td><td class="num">1,150</td><td class="num">2,780</td><td class="num">3,197</td><td>全清客户</td><td>全部</td></tr>
              <tr><td>3月</td><td class="num">1,300</td><td class="num">2,900</td><td class="num">3,770</td><td>全清客户</td><td>全部</td></tr>
              <tr><td>4月</td><td class="num">1,250</td><td class="num">2,720</td><td class="num">3,400</td><td>VMI客户</td><td>全部</td></tr>
              <tr><td>5月</td><td class="num">1,280</td><td class="num">2,850</td><td class="num">3,648</td><td>全清客户</td><td>全部</td></tr>
              <tr><td>6月</td><td class="num">1,320</td><td class="num">2,900</td><td class="num">3,828</td><td>VMI客户</td><td>全部</td></tr>
              <tr><td>7月</td><td class="num">1,350</td><td class="num">2,880</td><td class="num">3,888</td><td>全清客户</td><td>全部</td></tr>
              <tr><td>8月</td><td class="num">1,290</td><td class="num">2,710</td><td class="num">3,496</td><td>VMI客户</td><td>全部</td></tr>
              <tr><td>9月</td><td class="num">1,400</td><td class="num">2,860</td><td class="num">4,004</td><td>全清客户</td><td>全部</td></tr>
              <tr><td>10月</td><td class="num">1,320</td><td class="num">2,690</td><td class="num">3,551</td><td>VMI客户</td><td>全部</td></tr>
              <tr><td>11月</td><td class="num">1,380</td><td class="num">2,830</td><td class="num">3,905</td><td>全清客户</td><td>全部</td></tr>
              <tr><td>12月</td><td class="num">1,450</td><td class="num">2,910</td><td class="num">4,220</td><td>VMI客户</td><td>全部</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="budget-rolling" style="display:none;">
      <div class="filter-bar">
        <label>预算版本</label><select><option>V6 (2026年4月)</option><option>V5 (2026年3月)</option><option>V4 (2026年2月)</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">上传新版本</button>
        <button class="btn btn-outline">导出明细</button>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">${icon('table')} 滚动预算明细</div>
          <span class="tag tag-blue">V6 · 2026年4月更新</span>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>月份</th><th>预算量(万包)</th><th>预算价($/千包)</th><th>预算金额($万)</th><th>备注</th><th>版本</th></tr></thead>
            <tbody>
              <tr><td>1月</td><td class="num">1,250</td><td class="num">2,850</td><td class="num">3,563</td><td>已锁定</td><td><span class="tag tag-green">实际</span></td></tr>
              <tr><td>2月</td><td class="num">1,100</td><td class="num">2,780</td><td class="num">3,058</td><td>已锁定</td><td><span class="tag tag-green">实际</span></td></tr>
              <tr><td>3月</td><td class="num">1,350</td><td class="num">2,900</td><td class="num">3,915</td><td>已锁定</td><td><span class="tag tag-green">实际</span></td></tr>
              <tr><td>4月</td><td class="num">1,220</td><td class="num">2,810</td><td class="num">3,428</td><td>当月预测</td><td><span class="tag tag-yellow">预测</span></td></tr>
              <tr><td>5月</td><td class="num">1,300</td><td class="num">2,770</td><td class="num">3,601</td><td>预测</td><td><span class="tag tag-blue">滚动</span></td></tr>
              <tr><td>6月</td><td class="num">1,350</td><td class="num">2,580</td><td class="num">3,483</td><td>预测</td><td><span class="tag tag-blue">滚动</span></td></tr>
              <tr><td>7月</td><td class="num">1,400</td><td class="num">2,780</td><td class="num">3,892</td><td>预测</td><td><span class="tag tag-blue">滚动</span></td></tr>
              <tr><td>8月</td><td class="num">1,320</td><td class="num">2,650</td><td class="num">3,498</td><td>预测</td><td><span class="tag tag-blue">滚动</span></td></tr>
              <tr><td>9月</td><td class="num">1,440</td><td class="num">2,700</td><td class="num">3,888</td><td>预测</td><td><span class="tag tag-blue">滚动</span></td></tr>
              <tr><td>10月</td><td class="num">1,360</td><td class="num">2,620</td><td class="num">3,563</td><td>预测</td><td><span class="tag tag-blue">滚动</span></td></tr>
              <tr><td>11月</td><td class="num">1,420</td><td class="num">2,750</td><td class="num">3,905</td><td>预测</td><td><span class="tag tag-blue">滚动</span></td></tr>
              <tr><td>12月</td><td class="num">1,500</td><td class="num">2,820</td><td class="num">4,230</td><td>预测</td><td><span class="tag tag-blue">滚动</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="chart-grid cols-1">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 滚动预算版本对比</div>
          <div class="chart-container" id="rolling-budget-chart"></div>
        </div>
      </div>
    </div>
  `;
}

function switchBudgetTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['budget-annual','budget-rolling'].forEach(id => {
    document.getElementById(id).style.display = id === tabId ? '' : 'none';
  });
  if (tabId === 'budget-rolling') initPageCharts('budget-rolling');
}

// ===== 客户分析 =====
function renderCustomer() {
  return `
    <div class="page-header">
      <div class="page-title">客户分析</div>
      <div class="page-desc">客户排名与客户生命周期分析</div>
    </div>
    <div class="tab-bar">
      <div class="tab-item active" onclick="switchCustomerTab(this,'customer-rank')">客户排名</div>
      <div class="tab-item" onclick="switchCustomerTab(this,'customer-analysis')">客户分析</div>
    </div>
    <div id="customer-rank">
      <div class="filter-bar">
        <label>统计年度</label><select><option>2026年</option><option>2025年</option></select>
        <label>排名维度</label><select><option>累计销售额</option><option>订单量</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出图表</button>
      </div>
      <div class="chart-grid cols-1">
        <div class="chart-box">
          <div class="chart-title">${icon('trophy')} 客户累计销售额排名 TOP10</div>
          <div class="chart-container" id="customer-rank-chart" style="height:400px;"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 客户排名明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>排名</th><th>客户编码</th><th>客户名称</th><th>累计销售额($万)</th><th>订单量(万包)</th><th>同比</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>C001</td><td>客户A</td><td class="num">8,560</td><td class="num">2,850</td><td class="num positive">+15.2%</td></tr>
              <tr><td>2</td><td>C002</td><td>客户B</td><td class="num">6,320</td><td class="num">2,100</td><td class="num positive">+8.7%</td></tr>
              <tr><td>3</td><td>C003</td><td>客户C</td><td class="num">5,180</td><td class="num">1,720</td><td class="num negative">-3.2%</td></tr>
              <tr><td>4</td><td>C004</td><td>客户D</td><td class="num">4,950</td><td class="num">1,650</td><td class="num positive">+12.1%</td></tr>
              <tr><td>5</td><td>C005</td><td>客户E</td><td class="num">3,870</td><td class="num">1,290</td><td class="num positive">+6.5%</td></tr>
              <tr><td>6</td><td>C006</td><td>客户F</td><td class="num">3,420</td><td class="num">1,140</td><td class="num positive">+4.2%</td></tr>
              <tr><td>7</td><td>C007</td><td>客户G</td><td class="num">2,980</td><td class="num">990</td><td class="num negative">-1.8%</td></tr>
              <tr><td>8</td><td>C008</td><td>客户H</td><td class="num">2,650</td><td class="num">880</td><td class="num positive">+7.6%</td></tr>
              <tr><td>9</td><td>C009</td><td>客户I</td><td class="num">2,310</td><td class="num">770</td><td class="num positive">+3.1%</td></tr>
              <tr><td>10</td><td>C010</td><td>客户J</td><td class="num">2,050</td><td class="num">680</td><td class="num positive">+9.4%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="customer-analysis" style="display:none;">
      <div class="filter-bar">
        <label>时间范围</label><select><option>2026年</option><option>2025年</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出明细</button>
      </div>
      <div class="stat-grid">
        <div class="stat-card blue">
          ${statIcon('customer','blue')}
          <div class="stat-info">
            <div class="stat-label">全量客户</div>
            <div class="stat-value">245</div>
          </div>
        </div>
        <div class="stat-card green">
          ${statIcon('newuser','green')}
          <div class="stat-info">
            <div class="stat-label">新增客户</div>
            <div class="stat-value">18</div>
            <div class="stat-change" style="font-size:11px;color:var(--text-light);">近24个月未出现的客户编码首次下单</div>
          </div>
        </div>
        <div class="stat-card red">
          ${statIcon('alert','red')}
          <div class="stat-info">
            <div class="stat-label">流失客户</div>
            <div class="stat-value">12</div>
            <div class="stat-change" style="font-size:11px;color:var(--text-light);">近12个月无订单</div>
          </div>
        </div>
        <div class="stat-card purple">
          ${statIcon('star','purple')}
          <div class="stat-info">
            <div class="stat-label">忠实客户</div>
            <div class="stat-value">215</div>
          </div>
        </div>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 客户分类数量趋势</div>
          <div class="chart-container" id="customer-type-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('pie')} 客户结构占比</div>
          <div class="chart-container" id="customer-pie-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 新增/流失客户明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>客户编码</th><th>客户名称</th><th>类型</th><th>首次/末次订单日</th><th>累计订单量(万包)</th><th>累计销售额($万)</th></tr></thead>
            <tbody>
              <tr><td>C020</td><td>客户T</td><td><span class="tag tag-green">新增</span></td><td>2026-03-15</td><td class="num">85</td><td class="num">245</td></tr>
              <tr><td>C021</td><td>客户U</td><td><span class="tag tag-green">新增</span></td><td>2026-02-20</td><td class="num">42</td><td class="num">118</td></tr>
              <tr><td>C022</td><td>客户V</td><td><span class="tag tag-green">新增</span></td><td>2026-04-08</td><td class="num">28</td><td class="num">76</td></tr>
              <tr><td>C015</td><td>客户O</td><td><span class="tag tag-red">流失</span></td><td>2025-03-10</td><td class="num">320</td><td class="num">890</td></tr>
              <tr><td>C018</td><td>客户R</td><td><span class="tag tag-red">流失</span></td><td>2025-05-22</td><td class="num">156</td><td class="num">430</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function switchCustomerTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['customer-rank','customer-analysis'].forEach(id => {
    document.getElementById(id).style.display = id === tabId ? '' : 'none';
  });
  if (tabId === 'customer-analysis') initPageCharts('customer-analysis');
}

// ===== 结算&财务 =====
function renderFinance() {
  return `
    <div class="page-header">
      <div class="page-title">结算财务</div>
      <div class="page-desc">欠款状况与回款分析</div>
    </div>
    <div class="tab-bar">
      <div class="tab-item active" onclick="switchFinanceTab(this,'finance-ar')">欠款与收入对比</div>
      <div class="tab-item" onclick="switchFinanceTab(this,'finance-version')">欠款版本对比</div>
    </div>
    <div id="finance-ar">
      <div class="filter-bar">
        <label>时间</label><select><option>截至当前</option><option>2026年3月末</option></select>
        <label>订单类型</label>
        <select><option>全部</option><option>全清订单</option><option>VMI</option><option>Call-off</option></select>
        <label>币种</label><select><option>美元(USD)</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出明细</button>
      </div>
      <div class="stat-grid">
        <div class="stat-card blue">
          ${statIcon('finance','blue')}
          <div class="stat-info">
            <div class="stat-label">应收总额</div>
            <div class="stat-value">$12,580 万</div>
          </div>
        </div>
        <div class="stat-card green">
          ${statIcon('clock','green')}
          <div class="stat-info">
            <div class="stat-label">1-30天欠款</div>
            <div class="stat-value">$4,250 万</div>
          </div>
        </div>
        <div class="stat-card yellow">
          ${statIcon('clock','yellow')}
          <div class="stat-info">
            <div class="stat-label">31-60天欠款</div>
            <div class="stat-value">$3,180 万</div>
          </div>
        </div>
        <div class="stat-card red">
          ${statIcon('alert','red')}
          <div class="stat-info">
            <div class="stat-label">61-90天欠款</div>
            <div class="stat-value">$2,850 万</div>
          </div>
        </div>
        <div class="stat-card red">
          ${statIcon('alert','red')}
          <div class="stat-info">
            <div class="stat-label">>91天欠款</div>
            <div class="stat-value">$2,300 万</div>
          </div>
        </div>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('pie')} 欠款周期分布</div>
          <div class="chart-container" id="ar-period-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 预计回款趋势（按月）</div>
          <div class="chart-container" id="ar-payment-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 欠款明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>客户</th><th>订单号</th><th>订单类型</th><th>订单量(万包)</th><th>欠款金额($万)</th><th>欠款天数</th><th>欠款周期</th><th>预计付款日</th></tr></thead>
            <tbody>
              <tr><td>客户A</td><td>PO-2026-001</td><td><span class="tag tag-blue">全清</span></td><td class="num">280</td><td class="num">856</td><td class="num">25</td><td><span class="tag tag-green">1-30天</span></td><td>2026-05-15</td></tr>
              <tr><td>客户B</td><td>PO-2026-015</td><td><span class="tag tag-purple">VMI</span></td><td class="num">195</td><td class="num">620</td><td class="num">45</td><td><span class="tag tag-yellow">31-60天</span></td><td>2026-05-20</td></tr>
              <tr><td>客户C</td><td>PO-2025-089</td><td><span class="tag tag-blue">全清</span></td><td class="num">420</td><td class="num">1,250</td><td class="num">78</td><td><span class="tag tag-red">61-90天</span></td><td>2026-06-01</td></tr>
              <tr><td>客户D</td><td>PO-2025-052</td><td><span class="tag tag-green">Call-off</span></td><td class="num">150</td><td class="num">480</td><td class="num">120</td><td><span class="tag tag-red">&gt;91天</span></td><td>待确认</td></tr>
              <tr><td>客户A</td><td>PO-2026-022</td><td><span class="tag tag-blue">全清</span></td><td class="num">350</td><td class="num">1,020</td><td class="num">18</td><td><span class="tag tag-green">1-30天</span></td><td>2026-05-10</td></tr>
              <tr><td>客户E</td><td>PO-2025-110</td><td><span class="tag tag-purple">VMI</span></td><td class="num">88</td><td class="num">310</td><td class="num">65</td><td><span class="tag tag-red">61-90天</span></td><td>2026-05-25</td></tr>
              <tr><td>客户F</td><td>PO-2026-008</td><td><span class="tag tag-green">Call-off</span></td><td class="num">520</td><td class="num">1,580</td><td class="num">12</td><td><span class="tag tag-green">1-30天</span></td><td>2026-05-05</td></tr>
              <tr><td>客户G</td><td>PO-2025-075</td><td><span class="tag tag-blue">全清</span></td><td class="num">75</td><td class="num">215</td><td class="num">95</td><td><span class="tag tag-red">&gt;91天</span></td><td>待确认</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="finance-version" style="display:none;">
      <div class="filter-bar">
        <label>对比版本</label><select><option>本月 vs 上月</option><option>本月 vs 上季度</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出统计图</button>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 欠款状况月度对比</div>
          <div class="chart-container" id="ar-version-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('table')} 版本对比数据</div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead><tr><th>欠款周期</th><th>4月($万)</th><th>3月($万)</th><th>变化</th></tr></thead>
              <tbody>
                <tr><td>1-30天</td><td class="num">4,250</td><td class="num">3,980</td><td class="num positive">+270</td></tr>
                <tr><td>31-60天</td><td class="num">3,180</td><td class="num">3,520</td><td class="num negative">-340</td></tr>
                <tr><td>61-90天</td><td class="num">2,850</td><td class="num">2,100</td><td class="num negative">+750</td></tr>
                <tr><td>&gt;91天</td><td class="num">2,300</td><td class="num">2,500</td><td class="num positive">-200</td></tr>
                <tr style="font-weight:600;"><td>合计</td><td class="num">12,580</td><td class="num">13,100</td><td class="num positive">-520</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 欠款版本对比明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>客户</th><th>4月欠款($万)</th><th>3月欠款($万)</th><th>变化($万)</th><th>欠款周期</th><th>趋势</th></tr></thead>
            <tbody>
              <tr><td>客户A</td><td class="num">1,876</td><td class="num">2,120</td><td class="num positive">-244</td><td>1-30天</td><td class="num positive">↓ 好转</td></tr>
              <tr><td>客户B</td><td class="num">620</td><td class="num">580</td><td class="num negative">+40</td><td>31-60天</td><td class="num negative">↑ 增加</td></tr>
              <tr><td>客户C</td><td class="num">1,250</td><td class="num">980</td><td class="num negative">+270</td><td>61-90天</td><td class="num negative">↑ 增加</td></tr>
              <tr><td>客户D</td><td class="num">480</td><td class="num">560</td><td class="num positive">-80</td><td>&gt;91天</td><td class="num positive">↓ 好转</td></tr>
              <tr><td>客户E</td><td class="num">310</td><td class="num">280</td><td class="num negative">+30</td><td>61-90天</td><td class="num negative">↑ 增加</td></tr>
              <tr><td>客户F</td><td class="num">1,580</td><td class="num">1,420</td><td class="num negative">+160</td><td>1-30天</td><td class="num negative">↑ 增加</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function switchFinanceTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['finance-ar','finance-version'].forEach(id => {
    document.getElementById(id).style.display = id === tabId ? '' : 'none';
  });
  if (tabId === 'finance-version') initPageCharts('finance-version');
}

// ===== 库存分析 =====
function renderInventory() {
  return `
    <div class="page-header">
      <div class="page-title">库存分析</div>
      <div class="page-desc">库存状况、版本对比与库龄分析</div>
    </div>
    <div class="tab-bar">
      <div class="tab-item active" onclick="switchInventoryTab(this,'inv-status')">库存状况</div>
      <div class="tab-item" onclick="switchInventoryTab(this,'inv-version')">版本对比</div>
      <div class="tab-item" onclick="switchInventoryTab(this,'inv-age')">库龄分析</div>
    </div>
    <div id="inv-status">
      <div class="filter-bar">
        <label>工厂</label><select><option>全部工厂</option><option>F3</option><option>F5</option></select>
        <label>维度</label><select><option>按规格</option><option>按规格+客户</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出图表/明细</button>
      </div>
      <div class="stat-grid">
        <div class="stat-card blue">
          ${statIcon('inventory','blue')}
          <div class="stat-info">
            <div class="stat-label">总库存量</div>
            <div class="stat-value">2,350 万包</div>
          </div>
        </div>
        <div class="stat-card green">
          ${statIcon('production','green')}
          <div class="stat-info">
            <div class="stat-label">F3 工厂</div>
            <div class="stat-value">1,420 万包</div>
          </div>
        </div>
        <div class="stat-card purple">
          ${statIcon('production','purple')}
          <div class="stat-info">
            <div class="stat-label">F5 工厂</div>
            <div class="stat-value">930 万包</div>
          </div>
        </div>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('pie')} 库存分布（按规格）</div>
          <div class="chart-container" id="inv-spec-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('pie')} 库存分布（按工厂）</div>
          <div class="chart-container" id="inv-factory-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 库存明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>工厂</th><th>规格</th><th>客户编码</th><th>客户名称</th><th>库存量(万包)</th><th>库龄(天)</th><th>库龄区间</th></tr></thead>
            <tbody>
              <tr><td>F3</td><td>SP-A100</td><td>C001</td><td>客户A</td><td class="num">320</td><td class="num">15</td><td><span class="tag tag-green">0-30天</span></td></tr>
              <tr><td>F3</td><td>SP-B200</td><td>C002</td><td>客户B</td><td class="num">280</td><td class="num">45</td><td><span class="tag tag-blue">31-90天</span></td></tr>
              <tr><td>F3</td><td>SP-A100</td><td>C004</td><td>客户D</td><td class="num">195</td><td class="num">22</td><td><span class="tag tag-green">0-30天</span></td></tr>
              <tr><td>F3</td><td>SP-C300</td><td>C005</td><td>客户E</td><td class="num">180</td><td class="num">68</td><td><span class="tag tag-blue">31-90天</span></td></tr>
              <tr><td>F3</td><td>SP-D400</td><td>C001</td><td>客户A</td><td class="num">220</td><td class="num">110</td><td><span class="tag tag-yellow">91-180天</span></td></tr>
              <tr><td>F3</td><td>SP-E500</td><td>C003</td><td>客户C</td><td class="num">225</td><td class="num">200</td><td><span class="tag tag-red">181-360天</span></td></tr>
              <tr><td>F5</td><td>SP-A100</td><td>C003</td><td>客户C</td><td class="num">190</td><td class="num">25</td><td><span class="tag tag-green">0-30天</span></td></tr>
              <tr><td>F5</td><td>SP-C300</td><td>C005</td><td>客户E</td><td class="num">420</td><td class="num">120</td><td><span class="tag tag-yellow">91-180天</span></td></tr>
              <tr><td>F5</td><td>SP-B200</td><td>C006</td><td>客户F</td><td class="num">155</td><td class="num">38</td><td><span class="tag tag-blue">31-90天</span></td></tr>
              <tr><td>F5</td><td>SP-E500</td><td>C008</td><td>客户H</td><td class="num">165</td><td class="num">280</td><td><span class="tag tag-red">181-360天</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="inv-version" style="display:none;">
      <div class="filter-bar">
        <label>对比周期</label><select><option>本期 vs 上期（双周）</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出图表/明细</button>
      </div>
      <div class="chart-grid cols-1">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 库存数据双周版本对比</div>
          <div class="chart-container" id="inv-version-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">${icon('table')} 版本对比明细</div>
          <span class="tag tag-blue">双周版本 · 自动记录</span>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>规格</th><th>本期库存(万包)</th><th>上期库存(万包)</th><th>变化量(万包)</th><th>变化率</th></tr></thead>
            <tbody>
              <tr><td>SP-A100</td><td class="num">510</td><td class="num">480</td><td class="num positive">+30</td><td class="num positive">+6.3%</td></tr>
              <tr><td>SP-B200</td><td class="num">280</td><td class="num">350</td><td class="num negative">-70</td><td class="num negative">-20.0%</td></tr>
              <tr><td>SP-C300</td><td class="num">420</td><td class="num">400</td><td class="num positive">+20</td><td class="num positive">+5.0%</td></tr>
              <tr><td>SP-D400</td><td class="num">380</td><td class="num">360</td><td class="num positive">+20</td><td class="num positive">+5.6%</td></tr>
              <tr><td>SP-E500</td><td class="num">320</td><td class="num">340</td><td class="num negative">-20</td><td class="num negative">-5.9%</td></tr>
              <tr style="font-weight:600;"><td>合计</td><td class="num">1,910</td><td class="num">1,930</td><td class="num negative">-20</td><td class="num negative">-1.0%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 库存版本历史</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>版本日期</th><th>SP-A100(万包)</th><th>SP-B200(万包)</th><th>SP-C300(万包)</th><th>SP-D400(万包)</th><th>SP-E500(万包)</th><th>合计(万包)</th></tr></thead>
            <tbody>
              <tr><td>2026-04-21（本期）</td><td class="num">510</td><td class="num">280</td><td class="num">420</td><td class="num">380</td><td class="num">320</td><td class="num">1,910</td></tr>
              <tr><td>2026-04-07</td><td class="num">480</td><td class="num">350</td><td class="num">400</td><td class="num">360</td><td class="num">340</td><td class="num">1,930</td></tr>
              <tr><td>2026-03-24</td><td class="num">460</td><td class="num">320</td><td class="num">380</td><td class="num">350</td><td class="num">310</td><td class="num">1,820</td></tr>
              <tr><td>2026-03-10</td><td class="num">440</td><td class="num">300</td><td class="num">360</td><td class="num">340</td><td class="num">290</td><td class="num">1,730</td></tr>
              <tr><td>2026-02-24</td><td class="num">420</td><td class="num">310</td><td class="num">340</td><td class="num">330</td><td class="num">300</td><td class="num">1,700</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="inv-age" style="display:none;">
      <div class="filter-bar">
        <label>工厂</label><select><option>全部工厂</option><option>F3</option><option>F5</option></select>
        <label>库龄范围</label>
        <select><option>全部</option><option>0-30天</option><option>31-90天</option><option>91-180天</option><option>181-360天</option><option>360天以上</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出明细</button>
      </div>
      <div class="chart-grid cols-1">
        <div class="chart-box">
          <div class="chart-title">${icon('chart')} 库龄分布</div>
          <div class="chart-container" id="inv-age-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 库龄明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>库龄区间</th><th>库存量(万包)</th><th>占比</th><th>明细数</th></tr></thead>
            <tbody>
              <tr><td><span class="tag tag-green">0-30天</span></td><td class="num">680</td><td class="num">28.9%</td><td class="num">42</td></tr>
              <tr><td><span class="tag tag-blue">31-90天</span></td><td class="num">520</td><td class="num">22.1%</td><td class="num">35</td></tr>
              <tr><td><span class="tag tag-yellow">91-180天</span></td><td class="num">450</td><td class="num">19.1%</td><td class="num">28</td></tr>
              <tr><td><span class="tag tag-red">181-360天</span></td><td class="num">380</td><td class="num">16.2%</td><td class="num">22</td></tr>
              <tr><td><span class="tag tag-red">&gt;360天</span></td><td class="num">320</td><td class="num">13.6%</td><td class="num">18</td></tr>
              <tr style="font-weight:600;"><td>合计</td><td class="num">2,350</td><td class="num">100%</td><td class="num">145</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 库龄明细（按客户+规格）</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>工厂</th><th>规格</th><th>客户</th><th>库存量(万包)</th><th>库龄(天)</th><th>库龄区间</th><th>风险等级</th></tr></thead>
            <tbody>
              <tr><td>F3</td><td>SP-A100</td><td>客户A</td><td class="num">320</td><td class="num">15</td><td><span class="tag tag-green">0-30天</span></td><td><span class="tag tag-green">低</span></td></tr>
              <tr><td>F3</td><td>SP-B200</td><td>客户B</td><td class="num">280</td><td class="num">45</td><td><span class="tag tag-blue">31-90天</span></td><td><span class="tag tag-green">低</span></td></tr>
              <tr><td>F5</td><td>SP-C300</td><td>客户E</td><td class="num">420</td><td class="num">120</td><td><span class="tag tag-yellow">91-180天</span></td><td><span class="tag tag-yellow">中</span></td></tr>
              <tr><td>F3</td><td>SP-D400</td><td>客户A</td><td class="num">220</td><td class="num">110</td><td><span class="tag tag-yellow">91-180天</span></td><td><span class="tag tag-yellow">中</span></td></tr>
              <tr><td>F5</td><td>SP-E500</td><td>客户H</td><td class="num">165</td><td class="num">280</td><td><span class="tag tag-red">181-360天</span></td><td><span class="tag tag-red">高</span></td></tr>
              <tr><td>F3</td><td>SP-E500</td><td>客户C</td><td class="num">225</td><td class="num">200</td><td><span class="tag tag-red">181-360天</span></td><td><span class="tag tag-red">高</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function switchInventoryTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['inv-status','inv-version','inv-age'].forEach(id => {
    document.getElementById(id).style.display = id === tabId ? '' : 'none';
  });
  initPageCharts('inv-' + tabId.split('-')[1]);
}

// ===== 设计分析 =====
function renderDesign() {
  return `
    <div class="page-header">
      <div class="page-title">设计分析</div>
      <div class="page-desc">设计周期、状态与效率分析</div>
    </div>
    <div class="tab-bar">
      <div class="tab-item active" onclick="switchDesignTab(this,'design-jpg')">设计JPG周期</div>
      <div class="tab-item" onclick="switchDesignTab(this,'design-status')">设计状态</div>
      <div class="tab-item" onclick="switchDesignTab(this,'design-cycle')">设计周期统计</div>
    </div>
    <div id="design-jpg">
      <div class="filter-bar">
        <label>年度</label><select><option>2026年</option><option>2025年</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出明细</button>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('scatter')} JPG设计周期散点分布</div>
          <div class="chart-container" id="jpg-scatter-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('trending')} 月度平均周期趋势</div>
          <div class="chart-container" id="jpg-trend-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} JPG设计周期明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>设计编号</th><th>客户</th><th>规格</th><th>创建日期</th><th>完成日期</th><th>周期(天)</th><th>阶段</th></tr></thead>
            <tbody>
              <tr><td>DES-2026-089</td><td>客户A</td><td>SP-A100</td><td>2026-04-18</td><td>-</td><td class="num">3</td><td><span class="tag tag-blue">进行中</span></td></tr>
              <tr><td>DES-2026-088</td><td>客户C</td><td>SP-C300</td><td>2026-04-17</td><td>-</td><td class="num">4</td><td><span class="tag tag-yellow">待审核</span></td></tr>
              <tr><td>DES-2026-087</td><td>客户B</td><td>SP-B200</td><td>2026-04-15</td><td>2026-04-19</td><td class="num">4</td><td><span class="tag tag-green">已完成</span></td></tr>
              <tr><td>DES-2026-086</td><td>客户D</td><td>SP-D400</td><td>2026-04-16</td><td>2026-04-22</td><td class="num">6</td><td><span class="tag tag-green">已完成</span></td></tr>
              <tr><td>DES-2026-085</td><td>客户A</td><td>SP-A100</td><td>2026-04-12</td><td>2026-04-15</td><td class="num">3</td><td><span class="tag tag-green">已完成</span></td></tr>
              <tr><td>DES-2026-084</td><td>客户E</td><td>SP-E500</td><td>2026-04-10</td><td>2026-04-18</td><td class="num">8</td><td><span class="tag tag-green">已完成</span></td></tr>
              <tr><td>DES-2026-083</td><td>客户F</td><td>SP-B200</td><td>2026-04-08</td><td>2026-04-11</td><td class="num">3</td><td><span class="tag tag-green">已完成</span></td></tr>
              <tr><td>DES-2026-082</td><td>客户G</td><td>SP-C300</td><td>2026-04-05</td><td>2026-04-14</td><td class="num">9</td><td><span class="tag tag-green">已完成</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="design-status" style="display:none;">
      <div class="filter-bar">
        <button class="btn btn-outline">${ICONS.refresh} 刷新实时数据</button>
        <button class="btn btn-outline">导出明细</button>
      </div>
      <div class="stat-grid">
        <div class="stat-card blue">
          ${statIcon('design','blue')}
          <div class="stat-info">
            <div class="stat-label">进行中</div>
            <div class="stat-value">23</div>
          </div>
        </div>
        <div class="stat-card green">
          ${statIcon('check','green')}
          <div class="stat-info">
            <div class="stat-label">已完成</div>
            <div class="stat-value">156</div>
          </div>
        </div>
        <div class="stat-card yellow">
          ${statIcon('clock','yellow')}
          <div class="stat-info">
            <div class="stat-label">待审核</div>
            <div class="stat-value">8</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">${icon('table')} 设计状态实时明细</div>
          <span class="tag tag-green pulse">实时数据</span>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>设计编号</th><th>客户</th><th>规格</th><th>关联订单</th><th>状态</th><th>创建时间</th><th>当前阶段</th><th>已耗时(天)</th></tr></thead>
            <tbody>
              <tr><td>DES-2026-089</td><td>客户A</td><td>SP-A100</td><td>PO-2026-045</td><td><span class="tag tag-blue">进行中</span></td><td>2026-04-18</td><td>JPG制作</td><td class="num">3</td></tr>
              <tr><td>DES-2026-088</td><td>客户C</td><td>SP-C300</td><td>PO-2026-052</td><td><span class="tag tag-yellow">待审核</span></td><td>2026-04-17</td><td>JPG审核</td><td class="num">4</td></tr>
              <tr><td>DES-2026-086</td><td>客户D</td><td>SP-D400</td><td>PO-2026-055</td><td><span class="tag tag-blue">进行中</span></td><td>2026-04-16</td><td>排版设计</td><td class="num">5</td></tr>
              <tr><td>DES-2026-085</td><td>客户A</td><td>SP-A100</td><td>PO-2026-042</td><td><span class="tag tag-blue">进行中</span></td><td>2026-04-15</td><td>制版确认</td><td class="num">6</td></tr>
              <tr><td>DES-2026-087</td><td>客户B</td><td>SP-B200</td><td>PO-2026-048</td><td><span class="tag tag-green">已完成</span></td><td>2026-04-15</td><td>完成</td><td class="num">4</td></tr>
              <tr><td>DES-2026-084</td><td>客户E</td><td>SP-E500</td><td>PO-2026-038</td><td><span class="tag tag-green">已完成</span></td><td>2026-04-10</td><td>完成</td><td class="num">8</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="design-cycle" style="display:none;">
      <div class="filter-bar">
        <label>月份</label><select><option>2026年4月</option><option>2026年3月</option></select>
        <button class="btn btn-primary">查询</button>
        <button class="btn btn-outline">导出明细</button>
      </div>
      <div class="chart-grid cols-2">
        <div class="chart-box">
          <div class="chart-title">${icon('scatter')} 设计周期散点图（按月）</div>
          <div class="chart-container" id="cycle-scatter-chart"></div>
        </div>
        <div class="chart-box">
          <div class="chart-title">${icon('trending')} 月度平均/最大/最小周期</div>
          <div class="chart-container" id="cycle-trend-chart"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 设计周期统计明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>月份</th><th>平均周期(天)</th><th>最大周期(天)</th><th>最小周期(天)</th><th>设计单数</th><th>完成率</th><th>超期数</th></tr></thead>
            <tbody>
              <tr><td>1月</td><td class="num">5.2</td><td class="num">12</td><td class="num">2</td><td class="num">38</td><td class="num">94.7%</td><td class="num">3</td></tr>
              <tr><td>2月</td><td class="num">4.8</td><td class="num">10</td><td class="num">1</td><td class="num">32</td><td class="num">96.9%</td><td class="num">1</td></tr>
              <tr><td>3月</td><td class="num">5.5</td><td class="num">14</td><td class="num">2</td><td class="num">42</td><td class="num">92.9%</td><td class="num">4</td></tr>
              <tr><td>4月</td><td class="num">5.0</td><td class="num">11</td><td class="num">1</td><td class="num">35</td><td class="num">97.1%</td><td class="num">1</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('table')} 超期设计单明细</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>设计编号</th><th>客户</th><th>规格</th><th>创建日期</th><th>完成日期</th><th>周期(天)</th><th>标准周期(天)</th><th>超期天数</th></tr></thead>
            <tbody>
              <tr><td>DES-2026-071</td><td>客户G</td><td>SP-C300</td><td>2026-03-05</td><td>2026-03-19</td><td class="num">14</td><td class="num">7</td><td class="num negative">+7</td></tr>
              <tr><td>DES-2026-058</td><td>客户H</td><td>SP-D400</td><td>2026-02-18</td><td>2026-02-28</td><td class="num">10</td><td class="num">7</td><td class="num negative">+3</td></tr>
              <tr><td>DES-2026-045</td><td>客户C</td><td>SP-C300</td><td>2026-01-12</td><td>2026-01-24</td><td class="num">12</td><td class="num">7</td><td class="num negative">+5</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function switchDesignTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['design-jpg','design-status','design-cycle'].forEach(id => {
    document.getElementById(id).style.display = id === tabId ? '' : 'none';
  });
  if (tabId !== 'design-status') initPageCharts(tabId);
}

// ===== 生产排产 =====
function renderProduction() {
  return `
    <div class="page-header">
      <div class="page-title">生产排产</div>
      <div class="page-desc">排产计划与预计交货时间展示</div>
    </div>
    <div class="filter-bar">
      <label>工厂</label><select><option>全部工厂</option><option>F3</option><option>F5</option></select>
      <label>时间范围</label><select><option>未来4周</option><option>未来8周</option></select>
      <button class="btn btn-primary">查询</button>
      <button class="btn btn-outline">导出明细</button>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">${icon('production')} 排产进度甘特图</div>
        <span class="tag tag-blue">工厂维度</span>
      </div>
      <div class="gantt-wrapper">
        <div class="gantt-chart">
          <div class="gantt-header">
            <div class="gantt-header-cell" style="width:200px;flex:none;">工序/订单</div>
            <div class="gantt-header-cell">4月第4周</div>
            <div class="gantt-header-cell">5月第1周</div>
            <div class="gantt-header-cell">5月第2周</div>
            <div class="gantt-header-cell">5月第3周</div>
          </div>
          <div class="gantt-row">
            <div class="gantt-label">PO-2026-045 客户A</div>
            <div class="gantt-bars">
              <div class="gantt-bar" style="left:0%;width:25%;background:linear-gradient(90deg,#4A6CF7,#6B8AFF);">印刷</div>
              <div class="gantt-bar" style="left:25%;width:20%;background:linear-gradient(90deg,#00C48C,#00D4FF);">复合</div>
              <div class="gantt-bar" style="left:45%;width:15%;background:linear-gradient(90deg,#FFB547,#FF8A00);">分切</div>
            </div>
          </div>
          <div class="gantt-row">
            <div class="gantt-label">PO-2026-048 客户B</div>
            <div class="gantt-bars">
              <div class="gantt-bar" style="left:10%;width:20%;background:linear-gradient(90deg,#4A6CF7,#6B8AFF);">印刷</div>
              <div class="gantt-bar" style="left:35%;width:25%;background:linear-gradient(90deg,#00C48C,#00D4FF);">复合</div>
              <div class="gantt-bar" style="left:60%;width:15%;background:linear-gradient(90deg,#FFB547,#FF8A00);">分切</div>
            </div>
          </div>
          <div class="gantt-row">
            <div class="gantt-label">PO-2026-052 客户C</div>
            <div class="gantt-bars">
              <div class="gantt-bar" style="left:20%;width:30%;background:linear-gradient(90deg,#4A6CF7,#6B8AFF);">印刷</div>
              <div class="gantt-bar" style="left:50%;width:25%;background:linear-gradient(90deg,#00C48C,#00D4FF);">复合</div>
              <div class="gantt-bar" style="left:75%;width:20%;background:linear-gradient(90deg,#FFB547,#FF8A00);">分切</div>
            </div>
          </div>
          <div class="gantt-row">
            <div class="gantt-label">PO-2026-055 客户D</div>
            <div class="gantt-bars">
              <div class="gantt-bar" style="left:5%;width:15%;background:linear-gradient(90deg,#8B5CF6,#A78BFA);">制版</div>
              <div class="gantt-bar" style="left:25%;width:30%;background:linear-gradient(90deg,#4A6CF7,#6B8AFF);">印刷</div>
              <div class="gantt-bar" style="left:55%;width:20%;background:linear-gradient(90deg,#00C48C,#00D4FF);">复合</div>
            </div>
          </div>
          <div class="gantt-row">
            <div class="gantt-label">PO-2026-058 客户E</div>
            <div class="gantt-bars">
              <div class="gantt-bar" style="left:40%;width:25%;background:linear-gradient(90deg,#4A6CF7,#6B8AFF);">印刷</div>
              <div class="gantt-bar" style="left:65%;width:30%;background:linear-gradient(90deg,#00C48C,#00D4FF);">复合</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">${icon('table')} 排产计划明细</div></div>
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead><tr><th>订单号</th><th>客户</th><th>规格</th><th>数量(万包)</th><th>工序</th><th>设备</th><th>计划开始</th><th>计划完成</th><th>预计交货</th><th>状态</th></tr></thead>
          <tbody>
            <tr><td>PO-2026-045</td><td>客户A</td><td>SP-A100</td><td class="num">85</td><td>印刷→复合→分切</td><td>F3-L1</td><td>04-21</td><td>05-02</td><td>05-08</td><td><span class="tag tag-blue">进行中</span></td></tr>
            <tr><td>PO-2026-048</td><td>客户B</td><td>SP-B200</td><td class="num">120</td><td>印刷→复合→分切</td><td>F3-L2</td><td>04-23</td><td>05-08</td><td>05-15</td><td><span class="tag tag-yellow">待排产</span></td></tr>
            <tr><td>PO-2026-052</td><td>客户C</td><td>SP-C300</td><td class="num">65</td><td>印刷→复合→分切</td><td>F5-L1</td><td>04-28</td><td>05-12</td><td>05-18</td><td><span class="tag tag-yellow">待排产</span></td></tr>
            <tr><td>PO-2026-055</td><td>客户D</td><td>SP-D400</td><td class="num">95</td><td>制版→印刷→复合</td><td>F3-L1</td><td>04-22</td><td>05-10</td><td>05-16</td><td><span class="tag tag-blue">进行中</span></td></tr>
            <tr><td>PO-2026-058</td><td>客户E</td><td>SP-E500</td><td class="num">72</td><td>印刷→复合</td><td>F5-L2</td><td>04-28</td><td>05-15</td><td>05-22</td><td><span class="tag tag-yellow">待排产</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ===== 数据源管理 =====
function renderDatasource() {
  return `
    <div class="page-header">
      <div class="page-title">数据源管理</div>
      <div class="page-desc">管理系统数据源连接与配置</div>
    </div>
    <div class="filter-bar">
      <button class="btn btn-primary" onclick="alert('添加数据源功能演示')">+ 添加数据源</button>
    </div>
    <div class="card">
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead><tr><th>数据源名称</th><th>类型</th><th>状态</th><th>最后测试时间</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td>ERP订单数据库</td><td><span class="tag tag-blue">API</span></td><td><span class="tag tag-green">已连接</span></td><td>2026-04-23 08:30</td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">测试</button> <button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">配置</button></td></tr>
            <tr><td>ERP发货数据库</td><td><span class="tag tag-blue">API</span></td><td><span class="tag tag-green">已连接</span></td><td>2026-04-23 08:30</td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">测试</button> <button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">配置</button></td></tr>
            <tr><td>MES生产系统(F3)</td><td><span class="tag tag-blue">API</span></td><td><span class="tag tag-green">已连接</span></td><td>2026-04-23 08:30</td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">测试</button> <button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">配置</button></td></tr>
            <tr><td>MES生产系统(F5)</td><td><span class="tag tag-blue">API</span></td><td><span class="tag tag-green">已连接</span></td><td>2026-04-23 08:30</td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">测试</button> <button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">配置</button></td></tr>
            <tr><td>DES设计系统</td><td><span class="tag tag-blue">API</span></td><td><span class="tag tag-green">已连接</span></td><td>2026-04-23 08:30</td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">测试</button> <button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">配置</button></td></tr>
            <tr><td>线下数据上传</td><td><span class="tag tag-purple">文件上传</span></td><td><span class="tag tag-green">正常</span></td><td>-</td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">上传</button> <button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">历史</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ===== 权限管理 =====
function renderPermissions() {
  return `
    <div class="page-header">
      <div class="page-title">权限管理</div>
      <div class="page-desc">用户角色、功能权限与数据权限配置</div>
    </div>
    <div class="tab-bar">
      <div class="tab-item active" onclick="switchPermTab(this,'perm-role')">角色与功能权限</div>
      <div class="tab-item" onclick="switchPermTab(this,'perm-data')">数据权限</div>
      <div class="tab-item" onclick="switchPermTab(this,'perm-user')">用户管理</div>
    </div>

    <div id="perm-role">
      <div class="filter-bar">
        <button class="btn btn-primary">+ 新建角色</button>
        <button class="btn btn-outline">导出权限矩阵</button>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('lock')} 角色定义与功能权限</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>角色</th><th>订单&销售</th><th>采购</th><th>财务</th><th>生产</th><th>系统管理</th><th>操作</th></tr></thead>
            <tbody>
              <tr>
                <td><span class="tag tag-green">销售管理员</span></td>
                <td><span class="tag tag-green">管理</span></td>
                <td><span class="tag tag-red">无</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-red">无</span></td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-blue">客户分析员</span></td>
                <td><span class="tag tag-blue">编辑</span></td>
                <td><span class="tag tag-red">无</span></td>
                <td><span class="tag tag-red">无</span></td>
                <td><span class="tag tag-red">无</span></td>
                <td><span class="tag tag-red">无</span></td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-purple">生产管理员</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-green">管理</span></td>
                <td><span class="tag tag-red">无</span></td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-yellow">财务人员</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-green">管理</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-red">无</span></td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-red">高管决策</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><span class="tag tag-yellow">查看</span></td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-green">系统管理员</span></td>
                <td><span class="tag tag-green">管理</span></td>
                <td><span class="tag tag-green">管理</span></td>
                <td><span class="tag tag-green">管理</span></td>
                <td><span class="tag tag-green">管理</span></td>
                <td><span class="tag tag-green">管理</span></td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('shield')} 功能权限明细 - 销售管理员</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>业务板块</th><th>菜单</th><th>查看</th><th>编辑</th><th>导出</th><th>删除</th></tr></thead>
            <tbody>
              <tr><td rowspan="3" style="font-weight:600;vertical-align:middle;">订单 & 销售</td><td>订单报表</td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-red">✗</span></td></tr>
              <tr><td>预算管理</td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-red">✗</span></td></tr>
              <tr><td>客户分析</td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-red">✗</span></td></tr>
              <tr><td style="font-weight:600;">财务</td><td>结算财务</td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-red">✗</span></td><td><span class="tag tag-red">✗</span></td><td><span class="tag tag-red">✗</span></td></tr>
              <tr><td rowspan="3" style="font-weight:600;vertical-align:middle;">生产</td><td>库存分析</td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-red">✗</span></td><td><span class="tag tag-red">✗</span></td><td><span class="tag tag-red">✗</span></td></tr>
              <tr><td>设计分析</td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-red">✗</span></td><td><span class="tag tag-red">✗</span></td><td><span class="tag tag-red">✗</span></td></tr>
              <tr><td>生产排产</td><td><span class="tag tag-green">✓</span></td><td><span class="tag tag-red">✗</span></td><td><span class="tag tag-red">✗</span></td><td><span class="tag tag-red">✗</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="perm-data" style="display:none;">
      <div class="filter-bar">
        <button class="btn btn-primary">+ 新建数据权限规则</button>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">${icon('shield')} 数据权限规则</div>
          <span class="tag tag-blue">控制各角色可见的数据范围</span>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>角色</th><th>业务板块</th><th>客户范围</th><th>工厂范围</th><th>规格范围</th><th>时间范围</th><th>操作</th></tr></thead>
            <tbody>
              <tr>
                <td><span class="tag tag-green">销售管理员</span></td>
                <td>订单 & 销售</td>
                <td>全部客户</td>
                <td>全部工厂</td>
                <td>全部规格</td>
                <td>全部年度</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-green">销售管理员</span></td>
                <td>财务</td>
                <td>全部客户</td>
                <td>全部工厂</td>
                <td>全部规格</td>
                <td>仅当年</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-green">销售管理员</span></td>
                <td>生产</td>
                <td>全部客户</td>
                <td>全部工厂</td>
                <td>全部规格</td>
                <td>仅当年</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-blue">客户分析员</span></td>
                <td>订单 & 销售</td>
                <td>负责客户组A（客户A-E）</td>
                <td>全部工厂</td>
                <td>全部规格</td>
                <td>全部年度</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-purple">生产管理员</span></td>
                <td>生产</td>
                <td>全部客户</td>
                <td>F3 + F5</td>
                <td>全部规格</td>
                <td>全部年度</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-purple">生产管理员</span></td>
                <td>订单 & 销售</td>
                <td>全部客户</td>
                <td>F3 + F5</td>
                <td>全部规格</td>
                <td>仅当年</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-yellow">财务人员</span></td>
                <td>财务</td>
                <td>全部客户</td>
                <td>全部工厂</td>
                <td>全部规格</td>
                <td>全部年度</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-yellow">财务人员</span></td>
                <td>订单 & 销售</td>
                <td>全部客户</td>
                <td>全部工厂</td>
                <td>全部规格</td>
                <td>全部年度</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
              <tr>
                <td><span class="tag tag-red">高管决策</span></td>
                <td>全部板块</td>
                <td>全部客户</td>
                <td>全部工厂</td>
                <td>全部规格</td>
                <td>全部年度</td>
                <td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">${icon('table')} 数据权限维度说明</div>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>权限维度</th><th>说明</th><th>可选值示例</th></tr></thead>
            <tbody>
              <tr><td style="font-weight:600;">客户范围</td><td>控制可查看的客户数据范围</td><td>全部客户 / 指定客户组 / 指定客户列表</td></tr>
              <tr><td style="font-weight:600;">工厂范围</td><td>控制可查看的工厂数据范围</td><td>全部工厂 / F3 / F5 / F3+F5</td></tr>
              <tr><td style="font-weight:600;">规格范围</td><td>控制可查看的产品规格数据范围</td><td>全部规格 / 指定规格组 / 指定规格列表</td></tr>
              <tr><td style="font-weight:600;">时间范围</td><td>控制可查看的历史数据年限</td><td>全部年度 / 仅当年 / 近2年 / 近3年</td></tr>
              <tr><td style="font-weight:600;">订单类型</td><td>控制可查看的订单类型</td><td>全部类型 / 全清订单 / VMI / Call-off</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="perm-user" style="display:none;">
      <div class="filter-bar">
        <button class="btn btn-primary">+ 添加用户</button>
        <label>角色筛选</label>
        <select><option>全部角色</option><option>销售管理员</option><option>客户分析员</option><option>生产管理员</option><option>财务人员</option><option>高管决策</option><option>系统管理员</option></select>
        <button class="btn btn-outline">导出用户列表</button>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${icon('users')} 用户列表</div></div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead><tr><th>用户</th><th>角色</th><th>数据范围</th><th>客户可见</th><th>工厂可见</th><th>状态</th><th>操作</th></tr></thead>
            <tbody>
              <tr><td>赵萌</td><td><span class="tag tag-green">销售管理员</span></td><td>订单&销售(管理) / 财务(查看) / 生产(查看)</td><td>全部客户</td><td>全部工厂</td><td><span class="tag tag-green">启用</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td></tr>
              <tr><td>白风波</td><td><span class="tag tag-blue">客户分析员</span></td><td>订单&销售(编辑)</td><td>客户组A</td><td>全部工厂</td><td><span class="tag tag-green">启用</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td></tr>
              <tr><td>田宝栋</td><td><span class="tag tag-purple">生产管理员</span></td><td>生产(管理) / 订单&销售(查看)</td><td>全部客户</td><td>F3 + F5</td><td><span class="tag tag-green">启用</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td></tr>
              <tr><td>财务团队</td><td><span class="tag tag-yellow">财务人员</span></td><td>财务(管理) / 订单&销售(查看)</td><td>全部客户</td><td>全部工厂</td><td><span class="tag tag-green">启用</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td></tr>
              <tr><td>高管</td><td><span class="tag tag-red">高管决策</span></td><td>全部板块(查看)</td><td>全部客户</td><td>全部工厂</td><td><span class="tag tag-green">启用</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td></tr>
              <tr><td>系统管理</td><td><span class="tag tag-green">系统管理员</span></td><td>全部板块(管理)</td><td>全部客户</td><td>全部工厂</td><td><span class="tag tag-green">启用</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">编辑</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function switchPermTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['perm-role','perm-data','perm-user'].forEach(id => {
    document.getElementById(id).style.display = id === tabId ? '' : 'none';
  });
}

// ===== 采购管理（占位） =====
function renderPurchase() {
  return `
    <div class="page-header">
      <div class="page-title">采购管理</div>
      <div class="page-desc">采购订单、供应商与物料管理</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card blue">
        ${statIcon('shopping','blue')}
        <div class="stat-info">
          <div class="stat-label">采购订单数</div>
          <div class="stat-value">--</div>
        </div>
      </div>
      <div class="stat-card green">
        ${statIcon('trending','green')}
        <div class="stat-info">
          <div class="stat-label">在途物料</div>
          <div class="stat-value">--</div>
        </div>
      </div>
      <div class="stat-card yellow">
        ${statIcon('clock','yellow')}
        <div class="stat-info">
          <div class="stat-label">待审批</div>
          <div class="stat-value">--</div>
        </div>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:center;padding:60px 20px;color:var(--text-light);">
      <div style="text-align:center;">
        <div style="font-size:48px;margin-bottom:12px;">📦</div>
        <div style="font-size:16px;color:var(--text-secondary);margin-bottom:4px;">采购管理模块规划中</div>
        <div style="font-size:13px;">将包含：采购订单管理、供应商管理、物料追踪、到货验收等功能</div>
      </div>
    </div>
  `;
}
// ===== 自定义报表构建器 =====
// 数据源定义
const rbDataSources = [
  { id: 'ds-order', name: '订单数据', icon: 'order', color: 'blue', fields: ['月份','订单量(万包)','发货量(万包)','订单金额($万)','自然包','1000m','250m','客户编码','客户名称','订单类型','规格','包型'] },
  { id: 'ds-ship', name: '发货数据', icon: 'trending', color: 'green', fields: ['月份','发货量(万包)','发货金额($万)','自然包','1000m','250m','客户编码','工厂','发货状态','预计交货日'] },
  { id: 'ds-finance', name: '财务数据', icon: 'finance', color: 'yellow', fields: ['客户','应收金额($万)','欠款天数','欠款周期','订单号','订单类型','预计付款日'] },
  { id: 'ds-budget', name: '预算数据', icon: 'budget', color: 'purple', fields: ['月份','预算量(万包)','预算价($/千包)','预算金额($万)','客户分类','规格','版本','类型'] },
  { id: 'ds-inventory', name: '库存数据', icon: 'inventory', color: 'red', fields: ['工厂','规格','客户','库存量(万包)','库龄(天)','库龄区间','风险等级'] },
  { id: 'ds-customer', name: '客户数据', icon: 'customer', color: 'blue', fields: ['客户编码','客户名称','累计销售额($万)','订单量(万包)','同比','客户类型','首次下单日'] },
];

// 报表构建器状态
let rbState = {
  widgets: [],
  selectedWidget: null,
  layout: '2',
  reportName: '',
  activeDs: null,
  widgetCounter: 0,
};

function renderReportBuilder() {
  return `
    <div class="rb-layout">
      <!-- 左侧面板：数据源与字段 -->
      <div class="rb-sidebar">
        <div class="rb-sidebar-title">
          <span style="color:var(--primary);">${ICONS.database || ''}</span> 数据源与字段
        </div>
        <div class="rb-sidebar-scroll">
          <div class="rb-section-label">选择数据源</div>
          ${rbDataSources.map(ds => `
            <div class="rb-datasource-item" onclick="rbSelectDataSource('${ds.id}')" draggable="true" ondragstart="rbDragDataSource(event,'${ds.id}')">
              <div class="ds-icon ${ds.color}">${ICONS[ds.icon] || ''}</div>
              <div class="ds-info">
                <div class="ds-name">${ds.name}</div>
                <div class="ds-count">${ds.fields.length} 个字段</div>
              </div>
              <span class="ds-drag">${ICONS.drag || ''}</span>
            </div>
          `).join('')}
          <div id="rb-fields-section" style="display:none;">
            <div class="rb-section-label" style="margin-top:8px;">可用字段 <span id="rb-ds-label" style="color:var(--primary);text-transform:none;letter-spacing:0;"></span></div>
            <div class="rb-field-list" id="rb-field-list"></div>
          </div>
        </div>
      </div>

      <!-- 中间画布 -->
      <div class="rb-main">
        <div class="rb-toolbar">
          <div class="report-name">
            <input type="text" placeholder="输入报表名称..." value="${rbState.reportName}" oninput="rbState.reportName=this.value" />
          </div>
          <div class="toolbar-sep"></div>
          <div class="toolbar-group">
            <button class="toolbar-btn ${rbState.layout==='1'?'active':''}" onclick="rbSetLayout('1')" title="单列布局">${ICONS.list || ''}</button>
            <button class="toolbar-btn ${rbState.layout==='2'?'active':''}" onclick="rbSetLayout('2')" title="双列布局">${ICONS.grid || ''}</button>
            <button class="toolbar-btn ${rbState.layout==='3'?'active':''}" onclick="rbSetLayout('3')" title="三列布局">${ICONS.builder || ''}</button>
          </div>
          <div class="toolbar-sep"></div>
          <button class="toolbar-btn" onclick="rbAddWidget('kpi')" title="添加KPI指标卡">${ICONS.trending || ''} KPI</button>
          <button class="toolbar-btn" onclick="rbAddWidget('bar')" title="添加柱状图">${ICONS.barChart || ''} 柱状图</button>
          <button class="toolbar-btn" onclick="rbAddWidget('line')" title="添加折线图">${ICONS.lineChart || ''} 折线图</button>
          <button class="toolbar-btn" onclick="rbAddWidget('pie')" title="添加饼图">${ICONS.pieChart || ''} 饼图</button>
          <button class="toolbar-btn" onclick="rbAddWidget('table')" title="添加数据表格">${ICONS.table || ''} 表格</button>
          <div class="toolbar-sep"></div>
          <button class="toolbar-btn primary" onclick="rbSaveReport()">${ICONS.save || ''} 保存</button>
          <button class="toolbar-btn" onclick="rbPreviewReport()">${ICONS.eye || ''} 预览</button>
        </div>
        <div class="rb-canvas-wrap">
          <div class="rb-canvas ${rbState.widgets.length?'has-items':''}" id="rbCanvas"
               ondragover="rbCanvasDragOver(event)" ondragleave="rbCanvasDragLeave(event)" ondrop="rbCanvasDrop(event)">
            <div id="rbWidgetsContainer" class="rb-grid-${rbState.layout}">
              ${rbState.widgets.length === 0 ? `
                <div class="rb-empty" style="grid-column: 1 / -1;">
                  <div class="empty-icon">${ICONS.builder || '📊'}</div>
                  <div class="empty-title">拖拽数据源到此处，或点击上方按钮添加组件</div>
                  <div class="empty-desc">从左侧选择数据源 → 选择字段拖入配置面板 → 自动生成可视化图表<br/>支持柱状图、折线图、饼图、KPI指标卡、数据表格</div>
                </div>
              ` : rbState.widgets.map(w => rbRenderWidget(w)).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧配置面板 -->
      <div class="rb-config-panel" id="rbConfigPanel">
        <div class="config-header">组件配置</div>
        <div class="config-body" id="rbConfigBody">
          <div style="text-align:center;padding:40px 10px;color:var(--text-light);font-size:13px;">
            点击画布中的组件进行配置
          </div>
        </div>
      </div>
    </div>
  `;
}

// 选择数据源
function rbSelectDataSource(dsId) {
  rbState.activeDs = dsId;
  const ds = rbDataSources.find(d => d.id === dsId);
  if (!ds) return;
  
  document.getElementById('rb-fields-section').style.display = '';
  document.getElementById('rb-ds-label').textContent = '· ' + ds.name;
  
  const list = document.getElementById('rb-field-list');
  list.innerHTML = ds.fields.map(f => `
    <div class="rb-field-item" draggable="true" ondragstart="rbDragField(event,'${dsId}','${f}')">
      <span class="field-drag">${ICONS.drag || '⋮⋮'}</span>
      <span>${f}</span>
    </div>
  `).join('');
}

// 拖拽数据源
function rbDragDataSource(e, dsId) {
  e.dataTransfer.setData('type', 'datasource');
  e.dataTransfer.setData('dsId', dsId);
}

// 拖拽字段
function rbDragField(e, dsId, field) {
  e.dataTransfer.setData('type', 'field');
  e.dataTransfer.setData('dsId', dsId);
  e.dataTransfer.setData('field', field);
}

// 画布拖拽事件
function rbCanvasDragOver(e) {
  e.preventDefault();
  document.getElementById('rbCanvas').classList.add('drag-over');
}
function rbCanvasDragLeave(e) {
  document.getElementById('rbCanvas').classList.remove('drag-over');
}
function rbCanvasDrop(e) {
  e.preventDefault();
  document.getElementById('rbCanvas').classList.remove('drag-over');
  
  const type = e.dataTransfer.getData('type');
  if (type === 'datasource') {
    const dsId = e.dataTransfer.getData('dsId');
    rbAddWidgetFromDS(dsId, 'bar');
  }
}

// 设置布局
function rbSetLayout(n) {
  rbState.layout = n;
  const container = document.getElementById('rbWidgetsContainer');
  container.className = `rb-grid-${n}`;
  // 更新toolbar按钮状态
  document.querySelectorAll('.rb-toolbar .toolbar-group .toolbar-btn').forEach(btn => btn.classList.remove('active'));
  event.target.closest('.toolbar-btn').classList.add('active');
}

// 添加组件（从工具栏）
function rbAddWidget(chartType) {
  const widgetId = 'w' + (++rbState.widgetCounter);
  const ds = rbState.activeDs ? rbDataSources.find(d => d.id === rbState.activeDs) : rbDataSources[0];
  const widget = {
    id: widgetId,
    type: chartType,
    dsId: ds.id,
    title: rbGetDefaultTitle(chartType, ds.name),
    fields: rbGetDefaultFields(chartType, ds),
    config: rbGetDefaultConfig(chartType),
  };
  rbState.widgets.push(widget);
  rbState.selectedWidget = widgetId;
  rbRefreshCanvas();
  rbRenderConfig();
}

// 从数据源拖入画布自动创建组件
function rbAddWidgetFromDS(dsId, chartType) {
  const ds = rbDataSources.find(d => d.id === dsId);
  if (!ds) return;
  const widgetId = 'w' + (++rbState.widgetCounter);
  const widget = {
    id: widgetId,
    type: chartType || 'bar',
    dsId: ds.id,
    title: rbGetDefaultTitle(chartType || 'bar', ds.name),
    fields: rbGetDefaultFields(chartType || 'bar', ds),
    config: rbGetDefaultConfig(chartType || 'bar'),
  };
  rbState.widgets.push(widget);
  rbState.activeDs = dsId;
  rbState.selectedWidget = widgetId;
  rbRefreshCanvas();
  rbRefreshFields();
  rbRenderConfig();
}

function rbGetDefaultTitle(type, dsName) {
  const map = { bar: '柱状图', line: '折线图', pie: '饼图', kpi: 'KPI指标', table: '数据表格' };
  return dsName + ' - ' + (map[type] || type);
}

function rbGetDefaultFields(type, ds) {
  if (type === 'kpi') return ds.fields.slice(0, 4);
  if (type === 'table') return ds.fields.slice(0, 6);
  if (type === 'pie') return [ds.fields[0], ds.fields[1]];
  return [ds.fields[0], ds.fields[1], ds.fields[2] || ds.fields[0]];
}

function rbGetDefaultConfig(type) {
  return { showLegend: true, showLabel: false };
}

// 渲染单个组件
function rbRenderWidget(w) {
  const selected = rbState.selectedWidget === w.id ? ' selected' : '';
  const typeMap = { bar: '柱状图', line: '折线图', pie: '饼图', kpi: 'KPI', table: '表格' };
  return `
    <div class="rb-widget${selected}" id="widget-${w.id}" onclick="rbSelectWidget('${w.id}', event)">
      <div class="rb-widget-header">
        <span class="widget-title">${w.title}</span>
        <span class="widget-type">${typeMap[w.type] || w.type}</span>
        <div class="widget-actions">
          <span class="widget-action-btn" onclick="rbDuplicateWidget('${w.id}', event)" title="复制">${ICONS.copy || ''}</span>
          <span class="widget-action-btn" onclick="rbDeleteWidget('${w.id}', event)" title="删除">${ICONS.trash || ''}</span>
        </div>
      </div>
      <div class="rb-widget-body">
        <div class="chart-container" id="rb-chart-${w.id}"></div>
      </div>
    </div>
  `;
}

// 选择组件
function rbSelectWidget(widgetId, e) {
  if (e) e.stopPropagation();
  rbState.selectedWidget = widgetId;
  document.querySelectorAll('.rb-widget').forEach(el => el.classList.remove('selected'));
  const el = document.getElementById('widget-' + widgetId);
  if (el) el.classList.add('selected');
  rbRenderConfig();
}

// 删除组件
function rbDeleteWidget(widgetId, e) {
  if (e) e.stopPropagation();
  rbState.widgets = rbState.widgets.filter(w => w.id !== widgetId);
  if (rbState.selectedWidget === widgetId) rbState.selectedWidget = null;
  rbRefreshCanvas();
  rbRenderConfig();
}

// 复制组件
function rbDuplicateWidget(widgetId, e) {
  if (e) e.stopPropagation();
  const src = rbState.widgets.find(w => w.id === widgetId);
  if (!src) return;
  const newId = 'w' + (++rbState.widgetCounter);
  rbState.widgets.push({ ...src, id: newId, title: src.title + ' (副本)' });
  rbState.selectedWidget = newId;
  rbRefreshCanvas();
  rbRenderConfig();
}

// 刷新画布
function rbRefreshCanvas() {
  const canvas = document.getElementById('rbCanvas');
  const container = document.getElementById('rbWidgetsContainer');
  canvas.classList.toggle('has-items', rbState.widgets.length > 0);
  container.className = `rb-grid-${rbState.layout}`;
  
  if (rbState.widgets.length === 0) {
    container.innerHTML = `
      <div class="rb-empty" style="grid-column: 1 / -1;">
        <div class="empty-icon">${ICONS.builder || '📊'}</div>
        <div class="empty-title">拖拽数据源到此处，或点击上方按钮添加组件</div>
        <div class="empty-desc">从左侧选择数据源 → 选择字段拖入配置面板 → 自动生成可视化图表</div>
      </div>
    `;
    return;
  }
  
  container.innerHTML = rbState.widgets.map(w => rbRenderWidget(w)).join('');
  
  // 渲染图表
  setTimeout(() => {
    rbState.widgets.forEach(w => rbRenderChart(w));
  }, 100);
}

// 刷新字段列表
function rbRefreshFields() {
  if (rbState.activeDs) rbSelectDataSource(rbState.activeDs);
}

// 渲染配置面板
function rbRenderConfig() {
  const body = document.getElementById('rbConfigBody');
  const w = rbState.widgets.find(w => w.id === rbState.selectedWidget);
  
  if (!w) {
    body.innerHTML = `<div style="text-align:center;padding:40px 10px;color:var(--text-light);font-size:13px;">点击画布中的组件进行配置</div>`;
    return;
  }
  
  const ds = rbDataSources.find(d => d.id === w.dsId);
  const dsOptions = rbDataSources.map(d => `<option value="${d.id}" ${d.id===w.dsId?'selected':''}>${d.name}</option>`).join('');
  const typeOptions = [
    {v:'bar',l:'柱状图'},{v:'line',l:'折线图'},{v:'pie',l:'饼图'},{v:'kpi',l:'KPI指标'},{v:'table',l:'数据表格'}
  ].map(t => `<option value="${t.v}" ${t.v===w.type?'selected':''}>${t.l}</option>`).join('');
  
  body.innerHTML = `
    <div class="config-field">
      <div class="config-label">组件标题</div>
      <input class="config-input" value="${w.title}" oninput="rbUpdateWidget('${w.id}','title',this.value)" />
    </div>
    <div class="config-field">
      <div class="config-label">数据源</div>
      <select class="config-select" onchange="rbUpdateWidget('${w.id}','dsId',this.value)">${dsOptions}</select>
    </div>
    <div class="config-field">
      <div class="config-label">图表类型</div>
      <select class="config-select" onchange="rbUpdateWidget('${w.id}','type',this.value)">${typeOptions}</select>
    </div>
    <div class="config-field">
      <div class="config-label">已选字段</div>
      <div class="config-drop-zone ${w.fields.length===0?'empty':''}" id="rbFieldDropZone"
           ondragover="event.preventDefault();this.classList.add('drag-over')" 
           ondragleave="this.classList.remove('drag-over')"
           ondrop="rbFieldDrop(event,'${w.id}')">
        ${w.fields.map((f,i) => `<span class="field-tag">${f}<span class="remove" onclick="rbRemoveField('${w.id}',${i})">×</span></span>`).join('')}
      </div>
    </div>
    <div class="config-field">
      <div class="config-label">可用字段（点击添加）</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;">
        ${(ds ? ds.fields : []).filter(f => !w.fields.includes(f)).map(f => 
          `<span class="field-tag" style="cursor:pointer;background:#F1F5F9;color:var(--text-secondary);" onclick="rbAddField('${w.id}','${f}')">${f}</span>`
        ).join('')}
      </div>
    </div>
    <div class="config-field">
      <div class="config-label">显示图例</div>
      <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);cursor:pointer;">
        <input type="checkbox" ${w.config.showLegend?'checked':''} onchange="rbUpdateConfig('${w.id}','showLegend',this.checked)" /> 显示图例
      </label>
    </div>
    <div class="config-field">
      <div class="config-label">显示数据标签</div>
      <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);cursor:pointer;">
        <input type="checkbox" ${w.config.showLabel?'checked':''} onchange="rbUpdateConfig('${w.id}','showLabel',this.checked)" /> 显示标签
      </label>
    </div>
    <div style="padding-top:12px;border-top:1px solid var(--border);margin-top:8px;">
      <button class="toolbar-btn" style="width:100%;justify-content:center;color:var(--danger);border-color:rgba(255,92,114,0.3);" onclick="rbDeleteWidget('${w.id}')">
        ${ICONS.trash || ''} 删除此组件
      </button>
    </div>
  `;
}

// 更新组件属性
function rbUpdateWidget(widgetId, key, value) {
  const w = rbState.widgets.find(w => w.id === widgetId);
  if (!w) return;
  w[key] = value;
  if (key === 'dsId') {
    const ds = rbDataSources.find(d => d.id === value);
    w.fields = rbGetDefaultFields(w.type, ds);
  }
  if (key === 'type') {
    const ds = rbDataSources.find(d => d.id === w.dsId);
    w.fields = rbGetDefaultFields(value, ds);
    w.title = rbGetDefaultTitle(value, ds.name);
  }
  rbRefreshCanvas();
  rbRenderConfig();
}

function rbUpdateConfig(widgetId, key, value) {
  const w = rbState.widgets.find(w => w.id === widgetId);
  if (!w) return;
  w.config[key] = value;
  rbRenderChart(w);
}

// 拖入字段到配置面板
function rbFieldDrop(e, widgetId) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById('rbFieldDropZone').classList.remove('drag-over');
  
  const field = e.dataTransfer.getData('field');
  if (field) rbAddField(widgetId, field);
}

function rbAddField(widgetId, field) {
  const w = rbState.widgets.find(w => w.id === widgetId);
  if (!w || w.fields.includes(field)) return;
  w.fields.push(field);
  rbRefreshCanvas();
  rbRenderConfig();
}

function rbRemoveField(widgetId, index) {
  const w = rbState.widgets.find(w => w.id === widgetId);
  if (!w) return;
  w.fields.splice(index, 1);
  rbRefreshCanvas();
  rbRenderConfig();
}

// 渲染图表
function rbRenderChart(w) {
  if (w.type === 'table') { rbRenderTable(w); return; }
  if (w.type === 'kpi') { rbRenderKPI(w); return; }
  
  const el = document.getElementById('rb-chart-' + w.id);
  if (!el) return;
  
  if (charts['rb-' + w.id]) charts['rb-' + w.id].dispose();
  
  const chart = echarts.init(el, null, { renderer: 'canvas' });
  charts['rb-' + w.id] = chart;
  
  const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const colors = ['#4A6CF7','#00BCD4','#00C48C','#FFB547','#FF5C72','#8B5CF6'];
  
  let option = { backgroundColor: 'transparent', color: colors, tooltip: { trigger: 'axis' } };
  if (w.config.showLegend) option.legend = { top: 0, textStyle: { color: '#6B7280', fontSize: 11 } };
  option.grid = { left: 50, right: 20, top: w.config.showLegend ? 35 : 20, bottom: 30 };
  option.xAxis = { type: 'category', data: months, axisLine: { lineStyle: { color: '#E5E7EB' } }, axisLabel: { color: '#6B7280', fontSize: 11 } };
  option.yAxis = { type: 'value', axisLine: { lineStyle: { color: '#E5E7EB' } }, axisLabel: { color: '#6B7280', fontSize: 11 }, splitLine: { lineStyle: { color: '#F1F5F9' } } };
  
  const numFields = w.fields.filter((_, i) => i > 0);
  if (numFields.length === 0) { numFields.push(w.fields[0] || '数值'); }
  
  if (w.type === 'bar') {
    option.series = numFields.map((f, i) => ({
      name: f, type: 'bar', barWidth: numFields.length > 2 ? '15%' : '25%',
      data: Array.from({length: 12}, () => Math.round(200 + Math.random() * 600)),
      itemStyle: { borderRadius: [4,4,0,0], color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:colors[i%colors.length]},{offset:1,color:colors[i%colors.length]+'66'}]) }
    }));
  } else if (w.type === 'line') {
    option.series = numFields.map((f, i) => ({
      name: f, type: 'line', smooth: true,
      data: Array.from({length: 12}, () => Math.round(200 + Math.random() * 600)),
      lineStyle: { color: colors[i%colors.length], width: 2 }, itemStyle: { color: colors[i%colors.length] },
      areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:colors[i%colors.length]+'20'},{offset:1,color:'transparent'}]) }
    }));
  } else if (w.type === 'pie') {
    option.tooltip = { trigger: 'item' };
    delete option.xAxis; delete option.yAxis; delete option.grid;
    const catField = w.fields[0] || '类别';
    const valField = w.fields[1] || '数值';
    option.legend = { top: 0, textStyle: { color: '#6B7280' } };
    option.series = [{
      type: 'pie', radius: ['35%','65%'], center: ['50%','55%'],
      label: { formatter: '{b}: {c} ({d}%)', color: '#6B7280', fontSize: 11 },
      itemStyle: { borderColor: '#fff', borderWidth: 2 },
      data: months.slice(0, 6).map((m, i) => ({ value: Math.round(500 + Math.random() * 1500), name: m, itemStyle: { color: colors[i%colors.length] } }))
    }];
  }
  
  if (w.config.showLabel && w.type !== 'pie') {
    option.series.forEach(s => { s.label = { show: true, fontSize: 10, color: '#6B7280' }; });
  }
  
  chart.setOption(option);
}

// 渲染表格
function rbRenderTable(w) {
  const el = document.getElementById('rb-chart-' + w.id);
  if (!el) return;
  const months = ['1月','2月','3月','4月','5月','6月'];
  const fields = w.fields.length > 0 ? w.fields : ['字段1','字段2','字段3'];
  el.style.height = 'auto';
  el.innerHTML = `
    <table class="rb-table">
      <thead><tr>${fields.map(f => `<th>${f}</th>`).join('')}</tr></thead>
      <tbody>${months.map(m => `<tr>${fields.map((f,i) => `<td ${i>0?'class="num"':''}>${i===0?m:Math.round(100+Math.random()*900).toLocaleString()}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  `;
}

// 渲染KPI
function rbRenderKPI(w) {
  const el = document.getElementById('rb-chart-' + w.id);
  if (!el) return;
  el.style.height = 'auto';
  const fields = w.fields.length > 0 ? w.fields.slice(0,4) : ['指标1','指标2','指标3','指标4'];
  const kpiColors = ['var(--primary)','var(--success)','var(--warning)','var(--danger)'];
  el.innerHTML = `
    <div class="rb-kpi-grid">
      ${fields.map((f, i) => {
        const val = Math.round(500 + Math.random() * 9500);
        const change = (Math.random() * 20 - 5).toFixed(1);
        return `<div class="rb-kpi">
          <div class="kpi-label">${f}</div>
          <div class="kpi-value" style="color:${kpiColors[i%4]}">${val.toLocaleString()}</div>
          <div class="kpi-change ${change>0?'up':''}">${change>0?'↑':'↓'} ${Math.abs(change)}%</div>
        </div>`;
      }).join('')}
    </div>
  `;
}

// 保存报表
function rbSaveReport() {
  const name = rbState.reportName || '未命名报表';
  alert(`报表「${name}」已保存！\n包含 ${rbState.widgets.length} 个组件`);
}

// 预览报表
function rbPreviewReport() {
  const name = rbState.reportName || '未命名报表';
  if (rbState.widgets.length === 0) {
    alert('请先添加组件后再预览');
    return;
  }
  alert(`预览报表「${name}」\n包含 ${rbState.widgets.length} 个组件：${rbState.widgets.map(w => w.title).join('、')}`);
}

function renderOfflineData() {
  return `
    <div class="page-header">
      <div class="page-title">线下数据维护</div>
      <div class="page-desc">上传、订正线下维护的数据</div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">${icon('upload')} 数据上传</div></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;">
        <div style="border:2px dashed var(--border);border-radius:12px;padding:30px;text-align:center;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.borderColor='var(--primary)';this.style.background='#F0F4FF'" onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <div style="margin-bottom:8px;">${statIcon('chart','blue')}</div>
          <div style="font-size:14px;font-weight:600;color:var(--text-primary);">年度预算表</div>
          <div style="font-size:12px;color:var(--text-light);margin-top:6px;">点击上传 Excel/CSV</div>
        </div>
        <div style="border:2px dashed var(--border);border-radius:12px;padding:30px;text-align:center;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.borderColor='var(--primary)';this.style.background='#F0F4FF'" onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <div style="margin-bottom:8px;">${statIcon('trending','green')}</div>
          <div style="font-size:14px;font-weight:600;color:var(--text-primary);">滚动预算表</div>
          <div style="font-size:12px;color:var(--text-light);margin-top:6px;">点击上传 Excel/CSV</div>
        </div>
        <div style="border:2px dashed var(--border);border-radius:12px;padding:30px;text-align:center;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.borderColor='var(--primary)';this.style.background='#F0F4FF'" onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <div style="margin-bottom:8px;">${statIcon('budget','yellow')}</div>
          <div style="font-size:14px;font-weight:600;color:var(--text-primary);">汇率维护</div>
          <div style="font-size:12px;color:var(--text-light);margin-top:6px;">点击上传 Excel/CSV</div>
        </div>
        <div style="border:2px dashed var(--border);border-radius:12px;padding:30px;text-align:center;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.borderColor='var(--primary)';this.style.background='#F0F4FF'" onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <div style="margin-bottom:8px;">${statIcon('inventory','red')}</div>
          <div style="font-size:14px;font-weight:600;color:var(--text-primary);">线下库存数据</div>
          <div style="font-size:12px;color:var(--text-light);margin-top:6px;">点击上传 Excel/CSV</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">${icon('table')} 上传历史</div></div>
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead><tr><th>数据类型</th><th>文件名</th><th>上传时间</th><th>上传人</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td>滚动预算</td><td>rolling_budget_v6.xlsx</td><td>2026-04-01 10:30</td><td>赵萌</td><td><span class="tag tag-green">已生效</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">查看</button></td></tr>
            <tr><td>年度预算</td><td>annual_budget_2026.xlsx</td><td>2026-01-15 09:00</td><td>赵萌</td><td><span class="tag tag-green">已生效</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">查看</button></td></tr>
            <tr><td>汇率</td><td>exchange_rate_04.xlsx</td><td>2026-04-20 14:15</td><td>财务</td><td><span class="tag tag-green">已生效</span></td><td><button class="btn btn-outline" style="font-size:12px;padding:2px 10px;">查看</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
