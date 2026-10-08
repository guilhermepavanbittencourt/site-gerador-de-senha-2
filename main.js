const wordList = [
    "computador", "seguranca", "programa", "internet", "desenvolvedor", 
    "tecnologia", "sistema", "conexao", "janela", "teclado", 
    "monitor", "guerreiro", "passaro", "planeta", "floresta",
    "oceano", "horizonte", "diamante", "foguete", "girassol"
];

const symbols = ["!", "@", "#", "$", "%", "&", "*", "_", "-"];

function applyLeetspeak(word) {
    const map = {
        'a': '@', 'A': '4',
        'e': '3', 'E': '3',
        'i': '1', 'I': '1',
        'o': '0', 'O': '0',
        's': '$', 'S': '5',
        't': '7', 'T': '7'
    };

    return word.split('').map(char => {
        if (map[char] && Math.random() < 0.7) {
            return map[char];
        }
        return char;
    }).join('');
}

function generatePassword() {
    let inputWord = document.getElementById('baseWordInput').value.trim();
    const useSymbols = document.getElementById('addSymbols').checked;
    const useNumbers = document.getElementById('addNumbers').checked;

    if (!inputWord) {
        inputWord = wordList[Math.floor(Math.random() * wordList.length)];
    }

    let processed = inputWord.charAt(0).toUpperCase() + inputWord.slice(1);

    processed = applyLeetspeak(processed);

    if (useNumbers && !/\d/.test(processed)) {
        const randomNum = Math.floor(Math.random() * 90) + 10;
        processed += randomNum;
    }

    if (useSymbols) {
        const prefixSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const suffixSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        processed = prefixSymbol + processed + suffixSymbol;
    }

    document.getElementById('passwordOutput').innerText = processed;
    
    updateStrengthIndicator(processed);
}

function updateStrengthIndicator(pwd) {
    const strengthEl = document.getElementById('strengthText');
    if (pwd.length > 10 && /[!@#$%&*_\-]/.test(pwd) && /\d/.test(pwd)) {
        strengthEl.innerText = "Forte";
        strengthEl.className = "text-emerald-400 font-bold";
    } else if (pwd.length > 6) {
        strengthEl.innerText = "Boa";
        strengthEl.className = "text-indigo-400 font-bold";
    } else {
        strengthEl.innerText = "Média";
        strengthEl.className = "text-amber-400 font-bold";
    }
}

async function copyPassword() {
    const passwordText = document.getElementById('passwordOutput').innerText;
    if (passwordText === "Clique em Gerar") return;

    try {
        await navigator.clipboard.writeText(passwordText);
        const copyIcon = document.getElementById('copyIcon');
        copyIcon.className = "fa-solid fa-check text-emerald-400";
        
        setTimeout(() => {
            copyIcon.className = "fa-regular fa-copy";
        }, 2000);
    } catch (err) {
        console.error("Erro ao copiar senha:", err);
    }
}

window.onload = generatePassword;
