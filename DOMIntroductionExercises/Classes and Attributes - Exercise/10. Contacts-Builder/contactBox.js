class Contact {
  constructor(firstName, lastName, phone, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this._online = false;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get online() {
    return this._online;
  }

  set online(isOnline) {
    try {
        this._online = isOnline;
        let element = this._element.parentElement.querySelector('.title');

        if (this._online) {
            element.classList.add('online');
        } else {
            element.classList.remove('online');
        }
    } catch (error) {
        throw new Error("<article> wasn't correctly generated");
    }
}


  showInfo(e) {
    let target = e.target.parentElement;
    let children = target.nextElementSibling;

    if (children.style.display === 'none') {
      children.style.display = 'block';
    }
    else{
      children.style.display = 'none';
    }
  }



  render(id) {
    let main = document.getElementById(id);
    let article = document.createElement('article');

    let divTitle = document.createElement('div');
    let buttonForMoreInfo = document.createElement('button');
    buttonForMoreInfo.addEventListener('click', this.showInfo);

    this._element = divTitle;
    
    let divInfo = document.createElement('div');
    let spanPhone = document.createElement('span');
    let spanEmail = document.createElement('span');

    divTitle.textContent = this.fullName;
    divTitle.classList.add('title');
    buttonForMoreInfo.textContent = '\u2139'

    divInfo.className = 'info';
    divInfo.style.display = 'none';
    spanPhone.textContent = `\u260E ${this.phone}`;
    spanEmail.textContent = `\u2709 ${this.email}`;

    divTitle.appendChild(buttonForMoreInfo);
    divInfo.appendChild(spanPhone);
    divInfo.appendChild(spanEmail);

    article.appendChild(divTitle);
    article.appendChild(divInfo);

    main.appendChild(article);

  }
}

let contacts = [
  new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
];
contacts.forEach(c => c.render('main'));
setTimeout(() => contacts[0].online = true, 2000);
