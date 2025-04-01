// Customization logic

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        backgroundColor: params.get("backgroundColor"),
        textColor: params.get("textColor"),
        fontSize: params.get("fontSize")
    };
}

function setCookies(prefs) {
    const days = 7;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    for (const key in prefs) {
        if (prefs[key]) {
            document.cookie = `${key}=${prefs[key]}; expires=${expires}; path=/`;
        }
    }
}

function getCookies() {
    const cookies = document.cookie.split("; ").reduce((acc, pair) => {
        const [key, value] = pair.split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
    }, {});
    return {
        backgroundColor: cookies.backgroundColor,
        textColor: cookies.textColor,
        fontSize: cookies.fontSize
    };
}

function applyPreferences(prefs) {
    if (prefs.backgroundColor) {
        document.body.style.backgroundColor = prefs.backgroundColor;
    }
    if (prefs.textColor) {
        document.body.style.color = prefs.textColor;
    }
    if (prefs.fontSize) {
        document.body.style.fontSize = prefs.fontSize;
    }
}

function saveAndRedirect(event) {
    event.preventDefault();
    const form = event.target;
    const prefs = {
        backgroundColor: form.backgroundColor.value,
        textColor: form.textColor.value,
        fontSize: form.fontSize.value
    };
    const queryString = new URLSearchParams(prefs).toString();
    window.location.search = queryString;
}

function init() {
    const queryPrefs = getQueryParams();
    if (queryPrefs.backgroundColor || queryPrefs.textColor || queryPrefs.fontSize) {
        applyPreferences(queryPrefs);
        setCookies(queryPrefs);
    } else {
        const cookiePrefs = getCookies();
        applyPreferences(cookiePrefs);
    }

    const form = document.getElementById("customizationForm");
    if (form) {
        form.addEventListener("submit", saveAndRedirect);
    }
}

// Additional feature: Change welcome text
function changeText() {
    const text = document.getElementById("welcome-text");
    text.textContent = "God bless you and your family!";
}

// Reset function: removes cookies, resets styles, and reloads the page
function resetPreferences() {
    // Delete cookies
    document.cookie = "backgroundColor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "textColor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "fontSize=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Reset styles
    document.body.style = "";

    // Reload page without query string
    window.location.href = window.location.pathname;
}

// Attach event listener to Reset button
document.addEventListener("DOMContentLoaded", () => {
    init(); // existing function to apply saved preferences

    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetPreferences);
    }
});


document.addEventListener("DOMContentLoaded", init);
