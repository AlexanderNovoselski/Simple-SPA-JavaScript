function validate() {
    //show
    let companyInfoFieldSet = document.getElementById('companyInfo');
    let companyCheckbtn = document.getElementById('company');
    
    let submitBtn = document.getElementById('submit');
    let validDiv = document.getElementById('valid');

    companyCheckbtn.addEventListener('change', showCompanyInfo);
    submitBtn.addEventListener('click', submitFunc);

    function showCompanyInfo() {
        if (companyCheckbtn.checked) {
            companyInfoFieldSet.style.display = 'block';
        }
        else {
            companyInfoFieldSet.style.display = 'none';
            companyNumber.value = '';
            companyNumber.style.borderColor = '';
        }
    }

    function submitFunc(event) {
        let username = document.getElementById('username');
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let confirmPassword = document.getElementById('confirm-password');
        let companyNumber = document.getElementById('companyNumber');
        let elementsSet = new Set();
        elementsSet.add(username);
        elementsSet.add(email);
        elementsSet.add(password);
        elementsSet.add(confirmPassword);
        elementsSet.add(companyNumber);
    
        let usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
        let passwordsPattern = /^[\w]{5,15}$/;
        let emailPattern = /^\w+@\w+.\w+$/;

        event.preventDefault();
        for (const element of elementsSet) {
            element.style.borderColor = '';
        }

        if (usernamePattern.test(username.value) === false) {
            username.style.borderColor = 'red';
        }

        if (emailPattern.test(email.value) === false) {
            email.style.borderColor = 'red';
        }

        if (passwordsPattern.test(password.value) === false) {
            password.style.borderColor = 'red';
        }

        if (passwordsPattern.test(confirmPassword.value) === false) {
            confirmPassword.style.borderColor = 'red';
        }
        if (password.value != confirmPassword.value) {
            password.style.borderColor = 'red';
            confirmPassword.style.borderColor = 'red';
        }

        if (companyCheckbtn.checked) {
            if (!(companyNumber.value >= 1000 && companyNumber.value <= 9999)) {
                companyNumber.style.borderColor = 'red';
            }
        }
        let validElements = Array.from(elementsSet).some(x => x.style.borderColor == 'red')
        if (validElements) {
            validDiv.style.display = 'none';
        }
        else {
            validDiv.style.display = 'block';
        }
    }

}
