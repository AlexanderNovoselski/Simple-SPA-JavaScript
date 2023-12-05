function search() {
   let towns = document.querySelectorAll('#towns li');
   let input = document.getElementById('searchText').value;
   let output = document.getElementById('result');
   let copyTowns = Array.from(towns).map(x => x.innerText);
   let matches = 0;
   for (let i = 0; i < copyTowns.length; i++) {
      if (copyTowns[i].includes(input)) {
         const townToModify = towns[i];
         townToModify.style.textDecoration = "underline";
         townToModify.style.fontWeight = "bold";
         matches++;
      }
      else{
         towns[i].style.textDecoration = "";
         towns[i].style.fontWeight = "";
      }
   }
   output.innerText = `${matches} matches found`
}
