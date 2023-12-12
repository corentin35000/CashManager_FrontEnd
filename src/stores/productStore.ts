import { defineStore } from 'pinia'
import ProductService from "@/services/ProductService.ts";
import type {Product} from "@/services/ProductService.ts";
import {notify} from "@/plugins/notyf.ts";

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [] as Array<Product>,
    }),
    actions: {
        async getProducts(): Promise<void> {
            try {
                this.products = await ProductService.getProducts()
            }catch (error) {
                console.error(error)
                notify.error('error to get products')
            }
        }
    }
})
