<template>
    <div class="uk-card uk-card-default uk-card-small uk-card-body cards">
        <div v-if="topSalesRepsStore.loading" class="uk-text-center uk-margin-top-large">
            <span uk-spinner="ratio: 2"></span>
            <div class="uk-margin-medium-top">Loading sales representatives data...</div>
        </div>
        <div v-else-if="error" class="uk-text-center uk-margin-top-large uk-text-danger">
            Failed to load data: {{ error }}
        </div>
        <div v-else>
            <div class="card-title">Top 10 Sales Representatives</div>
            <table class="uk-table uk-table-striped table-card">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(rep, index) in displayedReps" :key="index">
                        <td>{{ rep.rep_name }}</td>
                        <td>{{ rep.sales_rep_brand }}</td>
                        <td>${{ rep.total_sales.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}</td>
                    </tr>
                    <tr v-if="!displayedReps.length">
                        <td colspan="3" class="uk-text-center">No sales representatives found for {{ props.year }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';
import { useTopSalesRepsStore } from '@/stores/topSalesReps';

const props = defineProps({
    year: {
        type: Number,
        required: true,
    },
});

const topSalesRepsStore = useTopSalesRepsStore();
const limit = ref(10);
const error = ref(null);

const fetchData = async () => {
    try {
        error.value = null;
        await topSalesRepsStore.fetchTopSalesReps();
    } catch (err) {
        error.value = err.message || 'Unknown error occurred';
    }
};

onMounted(fetchData);

const displayedReps = computed(() => {
    const filteredReps = topSalesRepsStore.getTopSalesRepsByYear(props.year);
    const result = [...filteredReps]
        .sort((a, b) => b.total_sales - a.total_sales)  // Updated to use total_sales
        .slice(0, limit.value);
    return result;
});
</script>

<style scoped>
.table-card {
    font-size: 13px;
    width: 100%;
}

.table-card th {
    font-size: 13px;
    padding: 0.7em 1em;
    font-weight: 700;
    color: rgb(60, 60, 60);
    text-align: center;
}

.table-card td {
    padding: 0.6em 1em;
    text-align: center;
}

.card-title {
    font-weight: bold;
    margin-bottom: 10px;
}
</style>