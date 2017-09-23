import * as React from 'react'
import { PureComponent } from 'react'
import { store, actions } from './Dataflow'
import { Tag } from './Tag'
import { Modal } from './Modal'
// renders a nice block of the author's initials
export function DetailAuthor({ author, tags, email }) {
    return <div className="detail author">
        <h1>{author}</h1>
        {tags.map(tag => <Tag tag={tag} key={tag} />)}
        <a href={"mailto:" + email} >{email}</a>
    </div>
}

export class Author extends PureComponent<{ author: string }, { detail: boolean }> {
    state = { detail: false }
    showDetail(ev) {
        this.setState({ detail: true })
        store.dispatch({ ...actions.findAuthor, author: this.props.author })
    }
    hide() {
        console.log('hiding')
        this.setState({ detail: false })
    }
    render() {
        const { author } = this.props
        const { detail } = this.state
        return <div className="author" onClick={ev => this.showDetail(ev)}>        
            {author.toUpperCase().split(' ').map(au => au[0])}
            {detail &&
                <Modal exit={() => this.hide()}>
                    <DetailAuthor {...store.getState().currentAuthor} author={author}/>
                </Modal>
            }
        </div>
    }
}