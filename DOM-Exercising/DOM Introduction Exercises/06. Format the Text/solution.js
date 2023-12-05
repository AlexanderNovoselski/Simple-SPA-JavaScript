function solve() {
  let input = document.getElementById('input').value;
  let outputDiv = document.getElementById('output');
  let splitedInput = input.split(".");
  let validSentences = [];
  for (const sentence of splitedInput) {
    if(sentence.length > 1){
      let sentenceWithDot = sentence + "."
      validSentences.push(sentenceWithDot.trim())
    }
  }
  const sentencesPerParagraph = 3; // Number of sentences per paragraph.

  for (let i = 0; i < validSentences.length; i += sentencesPerParagraph) {
    const pElement = document.createElement('p');
    pElement.textContent = validSentences.slice(i, i + sentencesPerParagraph).join(' ');
    outputDiv.appendChild(pElement);
  }
}