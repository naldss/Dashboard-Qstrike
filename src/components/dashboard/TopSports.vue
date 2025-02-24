<template>
    <div class="uk-card uk-card-default uk-card-small uk-card-body cards">
        <div class="card-title">Top Selling Sports</div>
        <Pie class="chart" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

export default {
    name: 'TopSports',
    components: { Pie },
    props: {
        sportsData: Array,
    },
    setup(props) {
        const chartData = computed(() => ({
            labels: props.sportsData.map(item => item.sport),
            datasets: [{
                data: props.sportsData.map(item => item.sales),
            }],
        }));

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    color: '#fff',
                    formatter: value => value.toLocaleString(),
                },
            },
        };

        return { chartData, chartOptions };
    },
};
</script>

<style scoped>
/* @import "@/assets/css/views/Dashboard.css"; */

.chart {
    padding: 1.5em;
}


</style>
