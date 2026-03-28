import React from 'react'

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, textAlign: 'center' }}>
          <p>Ocorreu um erro inesperado. Por favor, recarregue a página.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
