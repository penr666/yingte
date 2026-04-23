// ===== 图表初始化 =====
function initPageCharts(page) {
  setTimeout(() => {
    switch(page) {
      case 'dashboard': initDashboardCharts(); break;
      case 'order': initOrderCharts(); break;
      case 'budget': initBudgetCharts(); break;
      case 'customer': initCustomerCharts(); break;
      case 'finance': initFinanceCharts(); break;
      case 'inventory': initInventoryCharts(); break;
      case 'design': initDesignCharts(); break;
      case 'budget-rolling': initRollingBudgetChart(); break;
      case 'customer-analysis': initCustomerAnalysisCharts(); break;
      case 'finance-version': initArVersionChart(); break;
      case 'inv-status': initInvStatusCharts(); break;
      case 'inv-version': initInvVersionChart(); break;
      case 'inv-age': initInvAgeChart(); break;
      case 'design-jpg': initJpgCharts(); break;
      case 'design-cycle': initCycleCharts(); break;
      case 'order-compare': initCompareCharts(); break;
      case 'order-budget': initBudgetCompareChart(); break;
    }
  }, 100);
}

const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

// 浅色主题（白色背景适配）
const lightTheme = {
  color: ['#4A6CF7','#00BCD4','#00C48C','#FFB547','#FF5C72','#8B5CF6','#A78BFA'],
  backgroundColor: 'transparent',
  textStyle: { color: '#6B7280' },
  title: { textStyle: { color: '#1F2937' } },
  legend: { textStyle: { color: '#6B7280' }, pageTextStyle: { color: '#6B7280' } },
  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: '#E5E7EB',
    textStyle: { color: '#1F2937', fontSize: 12 },
    extraCssText: 'border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.1);'
  },
  xAxis: { axisLine: { lineStyle: { color: '#E5E7EB' } }, axisLabel: { color: '#6B7280' }, splitLine: { lineStyle: { color: '#F1F5F9' } } },
  yAxis: { axisLine: { lineStyle: { color: '#E5E7EB' } }, axisLabel: { color: '#6B7280' }, splitLine: { lineStyle: { color: '#F1F5F9' } } }
};

function safeInit(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  if (charts[id]) charts[id].dispose();
  charts[id] = echarts.init(el, null, { renderer: 'canvas' });
  return charts[id];
}

function mergeTheme(opt) {
  opt.backgroundColor = lightTheme.backgroundColor;
  opt.textStyle = { ...lightTheme.textStyle, ...(opt.textStyle || {}) };
  if (opt.tooltip) opt.tooltip = { ...lightTheme.tooltip, ...opt.tooltip };
  else opt.tooltip = { ...lightTheme.tooltip };
  if (!opt.color) opt.color = lightTheme.color;
  // apply to series
  if (opt.series) {
    opt.series.forEach(s => {
      if (s.type === 'bar') {
        s.itemStyle = { borderRadius: [4,4,0,0], ...(s.itemStyle || {}) };
      }
    });
  }
  // grid
  if (!opt.grid) opt.grid = { left: 55, right: 20, top: 40, bottom: 30 };
  // apply axis theme
  ['xAxis','yAxis'].forEach(ax => {
    if (opt[ax]) {
      if (Array.isArray(opt[ax])) {
        opt[ax].forEach(a => { Object.assign(a, lightTheme[ax]); });
      } else {
        Object.assign(opt[ax], lightTheme[ax]);
      }
    }
  });
  if (opt.legend) opt.legend.textStyle = lightTheme.legend.textStyle;
  return opt;
}

