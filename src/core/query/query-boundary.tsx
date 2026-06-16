"use client";

import { Component, ErrorInfo, ReactNode, Suspense } from "react";
import { DangerCircle, Refresh } from "@solar-icons/react-perf/Outline";
import { ApiError } from "../types";

/**
 * State interface for the QueryErrorBoundary component.
 * Contains the current error state.
 */
interface ErrorBoundaryState {
  error: ApiError | Error | null;
}

/**
 * Props interface for the QueryErrorBoundary component.
 *
 * @interface ErrorBoundaryProps
 * @property {ReactNode} children - The child components to be wrapped by the error boundary
 * @property {Function} [fallback] - Optional custom error fallback component that receives error and reset function
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (props: {
    error: ApiError | Error;
    reset: () => void;
  }) => ReactNode;
}

/**
 * React Error Boundary component specifically designed for handling query-related errors.
 * Catches JavaScript errors in its child component tree, logs them, and displays a fallback UI.
 *
 * @class QueryErrorBoundary
 * @extends Component<ErrorBoundaryProps, ErrorBoundaryState>
 */
class QueryErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  /**
   * Updates state when an error is caught in the component tree.
   *
   * @param {unknown} error - The error that was thrown
   * @returns {ErrorBoundaryState} New state with the error
   */
  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: error as Error };
  }

  /**
   * Lifecycle method called when an error is caught.
   * Logs the error and component stack for debugging purposes.
   *
   * @param {Error} error - The error that was thrown
   * @param {ErrorInfo} errorInfo - Additional error information including component stack
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      "[QueryBoundary] Caught error:",
      error,
      errorInfo.componentStack,
    );
  }

  /**
   * Resets the error boundary state, allowing the component tree to re-render.
   * This is typically called when the user clicks "Try again" in the error fallback.
   */
  reset = () => {
    this.setState({ error: null });
  };

  /**
   * Renders the component tree or error fallback based on current state.
   *
   * @returns {ReactNode} Either the children or error fallback component
   */
  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      if (this.props.fallback)
        return this.props.fallback({ error, reset: this.reset });
      return <DefaultErrorFallback error={error} reset={this.reset} />;
    }
    return this.props.children;
  }
}

/**
 * Default error fallback component that displays a user-friendly error message
 * with a retry button. Handles both ApiError and generic Error types.
 *
 * @param {Object} props - Component props
 * @param {ApiError | Error} props.error - The error to display
 * @param {() => void} props.reset - Function to reset the error boundary
 * @returns {ReactNode} Error UI component
 */
function DefaultErrorFallback({
  error,
  reset,
}: {
  error: ApiError | Error;
  reset: () => void;
}): ReactNode {
  // Extract error message from ApiError or generic Error
  const message =
    (error as ApiError).message ??
    (error as Error).message ??
    "Something went wrong.";

  // Extract status code from ApiError if available
  const statusCode = (error as ApiError).statusCode;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 mb-4">
        <DangerCircle size={64} color="#0f4159" />
      </div>
      <p className="text-sm font-semibold text-red-300 mb-1">
        {statusCode === 404
          ? "Not Found"
          : statusCode === 403
            ? "Access Denied"
            : "Something went wrong"}
      </p>
      <p className="text-xs text-slate-500 max-w-xs mb-5">{message}</p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
      >
        <Refresh size={64} color="#0f4159" />
        Try again
      </button>
    </div>
  );
}

/**
 * Default loading fallback component that displays skeleton placeholders
 * while content is loading during React Suspense.
 *
 * @param {Object} props - Component props
 * @param {number} [props.rows=3] - Number of skeleton rows to display
 * @returns {ReactNode} Loading skeleton UI component
 */
function DefaultSuspenseFallback({ rows = 3 }: { rows?: number }): ReactNode {
  return (
    <div className="space-y-3" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-16 rounded-xl" />
      ))}
    </div>
  );
}

/**
 * Props interface for the main QueryBoundary component.
 *
 * @interface QueryBoundaryProps
 * @property {ReactNode} children - The child components to be wrapped
 * @property {ReactNode} [loadingFallback] - Custom loading fallback component
 * @property {number} [loadingRows=3] - Number of skeleton rows for default loading fallback
 * @property {Function} [errorFallback] - Custom error fallback component
 */
interface QueryBoundaryProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  loadingRows?: number;
  errorFallback?: (props: {
    error: ApiError | Error;
    reset: () => void;
  }) => ReactNode;
}

/**
 * A comprehensive boundary component that combines React Error Boundary and Suspense
 * to handle both loading and error states for data-fetching components.
 *
 * This component provides a clean way to handle async operations by:
 * - Catching and displaying errors with retry functionality
 * - Showing loading states during data fetching
 * - Providing customizable fallbacks for both states
 *
 * @example
 * ```tsx
 * <QueryBoundary
 *   loadingRows={4}
 *   errorFallback={({ error, reset }) => (
 *     <div>
 *       <p>Custom error: {error.message}</p>
 *       <button onClick={reset}>Retry</button>
 *     </div>
 *   )}
 * >
 *   <YourDataComponent />
 * </QueryBoundary>
 * ```
 *
 * @param {QueryBoundaryProps} props - Component props
 * @returns {ReactNode} Wrapped component with error and loading boundary
 */
export function QueryBoundary({
  children,
  loadingFallback,
  loadingRows = 3,
  errorFallback,
}: QueryBoundaryProps): ReactNode {
  return (
    <QueryErrorBoundary fallback={errorFallback}>
      <Suspense
        fallback={
          loadingFallback ?? <DefaultSuspenseFallback rows={loadingRows} />
        }
      >
        {children}
      </Suspense>
    </QueryErrorBoundary>
  );
}

export { QueryErrorBoundary };
