import * as React from 'react'
import { PureComponent, Component } from 'react'
import { Author } from './Author'
import { task, newProject } from './graph'
import { store, actions } from './Dataflow'
import { Editable } from './Editable';

class Todoitem extends Component<{ item: task }, any>{
    state = { status: "" }
    submitEdit(newname) {
        store.dispatch({ ...actions.renameItem, oldname: this.props.item.title, newname })
    }
    onCheck(ev) {
        console.log(ev.target.checked, 'checked')
        store.dispatch({ ...actions.checkItem, title: this.props.item.title, done: ev.target.checked })
    }
    remove() {
        this.setState({ status: "fading" })
        setTimeout(() => store.dispatch({ ...actions.deleteItem, title: this.props.item.title }), 300)

    }
    pickup(ev) {
        console.log('picked up')
        ev.dataTransfer.setData("text", this.props.item.title);
        ev.target.classList.add('afloat')
    }
    restoreinplace(ev) {
        ev.target.classList.remove('afloat')
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
    touchstart(ev) {
        // console.log('touhstart',ev)
        // ev.persist()
        ev.target.classList.add('afloat')        
    }
    touchmove(ev){
        console.log('moving',ev)
        ev.persist()
        ev.stopPropagation()
        ev.preventDefault()
        const location = ev.touches[0]
        console.log(location)
        ev.target.style.left = location.pageX+"px";
        ev.target.style.top = location.pageY+"px";
    }
    render() {
        const { item } = this.props
        const { status } = this.state
        return <div className={"item " + (item.completed ? "completed" : "") + status}
            onDragOver={ev => this.over(ev)}
            onDrop={(ev) => this.drop(ev)}>
            {item.completed && <img className="dragger" src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png"
                onDragStart={(ev) => this.pickup(ev)}
                onDragEnd={ev => this.restoreinplace(ev)}
                onTouchStart={ev => this.touchstart(ev)}
                onTouchMoveCapture={ev=>this.touchmove(ev)}
                onTouchEnd={ev=>this.restoreinplace(ev)}
            ></img>}
            <input type="checkbox" name={item.title} checked={item.completed} onClick={ev => this.onCheck(ev)} />
            <Editable save={txt => this.submitEdit(txt)}>{item.title}</Editable>
            <i onClick={() => this.addNote()}>📄</i>
            <i onClick={() => this.remove()}>🗑</i>
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
            <input className="additem" type="text" onInput={(ev) => this.typingNewItem(ev)} onKeyUp={ev => this.enter(ev)} placeholder="Add an item" />
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
        const { children, title } = this.state
        return <div className="todolists">
            <i onClick={() => this.projectNote()}>📄</i>
            <h1>{title}</h1>
            <TodoList children={children} />
        </div>
    }
}