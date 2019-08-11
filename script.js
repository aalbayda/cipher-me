// If user types in box 1

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
            divFormGroup = document.createElement("div");
            divFormGroup.setAttribute("id", "new-form");
            divFormGroup.setAttribute("class", "col-auto form-group");
            inputKey = document.createElement("input");
            inputKey.setAttribute("class", "form-control");
            inputKey.setAttribute("type", "number");
            inputKey.setAttribute("id", "key-1");
            inputKey.setAttribute("placeholder", "Key (a->z)");
            inputKey.setAttribute("onchange", "handleCaesar()");
            divFormGroup.appendChild(inputKey);
            form.appendChild(divFormGroup);
            hasSwitched = true;
            break;
        case "Vigenere":
            divFormGroup = document.createElement("div");
            divFormGroup.setAttribute("id", "new-form");
            divFormGroup.setAttribute("class", "col-auto form-group");
            inputKey = document.createElement("input");
            inputKey.setAttribute("class", "form-control");
            inputKey.setAttribute("type", "text");
            inputKey.setAttribute("id", "key-1");
            inputKey.setAttribute("placeholder", "Keyword");
            inputKey.setAttribute("onchange", "handleVigenere()");
            divFormGroup.appendChild(inputKey);
            form.appendChild(divFormGroup);
            hasSwitched = true;
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

const handleCopy = () => {
    let copyText = document.getElementById("textarea-2");
    copyText.select();
    document.execCommand("copy");
}

const handleClear = () => {
    document.getElementById('textarea-1').value = document.getElementById('textarea-2').value = "";
}