// ===== 工作台图表 =====
function initDashboardCharts() {
  const c1 = safeInit('dash-order-trend');
  if (c1) {
    c1.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      legend: { data: ['订单量','发货量'], top: 0 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value', name: '万包', nameTextStyle: { color: '#9CA3AF' } },
      series: [
        { name: '订单量', type: 'bar', data: [1285,1145,1380,1245,1335,1280,1350,1290,1400,1320,1380,1450], barWidth: '35%', itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#4A6CF7'},{offset:1,color:'rgba(74,108,247,0.35)'}]) } },
        { name: '发货量', type: 'line', data: [1024,980,1120,1050,1100,1060,1120,1080,1150,1090,1140,1200], smooth: true, lineStyle: { color: '#00BCD4', width: 2 }, itemStyle: { color: '#00BCD4' }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,188,212,0.15)'},{offset:1,color:'transparent'}]) } }
      ]
    }));
  }
  
  const c2 = safeInit('dash-customer-top');
  if (c2) {
    c2.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      grid: { left: 80, right: 20, top: 10, bottom: 30 },
      xAxis: { type: 'value', name: '$万', nameTextStyle: { color: '#9CA3AF' } },
      yAxis: { type: 'category', data: ['客户E','客户D','客户C','客户B','客户A'] },
      series: [{ type: 'bar', data: [3870,4950,5180,6320,8560], itemStyle: { borderRadius: [0,4,4,0], color: new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:'rgba(74,108,247,0.25)'},{offset:1,color:'#4A6CF7'}]) } }]
    }));
  }
}

