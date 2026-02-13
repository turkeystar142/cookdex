(function() {
    'use strict';
    
    // Storage keys
    const STORAGE_KEY = 'ginghamSettings';
    const SESSION_FLAG = 'ginghamSessionActive';
    
    // Default values
    const DEFAULTS = {
        color: { r: 180, g: 80, b: 70 },
        opacity: 15,
        thickness: 20
    };
    
    // Check if this is a hard refresh
    function isHardRefresh() {
        return !sessionStorage.getItem(SESSION_FLAG);
    }
    
    // Initialize session flag
    function initSession() {
        sessionStorage.setItem(SESSION_FLAG, 'true');
    }
    
    // Save gingham settings
    function saveGinghamSettings(color, opacity, thickness) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            color: color,
            opacity: opacity,
            thickness: thickness
        }));
    }
    
    // Load saved gingham settings
    function loadGinghamSettings() {
        // Check for hard refresh
        if (isHardRefresh()) {
            // Clear any saved settings on hard refresh
            localStorage.removeItem(STORAGE_KEY);
            initSession();
            return null;
        }
        
        // Mark session as active
        initSession();
        
        // Load saved settings
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            // Handle JSON parse errors
            return null;
        }
    }
    
    // Convert hex color to RGB object
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    // Convert RGB object to hex color
    function rgbToHex(rgb) {
        return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
    }
    
    // Apply gingham pattern to the page
    function applyGinghamPattern(color, opacity, thickness) {
        const opacityDecimal = opacity / 100;
        const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacityDecimal})`;
        
        // Update CSS custom properties
        document.documentElement.style.setProperty('--gingham-red', rgbaColor);
        document.documentElement.style.setProperty('--gingham-thickness', `${thickness}px`);
    }
    
    // Update preview swatch
    function updatePreview(color, opacity, thickness) {
        const previewSwatch = document.getElementById('ginghamPreviewSwatch');
        if (!previewSwatch) return;
        
        const opacityDecimal = opacity / 100;
        const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacityDecimal})`;
        
        previewSwatch.style.backgroundImage = `
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent ${thickness}px,
                ${rgbaColor} ${thickness}px,
                ${rgbaColor} ${thickness * 2}px
            ),
            repeating-linear-gradient(
                90deg,
                transparent,
                transparent ${thickness}px,
                ${rgbaColor} ${thickness}px,
                ${rgbaColor} ${thickness * 2}px
            )
        `;
    }
    
    // Update UI controls with current settings
    function updateControls(color, opacity, thickness) {
        const colorInput = document.getElementById('ginghamColorInput');
        const opacityInput = document.getElementById('ginghamOpacityInput');
        const thicknessInput = document.getElementById('ginghamThicknessInput');
        const opacityValue = document.getElementById('ginghamOpacityValue');
        const thicknessValue = document.getElementById('ginghamThicknessValue');
        
        if (colorInput) colorInput.value = rgbToHex(color);
        if (opacityInput) opacityInput.value = opacity;
        if (thicknessInput) thicknessInput.value = thickness;
        if (opacityValue) opacityValue.textContent = `${opacity}%`;
        if (thicknessValue) thicknessValue.textContent = `${thickness}px`;
        
        updatePreview(color, opacity, thickness);
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeGinghamCustomizer();
    });
    
    function initializeGinghamCustomizer() {
        const tray = document.getElementById('ginghamCustomizerTray');
        const toggleBtn = document.getElementById('ginghamCustomizerToggle');
        const closeBtn = document.getElementById('ginghamCustomizerClose');
        const overlay = document.getElementById('ginghamCustomizerOverlay');
        const colorInput = document.getElementById('ginghamColorInput');
        const opacityInput = document.getElementById('ginghamOpacityInput');
        const thicknessInput = document.getElementById('ginghamThicknessInput');
        const resetBtn = document.getElementById('ginghamResetBtn');
        
        if (!tray || !toggleBtn || !closeBtn || !overlay) {
            return; // Elements not found, skip initialization
        }
        
        // Current settings
        let currentColor = { ...DEFAULTS.color };
        let currentOpacity = DEFAULTS.opacity;
        let currentThickness = DEFAULTS.thickness;
        
        // Load and apply saved settings on page load
        const savedSettings = loadGinghamSettings();
        if (savedSettings) {
            currentColor = savedSettings.color;
            currentOpacity = savedSettings.opacity;
            currentThickness = savedSettings.thickness;
            applyGinghamPattern(currentColor, currentOpacity, currentThickness);
        }
        
        // Update controls to reflect current settings
        updateControls(currentColor, currentOpacity, currentThickness);
        
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
        
        // Color input change
        if (colorInput) {
            colorInput.addEventListener('input', function() {
                const rgb = hexToRgb(this.value);
                if (rgb) {
                    currentColor = rgb;
                    applyGinghamPattern(currentColor, currentOpacity, currentThickness);
                    updatePreview(currentColor, currentOpacity, currentThickness);
                    saveGinghamSettings(currentColor, currentOpacity, currentThickness);
                }
            });
        }
        
        // Opacity input change
        if (opacityInput) {
            opacityInput.addEventListener('input', function() {
                currentOpacity = parseInt(this.value, 10);
                const opacityValue = document.getElementById('ginghamOpacityValue');
                if (opacityValue) opacityValue.textContent = `${currentOpacity}%`;
                applyGinghamPattern(currentColor, currentOpacity, currentThickness);
                updatePreview(currentColor, currentOpacity, currentThickness);
                saveGinghamSettings(currentColor, currentOpacity, currentThickness);
            });
        }
        
        // Thickness input change
        if (thicknessInput) {
            thicknessInput.addEventListener('input', function() {
                currentThickness = parseInt(this.value, 10);
                const thicknessValue = document.getElementById('ginghamThicknessValue');
                if (thicknessValue) thicknessValue.textContent = `${currentThickness}px`;
                applyGinghamPattern(currentColor, currentOpacity, currentThickness);
                updatePreview(currentColor, currentOpacity, currentThickness);
                saveGinghamSettings(currentColor, currentOpacity, currentThickness);
            });
        }
        
        // Reset button
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                currentColor = { ...DEFAULTS.color };
                currentOpacity = DEFAULTS.opacity;
                currentThickness = DEFAULTS.thickness;
                
                applyGinghamPattern(currentColor, currentOpacity, currentThickness);
                updateControls(currentColor, currentOpacity, currentThickness);
                localStorage.removeItem(STORAGE_KEY);
            });
        }
    }
})();
