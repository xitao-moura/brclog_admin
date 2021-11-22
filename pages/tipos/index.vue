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
                    text: "listar",
                    active: true,
                },
            ],
            tipos: []
        };
    },
    created(){
        firebase.firestore().collection('tipos').get().then( snapshot => {
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    this.tipos.push(data)
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
                        <h4 class="header-title">Tipos</h4>
                        <p class="sub-header">
                            Lista tipos cadastrados.
                        </p>
                        <NuxtLink to="/tipos/add" class="btn btn-success mb-2">Novo tipo</NuxtLink>

                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="tipo in tipos" :key="tipo.id">
                                        <td>{{tipo.nome}}</td>
                                        <td><NuxtLink :to="`/tipos/${tipo.id}`"><i class="ri-edit-line"></i></NuxtLink></td>
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