import { inject } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/', 
        component: () => import('../views/Home.vue'),
        name: 'Home',
        meta: {
            requiresAuth: false
        }
    },
    { 
        path: '/secured', 
        component: () => import('../views/Secured.vue'),
        name: 'Secured',
        meta: {
            requiresAuth: true
        }
    },
    {   path: '/unauthorized', 
        component: () => import('../views/Unauthorized.vue'),
        name: 'Unauthorized',
        meta: {
            requiresAuth: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes, 
});

router.beforeEach(
    async (to, from) => {

        const keycloak = inject('keycloak');

        if (to.meta.requiresAuth) {
            if (keycloak.authenticated && keycloak.hasRealmRole('vue-user')) {
                return true;
            }

            else if (keycloak.authenticated) {
                return { name: 'Unauthorized' };
            }

            else {
                const basePath = window.location.toString();
                await keycloak.login({redirectUri: basePath.slice(0, -1) + to.path});
                return true;
            }

        } else {
            return true;
        }
    }
);

export default router;