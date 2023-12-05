function solution() {
    class Article {
        constructor(id, title, content) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.article = this.createElements();
            this.main = document.getElementById('main').appendChild(this.article);
        }

        createElements() {
            let head = this.createDiv("head");
            head.appendChild(this.createSpan(this.title));
            let button = this.createButton("button", this.id, "More")
            button.addEventListener('click', (e) => this.showHide(e));
            head.appendChild(button);

            let extra = this.createDiv("extra");
            extra.style.display = 'none';
            extra.appendChild(this.createParagraph(this.content));

            let accordion = this.createDiv("accordion");
            accordion.appendChild(head);
            accordion.appendChild(extra);

            return accordion;
        }

        showHide(e) {
            let target = e.target;
            let extra = this.article.querySelector('.extra');
            if (extra.style.display == 'none') {
                extra.style.display = 'inline-block';
                target.textContent = 'Less';
            }
            else{
                extra.style.display = 'none';
                target.textContent = 'More';
            }
        }

        createDiv(className) {
            let div = document.createElement('div');
            div.classList.add(className);
            return div;
        }

        createSpan(text) {
            let span = document.createElement('span');
            span.textContent = text;
            return span;
        }

        createParagraph(text) {
            let p = document.createElement('p');
            p.textContent = text;
            return p;
        }

        createButton(className, id, text) {
            let button = document.createElement('button');
            button.id = id;
            button.textContent = text;
            button.classList.add(className);
            return button;
        }
    }

    class DataFetcher {
        static async fetchData() {
            try {
                const responseArticles = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
                const dataArticles = await responseArticles.json();
                for (const articleData of dataArticles) {
                    const id = articleData._id;
                    const responseArticlesDetails = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
                    const dataArticleDetails = await responseArticlesDetails.json();

                    new Article(dataArticleDetails._id, dataArticleDetails.title, dataArticleDetails.content);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    DataFetcher.fetchData();
}
solution();