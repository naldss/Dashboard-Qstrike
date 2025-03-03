<template>
    <div class="uk-card uk-card-default uk-card-small uk-card-body cards">
        <div v-if="topSportsStore.loading" class="uk-text-center uk-margin-top-large">
            <span uk-spinner="ratio: 2"></span>
            <div class="uk-margin-medium-top">Loading sports data...</div>
        </div>
        <div v-else>
            <div class="card-title">Top Selling Sports</div>
            <Pie class="chart" :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, defineProps } from 'vue';
import { Pie } from 'vue-chartjs';
import { useTopSportsStore } from '@/stores/topSports';

const props = defineProps({
    year: Number,
});

const topSportsStore = useTopSportsStore();

onMounted(async () => {
    await topSportsStore.fetchTopSports();
});

const filteredSports = computed(() => {
    return topSportsStore.topSports.filter(sport => sport.year === props.year);
});

const chartData = computed(() => ({
    labels: filteredSports.value.map(item => item.sport),
    datasets: [{
        data: filteredSports.value.map(item => item.sales),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CB3F', '#7F7F7F'],
    }],
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: { position: 'bottom' },
        datalabels: {
            display: true,
            formatter: (value, context) => {
                let sum = 0;
                const dataArr = context.chart.data.datasets[0].data;
                dataArr.forEach(data => {
                    sum += data;
                });
                const percentage = ((value / sum) * 100).toFixed(0) + '%';
                return percentage;
            },
        },
    },
};

</script>

<style scoped>
.chart {
    padding: 1.5em;
}

.uk-margin-top-large {
    margin-top: 40px;
}

.card-title {
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
