// src/features/newScenario/api/newScenario.api.ts

import axiosInstance from "@/instance/axios-instance";

import {
  AxesPayload,
  AxesResponse,
  ClassifyPayload,
  ClassifyResponse,
  MatrixPayload,
  MatrixResponse,
} from "../types/newScenario.types";

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

// POST /workshop/axes

export const generateAxes = async (
  data: AxesPayload,
): Promise<AxesResponse> => {
  try {
    const response = await axiosInstance.post(`/workshop/axes`, data);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

// POST /workshop/matrix

export const generateMatrix = async (
  data: MatrixPayload,
): Promise<MatrixResponse> => {
  try {
    const response = await axiosInstance.post(`/workshop/matrix`, data);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
