function validate() {
    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    let email = document.getElementById('email');
    let invalidMail = true;
    email.addEventListener('change', change);

    function change(e) {

        if (emailPattern.test(e.target.value)) {
            console.log("Valid email");
            email.classList.remove('error');

        } 
        else {
            console.log("Invalid email");
            email.classList.add('error')
        }
    }
}
