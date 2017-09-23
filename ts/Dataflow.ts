import { Author } from './Author';
import { createStore } from 'redux'
import { newProject, task, complete, cancel, removeChild, addChild } from './Graph'
interface StoreState {
    news?: any[],
    project?: task,
    currentAuthor?: {
        tags: string[],
        email: string,
        name: string
    }
}
// Todo, actually fetch feed
const initialState: StoreState = {
    news: [],
    project: newProject("Make pancake", "Team Remi"),
    currentAuthor: {
        tags: ['cook', 'react'],
        email: "slk49@live.cn",
        name: "Team Remi"
    }
}

initialState.project.children = [newProject("Whip cream", initialState.project.author), newProject("Whip more cream", initialState.project.author)]

function reducer(prevState: StoreState = initialState, action: { [any: string]: any }) {
    const state: StoreState = prevState
    const project = state.project
    switch (action.type) {
        case "fetchFeed":
            state.news.push({ content: (new Date()).toString().repeat(50), authors: ["Rain"], title: "The new legend" })
            break;
        case "findAuthor": {
            state.currentAuthor = {
                name: action.author,
                tags: ["react", "pancake"],
                email: "slk49@live.cn"
            }
            break;
        }
        case "addItem": {
            project.children.push(newProject(action.title, project.author))
            break;
        }
        case "renameItem": {
            const { oldname, newname } = action
            project.children.forEach(child => {
                if (child.title === oldname) {
                    child.title = newname
                }
            })
            break;
        }
        case "checkItem": {
            // console.log('action checkitem',action)
            const { title, done } = action
            project.children.forEach(child => {
                if (child.title === title) {
                    if (done) complete(child)
                    else cancel(child)
                }
            })
            break;
        }
        case "deleteItem": {
            const { title } = action
            let target;
            project.children.forEach(child => {
                if (child.title === title) {
                    target = child
                }
            })
            console.log(title, 'target', target)
            removeChild(project, target)
            break;
        }
        case "subItem": {
            const { parent, child } = action
            if (parent === child) throw "cannot be the same item"
            let parentitem, childitem;
            project.children.forEach(ch => {
                if (ch.title === parent) {
                    parentitem = ch
                } else if (ch.title === child) {
                    childitem = ch
                }
            })
            addChild(parentitem, childitem)
            removeChild(project, childitem)
            break;
        }
    }
    return state
}

const projectActions = {
    "addItem": {
        type: "addItem"
    },
    "renameItem": {
        type: "renameItem"
    },
    "checkItem": {
        type: "checkItem",
        title: "",
        done: false
    },
    "deleteItem": {
        type: "deleteItem",
        title: ""
    },
    "subItem": {
        type: "subItem",
        parent: "",
        child: ""
    }
}

export const actions = {
    "fetchFeed": {
        type: "fetchFeed"
    },
    "findAuthor": {
        type: "findAuthor"
    },
    ...projectActions
}

export const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
Object.assign(window, { actions, store })