import * as React from 'react'
import { PureComponent, Component } from 'react'
import { actions, store } from "./Dataflow"
import { task } from './Graph'
import { Author } from './Author'
import { Tag } from './Tag';
import { Project } from './Graph'
import { searchTop, Query, parse } from './searcher'
import { Modal } from './Modal';
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
            {expand && <Project {...this.props} />}
        </div>
    }
    maybeExpand(really) {
        this.setState({ expand: really })
    }
}

class Search extends Component<{ projects: task[] }, { results: task[], modal: boolean }>{
    state = { results: [], modal: false, criteria: "" }
    realTimeResult(ev) {
        const criteria = ev.target.value
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
    startSearch() {
        this.setState({ modal: true })
    }
    render() {
        const { results, modal, criteria } = this.state
        const Common = <div className="search">
            <input autoFocus={modal ? true : false} type="text" placeholder="field1=RegExp\&field2=RegExp..." onInput={ev => this.realTimeResult(ev)} onClick={() => this.startSearch()} />
            <span>Search</span>
            <div className="results">
                {modal && results.map((result, i) => <News {...result} key={i} />)}
            </div>
        </div>

        return modal ?
            <Modal exit={() => this.setState({ modal: false })}>
                {Common}
            </Modal > :
            Common
    }
}
export default class KB extends Component<any, any>{
    state = { projects: store.getState().knowledgebase.slice(0, 10) }
    componentDidMount() {
        this.componentWillUnmount = store.subscribe(() => {
            this.setState({ projects: store.getState().knowledgebase.slice(0, 10) })
        })
    }

    render() {
        const { projects } = this.state
        return <div className="news">
            <h1>What's up</h1>
            <Search projects={projects} />
            <div>
                {projects.map((item, i) => <News {...item} key={i} />)}
            </div>
        </div>
    }
}