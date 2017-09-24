import * as React from 'react'
import { PureComponent, Component } from 'react'
import { Author } from './Author'
import { task, newProject } from './graph'
import { store, actions } from './Dataflow'

class Todoitem extends Component<{ item: task }, any>{
    submitEdit(ev) {
        const newname = ev.target.textContent.replace(/\n/g, "")
        if (ev.key === "Enter") {
            ev.preventDefault()
            ev.stopPropagation()
            store.dispatch({ ...actions.renameItem, oldname: this.props.item.title, newname })
        }
    }
    onCheck(ev) {
        console.log(ev.target.checked, 'checked')
        store.dispatch({ ...actions.checkItem, title: this.props.item.title, done: ev.target.checked })
    }
    remove() {
        store.dispatch({ ...actions.deleteItem, title: this.props.item.title })
    }
    pickup(ev) {
        console.log('picked up')
        ev.dataTransfer.setData("text", this.props.item.title);
    }
    over(ev) {
        ev.preventDefault();
    }
    drop(ev) {
        ev.preventDefault();
        const title = ev.dataTransfer.getData("text")
        store.dispatch({ ...actions.subItem, child: title, parent: this.props.item.title })
    }
    addNote() {
        const note = prompt("What is your note?", this.props.item.note)
        if (note) {
            store.dispatch({ ...actions.addNote, title: this.props.item.title, note })
        }
    }
    render() {
        const { item } = this.props
        return <div className={"item" + (item.completed ? " completed" : "")}
            onDragOver={ev => this.over(ev)}
            onDrop={(ev) => this.drop(ev)}>
            <input type="checkbox" name={item.title} checked={item.completed} onClick={ev => this.onCheck(ev)} />
            <p contentEditable onKeyUp={(ev) => this.submitEdit(ev)}>{item.title}</p>
            <button onClick={() => this.addNote()}>Note</button>
            <button onClick={() => this.remove()}>Remove</button>
            <img className="dragger" src="http://www.iconninja.com/files/741/109/210/tree-icon.png"
                onDragStart={(ev) => this.pickup(ev)}
            ></img>
        </div>
    }
}

class TodoList extends Component<any, any> {
    state = { children: store.getState().project.children }
    newtitle = ""
    componentDidMount() {
        this.componentWillUnmount = store.subscribe(() =>
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
    state = { ...store.getState().project }
    componentDidMount() {
        this.componentWillUnmount = store.subscribe(() => this.setState(store.getState().project))
    }
    projectNote() {
        const note = prompt("What is your note?", this.state.note)
        if (note) {
            store.dispatch({ ...actions.addProjNotes, note })
        }
    }
    render() {
        const { author, children, title } = this.state
        return <div className="todolists">
            <Author author={author} />
            <h1>{title}</h1>
            <button onClick={() => this.projectNote()}>Notes</button>
            <TodoList children={children} />
        </div>
    }
}