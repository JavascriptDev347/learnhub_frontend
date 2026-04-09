import { QueryClient } from "@tanstack/vue-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Sahifa focus bo'lganda avtomatik refetch qilmaslik
            // Auth uchun kerak emas — token o'zgarmaydi
            refetchOnWindowFocus: false,
            // 1 marta muvaffaqiyatsiz bo'lsa, qayta urinmaslik
            retry: 1,
            // 5 daqiqa davomida cache dan oladi, server ga bormaydi
            staleTime: 5 * 60 * 1000,
        },
        mutations: {
            // Mutation xato bersa qayta urinmasin
            // Login da 1 marta xato bo'lsa — foydalanuvchi o'zi qayta urinadi
            retry: false,
        },
    },
})