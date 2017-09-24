import * as React from 'react'
import { PureComponent, Component } from 'react'
import { actions, store } from "./Dataflow"
import { task } from './Graph'
import { Author } from './Author'
import { Tag } from './Tag';
import { Project } from './Graph'
import { searchTop, Query, parse } from './searcher'
// Todo
// Show Graph
// format of the a news content
// tags

export class News extends PureComponent<task, { expand: boolean }>{
    // A news, may expand if necessary
    state = { expand: false }
    render() {
        const { title, author, tags, children, note } = this.props
        const { expand } = this.state
        return <div className={expand ? "newsdetail" : "newsbrief"} onClick={() => this.maybeExpand(!expand)}>
            {!expand && <h3>{title}</h3>}
            {!expand && <Author author={author} />}
            {!expand && tags.map(tag => <Tag tag={tag} key={tag} />)}
            {!expand && <p>{note}</p>}
            {expand && <Project {...this.props} mode="online" />}
        </div>
    }
    maybeExpand(really) {
        this.setState({ expand: really })
    }
}

class Search extends Component<{ projects: task[], switchMode: Function }, { results: task[] }>{
    state = { results: [] }
    realTimeResult(ev) {
        const criteria = ev.target.value
        if(criteria===""){
            this.stopSearch()
        }else{
            const queries = parse(criteria)
            console.log('parsed', queries)
            if (queries.length) {
                this.setState({
                    results: queries.reduce((prev, curr) => {
                        return searchTop(prev, curr)
                    }, this.props.projects)
                })
            }
        }
    }
    startSearch() {
        this.props.switchMode(true)
    }
    stopSearch() {
        this.props.switchMode(false)
        this.setState({ results: [] })
    }
    render() {
        const { results } = this.state
        return <div className="search">
            <div className="searchbar">
                <input type="text" placeholder="field1=RegExp\&field2=RegExp..."
                    onInput={ev => this.realTimeResult(ev)} onClick={() => this.startSearch()} />
                <img src="https://www.rbcroyalbank.com/dvl/v0.1/assets/images/ui/ui-search-thin-blue.svg" alt="Search" />
            </div>
            <div className="results">
                {results.map((result, i) => <News {...result} key={i} />)}
            </div>
        </div>
    }
}

export default class KB extends Component<any, any>{
    state = { projects: store.getState().knowledgebase.slice(0, 10), searching: false }
    componentDidMount() {
        this.componentWillUnmount = store.subscribe(() => {
            this.setState({ projects: store.getState().knowledgebase.slice(0, 10) })
        })
    }

    render() {
        const { projects, searching } = this.state
        return <div className="news">
            <h1>What's up</h1>
            <Search projects={projects} switchMode={(searching) => this.setState({ searching })} />
            {!searching && <div>
                {projects.map((item, i) => <News {...item} key={i} />)}
            </div>}
        </div>
    }
}