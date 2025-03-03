import { defineStore } from "pinia";
import axios from "axios";

export const useTopSportsStore = defineStore("topSports", {
  state: () => ({
    topSports: [],
    loading: false,  // Added loading state
  }),
  
  getters: {
    getTopSports: (state) => state.topSports,
    
    getTopSportsByYear: (state) => (year) => {
      return state.topSports.filter(sport => sport.year === year);
    },
  },
  
  actions: {
    async fetchTopSports() {
      try {
        this.loading = true; 
        const response = await axios.get("/api/topSellingSports");
        
        if (response.data && response.data.top_selling_sports) {
          this.topSports = response.data.top_selling_sports.map(item => ({
            sport: item.sport || 'Unknown',
            sales: Math.round(parseFloat(item.total_sales || 0)),
            year: item.year,
            overallSales: Math.round(parseFloat(item.overall_total_sales || 0))
          }));
        }
        
        this.loading = false; 
        return this.topSports;
      } catch (error) {
        console.error("Error fetching top selling sports:", error);
        this.loading = false;
        throw error;
      }
    },
  },
});