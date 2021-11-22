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
                    text: "listar",
                    active: true,
                },
            ],
            usuarios: [],
            checked: true,
            checked2: false,
            status: 'accepted',
            status2: 'not_accepted',
            selected: 'A'
        };
    },
    created(){
        firebase.firestore().collection('usuarios').get().then( snapshot => {
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    this.usuarios.push(data)
                })
            }
            else {
                // decide what you want to do if there are no documents returned from the query
            }
        })
    },
    methods: {
        getAccept(accept){
            if(accept == true){
                return {
                    text: 'Aceito',
                    color: 'success'
                }
            }else if(accept == false){
                return {
                    text: 'Não aceito',
                    color: 'danger'
                }
            }
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
                        <h4 class="header-title">Usuários</h4>
                        <p class="sub-header">
                            Lista usuários cadastrados.
                        </p>
                        <NuxtLink to="/usuarios/add" class="btn btn-success mb-2">Novo usuário</NuxtLink>

                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Accept</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="usuario in usuarios" :key="usuario.id">
                                        <td>{{usuario.nome}}</td>
                                        <td>{{usuario.email}}</td>
                                        <td><b-badge :variant="getAccept(usuario.accept).color">{{getAccept(usuario.accept).text}}</b-badge></td>
                                        <td><NuxtLink :to="`/usuarios/${usuario.id}`"><i class="ri-edit-line"></i></NuxtLink></td>
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