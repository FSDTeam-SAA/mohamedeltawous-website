import { useMutation } from "@tanstack/react-query";
import {
  classifyWorkshop,
  generateAxes,
  generateMatrix,
} from "../api/newScenario.api";
import {
  AxesPayload,
  AxesResponse,
  ClassifyPayload,
  ClassifyResponse,
  MatrixPayload,
  MatrixResponse,
} from "../types/newScenario.types";

// POST /workshop/classify

export const useClassifyWorkshop = () => {
  return useMutation<ClassifyResponse, Error, ClassifyPayload>({
    mutationFn: (data: ClassifyPayload) => classifyWorkshop(data),
  });
};

// POST /workshop/axes

export const useGenerateAxes = () => {
  return useMutation<AxesResponse, Error, AxesPayload>({
    mutationFn: (data: AxesPayload) => generateAxes(data),
  });
};

// POST /workshop/matrix

export const useGenerateMatrix = () => {
  return useMutation<MatrixResponse, Error, MatrixPayload>({
    mutationFn: (data: MatrixPayload) => generateMatrix(data),
  });
};
