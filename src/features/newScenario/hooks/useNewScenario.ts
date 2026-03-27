import { useMutation } from "@tanstack/react-query";
import { classifyWorkshop } from "../api/newScenario.api";
import { ClassifyPayload, ClassifyResponse } from "../types/newScenario.types";

// POST /workshop/classify

export const useClassifyWorkshop = () => {
  return useMutation<ClassifyResponse, Error, ClassifyPayload>({
    mutationFn: (data: ClassifyPayload) => classifyWorkshop(data),
  });
};
