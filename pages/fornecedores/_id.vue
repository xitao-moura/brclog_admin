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
            title: "Fornecedor",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Fornecedor",
                    href: "/fornecedor",
                },
                {
                    text: `empresa id: ${this.$route.params.id}`,
                    active: true,
                },
            ],
            fornecedor: {
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
        fornecedor: {
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
        async getFornecedor(){
            let doc = await firebase.firestore().collection('fornecedores').doc(this.$route.params.id).get()
            this.fornecedor = doc.data()
            this.fornecedor.id = doc.id
        },
        async updateFornecedor(){
            this.submitted = true

            this.$v.$touch()
            if (!this.$v.$invalid) {
                await firebase.firestore().collection('fornecedores').doc(this.fornecedor.id).update(this.fornecedor)
                this.$router.push({path: '/fornecedor'})
            }
        },
        voltar(){
            this.$router.go(-1)
        }
    },
    mounted() {
        this.getFornecedor()
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
                        <h4 class="header-title">Fornecedor</h4>
                        <p class="sub-header">
                            id: {{this.$route.params.id}}.
                        </p>

                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <b-form @submit.prevent="updateFornecedor">
                                        <b-row class="m-2">
                                            <b-col md="6">
                                                <b-form-input v-model="fornecedor.razao_social" placeholder="Razão social" :class="{ 'is-invalid': submitted && $v.fornecedor.razao_social.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.fornecedor.razao_social.required" class="invalid-feedback">Razão social é obrigatório.</div>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-input v-model="fornecedor.nome_fantasia" placeholder="Nome fantasia" :class="{ 'is-invalid': submitted && $v.fornecedor.nome_fantasia.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.fornecedor.nome_fantasia.required" class="invalid-feedback">Nome fantasia é obrigatório.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="4">
                                                <b-form-input v-mask="'##.###.###/####-##'" v-model="fornecedor.cnpj" placeholder="Cnpj" :class="{ 'is-invalid': submitted && $v.fornecedor.cnpj.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.fornecedor.cnpj.required" class="invalid-feedback">Cnpj é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-input v-mask="'(##) #####-####'" v-model="fornecedor.telefone" placeholder="Telefone" :class="{ 'is-invalid': submitted && $v.fornecedor.telefone.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.empresa.telefone.required" class="invalid-feedback">Telefone é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-input v-model="fornecedor.email" placeholder="Email" :class="{ 'is-invalid': submitted && $v.fornecedor.email.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.fornecedor.email.required" class="invalid-feedback">Email é obrigatório.</div>
                                                <div v-if="submitted && !$v.fornecedor.email.email" class="invalid-feedback">Informe um email válido.</div>
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