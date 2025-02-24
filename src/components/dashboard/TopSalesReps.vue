<template>
    <div class="uk-card uk-card-default uk-card-small uk-card-body cards">
        <div class="card-title">Top 10 Sales Representatives</div>
        <table class="uk-table uk-table-striped table-card">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sales</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(rep, index) in reps" :key="index">
                    <td>{{ rep.name }}</td>
                    <td>${{ rep.sales.toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TopSalesReps',
    props: {
        reps: Array,
    },
};
</script>

<style scoped>
/* @import "@/assets/css/views/Dashboard.css"; */

.table-card {
    font-size: 13px;
    width: 100%;
}

.table-card th {
    font-size: 13px;
    padding: 0.7em 1em;
    
    font-weight: 700;
    color: rgb(60, 60, 60);
}

.table-card td {
    padding: 0.6em 1em;
}
</style>