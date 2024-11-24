// Data mapping for each student - replace with actual URLs for each student page
const students = [
    { name: "Chu Tùng Lâm", birthdate: "2009-12-21", url: "student1.html" },
    { name: "Student 2", birthdate: "2008-02-02", url: "student2.html" },
    // ... Continue for all 48 students
    { name: "Student 48", birthdate: "2008-12-31", url: "student48.html" }
];

// Function to show the Tìm học sinh form
function showSearchForm() {
    document.getElementById('searchForm').style.display = 'block';
}

// Handle the student search by birthdate
document.getElementById('searchStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const birthdate = document.getElementById('searchBirthdate').value;

    if (!birthdate) {
        document.getElementById('searchErrorMessage').textContent = "Ngày tháng năm sinh là bắt buộc.";
        document.getElementById('searchErrorMessage').style.display = 'block';
    } else {
        document.getElementById('searchErrorMessage').style.display = 'none';

        // Check if the birthdate matches any student's data
        const student = students.find(s => s.birthdate === birthdate);
        if (student) {
            // Redirect to the student's page
            window.location.href = student.url;
        } else {
            // Show an error if no match is found
            alert("Học sinh không tồn tại trong lớp.");
        }
    }
});

// Function to open the Tìm Học Sinh popup
function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'flex';
}

// Function to close the Tìm Học Sinh popup
function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
    document.getElementById('searchErrorMessage').style.display = 'none'; // Clear any previous error message
}

// Function to search for a student based on birthdate input
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    const searchErrorMessage = document.getElementById('searchErrorMessage');

    if (!birthdate) {
        searchErrorMessage.textContent = "Vui lòng nhập ngày tháng năm sinh.";
        searchErrorMessage.style.display = 'block';
        return;
    }

    // Specific check for Chu Tùng Lâm
    if (birthdate === "2009-12-21") {
        window.location.href = "student1.html"; // Adjust the URL if necessary
        return;
    }

    let studentFound = false;
    for (let i = 1; i <= 48; i++) {
        if (birthdate === `2007-0${i}`) {  // Replace this condition with actual date matching logic
            window.location.href = `student${i}.html`;
            studentFound = true;
            break;
        }
    }

    if (!studentFound) {
        searchErrorMessage.textContent = "Học sinh không tồn tại.";
        searchErrorMessage.style.display = 'block';
    }
}
// Function to open the search popup
function openSearchPopup() {
    const searchPopup = document.getElementById('searchPopup');
    searchPopup.style.display = 'flex'; // Show the popup
}

// Function to close the search popup
function closeSearchPopup() {
    const searchPopup = document.getElementById('searchPopup');
    searchPopup.style.display = 'none'; // Hide the popup
}

// Function to search for a student based on birthdate
function searchStudent() {
    const birthdateInput = document.getElementById('birthdate').value;
    const searchErrorMessage = document.getElementById('searchErrorMessage');

    // Check if the entered date is 21-12-2009
    if (birthdateInput === '2009-12-21') {
        // Redirect to the student information page if the date matches
        window.location.href = 'student_info.html';
    } else {
        // Display an error message if the date does not match
        searchErrorMessage.textContent = 'Không tìm thấy học sinh với ngày sinh này!';
        searchErrorMessage.style.display = 'block';
    }
}

// Close the popup if clicking outside of it
window.onclick = function(event) {
    const searchPopup = document.getElementById('searchPopup');
    if (event.target === searchPopup) {
        searchPopup.style.display = 'none';
    }
}
// Function to search for a student based on birthdate
function searchStudent() {
    const birthdateInput = document.getElementById('birthdate').value;
    const searchErrorMessage = document.getElementById('searchErrorMessage');

    // Check if the entered date is 21-12-2009
    if (birthdateInput === '2009-12-21') {
        // Save birthdate to local storage
        localStorage.setItem('studentBirthdate', birthdateInput);
        
        // Redirect to the student information page if the date matches
        window.location.href = 'student_info.html';
    } else {
        // Display an error message if the date does not match
        searchErrorMessage.textContent = 'Không tìm thấy học sinh với ngày sinh này!';
        searchErrorMessage.style.display = 'block';
    }
}
// script.js

// Function to handle file uploads and display media
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileUpload');
    const gallery = document.querySelector('.gallery');
    let mediaItems = JSON.parse(localStorage.getItem('mediaItems')) || [];

    // Function to display media items in the gallery
    function displayMedia() {
        gallery.innerHTML = ''; // Clear the gallery
        mediaItems.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

        mediaItems.forEach(item => {
            const mediaContainer = document.createElement('div');
            mediaContainer.classList.add('gallery-item');

            if (item.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = item.src;
                mediaContainer.appendChild(img);
            } else if (item.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = item.src;
                video.controls = true;
                mediaContainer.appendChild(video);
            }

            gallery.appendChild(mediaContainer);
        });
    }

    // Function to save media items to local storage
    function saveToLocalStorage() {
        localStorage.setItem('mediaItems', JSON.stringify(mediaItems));
    }

    // Handle file input change
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newMediaItem = {
                    src: e.target.result,
                    type: file.type,
                    date: new Date().toISOString() // Capture the date of upload
                };

                mediaItems.push(newMediaItem); // Add to mediaItems array
                saveToLocalStorage(); // Save to local storage
                displayMedia(); // Refresh the gallery
            };
            reader.readAsDataURL(file); // Read file as a data URL
        }
    });

    // Initial display of media items
    displayMedia();
});
// script.js

