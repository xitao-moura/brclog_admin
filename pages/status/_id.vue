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
            title: "Status",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Status",
                    href: "/status",
                },
                {
                    text: `status id: ${this.$route.params.id}`,
                    active: true,
                },
            ],
            status: {
                id: '',
                nome: ''
            },
            submitted: false
        };
    },
    validations: {
        status: {
            nome: {
                required
            }
        }
    },
    created(){
        
    },
    methods: {
        async getStatus(){
            let doc = await firebase.firestore().collection('status').doc(this.$route.params.id).get()
            this.status = doc.data()
            this.status.id = doc.id
        },
        async updateTipo(){
            this.submitted = true
            this.$v.$touch()

            if (!this.$v.$invalid) {
                let res = await firebase.firestore().collection('status').doc(this.status.id).update(this.status)
                this.$router.push({path: '/status'})
            }
        },
        voltar(){
            this.$router.go(-1)
        }
    },
    mounted() {
        this.getStatus()
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
                        <h4 class="header-title">Usuário</h4>
                        <p class="sub-header">
                            id: {{this.$route.params.id}}.
                        </p>

                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <b-form @submit.prevent="updateTipo">
                                        <b-row class="m-2">
                                            <b-col md="12">
                                                <b-form-input v-model="status.nome" placeholder="Nome" :class="{ 'is-invalid': submitted && $v.status.nome.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.status.nome.required" class="invalid-feedback">Nome é obrigatório.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="12">
                                                <b-button type="button" variant="primary" @click="updateTipo">Salvar</b-button>
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