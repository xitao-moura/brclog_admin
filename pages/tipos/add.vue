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
            title: "Tipos",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Tipos",
                    href: "/tipos",
                },
                {
                    text: `novo tipo`,
                    active: true,
                },
            ],
            tipo: {
                id: '',
                nome: ''
            },
            submitted: false
        };
    },
    validations: {
        tipo: {
            nome: {
                required
            }
        }
    },
    created(){
        
    },
    methods: {
        async saveTipo(){
            this.submitted = true
            this.$v.$touch()

            if (!this.$v.$invalid) {
                await firebase
                        .firestore()
                        .collection("tipos")
                        .doc()
                        .set({
                            nome: this.tipo.nome
                        })

                    this.$router.go(-1)
            }
        },
        voltar(){
            this.$router.go(-1)
        }
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
                        <h4 class="header-title">Tipo</h4>
                        <p class="sub-header">
                            novo tipo.
                        </p>

                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <b-form @submit.prevent="saveTipo">
                                        <b-row class="m-2">
                                            <b-col md="12">
                                                <b-form-input v-model="tipo.nome" placeholder="Nome" :class="{ 'is-invalid': submitted && $v.tipo.nome.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.tipo.nome.required" class="invalid-feedback">Nome é obrigatório.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="12">
                                                <b-button type="button" variant="primary" @click="saveTipo">Salvar</b-button>
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