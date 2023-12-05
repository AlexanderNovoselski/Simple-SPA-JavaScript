function getArticleGenerator(articles) {
    let index = 0;
    console.log(index);
    return function () {
        if (index < articles.length) {
            let divContent = document.getElementById('content');
            let newArticle = document.createElement('article');
            newArticle.textContent = articles[index];
            divContent.appendChild(newArticle);
            index++;
        }
    }
}

