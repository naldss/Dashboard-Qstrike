import { defineStore } from "pinia";
import axios from '@/api/axios';

export const useTopBrandsStore = defineStore("topBrands", {
  state: () => ({
    topBrands: [],
    loading: false,
  }),
  
  getters: {
    getTopBrands: (state) => state.topBrands,
    
    getTopBrandsByYear: (state) => (year) => {
      return state.topBrands.filter(brand => brand.year === year);
    },
  },
  
  actions: {
    async fetchTopBrands() {
      try {
        this.loading = true;
        const response = await axios.get("/api/topBrands");
        
        if (response.data && response.data.brand_sales_per_year) {
          this.topBrands = response.data.brand_sales_per_year.map(item => ({
            name: item.brand_name || 'Unknown',
            sales: Math.round(parseFloat(item.total_sales || 0)),
            year: item.year
          }));
        }
        
        this.loading = false;
        return this.topBrands;
      } catch (error) {
        console.error("Error fetching top brands:", error);
        this.loading = false;
        throw error;
      }
    },
  },
});