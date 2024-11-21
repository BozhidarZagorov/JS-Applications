import { userHelper } from "../utility/userHelper";
import { userService } from "../service/userService";

export async function showLogoutView(ctx) {
    await userService.logout()
    userHelper.clearUserData()
    ctx.updateNav()
    ctx.goTo('/dashboard')
}