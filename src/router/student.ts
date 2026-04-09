const routes = [{
    path: '/student',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
        {
            path: "/student/dashboard",
            name: "student-dashboard",
            component: () => import('@/features/student/views/DashboardStudent.vue'),
        },


    ]
}]
export default routes