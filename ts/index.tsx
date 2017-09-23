import * as React from "react"
import { PureComponent } from 'react'
import { render } from "react-dom"
import { $ } from './$'
import NewsFeed from "./NewsFeed"
import Todo from './Todo'

class App extends PureComponent<{ items: {[any:string]:any} }, any> {
    // default render the news page
    state = { Page: this.props.items.NewsFeed }
    render() {
        const { items } = this.props
        const { Page } = this.state
        return <div>
            <main>
                <Page />
            </main>
            <nav>
                {
                    Object.keys(items).map(name =>
                        <a href={"#" + name} onClick={() => this.setState({ Page: items[name] })} key={name}>{name}</a>
                    )
                }
            </nav>
        </div>
    }
}

render(<App items={{ NewsFeed, Todo }} />, $('#app'))