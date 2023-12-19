import { defineStore } from 'pinia'
import {notify} from "@/plugins/notyf.ts";
import CartService, {Cart} from "@/services/CartService.ts";

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        carts: [] as Array<Cart>,
    }),
    actions: {
        async getAllCarts(userId: number): Promise<void> {
            try {
                this.carts = await CartService.getCartByUserId(userId)
            }catch (error) {
                console.error(error)
                notify.error('error to get carts')
            }
        },
        async addProductToCart(userId: number, productId: number): Promise<void> {
            try {
                await CartService.addProductToCart(userId, {product_id: productId})
            }catch (error) {
                console.error(error)
                notify.error('error to add product to cart')
            }
        },
    }
})
