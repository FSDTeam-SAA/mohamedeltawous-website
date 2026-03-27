// src/features/newScenario/api/newScenario.api.ts

import axiosInstance from "@/instance/axios-instance";

import { ClassifyPayload, ClassifyResponse } from "../types/newScenario.types";

// POST /workshop/classify

export const classifyWorkshop = async (
  data: ClassifyPayload,
): Promise<ClassifyResponse> => {
  try {
    const response = await axiosInstance.post(`/workshop/classify`, data);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
