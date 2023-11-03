function focused() {
    let divs = document.querySelectorAll('div div');
    for (let i = 0; i < divs.length; i++) {
        const input = divs[i].querySelector('input');
        input.addEventListener('focus', function () {
          divs[i].classList.add('focused');
        });
        input.addEventListener('blur', function () {
          divs[i].classList.remove('focused');
        });
      }
}