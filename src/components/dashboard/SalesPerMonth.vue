<template>
    <div class="uk-card uk-card-default uk-card-small uk-card-body cards">
        <div v-if="salesStore.loading" class="uk-text-center uk-margin-top-large">
            <span uk-spinner="ratio: 2"></span>
            <div class="uk-margin-medium-top">Loading sales data...</div>
        </div>
        <div v-else>
            <div class="card-title">Sales Per Month</div>
            <Bar class="chart" :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, defineProps } from 'vue';
import { Bar } from 'vue-chartjs';
import { useSalesStore } from '@/stores/sales';

const props = defineProps({
    year: Number,
});

const salesStore = useSalesStore();

onMounted(async () => {
    await salesStore.fetchAllSalesData();
});

const filteredSales = computed(() => {
    return salesStore.salesPerMonth.filter(sale => sale.year === props.year);
});

const chartData = computed(() => ({
    labels: filteredSales.value.map(item => item.month),
    datasets: [{
        label: 'Sales',
        data: filteredSales.value.map(item => item.sales),
        backgroundColor: '#42A5F5',
    }],
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: { display: false },
        datalabels: {
            display: true,
            formatter: (value) => {
                // Format as abbreviated currency
                if (value >= 1000000) {
                    return `$${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                    return `$${(value / 1000).toFixed(1)}K`;
                } else {
                    return `$${value}`;
                }
            },
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
