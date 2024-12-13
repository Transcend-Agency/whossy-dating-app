/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiClient from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useSubscribe = () => {
    const apiClient = new ApiClient<any, {email: string, amount: number, plan: string}>("/transaction/initialize");
    return useMutation({
        mutationFn: (data: {email: string, amount: number, plan: string}) => 
        apiClient.post(data),
    });
};

export const useVerify = () => {
    // The `ApiClient` endpoint will be dynamic, as it depends on the `reference`
    return useMutation({
      mutationFn: async (reference: string) => {
        const apiClient = new ApiClient<any, never>(`/transaction/verify/${reference}`);
        return apiClient.get();
      },
    });
  };