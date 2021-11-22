<script>
import {
    required,
    email
} from "vuelidate/lib/validators";

/**
 * Login component
 */
export default {
    head() {
        return {
            title: `Login | BRCLog Admin`,
        };
    },
    data() {
        return {
            email: null,
            password: null,
            submitted: false,
            authError: null,
            tryingToLogIn: false,
            isAuthError: false,
        };
    },
    computed: {
        notification() {
            return this.$store ? this.$store.state.notification : null;
        },
        notificationAutoCloseDuration() {
            return this.$store && this.$store.state.notification ? 5 : 0;
        },
    },
    created() {},
    validations: {
        email: {
            required,
            email
        },
        password: {
            required
        },
    },
    methods: {
        // Try to log the user in with the username
        // and password they provided.
        tryToLogIn() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            } else {
                if (process.env.auth === "firebase") {
                    this.tryingToLogIn = true;
                    // Reset the authError if it existed.
                    this.authError = null;
                    return (
                        this.$store.dispatch('auth/logIn', {
                            email: this.email,
                            password: this.password,
                        })
                        // eslint-disable-next-line no-unused-vars
                        .then((token) => {
                            this.tryingToLogIn = false;
                            this.isAuthError = false;
                            // Redirect to the originally requested page, or to the home page
                            this.$router.push(
                                this.$route.query.redirectFrom || {
                                    path: "/"
                                }
                            );
                        })
                        .catch((error) => {
                            this.tryingToLogIn = false;
                            this.authError = error ? error : "";
                            this.isAuthError = true;
                        })
                    );
                } else if (process.env.auth === "fakebackend") {
                    const {
                        email,
                        password
                    } = this;
                    if (email && password) {
                        this.$store.dispatch('authfack/login', {
                            email,
                            password
                        });
                        this.$store.dispatch('notification/clear')
                    }
                }
            }
        },
    },
    layout: 'auth-2'
}
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
    <h4 class="mt-0">Entrar</h4>
    <p class="text-muted mb-4">Digite seu endereço de e-mail e senha para acessar o painel.</p>

    <!-- form -->
    <form action="#" @submit.prevent="tryToLogIn">
        <b-alert :variant="notification.type" class="mt-3" v-if="notification.message" :show="notificationAutoCloseDuration" dismissible>{{notification.message}}</b-alert>

        <b-alert variant="danger" class="mt-3" v-model="isAuthError" :show="notificationAutoCloseDuration" dismissible>{{authError}}</b-alert>
        <div class="form-group mb-3">
            <label for="emailaddress">Email</label>
            <input class="form-control" v-model="email" type="email" id="emailaddress" placeholder="email" :class="{ 'is-invalid': submitted && $v.email.$error }">
            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                <span v-if="!$v.email.required">Email é obrigatório.</span>
                <span v-if="!$v.email.email">Por favor insira um email válido.</span>
            </div>
        </div>
        <div class="form-group mb-3">
            <label for="password">Senha</label>
            <div class="input-group input-group-merge">
                <input v-model="password" type="password" id="password" class="form-control" placeholder="senha" :class="{ 'is-invalid': submitted && $v.password.$error }">

                <div class="input-group-append" data-password="false">
                    <div class="input-group-text">
                        <span class="password-eye"></span>
                    </div>
                </div>
                <div v-if="submitted && !$v.password.required" class="invalid-feedback">Senha é obrigatória.</div>
            </div>
        </div>

        <div class="form-group mb-3">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox-signin" />
                <label class="custom-control-label" for="checkbox-signin">Lembrar-me</label>
            </div>
        </div>
        <div class="form-group mb-0 text-center">
            <button class="btn btn-primary btn-block" type="submit">Log In</button>
        </div>
        <!-- social-->
        <!-- <div class="text-center mt-4">
            <h5 class="mt-0 text-muted">Sign in with</h5>
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
    <!-- end form-->
    <!-- Footer-->
    <footer class="footer footer-alt">
        <p class="text-muted">
            Não tem conta?
            <nuxt-link to="/account/register" class="text-primary ml-1">
                <b>Cadastrar</b>
            </nuxt-link>
        </p>
    </footer>
</div>
</template>
