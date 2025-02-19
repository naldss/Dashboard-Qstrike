import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import DashboardPage from './views/DashboardPage.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToken');

    if (to.path === '/login' && isAuthenticated) {
        next('/dashboard');
    } else if (to.path === '/dashboard' && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
