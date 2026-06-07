import { Component, type ErrorInfo, type ReactNode } from "react";

import { reportLovableError } from "@/lib/lovable-error-reporting";

type AppErrorBoundaryProps = {
  children: ReactNode;
  sectionName?: string;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    reportLovableError(error, {
      section: this.props.sectionName ?? "unknown_section",
      componentStack: errorInfo.componentStack,
    });
  }

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-16 sm:py-20">
          <div className="border border-gold/25 bg-secondary px-6 py-8 sm:px-8 sm:py-10 shadow-card">
            <div className="eyebrow text-gold mb-4">Section recovered</div>
            <h2 className="text-3xl sm:text-4xl text-navy leading-tight">
              This part of the page could not load.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              The rest of the website is still available. You can continue browsing or reload to try
              again.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gold hover:text-navy"
              >
                Go to homepage
              </a>
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center border border-gold/35 px-6 py-3 text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}