import { initializeProgressTracking } from './progress.js';

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

// Toggles the mobile menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
});

// Fetch and populate resources
async function populateResources() {
    const resourcesContainer = document.querySelector('.resources-container');
    if (!resourcesContainer) return;

    try {
        const response = await fetch('data/resources.json');
        const data = await response.json();

        data.categories.forEach(category => {
            const section = document.createElement('section');
            section.classList.add('resource-category');

            section.innerHTML = `
                <h2 class="category-title">${category.title}</h2>
                <ul class="resource-list">
                    ${category.resources.map(resource => `
                        <li><a href="${resource.link}" target="_blank">${resource.name}</a></li>
                    `).join('')}
                </ul>
            `;

            resourcesContainer.appendChild(section);
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}

// Handles custom roadmap creation
function handleCustomRoadmap() {
    const form = document.querySelector('.custom-form form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const roadmapName = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const sections = Array.from(document.querySelectorAll('.custom-section')).map(section => ({
            title: section.querySelector('#section-title').value,
            topics: Array.from(section.querySelectorAll('#topic-title')).map(topic => topic.value)
        }));

        const customRoadmap = { roadmapName, description, sections };

        // Saves to localStorage
        const existingRoadmaps = JSON.parse(localStorage.getItem('customRoadmaps')) || [];
        existingRoadmaps.push(customRoadmap);
        localStorage.setItem('customRoadmaps', JSON.stringify(existingRoadmaps));

        alert('Custom roadmap saved successfully!');
        form.reset();
    });
}

// Populate custom roadmaps from localStorage
function populateCustomRoadmaps() {
    const customRoadmaps = JSON.parse(localStorage.getItem('customRoadmaps')) || [];
    const container = document.querySelector('.custom-roadmaps-container');
    if (!container) return;

    customRoadmaps.forEach(roadmap => {
        const roadmapDiv = document.createElement('div');
        roadmapDiv.classList.add('custom-roadmap');

        roadmapDiv.innerHTML = `
            <h3>${roadmap.roadmapName}</h3>
            <p>${roadmap.description}</p>
            ${roadmap.sections.map(section => `
                <div>
                    <h4>${section.title}</h4>
                    <ul>
                        ${section.topics.map(topic => `<li>${topic}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        `;

        container.appendChild(roadmapDiv);
    });
}

// Search functionality for resources
function initializeResourceSearch() {
    const searchInput = document.getElementById('resource-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const resourceCategories = document.querySelectorAll('.resource-category');

        resourceCategories.forEach(category => {
            const resources = category.querySelectorAll('.resource-list li');
            let hasVisibleResource = false;

            resources.forEach(resource => {
                const text = resource.textContent.toLowerCase();
                const isVisible = text.includes(query);
                resource.style.display = isVisible ? '' : 'none';
                if (isVisible) hasVisibleResource = true;
            });

            category.style.display = hasVisibleResource ? '' : 'none';
        });
    });
}

// Dark mode toggle
function initializeDarkModeToggle() {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) body.classList.add('dark-mode');

    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });
}

// Saves progress to localStorage
function saveProgressToLocalStorage() {
    const sections = document.querySelectorAll('.roadmap-section, .custom-roadmap-section');
    const progressData = {};

    sections.forEach((section, index) => {
        const progressBar = section.querySelector('progress');
        progressData[`section-${index}`] = progressBar.value;
    });

    localStorage.setItem('roadmapProgress', JSON.stringify(progressData));
}

// This function loads progress from localStorage
function loadProgressFromLocalStorage() {
    const progressData = JSON.parse(localStorage.getItem('roadmapProgress')) || {};
    const sections = document.querySelectorAll('.roadmap-section, .custom-roadmap-section');

    sections.forEach((section, index) => {
        const progressBar = section.querySelector('progress');
        const progressPercentage = section.querySelector('.progress-percentage');
        const savedValue = progressData[`section-${index}`] || 0;

        progressBar.value = savedValue;
        progressPercentage.textContent = `${savedValue}%`;
    });
}

// This initializes functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    populateResources();
    handleCustomRoadmap();
    populateCustomRoadmaps();
    initializeProgressTracking();
    initializeResourceSearch();
    initializeDarkModeToggle();
    loadProgressFromLocalStorage();

    // Saves progress on checkbox change
    document.addEventListener('change', saveProgressToLocalStorage);
});