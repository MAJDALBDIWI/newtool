// Initialize i18next with the translations
i18next.init({
    lng: 'de', // default language
    resources: {
        de: {
            translation: {
                "sentence1": "Dies ist der erste Beispielsatz.",
                "sentence2": "Hier ist ein weiterer Satz.",
                "sentence3": "Wir hoffen, das ist hilfreich."
            }
        },
        en: {
            translation: {
                "sentence1": "This is the first example sentence.",
                "sentence2": "Here is another sentence.",
                "sentence3": "We hope this is helpful."
            }
        },
        ar: {
            translation: {
                "sentence1": "هذه هي الجملة الأولى كمثال.",
                "sentence2": "هنا جملة أخرى.",
                "sentence3": "نأمل أن يكون هذا مفيداً."
            }
        },
        tr: {
            translation: {
                "sentence1": "Bu ilk örnek cümledir.",
                "sentence2": "İşte başka bir cümle.",
                "sentence3": "Umarız bu faydalıdır."
            }
        },
        uk: {
            translation: {
                "sentence1": "Це перше прикладове речення.",
                "sentence2": "Ось ще одне речення.",
                "sentence3": "Сподіваємося, що це корисно."
            }
        }
    }
}, function(err, t) {
    if (err) console.error(err);
    // Initialize the app
    initApp();
});

let currentIndex = 0;
const sentences = [
    'sentence1', 'sentence2', 'sentence3'
];

function initApp() {
    updateText();
    document.getElementById('prev').addEventListener('click', prevSentence);
    document.getElementById('next').addEventListener('click', nextSentence);
    document.getElementById('stop').addEventListener('click', stop);
    document.getElementById('resume').addEventListener('click', resume);
}

function updateText() {
    document.getElementById('text').innerText = i18next.t(sentences[currentIndex]);
    document.getElementById('translation').innerText = i18next.t(sentences[currentIndex], { lng: getCurrentLanguage() });
}

function prevSentence() {
    if (currentIndex > 0) {
        currentIndex--;
        updateText();
    }
}

function nextSentence() {
    if (currentIndex < sentences.length - 1) {
        currentIndex++;
        updateText();
    }
}

function stop() {
    // Logic to stop the playback
    // You can implement your stop logic here
}

function resume() {
    // Logic to resume the playback
    // You can implement your resume logic here
}

function getCurrentLanguage() {
    return i18next.language;
}
