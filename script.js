const form = document.querySelector('form');
const wordInput = document.getElementById('word-input');
const result = document.getElementById('result');

form.onsubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`)
        .then(res => res.json())
        .then(data => {
            result.innerHTML = '';
            result.innerHTML = `<h1 id='word'>${data[0].word}</h1>`;
            for (const meaning of data[0].meanings) {
                const meaningEl = document.createElement('div');
                meaningEl.classList.add('meaning');

                const partOfSpeechEl = document.createElement('h2');
                partOfSpeechEl.id = 'part-of-speech';
                partOfSpeechEl.textContent = meaning.partOfSpeech;
                meaningEl.appendChild(partOfSpeechEl);

                const definitionsOrderedList = document.createElement('ol');
                meaning.definitions.forEach(def => {
                    definitionsOrderedList.innerHTML += `<li>${def.definition}</li>`;
                });
                meaningEl.appendChild(definitionsOrderedList);
                result.appendChild(meaningEl);
            }
        });

    form.reset();
}