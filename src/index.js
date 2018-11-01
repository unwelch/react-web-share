import React from 'react'
import ReactDOM from 'react-dom'
import WebShare from './web-share.js'
import styled, { createGlobalStyle } from 'styled-components'

const Button = styled.button`
  font-size: 50px;
  border-radius: 25px;
  padding: 16px 40px;
  outline: none;
  cursor: pointer;
`

const NoramlizeStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Demo = () => (
  <Wrapper>
    <NoramlizeStyles />
    <WebShare>
      <Button onClick={console.log}>{'Share'}</Button>
    </WebShare>
  </Wrapper>
)

ReactDOM.render(<Demo />, document.getElementById('root'))
