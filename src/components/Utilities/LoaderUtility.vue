<template>
    <div tabindex="0" aria-label="Loading" class="vld-overlay is-active is-full-page" style="" aria-busy="true">
        <div class="vld-background" style="backdrop-filter: blur(2px);"></div>
        <div class="vld-icon">
            <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#000" width="50" height="240">
                <circle cx="15" cy="15" r="15">
                    <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="10;5;10" calcMode="linear" repeatCount="indefinite"></animate>
                    <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values=".8;.5;.8" calcMode="linear" repeatCount="indefinite"></animate>
                </circle>
                <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                    <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="5;10;5" calcMode="linear" repeatCount="indefinite"></animate>
                    <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;.8;.5" calcMode="linear" repeatCount="indefinite"></animate>
                </circle>
                <circle cx="105" cy="15" r="15">
                    <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="10;5;10" calcMode="linear" repeatCount="indefinite"></animate>
                    <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values=".8;.5;.8" calcMode="linear" repeatCount="indefinite"></animate>
                </circle>
                <circle cx="140" cy="15" r="9" fill-opacity="0.3">
                    <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="5;10;5" calcMode="linear" repeatCount="indefinite"></animate>
                    <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;.8;.5" calcMode="linear" repeatCount="indefinite"></animate>
                </circle>
                <circle cx="160" cy="15" r="15">
                    <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="10;5;10" calcMode="linear" repeatCount="indefinite"></animate>
                    <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values=".8;.5;.8" calcMode="linear" repeatCount="indefinite"></animate>
                </circle>
            </svg>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LoaderUtility'
    }
</script>
<style lang="scss">
    .vld-overlay {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        align-items: center;
        display: flex;
        justify-content: center;
        overflow: hidden;
        
        &.is-full-page {
            z-index: 9999;
            position: fixed;
        }

        .vld-background {
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            background: #fff;
            opacity: .5;
        }

        .vld-icon {
            position: relative;
        }
    }
</style>