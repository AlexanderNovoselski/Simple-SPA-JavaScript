import { createForm } from "../static/utils.js";
import { createMovieSection, detailsBtn, homeSectionView } from "./homeUtilities/utils.js";
import { showLogin } from "./loginLogic.js";
import { logout } from "./logoutLogic.js";
import { showRegister } from "./registerLogic.js";

let _body = document.body;

export async function showHome(mainDomElement) {
  mainDomElement.innerHTML = '';
  let homeSection = createForm(homeSectionView);
  let moviesListUl = homeSection.querySelector('#movies-list');

  await showMovies(moviesListUl)
  console.log(homeSection)
  handleUserStatusHideShow(homeSection);

  setupEventListeners(homeSection, _body);

  mainDomElement.appendChild(homeSection);
}

async function showMovies(movieListUl) {
  let data = await getMovies();

  Object.entries(data).forEach(([key, value]) => {
    let movieId = value._id;
    let ownerId = value._ownerId;
    let title = value.title;
    let description = value.description;
    let img = value.img;

    let section = createForm(createMovieSection(movieId, title, description, img, ownerId));
    section.querySelector('#editBtn').dataset.movieId = movieId;
    section.querySelector('#deleteBtn').dataset.movieId = movieId;
    section.querySelector('#likeBtn').dataset.movieId = movieId;

    movieListUl.appendChild(section);
  })
}

async function getMovies() {
  let url = "http://localhost:3030/data/movies";

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (!response.ok) {
      throw new Error('Response is not ok')
    }
    return data;
  } catch (error) {
    console.log(error);
  }
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

  let descriptionDiv = homeSection.querySelectorAll('.movieDescriptionData');
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

    //Hide ev.innerHTML show only a details button
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