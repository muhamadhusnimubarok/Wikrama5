<?php
// Cek jika form disubmit
if (isset($_POST['submit'])) {
    // Folder tempat menyimpan gambar
    $targetDir = "img/";

    // Ambil nama file dan path tujuan
    $targetFile = $targetDir . basename($_FILES["imageUpload"]["name"]);
    
    // Cek jika file adalah gambar
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    if (in_array($imageFileType, ['jpg', 'jpeg', 'png', 'gif'])) {
        if (move_uploaded_file($_FILES["imageUpload"]["tmp_name"], $targetFile)) {
            echo "The file " . basename($_FILES["imageUpload"]["name"]) . " has been uploaded.";
            header("Location: index.php"); // Redirect ke halaman utama setelah upload berhasil
            exit();
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    } else {
        echo "Sorry, only JPG, JPEG, PNG, and GIF files are allowed.";
    }
}
?>
