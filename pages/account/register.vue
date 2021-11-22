<script>
import {
    required,
    email
} from "vuelidate/lib/validators";

/**
 * Register component
 */
export default {
    name: "account-register",
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: "",
                accept: false
            },
            submitted: false,
            regError: null,
            tryingToRegister: false,
            isRegisterError: false,
            registerSuccess: false,
        };
    },
    layout: "auth-2",
    computed: {
        notification() {
            return this.$store ? this.$store.state.notification : null;
        },
        notificationAutoCloseDuration() {
            return this.$store && this.$store.state.notification ? 5 : 0;
        },
    },
    validations: {
        user: {
            username: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
            accept: {
                required
            }
        },
    },
    created() {},
    methods: {
        // Try to register the user in with the email, username
        // and password they provided.
        tryToRegisterIn() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            } else {
                if (process.env.auth === "firebase") {
                    this.tryingToRegister = true;
                    // Reset the regError if it existed.
                    this.regError = null;
                    return (
                        this.$store
                        .dispatch("auth/register", {
                            email: this.user.email,
                            password: this.user.password,
                            nome: this.user.username,
                            accept: this.user.accept
                        })
                        // eslint-disable-next-line no-unused-vars
                        .then((token) => {
                            this.tryingToRegister = false;
                            this.isRegisterError = false;
                            this.registerSuccess = true;
                            if (this.registerSuccess) {
                                this.$router.push(
                                    this.$route.query.redirectFrom || {
                                        path: "/"
                                    }
                                );
                            }
                        })
                        .catch((error) => {
                            this.tryingToRegister = false;
                            this.regError = error ? error : "";
                            this.isRegisterError = true;
                        })
                    );
                } else if (process.env.auth === "fakebackend") {
                    const {
                        email,
                        username,
                        password
                    } = this.user;
                    if (email && username && password) {
                        this.$store.dispatch("authfack/registeruser", this.user);
                        this.$store.dispatch('notification/clear')
                    }
                }
            }
        },
    },
};
</script>

<template>
<div>
    <!-- Logo -->
    <div class="auth-brand text-center text-lg-left">
        <div class="auth-logo">
            <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-lg">
                    <img src="~/assets/images/logo-brc.png" alt height="70" />
                </span>
            </nuxt-link>

            <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-lg">
                    <img src="~/assets/images/logo-brc.png" alt height="70" />
                </span>
            </nuxt-link>
        </div>
    </div>

    <!-- title-->
    <h4 class="mt-0">Cadastre-se</h4>
    <p class="text-muted mb-4">Não tem conta? Crie sua própria conta, leva menos de um minuto</p>

    <form action="#" @submit.prevent="tryToRegisterIn">
        <b-alert v-model="registerSuccess" class="mt-3" variant="success" dismissible>Registrado com sucesso.</b-alert>

        <b-alert v-model="isRegisterError" class="mt-3" variant="danger" dismissible :show="notificationAutoCloseDuration">{{regError}}</b-alert>

        <b-alert :variant="notification.type" class="mt-3" v-if="notification.message" :show="notificationAutoCloseDuration" dismissible>{{notification.message}}</b-alert>

        <div class="form-group">
            <label for="fullname">Nome</label>
            <input class="form-control" v-model="user.username" type="text" id="fullname" placeholder="nome" :class="{ 'is-invalid': submitted && $v.user.username.$error }" />
            <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">Nome é obrigatório.</div>
        </div>
        <div class="form-group">
            <label for="emailaddress">Email</label>
            <input class="form-control" v-model="user.email" type="email" id="emailaddress" :class="{ 'is-invalid': submitted && $v.user.email.$error }" placeholder="email" />
            <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                <span v-if="!$v.user.email.required">Email é obrigatório.</span>
                <span v-if="!$v.user.email.email">Por favor insira um email válido.</span>
            </div>
        </div>
        <div class="form-group">
            <label for="password">Senha</label>
            <div class="input-group input-group-merge">
                <input type="password" v-model="user.password" id="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" placeholder="senha" />
                <div class="input-group-append" data-password="false">
                    <div class="input-group-text">
                        <span class="password-eye"></span>
                    </div>
                </div>
                <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">Senha é obrigatória.</div>
            </div>
        </div>
        <div class="form-group">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" v-model="user.accept" class="custom-control-input" id="checkbox-signup" :class="{ 'is-invalid': submitted && $v.user.accept.$error }"/>
                <label class="custom-control-label" for="checkbox-signup">
                    Aceito
                    <a href="javascript: void(0);" class="text-dark">Termos e Condições</a>
                </label>
                <div v-if="submitted && !$v.user.accept.required" class="invalid-feedback">Aceite é obrigatória.</div>
            </div>
        </div>
        <div class="form-group mb-0 text-center">
            <button class="btn btn-primary btn-block" type="submit">Cadastrar</button>
        </div>

        <!-- <div class="text-center mt-4">
            <h5 class="mt-0 text-muted">Sign Up using</h5>
            <ul class="social-list list-inline mt-3 mb-0">
                <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-purple text-purple">
                        <i class="mdi mdi-facebook"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-danger text-danger">
                        <i class="mdi mdi-google"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-info text-info">
                        <i class="mdi mdi-twitter"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary">
                        <i class="mdi mdi-github"></i>
                    </a>
                </li>
            </ul>
        </div> -->
    </form>

    <!-- Footer-->
    <footer class="footer footer-alt">
        <p class="text-muted">
            Já tem conta?
            <nuxt-link to="/account/login" class="text-primary font-weight-medium ml-1">Entrar</nuxt-link>
        </p>
    </footer>
</div>
</template>
