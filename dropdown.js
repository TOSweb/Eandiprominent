document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.dropdown-toggle');
    
    toggleButtons.forEach(function (toggleButton) {
        const dropdownContent = toggleButton.nextElementSibling;

        toggleButton.addEventListener('click', function () {
            if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
                dropdownContent.style.display = 'block';
            } else {
                dropdownContent.style.display = 'none';
            }
        });
    });
});
