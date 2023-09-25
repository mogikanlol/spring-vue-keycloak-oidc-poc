<template>
  <h1>Hello, World!</h1>
 <div>
    <div class="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/secured">Secured</router-link></li>
      </ul>
    </div>

    <div class="button">
      <div v-if="!isAuthenticated"><button @click="login">Login</button></div>
      <div v-else><button @click="logout">Logout</button></div>
    </div>
    <router-view></router-view>
    
    <div v-if="isAuthenticated">
      <button @click="showTokens = !showTokens">Toggle keycloak tokens</button>
      <div v-show="showTokens">
        <div>
          <button @click="showToken = !showToken">Show token</button>
          <div v-show="showToken">{{ keycloak.token }}</div>
        </div>
        <div>
          <button @click="showTokenParsed = !showTokenParsed">Show parsed token</button>
          <div v-show="showTokenParsed">{{ keycloak.tokenParsed }}</div>
        </div>
        <div>
          <button @click="showIdToken = !showIdToken">Show idToken</button>
          <div v-show="showIdToken">{{ keycloak.idToken }}</div>
        </div>
        <div>
          <button @click="showIdTokenParsed = !showIdTokenParsed">Show idToken parsed</button>
          <div v-show="showIdTokenParsed">{{ keycloak.idTokenParsed }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

import { inject, ref } from 'vue'

const keycloak = inject('keycloak');

const isAuthenticated = ref(keycloak.authenticated);

const showTokens = ref(false);

const showToken = ref(false);
const showTokenParsed = ref(false);
const showIdToken = ref(false);
const showIdTokenParsed = ref(false);

function login() {
    keycloak.login({redirectUri: window.location.origin});
}

function logout() {
    keycloak.logout({redirectUri: window.location.origin});
}
</script>

<style scoped>
  * > * {
    font-size: 1.6rem;
  }
</style>

