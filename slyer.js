import Slyer from 'slyer'
import React, {PropTypes} from 'react'
import _ from 'lodash'

const options = {
  horizontal: 1,
  itemNav: 'basic',
  speed: 300,
  mouseDragging: 1,
  touchDragging: 1,
  smart: 1
}

class Sly extends React.Component {
  constructor () {
    super()
    this.resizeHandler = _.debounce(() => {
      this.frame.reload()
    }, 100)
  }
  componentDidMount () {
    if (!this.frame) {
      this.frame = new Slyer(this.refs.sly, options).init()
      if (this.props.onInit) {
        this.props.onInit(this.frame)
      }
    } else {
      this.frame.reload()
    }
    window.addEventListener('resize', this.resizeHandler, true)
  }
  componentWillUnmount () {
    this.frame.destroy()
    window.removeEventListener('resize', this.resizeHandler)
  }
  render () {
    const {props} = this
    const propsToPass = _.omit(props, 'children')

    return <div ref='sly' {...propsToPass} className='frame'>
      <div className='slidee' style={{
        display: 'flex'
      }}>
        {props.children}
      </div>
    </div>
  }
}

Sly.propTypes = {
  disabled: PropTypes.bool,
  onInit: PropTypes.func
}

export default Sly
