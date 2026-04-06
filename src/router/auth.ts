
const routes = [{
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
        {
            path: 'login',
            name: 'login',
            component: () => import('@/features/auth/views/LoginPage.vue'),
        },
        {
            path: 'register',
            name: 'register',
            component: () => import('@/features/auth/views/RegisterPage.vue'),
        },
        {
            path: '',
            redirect: 'login'
        }
    ]

}





]
export default routes