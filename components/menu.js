export const menuItems = [
    {
        id: 1,
        label: "menuitems.navigation.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboard.text",
        icon: "ri-dashboard-line",
        badge: {
            variant: "success",
            text: "menuitems.dashboard.badge"
        },
        isMenuCollapsed: false,
        subItems: [
            // {
            //     id: 3,
            //     label: 'menuitems.dashboard.list.sales',
            //     link: '/'
            // },
            // {
            //     id: 4,
            //     label: 'menuitems.dashboard.list.crm',
            //     link: '/dashboard/crm'
            // },
            // {
            //     id: 5,
            //     label: 'menuitems.dashboard.list.analytics',
            //     link: '/dashboard/analytics'
            // },
            {
                id: 117,
                label: 'menuitems.dashboard.list.clientes',
                link: '/'
            },
        ]
    },
    {
        id: 6,
        label: "menuitems.apps.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.configuracoes.text",
        icon: "ri-dashboard-line",
        isMenuCollapsed: false,
        subItems: [
            {
                id: 120,
                label: 'menuitems.configuracoes.list.tipos',
                link: '/tipos'
            },
            {
                id: 121,
                label: 'menuitems.configuracoes.list.status',
                link: '/status'
            },
        ]
    },
    {
        id: 122,
        label: "menuitems.empresas.text",
        icon: "ri-user-line",
        link: '/empresas'
    },
    {
        id: 123,
        label: "menuitems.fornecedores.text",
        icon: "ri-user-line",
        link: '/fornecedores'
    },
    {
        id: 118,
        label: "menuitems.usuarios.text",
        icon: "ri-user-line",
        link: '/usuarios'
    },
    {
        id: 119,
        label: "menuitems.agendamentos.text",
        icon: "ri-calendar-line",
        link: '/agendamentos'
    }
];

