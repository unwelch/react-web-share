import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Fallback from './fallback.js'

const noop = () => {}

class WebShare extends Component {
  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    onShareSuccess: PropTypes.func,
    onShare: PropTypes.func,
    onShareFail: PropTypes.func,
    children: PropTypes.node,
    platforms: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    url: window.location.href || '',
    title: document.title || '',
    text: '',
    onShareSuccess: noop,
    onShare: noop,
    onShareFail: noop,
    platforms: ['whatsapp', 'telegram', 'facebook', 'email', 'sms']
  }

  componentDidMount () {
    this.isWebShareAPISupported = window.navigator.share !== undefined
  }

  clickHandler = event => {
    const {
      url,
      title,
      text,
      onShare,
      onShareSuccess,
      onShareFail
    } = this.props

    onShare()
    if (this.isWebShareAPISupported) {
      window.navigator
        .share({
          title,
          text,
          url
        })
        .then(_ => onShareSuccess())
        .catch(error => onShareFail(error))
    }
  }

  render () {
    const mutatedChildren = React.cloneElement(
      this.props.children,
      {
        onClick: this.clickHandler,
        isWebShareAPISupported: this.isWebShareAPISupported
      },
      this.props.children.props.children
    )

    return this.isWebShareAPISupported
      ? mutatedChildren
      : <Fallback {...this.props} />
  }
}

export default WebShare
