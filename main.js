document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos do DOM
    const passwordOutput = document.getElementById('passwordOutput');
    const passwordLengthInput = document.getElementById('passwordLength');
    const lengthValueSpan = document.getElementById('lengthValue');
    const includeUppercaseCheckbox = document.getElementById('includeUppercase');
    const includeLowercaseCheckbox = document.getElementById('includeLowercase');
    const includeNumbersCheckbox = document.getElementById('includeNumbers');
    const includeSymbolsCheckbox = document.getElementById('includeSymbols');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');

    // Conjuntos de caracteres
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=[]{};:,.<>?/~`|'; // Mais símbolos para uma senha mais forte

    // --- Funções Auxiliares ---

    // Retorna um caractere aleatório de um conjunto dado
    function getRandomChar(charSet) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        return charSet[randomIndex];
    }

    // Embaralha uma string (usado para embaralhar a senha gerada)
    function shuffleString(str) {
        let array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca elementos
        }
        return array.join('');
    }

    // --- Lógica Principal do Gerador de Senhas ---

    function generatePassword() {
        let allChars = '';
        let guaranteedChars = ''; // Caracteres para garantir que pelo menos um tipo selecionado esteja presente

        // Constrói o conjunto de caracteres e adiciona um garantido, se selecionado
        if (includeUppercaseCheckbox.checked) {
            allChars += uppercaseChars;
            guaranteedChars += getRandomChar(uppercaseChars);
        }
        if (includeLowercaseCheckbox.checked) {
            allChars += lowercaseChars;
            guaranteedChars += getRandomChar(lowercaseChars);
        }
        if (includeNumbersCheckbox.checked) {
            allChars += numberChars;
            guaranteedChars += getRandomChar(numberChars);
        }
        if (includeSymbolsCheckbox.checked) {
            allChars += symbolChars;
            guaranteedChars += getRandomChar(symbolChars);
        }

        // Se nenhum tipo de caractere for selecionado
        if (allChars === '') {
            passwordOutput.value = '[ERRO] Selecione um tipo de caractere!';
            return;
        }

        const length = parseInt(passwordLengthInput.value);
        let generatedPassword = guaranteedChars;

        // Preenche o restante da senha
        for (let i = generatedPassword.length; i < length; i++) {
            generatedPassword += getRandomChar(allChars);
        }

        // Embaralha a senha para evitar padrões (e garantir que os "garantidos" não fiquem sempre no início)
        generatedPassword = shuffleString(generatedPassword);

        passwordOutput.value = generatedPassword;
    }

    // --- Lógica de Copiar Senha ---

    function copyPassword() {
        if (passwordOutput.value && passwordOutput.value !== '[ERRO] Selecione um tipo de caractere!') {
            passwordOutput.select(); // Seleciona o texto dentro do input
            passwordOutput.setSelectionRange(0, 99999); // Para dispositivos móveis
            document.execCommand('copy'); // Copia o texto selecionado

            // Feedback visual de cópia (pode ser aprimorado com um tooltip temporário)
            copyButton.textContent = 'Copiado!';
            setTimeout(() => {
                copyButton.textContent = 'Copiar';
            }, 1500); // Volta ao texto original após 1.5 segundos

        } else {
            alert('Nenhuma senha para copiar!'); // Feedback simples
        }
    }

    // --- Event Listeners ---

    // Atualiza o valor do comprimento da senha conforme o slider é movido
    passwordLengthInput.addEventListener('input', () => {
        lengthValueSpan.textContent = passwordLengthInput.value;
    });

    // Gera uma nova senha quando o botão "Gerar Senha" é clicado
    generateButton.addEventListener('click', generatePassword);

    // Copia a senha para a área de transferência quando o botão "Copiar" é clicado
    copyButton.addEventListener('click', copyPassword);

    // Gera uma senha inicial quando a página é carregada
    generatePassword();
});
