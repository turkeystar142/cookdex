(function() {
    'use strict';
    
    // State management
    const state = {
        activeCategory: 'all',
        activeTags: new Set(),
        searchQuery: ''
    };
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeTray();
        initializeFilters();
        initializeSearch();
    });
    
    function initializeTray() {
        const tray = document.getElementById('filterTray');
        const toggleBtn = document.getElementById('filterToggle');
        const closeBtn = document.getElementById('filterTrayClose');
        const overlay = document.getElementById('filterTrayOverlay');
        
        if (!tray || !toggleBtn || !closeBtn || !overlay) {
            return; // Elements not found, skip initialization
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
    }
    
    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
    }
    
    function initializeSearch() {
        const searchInput = document.getElementById('recipeSearch');
        
        if (!searchInput) {
            return;
        }
        
        searchInput.addEventListener('input', function(e) {
            state.searchQuery = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }
    
    function handleFilterClick(event) {
        const button = event.currentTarget;
        const filterType = button.dataset.filterType;
        const filterValue = button.dataset.filterValue;
        
        if (filterType === 'category') {
            handleCategoryFilter(button, filterValue);
        } else if (filterType === 'tag') {
            handleTagFilter(button, filterValue);
        }
        
        applyFilters();
    }
    
    function handleCategoryFilter(button, value) {
        // Remove active class from all category buttons
        const categoryButtons = document.querySelectorAll('[data-filter-type="category"]');
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        
        // Update state
        state.activeCategory = value;
    }
    
    function handleTagFilter(button, value) {
        // Toggle tag filter
        if (state.activeTags.has(value)) {
            state.activeTags.delete(value);
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        } else {
            state.activeTags.add(value);
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
        }
    }
    
    function applyFilters() {
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        recipeCards.forEach(card => {
            const shouldShow = cardMatchesFilters(card);
            card.style.display = shouldShow ? '' : 'none';
        });
    }
    
    function cardMatchesFilters(card) {
        const cardCategories = (card.dataset.categories || '').split(',').filter(Boolean);
        const cardTags = (card.dataset.tags || '').split(',').filter(Boolean);
        
        // Check search query against title
        if (state.searchQuery) {
            const cardTitle = card.querySelector('.recipe-card-title');
            const titleText = cardTitle ? cardTitle.textContent.toLowerCase() : '';
            
            if (!titleText.includes(state.searchQuery)) {
                return false;
            }
        }
        
        // Check category filter
        const categoryMatch = state.activeCategory === 'all' || 
                             cardCategories.includes(state.activeCategory);
        
        if (!categoryMatch) {
            return false;
        }
        
        // Check tag filters (all active tags must be present - AND logic)
        if (state.activeTags.size > 0) {
            const allTagsMatch = Array.from(state.activeTags).every(tag => 
                cardTags.includes(tag)
            );
            
            if (!allTagsMatch) {
                return false;
            }
        }
        
        return true;
    }
})();
