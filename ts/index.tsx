import * as React from "react"
import { PureComponent } from 'react'
import { render } from "react-dom"
import { $ } from './$'
import KB from "./KB"
import Todo from './Todo'
import Opportunity from './Opportunity'
import { Overview } from './Graph'
import { Author } from "./Author";
import { store } from "./Dataflow";

const author = store.getState().currentAuthor.name
class App extends PureComponent<{ items: { [any: string]: any } }, any> {
    // default render the news page
    state = { Page: this.props.items.Project, currentlink: "Project" }
    render() {
        const { items } = this.props
        const { Page, currentlink } = this.state
        return <div>
            <nav>
                <Author author={author} />

                {Object.keys(items).map(name =>
                    <a href={"#" + name} onClick={() => this.setState({ Page: items[name], currentlink: name })} key={name} className={currentlink === name ? "current" : ""}>{name}</a>
                )}
            </nav>
            <main>
                <Page />
            </main>
        </div>
    }
}

render(<App items={{ Project: Todo, Overview, Explore: KB, Opportunity }} />, $('#app'))