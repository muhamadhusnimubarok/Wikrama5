// Fungsionalitas untuk toggle antara gallery dan tiles
const toggle = document.getElementById('toggle');
const galleryView = document.getElementById('galleryView');
const tilesView = document.getElementById('tilesView');

toggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        galleryView.style.display = 'block';
        tilesView.style.display = 'none';
    } else {
        galleryView.style.display = 'none';
        tilesView.style.display = 'block';
    }
});

// Menambahkan navigasi galeri
const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
const mainView = document.getElementById('mainView');
let currentIndex = 0;
const certificates = <?php echo json_encode($certificates); ?>;

function updateGallery() {
    if (certificates.length > 0) {
        mainView.innerHTML = `<img src="${certificates[currentIndex]}" alt="Certificate" />`;
    }
}

navLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
    }
});

navRight.addEventListener('click', () => {
    if (currentIndex < certificates.length - 1) {
        currentIndex++;
        updateGallery();
    }
});

// Inisialisasi galeri pertama kali
if (certificates.length > 0) {
    updateGallery();
}
