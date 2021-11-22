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
                    text: `novo status`,
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
        async saveStatus(){
            this.submitted = true
            this.$v.$touch()

            if (!this.$v.$invalid) {
                await firebase
                        .firestore()
                        .collection("status")
                        .doc()
                        .set({
                            nome: this.status.nome
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
                        <h4 class="header-title">Status</h4>
                        <p class="sub-header">
                            novo status.
                        </p>

                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <b-form @submit.prevent="saveStatus">
                                        <b-row class="m-2">
                                            <b-col md="12">
                                                <b-form-input v-model="status.nome" placeholder="Nome" :class="{ 'is-invalid': submitted && $v.status.nome.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.status.nome.required" class="invalid-feedback">Nome é obrigatório.</div>
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