// ===== 订单统计图表 =====
function initOrderCharts() {
  const c1 = safeInit('order-stat-chart');
  if (c1) {
    c1.setOption(mergeTheme({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['自然包','1000m','250m'], top: 0 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value', name: '万包', nameTextStyle: { color: '#9CA3AF' } },
      series: [
        { name: '自然包', type: 'bar', data: [320,285,350,310,340,330,350,320,360,340,350,370], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#4A6CF7'},{offset:1,color:'rgba(74,108,247,0.45)'}]) } },
        { name: '1000m', type: 'bar', data: [580,520,620,560,600,580,610,570,630,600,620,650], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00BCD4'},{offset:1,color:'rgba(0,188,212,0.45)'}]) } },
        { name: '250m', type: 'bar', data: [385,340,410,375,395,370,390,400,410,380,410,430], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00C48C'},{offset:1,color:'rgba(0,196,140,0.45)'}]) } }
      ]
    }));
  }

  const c2 = safeInit('order-ship-chart');
  if (c2) {
    c2.setOption(mergeTheme({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['自然包','1000m','250m'], top: 0 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value', name: '万包', nameTextStyle: { color: '#9CA3AF' } },
      series: [
        { name: '自然包', type: 'bar', data: [260,230,280,250,270,260,280,255,290,270,280,300], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#4A6CF7'},{offset:1,color:'rgba(74,108,247,0.45)'}]) } },
        { name: '1000m', type: 'bar', data: [470,420,500,450,480,460,490,460,510,480,500,520], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00BCD4'},{offset:1,color:'rgba(0,188,212,0.45)'}]) } },
        { name: '250m', type: 'bar', data: [294,330,340,350,350,340,350,365,350,340,360,380], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00C48C'},{offset:1,color:'rgba(0,196,140,0.45)'}]) } }
      ]
    }));
  }

  const c3 = safeInit('order-amount-chart');
  if (c3) {
    c3.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      grid: { left: 60, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value', name: '$万', nameTextStyle: { color: '#9CA3AF' } },
      series: [{ type: 'line', data: [3560,3180,3820,3450,3700,3550,3720,3480,3880,3660,3820,4010], smooth: true, lineStyle: { color: '#FFB547', width: 2 }, itemStyle: { color: '#FFB547' }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(255,181,71,0.15)'},{offset:1,color:'transparent'}]) } }]
    }));
  }
}

// ===== 同比对比图表 =====
function initCompareCharts() {
  // 订单数量同比
  const c1 = safeInit('order-yoy-chart');
  if (c1) {
    c1.setOption(mergeTheme({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['2026年','2025年','同比增减'], top: 0 },
      grid: { left: 55, right: 50, top: 45, bottom: 30 },
      xAxis: { type: 'category', data: months },
      yAxis: [
        { type: 'value', name: '万包', nameTextStyle: { color: '#9CA3AF' } },
        { type: 'value', name: '万包', axisLabel: { color: '#6B7280', formatter: v => (v>=0?'+':'')+v }, nameTextStyle: { color: '#9CA3AF' }, splitLine: { show: false } }
      ],
      series: [
        { name: '2026年', type: 'bar', data: [1285,1145,1380,1245,1335,1280,1350,1290,1400,1320,1380,1450], barWidth: '25%', itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#4A6CF7'},{offset:1,color:'rgba(74,108,247,0.45)'}]) } },
        { name: '2025年', type: 'bar', data: [1145,1020,1230,1150,1210,1160,1220,1170,1260,1190,1240,1300], barWidth: '25%', itemStyle: { color: 'rgba(74,108,247,0.18)' } },
        { name: '同比增减', type: 'line', yAxisIndex: 1, data: [140,125,150,95,125,120,130,120,140,130,140,150], smooth: true, lineStyle: { color: '#FF5C72', width: 2 }, itemStyle: { color: '#FF5C72' },
          markLine: { silent: true, data: [{ yAxis: 0, lineStyle: { color: '#9CA3AF', type: 'dashed' } }] }
        }
      ]
    }));
  }

  // 发货数量同比
  const c2 = safeInit('ship-yoy-chart');
  if (c2) {
    c2.setOption(mergeTheme({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['2026年','2025年','同比增减'], top: 0 },
      grid: { left: 55, right: 50, top: 45, bottom: 30 },
      xAxis: { type: 'category', data: months },
      yAxis: [
        { type: 'value', name: '万包', nameTextStyle: { color: '#9CA3AF' } },
        { type: 'value', name: '万包', axisLabel: { color: '#6B7280', formatter: v => (v>=0?'+':'')+v }, nameTextStyle: { color: '#9CA3AF' }, splitLine: { show: false } }
      ],
      series: [
        { name: '2026年', type: 'bar', data: [1024,980,1120,1050,1100,1060,1120,1080,1150,1090,1140,1200], barWidth: '25%', itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00C48C'},{offset:1,color:'rgba(0,196,140,0.45)'}]) } },
        { name: '2025年', type: 'bar', data: [920,880,1010,950,990,960,1010,980,1040,990,1030,1090], barWidth: '25%', itemStyle: { color: 'rgba(0,196,140,0.18)' } },
        { name: '同比增减', type: 'line', yAxisIndex: 1, data: [104,100,110,100,110,100,110,100,110,100,110,110], smooth: true, lineStyle: { color: '#FF5C72', width: 2 }, itemStyle: { color: '#FF5C72' },
          markLine: { silent: true, data: [{ yAxis: 0, lineStyle: { color: '#9CA3AF', type: 'dashed' } }] }
        }
      ]
    }));
  }

  // 订单金额同比
  const c3 = safeInit('amount-yoy-chart');
  if (c3) {
    c3.setOption(mergeTheme({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['2026年金额','2025年金额','同比%'], top: 0 },
      grid: { left: 60, right: 60, top: 40, bottom: 30 },
      xAxis: { type: 'category', data: months },
      yAxis: [
        { type: 'value', name: '$万', nameTextStyle: { color: '#9CA3AF' } },
        { type: 'value', name: '%', axisLabel: { formatter: '{value}%', color: '#6B7280' }, nameTextStyle: { color: '#9CA3AF' }, splitLine: { show: false } }
      ],
      series: [
        { name: '2026年金额', type: 'bar', data: [3560,3180,3820,3450,3700,3550,3720,3480,3880,3660,3820,4010], barWidth: '25%', itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#4A6CF7'},{offset:1,color:'rgba(74,108,247,0.4)'}]) } },
        { name: '2025年金额', type: 'bar', data: [3180,2850,3400,3100,3280,3150,3300,3080,3450,3250,3400,3560], barWidth: '25%', itemStyle: { color: 'rgba(74,108,247,0.18)' } },
        { name: '同比%', type: 'line', yAxisIndex: 1, data: [11.9,11.6,12.4,11.3,12.8,12.7,12.7,13.0,12.5,12.6,12.4,12.6], smooth: true, lineStyle: { color: '#FFB547', width: 3 }, itemStyle: { color: '#FFB547' },
          markLine: { silent: true, data: [{ yAxis: 0, lineStyle: { color: '#9CA3AF', type: 'dashed' } }] },
          label: { show: true, formatter: '{c}%', fontSize: 10, color: '#FFB547' }
        }
      ]
    }));
  }
}

// ===== 预算对比图表 =====
function initBudgetCompareChart() {
  const c1 = safeInit('order-vs-budget-chart');
  if (c1) {
    const actual = [3560,3180,3820,3450,3700,3550,null,null,null,null,null,null];
    const annualBudget = [3400,3200,3500,3400,3650,3500,3600,3500,3700,3550,3650,3800];
    const rollingBudget = [3500,3150,3650,3420,3600,3480,3550,3450,3620,3500,3580,3750];
    // 计算达标率（实际vs滚动预算，仅有实际数据的月份）
    const vsAnnual = actual.map((v,i) => v != null ? (((v - annualBudget[i]) / annualBudget[i] * 100).toFixed(1)) : null);
    const vsRolling = actual.map((v,i) => v != null ? (((v - rollingBudget[i]) / rollingBudget[i] * 100).toFixed(1)) : null);
    
    c1.setOption(mergeTheme({
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['实际销售额','年度预算','滚动预算','vs年度预算%','vs滚动预算%'], top: 0 },
      grid: { left: 60, right: 60, top: 55, bottom: 30 },
      xAxis: { type: 'category', data: months },
      yAxis: [
        { type: 'value', name: '$万', nameTextStyle: { color: '#9CA3AF' } },
        { type: 'value', name: '%', axisLabel: { formatter: '{value}%', color: '#6B7280' }, nameTextStyle: { color: '#9CA3AF' }, splitLine: { show: false } }
      ],
      series: [
        {
          name: '实际销售额', type: 'bar', data: actual, barWidth: '35%',
          itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#4A6CF7'},{offset:1,color:'rgba(74,108,247,0.35)'}]) },
          label: { show: true, position: 'top', formatter: p => p.value != null ? p.value : '', fontSize: 10, color: '#4A6CF7' }
        },
        {
          name: '年度预算', type: 'line', data: annualBudget,
          lineStyle: { color: '#FFB547', type: 'dashed', width: 2 }, itemStyle: { color: '#FFB547' },
          symbol: 'diamond', symbolSize: 6
        },
        {
          name: '滚动预算', type: 'line', data: rollingBudget,
          lineStyle: { color: '#00BCD4', type: 'dotted', width: 2 }, itemStyle: { color: '#00BCD4' },
          symbol: 'circle', symbolSize: 6
        },
        {
          name: 'vs年度预算%', type: 'line', yAxisIndex: 1, data: vsAnnual.map(v => v != null ? parseFloat(v) : null),
          lineStyle: { color: '#8B5CF6', width: 2 }, itemStyle: { color: '#8B5CF6' },
          markLine: { silent: true, data: [{ yAxis: 0, lineStyle: { color: '#9CA3AF', type: 'dashed' } }] }
        },
        {
          name: 'vs滚动预算%', type: 'line', yAxisIndex: 1, data: vsRolling.map(v => v != null ? parseFloat(v) : null),
          lineStyle: { color: '#00C48C', width: 2, type: 'dashed' }, itemStyle: { color: '#00C48C' }
        }
      ]
    }));
  }
}

function initBudgetCharts() {}

function initRollingBudgetChart() {
  const c = safeInit('rolling-budget-chart');
  if (c) {
    c.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      legend: { data: ['V4','V5','V6'], top: 0 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value', name: '万包', nameTextStyle: { color: '#9CA3AF' } },
      series: [
        { name: 'V4', type: 'line', data: [1200,1100,1300,1180,1250,1300,1350,1280,1400,1320,1380,1450], lineStyle: { color: 'rgba(74,108,247,0.3)', type: 'dashed' }, itemStyle: { color: 'rgba(74,108,247,0.3)' } },
        { name: 'V5', type: 'line', data: [1200,1100,1350,1200,1280,1320,1380,1300,1420,1340,1400,1480], lineStyle: { color: '#00BCD4' }, itemStyle: { color: '#00BCD4' } },
        { name: 'V6', type: 'line', data: [1250,1100,1350,1220,1300,1350,1400,1320,1440,1360,1420,1500], lineStyle: { color: '#4A6CF7', width: 3 }, itemStyle: { color: '#4A6CF7' } }
      ]
    }));
  }
}

function initCustomerCharts() {
  const c = safeInit('customer-rank-chart');
  if (c) {
    const names = ['客户J','客户I','客户H','客户G','客户F','客户E','客户D','客户C','客户B','客户A'];
    const vals = [2050,2310,2650,2980,3420,3870,4950,5180,6320,8560];
    c.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      grid: { left: 80, right: 30, top: 10, bottom: 30 },
      xAxis: { type: 'value', name: '$万', nameTextStyle: { color: '#9CA3AF' } },
      yAxis: { type: 'category', data: names },
      series: [{ type: 'bar', data: vals, itemStyle: { borderRadius: [0,4,4,0], color: new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:'rgba(74,108,247,0.15)'},{offset:1,color:'#4A6CF7'}]) } }]
    }));
  }
}

