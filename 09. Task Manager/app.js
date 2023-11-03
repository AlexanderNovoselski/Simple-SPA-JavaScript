function solve() {
    let task, description, date;
    let add = document.getElementById('add');
    add.addEventListener('click', addBtn);

    function addBtn(event) {
        event.preventDefault(); // Prevent the default form submission behavior
    
        task = document.getElementById('task').value;
        description = document.getElementById('description').value;
        date = document.getElementById('date').value;
    
        if (!task || !description || !date) return;
        
    
        let h1Element = document.querySelector('h1.orange'); // Select the h1 with class "orange"
        let emptyDiv = h1Element.parentElement.nextElementSibling; // Get the empty div below the h1
        let article = document.createElement('article');
        let h3 = document.createElement('h3');
        let pDescription = document.createElement('p');
        let pDueDate = document.createElement('p');
        let divClassFlex = document.createElement('div');
        let divBtn1 = document.createElement('button');
        let divBtn2 = document.createElement('button');

        divClassFlex.classList.add('flex');
        divBtn1.classList.add('green');
        divBtn1.textContent = 'Start'
        divBtn2.classList.add('red');
        divBtn2.textContent = 'Delete'
        divClassFlex.appendChild(divBtn1);
        divClassFlex.appendChild(divBtn2);
    
        h3.textContent = task;
        pDescription.textContent = `Description: ${description}`;
        pDueDate.textContent = `Due Date: ${date}`;
    
        article.appendChild(h3);
        article.appendChild(pDescription);
        article.appendChild(pDueDate);
        article.appendChild(divClassFlex);
    
        emptyDiv.appendChild(article);
        divBtn1.addEventListener('click', start);
        divBtn2.addEventListener('click', deleteFunc);
    }

    function start(e) {
        let article = e.target.parentElement.parentElement;
        let h1Element = document.querySelector('h1.yellow');
        let emptyDiv = h1Element.parentElement.nextElementSibling;
    
        let btn1 = article.querySelector('.green');
        let btn2 = article.querySelector('.red');
    
        btn1.classList.remove('green'); // Remove the 'green' class
        btn1.classList.add('red'); // Add the 'red' class
        btn1.textContent = 'Delete'; // Change the button text
    
        btn2.classList.remove('red'); // Remove the 'red' class
        btn2.classList.add('orange'); // Add the 'blue' class
        btn2.textContent = 'Finish'; // Change the button text
    
        btn1.removeEventListener('click', start);
        btn2.removeEventListener('click', deleteFunc);

        btn1.addEventListener('click', deleteFunc);
        btn2.addEventListener('click', finishFunc);
        emptyDiv.appendChild(article);
    }
    

    function deleteFunc(e) {
        let article = e.target.parentElement.parentElement; 
        
        article.remove();
    }

    function finishFunc(e){
        let article = e.target.parentElement.parentElement;
        let h1Element = document.querySelector('h1.green');
        let emptyDiv = h1Element.parentElement.nextElementSibling;

        article.querySelector('div.flex').remove();
        emptyDiv.appendChild(article);
        
    }
    
}
