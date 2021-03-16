import React, { Component } from 'react'

interface Props {
  errorStatusCode : number
} 

export class ErrorPage extends Component<Props> {
  render() {
    return (
      <div>
        <h1>HUBO UN ERROR</h1>
        <h1>{this.props.errorStatusCode}</h1>
      </div>
    )
  }
}

export default ErrorPage
