const routes = [{
    path: '/instructor',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
        {
            path: "/instructor/dashboard",
            name: "instructor-dashboard",
            component: () => import('@/features/instructor/views/DashboardInstructor.vue'),
        },
        {
            path: '/instructor/my-courses',
            name: 'my-courses',
            component: () => import('@/features/instructor/views/MyCourses.vue'),
        },
        {
            path: '/instructor/create-course',
            name: 'create-course',
            component: () => import('@/features/instructor/views/CreateCourse.vue'),
        }

    ]
}]
export default routes