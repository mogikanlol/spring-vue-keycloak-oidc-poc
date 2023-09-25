import { createApp } from 'vue'
import App from './App.vue'

import Keycloak from "keycloak-js";

const keycloak = new Keycloak();
keycloak
    .init({
            onLoad: "check-sso",
            pkceMethod: "S256"
    })
    .then( async () => {

        const app = createApp(App);
        app.provide('keycloak', keycloak);
        const router = await import('./router');

        app
            .use(router.default)
            .mount('#app')
    })