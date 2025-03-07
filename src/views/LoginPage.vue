<template>
    <div class="uk-section uk-section-muted uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
        <div class="uk-card uk-card-default uk-card-body uk-border-rounded custom-auth-card">
            <div class="uk-margin uk-text-center">
                <img src="/prolook_red.svg" alt="Prolook Logo" width="100">
            </div>

            <form @submit.prevent="handleLogin">
                <div class="uk-margin">
                    <input type="email" id="email" v-model="email" class="custom-input uk-input" required
                        placeholder="Email">
                </div>

                <div class="">
                    <input type="password" id="password" v-model="password" class="custom-input uk-input" required
                        placeholder="Password">
                </div>

                <div class="uk-text-center uk-margin-small">
                    <a href="" @click.prevent="featureNotAvailable" class="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" class="custom-button uk-width-1-1">Sign In</button>
            </form>

            <hr>

            <button @click="featureNotAvailable" class="signin-with-google uk-width-1-1">
                <img src="/icons/google.png" alt="Google Logo" width="20" class="uk-margin-small-right"> Sign In with
                Google
            </button>

            <div class="uk-text-center uk-margin-small">
                <a href="" @click.prevent="featureNotAvailable" class="forgot-password dont-have-account-register">Don't
                    have an account? Register</a>
            </div>
        </div>
        <LoaderUtility v-if="isLoading" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import LoaderUtility from '@/components/Utilities/LoaderUtility.vue';
import axios from '@/api/axios';
import { setToken } from '@/utils/token';

const toast = useToast();
const router = useRouter();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const errorSound = new Audio('/sound_effect/error.mp3');
const successSound = new Audio('/sound_effect/success.mp3');

const handleLogin = async () => {
    isLoading.value = true;

    try {
        await axios.get('/sanctum/csrf-cookie');

        const response = await axios.post('/api/login', {
            email: email.value,
            password: password.value,
        });

        const { token, message } = response.data;

        setToken('authToken', token, 7);

        soundEffect(true);
        toast.success(message || 'Welcome to Dashboard!');
        router.push('/dashboard');
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Incorrect Email or Password';
        toast.error(errorMessage);
        soundEffect(false);
    } finally {
        isLoading.value = false;
    }
};

const featureNotAvailable = () => {
    toast.error('Sorry, Feature Not Available.');
    soundEffect(false);
};

function soundEffect(isSuccess) {
    if (isSuccess) {
        successSound.currentTime = 0;
        successSound.play();
    } else {
        errorSound.currentTime = 0;
        errorSound.play();
    }
}
</script>

<style>
@import "@/assets/css/views/auth.css";
</style>