function notify(message) {
  let div = document.getElementById('notification');

  div.style.display = 'block';
  div.innerText = message;

  div.addEventListener('click', hideDiv);

  function hideDiv(e){
    let target = e.target;
    div.style.display = 'none';
  }
}