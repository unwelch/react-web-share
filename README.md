# react-web-share

> React Web Share is a component that checks if [Web Share API](https://developers.google.com/web/updates/2016/09/navigator-share) is supported in your browser. If is not the case, a fallback replacement appears as part of your website.

<!-- - Follows the "Do one thing and do it well" ([UNIX Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy))
- Look like iOS Share WidgetView.
- Uses [React Portal](https://reactjs.org/docs/portals.html), to avoid any CSS collision with your App.
- Uses [styled-components](http://styled-components.com), to forget about importing any CSS file in your App. -->

<!-- Web Share API is the interoperability between the web-native within Share features. -->
<!-- The fallback replacement should be specified  -->

#### Requirements
- **React > v16.0.0** - [Try out with CRA](https://github.com/facebook/create-react-app)
- **node > 8** - [How to install nodejs](https://nodejs.org/en/download/package-manager)

#### Installation
```bash
npm install --save react-web-share
# or
yarn add react-web-share
```

#### Usage
The `children` of WebShare component is the trigger of the Web Share API or the Fallback UI to appear.
```js
import React from 'react'
import ReactDOM from 'react-dom'
import WebShare from 'react-web-share'

const Demo = () => (
  <WebShare>
    <button onClick={console.log}>{'Share'}</button>
  </WebShare>
)

ReactDOM.render(<Demo />, document.getElementById('root'))
```

#### Props
```js
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

```

Highly inspired in: [github.com/nimiq/web-share-shim](https://nimiq.github.io/web-share-shim/demo)
