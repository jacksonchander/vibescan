// mood-tracker.js
function saveMood(dateISO, mood){
  const moods = JSON.parse(localStorage.getItem('vibeScanMoods')||'{}');
  moods[dateISO] = mood;
  localStorage.setItem('vibeScanMoods', JSON.stringify(moods));
}

function getMoodHistory(){
  return JSON.parse(localStorage.getItem('vibeScanMoods')||'{}');
}

function renderMoodChart(containerId){
  const container = document.getElementById(containerId); if(!container) return;
  const history = getMoodHistory();
  container.innerHTML = '<div class="mood-chart">' + Object.keys(history).slice(-7).map(d=>`<div class="mood-day"><div class="date">${d}</div><div class="mood">${history[d]}</div></div>`).join('') + '</div>';
}

window.saveMood = saveMood;
window.getMoodHistory = getMoodHistory;
window.renderMoodChart = renderMoodChart;
