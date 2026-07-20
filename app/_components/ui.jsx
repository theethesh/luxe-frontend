"use client";

import React from "react";
import { Loader2, Star, StarHalf, Inbox } from "lucide-react";

/**
 * Button
 * variant: primary | accent | secondary | outline | ghost | danger
 * size: sm | md | lg | icon
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  const variantClass =
    {
      primary: "btn-primary",
      accent: "btn-accent",
      secondary: "btn-secondary",
      outline: "btn-outline",
      ghost: "btn-ghost",
      danger: "btn-danger",
    }[variant] || "btn-primary";

  const sizeClass =
    { sm: "btn-sm", md: "", lg: "btn-lg", icon: "btn-icon" }[size] || "";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

export function IconButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-secondary)] transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-md active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span className={`badge badge-${variant} ${className}`}>{children}</span>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="surface-card p-3 sm:p-4">
      <Skeleton className="img-frame mb-3" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-3" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

export function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description = "",
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-5">
        <Icon className="w-9 h-9 text-[var(--color-primary)]" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-lg text-[var(--color-secondary)] mb-1.5">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[var(--color-muted)] max-w-sm mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

export function Stars({ rating = 0, size = 14, showCount, count }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)
          return (
            <Star
              key={i}
              size={size}
              className="fill-[var(--color-accent)] text-[var(--color-accent)]"
            />
          );
        if (i === full && half)
          return (
            <StarHalf
              key={i}
              size={size}
              className="fill-[var(--color-accent)] text-[var(--color-accent)]"
            />
          );
        return <Star key={i} size={size} className="text-[var(--color-border)]" />;
      })}
      {showCount && (
        <span className="text-xs text-[var(--color-muted)] ml-1">({count})</span>
      )}
    </span>
  );
}

export function Price({ value, original, currency = "₹", size = "md" }) {
  const sizeClass =
    { sm: "text-sm", md: "text-lg", lg: "text-2xl" }[size] || "text-lg";
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`font-heading font-700 ${sizeClass} text-[var(--color-secondary)]`}>
        {currency}
        {Number(value ?? 0).toLocaleString("en-IN")}
      </span>
      {original && Number(original) > Number(value) && (
        <span className="text-sm text-[var(--color-muted)] line-through">
          {currency}
          {Number(original).toLocaleString("en-IN")}
        </span>
      )}
    </span>
  );
}

const CHECKOUT_STEPS = ["Address", "Payment", "Review", "Confirmed"];

export function CheckoutSteps({ current = 0 }) {
  return (
    <div className="flex items-center justify-center mb-8 select-none overflow-x-auto">
      {CHECKOUT_STEPS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors duration-300 ${
                  state === "done"
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                    : state === "active"
                    ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white"
                    : "border-[var(--color-border)] text-[var(--color-muted)] bg-white"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm font-medium hidden sm:inline ${
                  state === "todo" ? "text-[var(--color-muted)]" : "text-[var(--color-secondary)]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < CHECKOUT_STEPS.length - 1 && (
              <div
                className={`h-0.5 w-8 sm:w-16 mx-2 rounded transition-colors duration-300 ${
                  i < current ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, className = "" }) {
  return (
    <div className={`mb-8 ${className}`}>
      {eyebrow && (
        <span className="badge badge-primary mb-3">{eyebrow}</span>
      )}
      <h2 className="mb-2">{title}</h2>
      {subtitle && (
        <p className="text-[var(--color-muted)] max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
