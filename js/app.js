// search.js

// Fungsi utama pencarian
async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.trim();

    if (!searchValue) {
        alert('Please enter a search term.');
        return;
    }

    // Halaman target untuk pencarian
    const targetPages = ['kelas11.html', 'index.html'];
    const currentPage = getCurrentPage();

    // Jika tidak ada hasil di halaman ini, redirect ke halaman lain
    const results = await searchWordAcrossPages(searchValue, targetPages);

    // Jika hasil ditemukan di halaman lain, redirect
    if (results[currentPage] === 0) {
        for (const [page, count] of Object.entries(results)) {
            if (count > 0 && page !== currentPage) {
                window.location.href = `${page}?search=${encodeURIComponent(searchValue)}`;
                return;
            }
        }
    }

    // Tampilkan hasil pencarian di halaman saat ini
    alert(`The search term "${searchValue}" was found ${results[currentPage]} times on this page.`);
}

// Fungsi untuk menjalankan pencarian otomatis jika ada query string
function handleAutoSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');

    if (searchValue) {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = searchValue; // Set nilai input search
        handleSearch(); // Jalankan pencarian
    }
}

// Fungsi untuk mendeteksi halaman aktif
function getCurrentPage() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
}

// Fungsi pencarian kata di berbagai halaman
async function searchWordAcrossPages(searchValue, pages) {
    const results = {};
    for (const page of pages) {
        const content = await fetchContent(page);
        const text = extractTextFromHTML(content);
        const count = countWordOccurrences(text, searchValue);
        results[page] = count;
    }
    return results;
}

// Fungsi untuk mengambil konten dari halaman lain
async function fetchContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch ${url}:`, response.statusText);
            return '';
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return '';
    }
}

// Fungsi untuk mengekstrak teks murni dari HTML
function extractTextFromHTML(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    return doc.body.textContent || '';
}

// Fungsi untuk menghitung jumlah kata
function countWordOccurrences(content, searchValue) {
    const regex = new RegExp(`\\b${searchValue}\\b`, 'gi');
    const matches = content.match(regex);
    return matches ? matches.length : 0;
}

// Eksekusi otomatis saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    handleAutoSearch(); // Jalankan pencarian otomatis
});
