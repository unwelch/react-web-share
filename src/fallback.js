import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import copy from 'copy-text-to-clipboard'

import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import WhatsAppIcon from 'react-icons/lib/fa/whatsapp'
// import TelegramIcon from 'react-icons/lib/fa/telegram'
import EmailIcon from 'react-icons/lib/fa/envelope'
import SmsIcon from 'react-icons/lib/fa/comment'
import CopyIcon from 'react-icons/lib/fa/copy'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
  transition: background-color .4s;
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

const SystemFont = css`
  font-family: -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`

const Title = styled.div`
  ${SystemFont}
  font-size: 18px;

  margin-bottom: 10px;
`

const PlatformName = styled.div`
  ${SystemFont}
  font-size: 13px;
  margin-top: 6px;
`

const ButtonStyles = css`
  border: none;
  cursor: pointer;
  color: #000;
  background-color: #fff;
`

const Link = styled.a`
  ${ButtonStyles}
  text-decoration: none;

  margin: 8px;
  ${''}

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
  ${SystemFont}

  color: #0076FF;
  font-size: 20px;
  text-align: center;
  user-select: none;
  cursor: pointer;

  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 8px;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px 23px;
  text-align: center;
`
// box-shadow: rgba(0, 0, 0, .5) 0 2px 4px;

const IconWrapper = styled.div`
  width: 60px;
  height: 50px;

  & > svg {
    width: 100%;
    height: 100%;
  }
`

const createPlatformData = (platform, title, text) => {
  const platformMap = {
    whatsapp: {
      dataAction: 'share/whatsapp/share',
      href: `whatsapp://send?text=${text}`,
      Icon: WhatsAppIcon,
      name: 'WhatsApp'
    },
    facebook: {
      href: `fb-messenger://share/?message=${text}`,
      Icon: FacebookIcon,
      name: 'Facebook'
    },
    telegram: {
      href: `href="tg://msg?text=${text}`,
      Icon: FacebookIcon,
      name: 'Telegram'
    },
    email: {
      href: `mailto:?subject=${title}&body=${text}`,
      Icon: EmailIcon,
      name: 'Email'
    },
    sms: {
      href: `sms:?body=${text}`,
      Icon: SmsIcon,
      name: 'SMS'
    }
  }

  return platformMap[platform]
}

const Platform = ({ platform, title, text }) => {
  const { href, dataAction, Icon, name } = createPlatformData(
    platform,
    title,
    text
  )
  return (
    <Link
      href={href && href}
      target='_blank'
      data-action={dataAction && dataAction}
    >
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <PlatformName>
        {name}
      </PlatformName>
    </Link>
  )
}

Platform.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

const Platforms = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & > *:last-child {
    margin-right: 0;
  }

  & > *:first-child {
    margin-left: 0;
  }
`

const Copy = ({ text, url }) => (
  <Button
    onClick={() => {
      copy(text + ' ' + url)
    }}
  >
    <IconWrapper>
      <CopyIcon />

    </IconWrapper>
    <PlatformName>
      Copy
    </PlatformName>
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
                <Platforms>
                  {platforms.map((platform, index) => {
                    return (
                      <Platform
                        key={index}
                        platform={platform}
                        onClick={this.props.onShare}
                      />
                    )
                  })}
                  <Copy />
                </Platforms>
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
