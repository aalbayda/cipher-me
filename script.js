const createFormGroup = (keyType, placeholder, cipherType) => {
   return `
    <div class="col-auto form-group" id="new-form">
        <input class="form-control" type="${keyType}" id="key-1" placeholder="${placeholder}" oninput="handle${cipherType}"></input> 
    </div>`;
}
const handleChange = () => {
    let e = document.getElementById('select-1');
    let cipherType = e.options[e.selectedIndex].text;
    //Update card text
    document.getElementById('type-2').innerHTML = cipherType + " Cipher";
    document.getElementById('textarea-1').setAttribute('oninput', `handle${cipherType}()`);
    let form = document.getElementById('form-row-1');
    if (form.childElementCount == 2) {
        form.removeChild(form.children[1]);
    }
    switch (cipherType) {
        case "Caesar":
            form.innerHTML += createFormGroup("number", "Key (a->z)", cipherType);
            document.querySelector('option[value="caesar"]').setAttribute("selected", "");
            break;
        case "Vigenere":
            form.innerHTML += createFormGroup("text", "Keyword", cipherType);
            document.querySelector('option[value="vigenere"]').setAttribute("selected", "");
            break;
        case "Hill":
            form.innerHTML += createFormGroup("text", "Keyword", cipherType);
            form.innerHTML += createFormGroup("number", "n (for nxn matrix)", cipherType);
            document.querySelector('option[value="hill"]').setAttribute("selected", "");
            break;
        default:
            break;
    }
}

const isLetter = (e) => {
    if (e.toUpperCase() == e.toLowerCase())
        return false;
    return true;
}

const isUpper = (e) => {
    if (e == e.toUpperCase())
        return true;
    return false;
}

const isLower = (e) => {
    if (e == e.toLowerCase())
        return true;
    return false;
}

const handleShift = (key) => {
    let plaintext = document.getElementById('textarea-1').value;
    let result = '';
    let charcode = 0;
    for (let i = 0; i < plaintext.length; i++) {
        if (!isLetter(plaintext[i]))
            result += plaintext[i];
        else if (isLower(plaintext[i]))
            charcode = 97+(plaintext[i].charCodeAt()-97 + key)%26;
        else
            charcode = 65+(plaintext[i].charCodeAt()-65 + key)%26;
        result += String.fromCharCode(charcode);
    }
    return result;
}

const handleROT13 = () => { 
    document.getElementById('textarea-2').value = handleShift(13);
}

const handleCaesar = () => {
    document.getElementById('textarea-2').value = handleShift(document.getElementById('key-1').value);
}

const handleAtbash = () => {
    let plaintext = document.getElementById('textarea-1').value;
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let newAlphabet = alphabet.split("").reverse().join().replace(/,/g, "");
    let cipher = "";
    for (let i = 0; i < plaintext.length; i++) {
        if (isLetter(plaintext[i])) {
            if (isUpper(plaintext[i])) {
                let e = newAlphabet[alphabet.indexOf(plaintext[i].toLowerCase())];
                cipher += e.toUpperCase();
            }
            else
                cipher += newAlphabet[alphabet.indexOf(plaintext[i])];
        }
        else cipher += plaintext[i];
    }
    document.getElementById('textarea-2').value = cipher;
}

const handleVigenere = () => {
    if (!document.getElementById('key-1').value) {
        document.getElementById('textarea-2').value = "Enter a keyword first!";
    }
    else {
        let keyword = document.getElementById('key-1').value;
        let plaintext = document.getElementById('textarea-1').value;
        let cipher = "";
        let alphabet = "";
        for (let i = 97; i < 123; i++)
            alphabet += String.fromCharCode(i);
        let keyIndex = 0;
        for (let i = 0; i < plaintext.length; i++) {
            if (plaintext[i].toLowerCase() == plaintext[i].toUpperCase())
                cipher += plaintext[i];
            else {
                let cipherIndex = (alphabet.indexOf(plaintext[i].toLowerCase()) + alphabet.indexOf(keyword[keyIndex%keyword.length].toLowerCase()))%26;
                cipher += alphabet[cipherIndex];
                keyIndex++;
            }
        }
        let newCipher = "";
        for (let i = 0; i < plaintext.length; i++) {
            if (plaintext[i].toLowerCase() == plaintext[i].toUpperCase()) {
                newCipher += cipher[i];
            }
            else {
                if (plaintext[i] == plaintext[i].toUpperCase()) {
                    newCipher += cipher[i].toUpperCase();
                }
                else {
                    newCipher += cipher[i];
                }
            }
        }
        document.getElementById('textarea-2').value = newCipher;
    }
}

const handleNull = () => {
    let plaintext = document.getElementById('textarea-1').value;
    let ciphertext = "";
    let words = plaintext.split(" ");
    for (let i = 0; i < words.length; i++)
        if (words[i].length > 0) 
            ciphertext += words[i][0];
    document.getElementById('textarea-2').value = ciphertext;
}

const handleAffine = () => {

}

const handleHill = () => {
    if (!document.getElementById('key-1').value) {
        document.getElementById('textarea-2').value = "Enter a keyword first!";
    }
}

const handleCopy = () => {
    let copyText = document.getElementById("textarea-2");
    copyText.select();
    document.execCommand("copy");
}

const handleTransferLeft = () => {
    document.getElementById('textarea-1').value = document.getElementById('textarea-2').value;
    document.getElementById('textarea-2').value = "";
}

const handleClear = () => {
    document.getElementById('textarea-1').value = document.getElementById('textarea-2').value = "";
}