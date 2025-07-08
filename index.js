function Createcard() {
    // Title
    let title = prompt("Enter the title:");
    while (!title || title.trim() === "") {
        title = prompt("❌ Title cannot be empty. Please enter the title:");
    }

    // Image URL (valid if it starts with http/https OR ends with image extension)
    let imageUrl = prompt("Enter the image URL:");
    while (!isValidImageUrl(imageUrl)) {
        imageUrl = prompt("❌ Invalid image URL.\nIt must start with http:// or https:// OR end with .jpg/.png/.webp/.jpeg/.gif");
    }

    // Channel Name
    let cName = prompt("Enter the Channel Name:");
    while (!cName || cName.trim() === "") {
        cName = prompt("❌ Channel name cannot be empty. Please enter the channel name:");
    }

    // Views
    let rawViews = prompt("Enter the View Count (e.g., 1500000):");
    while (isNaN(rawViews) || Number(rawViews) < 0) {
        rawViews = prompt("❌ Invalid number. Enter a valid numeric View Count (e.g., 1500000):");
    }

    // Months Ago
    let monthsOld = prompt("Enter how many months ago it was posted:");
    while (isNaN(monthsOld) || Number(monthsOld) < 0) {
        monthsOld = prompt("❌ Invalid input. Please enter number of months ago:");
    }

    // Duration (mm:ss) — improved validation
    let timeDuration = prompt("Enter the video duration (e.g., 10:45):");
    while (!isValidDuration(timeDuration)) {
        timeDuration = prompt("❌ Invalid duration.\nFormat must be mm:ss and seconds < 60 (e.g., 09:45):");
    }

    // Format views
    let viewsFormatted = formatViews(rawViews);

    // Inject into DOM
    document.getElementsByClassName("title")[0].textContent = title;
    document.getElementsByClassName("thumbnail")[0].src = imageUrl;
    document.getElementsByClassName("cName")[0].textContent = cName + " •";
    document.getElementsByClassName("views")[0].textContent = viewsFormatted + " Views •";
    document.getElementsByClassName("monthOld")[0].textContent = formatMonths(monthsOld);
    document.getElementsByClassName("duration")[0].textContent = timeDuration;
}

// Format views like 1.5M or 240K
function formatViews(views) {
    views = parseInt(views);
    if (views >= 1_000_000) {
        return (views / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (views >= 1_000) {
        return (views / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
        return views.toString();
    }
}

// Valid if starts with http/https OR ends with image extension
function isValidImageUrl(url) {
    return (
        /^https?:\/\//i.test(url) || 
        /\.(jpg|jpeg|png|webp|gif)$/i.test(url)
    );
}

// Validates mm:ss format with seconds < 60
function isValidDuration(input) {
    if (!/^\d{1,2}:\d{2}$/.test(input)) return false;
    const [min, sec] = input.split(':').map(Number);
    return sec < 60;
}

// Converts months to years if needed
function formatMonths(months) {
    months = Number(months);
    if (months < 12) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        let years = (months / 12);
        years = Number.isInteger(years) ? years : years.toFixed(1);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}

// Call Createcard on page load
window.addEventListener("DOMContentLoaded", Createcard);
