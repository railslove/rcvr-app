function genKey() {
    var keyPair = nacl.box.keyPair();
    document.getElementById("secretKey").value = btoa(String.fromCharCode.apply(null, keyPair.secretKey));
    document.getElementById("publicKey").value = btoa(String.fromCharCode.apply(null, keyPair.publicKey));
}

function encrypt() {
    var input = new TextEncoder().encode(document.getElementById("plainText").value)
    var publicKey = Uint8Array.from(atob(document.getElementById("publicKey").value), c => c.charCodeAt(0))
    var sealed = sealedBox.seal(input, publicKey);
    document.getElementById("encrypted").value = btoa(String.fromCharCode.apply(null, sealed));
}

function decrypt() {
    var input = Uint8Array.from(atob(document.getElementById("encrypted").value), c => c.charCodeAt(0))
    var secretKey = Uint8Array.from(atob(document.getElementById("secretKey").value), c => c.charCodeAt(0))
    var publicKey = Uint8Array.from(atob(document.getElementById("publicKey").value), c => c.charCodeAt(0))
    var decrypted = sealedBox.open(input, publicKey, secretKey);
    if (decrypted)
        document.getElementById("plainText").value = new TextDecoder().decode(decrypted)
    else
        document.getElementById("plainText").value = "Error";
}
