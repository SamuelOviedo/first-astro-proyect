// src/scripts/main.js
// Scripts principales para la página de inicio

// ============================================
// Header transparency on scroll
// ============================================
const header = document.querySelector('header');
const scrollToTopBtn = document.getElementById('scrollToTop');
let lastScrollY = window.scrollY;

function handleScroll() {
	const currentScrollY = window.scrollY;

	// Header transparency
	if (header) {
		if (currentScrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	}

	// Show/hide scroll to top button
	if (scrollToTopBtn) {
		if (currentScrollY > 300) {
			scrollToTopBtn.style.display = 'block';
			setTimeout(() => {
				scrollToTopBtn.classList.remove('opacity-0', 'translate-y-4');
				scrollToTopBtn.classList.add('opacity-100', 'translate-y-0');
			}, 10);
		} else {
			scrollToTopBtn.classList.remove('opacity-100', 'translate-y-0');
			scrollToTopBtn.classList.add('opacity-0', 'translate-y-4');
			setTimeout(() => {
				scrollToTopBtn.style.display = 'none';
			}, 300);
		}
	}

	lastScrollY = currentScrollY;
}

// ============================================
// Scroll to top functionality
// ============================================
if (scrollToTopBtn) {
	scrollToTopBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

// ============================================
// Mobile Menu functionality
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
let isMenuOpen = false;

function toggleMobileMenu() {
	isMenuOpen = !isMenuOpen;
	
	if (isMenuOpen) {
		// Open menu
		mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
		mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
		document.body.style.overflow = 'hidden';
		
		// Animate hamburger to X
		const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
		lines[0].style.transform = 'rotate(45deg) translateY(6px)';
		lines[1].style.opacity = '0';
		lines[2].style.transform = 'rotate(-45deg) translateY(-6px)';
	} else {
		// Close menu
		mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
		mobileMenu.classList.add('opacity-0', 'pointer-events-none');
		document.body.style.overflow = '';
		
		// Reset hamburger
		const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
		lines[0].style.transform = '';
		lines[1].style.opacity = '';
		lines[2].style.transform = '';
	}
}

if (mobileMenuBtn) {
	mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking on a link
mobileMenuLinks.forEach(link => {
	link.addEventListener('click', () => {
		toggleMobileMenu();
	});
});

// Close menu when clicking outside
if (mobileMenu) {
	mobileMenu.addEventListener('click', (e) => {
		if (e.target === mobileMenu) {
			toggleMobileMenu();
		}
	});
}

// ============================================
// Throttled scroll event listener
// ============================================
let ticking = false;
window.addEventListener('scroll', () => {
	if (!ticking) {
		requestAnimationFrame(() => {
			handleScroll();
			ticking = false;
		});
		ticking = true;
	}
});
