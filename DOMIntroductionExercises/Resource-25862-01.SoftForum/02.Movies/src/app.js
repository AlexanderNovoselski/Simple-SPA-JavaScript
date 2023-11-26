import { showLogin } from "./loginLogic.js";

let mainContainer = document.getElementById('container');

document.addEventListener('onload', showLogin(mainContainer))