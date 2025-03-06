import { defineStore } from "pinia";
import axios from '@/api/axios';

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        totalOrdersPerYear: [],
    }),

    getters: {
        getTotalOrdersPerYear: (state) => state.totalOrdersPerYear,
    },

    actions: {
        async fetchOrdersData(year) {
            try {
                const response = await axios.get(`/api/totalOrders?year=${year}`);

                if (response.data && response.data.total_orders_per_year) {
                    this.totalOrdersPerYear = response.data.total_orders_per_year.map(item => ({
                        year: parseInt(item.year, 10),
                        total_orders: item.total_orders || 0,
                    }));
                } else {
                    this.totalOrdersPerYear = [];
                }

                return response.data;
            } catch (error) {
                console.error("Error fetching orders data:", error);
                this.totalOrdersPerYear = [];
                throw error;
            }
        },
    },
});
