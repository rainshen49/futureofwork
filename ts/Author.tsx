import * as React from 'react'
import { PureComponent } from 'react'
import { store, actions } from './Dataflow'
import { Tag } from './Tag'
import { Modal } from './Modal'
import { searchTop } from './searcher';
// renders a nice block of the author's initials
export function DetailAuthor({ author }) {
    const { tags, email } = [...store.getState().interestingAuthors, store.getState().currentAuthor]
        .filter(({ name }) => name === author)[0]
    return <div className="detail author">
        <h1>{author}</h1>
        {tags.map(tag => <Tag tag={tag} key={tag} />)}
        <a href={"mailto:" + email} >{email}</a>
        {getAuthorProjects(author).map(title => <div key={title}>{title}</div>)}
    </div>
}

export class Author extends PureComponent<{ author: string }, { detail: boolean }> {
    state = { detail: false }
    showDetail(ev) {
        this.setState({ detail: true })
        ev.stopPropagation()
    }
    hide() {
        this.setState({ detail: false })
    }
    render() {
        const { author } = this.props
        const { detail } = this.state
        return <div className="author" onClick={ev => this.showDetail(ev)}>
            {author.toUpperCase().split(' ').map(au => au[0])}
            {detail &&
                <Modal exit={() => this.hide()}>
                    <DetailAuthor author={author} />
                </Modal>
            }
        </div>
    }
}

function getAuthorProjects(author) {
    return searchTop(store.getState().knowledgebase, {
        key: "author",
        matcher: new RegExp(author)
    }).map(project => project.title)
}