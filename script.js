document.addEventListener('DOMContentLoaded', function() {
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const element = entry.target;
            // Check if the element is visible AND hasn't been animated yet
            if (entry.isIntersecting && !element.classList.contains('fade-in')) {
                // Apply the final state (animation)
                element.classList.add('fade-in');
                // Stop observing the element once it has been animated
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Select all elements that need animation (use the fade-fade class)
    const animatedElements = document.querySelectorAll('.fade-fade, .skill-card');
    
    animatedElements.forEach(el => {
        // If the element has an inline style delay, we let the CSS handle the initial transition delay
        // Otherwise, we observe it normally.
        observer.observe(el);
    });

    // 2. Special Handling for Initial Hero Load (Ensures elements animate immediately on page load)
    const heroElements = document.querySelectorAll('#hero .fade-fade');
    heroElements.forEach(el => {
        // Force the animation trigger on load
        el.classList.add('fade-in');
    });
});
