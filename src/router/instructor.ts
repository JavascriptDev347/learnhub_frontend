const routes = [{
    path: '/instructor',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
        {
            path: '/my-courses',
            name: 'my-courses',
            component: () => import('@/features/instructor/views/MyCourses.vue'),
        },
        {
            path: '/create-course',
            name: 'create-course',
            component: () => import('@/features/instructor/views/CreateCourse.vue'),
        }

    ]
}]
export default routes