function initCustomerAnalysisCharts() {
  const c1 = safeInit('customer-type-chart');
  if (c1) {
    c1.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      legend: { data: ['新增客户','流失客户','忠实客户'], top: 0 },
      xAxis: { type: 'category', data: months },
      yAxis: { type: 'value' },
      series: [
        { name: '新增客户', type: 'bar', data: [3,2,4,2,3,2,1,3,2,4,2,3], itemStyle: { color: '#00C48C' } },
        { name: '流失客户', type: 'bar', data: [1,2,1,1,2,1,1,0,1,1,1,0], itemStyle: { color: '#FF5C72' } },
        { name: '忠实客户', type: 'line', data: [215,215,218,219,220,221,221,224,225,228,229,231], smooth: true, lineStyle: { color: '#4A6CF7', width: 2 }, itemStyle: { color: '#4A6CF7' }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(74,108,247,0.1)'},{offset:1,color:'transparent'}]) } }
      ]
    }));
  }

  const c2 = safeInit('customer-pie-chart');
  if (c2) {
    c2.setOption(mergeTheme({
      tooltip: { trigger: 'item' },
      legend: { top: 0, textStyle: { color: '#6B7280' } },
      series: [{
        type: 'pie', radius: ['40%','70%'], center: ['50%','55%'],
        label: { formatter: '{b}: {c} ({d}%)', color: '#6B7280' },
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        data: [
          { value: 215, name: '忠实客户', itemStyle: { color: '#4A6CF7' } },
          { value: 18, name: '新增客户', itemStyle: { color: '#00C48C' } },
          { value: 12, name: '流失客户', itemStyle: { color: '#FF5C72' } }
        ]
      }]
    }));
  }
}

