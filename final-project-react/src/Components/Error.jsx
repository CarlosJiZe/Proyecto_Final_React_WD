import React from "react";
import "./Error.css";  // Importar el archivo CSS

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
        <div className="error-boundary-container">
        <a href="/"><svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M9 14l-5-5 5-5"/>
            <path d="M4 9h11a4 4 0 1 1 0 8h-4"/>
          </svg>Volver a la pagina principal</a>
        <br/>
          <h2>¡Ups! Algo salió mal.</h2>
          <details className="error-boundary-details">
            <summary>Detalles del Error</summary>
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