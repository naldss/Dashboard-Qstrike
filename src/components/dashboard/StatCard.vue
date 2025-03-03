<template>
    <div class="uk-card uk-card-default uk-card-body cards">
        <div v-if="loading" class="uk-text-center">
            <span uk-spinner="ratio: 1.5"></span>
        </div>
        <div v-else-if="error" class="uk-text-center uk-text-danger">
            {{ error }}
        </div>
        <div v-else class="uk-flex uk-flex-middle">
            <img :src="icon" alt="" width="65">
            <div class="uk-margin-small-left">
                <div class="value">{{ value }}</div>
                <div class="title">{{ title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';

export default {
    name: 'StatCard',
    props: {
        title: String,
        value: [String, Number],
        icon: String,
        year: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const dashboardStore = useDashboardStore();
        const loading = ref(true);
        const error = ref(null);

        const fetchData = async () => {
            loading.value = true;
            error.value = null;

            try {
                await dashboardStore.fetchCardData(props.year);
                loading.value = false;
            } catch (err) {
                loading.value = false;
                error.value = err.message || 'Failed to load data';
            }
        };

        onMounted(fetchData);

        watch(() => props.year, fetchData);

        return {
            loading,
            error,
        };
    },
};
</script>

<style scoped>
.cards:hover .title {
    opacity: .9;
}

.title {
    font-size: 1em;
    font-weight: 600;
    opacity: .8;
}

.value {
    font-size: 2em;
    font-weight: 700;
}
</style>
