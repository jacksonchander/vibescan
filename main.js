// ===========================
// MAIN.JS - Subscription & Trial Logic
// ===========================

// Trial and Subscription Management
const TRIAL_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

class VibeScanUser {
    constructor() {
        this.loadFromStorage();
    }

    loadFromStorage() {
        const stored = localStorage.getItem('vibeScanUser');
        if (stored) {
            const data = JSON.parse(stored);
            this.email = data.email;
            this.trialStartTime = data.trialStartTime;
            this.subscriptionPlan = data.subscriptionPlan;
            this.subscriptionStartTime = data.subscriptionStartTime;
            this.hasSeenWelcome = data.hasSeenWelcome;
        } else {
            this.email = null;
            this.trialStartTime = null;
            this.subscriptionPlan = null;
            this.subscriptionStartTime = null;
            this.hasSeenWelcome = false;
        }
    }

    saveToStorage() {
        localStorage.setItem('vibeScanUser', JSON.stringify({
            email: this.email,
            trialStartTime: this.trialStartTime,
            subscriptionPlan: this.subscriptionPlan,
            subscriptionStartTime: this.subscriptionStartTime,
            hasSeenWelcome: this.hasSeenWelcome
        }));
    }

    isTrialActive() {
        if (!this.trialStartTime) return false;
        const now = new Date().getTime();
        const elapsed = now - this.trialStartTime;
        return elapsed < TRIAL_DURATION;
    }

    isSubscriptionActive() {
        if (!this.subscriptionPlan) return false;
        // In a real app, validate with backend
        return true;
    }

    hasAccess() {
        return this.isTrialActive() || this.isSubscriptionActive();
    }

    getTimeRemainingInTrial() {
        if (!this.isTrialActive()) return 0;
        const now = new Date().getTime();
        const elapsed = now - this.trialStartTime;
        return TRIAL_DURATION - elapsed;
    }

    getTrialRemainingFormatted() {
        const remaining = this.getTimeRemainingInTrial();
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        return `${hours}h ${minutes}m`;
    }

    startTrial(email) {
        this.email = email;
        this.trialStartTime = new Date().getTime();
        this.saveToStorage();
    }

    subscribe(plan) {
        this.subscriptionPlan = plan;
        this.subscriptionStartTime = new Date().getTime();
        this.saveToStorage();
    }
}

// Initialize user
let currentUser = new VibeScanUser();

// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Click outside modal to close
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Free Trial Functions
function startFreeTrial() {
    if (currentUser.hasAccess()) {
        // User already has access, redirect to dashboard
        window.location.href = 'dashboard.html';
        return;
    }
    openModal('trialModal');
}

function confirmTrial() {
    const email = document.getElementById('trialEmail').value;
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    currentUser.startTrial(email);
    closeModal('trialModal');
    
    // Show success message
    alert(`Welcome to VibeScan! Your 1-day free trial has been activated.\nEmail: ${email}\n\nRedirecting to your dashboard...`);
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Subscription Functions
function subscribePlan(plan) {
    const planDetails = {
        monthly: { price: '$4.99', duration: 'Monthly', billCycle: 'per month' },
        quarterly: { price: '$12.99', duration: 'Quarterly', billCycle: 'per 3 months' },
        yearly: { price: '$39.99', duration: 'Yearly', billCycle: 'per year' }
    };

    const details = planDetails[plan];
    if (!details) return;

    const subDetails = document.getElementById('subDetails');
    subDetails.innerHTML = `
        <div style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <p style="color: var(--text-secondary); margin-bottom: 10px;">You're subscribing to:</p>
            <h3 style="color: var(--primary-color); font-size: 24px; margin-bottom: 5px;">${details.duration}</h3>
            <p style="color: var(--text-secondary);">${details.price} <span style="font-size: 14px;">${details.billCycle}</span></p>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 20px;">
            ✓ Full dashboard access<br>
            ✓ AI personality insights<br>
            ✓ Daily improvement tips<br>
            ✓ Shareable score graphics<br>
            ✓ Badge tracking & leaderboard
        </p>
    `;

    document.getElementById('subTitle').textContent = `Subscribe to ${details.duration}`;
    openModal('subscriptionModal');
    
    // Store selected plan for payment processing
    window.selectedPlan = plan;
}

function processPayment() {
    const plan = window.selectedPlan;
    if (!plan) return;

    // Show non-refundable warning
    const confirmed = confirm('⚠️ IMPORTANT: This subscription is non-refundable. By clicking OK, you confirm you understand and accept these terms. Continue?');
    
    if (!confirmed) return;

    // Simulate payment processing
    alert('🔒 Redirecting to secure payment gateway...\n\nSimulating payment for ' + plan + ' plan...');
    
    // In a real app, this would integrate with Stripe, PayPal, etc.
    // For now, we'll simulate successful payment
    currentUser.subscribe(plan);
    closeModal('subscriptionModal');
    
    alert('✓ Subscription successful!\n\nYour ' + plan + ' plan is now active.\nRedirecting to your dashboard...');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('vibeScanUser');
        localStorage.removeItem('vibeScanScore');
        localStorage.removeItem('vibeScanTips');
        alert('You have been logged out.');
        window.location.href = 'index.html';
    }
}

