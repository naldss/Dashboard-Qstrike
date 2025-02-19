<template>
    <div class="uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-height-viewport">
        <div class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
            <img src="/prolook_red.svg" alt="" width="250">
            <div class="uk-text-default uk-text-bold uk-margin">Practice Dashboard</div>
        </div>
        <button @click="logout" class="custom-button uk-width-1-6">Logout</button>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

const logout = () => {
    localStorage.removeItem('authToken');
    toast.success('Account Logged Out');
    router.push('/login');
};
</script>
