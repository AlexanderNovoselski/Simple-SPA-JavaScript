function validate() {
    let email = document.getElementById('email');
    email.addEventListener('change', validate);

    function validate() {
        let regExp = new RegExp(/^[a-zA-Z]+@[a-z]+.[a-z]+$/gm);
        if (!regExp.test(email.value)) {
            email.classList.add('error');
            console.log("false");
        }
        else {
            console.log("true");
            email.classList.remove('error');
        }
    }
}