// Function to toggle the sidebar
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');

    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
}

// Your existing JavaScript code for image uploads and other functionalities goes here...
// Function to handle media upload and display
function uploadMedia() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        // Read the file as a data URL
        reader.onload = function (e) {
            const mediaData = e.target.result;
            const mediaType = file.type.startsWith('image') ? 'image' : 'video';

            // Save to localStorage
            saveMediaToLocalStorage(mediaData, mediaType);

            // Display the uploaded media
            displayMedia(mediaData, mediaType);
        };

        reader.readAsDataURL(file);
    }
}

// Function to save media to localStorage
function saveMediaToLocalStorage(mediaData, mediaType) {
    // Retrieve existing media array or initialize a new one
    const mediaArray = JSON.parse(localStorage.getItem('mediaGallery')) || [];

    // Add the new media to the array
    mediaArray.push({ type: mediaType, data: mediaData, timestamp: new Date().toISOString() });

    // Save updated array back to localStorage
    localStorage.setItem('mediaGallery', JSON.stringify(mediaArray));
}

// Function to display uploaded media from localStorage
function displayMedia(mediaData, mediaType) {
    const gallery = document.querySelector('.gallery');

    // Create media element
    const mediaItem = document.createElement('div');
    mediaItem.className = 'gallery-item';

    if (mediaType === 'image') {
        const img = document.createElement('img');
        img.src = mediaData;
        img.alt = 'Uploaded Image';
        img.style.maxWidth = '100%';
        mediaItem.appendChild(img);
    } else if (mediaType === 'video') {
        const video = document.createElement('video');
        video.src = mediaData;
        video.controls = true;
        video.style.maxWidth = '100%';
        mediaItem.appendChild(video);
    }

    // Add the media item to the gallery
    gallery.appendChild(mediaItem);
}

// Function to load all saved media from localStorage on page load
function loadMediaFromLocalStorage() {
    const mediaArray = JSON.parse(localStorage.getItem('mediaGallery')) || [];

    // Sort media by timestamp
    mediaArray.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Display each media item
    mediaArray.forEach(media => {
        displayMedia(media.data, media.type);
    });
}

// Load media when the page is loaded
window.onload = loadMediaFromLocalStorage;
// JavaScript for Collapsible Sidebar Navbar
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('collapsed');
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}

function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-12-21") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}

function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-12-23") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
// Toggle Sidebar Navigation
function toggleSidebar() {
    var navbar = document.getElementById("navbar");
    navbar.style.display = (navbar.style.display === "none" || navbar.style.display === "") ? "flex" : "none";
}

// Open Student Search Popup
function openSearchPopup() {
    var popup = document.getElementById("searchPopup");
    popup.style.display = "flex";
}

// Close Student Search Popup
function closeSearchPopup() {
    var popup = document.getElementById("searchPopup");
    popup.style.display = "none";
}

// Handle Media Upload (Image/Video)
function uploadMedia() {
    var fileUpload = document.getElementById("fileUpload");
    var gallery = document.querySelector(".gallery");
    
    var file = fileUpload.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var mediaElement;
            if (file.type.startsWith("image")) {
                mediaElement = document.createElement("img");
                mediaElement.src = e.target.result;
            } else if (file.type.startsWith("video")) {
                mediaElement = document.createElement("video");
                mediaElement.src = e.target.result;
                mediaElement.controls = true;
            }
            gallery.appendChild(mediaElement);
        }
        reader.readAsDataURL(file);
    }
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-02-02") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-03-13") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-07-08") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-11-24") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-10-15") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-11-04") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-04-12") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-07-08") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-10-08") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-06-26") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-06-06") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-05-26") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-08-14") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-09-29") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-11-20") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-12-10") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-08-02") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-07-23") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-04-12") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-04-07") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-10-12") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-03-05") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-09-26") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-04-04") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-06-05") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-07-22") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-04-30") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-10-15") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-03-23") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-04-20") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-11-20") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-03-02") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-08-23") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-11-27") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-09-21") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-07-12") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-12-09") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-03-21") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-09-17") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-07-10") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-09-05") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-05-06") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-07-18") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-05-26") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-06-26") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === "2009-05-09") {
        window.location.href = "student_info.html"; // Example navigation to the student page
    } else {
        document.getElementById('searchErrorMessage').innerText = "Không tìm thấy học sinh!";
    }
}
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    navbar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function openSearchPopup() {
    document.getElementById('searchPopup').style.display = 'block';
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}
// Toggle Sidebar Visibility
function toggleSidebar() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

// Open Search Popup
function openSearchPopup() {
    const popup = document.getElementById('searchPopup');
    popup.style.display = 'flex';  // Changed to 'flex' to center the popup properly
}

// Close Search Popup
function closeSearchPopup() {
    const popup = document.getElementById('searchPopup');
    popup.style.display = 'none';
}

// Search Student Function (dummy implementation)
function searchStudent() {
    const birthdate = document.getElementById('birthdate').value;
    // Implement search logic here
    alert(`Tìm học sinh với ngày sinh: ${birthdate}`);
}
