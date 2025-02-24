<template>
    <div class="uk-card uk-card-default uk-card-small uk-card-body cards">
        <div class="card-title">Sales Per Month</div>
        <Bar class="chart" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs'; // Correct import: 'Bar', not 'BarChart'
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

export default {
    name: 'SalesPerMonth',
    components: { Bar },
    props: {
        salesData: Array,
    },
    setup(props) {
        const chartData = computed(() => ({
            labels: props.salesData.map(item => item.month),
            datasets: [{
                label: 'Sales',
                data: props.salesData.map(item => item.sales),
                backgroundColor: '#42A5F5',
            }],
        }));

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
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
    min-height: fit-content;
    padding: 1.5em .5em;
}

</style>
