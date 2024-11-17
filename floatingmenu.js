document.addEventListener('DOMContentLoaded', () => {
    const floatingMenu = document.getElementById('floatingMenu');
    const menuButton = document.getElementById('menuButton');
    const menuContent = document.getElementById('menuContent');

    let isDragging = false;
    let startX = 0, startY = 0;

    // Function to center the menu
    const centerMenu = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Menu dimensions
        const menuWidth = menuContent.offsetWidth || 300; // Fallback for width
        const menuHeight = menuContent.offsetHeight || 200; // Fallback for height

        // Calculate center positions
        const left = (viewportWidth - menuWidth) / 2;
        const top = (viewportHeight - menuHeight) / 2;

        // Apply positions
        menuContent.style.left = `${left}px`;
        menuContent.style.top = `${top}px`;
        menuContent.style.display = 'block';
    };

    // Handle menu toggle with a click
    menuButton.addEventListener('click', () => {
        if (!isDragging) { // Only toggle if it's not a drag
            if (menuContent.style.display === 'block') {
                menuContent.style.display = 'none'; // Close the menu
            } else {
                centerMenu(); // Open and center the menu
            }
        }
    });

    // Dragging functionality for desktop and mobile
    const startDrag = (e) => {
        isDragging = true;
        const event = e.touches ? e.touches[0] : e; // Handle touch or mouse
        startX = event.clientX - floatingMenu.getBoundingClientRect().left;
        startY = event.clientY - floatingMenu.getBoundingClientRect().top;
        floatingMenu.style.cursor = 'grabbing';
        menuContent.style.display = 'none'; // Hide menu during drag
        e.preventDefault(); // Prevent scrolling
    };

    const duringDrag = (e) => {
        if (isDragging) {
            const event = e.touches ? e.touches[0] : e;
            const x = event.clientX - startX;
            const y = event.clientY - startY;

            // Ensure the floating button stays within the viewport
            const maxX = window.innerWidth - floatingMenu.offsetWidth;
            const maxY = window.innerHeight - floatingMenu.offsetHeight;

            floatingMenu.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
            floatingMenu.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
            floatingMenu.style.position = 'fixed';

            e.preventDefault(); // Prevent scrolling
        }
    };

    const endDrag = () => {
        isDragging = false;
        floatingMenu.style.cursor = 'grab';
    };

    // Attach mouse and touch events
    floatingMenu.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', duringDrag);
    window.addEventListener('mouseup', endDrag);

    floatingMenu.addEventListener('touchstart', startDrag);
    window.addEventListener('touchmove', duringDrag);
    window.addEventListener('touchend', endDrag);

    // Close menu when clicking outside
    window.addEventListener('click', (e) => {
        if (!floatingMenu.contains(e.target) && !menuContent.contains(e.target)) {
            menuContent.style.display = 'none'; // Close menu
        }
    });

    // Recenter the menu on window resize (useful for orientation changes)
    window.addEventListener('resize', () => {
        if (menuContent.style.display === 'block') {
            centerMenu();
        }
    });
});
