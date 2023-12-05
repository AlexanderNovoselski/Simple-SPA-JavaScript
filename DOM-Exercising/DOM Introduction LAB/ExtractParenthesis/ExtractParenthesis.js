function extract(content) {
    let pattern = /\(([^()]+)\)/g;

    let textToMatch = document.getElementById(content).innerText;
    let found = [...textToMatch.matchAll(pattern)];
    let text = found.map(x => x[1]).join("; ");

    return text;
}