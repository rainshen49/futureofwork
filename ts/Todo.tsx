import * as React from 'react'
import { PureComponent, Component } from 'react'
import { Author } from './Author'
import { task, newProject } from './graph'
import { store, actions } from './Dataflow'

class Todoitem extends Component<{ item: task }, any>{
    submitEdit(ev) {
        const newname = ev.target.textContent.replace(/\n/g,"")
        if (ev.key === "Enter") {
            ev.preventDefault()
            ev.stopPropagation()
            store.dispatch({ ...actions.renameItem, oldname: this.props.item.title, newname })
        }
    }
    onCheck(ev) {
        console.log(ev.target.checked,'checked')
        store.dispatch({ ...actions.checkItem, title: this.props.item.title, done: ev.target.checked })
    }
    remove() {
        store.dispatch({ ...actions.deleteItem, title: this.props.item.title })
    }
    render() {
        const { item } = this.props
        return <div className={"item" + (item.completed ? " completed" : "")}>
            <input type="checkbox" name={item.title} checked={item.completed} onClick={ev => this.onCheck(ev)} />
            <p contentEditable onKeyUp={(ev) => this.submitEdit(ev)}>{item.title}</p>
            <button>Note</button>
            <button onClick={() => this.remove()}>Remove</button>
        </div>
    }
}

class TodoList extends Component<any, any> {
    state = { children: store.getState().project.children }
    newtitle = ""
    componentDidMount() {
        store.subscribe(() =>
            this.setState({ children: store.getState().project.children })
        )
    }

    typingNewItem(ev) {
        const newtitle = ev.target.value.replace(/\n/g, "")
        this.newtitle = newtitle
        // console.log('typing', newtitle)
    }
    addItem(newtitle = this.newtitle) {
        store.dispatch({ ...actions.addItem, title: newtitle })
    }
    enter(ev) {
        if (ev.key === "Enter") {
            this.addItem()
            ev.target.value = ""
        }
    }
    render() {
        const { children } = this.state
        return <div>
            <input type="text" onInput={(ev) => this.typingNewItem(ev)} onKeyUp={ev => this.enter(ev)} placeholder="Add an item" />
            {children.map(item => <Todoitem item={item} key={item.title} />)}
        </div>
    }
}

export default class Todo extends PureComponent<any, task>{
    state = store.getState().project
    componentDidMount() {
        store.subscribe(() => this.setState(store.getState().project))
    }
    render() {
        const { author, children, title } = this.state
        return <div className="todolists">
            <Author author={author} />
            <h1>{title}</h1>
            <button>Notes</button>
            <TodoList children={children} />
        </div>
    }
}