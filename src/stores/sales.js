import { defineStore } from "pinia";
import axios from '@/api/axios';

export const useSalesStore = defineStore("sales", {
    state: () => ({
        totalSalesPerYear: [],
        salesPerMonth: [],
        loading: false,
    }),

    getters: {
        getTotalSalesPerYear: (state) => state.totalSalesPerYear,
        getSalesPerMonth: (state) => state.salesPerMonth,
    },

    actions: {
        async fetchTotalSalesData(year) {
            try {
                this.loading = true;
                const response = await axios.get(`/api/totalSales?year=${year}`);

                if (response.data && response.data.total_sales_per_year) {
                    this.totalSalesPerYear = response.data.total_sales_per_year.map(item => ({
                        year: parseInt(item.year, 10),
                        total_sales: parseFloat(item.total_sales || 0),
                    }));
                } else {
                    this.totalSalesPerYear = [];
                }

                this.loading = false;
                return response.data;
            } catch (error) {
                console.error("Error fetching total sales data:", error);
                this.loading = false;
                this.totalSalesPerYear = [];
                throw error;
            }
        },

        async fetchSalesPerMonth() {
            try {
                this.loading = true;
                const response = await axios.get("/api/salespermonth");

                if (response.data && response.data.sales_per_month) {
                    this.salesPerMonth = response.data.sales_per_month.map(item => ({
                        month: new Date(item.sales_month).toLocaleString('en-US', { month: 'short' }),
                        sales: Math.round(parseFloat(item.total_sales || 0)),
                        year: new Date(item.sales_month).getFullYear(),
                    }));
                } else {
                    this.salesPerMonth = [];
                }

                this.loading = false;
                return response.data;
            } catch (error) {
                console.error("Error fetching sales per month data:", error);
                this.loading = false;
                this.salesPerMonth = [];
                throw error;
            }
        },

        async fetchAllSalesData() {
            try {
                this.loading = true;
                await Promise.all([
                    this.fetchTotalSalesData(), 
                    this.fetchSalesPerMonth(),
                ]);

                this.loading = false;
                return {
                    totalSalesPerYear: this.totalSalesPerYear,
                    salesPerMonth: this.salesPerMonth,
                };
            } catch (error) {
                console.error("Error fetching all sales data:", error);
                this.loading = false;
                throw error;
            }
        },
    },
});
