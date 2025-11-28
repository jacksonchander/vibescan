// community.js - local anonymous wall
function postToCommunity(text, mood='🙂'){
  if(!text || !text.trim()) return;
  const posts = JSON.parse(localStorage.getItem('vibeScanCommunity')||'[]');
  posts.unshift({ id: Date.now(), text: text.trim(), mood, time: new Date().toISOString() });
  localStorage.setItem('vibeScanCommunity', JSON.stringify(posts.slice(0,200)));
  return posts;
}

function renderCommunity(containerId){
  const container = document.getElementById(containerId); if(!container) return;
  const posts = JSON.parse(localStorage.getItem('vibeScanCommunity')||'[]');
  container.innerHTML='';
  posts.forEach(p=>{
    const card = document.createElement('div'); card.className='community-card';
    card.innerHTML = `<div class="mood">${p.mood}</div><div class="text">${p.text}</div><div class="time">${new Date(p.time).toLocaleString()}</div>`;
    container.appendChild(card);
  });
}

window.postToCommunity = postToCommunity;
window.renderCommunity = renderCommunity;
