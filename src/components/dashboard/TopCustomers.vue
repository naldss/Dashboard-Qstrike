<template>
    <div class="uk-card uk-card-default uk-card-small uk-card-body cards">
        <div class="card-title">Top 10 Customers/Brands</div>
        <Bar class="chart" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

export default {
    name: 'TopCustomers',
    components: { Bar },
    props: {
        customersData: Array,
    },
    setup(props) {
        const chartData = computed(() => ({
            labels: props.customersData.map(item => item.name),
            datasets: [{
                label: 'Sales',
                data: props.customersData.map(item => item.sales),
                backgroundColor: '#66BB6A',
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
