import { defineStore } from 'pinia'
import {notify} from "@/plugins/notyf.ts";
import CartService, {Cart} from "@/services/CartService.ts";
import CookieService from "@/services/CookieService.ts";
import {User} from "@/services/UserService.ts";

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart: [] as Array<Cart>,
    }),
    actions: {
        async getCart(): Promise<void> {
            try {
                const user: User = JSON.parse(<string>CookieService.getCookie('user'));
                this.cart = await CartService.getCartByUserId(user.id);
            }catch (error) {
                console.error(error)
                notify.error('error to get products')
            }
        }
    }
})
