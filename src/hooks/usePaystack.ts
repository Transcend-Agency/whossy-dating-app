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

export const useCreateSubscription = () => {
    const apiClient = new ApiClient<any, { customer: string; authorization: string; plan: string }>("/subscription");
    return useMutation({
        mutationFn: (data: { customer: string; authorization: string; plan: string }) => apiClient.post(data),
    });
};

export const useUnsubscribe = () => {
  const apiClient = new ApiClient<any, { code: string; token: string }>("/subscription/disable");
  return useMutation({
      mutationFn: (data: { code: string; token: string }) =>
          apiClient.post(data),
  });
};

export const useGetSubscriptionCodeAndEmailToken = () => {
  // The `ApiClient` endpoint will be dynamic, as it depends on the `reference`

  return useMutation({

    mutationFn: async (customer_id: string) => {
      const apiClient = new ApiClient<any, never>(`/subscription?customer=${customer_id}`);
      return apiClient.get();
    },
    
  });
};

export const useEnableSubscription = () => {
  const apiClient = new ApiClient<any, { code: string; token: string }>("/subscription/enable");
  return useMutation({
      mutationFn: (data: { code: string; token: string }) =>
          apiClient.post(data),
  });
};