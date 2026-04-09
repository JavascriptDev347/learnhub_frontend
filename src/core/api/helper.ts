import type { AxiosResponse } from "axios"
import type { ApiResponse } from "./api.response"

export const extractData = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
    const apiResponse = response.data

    if (!apiResponse.success) {
        throw new Error(apiResponse.message || 'Request failed')
    }

    return apiResponse.data
}