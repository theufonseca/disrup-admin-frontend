<template>
    <section>
        <CabecalhoGeralVue />
        <div class="columns">
            <div class="column is-3">

            </div>
            <div class="column is-4" style="text-align:left; margin-top: 5px">
                <RouterLink class="button is-warning" to="/">
                    <span>Voltar</span>
                </RouterLink>
            </div>
        </div>
        <div class="columns">
            <div class="column is-3">

            </div>
            <div class="column is-6">
                <div class="box" >
                    <div class="columns">
                        <div class="column is-6">
                            <h1 class="title">
                                Nova Empresa
                            </h1>
                        </div>
                    </div>
                    <hr/>
                    <div class="columns">
                        <div class="column is-5">
                            <div class="field">
                                <label class="label">CNPJ*</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="document" placeholder="67236888000137">
                                </div>
                            </div>
                        </div>
                        <div class="column is-7">
                            <div class="field">
                                <label class="label">Razão Social*</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="legalName" placeholder="Empresa teste SA">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-7">
                            <div class="field">
                                <label class="label">Nome Fantasia*</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="fantasyName" placeholder="Empresa Teste">
                                </div>
                            </div>
                        </div>
                        <div class="column is-5">
                            <div class="field">
                                <label class="label">Nome*</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="name" placeholder="Empresinha teste">
                                </div>
                                <p><small>Nome como vai aparecer nas listagens</small></p>
                            </div>
                        </div>
                    </div>
                    <button class="button is-success botao-salvar" @click="saveCompany()">
                        <span class="icon is-small">
                        <i class="fas fa-check"></i>
                        </span>
                        <span>Salvar</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CabecalhoGeralVue from '@/components/CabecalhoGeral.vue';
import INewCompany from '@/interfaces/INewCompany';
import { useStore } from '@/store';

export default defineComponent({
    name: 'FormularioEmpresa',
    data() {
        return {
            document: "",
            legalName: "",
            fantasyName: "",
            name: ""
        }
    },
    methods: {
        saveCompany() {
            if(this.document === "")
            {
                alert("Preencha todos os campos obrigatórios!")
                return
            }
                

            if(this.legalName === "")
            {
                alert("Preencha todos os campos obrigatórios!")
                return
            }

            if(this.fantasyName === "")
            {
                alert("Preencha todos os campos obrigatórios!")
                return
            }

            if(this.name === "")
            {
                alert("Preencha todos os campos obrigatórios!")
                return
            }

            const newCompany: INewCompany = {
                document: this.document,
                name: this.name,
                fantasyName: this.fantasyName,
                legalName: this.legalName
            }

            this.store.dispatch('SAVE_COMPANY', newCompany)
            alert("Salvo com sucesso!");
            this.$router.push("/")
        }
    },
    components: {
        CabecalhoGeralVue
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
.box {
    margin-top: 15px;
}
.formulario{
    width: 50%;
}
.field {
    text-align: left;
}

.botao-salvar {
    width: 100%;
}
</style>