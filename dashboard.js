// ===========================
// DASHBOARD.JS - AI Score Simulation & Dashboard Logic
// ===========================

// Personality types and descriptions
const PERSONALITY_TYPES = [
    { name: 'The Influencer', desc: 'You have excellent communication skills and a natural ability to connect with others.' },
    { name: 'The Visionary', desc: 'You inspire others with your forward-thinking ideas and innovative perspectives.' },
    { name: 'The Connector', desc: 'Your strength lies in building bridges and fostering meaningful relationships.' },
    { name: 'The Authentic', desc: 'You maintain genuine connections and build trust through transparency and integrity.' },
    { name: 'The Leader', desc: 'You naturally command respect and guide others with confidence and clarity.' },
    { name: 'The Empath', desc: 'You excel at understanding emotions and creating supportive, caring environments.' },
    { name: 'The Achiever', desc: 'Your drive and determination inspire confidence and admiration in those around you.' },
    { name: 'The Innovator', desc: 'You bring fresh perspectives and creative solutions to every interaction.' }
];

// Improvement tips
const IMPROVEMENT_TIPS = [
    'Start meaningful conversations by asking thoughtful questions about others\' interests and experiences.',
    'Share your authentic thoughts and vulnerabilities - people connect with realness, not perfection.',
    'Respond to comments and messages within 24 hours to show you value your relationships.',
    'Use humor appropriately in your interactions to break tension and build rapport.',
    'Engage with others\' content regularly by liking, commenting, and sharing their ideas.',
    'Be consistent in your messaging across all platforms to build a strong personal brand.',
    'Share your wins and accomplishments with confidence - celebrate others\' wins too.',
    'Listen actively when others speak and ask follow-up questions to show genuine interest.',
    'Create value for your community by sharing helpful tips, resources, or insights.',
    'Maintain a positive tone even when discussing challenging topics or disagreeing.',
    'Update your profile regularly to keep your presence fresh and current.',
    'Collaborate with others on projects or content to expand your network.',
    'Be supportive of your network\'s endeavors - cheer them on publicly.',
    'Admit mistakes gracefully and show how you\'re learning and improving.',
    'Share behind-the-scenes content to give people a genuine look at who you are.',
    'Engage in communities related to your interests and passions authentically.'
];

// Badges
const BADGES = [
    { name: 'Rising Star', icon: '⭐', desc: 'Score 70+', earned: true },
    { name: 'Confident Voice', icon: '🎤', desc: 'Confidence 75+', earned: true },
    { name: 'Trusted Friend', icon: '🤝', desc: 'Trust 80+', earned: true },
    { name: 'Social Butterfly', icon: '🦋', desc: 'Engagement 75+', earned: false },
    { name: 'Authentic Self', icon: '🎯', desc: 'Red-Flag < 20', earned: true },
    { name: 'Professional Pro', icon: '💼', desc: 'Professionalism 80+', earned: false },
    { name: 'Kindness Champion', icon: '💖', desc: 'Friendliness 85+', earned: true },
    { name: 'Game Changer', icon: '🚀', desc: 'Score 90+', earned: false }
];

// Generate random but realistic scores
function generateRealisticScores() {
    const generateScore = (min = 60, max = 95) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return {
        confidence: generateScore(65, 90),
        friendliness: generateScore(70, 95),
        trust: generateScore(65, 90),
        professionalism: generateScore(60, 90),
        redflag: generateScore(5, 30),
        engagement: generateScore(60, 85)
    };
}

// Calculate main score from subscores
function calculateMainScore(subscores) {
    const { confidence, friendliness, trust, professionalism, redflag, engagement } = subscores;
    const positiveAverage = (confidence + friendliness + trust + professionalism + engagement) / 5;
    const redflagPenalty = redflag * 0.3; // Red flags reduce score
    return Math.round(positiveAverage - redflagPenalty);
}

// Initialize dashboard
function initializeDashboard() {
    // Show loader while initializing
    if (window.showLoader) showLoader();

    // Check if scores exist in localStorage
    let scores = localStorage.getItem('vibeScanScores');
    
    if (!scores) {
        // Generate new scores
        scores = generateRealisticScores();
        localStorage.setItem('vibeScanScores', JSON.stringify(scores));
    } else {
        scores = JSON.parse(scores);
    }

    // Generate personality type
    let personalityType = localStorage.getItem('vibeScanPersonalityType');
    if (!personalityType) {
        const personality = PERSONALITY_TYPES[Math.floor(Math.random() * PERSONALITY_TYPES.length)];
        localStorage.setItem('vibeScanPersonalityType', personality.name);
        localStorage.setItem('vibeScanPersonalityDesc', personality.desc);
        personalityType = personality.name;
    }

    // Calculate main score
    const mainScore = calculateMainScore(scores);
    localStorage.setItem('vibeScanMainScore', mainScore);

    // Update display
    displayScores(scores, mainScore, personalityType);
    displayTips();
    displayBadges(scores);
    displayLeaderboard();
    displayHistory();

    // Hide loader after short delay to allow animations
    if (window.hideLoader) setTimeout(() => { hideLoader(); }, 1200);
}

