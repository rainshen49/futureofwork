import * as React from "react"
import { PureComponent } from 'react'
import { render } from "react-dom"
import { $ } from './$'
import KB from "./KB"
import Todo from './Todo'
import Opportunity from './Opportunity'

class App extends PureComponent<{ items: { [any: string]: any } }, any> {
    // default render the news page
    state = { Page: this.props.items.Project }
    render() {
        const { items } = this.props
        const { Page } = this.state
        return <div>
            <nav>
                {
                    Object.keys(items).map(name =>
                        <a href={"#" + name} onClick={() => this.setState({ Page: items[name] })} key={name}>{name}</a>
                    )
                }
            </nav>
            <main>
                <Page />
            </main>
        </div>
    }
}

render(<App items={{ Project: Todo, Explore: KB, Opportunity }} />, $('#app'))