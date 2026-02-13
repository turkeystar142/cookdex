(function() {
    'use strict';
    
    // Storage keys
    const STORAGE_KEY = 'selectedLanguage';
    const SESSION_FLAG = 'languageSessionActive';
    
    // Check if this is a hard refresh
    function isHardRefresh() {
        return !sessionStorage.getItem(SESSION_FLAG);
    }
    
    // Initialize session flag
    function initSession() {
        sessionStorage.setItem(SESSION_FLAG, 'true');
    }
    
    // Save language selection
    function saveLanguageSelection(lang) {
        localStorage.setItem(STORAGE_KEY, lang);
    }
    
    // Load saved language selection
    function loadLanguageSelection() {
        // Check for hard refresh
        if (isHardRefresh()) {
            // Clear any saved language on hard refresh
            localStorage.removeItem(STORAGE_KEY);
            initSession();
            return null;
        }
        
        // Mark session as active
        initSession();
        
        // Load saved language
        return localStorage.getItem(STORAGE_KEY);
    }
    
    // Get current page language from HTML lang attribute
    function getCurrentLanguage() {
        return document.documentElement.lang || 'en';
    }
    
    // Transform URL to target language
    function getLanguageUrl(targetLang) {
        let path = window.location.pathname;

        if (path.startsWith('/')) {
            path = path.substring(1);
        }
        
        // Remove existing language prefix
        if (path.startsWith('es/') || path.startsWith('en/')) {
            path = path.substring(3);
        }

        if (targetLang === 'en' || targetLang === 'en-us') {
            return '/' + path;
        } else {
            return '/' + targetLang + '/' + path;
        }
    }
    
    // Auto-redirect to saved language if different from current
    function autoRedirect() {
        const savedLang = loadLanguageSelection();
        
        if (!savedLang) {
            return; // No saved preference
        }
        
        const currentLang = getCurrentLanguage();
        
        // Normalize language codes for comparison
        const normalizedSaved = savedLang.split('-')[0]; // 'en-us' -> 'en'
        const normalizedCurrent = currentLang.split('-')[0];
        
        if (normalizedSaved !== normalizedCurrent) {
            // Language preference differs from current page
            const targetUrl = getLanguageUrl(normalizedSaved);
            window.location.href = targetUrl;
        }
    }
    
    // Initialize language persistence
    function initializeLanguagePersistence() {
        // Auto-redirect on page load if needed
        autoRedirect();
        
        // Set up click handlers for language links
        const languageLinks = document.querySelectorAll('.language-link');
        
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetLang = this.getAttribute('data-lang');
                
                if (targetLang) {
                    // Save the selected language
                    saveLanguageSelection(targetLang);
                    // Browser will navigate via the link's href
                }
            });
        });
    }
    
    // Run auto-redirect immediately (before DOM ready)
    autoRedirect();
    
    // Initialize handlers when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeLanguagePersistence();
    });
})();
