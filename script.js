document.addEventListener('DOMContentLoaded', () => {
    // Existing logic for stek-list
    const listItems = document.querySelectorAll('.stek-list li');
    const originalFontSize = 20;
    const targetFontSize = 50;
    const backToTopButton = document.querySelector('.back-to-top');

    // Authorization panel elements
    const authButton = document.querySelector('.auth-button');
    const authPanel = document.querySelector('.auth-panel');
    const overlay = document.querySelector('.overlay');
    const closeButton = document.querySelector('.auth-panel__close');

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

    // Authorization panel toggle
    if (authButton && authPanel && overlay && closeButton) {
        authButton.addEventListener('click', () => {
            authPanel.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('panel-open');
        });

        const closePanel = () => {
            authPanel.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('panel-open');
        };

        closeButton.addEventListener('click', closePanel);
        overlay.addEventListener('click', closePanel);
    }

    // Back to Top button handler
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll event for both features
    window.addEventListener('scroll', () => {
        updateStyles();
        toggleBackToTopButton();
    });

    // Initial calls
    updateStyles();
    toggleBackToTopButton();
});