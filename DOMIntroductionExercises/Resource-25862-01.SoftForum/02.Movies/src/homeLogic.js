import { createForm, getAccessToken, isUserLogged } from "../static/utils.js";
import { createMovieSection, detailsBtn, homeSectionView } from "./homeUtilities/utils.js";
import { showLogin } from "./loginLogic.js";
import { logout } from "./logoutLogic.js";
import { showRegister } from "./registerLogic.js";
import { showEditMovie } from "./showEditMovie.js";

let _body = document.body;

export async function showHome(mainDomElement) {
  mainDomElement.innerHTML = '';
  let homeSection = createForm(homeSectionView);
  let moviesListUl = homeSection.querySelector('#movies-list');

  await showMovies(moviesListUl)
  handleUserStatusHideShow(homeSection);
  manageMovieButtons(homeSection);
  setupEventListeners(homeSection, _body);

  mainDomElement.appendChild(homeSection);
}

async function showMovies(movieListUl) {
  let data = await getMovies();

  Object.values(data).forEach((value) => {
    let movieId = value._id;
    let ownerId = value._ownerId;
    let title = value.title;
    let description = value.description;
    let img = value.img;

    let section = createForm(createMovieSection(movieId, title, description, img, ownerId));
    let editBtn = section.querySelector('#editBtn');
    let deleteBtn = section.querySelector('#deleteBtn');
    let likeBtn = section.querySelector('#likeBtn');

    editBtn.dataset.movieId = movieId;
    deleteBtn.dataset.movieId = movieId
    likeBtn.dataset.movieId = movieId;
    editBtn.addEventListener('click', (e) => showEditMovie(e, _body, title, description, img))
    deleteBtn.addEventListener('click', (e) => deleteMovie(e))
    // likeBtn.addEventListener('click', (e) => deleteMovie(e))

    movieListUl.appendChild(section);
  })
}

async function deleteMovie(e) {
  e.preventDefault();
  let target = e.target;
  let movieId = target.dataset.movieId;
  let url = `http://localhost:3030/data/movies/` + movieId;
  if (getAccessToken) {
    try {
      // TODO maybe add a popup to ask before deletion
      await fetch(url, { method: 'DELETE', headers: { 'X-Authorization': sessionStorage.getItem('accessToken') } })
      showHome(_body);
    } catch (error) {

    }
  }
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

  // Nav buttons
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

function manageMovieButtons(homeSection) {
  let userId = sessionStorage.getItem('id');
  let movieListLis = homeSection.querySelectorAll('#movies-list li');

  movieListLis.forEach(item => {
    let ownerId = item.querySelector('#movieOwnerId').value;
    let descriptionDiv = item.querySelector('.movieDescriptionData');

    if ((isUserLogged() && ownerId !== userId) || !isUserLogged()) {
      // Show details button for movies not owned by the logged-in user
      descriptionDiv.innerHTML = '';

      let details = createForm(detailsBtn);
      descriptionDiv.appendChild(details);
    }


  });
}