function initFinanceCharts() {
  const c1 = safeInit('ar-period-chart');
  if (c1) {
    c1.setOption(mergeTheme({
      tooltip: { trigger: 'item' },
      legend: { top: 0, textStyle: { color: '#6B7280' } },
      series: [{
        type: 'pie', radius: ['35%','65%'], center: ['50%','55%'],
        label: { formatter: '{b}\n${c}万 ({d}%)', color: '#6B7280' },
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        data: [
          { value: 4250, name: '1-30天', itemStyle: { color: '#00C48C' } },
          { value: 3180, name: '31-60天', itemStyle: { color: '#FFB547' } },
          { value: 2850, name: '61-90天', itemStyle: { color: '#FF8A00' } },
          { value: 2300, name: '>91天', itemStyle: { color: '#FF5C72' } }
        ]
      }]
    }));
  }

  const c2 = safeInit('ar-payment-chart');
  if (c2) {
    c2.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      grid: { left: 60, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'category', data: ['5月','6月','7月','8月','9月','10月'] },
      yAxis: { type: 'value', name: '$万', nameTextStyle: { color: '#9CA3AF' } },
      series: [{ type: 'bar', data: [3800,3200,2900,2500,2100,1800], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#4A6CF7'},{offset:1,color:'rgba(74,108,247,0.35)'}]) } }]
    }));
  }
}

