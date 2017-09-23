import * as React from 'react'
import { PureComponent } from 'react'
import { Author } from './Author'
import { Tag } from './Tag'
import { store, actions } from './Dataflow'

export interface task {
    "title": string,
    "author": string,
    "completed": boolean,
    "children"?: task[],
    "note"?: string,
    "tags"?: string[]
}
// use component nesting to get a graph

export function newProject(title: string, author: string): task {
    const Project = {
        title,
        author,
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
export function addChild(proj, child: task) {
    proj.children.push(child)
}
export function removeChild(proj, child: task) {
    proj.children.splice(proj.children.indexOf(child), 1)
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
        const { title, author, children, note, tags } = tsk
        return <div className="task">
            <h2>{title}</h2>
            {/* <Author author={author} /> */}
            {this.state.expanded && children.map(child => <Task tsk={child} key={child.title} />)}
            <p>{note}</p>
        </div>
    }
}

export function Overview() {
    const { title, author, children, note, tags } = store.getState().project
    return <div className="project task">
        <h2>{title}</h2>
        <Author author={author} />
        {children.map(child => <Task tsk={child} key={child.title} />)}
        <p>{note}</p>
        {tags.map(tag => <Tag tag={tag} key={tag} />)}
    </div>
}
