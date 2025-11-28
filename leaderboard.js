// leaderboard.js - Simulated global leaderboard
function generateLeaderboard(count=75){
  const countries = ['USA','UK','Canada','Brazil','India','Spain','Germany','France','Nigeria','Australia'];
  const names = ['Ava','Liam','Noah','Emma','Olivia','Lucas','Mia','Ethan','Sophia','Amelia','Logan','Isabella'];
  const list = [];
  for(let i=0;i<count;i++){
    list.push({
      name: names[Math.floor(Math.random()*names.length)] + ' ' + Math.floor(Math.random()*999),
      country: countries[Math.floor(Math.random()*countries.length)],
      score: Math.floor(Math.random()*41)+50 // 50-90
    });
  }

  // Insert real user
  const userScore = parseInt(localStorage.getItem('vibeScanMainScore')||'84');
  const userName = localStorage.getItem('vibeScanName') || 'You';
  list.push({ name: userName, country: 'You', score: userScore });

  list.sort((a,b)=>b.score-a.score);
  localStorage.setItem('vibeScanLeaderboard', JSON.stringify(list));
  return list;
}

function renderLeaderboard(containerId){
  const container = document.getElementById(containerId);
  if(!container) return;
  const list = JSON.parse(localStorage.getItem('vibeScanLeaderboard')||'[]') || generateLeaderboard();
  container.innerHTML = '';
  list.slice(0,100).forEach((u, idx)=>{
    const el = document.createElement('div'); el.className='lb-row';
    el.innerHTML = `<div class="rank">${idx+1}</div><div class="name">${u.name}</div><div class="country">${u.country}</div><div class="score">${u.score}</div>`;
    container.appendChild(el);
  });
}

window.generateLeaderboard = generateLeaderboard;
window.renderLeaderboard = renderLeaderboard;
