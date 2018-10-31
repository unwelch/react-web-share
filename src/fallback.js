import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import WhatsAppIcon from 'react-icons/lib/fa/whatsapp'
import TelegramIcon from 'react-icons/lib/fa/telegram-plane'
import EmailIcon from 'react-icons/lib/fa/envelope'
import SmsIcon from 'react-icons/lib/fa/comment-alt'
import CopyIcon from 'react-icons/lib/fa/copy'
import copy from 'copy-text-to-clipboard'

// static propTypes = {
//   url: PropTypes.string,
//   title: PropTypes.string,
//   text: PropTypes.string,
//   onShareSuccess: PropTypes.func,
//   onShareFail: PropTypes.func,
//   children: PropTypes.node
// }

const Overlay = styled.div`
  position: fixed;
  top: -10px;
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

const Modal = styled.div``
const Title = styled.div``
const Link = styled.a``
const Button = styled.button``
const ModalBody = styled.div``
const ModalFooter = styled.div``

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

class Fallback extends Component {
  componentWillMount () {
    // TODO: Do it with React Portal
    // https://reactjs.org/docs/portals.html
    // document.createElement('div')
    // document.append()
  }

  handleFooterClick = event => {
    console.log('log: ', 'closed')
  }

  handlePlatformClick = event => {
    console.log('log: ', 'clicked')
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
