import * as React from 'react'
import { PureComponent } from 'react'
export default class BottomNav extends PureComponent<{ items: {} }, any> {
    state = { Component: ()=><div></div> }
    render() {
        const { items } = this.props
        const { Component } = this.state
        return <div>
            <Component />
            <nav>
                {
                    Object.keys(items).map(name =>
                        <a href={"#" + name} onClick={() => this.setState({ Component: items[name] })} key={name}>{name}</a>
                    )
                }
            </nav>
        </div>
    }
}