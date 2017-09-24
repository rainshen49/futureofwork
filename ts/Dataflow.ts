import { Author } from './Author';
import { createStore } from 'redux'
import { newProject, task, complete, cancel, removeChild, addChild, addTag, setNote } from './Graph'

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
    project: newProject("Make Green Tea Frappcino", "Lingkai Shen"),
    currentAuthor: {
        tags: ['cook', 'react'],
        email: "slk49@live.cn",
        name: "Lingkai Shen"
    },
    knowledgebase: [
        { "title": "Make waffle", "author": "Team Remi", "children": [{ "title": "pour onto the waffle iron, wait 2min", "author": "Team Remi", "children": [{ "title": "mix flour, baking powder, eggs etc", "author": "Team Remi", "children": [], "note": "", "completed": true, "tags": [] }, { "title": "whip cream", "author": "Team Remi", "children": [], "note": "Use an electronic whisk to whip 35% cream until it becomes puffy", "completed": true, "tags": [] }], "note": "", "completed": true, "tags": [] }], "note": "Need electronic whisk and waffle iron", "completed": false, "tags": ["breakfast", "react"] }
    ],
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

addChild(initialState.project, newProject("Matcha tea", initialState.currentAuthor.name))

function reducer(prevState: StoreState = initialState, action: { [any: string]: any }) {
    const state: StoreState = prevState
    const project = state.project
    switch (action.type) {
        case "addItem": {
            addChild(project, newProject(action.title, project.author))
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
                    // find that child
                    target = child
                }
            })
            removeChild(project, target)
            break;
        }
        case "subItem": {
            // make an item a dependency of another
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
            // add that tag to the author as well
            const author = state.currentAuthor
            author.tags.push(...project.tags)
            author.tags = Array.from(new Set(author.tags))
            break;
        }
        case "addProjNotes": {
            setNote(project, action.note)
            break;
        }
        case "addNote": {
            const { title, note } = action
            project.children.forEach(ch => {
                if (ch.title === title) {
                    setNote(ch, note)
                }
            })
            break;
        }
        case "importProject": {
            const { children } = action
            children.forEach(child=>{
                addChild(state.project,child)
            })
            break;
        }
    }
    return state
}

export const actions = {
    "importProject": {
        type: "importProject",
        children: []
    },
    "addItem": {
        type: "addItem",
        title: ""
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
    },
    "addProjNotes": {
        type: "addProjNotes"
    },
    "addNote": {
        type: "addNote",
        title: "",
        note: ""
    }
}


export const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
Object.assign(window, { actions, store })