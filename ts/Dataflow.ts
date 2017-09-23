import { Author } from './Author';
import { createStore } from 'redux'
import { newProject, task, complete, cancel, removeChild, addChild, addTag } from './Graph'

interface contributer {
    tags: string[],
    email: string,
    name: string
}

interface StoreState {
    project?: task,
    currentAuthor?: contributer,
    knowledgebase?: task[],
    interestingAuthors?: contributer[]
}

const initialState: StoreState = {
    project: newProject("Make pancake", "Team Remi"),
    currentAuthor: {
        tags: ['cook', 'react'],
        email: "slk49@live.cn",
        name: "Team Remi"
    },
    knowledgebase: [],
    interestingAuthors: [
        {
            tags: ['cook', 'react'],
            email: "team@remi.com",
            name: "Team Remi"
        },
        {
            tags: ['cook', 'design'],
            email: "emily@rbc.ca",
            name: "Emily Zhang"
        }
    ]
}

initialState.project.children = [newProject("Whip cream", initialState.project.author), newProject("Whip more cream", initialState.project.author)]
addTag(initialState.project, "react")
addTag(initialState.project, "oven")


function reducer(prevState: StoreState = initialState, action: { [any: string]: any }) {
    const state: StoreState = prevState
    const project = state.project
    switch (action.type) {
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
        case "addTag": {
            const { newtag } = action
            addTag(project, newtag)
            break;
        }
        case "publish": {
            state.knowledgebase.push(state.project)
            const author = state.interestingAuthors.filter(({ name }) => name === state.project.author)[0]
            author.tags.push(...project.tags)
            author.tags = Array.from(new Set(author.tags))
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
    },
    "addTag": {
        type: "addTag",
        newtag: ""
    },
    "publish": {
        type: "publish",
    }
}

export const actions = {
    ...projectActions
}

export const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
Object.assign(window, { actions, store })