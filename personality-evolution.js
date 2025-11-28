// personality-evolution.js - simulate evolution timeline
function simulateEvolution(days=30){
  const base = parseInt(localStorage.getItem('vibeScanMainScore')||80);
  const history = [];
  for(let i=days-1;i>=0;i--){
    const score = Math.max(20, Math.min(100, base + Math.round((Math.random()-0.5)*10) - Math.round(i/5)));
    history.push({day: i, score});
  }
  localStorage.setItem('vibeScanEvolution', JSON.stringify(history));
  return history;
}

function renderEvolution(containerId){
  const c = document.getElementById(containerId); if(!c) return;
  const history = JSON.parse(localStorage.getItem('vibeScanEvolution')||'[]') || simulateEvolution();
  c.innerHTML = '<div class="evolution-line">' + history.map(h=>`<div class="ev-point">${h.score}</div>`).join('') + '</div>';
}

window.simulateEvolution = simulateEvolution;
window.renderEvolution = renderEvolution;
