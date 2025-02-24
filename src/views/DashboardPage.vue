<template>
    <NavBar />

    <div class="uk-section uk-section-muted uk-height-viewport">
        <div class="uk-container-medium uk-container uk-margin-top">
            <!-- Year Selector -->
            <div class="uk-card uk-card-default uk-margin-bottom year-selector">
                <VueDatePicker id="year-picker" v-model="selectedYear" :year-picker="true" :clearable="false"
                    :enable-time-picker="false" :max-date="new Date()" @update:model-value="updateYear"
                    :format="formatYear">
                </VueDatePicker>
            </div>


            <div class="uk-grid-small uk-child-width-expand@s" uk-grid>
                <div>
                    <StatCard class="uk-height-1-1" title="Total Sales"
                        :value="dashboardStore.totalSales.toLocaleString()" icon="/icons/sales.svg" />
                </div>
                <div>
                    <StatCard class="uk-height-1-1" title="Total Orders"
                        :value="dashboardStore.totalOrders.toLocaleString()" icon="/icons/orders.svg" />
                </div>
                <div>
                    <StatCard class="uk-height-1-1" title="Total Quantity"
                        :value="dashboardStore.totalQuantity.toLocaleString()" icon="/icons/items.svg" />
                </div>
            </div>

            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-2-3@m">
                    <SalesPerMonth class="uk-height-1-1" :sales-data="dashboardStore.salesPerMonth" />
                </div>
                <div class="uk-width-1-3@m">
                    <TopSalesReps class="uk-height-1-1" :reps="dashboardStore.topSalesReps.slice(0, 10)" />
                </div>
            </div>

            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3@m">
                    <TopSports class="uk-height-1-1" :sports-data="dashboardStore.topSports" />
                </div>
                <div class="uk-width-2-3@m">
                    <TopCustomers class="uk-height-1-1" :customers-data="dashboardStore.topCustomers.slice(0, 10)" />
                </div>
            </div>

            <button @click="logout" class="custom-button uk-width-1-6 uk-margin-top">Logout</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { useDashboardStore } from '@/stores/dashboard';
import NavBar from '@/components/layouts/NavBar.vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import SalesPerMonth from '@/components/dashboard/SalesPerMonth.vue';
import TopSalesReps from '@/components/dashboard/TopSalesReps.vue';
import TopSports from '@/components/dashboard/TopSports.vue';
import TopCustomers from '@/components/dashboard/TopCustomers.vue';

export default {
    name: 'DashboardPage',
    components: {
        NavBar,
        VueDatePicker,
        StatCard,
        SalesPerMonth,
        TopSalesReps,
        TopSports,
        TopCustomers,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();
        const dashboardStore = useDashboardStore();

        const selectedYear = ref(dashboardStore.selectedYear);

        const formatYear = (date) => {
            return date ? `Year Selected: ${date.getFullYear()}` : 'Select Year';
        };

        const logout = () => {
            localStorage.removeItem('authToken');
            toast.success('Account Logged Out');
            router.push('/login');
        };

        const updateYear = (year) => {
            dashboardStore.setYear(year);
        };

        const openDatePicker = () => {
            document.querySelector('.date-picker button').click();
        };

        return {
            dashboardStore,
            selectedYear,
            logout,
            updateYear,
            openDatePicker,
            formatYear,
        };
    },
};
</script>

<style scoped>
@import "@/assets/css/views/Dashboard.css";
</style>