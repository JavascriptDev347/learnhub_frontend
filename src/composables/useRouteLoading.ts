
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export function useRouteLoading() {
    const isNavigating = ref(false)
    const router = useRouter()

    router.beforeEach((_to, _from, next) => {
        isNavigating.value = true
        next()
    })

    router.afterEach(() => {
        isNavigating.value = false
    })

    return { isNavigating }
}