import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, message: err?.message || "Unknown error" };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-white">
          <h2 className="text-xl font-semibold">Something went wrong.</h2>
          <p className="text-white/70 mt-2">{this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
