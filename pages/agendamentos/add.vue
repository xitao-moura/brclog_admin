<script>
import firebase from 'firebase/app';
import "firebase/firestore";
import {
    required,
    email
} from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker'
import vue2Dropzone from 'vue2-dropzone'
/**
 * Form elements component
 */
export default {
    head() {
        return {
            title: `${this.title} | BRCLog admin`,
        };
    },
    components: {
        DatePicker,
        vueDropzone: vue2Dropzone
    },
    data() {
        return {
            title: "Agendamento",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Agendamento",
                    href: "/agendamento",
                },
                {
                    text: `nova agendamento`,
                    active: true,
                },
            ],
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: {
                    'My-Awesome-Header': 'header value'
                },
                previewTemplate: this.template()
            },
            agendamento: {
                id: '',
                data: null,
                empresa: '',
                fornecedor: '',
                cliente: '',
                cnpj: null,
                nota_fiscal: null,
                chave_acesso: ''
            },
            submit: false,
            submitted: false
        };
    },
    validations: {
        agendamento: {
            data: {
                required
            },
            empresa: {
                required
            },
            fornecedor: {
                required
            },
            cliente: {
                required
            },
            cnpj: {
                required
            },
            num_pedido: {
                required
            },
            nota_fiscal: {
                required
            },
            chave_acesso: {
                required
            }
        }
    },
    created(){
        
    },
    methods: {
        async saveAgendamento(){
            this.submitted = true
            this.$v.$touch()

            if (!this.$v.$invalid) {
                await firebase
                    .firestore()
                    .collection("agendamentos")
                    .doc()
                    .set({
                        data: this.agendamento.data,
                        empresa: this.agendamento.empresa,
                        fornecedor: this.agendamento.fornecedor,
                        cliente: this.agendamento.cliente,
                        cnpj: this.agendamento.cnpj,
                        num_pedido: this.agendamento.num_pedido,
                        nota_fiscal: this.agendamento.nota_fiscal,
                        chave_acesso: this.agendamento.chave_acesso
                    })

                this.$router.go(-1)
            }
        },
        template: function () {
            return ` <div class="dropzone-previews mt-3">
            <div class="card mt-1 mb-0 shadow-none border">
                <div class="p-2">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img data-dz-thumbnail src="#" class="avatar-sm rounded bg-light" alt="">
                        </div>
                        <div class="col pl-0">
                            <a href="javascript:void(0);" class="text-muted font-weight-bold" data-dz-name></a>
                            <p class="mb-0" data-dz-size></p>
                        </div>
                        <div class="col-auto">
                            <!-- Button -->
                            <a href="" class="btn btn-link btn-lg text-muted" data-dz-remove>
                                <i class="fe-x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
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
                        <h4 class="header-title">Agendamento</h4>
                        <p class="sub-header">
                            nova agendamento.
                        </p>

                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <b-form @submit.prevent="saveAgendamento">
                                        <b-row class="m-2">
                                            <b-col md="6">
                                                <date-picker v-model="agendamento.data" :first-day-of-week="1" lang="en" :class="{ 'is-invalid': submitted && $v.agendamento.data.$error }"></date-picker>
                                                <div v-if="submitted && !$v.agendamento.data.required" class="invalid-feedback">Data é obrigatório.</div>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-input v-model="agendamento.fornecedor" placeholder="Fornecedor" :class="{ 'is-invalid': submitted && $v.agendamento.fornecedor.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.agendamento.fornecedor.required" class="invalid-feedback">Fornecedor é obrigatório.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="4">
                                                <b-form-input v-model="agendamento.empresa" placeholder="Empresa" :class="{ 'is-invalid': submitted && $v.agendamento.empresa.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.agendamento.empresa.required" class="invalid-feedback">Empresa é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-input v-mask="'##.###.###/####-##'" v-model="agendamento.cnpj" placeholder="Cnpj" :class="{ 'is-invalid': submitted && $v.agendamento.cnpj.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.agendamento.cnpj.required" class="invalid-feedback">Cnpj é obrigatório.</div>
                                            </b-col>
                                            <b-col md="4">
                                                <b-form-input v-model="agendamento.cliente" placeholder="Cliente" :class="{ 'is-invalid': submitted && $v.agendamento.cliente.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.agendamento.cliente.required" class="invalid-feedback">Cliente é obrigatório.</div>
                                            </b-col>
                                        </b-row>
                                        <b-row class="m-2">
                                            <b-col md="6">
                                                <b-form-input v-model="agendamento.num_pedido" placeholder="Número do pedido" :class="{ 'is-invalid': submitted && $v.agendamento.num_pedido.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.agendamento.num_pedido.required" class="invalid-feedback">Número do pedido é obrigatório.</div>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-input v-model="agendamento.chave_acesso" placeholder="Chave de acesso" :class="{ 'is-invalid': submitted && $v.agendamento.chave_acesso.$error }"></b-form-input>
                                                <div v-if="submitted && !$v.agendamento.chave_acesso.required" class="invalid-feedback">Chave de acesso obrigatório.</div>
                                            </b-col>
                                        </b-row>

                                         <b-row class="m-2">
                                            <b-col md="12">
                                                <vue-dropzone id="dropzone" ref="myVueDropzone" :use-custom-slot="true" :options="dropzoneOptions">
                                                    <div class="dz-message needsclick">
                                                        <i class="h1 text-muted ri-upload-cloud-2-line"></i>
                                                        <h3>Solte os arquivos aqui ou clique para fazer o upload.</h3>
                                                        <span class="text-muted font-13">Este é apenas um dropzone de demonstração. Os arquivos selecionados
                                                            <strong>não</strong> foi realmente carregado.</span>
                                                    </div>
                                                </vue-dropzone>
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