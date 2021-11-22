<script>
import firebase from 'firebase/app';
import "firebase/firestore";
import {
    required,
    email
} from 'vuelidate/lib/validators'
/**
 * Form elements component
 */
export default {
    head() {
        return {
            title: `${this.title} | BRCLog admin`,
        };
    },
    data() {
        return {
            title: "Empresa",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Empresa",
                    href: "/empresa",
                },
                {
                    text: `empresa id: ${this.$route.params.id}`,
                    active: true,
                },
            ],
            empresa: {
                id: '',
                razao_social: '',
                nome_fantasia: '',
                cnpj: null,
                telefone: null,
                email: ''
            },
            submit: false,
            submitted: false
        };
    },
    validations: {
        empresa: {
            razao_social: {
                required
            },
            nome_fantasia: {
                required
            },
            cnpj:  {
                required
            },
            telefone:  {
                required
            },
            email:  {
                required,
                email
            }
        }
    },
    created(){
        
    },
    methods: {
        async getEmpresa(){
            let doc = await firebase.firestore().collection('empresas').doc(this.$route.params.id).get()
            this.empresa = doc.data()
            this.empresa.id = doc.id
        },
        async updateEmpresa(){
            this.submitted = true

            this.$v.$touch()
            if (!this.$v.$invalid) {
                await firebase.firestore().collection('empresas').doc(this.empresa.id).update(this.empresa)
                this.$router.push({path: '/empresas'})
            }
        },
        voltar(){
            this.$router.go(-1)
        }
    },
    mounted() {
        this.getEmpresa()
    },
    middleware: "router-auth",
};
</script>
<template>
    <div>
        <PageHeader :title="title" :items="items" />

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Empresa</h4>
                        <p class="sub-header">
                            id: {{this.$route.params.id}}.
                        </p>

                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <b-form @submit.prevent="updateEmpresa">
                                        <b-row class="m-2">
                                            <b-col md="6">
                                                <b-form-input v-model="empresa.razao_social" placeholder="Razão social" :class="{ 'is-invalid': submitted && $v.empresa.razao_social.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.empresa.razao_social.required" class="invalid-feedback">Razão social é obrigatório.</div>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-input v-model="empresa.nome_fantasia" placeholder="Nome fantasia" :class="{ 'is-invalid': submitted && $v.empresa.nome_fantasia.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.empresa.nome_fantasia.required" class="invalid-feedback">Nome fantasia é obrigatório.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="4">
                                                <b-form-input v-mask="'##.###.###/####-##'" v-model="empresa.cnpj" placeholder="Cnpj" :class="{ 'is-invalid': submitted && $v.empresa.cnpj.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.empresa.cnpj.required" class="invalid-feedback">Cnpj é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-input v-mask="'(##) #####-####'" v-model="empresa.telefone" placeholder="Telefone" :class="{ 'is-invalid': submitted && $v.empresa.telefone.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.empresa.telefone.required" class="invalid-feedback">Telefone é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-input v-model="empresa.email" placeholder="Email" :class="{ 'is-invalid': submitted && $v.empresa.email.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.empresa.email.required" class="invalid-feedback">Email é obrigatório.</div>
                                                <div v-if="submitted && !$v.empresa.email.email" class="invalid-feedback">Informe um email válido.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="12">
                                                <b-button type="submit" variant="primary">Salvar</b-button>
                                                <b-button type="button" variant="warning" @click="voltar">Voltar</b-button>
                                            </b-col>
                                        </b-row>
                                    </b-form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>