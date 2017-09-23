import * as React from 'react'
import { PureComponent } from 'react'
import { Author } from './Author'
import { Tag } from './Tag'

export interface task {
    "title": string,
    "authors": string[]
    "completed": boolean,
    "children"?: task[],
    "note"?: string,
    "tags"?: string[]
}
// use component nesting to get a graph

export function newProject(title: string, author: string): task {
    const Project = {
        title,
        authors: [author],
        children: [],
        note: "",
        completed: false,
        tags: []
    }
    return Project
}

export function complete(proj) {
    proj.completed = true
}
export function cancel(proj) {
    proj.completed = false
}
export function setitle(proj, newTitle) {
    proj.title = newTitle
}
export function addChildren(proj, ...children: task[]) {
    proj.children.push(...children)
}
export function removeChild(proj, child: task) {
    proj.children.splice(this.children.indexOf(child))
}
export function addAuthor(proj, author) {
    proj.authors.push(author)
}
export function setNote(proj, newNote) {
    proj.note = newNote
}
export function addTag(proj, tag: string) {
    proj.tags.push(tag)
}

class Task extends PureComponent<{ tsk: task }, { expanded: boolean }>{
    state = { expanded: true }
    render() {
        const { tsk } = this.props
        const { title, authors, children, note, tags } = tsk
        return <div className="task">
            <h2>{title}</h2>
            {authors.map(author => <Author author={author} key={author} />)}
            {this.state.expanded && children.map(child => <Task tsk={child} key={child.title} />)}
            <p>{note}</p>
        </div>
    }
}

export function Project({ tsk: task }) {
    const { tsk } = this.props
    const { title, authors, children, note, tags } = tsk
    return <div className="project task">
        <h2>{title}</h2>
        {authors.map(author => <Author author={author} key={author} />)}
        {children.map(child => <Task tsk={child} key={child.title} />)}
        <p>{note}</p>
        {tags.map(tag => <Tag tag={tag} key={tag} />)}
    </div>
}
