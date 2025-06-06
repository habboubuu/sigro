let mobileNav = document.getElementById("navMobile");
let closeIcone = document.getElementById("iconNav");

function handleMenu(){
    mobileNav.classList.toggle("nav-mobile-close")
    closeIcone.classList.toggle("fa-xmark")
}

/// hash text
async function hashText(){
    const text = document.getElementById('textInput');
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(hashHex);
    document.getElementById('resultHashText').textContent = `Hash Text ${hashHex}`
}

// hash file
async function hashFile(){
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('resultHashFile').textContent = `File Hash ${hashHex}`

}