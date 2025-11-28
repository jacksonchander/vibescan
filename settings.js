// settings.js
function setTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('vibeScanTheme', theme);
}

function loadSettings(){
  const theme = localStorage.getItem('vibeScanTheme') || 'neon';
  setTheme(theme);
}

function resetData(){
  if(confirm('Reset all VibeScan data? This cannot be undone.')){
    localStorage.clear();
    alert('Data reset. Reloading.'); location.reload();
  }
}

window.setTheme = setTheme;
window.loadSettings = loadSettings;
window.resetData = resetData;
