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
                status: '',
                password: '',
                repassword: ''
            },
            submitted: false
        };
    },
    validations: {
        usuario: {
            nome: {
                required
            },
            email: {
                email,
                required
            },
            accept: {
                required
            },
            empresa: {
                required
            },
            tipo: {
                required
            },
            status: {
                required
            },
            password: {
                required
            },
            repassword: {
                required,
                sameAsPassword: sameAs('password')
            },
        }
    },
    created(){
        
    },
    methods: {
        async saveUser(){

            this.submitted = true
            this.$v.$touch()

            if (!this.$v.$invalid) {
                firebase.auth().createUserWithEmailAndPassword(this.usuario.email, this.usuario.password).then( async (user) => {
                // eslint-disable-next-line no-redeclare
                var user = firebase.auth().currentUser;

                await firebase
                    .firestore()
                    .collection("usuarios")
                    .doc()
                    .set({
                        nome: this.usuario.nome,
                        email: this.usuario.email,
                        accept: this.usuario. accept,
                        user_id: user.uid,
                        empresa: this.usuario.empresa,
                        tipo: this.usuario.tipo,
                        password: this.usuario.password
                    })

                this.$router.go(-1)
            }, (error) => {
                console.log(error)
            });
            }
        },
        voltar(){
            this.$router.go(-1)
        }
    },
    mounted() {
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
                            novo usuário.
                        </p>

                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <b-form @submit.prevent="saveUser">
                                        <b-row class="m-2">
                                            <b-col md="4">
                                                <b-form-input v-model="usuario.nome" placeholder="Nome" :class="{ 'is-invalid': submitted && $v.usuario.nome.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.usuario.nome.required" class="invalid-feedback">Nome é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-input v-model="usuario.email" placeholder="Email" :class="{ 'is-invalid': submitted && $v.usuario.email.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.usuario.email.required" class="invalid-feedback">Email é obrigatório.</div>
                                                <div v-if="submitted && !$v.usuario.email.email" class="invalid-feedback">Informe um email válido.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-checkbox v-model="usuario.accept" name="check-button" :switch="usuario.accept" :class="{ 'is-invalid': submitted && $v.usuario.accept.$error }">
                                                    Aceite termo e privacidade
                                                </b-form-checkbox>
                                                <div v-if="submitted && !$v.usuario.accept.required" class="invalid-feedback">Aceite termo e privacidade é obrigatório.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="4">
                                                <select id="inputEmpresa" class="form-control" v-model="usuario.empresa" :class="{ 'is-invalid': submitted && $v.usuario.empresa.$error }">
                                                    <option selected>Empresa</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                                <div v-if="submitted && !$v.usuario.empresa.required" class="invalid-feedback">Empresa é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <select id="inputTipo" class="form-control" v-model="usuario.tipo" :class="{ 'is-invalid': submitted && $v.usuario.tipo.$error }">
                                                    <option selected>Tipo</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                                <div v-if="submitted && !$v.usuario.tipo.required" class="invalid-feedback">Tipo é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <select id="inputStatus" class="form-control" v-model="usuario.status" :class="{ 'is-invalid': submitted && $v.usuario.status.$error }">
                                                    <option selected>Status</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                                <div v-if="submitted && !$v.usuario.status.required" class="invalid-feedback">Status é obrigatório.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="6">
                                                <b-form-input v-model="usuario.password" placeholder="Senha" type="password" :class="{ 'is-invalid': submitted && $v.usuario.password.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.usuario.password.required" class="invalid-feedback">Senha é obrigatório.</div>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-input v-model="usuario.repassword" placeholder="Confirma senha" type="password" :class="{ 'is-invalid': submitted && $v.usuario.repassword.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.usuario.repassword.required" class="invalid-feedback">Confirma senha é obrigatório.</div>
                                                <div v-if="submitted && !$v.usuario.repassword.sameAsPassword" class="invalid-feedback">As senha não são iguais.</div>
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