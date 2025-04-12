export function updateProgress(section) {
    const checkboxes = section.querySelectorAll('input[type="checkbox"]');
    const progressBar = section.querySelector('progress');
    const progressPercentage = section.querySelector('.progress-percentage');

    const totalCheckboxes = checkboxes.length;
    const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

    const progressValue = Math.round((checkedCheckboxes / totalCheckboxes) * 100);
    progressBar.value = progressValue;
    progressPercentage.textContent = `${progressValue}%`;
}

export function initializeProgressTracking() {
    const sections = document.querySelectorAll('.roadmap-section, .custom-roadmap-section');

    sections.forEach(section => {
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => updateProgress(section));
        });
    });
}
