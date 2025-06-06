let mobileNav = document.getElementById("navMobile");
let closeIcone = document.getElementById("iconNav");

function handleMenu(){
    mobileNav.classList.toggle("nav-mobile-close")
    closeIcone.classList.toggle("fa-xmark")
}

// -- ENCRIPTION --


function encrypt(){
    const textEncription = document.getElementById("encriptionText").value;
    const secretkey = document.getElementById("keyEncrription").value;

    if(!textEncription || !secretkey){
        window.alert("Please entre both text and secret key");
        return;
    }
    const encrypted = CryptoJS.AES.encrypt(textEncription, secretkey).toString();
    document.getElementById('resultEncription').textContent = encrypted


}

function decrypt(){
    const encryptedText = document.getElementById('decriptionText').value;
    const secretkey = document.getElementById('keyDecription').value

    if (!encryptedText || !secretkey) {
        window.alert("Please entre both text and secret Key");
        return;
    }
    try{
        const decrypted  = CryptoJS.AES.decrypt(encryptedText, secretkey).toString(CryptoJS.enc.Utf8);
        if(decrypted){
            document.getElementById('resultDecription').textContent = decrypted
        }else{
            document.getElementById('resultDecription').textContent = "Failed to decrypt. Wrong key or text.!"
        }
    }catch(err){
        document.getElementById('resultDecription').textContent = `${err}`
    }
}
//decryp



