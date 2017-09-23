import * as React from 'react'
import { PureComponent, Component } from 'react'
import { actions, store } from "./Dataflow"
// Todo
// Show Graph
// format of the a news content
// tags
export default class KB extends Component<any, { news: any[] }>{
    state = store.getState()
    componentDidMount() {
        store.subscribe(() => {
            console.log('changed')
            this.setState(store.getState())
        })
    }

    render() {
        const { news } = this.state
        return <div className="news">
            <h1>What's up</h1>
            <button onClick={() => store.dispatch(actions.fetchFeed)}>FakeFeed</button>
            <div>
                {news.map((item, i) => <News {...item} key={i} />)}
            </div>
        </div>
    }
}

class News extends PureComponent<{ title: string, content: string, authors: string[] }, { expand: boolean }>{
    // A news, may expand if necessary
    state = { expand: false }
    render() {
        const { title, content, authors } = this.props
        const { expand } = this.state
        return <div className={expand ? "newsdetail" : "newsbrief"} onClick={() => this.maybeExpand(!expand)}>
            <h3>{title}</h3>
            <span>{authors.join(', ')}</span>
            <p>{content}</p>
            <button onClick={(ev) => this.showGraph(ev)}>Graph</button>
        </div>
    }
    maybeExpand(really) {
        this.setState({ expand: really })
    }
    showGraph(ev) {
        ev.stopPropagation()
        const { content } = this.props
        console.log("showing", content)
    }
}