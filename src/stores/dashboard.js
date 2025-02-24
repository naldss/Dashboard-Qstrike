import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        totalSales: 150000,      // Placeholder: Replace with axios call to Total Sales API
        totalOrders: 1200,       // Placeholder: Replace with axios call to Total Orders API
        totalQuantity: 4500,     // Placeholder: Replace with axios call to Total Quantity API
        salesPerMonth: [
            { month: 'Jan', sales: 12000 },
            { month: 'Feb', sales: 15000 },
            { month: 'Mar', sales: 13000 },
            { month: 'Apr', sales: 14000 },
            { month: 'May', sales: 16000 },
            { month: 'Jun', sales: 17000 },
            { month: 'Jul', sales: 18000 },
            { month: 'Aug', sales: 15000 },
            { month: 'Sep', sales: 14000 },
            { month: 'Oct', sales: 13000 },
            { month: 'Nov', sales: 12000 },
            { month: 'Dec', sales: 19000 },
        ], // Placeholder: Replace with axios call
        topSalesReps: [
            { name: 'John Doe', sales: 25000 },
            { name: 'Jane Smith', sales: 22000 },
            { name: 'Mike Johnson', sales: 20000 },
            { name: 'Sara Lee', sales: 18000 },
            { name: 'Tom Brown', sales: 17000 },
            { name: 'Emily Davis', sales: 16000 },
            { name: 'Chris Wilson', sales: 15000 },
            { name: 'Anna Taylor', sales: 14000 },
            { name: 'David Clark', sales: 13000 },
            { name: 'Lisa White', sales: 12000 },
        ], // Placeholder: Replace with axios call
        topSports: [
            { sport: 'Football', sales: 50000 },
            { sport: 'Basketball', sales: 40000 },
            { sport: 'Tennis', sales: 30000 },
            { sport: 'Soccer', sales: 20000 },
        ], // Placeholder: Replace with axios call
        topCustomers: [
            { name: 'Brand A', sales: 30000 },
            { name: 'Brand B', sales: 28000 },
            { name: 'Brand C', sales: 26000 },
            { name: 'Brand D', sales: 24000 },
            { name: 'Brand E', sales: 22000 },
            { name: 'Brand F', sales: 20000 },
            { name: 'Brand G', sales: 18000 },
            { name: 'Brand H', sales: 16000 },
            { name: 'Brand I', sales: 14000 },
            { name: 'Brand J', sales: 12000 },
        ], // Placeholder: Replace with axios call
        selectedYear: 2024,
    }),
    actions: {
        // Example API fetch (uncomment when ready)
        /*
        async fetchDashboardData() {
            const response = await axios.get('/api/dashboard');
            this.totalSales = response.data.totalSales;
            this.totalOrders = response.data.totalOrders;
            this.totalQuantity = response.data.totalQuantity;
            this.salesPerMonth = response.data.salesPerMonth;
            this.topSalesReps = response.data.topSalesReps;
            this.topSports = response.data.topSports;
            this.topCustomers = response.data.topCustomers;
        },
        */
        setYear(year) {
            this.selectedYear = year;
            // Trigger API fetch here when implemented
        },
    },
});