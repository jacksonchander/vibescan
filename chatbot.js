// chatbot.js - simple rule-based companion
const chatbotPrompts = {
  greeting: ['Hey there! How are you feeling today?','Welcome back — ready to improve your vibe?'],
  motivation: ['You got this! Small steps every day.','Remember: consistency > intensity.'],
  advice: ['Try complimenting one person today. It boosts warmth.','Share a short story to increase engagement on socials.']
};

function getBotReply(input){
  input = (input||'').toLowerCase();
  if(input.includes('help')||input.includes('advice')) return chatbotPrompts.advice[Math.floor(Math.random()*chatbotPrompts.advice.length)];
  if(input.includes('motivate')||input.includes('motivation')) return chatbotPrompts.motivation[Math.floor(Math.random()*chatbotPrompts.motivation.length)];
  return chatbotPrompts.greeting[Math.floor(Math.random()*chatbotPrompts.greeting.length)];
}

function appendChat(containerId, who, text){
  const c = document.getElementById(containerId); if(!c) return;
  const el = document.createElement('div'); el.className = 'chat-bubble ' + (who==='user'?'user':'bot');
  el.textContent = text; c.appendChild(el); c.scrollTop = c.scrollHeight;
}

window.getBotReply = getBotReply;
window.appendChat = appendChat;
