import { defineStore } from "pinia";
import axios from "axios";

export const useTopSalesRepsStore = defineStore("topSalesReps", {
    state: () => ({
        topSalesReps: [],
        loading: false,
    }),

    getters: {
        getTopSalesReps: (state) => state.topSalesReps,
        getTopSalesRepsByYear: (state) => (year) => {
            return state.topSalesReps.filter(rep => rep.year === year);
        },
    },

    actions: {
        async fetchTopSalesReps() {
            try {
                this.loading = true;
                const response = await axios.get("/api/topSalesReps?year=2025"); // Keep the param even if ignored by API

                if (response.data && response.data.top_sales_reps) {
                    this.topSalesReps = response.data.top_sales_reps.map(item => ({
                        rep_name: item.rep_name || 'Unknown',
                        total_sales: parseFloat(item.total_sales || 0),
                        year: parseInt(item.year, 10),
                        sales_rep_brand: item.sales_rep_brand || 'Unknown'
                    }));
                } else {
                    this.topSalesReps = [];
                }

                this.loading = false;
                return this.topSalesReps;
            } catch (error) {
                console.error("Error fetching top sales reps:", error);
                this.topSalesReps = [];
                this.loading = false;
                throw new Error(`Failed to fetch top sales reps: ${error.message}`);
            }
        },
    },
});