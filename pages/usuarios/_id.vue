<script>
import firebase from 'firebase/app';
import "firebase/firestore";
import {
    required,
    email,
    sameAs,
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
            title: "Usuários",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Usuários",
                    href: "/usuarios",
                },
                {
                    text: `usuário id: ${this.$route.params.id}`,
                    active: true,
                },
            ],
            usuario: {
                id: '',
                nome: '',
                email: '',
                accept: false,
                empresa: '',
                tipo: '',
                status: ''
            },
            submitted: false
        };
    },
    created(){
        
    },
    methods: {
        async getUser(){
            let doc = await firebase.firestore().collection('usuarios').doc(this.$route.params.id).get()
            console.log(doc)
            this.usuario = doc.data()
            this.usuario.id = doc.id

            console.log(this.usuario)
        },
        async updateUser(){
            let res = await firebase.firestore().collection('usuarios').doc(this.usuario.id).update(this.usuario)
            this.$router.push({path: '/usuarios'})
        },
        voltar(){
            this.$router.go(-1)
        }
    },
    mounted() {
        this.getUser()
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
                                    <b-form>
                                        <b-row class="m-2">
                                            <b-col md="4">
                                                <b-form-input v-model="usuario.nome" placeholder="Nome"></b-form-input>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-input v-model="usuario.email" placeholder="Email"></b-form-input>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-checkbox v-model="usuario.accept" name="check-button" :switch="usuario.accept">
                                                    Aceite termo e privacidade
                                                </b-form-checkbox>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="4">
                                                <select id="empresa" class="form-control" v-model="usuario.empresa"> 
                                                    <option>Empresa</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </b-col>
                                            <b-col md="4">
                                                <select id="tipo" class="form-control" v-model="usuario.tipo">
                                                    <option>Tipo</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </b-col>
                                            <b-col md="4">
                                                <select id="outros" class="form-control" v-model="usuario.status">
                                                    <option>Status</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="12">
                                                <b-button type="button" variant="primary" @click="updateUser">Salvar</b-button>
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