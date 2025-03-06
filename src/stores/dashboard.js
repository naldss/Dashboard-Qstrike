import { defineStore } from 'pinia';
import { useSalesStore } from './sales';
import { useOrdersStore } from './orders';
import { useQuantityStore } from './quantity';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        totalSales: 0,
        totalOrders: 0,
        totalQuantity: 0,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchCardData(year) {
            this.loading = true;
            this.error = null;

            try {
                const salesStore = useSalesStore();
                const ordersStore = useOrdersStore();
                const quantityStore = useQuantityStore();

                // Fetch data from individual stores concurrently
                await Promise.all([
                    salesStore.fetchTotalSalesData(year),
                    ordersStore.fetchOrdersData(year),
                    quantityStore.fetchQuantityData(year),
                ]);

                // Aggregate totals for the selected year
                this.totalSales = salesStore.getTotalSalesPerYear
                    .filter(item => item.year === year)
                    .reduce((sum, item) => sum + (parseFloat(item.total_sales) || 0), 0);
                this.totalSales = Math.round(this.totalSales);

                this.totalOrders = ordersStore.getTotalOrdersPerYear
                    .filter(item => item.year === year)
                    .reduce((sum, item) => sum + (item.total_orders || 0), 0);

                this.totalQuantity = quantityStore.getTotalQuantityPerYear
                    .filter(item => item.year === year)
                    .reduce((sum, item) => sum + (item.total_quantity || 0), 0);

            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load card data';
                console.error('Error fetching card data:', error);
                this.resetState();
            } finally {
                this.loading = false;
            }
        },

        resetState() {
            this.totalSales = 0;
            this.totalOrders = 0;
            this.totalQuantity = 0;
        },
    },
});
