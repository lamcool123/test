// Toggle Sidebar Visibility
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

// Open Search Popup
function openSearchPopup() {
    const popup = document.getElementById('searchPopup');
    popup.style.display = 'block';
}

// Close Search Popup
function closeSearchPopup() {
    const popup = document.getElementById('searchPopup');
    popup.style.display = 'none';
}

// Upload Media Function
function uploadMedia() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput.files.length > 0) {
        alert('File uploaded successfully!');
        // Here you can add code to handle file upload to server or local storage.
    }
}
