document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.stek-list li'); 
    const originalFontSize = 20; 
    const targetFontSize = 50; 
    const backToTopButton = document.querySelector('.back-to-top');

    const updateStyles = () => {
        const windowHeight = window.innerHeight;
        const centerY = windowHeight / 2;

        listItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterY = rect.top + (rect.height / 2);
            const distanceFromCenter = Math.abs(itemCenterY - centerY);

            const maxDistance = 100;
            const isAtCenter = distanceFromCenter <= maxDistance;

            if (isAtCenter) {

                const scaleFactor = 1 - (distanceFromCenter / maxDistance);
                const newFontSize = originalFontSize + (targetFontSize - originalFontSize) * scaleFactor;

                item.style.fontSize = `${newFontSize}px`;
                item.style.color = '#232DFC'; 
            } else {

                item.style.fontSize = `${originalFontSize}px`;
                item.style.color = '#A7ABFE'; 
            }
        });
    };

    const toggleBackToTopButton = () => {
        if (!backToTopButton) return; 
        if (window.scrollY > 300) { 
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        });
    }


    window.addEventListener('scroll', () => {
        updateStyles();
        toggleBackToTopButton();
    });
    updateStyles();
    toggleBackToTopButton();
});