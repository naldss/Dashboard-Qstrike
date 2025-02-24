<template>
    <div class="uk-card uk-card-default uk-card-body cards">
        <div class="uk-flex uk-flex-middle">
            <img :src="icon" alt="" width="65">
            <div class="uk-margin-small-left">
                <div class="value">{{ value }}</div>
                <div class="title">{{ title }}</div>
            </div>
        </div>



    </div>
</template>

<script>
export default {
    name: 'StatCard',
    props: {
        title: String,
        value: [String, Number],
        icon: String,
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
