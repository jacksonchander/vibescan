// profile-builder.js - generate bios and aesthetics
function generateBios(name, keywords){
  const k = (keywords||'').split(',').map(s=>s.trim()).filter(Boolean);
  return {
    instagram: `${k.slice(0,3).join(' • ')} — ${name}`,
    tiktok: `${name} | ${k.slice(0,2).join(' · ')}`,
    youtube: `${name} — ${k.join(' ')} `,
    colorAesthetic: pickColorAesthetic(k)
  };
}

function pickColorAesthetic(k){
  const palettes = ['#FF6B6B,#FFD93D','#00d4ff,#8338ec','#34eb6b,#0b6efc'];
  return palettes[Math.floor(Math.random()*palettes.length)].split(',');
}

window.generateBios = generateBios;
