let openMenuButton = document.getElementById('open-menu-button');
let closeMenuButton = document.getElementById('close-menu-button');
let sidebar = document.getElementById('sidebar');

openMenuButton.addEventListener('click', function() {
    sidebar.classList.remove('hidden');
})

closeMenuButton.addEventListener('click', function() {
    sidebar.classList.add('hidden');
})