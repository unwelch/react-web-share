import React, { Component } from 'react'

import ExampleComponent from 'react-web-share-api-polyfill'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent text='Modern React component module' />
      </div>
    )
  }
}