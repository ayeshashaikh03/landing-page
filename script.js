// ----------------------------------------------------
// 1. Mobile Menu Toggle
// ----------------------------------------------------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    // Toggle between hamburger and X icon
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ----------------------------------------------------
// 2. Search Bar Alert
// ----------------------------------------------------
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        alert('🔍 You searched for: "' + query + '"\n(Search functionality coming soon!)');
    } else {
        alert('Please enter a search term.');
    }
});

// Allow "Enter" key to trigger search
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
    }
});

// ----------------------------------------------------
// 3. Login Button Alert
// ----------------------------------------------------
document.getElementById('loginBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('🔐 Login page coming soon!\nPlease check back later.');
});

// ----------------------------------------------------
// 4. Register Button Alert
// ----------------------------------------------------
document.getElementById('registerBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('📝 Registration page coming soon!\nSign up to get started with Project X.');
});

// ----------------------------------------------------
// 5. Get Started Button Alert
// ----------------------------------------------------
document.getElementById('getStartedBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('🎉 Welcome to Project X!\nYour 30-day free trial starts now!');
});

// ----------------------------------------------------
// 6. Smooth Scrolling (Optional Enhancement)
// ----------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ----------------------------------------------------
// 7. Console Welcome Message
// ----------------------------------------------------
console.log('%c🚀 Welcome to Project X!', 'font-size: 24px; font-weight: bold; color: #6c63ff;');
console.log('%cBuilt with ❤️ by Team X', 'font-size: 14px; color: #888;');
console.log('%c👨‍💻 Check out the source code on GitHub!', 'font-size: 14px; color: #6c63ff;');

// ----------------------------------------------------
// 8. Pricing Card Button Alerts (Bonus)
// ----------------------------------------------------
document.querySelectorAll('.pricing-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const cardTitle = this.closest('.pricing-card').querySelector('h3').textContent;
        if (cardTitle.includes('Free Trial')) {
            alert('🎁 Starting your 30-day free trial!\nNo credit card required.');
        } else if (cardTitle.includes('Credits')) {
            alert('💳 Redirecting to payment page...\n1 Credit = ₹1\n1 Credit = 1 day access for 1 project');
        } else if (cardTitle.includes('Enterprise')) {
            alert('🏢 Contact our sales team at:\nsales@projectx.com');
        }
    });
});
// ----------------------------------------------------
// 9. Logo Click - Fancy Reload Animation
// ----------------------------------------------------
document.getElementById('logoBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get the overlay element
    const overlay = document.getElementById('reloadOverlay');
    
    // Show the overlay with animation
    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    
    // Fade in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 50);
    
    // Actually reload the page after animation plays
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 seconds delay for the animation
});
// Get Started Button Alert
document.getElementById('getStartedBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Welcome to Project X!');
});