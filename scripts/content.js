const tartagliaImages = [
    chrome.runtime.getURL("assets/tar-01.png"),
    chrome.runtime.getURL("assets/tar-02.png"),
    chrome.runtime.getURL("assets/tar-03.png"),
    chrome.runtime.getURL("assets/tar-04.png"),
    chrome.runtime.getURL("assets/tar-05.png"),
    chrome.runtime.getURL("assets/tar-06.png"),
    chrome.runtime.getURL("assets/tar-07.png"),
    chrome.runtime.getURL("assets/tar-08.png"),
    chrome.runtime.getURL("assets/tar-09.png"),
    chrome.runtime.getURL("assets/tar-10.png"),
    chrome.runtime.getURL("assets/tar-11.png"),
    chrome.runtime.getURL("assets/tar-12.png"),
    chrome.runtime.getURL("assets/tar-13.png"),
    chrome.runtime.getURL("assets/tar-14.png"),
    chrome.runtime.getURL("assets/tar-15.png"),
    chrome.runtime.getURL("assets/tar-16.png"),
    chrome.runtime.getURL("assets/tar-17.png"),
    chrome.runtime.getURL("assets/tar-18.png"),
    chrome.runtime.getURL("assets/tar-19.png"),
    chrome.runtime.getURL("assets/tar-20.png"),
    chrome.runtime.getURL("assets/tar-21.png"),
    chrome.runtime.getURL("assets/tar-22.png"),
    chrome.runtime.getURL("assets/tar-23.png"),
    chrome.runtime.getURL("assets/tar-24.png"),
    chrome.runtime.getURL("assets/tar-25.png")
];

function replaceImageSrc(image) {
    // Check if the element is an <img> or an SVG <image>
    const isImg = image instanceof HTMLImageElement;
    const isSvgImage = image instanceof SVGImageElement;

    if (isImg) {
        // Handle <img> elements that are not yet injected with Tartaglia image
        if (image && !image.src.includes("assets/tar-")) {
            const randomTartagliaImage = tartagliaImages[Math.floor(Math.random() * tartagliaImages.length)];
            image.src = randomTartagliaImage;
        }
    } else if (isSvgImage) {
        // Handle SVG <image> elements & href attribute check should come first
        const href = image.getAttribute("href") || image.getAttribute("xlink:href");
        if (href && !href.includes("assets/tar-")) {
            const randomTartagliaImage = tartagliaImages[Math.floor(Math.random() * tartagliaImages.length)];
            image.setAttribute("xlink:href", randomTartagliaImage);
            // Fallback to href in case svg uses newer attribute naming
            image.setAttribute("href", randomTartagliaImage);
        }
    }
}

function replaceBackgroundImage(div) {
    // This one's for div-contained images (like Twitter)
    const style = div.style.backgroundImage;
    if (style && !style.includes("assets/tar-")) {
        const randomTartagliaImage = tartagliaImages[Math.floor(Math.random() * tartagliaImages.length)];
        div.style.backgroundImage = `url(${randomTartagliaImage})`;
    }
}

function injectTartagliaImages() {
    // Fetch all <img> elements from DOM
    const domImgs = document.querySelectorAll("img");

    // Fetch all SVG <image> elements, regardless of nesting level
    const domSvgImages = document.querySelectorAll("svg image");

    // Fetch all custom elements like <g-img> with images (Google inspect)
    const customImgs = document.querySelectorAll("g-img img");

    // Fetch background divs for websites like Twitter
    const backgroundDivs = document.querySelectorAll("div[style*='background-image']");

    // Loop through all images and replace with a random Tartaglia image
    domImgs.forEach(replaceImageSrc);
    domSvgImages.forEach(replaceImageSrc);
    customImgs.forEach(replaceImageSrc);
    backgroundDivs.forEach(replaceBackgroundImage);
}

function init() {
    // Inject images immediately
    injectTartagliaImages();

    // Then obseve the DOM for new images
    const domObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // If a child list has been added, inject images again
            if (mutation.type === "childList") {
                injectTartagliaImages();
            }
        });
    });

    domObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

init();