<template>
    <section>
        <CabecalhoGeralVue />
        <div class="columns">
            <div class="column is-3">

            </div>
            <div class="column is-6">
                <div class="box">
                    <div class="columns">
                        <div class="column is-3" style="text-align:left; width: 50%;">
                            <button class="button is-danger" @click="deleteCompany">Excluir</button>
                        </div>
                        <div class="column is-3" style="text-align:right; width: 50%;">
                            <RouterLink to="/">
                                <button class="button is-primary">Voltar</button>
                            </RouterLink>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-7">
                            <div class="file has-name">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="resume" @change="savePhoto">
                                    <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Nova capa
                                    </span>
                                    </span>
                                    <span class="file-name">
                                        {{fileName}}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-3">
                            <figure class="image is-128x128" style="margin-bottom: 15px">
                                <img :src="companyData?.photos?.find(x => x.isThumb)?.url || thumbDefault">
                            </figure>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-7" style="text-align:left">
                            <div class="field">
                                Nome
                                <label class="label">{{companyData?.name}}</label>
                            </div>
                        </div>
                        <div class="column is-3" style="text-align:left">
                            <div class="field">
                                CNPJ
                                <label class="label">{{companyData?.document}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-7" style="text-align:left">
                            <div class="field">
                                Razão Social
                                <label class="label">{{companyData?.legalName}}</label>
                            </div>
                        </div>
                        <div class="column is-3" style="text-align:left">
                            <div class="field">
                                Nome Fantasia
                                <label class="label">{{companyData?.fantasyName}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-3" style="text-align: left">
                            <span :class="statusClass[companyData?.status as CompanyStatus]">{{getStatusName(companyData?.status || 0)}}</span>
                        </div>
                        <div class="column is-6" style="text-align: right; margin-left: 15px;" v-if="companyData?.status !== 0">
                            <button class="button is-primary" @click="approveCompany">Ativar</button>
                        </div>
                        <div class="column is-6" style="text-align: right; margin-left: 15px;" v-if="companyData?.status === 0">
                            <button class="button is-danger" @click="inativeCompany">Inativar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import CabecalhoGeralVue from '@/components/CabecalhoGeral.vue';
import { useStore } from '@/store';
import { storeKey } from 'vuex';
import ICompany from '@/interfaces/ICompany';
import { tSExpressionWithTypeArguments } from '@babel/types';
import IPhotoUpload from '@/interfaces/IPhotoUpload';
import { CompanyStatus, GetStatusCompany } from '@/enums/company-status';

export default defineComponent({
    name: 'detalheEmpresa',
    props: {
        id: {
            type: Number
        }
    },
    methods: {
        getStatusName(status: number) : string {
            return GetStatusCompany(status)
        },
        deleteCompany() {
            this.store.dispatch('DELETE_COMPANY', this.companyData?.id)
            this.$router.push('/')
        },
        savePhoto(event : any) {
            if(!this.id) {
                alert("Id da empresa não localizado")
                return
            }

            const photoUpload : IPhotoUpload = {
                companyId: this.id,
                isThumb: true,
                file: event.target.files[0]
            }

            this.store.dispatch('PHOTO_UPLOAD', photoUpload)
            this.store.commit('CLEAN_COMPANY')
            this.store.dispatch('GET_COMPANY', this.id)
            this.$router.push(`/empresa/detalhe/${this.id}`)
        },
        approveCompany() {
            const payload = {
                companyId: this.id,
                newStatus: CompanyStatus.ACTIVE
            }

            this.store.dispatch('UPDATE_STATUS_COMPANY', payload)
        },
        inativeCompany() {
            const payload = {
                companyId: this.id,
                newStatus: CompanyStatus.INACTIVE
            }

            this.store.dispatch('UPDATE_STATUS_COMPANY', payload)
        }
    },
    data() {
        return {
            thumbDefault: "https://storage.googleapis.com/teste8-182316.appspot.com/default-thumb.png",
            fileName: "",
            statusClass: {
                [CompanyStatus.ACTIVE]: 'tag is-success',
                [CompanyStatus.INACTIVE]: 'tag is-danger',
                [CompanyStatus.PENDING_APPROVAL]: 'tag is-warning',
            },
        }
    },
    components: {
        CabecalhoGeralVue
    },
    mounted() {
        this.store.commit('CLEAN_COMPANY')
        this.store.dispatch('GET_COMPANY', this.id)
    },
    computed: {
        companyData() : ICompany | undefined {
            const companyFound = this.store.state.companySelected.find(x => x.id == this.id)
            return companyFound
        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
})
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.box {
    margin-top: 15px;
}
</style>