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
            title: "Fornecedores",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Fornecedores",
                    href: "/fornecedores",
                },
                {
                    text: "listar",
                    active: true,
                },
            ],
            fornecedores: []
        };
    },
    created(){
        firebase.firestore().collection('fornecedores').get().then( snapshot => {
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    this.fornecedores.push(data)
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
                        <h4 class="header-title">Fornecedores</h4>
                        <p class="sub-header">
                            Lista fornecedores cadastrados.
                        </p>
                        <NuxtLink to="/fornecedores/add" class="btn btn-success mb-2">Novo fornecedor</NuxtLink>

                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Razão social</th>
                                        <th>Nome fantasia</th>
                                        <th>Cnpj</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="fornecedor in fornecedores" :key="fornecedor.id">
                                        <td>{{fornecedor.razao_social}}</td>
                                        <td>{{fornecedor.nome_fantasia}}</td>
                                        <td>{{fornecedor.cnpj}}</td>
                                        <td>{{fornecedor.telefone}}</td>
                                        <td>{{fornecedor.email}}</td>
                                        <td><NuxtLink :to="`/fornecedores/${fornecedores.id}`"><i class="ri-edit-line"></i></NuxtLink></td>
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