<template>
    <div>
        <p>This is Secured page. You can see it only if you are authenticated and have the role 'vue-user'</p>
        <p>Hello dear Hunter. The treasure you are looking for located at {{ treasureLocation.value }}</p>
    </div>
</template>

<script setup>
import axios from 'axios'
import { inject, onMounted, reactive } from 'vue'

const keycloak = inject('keycloak');

const treasureLocation = reactive({});

onMounted(async () => {
    await axios.get(
            'http://localhost:8082/treasure-location', { 
                headers: { 
                    'Authorization': "Bearer " + keycloak.token
                }
            })
        .then(response => {
            treasureLocation.value = response.data;
        });

})

</script>