// Display scores on dashboard
function displayScores(scores, mainScore, personalityType) {
    // Main score
    document.getElementById('mainScore').textContent = mainScore;
    
    // Personality type
    const personalityDesc = localStorage.getItem('vibeScanPersonalityDesc') || 'Discovering your vibe...';
    document.getElementById('personalityType').textContent = 'The ' + personalityType;
    document.getElementById('personalityDesc').textContent = personalityDesc;

    // Sub-scores
    document.getElementById('confidenceScore').textContent = scores.confidence;
    document.getElementById('friendlinessScore').textContent = scores.friendliness;
    document.getElementById('trustScore').textContent = scores.trust;
    document.getElementById('professionalismScore').textContent = scores.professionalism;
    document.getElementById('redflagScore').textContent = scores.redflag;
    document.getElementById('engagementScore').textContent = scores.engagement;

    // Update progress bars
    document.getElementById('confidenceBar').style.width = scores.confidence + '%';
    document.getElementById('friendlinessBar').style.width = scores.friendliness + '%';
    document.getElementById('trustBar').style.width = scores.trust + '%';
    document.getElementById('professionalismBar').style.width = scores.professionalism + '%';
    document.getElementById('redflagBar').style.width = scores.redflag + '%';
    document.getElementById('engagementBar').style.width = scores.engagement + '%';

    // Update share graphic
    document.getElementById('graphicScore').textContent = mainScore;
}

// Display AI improvement tips
function displayTips() {
    const tipsContainer = document.getElementById('tipsContainer');
    const selectedTips = [];
    
    // Randomly select 5 tips
    while (selectedTips.length < 5) {
        const randomTip = IMPROVEMENT_TIPS[Math.floor(Math.random() * IMPROVEMENT_TIPS.length)];
        if (!selectedTips.includes(randomTip)) {
            selectedTips.push(randomTip);
        }
    }

    tipsContainer.innerHTML = selectedTips.map((tip, index) => `
        <div class="tip-card">
            <div class="tip-number">${index + 1}</div>
            <p>${tip}</p>
        </div>
    `).join('');

    localStorage.setItem('vibeScanTips', JSON.stringify(selectedTips));
}

// Display badges
function displayBadges(scores) {
    const badgesContainer = document.getElementById('badgesContainer');
    
    const badgesWithScores = BADGES.map(badge => {
        let shouldEarn = false;
        
        if (badge.name === 'Rising Star') shouldEarn = scores.confidence + scores.friendliness > 160;
        else if (badge.name === 'Confident Voice') shouldEarn = scores.confidence >= 75;
        else if (badge.name === 'Trusted Friend') shouldEarn = scores.trust >= 80;
        else if (badge.name === 'Social Butterfly') shouldEarn = scores.engagement >= 75;
        else if (badge.name === 'Authentic Self') shouldEarn = scores.redflag < 20;
        else if (badge.name === 'Professional Pro') shouldEarn = scores.professionalism >= 80;
        else if (badge.name === 'Kindness Champion') shouldEarn = scores.friendliness >= 85;
        else if (badge.name === 'Game Changer') shouldEarn = (scores.confidence + scores.friendliness + scores.trust + scores.professionalism + scores.engagement) / 5 >= 90;
        
        return { ...badge, earned: shouldEarn };
    });

    badgesContainer.innerHTML = badgesWithScores.map(badge => `
        <div class="badge-item ${!badge.earned ? 'locked' : ''}">
            <div class="badge-icon">${badge.icon}</div>
            <p><strong>${badge.name}</strong></p>
            <p style="font-size: 12px; color: var(--text-secondary);">${badge.desc}</p>
        </div>
    `).join('');

    localStorage.setItem('vibeScanBadges', JSON.stringify(badgesWithScores));
}

