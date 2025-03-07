<template>
    <NavBar />
    <div class="uk-section uk-section-muted uk-height-viewport">
        <div class="uk-container-medium uk-container uk-margin-top">
            <div class="uk-card uk-card-default uk-margin-bottom year-selector">
                <VueDatePicker id="year-picker" v-model="selectedYear" year-picker :clearable="false"
                    :enable-time-picker="false" :max-date="new Date()" :format="formatYear" />
            </div>

            <div class="uk-grid-small uk-child-width-expand@s" uk-grid>
                <div>
                    <StatCard class="uk-height-1-1" title="Total Sales"
                        :value="'$' + dashboardStore.totalSales.toLocaleString('en-US')" icon="/icons/sales.svg"
                        :year="selectedYear" />
                </div>
                <div>
                    <StatCard class="uk-height-1-1" title="Total Orders"
                        :value="dashboardStore.totalOrders.toLocaleString('en-US')" icon="/icons/orders.svg"
                        :year="selectedYear" />
                </div>
                <div>
                    <StatCard class="uk-height-1-1" title="Total Quantity"
                        :value="dashboardStore.totalQuantity.toLocaleString('en-US')" icon="/icons/items.svg"
                        :year="selectedYear" />
                </div>
            </div>

            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-2-3@m">
                    <SalesPerMonth class="uk-height-1-1" :year="selectedYear" />
                </div>
                <div class="uk-width-1-3@m">
                    <TopSalesReps class="uk-height-1-1" :year="selectedYear" />
                </div>
            </div>

            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3@m">
                    <TopSports class="uk-height-1-1" :year="selectedYear" />
                </div>
                <div class="uk-width-2-3@m">
                    <TopCustomers class="uk-height-1-1" :year="selectedYear" />
                </div>
            </div>

            
        </div>
    </div>
    <FooterBar />
</template>

<script>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { useDashboardStore } from '@/stores/dashboard';
import NavBar from '@/components/layouts/NavBar.vue';
import FooterBar from '@/components/layouts/FooterBar.vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import SalesPerMonth from '@/components/dashboard/SalesPerMonth.vue';
import TopSalesReps from '@/components/dashboard/TopSalesReps.vue';
import TopSports from '@/components/dashboard/TopSports.vue';
import TopCustomers from '@/components/dashboard/TopCustomers.vue';

const successSound = new Audio('/sound_effect/success.mp3');
const errorSound = new Audio('/sound_effect/error.mp3');

export default {
    name: 'DashboardPage',
    components: {
        NavBar,
        StatCard,
        SalesPerMonth,
        TopSalesReps,
        TopSports,
        TopCustomers,
        VueDatePicker,
        FooterBar,
    },
    setup() {
        const toast = useToast();
        const dashboardStore = useDashboardStore();
        const selectedYear = ref(new Date().getFullYear());

        const formatYear = (date) => `Year Selected: ${date.getFullYear()}`;

        watch(selectedYear, (newYear, oldYear) => {
            if (newYear !== oldYear) {
                toast.success(`Year changed to ${newYear}`);
                soundEffect(true);
            }
        });

        return {
            dashboardStore,
            selectedYear,
            formatYear,
        };
    },
};

function soundEffect(isSuccess) {
    const sound = isSuccess ? successSound : errorSound;
    sound.currentTime = 0;
    sound.play();
}
</script>

<style scoped>
@import "@/assets/css/views/Dashboard.css";
</style>
