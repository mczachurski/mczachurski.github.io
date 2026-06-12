const VERNISSAGE_API_URL = "https://vernissage.photos/api/v1/users/@mczachurski/statuses";
const THEME_STORAGE_KEY = "mczachurski.dev.theme";

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
        document.documentElement.dataset.theme = savedTheme;
    }

    document.querySelectorAll(".theme-toggle").forEach(button => {
        updateThemeButton(button);
        button.addEventListener("click", () => {
            const currentTheme = getEffectiveTheme();
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.dataset.theme = nextTheme;
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            document.querySelectorAll(".theme-toggle").forEach(updateThemeButton);
        });
    });
}

function getEffectiveTheme() {
    const explicitTheme = document.documentElement.dataset.theme;
    if (explicitTheme === "light" || explicitTheme === "dark") {
        return explicitTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeButton(button) {
    const nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    button.title = `Switch to ${nextTheme} theme`;
}

async function initPhotoGalleries() {
    const galleries = Array.from(document.querySelectorAll("[data-photo-gallery]"));
    if (galleries.length === 0) {
        return;
    }

    let remotePhotos = null;

    await Promise.all(galleries.map(async gallery => {
        const limit = Number.parseInt(gallery.dataset.limit || "80", 10);
        const status = findGalleryStatus(gallery);
        setStatus(status, "Loading latest photos...");

        try {
            if (!remotePhotos) {
                remotePhotos = await fetchVernissagePhotos();
            }

            const photos = remotePhotos.slice(0, limit);
            renderPhotoGrid(gallery, photos);
            setStatus(status, `${photos.length} latest photos from Vernissage.`);
        } catch (error) {
            console.error(error);
            gallery.replaceChildren();
            setStatus(status, "The live Vernissage feed could not be loaded.");
        }
    }));
}

function findGalleryStatus(gallery) {
    const section = gallery.closest("section");
    return section ? section.querySelector("[data-gallery-status]") : null;
}

function setStatus(element, message) {
    if (element) {
        element.textContent = message;
    }
}

async function fetchVernissagePhotos() {
    const firstPage = await fetchVernissageStatuses();
    const lastStatus = firstPage[firstPage.length - 1];
    const secondPage = lastStatus && lastStatus.id ? await fetchVernissageStatuses(lastStatus.id) : [];
    const statuses = [...firstPage, ...secondPage];
    const photos = statuses.flatMap(status => extractStatusPhotos(status));
    const uniquePhotos = deduplicatePhotos(photos);

    if (uniquePhotos.length === 0) {
        throw new Error("Vernissage API did not return photos.");
    }

    return uniquePhotos;
}

async function fetchVernissageStatuses(maxId) {
    const url = new URL(VERNISSAGE_API_URL);
    if (maxId) {
        url.searchParams.set("maxId", maxId);
    }

    const response = await fetch(url, {
        headers: { Accept: "application/json" }
    });

    if (!response.ok) {
        throw new Error(`Vernissage API responded with ${response.status}`);
    }

    const payload = await response.json();
    return Array.isArray(payload.data) ? payload.data : [];
}

function deduplicatePhotos(photos) {
    const seen = new Set();
    return photos.filter(photo => {
        const key = photo.full || photo.thumb;
        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

function extractStatusPhotos(status) {
    const attachments = Array.isArray(status.attachments) ? status.attachments : [];
    return attachments
        .filter(attachment => attachment && attachment.smallFile && attachment.originalFile)
        .map((attachment, index) => {
            const title = createPhotoTitle(status, index);
            const date = status.createdAt ? formatPhotoDate(status.createdAt) : "";
            return {
                title,
                date,
                thumb: attachment.smallFile.url,
                full: attachment.originalFile.url,
                width: attachment.smallFile.width || attachment.originalFile.width,
                height: attachment.smallFile.height || attachment.originalFile.height,
                alt: attachment.description || title,
                url: status.activityPubUrl || "https://vernissage.photos/@mczachurski"
            };
        });
}

function createPhotoTitle(status, index) {
    const text = stripTags(status.note || "").trim();
    if (text) {
        return text.length > 80 ? `${text.slice(0, 77)}...` : text;
    }

    const date = status.createdAt ? formatPhotoDate(status.createdAt) : "Vernissage photo";
    return index === 0 ? date : `${date}, photo ${index + 1}`;
}

function stripTags(text) {
    return text
        .replace(/https?:\/\/\S+/g, "")
        .replace(/#[\p{L}\p{N}_-]+/gu, "")
        .replace(/\s+/g, " ");
}

function formatPhotoDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric"
    }).format(date);
}

function renderPhotoGrid(gallery, photos) {
    gallery.replaceChildren(...photos.map(photo => createPhotoTile(photo)));
}

function createPhotoTile(photo) {
    const button = document.createElement("button");
    button.className = "photo-tile";
    button.type = "button";
    button.dataset.full = photo.full;
    button.dataset.title = photo.title;
    button.dataset.date = photo.date || "";
    button.dataset.url = photo.url;
    button.setAttribute("aria-label", `Open photo: ${photo.title}`);

    const image = document.createElement("img");
    image.src = photo.thumb;
    image.width = photo.width || 800;
    image.height = photo.height || 533;
    image.alt = photo.alt || photo.title;
    image.loading = "lazy";
    image.decoding = "async";

    button.append(image);
    button.addEventListener("click", () => openPhotoDialog(photo));

    return button;
}

function initPhotoDialog() {
    const dialog = document.querySelector("[data-photo-dialog]");
    if (!dialog) {
        return;
    }

    dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}

function openPhotoDialog(photo) {
    const dialog = document.querySelector("[data-photo-dialog]");
    if (!dialog) {
        window.open(photo.full, "_blank", "noopener");
        return;
    }

    const image = dialog.querySelector("[data-dialog-image]");
    const caption = dialog.querySelector("[data-dialog-caption]");
    const link = dialog.querySelector("[data-dialog-link]");

    image.src = photo.full;
    image.alt = photo.alt || photo.title;
    caption.textContent = photo.date ? `${photo.title} - ${photo.date}` : photo.title;
    link.href = photo.url;

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        window.open(photo.full, "_blank", "noopener");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initPhotoDialog();
    initPhotoGalleries();
});
