import * as React from 'react'
import { PureComponent } from 'react'

export class Modal extends PureComponent<{ children: any, exit: Function }, any>{
    bgClick(ev) {
        // ev.target.style.display="none"
        this.props.exit()
        ev.stopPropagation()        
    }
    insideClick(ev) {
        ev.stopPropagation()
    }
    render() {
        const { children } = this.props
        return <div className="modalbg" onClick={(ev) => this.bgClick(ev)}>
            <div className="modal" onClick={(ev) => this.insideClick(ev)}>
                {...children}
            </div>
        </div >
    }
}