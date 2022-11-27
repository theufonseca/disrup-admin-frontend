<template>
    <section>
        <nav class="nav cabecalho">
            <div class="nav-center">
                <a class="nav-item">
                <h1 class="title">DISRUP - ADMIN</h1>
                <h2 class="subtitle">Sua plataforma de busca de empresas que realmente valham à pena trabalhar!</h2>
                </a>
            </div>
        </nav>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CabecalhoGeral'
})
</script>

<style scoped>
.cabecalho {
    background-color: cornflowerblue;
    height: 150px;
}

.title {
    color: aliceblue;
}

.subtitle {
    color: aliceblue;
}

.nav-center {
    padding-top: 30px;
}
</style>