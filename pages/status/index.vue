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
                    text: "listar",
                    active: true,
                },
            ],
            statuses: []
        };
    },
    created(){
        firebase.firestore().collection('status').get().then( snapshot => {
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    this.statuses.push(data)
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
                        <h4 class="header-title">Status</h4>
                        <p class="sub-header">
                            Lista status cadastrados.
                        </p>
                        <NuxtLink to="/status/add" class="btn btn-success mb-2">Novo status</NuxtLink>

                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="status in statuses" :key="status.id">
                                        <td>{{status.nome}}</td>
                                        <td><NuxtLink :to="`/status/${status.id}`"><i class="ri-edit-line"></i></NuxtLink></td>
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