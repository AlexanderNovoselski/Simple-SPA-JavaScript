import { createForm } from "../static/utils.js";
import { showLogin } from "./loginLogic.js";
import { logout } from "./logoutLogic.js";
import { showRegister } from "./registerLogic.js";

let _body = document.body;

export function showHome(mainDomElement) {
  mainDomElement.innerHTML = '';
  let homeSection = createForm(homeSectionView);
  let moviesListUl = homeSection.querySelector('#movies-list'); //TODO fetch and create dinamically movies

  handleUserStatusHideShow(homeSection);

  setupEventListeners(homeSection, _body);

  mainDomElement.appendChild(homeSection);
}

async function fetchMovies(){
  // TODO function, return the data make a new function that makes the DOM and use the two functions in the showHome function
}

function setupEventListeners(homeSection, _body) {
  let loginBtn = homeSection.querySelector('#loginBtnNav');
  let registerBtn = homeSection.querySelector('#registerBtnNav');
  let homePageBtn = homeSection.querySelector('#homePageBtnNav');
  let logoutBtnNav = homeSection.querySelector('#logoutBtnNav');

  loginBtn.addEventListener('click', () => showLogin(_body));
  logoutBtnNav.addEventListener('click', () => logout(_body));
  registerBtn.addEventListener('click', () => showRegister(_body));
  homePageBtn.addEventListener('click', () => showHome(_body));
}

function handleUserStatusHideShow(homeSection) {
  if (isUserLogged()) {
    let welcomeMsg = homeSection.querySelector('#welcome-msg');
    let loginBtn = homeSection.querySelector('#loginBtnLi');
    let registerBtn = homeSection.querySelector('#registerBtnLi');

    welcomeMsg.innerText = `Welcome, ${sessionStorage.getItem('email')}`;

    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
  } else {
    let logoutBtn = homeSection.querySelector('#logoutBtnLi');
    let addMovieBtn = homeSection.querySelector('#add-movie-button');

    logoutBtn.style.display = 'none';
    addMovieBtn.style.display = 'none';
  }
}

function isUserLogged() {
  if (sessionStorage.getItem('accessToken')) {
    return true;
  }
}


const homeSectionView = {
  elementName: 'div',
  id: 'container',
  children: [
    {
      elementName: 'nav',
      classes: ['navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark'],
      children: [
        {
          elementName: 'a',
          id: 'homePageBtnNav',
          classes: ['navbar-brand', 'text-light'],
          attributes: [{ name: 'href', value: '#' }],
          textContent: 'Movies'
        },
        {
          elementName: 'ul',
          classes: ['navbar-nav', 'ml-auto'],
          children: [
            {
              elementName: 'li',
              classes: ['nav-item', 'user'],
              children: [
                {
                  elementName: 'a',
                  id: 'welcome-msg',
                  classes: ['nav-link'],
                  textContent: 'Welcome, guest'
                }
              ]
            },
            {
              elementName: 'li',
              id: 'logoutBtnLi',
              classes: ['nav-item', 'user'],
              children: [
                {
                  elementName: 'a',
                  id: 'logoutBtnNav',
                  classes: ['nav-link'],
                  attributes: [{ name: 'href', value: '#' }],
                  textContent: 'Logout'
                }
              ]
            },
            {
              elementName: 'li',
              id: 'loginBtnLi',
              classes: ['nav-item', 'user'],
              children: [
                {
                  elementName: 'a',
                  id: 'loginBtnNav',
                  classes: ['nav-link'],
                  attributes: [{ name: 'href', value: '#' }],
                  textContent: 'Login'
                }
              ]
            },
            {
              elementName: 'li',
              id: 'registerBtnLi',
              classes: ['nav-item', 'user'],
              children: [
                {
                  elementName: 'a',
                  id: 'registerBtnNav',
                  classes: ['nav-link'],
                  attributes: [{ name: 'href', value: '#' }],
                  textContent: 'Register'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      elementName: 'section',
      id: 'home-page',
      classes: ['view-section'],
      children: [
        {
          elementName: 'div',
          classes: ['jumbotron', 'jumbotron-fluid', 'text-light'],
          style: { backgroundColor: '#343a40' },
          children: [
            {
              elementName: 'img',
              classes: ['img-fluid'],
              attributes: [
                { name: 'src', value: 'https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg' },
                { name: 'alt', value: 'Responsive image' },
                { name: 'style', value: 'width: 150%; height: 200px' }
              ]
            },
            {
              elementName: 'h1',
              classes: ['display-4'],
              textContent: 'Movies'
            },
            {
              elementName: 'p',
              classes: ['lead'],
              textContent: 'Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.'
            }
          ]
        },
        {
          elementName: 'h1',
          classes: ['text-center'],
          textContent: 'Movies'
        },
        {
          elementName: 'section',
          id: 'add-movie-button',
          classes: ['user'],
          children: [
            {
              elementName: 'a',
              classes: ['btn', 'btn-warning'],
              attributes: [
                { name: 'href', value: '#' }
              ],
              textContent: 'Add Movie'
            }
          ]
        },
        {
          elementName: 'section',
          id: 'movie',
          children: [
            {
              elementName: 'div',
              children: [
                {
                  elementName: 'div',
                  classes: ['row', 'd-flex', 'justify-content-center'],
                  children: [
                    {
                      elementName: 'ul',
                      id: 'movies-list',
                      classes: ['card-deck'],
                      style: { listStyleType: 'none', padding: '0' }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};







{/* 
<section id="home-page" class="view-section">
        <div
          class="jumbotron jumbotron-fluid text-light"
          style="background-color: #343a40"
        >
          <img
            src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
            class="img-fluid"
            alt="Responsive image"
            style="width: 150%; height: 200px"
          />
          <h1 class="display-4">Movies</h1>
          <p class="lead">
            Unlimited movies, TV shows, and more. Watch anywhere. Cancel
            anytime.
          </p>
        </div>

        <h1 class="text-center">Movies</h1>

        <section id="add-movie-button" class="user">
          <a href="#" class="btn btn-warning">Add Movie</a>
        </section>

        <section id="movie">
          <div class="mt-3">
            <div class="row d-flex d-wrap">
              <ul
                id="movies-list"
                class="card-deck d-flex justify-content-center"
              >
                <!-- movie list -->
              </ul>
            </div>
          </div>
        </section>
      </section>*/}