function initArVersionChart() {
  const c = safeInit('ar-version-chart');
  if (c) {
    c.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      legend: { data: ['4月','3月'], top: 0 },
      grid: { left: 60, right: 20, top: 40, bottom: 30 },
      xAxis: { type: 'category', data: ['1-30天','31-60天','61-90天','>91天'] },
      yAxis: { type: 'value', name: '$万', nameTextStyle: { color: '#9CA3AF' } },
      series: [
        { name: '4月', type: 'bar', data: [4250,3180,2850,2300], barWidth: '30%', itemStyle: { color: '#4A6CF7' } },
        { name: '3月', type: 'bar', data: [3980,3520,2100,2500], barWidth: '30%', itemStyle: { color: 'rgba(74,108,247,0.25)' } }
      ]
    }));
  }
}

function initInventoryCharts() { initInvStatusCharts(); }

function initInvStatusCharts() {
  const c1 = safeInit('inv-spec-chart');
  if (c1) {
    c1.setOption(mergeTheme({
      tooltip: { trigger: 'item' },
      legend: { top: 0, textStyle: { color: '#6B7280' } },
      series: [{
        type: 'pie', radius: ['35%','65%'], center: ['50%','55%'],
        label: { formatter: '{b}\n{c}万包 ({d}%)', color: '#6B7280' },
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        data: [
          { value: 680, name: 'SP-A100', itemStyle: { color: '#4A6CF7' } },
          { value: 520, name: 'SP-B200', itemStyle: { color: '#00BCD4' } },
          { value: 450, name: 'SP-C300', itemStyle: { color: '#00C48C' } },
          { value: 380, name: 'SP-D400', itemStyle: { color: '#FFB547' } },
          { value: 320, name: 'SP-E500', itemStyle: { color: '#8B5CF6' } }
        ]
      }]
    }));
  }

  const c2 = safeInit('inv-factory-chart');
  if (c2) {
    c2.setOption(mergeTheme({
      tooltip: { trigger: 'item' },
      legend: { top: 0, textStyle: { color: '#6B7280' } },
      series: [{
        type: 'pie', radius: ['35%','65%'], center: ['50%','55%'],
        label: { formatter: '{b}\n{c}万包', color: '#6B7280' },
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        data: [
          { value: 1420, name: 'F3工厂', itemStyle: { color: '#4A6CF7' } },
          { value: 930, name: 'F5工厂', itemStyle: { color: '#00C48C' } }
        ]
      }]
    }));
  }
}

function initInvVersionChart() {
  const c = safeInit('inv-version-chart');
  if (c) {
    c.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      legend: { data: ['本期','上期'], top: 0 },
      grid: { left: 50, right: 20, top: 40, bottom: 30 },
      xAxis: { type: 'category', data: ['SP-A100','SP-B200','SP-C300','SP-D400','SP-E500'] },
      yAxis: { type: 'value', name: '万包', nameTextStyle: { color: '#9CA3AF' } },
      series: [
        { name: '本期', type: 'bar', data: [510,280,420,380,320], barWidth: '30%', itemStyle: { color: '#4A6CF7' } },
        { name: '上期', type: 'bar', data: [480,350,400,360,340], barWidth: '30%', itemStyle: { color: 'rgba(74,108,247,0.25)' } }
      ]
    }));
  }
}

