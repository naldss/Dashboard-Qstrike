<template>
    <div class="uk-card uk-card-default uk-card-small uk-card-body cards">
        <div v-if="topBrandsStore.loading" class="uk-text-center uk-margin-top-large">
            <span uk-spinner="ratio: 2"></span>
            <div class="uk-margin-medium-top">Loading brands data...</div>
        </div>
        <div v-else>
            <div class="card-title">Top Selling Brands</div>
            <Bar class="chart" :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, defineProps } from 'vue';
import { Bar } from 'vue-chartjs';
import { useTopBrandsStore } from '@/stores/topBrands';

const props = defineProps({
    year: Number,
});

const topBrandsStore = useTopBrandsStore();

onMounted(async () => {
    await topBrandsStore.fetchTopBrands();
});

const filteredBrands = computed(() => {
    return topBrandsStore.topBrands.filter(brand => brand.year === props.year);
});

const chartData = computed(() => ({
    labels: filteredBrands.value.map(item => item.name),
    datasets: [{
        label: '',
        data: filteredBrands.value.map(item => item.sales),
        backgroundColor: '#66BB6A',
    }],
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
        },
        datalabels: {
            display: true,
            formatter: (value) => `$${value.toLocaleString()}`,
        },
    },
};
</script>

<style scoped>
.chart {
    min-height: fit-content;
    padding: 1.5em .5em;
}

.uk-margin-top-large {
    margin-top: 40px;
}

.card-title {
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
