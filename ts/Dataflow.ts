import { createStore } from 'redux'
// Todo, actually fetch feed
function reducer(prevState = { news: [], currentAuthor: { tags: [], email: "" } }, action: { [any: string]: any }) {
    const state = prevState
    switch (action.type) {
        case "fetchFeed":
            state.news.push({ content: (new Date()).toString().repeat(50), authors: ["Rain"], title: "The new legend" })
            break;
        case "findAuthor": {
            state.currentAuthor = {
                tags: ["react", "pancake"],
                email: "slk49@live.cn"
            }
        }
    }
    return state
}

export const actions = {
    "fetchFeed": {
        type: "fetchFeed"
    },
    "findAuthor": {
        type: "findAuthor"
    }
}

export const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
Object.assign(window, { actions, store })