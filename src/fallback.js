import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import WhatsAppIcon from 'react-icons/lib/fa/whatsapp'
// import TelegramIcon from 'react-icons/lib/fa/telegram-plane'
import EmailIcon from 'react-icons/lib/fa/envelope'
// import SmsIcon from 'react-icons/lib/fa/comment-alt'
import CopyIcon from 'react-icons/lib/fa/copy'
import copy from 'copy-text-to-clipboard'

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  Overlay: rgba(0, 0, 0, 0);
  transition: Overlay .4s;
  padding: 8px;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 100000;
`

const Modal = styled.div`
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 8px;
  background: #f8f8f8;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, .5) 0 2px 4px;
  padding: 16px 23px;
  text-align: left;
  color: #000;
  transform: translateY(10vh);
  opacity: 0;
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
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, .5) 0 2px 4px;
  padding: 16px 23px;
  text-align: left;
  color: #000;
`

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
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, .5) 0 2px 4px;
  padding: 16px 23px;
  text-align: left;
  color: #000;
`

const createPlatformData = (platform, title, text) => {
  const platformMap = {
    whatsapp: {
      dataAction: 'share/whatsapp/share',
      href: `whatsapp://send?text=${text}`,
      Icon: WhatsAppIcon
    },
    facebook: {
      href: `fb-messenger://share/?message=${text}`,
      Icon: FacebookIcon
    },
    telegram: {
      href: `href="tg://msg?text=${text}`,
      Icon: TelegramIcon
    },
    email: {
      href: `mailto:?subject=${title}&body=${text}`,
      Icon: EmailIcon
    },
    sms: {
      href: `sms:?body=${text}`,
      Icon: SmsIcon
    }
  }

  return platformMap[platform]
}

const Platform = ({ platform, title, text }) => {
  const { href, dataAction, Icon } = createPlatformData(platform, title, text)
  return (
    <Link href={href} target='_blank' data-action={dataAction && dataAction}>
      <Icon />
      <Title>
        {title}
      </Title>
    </Link>
  )
}

Platform.propTypes = {
  platform: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

const Copy = ({ text, url }) => (
  <Button
    onClick={() => {
      copy(text + ' ' + url)
    }}
  >
    <CopyIcon />
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
    platforms: PropTypes.string,
    platform: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.el = document.createElement('div')

    this.state = {
      isOpen: false
    }
  }

  componentDidMount () {
    // TODO: Do it with React Portal
    // https://reactjs.org/docs/portals.html
    // modalRoot.appendChild(this.el);
  }

  componentWillUnmount () {
    // modalRoot.removeChild(this.el)
  }

  handleFooterClick = event => {
    const { onShareFail } = this.props
    this.setState(
      {
        isOpen: true
      },
      () => {
        onShareFail()
      }
    )
  }

  handlePlatformClick = event => {
    const { onShare } = this.props
    this.setState(
      {
        isOpen: true
      },
      () => {
        onShare()
      }
    )
  }

  render () {
    const { platforms } = this.props
    return (
      <Fragment>
        <Modal>
          <ModalBody>
            <Title>
              Share via
            </Title>
            {platforms.map((platform, index) => {
              return (
                <Platform {...platform} onClick={this.handlePlatformClick} />
              )
            })}
            <Copy />
          </ModalBody>
          <ModalFooter onClick={this.handleFooterClick}>
            Cancel
          </ModalFooter>
        </Modal>
        <Overlay />
      </Fragment>
    )
  }
}

export default Fallback
