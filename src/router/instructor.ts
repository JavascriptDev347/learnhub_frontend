
const routes = [{
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
        {
            path: '/my-courses',
            name: 'my-courses',
            component: () => import('@/features/instructor/views/MyCourses.vue'),
        },

    ]
}]
export default routes