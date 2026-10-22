"use client";

import type { ComponentProps } from "react";
import { useRequest } from "./request-context";

type Props = Omit<ComponentProps<"button">, "onClick" | "type"> & {
  service?: string;
  space?: string;
};

export function RequestButton({ service, space, children, ...props }: Props) {
  const openRequest = useRequest();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => openRequest({ service, space, trigger: event.currentTarget })}
      {...props}
    >
      {children}
    </button>
  );
}
