import { useMutation } from "convex/react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mutate = (payload?: any) => {
        setPending(true);
        return apiMutation(payload)
        .finally(() => setPending(false)).then((result) => {
            return result;
        })
        .catch((error) => {
            throw error;
        })
    }
    return {
        mutate,
        pending
    }
}