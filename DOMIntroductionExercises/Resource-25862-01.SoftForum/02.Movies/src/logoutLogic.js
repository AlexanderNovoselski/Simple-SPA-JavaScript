import { showHome } from "./homeLogic.js";
import * as userService from "./services/userService.js";

let _body = document.body;
export async function logout() {
    try {
        userService.logoutUser()
        
        showHome(_body);
    } catch (error) {
        alert(error.message);
    }
}