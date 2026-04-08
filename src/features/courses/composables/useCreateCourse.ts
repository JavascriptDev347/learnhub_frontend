import { ref, computed } from 'vue'
import type { CreateCourseForm, Step } from '../types/create-course.type'

export const STEPS: Step[] = [
    { id: 1, label: 'STEP 1', description: 'Basic Information' },
    { id: 2, label: 'STEP 2', description: 'Curriculum Builder' },
    { id: 3, label: 'STEP 3', description: 'Pricing & Access' },
    { id: 4, label: 'FINAL STEP', description: 'Publish Settings' },
]

const defaultForm: CreateCourseForm = {
    title: '',
    shortDescription: '',
    overview: '',
    category: '',
    level: '',
    duration: '',
    thumbnail: null,
    sections: [],
    price: 0,
    accessType: 'paid',
    status: 'draft',
}

export function useCreateCourse() {
    const currentStep = ref(1)
    const form = ref<CreateCourseForm>({ ...defaultForm })

    const isFirstStep = computed(() => currentStep.value === 1)
    const isLastStep = computed(() => currentStep.value === STEPS.length)

    function getStepStatus(stepId: number) {
        if (stepId < currentStep.value) return 'completed'
        if (stepId === currentStep.value) return 'active'
        return 'pending'
    }

    function nextStep() {
        if (!isLastStep.value) currentStep.value++
    }

    function prevStep() {
        if (!isFirstStep.value) currentStep.value--
    }

    function goToStep(stepId: number) {
        // Faqat completed va active steplarga o'tish mumkin
        if (stepId <= currentStep.value) currentStep.value = stepId
    }

    function saveDraft() {
        console.log('Draft saved:', form.value)
    }

    async function publishCourse() {
        console.log('Publishing course with data:', form.value)
        // await courseApi.create(form.value)
    }

    return {
        currentStep,
        form,
        isFirstStep,
        isLastStep,
        getStepStatus,
        nextStep,
        prevStep,
        goToStep,
        saveDraft,
        publishCourse
    }
}