import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la interfaz de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Registrar el error para depuración
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Mostrar mensaje de error
      return (
        <div style={{ padding: "20px", backgroundColor: "#f8d7da", color: "#721c24" }}>
          <h2>¡Ups! Algo salió mal.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>Error Detalles</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    // Si no hay error, renderiza los hijos
    return this.props.children;
  }
}

export default ErrorBoundary;
