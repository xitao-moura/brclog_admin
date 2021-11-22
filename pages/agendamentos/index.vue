<script>
import firebase from 'firebase/app';
import "firebase/firestore";
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
            title: "Agendamentos",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Agendamentos",
                    href: "/agendamentos",
                },
                {
                    text: "listar",
                    active: true,
                },
            ],
            agendamentos: []
        };
    },
    created(){
        firebase.firestore().collection('agendamentos').get().then( snapshot => {
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    this.agendamentos.push(data)
                })
            }
            else {
                // decide what you want to do if there are no documents returned from the query
            }
        })
    },
    methods: {
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
                        <h4 class="header-title">Agendamentos</h4>
                        <p class="sub-header">
                            Lista agendamentos cadastrados.
                        </p>
                        <NuxtLink to="/agendamentos/add" class="btn btn-success mb-2">Novo agendamento</NuxtLink>

                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Empresa</th>
                                        <th>Fornecedor</th>
                                        <th>Cliente</th>
                                        <th>Cnpj</th>
                                        <th>Num pedido</th>
                                        <th>Nota fiscal</th>
                                        <th>Chave de acesso</th>
                                        <th>Data</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="agendamento in agendamentos" :key="agendamento.id">
                                        <td>{{agendamento.empresa}}</td>
                                        <td>{{agendamento.fornecedor}}</td>
                                        <td>{{agendamento.cnpj}}</td>
                                        <td>{{agendamento.telefone}}</td>
                                        <td>{{agendamento.email}}</td>
                                        <td>{{agendamento.data}}</td>
                                        <td>{{agendamento.data}}</td>
                                        <td>{{agendamento.data}}</td>
                                        <td><NuxtLink :to="`/agendamentos/${agendamento.id}`"><i class="ri-edit-line"></i></NuxtLink></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> <!-- end table-responsive-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>