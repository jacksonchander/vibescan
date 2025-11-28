// trends.js - simulated trend scanner
function generateTrends(){
  const topics = ['Authenticity','Quiet Luxury','Micro-vlogging','Positive Feedback','Nostalgia','Short Stories','Live Q&A','Minimal Aesthetics'];
  const trends = { rising: [], dropping: [] };
  for(let i=0;i<3;i++) trends.rising.push({topic: topics[Math.floor(Math.random()*topics.length)], score: Math.floor(Math.random()*50)+50});
  for(let i=0;i<3;i++) trends.dropping.push({topic: topics[Math.floor(Math.random()*topics.length)], score: Math.floor(Math.random()*30)+10});
  localStorage.setItem('vibeScanTrends', JSON.stringify(trends));
  return trends;
}

function renderTrends(containerId){
  const c = document.getElementById(containerId); if(!c) return;
  const trends = JSON.parse(localStorage.getItem('vibeScanTrends')||'null') || generateTrends();
  c.innerHTML = '<h4>Rising</h4>' + trends.rising.map(t=>`<div class="trend">${t.topic} • ${t.score}%</div>`).join('') + '<h4>Dropping</h4>' + trends.dropping.map(t=>`<div class="trend muted">${t.topic} • ${t.score}%</div>`).join('');
}

window.generateTrends = generateTrends;
window.renderTrends = renderTrends;
