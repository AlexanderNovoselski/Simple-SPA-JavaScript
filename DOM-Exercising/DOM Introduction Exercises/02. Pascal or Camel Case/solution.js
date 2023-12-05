function solve() {
  let stringText = document.getElementById('text').value;
  let convention = document.getElementById('naming-convention').value;
  let result = document.getElementById('result');
  let concatString = '';
  let splited;
  if (stringText != "") {
    splited = stringText.split(" ");
  }
  if (convention == "Pascal Case") {
    for (const string of splited) {
      for (let i = 0; i < string.length; i++) {
        if (i == 0) {
          concatString += (string[0].toUpperCase())
        }
        else {
          concatString += (string[i].toLowerCase());
        }
      }
    }
    result.innerText = concatString;
  }
  else if (convention == "Camel Case") {
    let isFirstWord = true;
    for (const string of splited) {
      if (isFirstWord) {
        concatString += string.toLowerCase();
        isFirstWord = false;
        continue;
      }
      for (let i = 0; i < string.length; i++) {
        if (i == 0) {
          concatString += (string[0].toUpperCase())
        }
        else {
          concatString += (string[i].toLowerCase());
        }

      }
    }
    result.innerText = concatString;
  }
  else {
    result.innerText = "Error!";
  }
}