function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let input = document.getElementById("searchField").value;
      let tableInfo = document.querySelectorAll("table.container tbody tr td");
      for (const tdElement of tableInfo) {
         tdElement.parentElement.classList.remove("select");
      }
      for (const tdElement of tableInfo) {
         if (tdElement.innerText.includes(input)) {
            tdElement.parentElement.classList.add("select");

         }
      }
   }
}