"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-common-100)",
          "--normal-text": "var(--color-label-strong-1)",
          "--normal-border": "var(--color-gray-200)",
          "--success-bg": "var(--color-primary-light)",
          "--success-text": "var(--color-primary-strong)",
          "--success-border": "var(--color-primary)",
          "--error-bg": "var(--color-error-container)",
          "--error-text": "var(--color-error)",
          "--error-border": "var(--color-pink-300)",
        } as React.CSSProperties
      }
      toastOptions={{
        duration: 3000,
      }}
      {...props}
    />
  );
};

export { Toaster };
