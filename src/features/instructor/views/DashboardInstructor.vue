<template>
    <div class="instructor-dashboard">
        <DashboardWelcome />
        <DashboardStudentChart />
        <DashboardCourseChart />
    </div>
</template>

<script setup lang="ts">
import DashboardWelcome from '../components/DashboardWelcome.vue';
import DashboardStudentChart from '../components/DashboardStudentChart.vue';
import DashboardCourseChart from '../components/DashboardCourseChart.vue';

</script>

<style scoped></style>