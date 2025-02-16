document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");
    const images = document.querySelectorAll(".lightbox-trigger");

    images.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxcwqo6bm/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "dykteri";

document.getElementById("upload-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    const fileInput = document.getElementById("file-input");
    if (fileInput.files.length === 0) {
        alert("Выберите фото!");
        return;
    }

    const file = fileInput.files[0]; // Берем первый файл
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Ошибка загрузки");

        const data = await response.json();
        console.log("Фото загружено:", data.secure_url);

        // Добавляем фото в галерею
        const img = document.createElement("img");
        img.src = data.secure_url;
        img.classList.add("lightbox-trigger");
        document.querySelector(".gallery").appendChild(img);

    } catch (error) {
        console.error("Ошибка:", error);
    }
});
