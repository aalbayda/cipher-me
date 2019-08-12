const createFormGroup = (keyType, placeholder, cipherType) => {
   return `
    <div class="col-auto form-group" id="new-form">
        <input type="${keyType}" id="key-1" placeholder="${placeholder}" onchange="handle${cipherType}"></input> 
    </div>`;
}

const handleChange = () => {
    let e = document.getElementById('select-1');
    let cipherType = e.options[e.selectedIndex].text;
    //Update card text
    document.getElementById('type-2').innerHTML = cipherType + " Cipher";
    document.getElementById('textarea-1').setAttribute('oninput', `handle${cipherType}()`);
    let divFormGroup, inputKey;
    let form = document.getElementById('form-row-1');
    if (form.childElementCount == 2) {
        form.removeChild(form.children[1]);
    }
    switch (cipherType) {
        case "Caesar":
            createFormGroup("number", "Key (a->z)", cipherType);
            break;
        case "Vigenere":
            createFormGroup("keyword", "Keyword", cipherType);
            break;
        case "Hill":
                createFormGroup("keyword", "Keyword", cipherType);
            break;
    }
    
}

const handleShift = (key) => {
    let plaintext = document.getElementById('textarea-1').value;
    let result = '';
    let charcode = 0;
    for (let i = 0; i < plaintext.length; i++) {
        if (plaintext[i].toLowerCase() == plaintext[i].toUpperCase())
            result += plaintext[i];
        else if (plaintext[i] == plaintext[i].toLowerCase())
            charcode = 97+(plaintext[i].charCodeAt()-97 + key)%26;
        else
            charcode = 65+(plaintext[i].charCodeAt()-65 + key)%26;
        result += String.fromCharCode(charcode);
    }
    document.getElementById('textarea-2').value = result;
}

const handleROT13 = () => { 
    handleShift(13);
}

const handleCaesar = () => {
    handleShift(document.getElementById('key-1').value);
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
// TO DO: mod 26 resulting matrix
const handleHill = () => {
    if (!document.getElementById('key-1').value) {
        document.getElementById('textarea-2').value = "Enter a keyword first!";
    }
    let keyword = document.getElementById('key-1').value;
    let plaintext = document.getElementById('textarea-1').value;
    let keyMatrix = [];
    for (let i = 0; i < plaintext.length; i++)
        keyMatrix.push([0,0,0]);
    let plainMatrix = [];

    // Convert keyword to matrix
    let keyIndex = 0;
    for (let i = 0; i < keyMatrix.length; i++) {
        for (let j = 0; j < keyMatrix.length; j++) {
            keyIndex[i][j] = keyword[keyIndex++].charCodeAt()-97;
        }
    }

    // Convert plaintext to matrix
    let plainMatrix = [];
    for (let i = 0; i < plaintext.length; i++) {
        let e = [];
        e.push(plaintext[i].charCodeAt()-97);
        plainMatrix.push(e);
    }

    const newMatrix = math.multiply(keyMatrix, plainMatrix);
}

const handleCopy = () => {
    let copyText = document.getElementById("textarea-2");
    copyText.select();
    document.execCommand("copy");
}

const handleClear = () => {
    document.getElementById('textarea-1').value = document.getElementById('textarea-2').value = "";
}