function initInvAgeChart() {
  const c = safeInit('inv-age-chart');
  if (c) {
    c.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      grid: { left: 50, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'category', data: ['0-30天','31-90天','91-180天','181-360天','>360天'] },
      yAxis: { type: 'value', name: '万包', nameTextStyle: { color: '#9CA3AF' } },
      series: [{
        type: 'bar', data: [
          { value: 680, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00C48C'},{offset:1,color:'rgba(0,196,140,0.35)'}]) } },
          { value: 520, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00BCD4'},{offset:1,color:'rgba(0,188,212,0.35)'}]) } },
          { value: 450, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#FFB547'},{offset:1,color:'rgba(255,181,71,0.35)'}]) } },
          { value: 380, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#FF8A00'},{offset:1,color:'rgba(255,138,0,0.35)'}]) } },
          { value: 320, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#FF5C72'},{offset:1,color:'rgba(255,92,114,0.35)'}]) } }
        ],
        barWidth: '40%'
      }]
    }));
  }
}

function initDesignCharts() { initJpgCharts(); }

function initJpgCharts() {
  const c1 = safeInit('jpg-scatter-chart');
  if (c1) {
    const scatterData = [];
    for (let m = 0; m < 4; m++) {
      for (let i = 0; i < 15; i++) {
        scatterData.push([m + Math.random()*0.8, 1 + Math.random()*12]);
      }
    }
    c1.setOption(mergeTheme({
      tooltip: { formatter: p => `月份: ${Math.floor(p.data[0])+1}月<br>周期: ${p.data[1].toFixed(1)}天` },
      grid: { left: 50, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'value', name: '月份', min: 0, max: 4, axisLabel: { formatter: v => Math.floor(v)+1 + '月', color: '#6B7280' } },
      yAxis: { type: 'value', name: '周期(天)', nameTextStyle: { color: '#9CA3AF' } },
      series: [{ type: 'scatter', data: scatterData, symbolSize: 8, itemStyle: { color: '#00BCD4', opacity: 0.5 } }]
    }));
  }

  const c2 = safeInit('jpg-trend-chart');
  if (c2) {
    c2.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      legend: { data: ['平均周期','最大周期','最小周期'], top: 0 },
      xAxis: { type: 'category', data: ['1月','2月','3月','4月'] },
      yAxis: { type: 'value', name: '天', nameTextStyle: { color: '#9CA3AF' } },
      series: [
        { name: '平均周期', type: 'line', data: [5.2,4.8,5.5,5.0], smooth: true, lineStyle: { color: '#4A6CF7', width: 3 }, itemStyle: { color: '#4A6CF7' }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(74,108,247,0.1)'},{offset:1,color:'transparent'}]) } },
        { name: '最大周期', type: 'line', data: [12,10,14,11], lineStyle: { color: '#FF5C72', type: 'dashed' }, itemStyle: { color: '#FF5C72' } },
        { name: '最小周期', type: 'line', data: [2,1,2,1], lineStyle: { color: '#00C48C', type: 'dotted' }, itemStyle: { color: '#00C48C' } }
      ]
    }));
  }
}

function initCycleCharts() {
  const c1 = safeInit('cycle-scatter-chart');
  if (c1) {
    const data = [];
    for (let i = 0; i < 35; i++) { data.push([i+1, 1 + Math.random()*10]); }
    c1.setOption(mergeTheme({
      tooltip: { formatter: p => `设计单#${p.data[0]}<br>周期: ${p.data[1].toFixed(1)}天` },
      grid: { left: 50, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'value', name: '设计单序号', nameTextStyle: { color: '#9CA3AF' } },
      yAxis: { type: 'value', name: '周期(天)', nameTextStyle: { color: '#9CA3AF' } },
      series: [{ type: 'scatter', data, symbolSize: 10, itemStyle: { color: '#8B5CF6', opacity: 0.5 } }]
    }));
  }

  const c2 = safeInit('cycle-trend-chart');
  if (c2) {
    c2.setOption(mergeTheme({
      tooltip: { trigger: 'axis' },
      legend: { data: ['平均','最大','最小'], top: 0 },
      xAxis: { type: 'category', data: ['1月','2月','3月','4月'] },
      yAxis: { type: 'value', name: '天', nameTextStyle: { color: '#9CA3AF' } },
      series: [
        { name: '平均', type: 'line', data: [5.2,4.8,5.5,5.0], smooth: true, lineStyle: { color: '#4A6CF7', width: 2 }, itemStyle: { color: '#4A6CF7' }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(74,108,247,0.08)'},{offset:1,color:'transparent'}]) } },
        { name: '最大', type: 'bar', data: [12,10,14,11], itemStyle: { color: 'rgba(255,181,71,0.5)' } },
        { name: '最小', type: 'bar', data: [2,1,2,1], itemStyle: { color: 'rgba(0,196,140,0.5)' } }
      ]
    }));
  }
}

// 窗口resize时重绘图表
window.addEventListener('resize', () => {
  Object.values(charts).forEach(c => { if (c && !c.isDisposed()) c.resize(); });
});
