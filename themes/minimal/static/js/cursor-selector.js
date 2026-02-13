(function() {
    'use strict';
    
    // Storage keys
    const STORAGE_KEY = 'selectedCursor';
    const SESSION_FLAG = 'cursorSessionActive';
    
    // Check if this is a hard refresh
    function isHardRefresh() {
        return !sessionStorage.getItem(SESSION_FLAG);
    }
    
    // Initialize session flag
    function initSession() {
        sessionStorage.setItem(SESSION_FLAG, 'true');
    }
    
    // Save cursor selection
    function saveCursorSelection(cursorUrl, cursorName) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            url: cursorUrl,
            name: cursorName
        }));
    }
    
    // Load saved cursor selection
    function loadCursorSelection() {
        // Check for hard refresh
        if (isHardRefresh()) {
            // Clear any saved cursor on hard refresh
            localStorage.removeItem(STORAGE_KEY);
            initSession();
            return null;
        }
        
        // Mark session as active
        initSession();
        
        // Load saved cursor
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            // Handle JSON parse errors
            return null;
        }
    }
    
    // Apply cursor from URL
    function applyCursor(cursorUrl) {
        let styleEl = document.getElementById('custom-cursor-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'custom-cursor-style';
            document.head.appendChild(styleEl);
        }
        
        styleEl.textContent = `
            body, body * {
                cursor: url('${cursorUrl}'), auto !important;
            }
        `;
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeCursorSelector();
    });
    
    function initializeCursorSelector() {
        const tray = document.getElementById('cursorSelectorTray');
        const toggleBtn = document.getElementById('cursorSelectorToggle');
        const closeBtn = document.getElementById('cursorSelectorClose');
        const overlay = document.getElementById('cursorSelectorOverlay');
        const cursorOptions = document.querySelectorAll('.cursor-option');
        
        if (!tray || !toggleBtn || !closeBtn || !overlay) {
            return; // Elements not found, skip initialization
        }
        
        // Load and apply saved cursor on page load
        const savedCursor = loadCursorSelection();
        if (savedCursor && savedCursor.url) {
            applyCursor(savedCursor.url);
            
            // Mark the saved cursor as active in the panel
            cursorOptions.forEach(opt => {
                if (opt.dataset.cursor === savedCursor.name) {
                    opt.classList.add('active');
                }
            });
        }
        
        // Open tray
        toggleBtn.addEventListener('click', function() {
            tray.classList.add('open');
        });
        
        // Close tray
        closeBtn.addEventListener('click', function() {
            tray.classList.remove('open');
        });
        
        overlay.addEventListener('click', function() {
            tray.classList.remove('open');
        });
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && tray.classList.contains('open')) {
                tray.classList.remove('open');
            }
        });
        
        // Handle cursor selection
        cursorOptions.forEach(option => {
            option.addEventListener('click', function() {
                const cursorName = this.dataset.cursor;
                const previewImg = this.querySelector('.cursor-preview');
                const cursorUrl = previewImg ? previewImg.src : '';
                
                if (cursorUrl) {
                    // Update active state
                    cursorOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Apply cursor
                    applyCursor(cursorUrl);
                    
                    // Save selection
                    saveCursorSelection(cursorUrl, cursorName);
                }
            });
            
            // Make keyboard accessible
            option.setAttribute('tabindex', '0');
            option.setAttribute('role', 'button');
            
            option.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
})();
