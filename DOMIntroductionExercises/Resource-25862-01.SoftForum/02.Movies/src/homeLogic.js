import { createForm } from "../static/utils.js";
import { createMovieSection, detailsBtn, homeSectionView } from "./homeUtilities/utils.js";
import { showLogin } from "./loginLogic.js";
import { logout } from "./logoutLogic.js";
import { showRegister } from "./registerLogic.js";

let _body = document.body;

export function showHome(mainDomElement) {
  mainDomElement.innerHTML = '';
  let homeSection = createForm(homeSectionView);
  let moviesListUl = homeSection.querySelector('#movies-list');

  fetchMovies(moviesListUl)
  handleUserStatusHideShow(homeSection);

  setupEventListeners(homeSection, _body);

  mainDomElement.appendChild(homeSection);
}

async function fetchMovies(movieListUl) {
  let fnc = createForm(createMovieSection(1, 'da','da', 'https://pbs.twimg.com/media/ETINgKwWAAAyA4r.jpg', 3))
  let fnc2 = createForm(createMovieSection(2, 'da','da', 'https://pbs.twimg.com/media/ETINgKwWAAAyA4r.jpg', 3))
  fnc.querySelector('#deleteBtn').dataset.movieId = 1;
  fnc.querySelector('#editBtn').dataset.movieId = 1;
  fnc.querySelector('#likeBtn').dataset.movieId = 1;
  movieListUl.appendChild(fnc);
  movieListUl.appendChild(fnc2);
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

function handleUserStatusHideShow(homeSection, movieId) {

  let descriptionDiv = homeSection.querySelectorAll('#movieDescriptionData');
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

    //Hide ev.innerHTMLshow only a details button
    descriptionDiv.forEach(element => {
      element.innerHTML = '';

      let details = createForm(detailsBtn);
      element.appendChild(details);
    });
    
    logoutBtn.style.display = 'none';
    addMovieBtn.style.display = 'none';
  }
}

function isUserLogged() {
  if (sessionStorage.getItem('accessToken')) {
    return true;
  }
}