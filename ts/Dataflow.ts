import { createStore } from 'redux'
// Todo, actually fetch feed
function reducer(prevState = { news: [] }, action) {
    const state = prevState
    switch (action.type) {
        case "fetchFeed":
            state.news.push({ content: (new Date()).toString().repeat(50), authors: ["Rain"], title: "The new legend" })
            break;
    }
    return state
}

export const actions = {
    "fetchFeed": {
        type: "fetchFeed"
    }
}

export const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
Object.assign(window, { actions, store })