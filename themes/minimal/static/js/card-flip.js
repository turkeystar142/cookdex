// Recipe Card Flip Functionality
document.addEventListener('DOMContentLoaded', function() {
    const flipButton = document.getElementById('flip-button');
    const frontSide = document.getElementById('card-front');
    const backSide = document.getElementById('card-back');
    
    if (flipButton && frontSide && backSide) {
        flipButton.addEventListener('click', function() {
            // Toggle active class for instant switch
            frontSide.classList.toggle('active');
            backSide.classList.toggle('active');
            
            // Update button text based on which side is showing
            if (frontSide.classList.contains('active')) {
                flipButton.textContent = '→ Flip for Instructions';
            } else {
                flipButton.textContent = '← Flip for Ingredients';
            }
        });
    }
});