// Check access on page load
document.addEventListener('DOMContentLoaded', function() {
    // On dashboard page, check if user has access
    if (window.location.pathname.includes('dashboard.html')) {
        if (!currentUser.hasAccess()) {
            alert('You need to start a free trial or subscribe to access the dashboard.');
            window.location.href = 'index.html';
        }
    }

    // Display trial status if on dashboard
    if (document.querySelector('.dashboard-page')) {
        updateTrialStatus();
    }
});

// Update trial status display
function updateTrialStatus() {
    if (currentUser.isTrialActive()) {
        const remaining = currentUser.getTrialRemainingFormatted();
        const lastUpdated = document.getElementById('lastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = `Trial active • ${remaining} remaining`;
            lastUpdated.style.color = 'var(--warning-color)';
        }
    }
}

// Periodically update trial status
setInterval(updateTrialStatus, 30000); // Update every 30 seconds

// Share functions
function shareScore(platform) {
    const score = localStorage.getItem('vibeScanMainScore') || '84';
    const personalityType = localStorage.getItem('vibeScanPersonalityType') || 'The Influencer';
    
    const shareTexts = {
        facebook: `Check out my Universal Social Score on VibeScan! I scored ${score}/100 - ${personalityType}. Discover yours at vibescan.com`,
        instagram: `My vibe is strong! 🎯 Scored ${score}/100 on VibeScan as ${personalityType}. What's your score? vibescan.com`,
        twitter: `I just got my VibeScan score: ${score}/100 (${personalityType})! Discover your universal social score at vibescan.com 🚀`,
        tiktok: `My VibeScan Score: ${score}/100 🎵 Personality: ${personalityType} Check out your score at vibescan.com!`
    };

    const message = shareTexts[platform] || 'Check out my VibeScan score!';
    const shareLink = `https://vibescan.com?ref=${encodeURIComponent(personalityType)}`;

    const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}&quote=${encodeURIComponent(message)}`,
        instagram: `https://www.instagram.com/?url=${encodeURIComponent(shareLink)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareLink)}`,
        tiktok: `https://www.tiktok.com/`
    };

    if (platform === 'tiktok') {
        alert('Share on TikTok:\n\n' + message);
    } else if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
    }
}

function downloadScoreGraphic() {
    const score = localStorage.getItem('vibeScanMainScore') || '84';
    const personalityType = localStorage.getItem('vibeScanPersonalityType') || 'The Influencer';
    
    // Create canvas for image
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 800);
    gradient.addColorStop(0, '#00d4ff');
    gradient.addColorStop(1, '#8338ec');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 800);

    // Circle background
    ctx.fillStyle = '#0a0e27';
    ctx.beginPath();
    ctx.arc(400, 350, 200, 0, Math.PI * 2);
    ctx.fill();

    // Score text
    ctx.font = 'bold 120px Arial';
    ctx.fillStyle = '#00d4ff';
    ctx.textAlign = 'center';
    ctx.fillText(score, 400, 390);

    // Label
    ctx.font = '24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Universal Social Score', 400, 580);

    // Personality type
    ctx.font = '20px Arial';
    ctx.fillStyle = '#b0b3c1';
    ctx.fillText(personalityType, 400, 630);

    // Website
    ctx.font = '18px Arial';
    ctx.fillStyle = '#b0b3c1';
    ctx.fillText('vibescan.com', 400, 750);

    // Download canvas as image
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vibescan-score-${score}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    alert('Share link copied to clipboard!');
}

// Export for other modules
window.VibeScanUser = VibeScanUser;
window.currentUser = currentUser;
