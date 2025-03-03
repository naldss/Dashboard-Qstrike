import { defineStore } from "pinia";
import axios from "axios";

export const useQuantityStore = defineStore("quantity", {
    state: () => ({
        totalQuantityPerYear: [],
    }),

    getters: {
        getTotalQuantityPerYear: (state) => state.totalQuantityPerYear,
    },

    actions: {
        async fetchQuantityData(year) {
            try {
                const response = await axios.get(`/api/totalQuantity?year=${year}`);

                if (response.data && response.data.total_quantity_per_year) {
                    this.totalQuantityPerYear = response.data.total_quantity_per_year.map(item => ({
                        year: parseInt(item.year, 10),
                        total_quantity: item.total_quantity || 0,
                    }));
                } else {
                    this.totalQuantityPerYear = [];
                }

                return response.data;
            } catch (error) {
                console.error("Error fetching quantity data:", error);
                this.totalQuantityPerYear = [];
                throw error;
            }
        },
    },
});
