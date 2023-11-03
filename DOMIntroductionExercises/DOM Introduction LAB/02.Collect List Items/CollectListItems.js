function extractText() {
    let element = document.getElementsByTagName("li")
    let array = Array.from(element);
    let allTexts = array.map(x => x.innerText);
    
    let textArea = document.getElementById("result");
    textArea.value = allTexts.join("\n")
}