// Display leaderboard (simulated data)
function displayLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    
    const users = [
        { rank: 1, name: 'Alex Chen', score: 96, personality: 'The Visionary', badges: 7 },
        { rank: 2, name: 'Jordan Smith', score: 94, personality: 'The Leader', badges: 6 },
        { rank: 3, name: 'Casey Taylor', score: 91, personality: 'The Influencer', badges: 6 },
        { rank: 4, name: 'Morgan Davis', score: 88, personality: 'The Connector', badges: 5 },
        { rank: 5, name: 'You', score: localStorage.getItem('vibeScanMainScore') || 84, personality: localStorage.getItem('vibeScanPersonalityType') || 'The Influencer', badges: 4 },
        { rank: 6, name: 'Sam Wilson', score: 82, personality: 'The Authentic', badges: 4 },
        { rank: 7, name: 'Jamie Lee', score: 79, personality: 'The Empath', badges: 3 },
        { rank: 8, name: 'Taylor Brown', score: 76, personality: 'The Achiever', badges: 3 },
        { rank: 9, name: 'Riley Johnson', score: 73, personality: 'The Innovator', badges: 2 },
        { rank: 10, name: 'Morgan White', score: 70, personality: 'The Authentic', badges: 2 }
    ];

    let userRank = null;
    users.forEach((user, index) => {
        if (user.name === 'You') {
            userRank = index + 1;
        }
    });

    leaderboardBody.innerHTML = users.map(user => `
        <tr ${user.name === 'You' ? 'style="background: rgba(0, 212, 255, 0.1); font-weight: bold;"' : ''}>
            <td>#${user.rank}</td>
            <td>${user.name}</td>
            <td>${user.score}</td>
            <td>${user.personality}</td>
            <td>${'🏆'.repeat(user.badges)}</td>
        </tr>
    `).join('');

    document.getElementById('userRank').textContent = userRank;
}

// Display score history (simulated)
function displayHistory() {
    const historyChart = document.getElementById('historyChart');
    const currentScore = parseInt(localStorage.getItem('vibeScanMainScore')) || 84;
    
    // Generate simulated history
    const scoreHistory = [];
    let score = currentScore - 8;
    for (let i = 0; i < 14; i++) {
        score = Math.min(100, Math.max(0, score + Math.random() * 2 - 0.5));
        scoreHistory.push(Math.round(score));
    }

    const maxScore = Math.max(...scoreHistory);
    const minScore = Math.min(...scoreHistory);
    const range = maxScore - minScore || 10;

    historyChart.innerHTML = scoreHistory.map((score, index) => {
        const heightPercent = ((score - minScore) / range) * 80 + 20;
        return `<div class="chart-bar" style="height: ${heightPercent}%" title="Day ${index + 1}: ${score} points"></div>`;
    }).join('');

    const improvement = currentScore - scoreHistory[0];
    document.getElementById('scoreImprovement').textContent = (improvement >= 0 ? '+' : '') + improvement + ' points';
}

// Refresh score
function refreshScore() {
    // Generate new scores
    const newScores = generateRealisticScores();
    const newMainScore = calculateMainScore(newScores);
    
    localStorage.setItem('vibeScanScores', JSON.stringify(newScores));
    localStorage.setItem('vibeScanMainScore', newMainScore);

    // Update display with animation
    const scoreCircle = document.querySelector('.score-circle');
    scoreCircle.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        displayScores(newScores, newMainScore, localStorage.getItem('vibeScanPersonalityType'));
        displayTips();
        displayBadges(newScores);
        displayHistory();
        scoreCircle.style.transform = 'scale(1)';
        
        alert('✨ Your scores have been refreshed!');
    }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('dashboard-page')) {
        initializeDashboard();
        
        // Set up share modal
        window.addEventListener('click', function(event) {
            const shareModal = document.getElementById('shareModal');
            if (event.target === shareModal) {
                shareModal.classList.remove('active');
            }
        });
    }
});

// Share with more details
function shareScore(platform) {
    const mainScore = localStorage.getItem('vibeScanMainScore') || '84';
    const personality = localStorage.getItem('vibeScanPersonalityType') || 'The Influencer';
    
    // Show share modal
    const modal = document.getElementById('shareModal');
    if (modal) {
        const messages = {
            facebook: `I just scored ${mainScore}/100 on VibeScan as "${personality}"! 🎉 Check out your universal social score and start improving your vibe today!`,
            instagram: `My vibe is ${mainScore}! 🎯 #VibeScan #PersonalityScore #SocialScore`,
            twitter: `Just got my VibeScan score: ${mainScore}/100 (${personality}) 🚀 Discover your universal social score!`,
            tiktok: `My VibeScan Score: ${mainScore} - ${personality} 🎵 #VibeScan #Personality #SocialScore`
        };

        document.getElementById('shareMessage').textContent = messages[platform] || 'Check out my VibeScan score!';
        document.getElementById('shareLink').value = 'https://vibescan.com?ref=' + encodeURIComponent(personality);
        modal.classList.add('active');
    }
}

// Export functions
window.refreshScore = refreshScore;
window.shareScore = shareScore;
