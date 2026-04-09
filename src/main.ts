import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@/shared/styles/main.css"
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './core/plugins/query'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueQueryPlugin, { queryClient: queryClient })

app.mount('#app')
