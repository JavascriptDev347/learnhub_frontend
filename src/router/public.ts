
const routes = [{
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
        {
            path: 'home',
            name: 'home',
            component: () => import('@/features/home/views/index.vue'),
        },
        {
            path: '',
            redirect: 'home'
        }

    ]
}]
export default routes