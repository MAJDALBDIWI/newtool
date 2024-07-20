document.addEventListener("DOMContentLoaded", function () {
    const textInput = document.getElementById("textInput");
    const languageSelect = document.getElementById("languageSelect");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const textOutput = document.getElementById("textOutput");

    let sentences = [];
    let currentIndex = 0;
    let isPlaying = false;
    let utterance;

    function updateTextOutput() {
        if (sentences.length > 0) {
            const sentence = sentences[currentIndex];
            textOutput.innerHTML = `<p><strong>Deutsch:</strong> ${sentence}</p>`;
            const lang = languageSelect.value;
            translateSentence(sentence, lang).then(translation => {
                textOutput.innerHTML += `<p><strong>Übersetzung:</strong> ${translation}</p>`;
            });
        }
    }

    async function translateSentence(sentence, lang) {
        const encodedSentence = encodeURIComponent(sentence);
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodedSentence}&langpair=de|${lang}`);
        const data = await response.json();
        return data.responseData.translatedText;
    }

    function playSentence(sentence) {
        if (utterance) {
            window.speechSynthesis.cancel();
        }
        utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = 'de-DE'; // German
        window.speechSynthesis.speak(utterance);
    }

    startButton.addEventListener("click", function () {
        sentences = textInput.value.split(".").map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
        currentIndex = 0;
        isPlaying = true;
        updateTextOutput();
        playSentence(sentences[currentIndex]);
    });

    stopButton.addEventListener("click", function () {
        window.speechSynthesis.pause();
        isPlaying = false;
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateTextOutput();
            playSentence(sentences[currentIndex]);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < sentences.length - 1) {
            currentIndex++;
            updateTextOutput();
            playSentence(sentences[currentIndex]);
        }
    });
});
