import * as React from 'react'
import { PureComponent } from 'react'
import { Author } from './Author'
import { task, newProject } from './graph'

class Todoitem extends PureComponent<{ item: task }, any>{
    render() {
        const { item } = this.props
        return <div className="item">
            <input type="checkbox" name={item.title} checked={item.completed} />
            <p contentEditable>{item.title}</p>
            <button>Note</button>
            <button>Remove</button>
        </div>
    }
}

class TodoList extends PureComponent<{ project: task }, any>{
    render() {
        const { project } = this.props
        const items = project.children
        return <div className="todolists">
            {project.authors.map(author => <Author author={author} key={author} />)}
            <h1>{project.title}</h1>
            <button>Notes</button>
            <p>Add an item</p>
            {items.map(item => <Todoitem item={item} key={item.title} />)}
        </div>
    }
}

export default class Todo extends PureComponent<any, any>{
    state = { project: newProject("Pancake", "Team Remi") }
    render() {
        return <TodoList project={this.state.project} />
    }
}