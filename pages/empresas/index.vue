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
            title: "Empresas",
            items: [{
                    text: "BRCLog",
                    href: "/",
                },
                {
                    text: "Empresas",
                    href: "/empresas",
                },
                {
                    text: "listar",
                    active: true,
                },
            ],
            empresas: []
        };
    },
    created(){
        firebase.firestore().collection('empresas').get().then( snapshot => {
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    this.empresas.push(data)
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
                        <h4 class="header-title">Empresas</h4>
                        <p class="sub-header">
                            Lista empresas cadastrados.
                        </p>
                        <NuxtLink to="/empresas/add" class="btn btn-success mb-2">Nova empresa</NuxtLink>

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
                                    <tr v-for="empresa in empresas" :key="empresa.id">
                                        <td>{{empresa.razao_social}}</td>
                                        <td>{{empresa.nome_fantasia}}</td>
                                        <td>{{empresa.cnpj}}</td>
                                        <td>{{empresa.telefone}}</td>
                                        <td>{{empresa.email}}</td>
                                        <td><NuxtLink :to="`/empresas/${empresa.id}`"><i class="ri-edit-line"></i></NuxtLink></td>
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