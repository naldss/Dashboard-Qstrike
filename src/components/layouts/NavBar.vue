<template>
    <div class="navbar">
        <div class="logo-wrap" @click="$router.push('/dashboard')">
            <img src="/prolook-logo.svg" width="50">
            <div>
                <img src="/prolook-name.svg" alt="Prolook Logo" width="130">
                <div class="practice-dashboard">Practice Dashboard</div>
            </div>
        </div>
        <div class="user-menu" ref="userMenu">
            <img 
                class="user-icon" 
                src="/icons/user.png" 
                alt="user" 
                @click="toggleDropdown"
            >
            <div v-if="showDropdown" class="dropdown-card">
                <div class="dropdown-content">
                    <p class="uk-text-small uk-text-bold uk-text-center uk-text-muted">User Menu</p>
                    <button 
                        @click="logout" 
                        class="custom-button uk-width-1-1"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const userMenu = ref(null);
const showDropdown = ref(false);
const successSound = new Audio('/sound_effect/success.mp3');
const errorSound = new Audio('/sound_effect/error.mp3');

const logout = async () => {
    try {
        localStorage.removeItem('authToken');
        toast.success('Account Logged Out');
        playSound(true);
        await router.push('/login');
        showDropdown.value = false;
    } catch (error) {
        toast.error('Logout failed');
        playSound(false);
    }
};

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const playSound = (isSuccess) => {
    const sound = isSuccess ? successSound : errorSound;
    sound.currentTime = 0;
    sound.play();
};

const closeDropdown = (event) => {
    if (userMenu.value && !userMenu.value.contains(event.target)) {
        showDropdown.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>

<style>
@import "@/assets/css/layouts/NavBar.css";

.user-menu {
    position: relative;
    display: inline-block;
}

.dropdown-card {
    position: absolute;
    right: 0;
    top: 100%;
    background-color: white;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: .4em;
    margin-top: 5px;
}

.dropdown-content {
    padding: 10px;
    color: #333;
}

.user-icon:hover {
    cursor: pointer;
    opacity: 0.8;
}
</style>
