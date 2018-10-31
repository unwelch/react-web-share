import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import ClickOutside from './lib/click-outside.js'
// import FacebookIcon from 'react-icons/lib/fa/facebook-square'
// import WhatsAppIcon from 'react-icons/lib/fa/whatsapp'
// import TelegramIcon from 'react-icons/lib/fa/telegram-plane'
// import EmailIcon from 'react-icons/lib/fa/envelope'
// import SmsIcon from 'react-icons/lib/fa/comment-alt'
// import CopyIcon from 'react-icons/lib/fa/copy'
import copy from 'copy-text-to-clipboard'

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
  transition: background-color .4s;
  padding: 8px;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 100000;

  opacity: ${props => (props.visible ? 1 : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`

const Modal = styled.div`
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 8px;
  transform: ${props => (props.visible ? 'translateY(calc(100vh - 100% + -16px))' : 'translateY(calc(150vh - 100%))')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: transform .4s,opacity .4s;
`

const Title = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`

const ButtonStyles = css`
  display: inline-block;
  width: 32px;
  height: 32px;
  padding: 12px;
  margin: 16px 8px;
  cursor: pointer;
  color: #000;
  background-color: #fff;
`

const Link = styled.a`
  ${ButtonStyles}
  text-decoration: none;
`

const Button = styled.button`${ButtonStyles}`

const ModalBody = styled.div`
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 8px;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px 24px;
  text-align: left;
  color: #000;
`
// ${'' /* box-shadow: rgba(0, 0, 0, .5) 0 2px 4px; */}

const ModalFooter = styled.div`
  color: #0076ff;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 8px;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px 23px;
  text-align: left;
  color: #000;
`
// box-shadow: rgba(0, 0, 0, .5) 0 2px 4px;

const createPlatformData = (name, title, text) => {
  const platformMap = {
    whatsapp: {
      dataAction: 'share/whatsapp/share',
      href: `whatsapp://send?text=${text}`
      // Icon: WhatsAppIcon
    },
    facebook: {
      href: `fb-messenger://share/?message=${text}`
      // Icon: FacebookIcon
    },
    telegram: {
      href: `href="tg://msg?text=${text}`
      // Icon: TelegramIcon
    },
    email: {
      href: `mailto:?subject=${title}&body=${text}`
      // Icon: EmailIcon
    },
    sms: {
      href: `sms:?body=${text}`
      // Icon: SmsIcon
    }
  }

  return platformMap[name]
}

const Platform = ({ name, title, text }) => {
  const { href, dataAction, Icon } = createPlatformData(name, title, text)
  return (
    <Link
      href={href && href}
      target='_blank'
      data-action={dataAction && dataAction}
    >
      {/* <Icon /> */}
      <Title>
        {title}
      </Title>
    </Link>
  )
}

Platform.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

const Copy = ({ text, url }) => (
  <Button
    onClick={() => {
      copy(text + ' ' + url)
    }}
  >
    {/* <CopyIcon /> */}
    <Title>
      Copy
    </Title>
  </Button>
)

Copy.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string
}

class Fallback extends Component {
  static propTypes = {
    platforms: PropTypes.array,
    title: PropTypes.string,
    text: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  componentDidMount () {
    // TODO: Do it with React Portal
    // https://reactjs.org/docs/portals.html
    document.body.appendChild(this.el)
  }

  componentWillUnmount () {
    document.body.removeChild(this.el)
  }

  handleFooterClick = event => {
    const { onShareFail } = this.props
    this.handleClose(event, () => {
      onShareFail()
    })
  }

  handlePlatformClick = event => {
    const { onShare } = this.props
    // this.setState(
    //   {
    //     isOpen: true
    //   },
    //   () => {
    //     onShare()
    //   }
    // )
  }

  handleClose = (event, cb) => {
    this.setState({ isOpen: false })
  }

  childrenClickHandler = event => {
    this.setState({
      isOpen: true
    })
  }

  render () {
    const { platforms, children } = this.props
    const { isOpen } = this.state

    const mutatedChildren = React.cloneElement(
      children,
      {
        onClick: this.childrenClickHandler
      },
      children.props.children
    )

    return (
      <Fragment>
        {mutatedChildren}
        <div
          ref={node => {
            this.el = node
          }}
        >
          <Overlay visible={isOpen} onClick={this.handleClose}>
            <Modal visible={isOpen}>
              <ModalBody>
                <Title>
                  Share via
                </Title>
                {platforms.map((platform, index) => {
                  return (
                    <Platform
                      key={index}
                      name={platform}
                      onClick={this.handlePlatformClick}
                    />
                  )
                })}
                <Copy />
              </ModalBody>
              <ModalFooter onClick={this.handleFooterClick}>
                Cancel
              </ModalFooter>
            </Modal>

          </Overlay>
        </div>
      </Fragment>
    )
  }
}

export default Fallback
