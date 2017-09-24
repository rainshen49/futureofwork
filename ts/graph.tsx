import * as React from 'react'
import { PureComponent, Component } from 'react'
import { Author } from './Author'
import { Tag } from './Tag'
import { store, actions } from './Dataflow'
import { $ } from './$';

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

export function cloneTask(proj){
    // make a shallow copy of a task, with no children and uncompleted
    const newproj:task = {...proj}
    newproj.children=[]
    newproj.completed=false
    newproj.tags=newproj.tags.slice(0)
    return newproj
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

export class Project extends Component<any, any> {
    state = { published: false }
    addTag(ev) {
        if (ev.key === "Enter") {
            const newtag = ev.target.value
            ev.target.value = ""
            store.dispatch({ ...actions.addTag, newtag })
        }
    }
    publish() {
        store.dispatch(actions.publish)
        this.setState({ published: true })
    }
    import(){
        $('a[href="#Project"]').click()
        store.dispatch({...actions.importProject,children:importProject(this.props)})
    }
    render() {
        const { title, author, children, note, tags,mode="local" } = this.props as any
        const { published } = this.state
        return <div className="project task">
            <h1>{title}</h1>
            <Author author={author} />
            {mode.includes("local") && <button className="primary" onClick={() => this.publish()} disabled={published}>{published ? "Done ✔" : "Publish ⬆"}</button>}
            {mode.includes("local") && <button>Download ⬇</button>}
            {mode.includes("online") && <button className="primary" onClick={()=>this.import()}>Import ⬇</button>}
            {tags.map(tag => <Tag tag={tag} key={tag} />)}
            <input type="text" name="newtag" placeholder="new tag" onKeyUp={(ev) => this.addTag(ev)} />
            <p>{note}</p>
            {children.map(child => <Task tsk={child} key={child.title} />)}
        </div>
    }
}

export class Overview extends Component<any, task>{
    state = store.getState().project
    componentDidMount() {
        this.componentWillUnmount = store.subscribe(() => {
            this.setState(store.getState().project)
        })
    }
    render() {
        return <Project {...this.state} />
    }
}

export function importProject(project){
    // flatten a whole project and mark each child as incomplete
    const children=[]
    traverse(project.children,children)
    return children
}

function traverse(children,target){
    children.forEach(child=>{
        target.push(cloneTask(child))
        traverse(child.children,target)
    })
}