function solve() {
   let addButton;
   let productsArray = new Set;
   let totalSum = 0;
   let products = document.querySelectorAll('.product');
   let textAreaOutput = document.getElementsByTagName('textarea');
   let checkoutButton = document.querySelector('.checkout');
   checkoutButton.addEventListener('click', checkout);
   
   for (let i = 0; i < products.length; i++) {
      addButton = products[i].querySelector('.add-product');
      addButton.addEventListener('click', addButtonFnc);
      let title = products[i].getElementsByClassName('product-title');
      let productName = title[0].innerText;
   }

   function addButtonFnc(e){
      let target = e.target;
      let parentTargetDiv = target.parentElement;
      while (parentTargetDiv) {
         if (parentTargetDiv.classList.contains('product')) {
           let productName = parentTargetDiv.querySelector('.product-title').textContent;
           let productPrice = parentTargetDiv.querySelector('.product-line-price').textContent;
           textAreaOutput[0].value += `Added ${productName} for ${productPrice} to the cart.\n`
           totalSum += parseFloat(productPrice);
           productsArray.add(productName)
           break;
         }
     
         parentTargetDiv = parentTargetDiv.parentElement;
       }
   }

   function checkout(e){
      textAreaOutput[0].value += `You bought ${Array.from(productsArray).join(', ')} for ${totalSum.toFixed(2)}.`
      checkoutButton.removeEventListener('click', checkout);
      for (let i = 0; i < products.length; i++) {
         let addButton = products[i].querySelector('.add-product');
         addButton.removeEventListener('click', addButtonFnc);
      }
   }
}