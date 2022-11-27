<template>
    <section>
        <CabecalhoGeral />
        <div class="columns">
            <div class="column is-3">

            </div>
            <div class="column is-6 lista">
                <div class="box">
                    <div class="columns">
                        <div class="column is-2">
                            <RouterLink to="/empresa/nova" class="button is-primary novo">
                                Novo
                            </RouterLink>
                        </div>
                        <div class="column is-6">

                        </div>
                        <div class="column is-2">
                            <button class="button is-info is-rounded" @click="getCompanies">Recarregar</button>
                        </div>
                    </div>
                </div>
                <div class="media" v-for="company in companies" :key="company.id" @click="openCompanyDetail(company.id)">
                    <div class="media-left">
                        <figure class="image is-128x128">
                            <img :src="company.thumbUrl || thumbDefault" alt="Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content texto-card">
                            <p class="corpo-card">
                                {{company.name}}
                                <br>
                                {{company.document}}
                            </p>
                            <span :class="statusClass[company.status as CompanyStatus]">{{getMethod(company.status)}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import { useStore } from '@/store'
import { CompanyStatus, GetStatusCompany } from '@/enums/company-status';
import CabecalhoGeral from '@/components/CabecalhoGeral.vue';


export default defineComponent({
    name: "ListaEmpresas",
    components: {
        CabecalhoGeral
    },
    data() {
        return {
            statusClass: {
                [CompanyStatus.ACTIVE]: 'tag is-success',
                [CompanyStatus.INACTIVE]: 'tag is-danger',
                [CompanyStatus.PENDING_APPROVAL]: 'tag is-warning',
            },
            thumbDefault: "https://storage.googleapis.com/teste8-182316.appspot.com/default-thumb.png"
        }
    },
    methods: {
        getMethod(status: number) : string {
            return GetStatusCompany(status)
        },
        getCompanies() : void {
            this.store.dispatch('GET_COMPANIES')
        },
        openCompanyDetail(id: number) : void {
            this.$router.push(`/empresa/detalhe/${id}`)
        }
    },
    setup () {
        const store = useStore()
        store.dispatch('GET_COMPANIES')
        return {
            companies: computed(() => store.state.companiesCard),
            store
        }
    }
})

</script>

<style scoped>
.media {
    background-color: seashell;
    padding-top: 0rem;
    border-radius: 10px;
    box-shadow: 5px 5px 5px slategrey;
    cursor: pointer;
}

.lista {
    padding: 25px;
}

.content {
    padding-top: 10px;
    color: aliceblue;
    text-align: left;
}

.texto-card {
    color: darkslategrey;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>