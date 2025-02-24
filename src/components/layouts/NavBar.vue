<template>
    <div class="navbar">
        <div class="logo-wrap" @click="$router.push('/dashboard')">
            <img src="/prolook-logo.svg" width="50">
            <div>
                <img src="/prolook-name.svg" alt="Prolook Logo" width="130">
                <div class="practice-dashboard">Practice Dashboard</div>
            </div>
        </div>
        <img class="user-icon" src="/icons/user.png" alt="user">
    </div>
</template>

<script setup>

</script>

<style>
@import "@/assets/css/layouts/NavBar.css";
</style>