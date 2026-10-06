import * as ToastPrimitive from "@radix-ui/react-toast";
import type { ComponentProps, ReactNode } from "react";

export type ToastProps = ComponentProps<typeof ToastPrimitive.Root>;
export type ToastActionElement = ReactNode;

export const Toast = ToastPrimitive.Root;
