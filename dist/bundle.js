/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = __webpack_require__(8);
const graph_1 = __webpack_require__(9);
// Todo, actually fetch feed
const initialState = {
    news: [],
    project: graph_1.newProject("Make pancake", "Team Remi"),
    currentAuthor: {
        tags: ['cook', 'react'],
        email: "slk49@live.cn",
        name: "Team Remi"
    }
};
initialState.project.children = [graph_1.newProject("Whip cream", initialState.project.author)];
function reducer(prevState = initialState, action) {
    const state = prevState;
    const project = state.project;
    switch (action.type) {
        case "fetchFeed":
            state.news.push({ content: (new Date()).toString().repeat(50), authors: ["Rain"], title: "The new legend" });
            break;
        case "findAuthor": {
            state.currentAuthor = {
                name: action.author,
                tags: ["react", "pancake"],
                email: "slk49@live.cn"
            };
        }
        case "addItem": {
            project.children.push(graph_1.newProject(action.title, project.author));
            break;
        }
        case "renameItem": {
            const { oldname, newname } = action;
            project.children.forEach(child => {
                if (child.title === oldname) {
                    child.title = newname;
                }
            });
            break;
        }
        case "checkItem": {
            // console.log('action checkitem',action)
            const { title, done } = action;
            project.children.forEach(child => {
                if (child.title === title) {
                    if (done)
                        graph_1.complete(child);
                    else
                        graph_1.cancel(child);
                }
            });
        }
        case "deleteItem": {
            const { title } = action;
            let target;
            project.children.forEach(child => {
                if (child.title === title) {
                    target = child;
                }
            });
            console.log(title, 'target', target);
            graph_1.removeChild(project, target);
        }
    }
    return state;
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
    }
};
exports.actions = Object.assign({ "fetchFeed": {
        type: "fetchFeed"
    }, "findAuthor": {
        type: "findAuthor"
    } }, projectActions);
exports.store = redux_1.createStore(reducer);
exports.store.subscribe(() => console.log(exports.store.getState()));
Object.assign(window, { actions: exports.actions, store: exports.store });


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Dataflow_1 = __webpack_require__(1);
const Tag_1 = __webpack_require__(3);
const Modal_1 = __webpack_require__(10);
// renders a nice block of the author's initials
function DetailAuthor({ author, tags, email }) {
    return React.createElement("div", { className: "detail author" },
        React.createElement("h1", null, author),
        tags.map(tag => React.createElement(Tag_1.Tag, { tag: tag, key: tag })),
        React.createElement("a", { href: "mailto:" + email }, email));
}
exports.DetailAuthor = DetailAuthor;
class Author extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { detail: false };
    }
    showDetail(ev) {
        this.setState({ detail: true });
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.findAuthor, { author: this.props.author }));
    }
    hide() {
        console.log('hiding');
        this.setState({ detail: false });
    }
    render() {
        const { author } = this.props;
        const { detail } = this.state;
        return React.createElement("div", { className: "author", onClick: ev => this.showDetail(ev) },
            author.toUpperCase().split(' ').map(au => au[0]),
            detail &&
                React.createElement(Modal_1.Modal, { exit: () => this.hide() },
                    React.createElement(DetailAuthor, Object.assign({}, Dataflow_1.store.getState().currentAuthor, { author: author }))));
    }
}
exports.Author = Author;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
// renders a nice block of the author's initials
function Tag({ tag }) {
    return React.createElement("span", { className: "tag" }, tag);
}
exports.Tag = Tag;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const react_dom_1 = __webpack_require__(5);
const _1 = __webpack_require__(6);
const KB_1 = __webpack_require__(7);
const Todo_1 = __webpack_require__(11);
const Opportunity_1 = __webpack_require__(12);
class App extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        // default render the news page
        this.state = { Page: this.props.items.Project };
    }
    render() {
        const { items } = this.props;
        const { Page } = this.state;
        return React.createElement("div", null,
            React.createElement("nav", null, Object.keys(items).map(name => React.createElement("a", { href: "#" + name, onClick: () => this.setState({ Page: items[name] }), key: name }, name))),
            React.createElement("main", null,
                React.createElement(Page, null)));
    }
}
react_dom_1.render(React.createElement(App, { items: { Project: Todo_1.default, Explore: KB_1.default, Opportunity: Opportunity_1.default } }), _1.$('#app'));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function $(selector) {
    var result = document.querySelectorAll(selector);
    return (result.length === 1) ? result[0] : result;
}
exports.$ = $;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Dataflow_1 = __webpack_require__(1);
// Todo
// Show Graph
// format of the a news content
// tags
class KB extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = Dataflow_1.store.getState().news;
    }
    componentDidMount() {
        Dataflow_1.store.subscribe(() => {
            console.log('changed');
            this.setState(Dataflow_1.store.getState().news);
        });
    }
    render() {
        const news = this.state;
        return React.createElement("div", { className: "news" },
            React.createElement("h1", null, "What's up"),
            React.createElement("button", { onClick: () => Dataflow_1.store.dispatch(Dataflow_1.actions.fetchFeed) }, "FakeFeed"),
            React.createElement("div", null, news.map((item, i) => React.createElement(News, Object.assign({}, item, { key: i })))));
    }
}
exports.default = KB;
class News extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        // A news, may expand if necessary
        this.state = { expand: false };
    }
    render() {
        const { title, content, authors } = this.props;
        const { expand } = this.state;
        return React.createElement("div", { className: expand ? "newsdetail" : "newsbrief", onClick: () => this.maybeExpand(!expand) },
            React.createElement("h3", null, title),
            React.createElement("span", null, authors.join(', ')),
            React.createElement("p", null, content),
            React.createElement("button", { onClick: (ev) => this.showGraph(ev) }, "Graph"));
    }
    maybeExpand(really) {
        this.setState({ expand: really });
    }
    showGraph(ev) {
        ev.stopPropagation();
        const { content } = this.props;
        console.log("showing", content);
    }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Author_1 = __webpack_require__(2);
const Tag_1 = __webpack_require__(3);
// use component nesting to get a graph
function newProject(title, author) {
    const Project = {
        title,
        author,
        children: [],
        note: "",
        completed: false,
        tags: []
    };
    return Project;
}
exports.newProject = newProject;
function complete(proj) {
    proj.completed = true;
}
exports.complete = complete;
function cancel(proj) {
    proj.completed = false;
}
exports.cancel = cancel;
function setitle(proj, newTitle) {
    proj.title = newTitle;
}
exports.setitle = setitle;
function addChildren(proj, ...children) {
    proj.children.push(...children);
}
exports.addChildren = addChildren;
function removeChild(proj, child) {
    proj.children.splice(proj.children.indexOf(child));
}
exports.removeChild = removeChild;
function setNote(proj, newNote) {
    proj.note = newNote;
}
exports.setNote = setNote;
function addTag(proj, tag) {
    proj.tags.push(tag);
}
exports.addTag = addTag;
class Task extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { expanded: true };
    }
    render() {
        const { tsk } = this.props;
        const { title, author, children, note, tags } = tsk;
        return React.createElement("div", { className: "task" },
            React.createElement("h2", null, title),
            React.createElement(Author_1.Author, { author: author }),
            this.state.expanded && children.map(child => React.createElement(Task, { tsk: child, key: child.title })),
            React.createElement("p", null, note));
    }
}
function Project({ tsk: task }) {
    const { tsk } = this.props;
    const { title, author, children, note, tags } = tsk;
    return React.createElement("div", { className: "project task" },
        React.createElement("h2", null, title),
        React.createElement(Author_1.Author, { author: author }),
        children.map(child => React.createElement(Task, { tsk: child, key: child.title })),
        React.createElement("p", null, note),
        tags.map(tag => React.createElement(Tag_1.Tag, { tag: tag, key: tag })));
}
exports.Project = Project;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
class Modal extends react_1.PureComponent {
    bgClick(ev) {
        // ev.target.style.display="none"
        this.props.exit();
        ev.stopPropagation();
    }
    insideClick(ev) {
        ev.stopPropagation();
    }
    render() {
        const { children } = this.props;
        return React.createElement("div", { className: "modalbg", onClick: (ev) => this.bgClick(ev) },
            React.createElement("div", { className: "modal", onClick: (ev) => this.insideClick(ev) }, children));
    }
}
exports.Modal = Modal;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Author_1 = __webpack_require__(2);
const Dataflow_1 = __webpack_require__(1);
class Todoitem extends react_1.Component {
    submitEdit(ev) {
        const newname = ev.target.textContent.replace(/\n/g, "");
        if (ev.key === "Enter") {
            ev.preventDefault();
            ev.stopPropagation();
            Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.renameItem, { oldname: this.props.item.title, newname }));
        }
    }
    onCheck(ev) {
        console.log(ev.target.checked, 'checked');
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.checkItem, { title: this.props.item.title, done: ev.target.checked }));
    }
    remove() {
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.deleteItem, { title: this.props.item.title }));
    }
    render() {
        const { item } = this.props;
        return React.createElement("div", { className: "item" + (item.completed ? " completed" : "") },
            React.createElement("input", { type: "checkbox", name: item.title, checked: item.completed, onClick: ev => this.onCheck(ev) }),
            React.createElement("p", { contentEditable: true, onKeyUp: (ev) => this.submitEdit(ev) }, item.title),
            React.createElement("button", null, "Note"),
            React.createElement("button", { onClick: () => this.remove() }, "Remove"));
    }
}
class TodoList extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { children: Dataflow_1.store.getState().project.children };
        this.newtitle = "";
    }
    componentDidMount() {
        Dataflow_1.store.subscribe(() => this.setState({ children: Dataflow_1.store.getState().project.children }));
    }
    typingNewItem(ev) {
        const newtitle = ev.target.value.replace(/\n/g, "");
        this.newtitle = newtitle;
        // console.log('typing', newtitle)
    }
    addItem(newtitle = this.newtitle) {
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.addItem, { title: newtitle }));
    }
    enter(ev) {
        if (ev.key === "Enter") {
            this.addItem();
            ev.target.value = "";
        }
    }
    render() {
        const { children } = this.state;
        return React.createElement("div", null,
            React.createElement("input", { type: "text", onInput: (ev) => this.typingNewItem(ev), onKeyUp: ev => this.enter(ev), placeholder: "Add an item" }),
            children.map(item => React.createElement(Todoitem, { item: item, key: item.title })));
    }
}
class Todo extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = Dataflow_1.store.getState().project;
    }
    componentDidMount() {
        Dataflow_1.store.subscribe(() => this.setState(Dataflow_1.store.getState().project));
    }
    render() {
        const { author, children, title } = this.state;
        return React.createElement("div", { className: "todolists" },
            React.createElement(Author_1.Author, { author: author }),
            React.createElement("h1", null, title),
            React.createElement("button", null, "Notes"),
            React.createElement(TodoList, { children: children }));
    }
}
exports.default = Todo;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
class Opportunity extends react_1.PureComponent {
    render() {
        return React.createElement("div", null, "Opportunities");
    }
}
exports.default = Opportunity;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTFmNDJjN2FlNmFjNDMwMGFjMDIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL1RhZy50c3giLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vdHMvJC50cyIsIndlYnBhY2s6Ly8vLi90cy9LQi50c3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVkdXhcIiIsIndlYnBhY2s6Ly8vLi90cy9ncmFwaC50c3giLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsdUI7Ozs7Ozs7OztBQ0NBLHVDQUFtQztBQUNuQyx1Q0FBeUU7QUFVekUsNEJBQTRCO0FBQzVCLE1BQU0sWUFBWSxHQUFlO0lBQzdCLElBQUksRUFBRSxFQUFFO0lBQ1IsT0FB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QUFhLEdBQUc7WUFDdEgsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksb0JBQUMsUUFBUSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUksQ0FBQyxDQUM5RDtJQUNWLENBQUM7Q0FDSjtBQUVELFVBQTBCLFNBQVEscUJBQXdCO0lBQTFEOztRQUNJLFVBQUssR0FBRyxnQkFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU87SUFhcEMsQ0FBQztJQVpHLGlCQUFpQjtRQUNiLGdCQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDRCxNQUFNO1FBQ0YsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUs7UUFDOUMsTUFBTSxDQUFDLDZCQUFLLFNBQVMsRUFBQyxXQUFXO1lBQzdCLG9CQUFDLGVBQU0sSUFBQyxNQUFNLEVBQUUsTUFBTSxHQUFJO1lBQzFCLGdDQUFLLEtBQUssQ0FBTTtZQUNoQiw0Q0FBc0I7WUFDdEIsb0JBQUMsUUFBUSxJQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUksQ0FDOUI7SUFDVixDQUFDO0NBQ0o7QUFkRCx1QkFjQzs7Ozs7Ozs7OztBQy9FRCxxQ0FBOEI7QUFDOUIsdUNBQXFDO0FBRXJDLGlCQUFpQyxTQUFRLHFCQUFzQjtJQUMzRCxNQUFNO1FBQ0YsTUFBTSxDQUFDLGlEQUF3QjtJQUNuQyxDQUFDO0NBQ0o7QUFKRCw4QkFJQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhMWY0MmM3YWU2YWM0MzAwYWMwMiIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBuZXdQcm9qZWN0LCB0YXNrLCBjb21wbGV0ZSwgY2FuY2VsLCByZW1vdmVDaGlsZCB9IGZyb20gJy4vZ3JhcGgnXG5pbnRlcmZhY2UgU3RvcmVTdGF0ZSB7XG4gICAgbmV3cz86IGFueVtdLFxuICAgIHByb2plY3Q/OiB0YXNrLFxuICAgIGN1cnJlbnRBdXRob3I/OiB7XG4gICAgICAgIHRhZ3M6IHN0cmluZ1tdLFxuICAgICAgICBlbWFpbDogc3RyaW5nLFxuICAgICAgICBuYW1lOiBzdHJpbmdcbiAgICB9XG59XG4vLyBUb2RvLCBhY3R1YWxseSBmZXRjaCBmZWVkXG5jb25zdCBpbml0aWFsU3RhdGU6IFN0b3JlU3RhdGUgPSB7XG4gICAgbmV3czogW10sXG4gICAgcHJvamVjdDogbmV3UHJvamVjdChcIk1ha2UgcGFuY2FrZVwiLCBcIlRlYW0gUmVtaVwiKSxcbiAgICBjdXJyZW50QXV0aG9yOiB7XG4gICAgICAgIHRhZ3M6IFsnY29vaycsICdyZWFjdCddLFxuICAgICAgICBlbWFpbDogXCJzbGs0OUBsaXZlLmNuXCIsXG4gICAgICAgIG5hbWU6IFwiVGVhbSBSZW1pXCJcbiAgICB9XG59XG5cbmluaXRpYWxTdGF0ZS5wcm9qZWN0LmNoaWxkcmVuID0gW25ld1Byb2plY3QoXCJXaGlwIGNyZWFtXCIsIGluaXRpYWxTdGF0ZS5wcm9qZWN0LmF1dGhvcildXG5cbmZ1bmN0aW9uIHJlZHVjZXIocHJldlN0YXRlOiBTdG9yZVN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IHsgW2FueTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBjb25zdCBzdGF0ZTogU3RvcmVTdGF0ZSA9IHByZXZTdGF0ZVxuICAgIGNvbnN0IHByb2plY3QgPSBzdGF0ZS5wcm9qZWN0XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiZmV0Y2hGZWVkXCI6XG4gICAgICAgICAgICBzdGF0ZS5uZXdzLnB1c2goeyBjb250ZW50OiAobmV3IERhdGUoKSkudG9TdHJpbmcoKS5yZXBlYXQoNTApLCBhdXRob3JzOiBbXCJSYWluXCJdLCB0aXRsZTogXCJUaGUgbmV3IGxlZ2VuZFwiIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZpbmRBdXRob3JcIjoge1xuICAgICAgICAgICAgc3RhdGUuY3VycmVudEF1dGhvciA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBhY3Rpb24uYXV0aG9yLFxuICAgICAgICAgICAgICAgIHRhZ3M6IFtcInJlYWN0XCIsIFwicGFuY2FrZVwiXSxcbiAgICAgICAgICAgICAgICBlbWFpbDogXCJzbGs0OUBsaXZlLmNuXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLnB1c2gobmV3UHJvamVjdChhY3Rpb24udGl0bGUsIHByb2plY3QuYXV0aG9yKSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJyZW5hbWVJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb2xkbmFtZSwgbmV3bmFtZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gb2xkbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC50aXRsZSA9IG5ld25hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImNoZWNrSXRlbVwiOiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWN0aW9uIGNoZWNraXRlbScsYWN0aW9uKVxuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSwgZG9uZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIGNvbXBsZXRlKGNoaWxkKVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGNhbmNlbChjaGlsZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJkZWxldGVJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUgfSA9IGFjdGlvblxuICAgICAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBjaGlsZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSwndGFyZ2V0Jyx0YXJnZXQpXG4gICAgICAgICAgICByZW1vdmVDaGlsZChwcm9qZWN0LCB0YXJnZXQpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmNvbnN0IHByb2plY3RBY3Rpb25zID0ge1xuICAgIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkSXRlbVwiXG4gICAgfSxcbiAgICBcInJlbmFtZUl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcInJlbmFtZUl0ZW1cIlxuICAgIH0sXG4gICAgXCJjaGVja0l0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImNoZWNrSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgZG9uZTogZmFsc2VcbiAgICB9LFxuICAgIFwiZGVsZXRlSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiZGVsZXRlSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIlxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gICAgXCJmZXRjaEZlZWRcIjoge1xuICAgICAgICB0eXBlOiBcImZldGNoRmVlZFwiXG4gICAgfSxcbiAgICBcImZpbmRBdXRob3JcIjoge1xuICAgICAgICB0eXBlOiBcImZpbmRBdXRob3JcIlxuICAgIH0sXG4gICAgLi4ucHJvamVjdEFjdGlvbnNcbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcbnN0b3JlLnN1YnNjcmliZSgoKSA9PiBjb25zb2xlLmxvZyhzdG9yZS5nZXRTdGF0ZSgpKSlcbk9iamVjdC5hc3NpZ24od2luZG93LCB7IGFjdGlvbnMsIHN0b3JlIH0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvRGF0YWZsb3cudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJ1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJ1xuLy8gcmVuZGVycyBhIG5pY2UgYmxvY2sgb2YgdGhlIGF1dGhvcidzIGluaXRpYWxzXG5leHBvcnQgZnVuY3Rpb24gRGV0YWlsQXV0aG9yKHsgYXV0aG9yLCB0YWdzLCBlbWFpbCB9KSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsIGF1dGhvclwiPlxuICAgICAgICA8aDE+e2F1dGhvcn08L2gxPlxuICAgICAgICB7dGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgICAgIDxhIGhyZWY9e1wibWFpbHRvOlwiICsgZW1haWx9ID57ZW1haWx9PC9hPlxuICAgIDwvZGl2PlxufVxuXG5leHBvcnQgY2xhc3MgQXV0aG9yIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGF1dGhvcjogc3RyaW5nIH0sIHsgZGV0YWlsOiBib29sZWFuIH0+IHtcbiAgICBzdGF0ZSA9IHsgZGV0YWlsOiBmYWxzZSB9XG4gICAgc2hvd0RldGFpbChldikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGV0YWlsOiB0cnVlIH0pXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5maW5kQXV0aG9yLCBhdXRob3I6IHRoaXMucHJvcHMuYXV0aG9yIH0pXG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoaWRpbmcnKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGV0YWlsOiBmYWxzZSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgYXV0aG9yIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgZGV0YWlsIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImF1dGhvclwiIG9uQ2xpY2s9e2V2ID0+IHRoaXMuc2hvd0RldGFpbChldil9PiAgICAgICAgXG4gICAgICAgICAgICB7YXV0aG9yLnRvVXBwZXJDYXNlKCkuc3BsaXQoJyAnKS5tYXAoYXUgPT4gYXVbMF0pfVxuICAgICAgICAgICAge2RldGFpbCAmJlxuICAgICAgICAgICAgICAgIDxNb2RhbCBleGl0PXsoKSA9PiB0aGlzLmhpZGUoKX0+XG4gICAgICAgICAgICAgICAgICAgIDxEZXRhaWxBdXRob3Igey4uLnN0b3JlLmdldFN0YXRlKCkuY3VycmVudEF1dGhvcn0gYXV0aG9yPXthdXRob3J9Lz5cbiAgICAgICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvQXV0aG9yLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuLy8gcmVuZGVycyBhIG5pY2UgYmxvY2sgb2YgdGhlIGF1dGhvcidzIGluaXRpYWxzXG5leHBvcnQgZnVuY3Rpb24gVGFnKHsgdGFnIH06IHsgdGFnOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJ0YWdcIj57dGFnfTwvc3Bhbj5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9UYWcudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IHsgJCB9IGZyb20gJy4vJCdcbmltcG9ydCBLQiBmcm9tIFwiLi9LQlwiXG5pbXBvcnQgVG9kbyBmcm9tICcuL1RvZG8nXG5pbXBvcnQgT3Bwb3J0dW5pdHkgZnJvbSAnLi9PcHBvcnR1bml0eSdcblxuY2xhc3MgQXBwIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGl0ZW1zOiB7IFthbnk6IHN0cmluZ106IGFueSB9IH0sIGFueT4ge1xuICAgIC8vIGRlZmF1bHQgcmVuZGVyIHRoZSBuZXdzIHBhZ2VcbiAgICBzdGF0ZSA9IHsgUGFnZTogdGhpcy5wcm9wcy5pdGVtcy5Qcm9qZWN0IH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBQYWdlIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAobmFtZSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17XCIjXCIgKyBuYW1lfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgUGFnZTogaXRlbXNbbmFtZV0gfSl9IGtleT17bmFtZX0+e25hbWV9PC9hPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgICAgICA8UGFnZSAvPlxuICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbnJlbmRlcig8QXBwIGl0ZW1zPXt7IFByb2plY3Q6IFRvZG8sIEV4cGxvcmU6IEtCLCBPcHBvcnR1bml0eSB9fSAvPiwgJCgnI2FwcCcpKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL2luZGV4LnRzeCIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3RET007XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdERPTVwiXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuZXhwb3J0IGZ1bmN0aW9uICQoc2VsZWN0b3IpIHtcbiAgICB2YXIgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID09PSAxKSA/IHJlc3VsdFswXSA6IHJlc3VsdFxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzLyQudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYWN0aW9ucywgc3RvcmUgfSBmcm9tIFwiLi9EYXRhZmxvd1wiXG4vLyBUb2RvXG4vLyBTaG93IEdyYXBoXG4vLyBmb3JtYXQgb2YgdGhlIGEgbmV3cyBjb250ZW50XG4vLyB0YWdzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLQiBleHRlbmRzIFB1cmVDb21wb25lbnQ8YW55LCBhbnk+e1xuICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKS5uZXdzXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlZCcpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHN0b3JlLmdldFN0YXRlKCkubmV3cylcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IG5ld3MgPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5ld3NcIj5cbiAgICAgICAgICAgIDxoMT5XaGF0J3MgdXA8L2gxPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLmZldGNoRmVlZCl9PkZha2VGZWVkPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtuZXdzLm1hcCgoaXRlbSwgaSkgPT4gPE5ld3Mgey4uLml0ZW19IGtleT17aX0gLz4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgTmV3cyBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyB0aXRsZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGF1dGhvcnM6IHN0cmluZ1tdIH0sIHsgZXhwYW5kOiBib29sZWFuIH0+e1xuICAgIC8vIEEgbmV3cywgbWF5IGV4cGFuZCBpZiBuZWNlc3NhcnlcbiAgICBzdGF0ZSA9IHsgZXhwYW5kOiBmYWxzZSB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBjb250ZW50LCBhdXRob3JzIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgZXhwYW5kIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17ZXhwYW5kID8gXCJuZXdzZGV0YWlsXCIgOiBcIm5ld3NicmllZlwifSBvbkNsaWNrPXsoKSA9PiB0aGlzLm1heWJlRXhwYW5kKCFleHBhbmQpfT5cbiAgICAgICAgICAgIDxoMz57dGl0bGV9PC9oMz5cbiAgICAgICAgICAgIDxzcGFuPnthdXRob3JzLmpvaW4oJywgJyl9PC9zcGFuPlxuICAgICAgICAgICAgPHA+e2NvbnRlbnR9PC9wPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuc2hvd0dyYXBoKGV2KX0+R3JhcGg8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIG1heWJlRXhwYW5kKHJlYWxseSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kOiByZWFsbHkgfSlcbiAgICB9XG4gICAgc2hvd0dyYXBoKGV2KSB7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGNvbnN0IHsgY29udGVudCB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zb2xlLmxvZyhcInNob3dpbmdcIiwgY29udGVudClcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvS0IudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWR1eDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJ1xuXG5leHBvcnQgaW50ZXJmYWNlIHRhc2sge1xuICAgIFwidGl0bGVcIjogc3RyaW5nLFxuICAgIFwiYXV0aG9yXCI6IHN0cmluZyxcbiAgICBcImNvbXBsZXRlZFwiOiBib29sZWFuLFxuICAgIFwiY2hpbGRyZW5cIj86IHRhc2tbXSxcbiAgICBcIm5vdGVcIj86IHN0cmluZyxcbiAgICBcInRhZ3NcIj86IHN0cmluZ1tdXG59XG4vLyB1c2UgY29tcG9uZW50IG5lc3RpbmcgdG8gZ2V0IGEgZ3JhcGhcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1Byb2plY3QodGl0bGU6IHN0cmluZywgYXV0aG9yOiBzdHJpbmcpOiB0YXNrIHtcbiAgICBjb25zdCBQcm9qZWN0ID0ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIG5vdGU6IFwiXCIsXG4gICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgIHRhZ3M6IFtdXG4gICAgfVxuICAgIHJldHVybiBQcm9qZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV0ZShwcm9qKSB7XG4gICAgcHJvai5jb21wbGV0ZWQgPSB0cnVlXG59XG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHByb2opIHtcbiAgICBwcm9qLmNvbXBsZXRlZCA9IGZhbHNlXG59XG5leHBvcnQgZnVuY3Rpb24gc2V0aXRsZShwcm9qLCBuZXdUaXRsZSkge1xuICAgIHByb2oudGl0bGUgPSBuZXdUaXRsZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZENoaWxkcmVuKHByb2osIC4uLmNoaWxkcmVuOiB0YXNrW10pIHtcbiAgICBwcm9qLmNoaWxkcmVuLnB1c2goLi4uY2hpbGRyZW4pXG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2hpbGQocHJvaiwgY2hpbGQ6IHRhc2spIHtcbiAgICBwcm9qLmNoaWxkcmVuLnNwbGljZShwcm9qLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNldE5vdGUocHJvaiwgbmV3Tm90ZSkge1xuICAgIHByb2oubm90ZSA9IG5ld05vdGVcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRUYWcocHJvaiwgdGFnOiBzdHJpbmcpIHtcbiAgICBwcm9qLnRhZ3MucHVzaCh0YWcpXG59XG5cbmNsYXNzIFRhc2sgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgdHNrOiB0YXNrIH0sIHsgZXhwYW5kZWQ6IGJvb2xlYW4gfT57XG4gICAgc3RhdGUgPSB7IGV4cGFuZGVkOiB0cnVlIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdHNrIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGF1dGhvciwgY2hpbGRyZW4sIG5vdGUsIHRhZ3MgfSA9IHRza1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0YXNrXCI+XG4gICAgICAgICAgICA8aDI+e3RpdGxlfTwvaDI+XG4gICAgICAgICAgICA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgJiYgY2hpbGRyZW4ubWFwKGNoaWxkID0+IDxUYXNrIHRzaz17Y2hpbGR9IGtleT17Y2hpbGQudGl0bGV9IC8+KX1cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvamVjdCh7IHRzazogdGFzayB9KSB7XG4gICAgY29uc3QgeyB0c2sgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzIH0gPSB0c2tcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0IHRhc2tcIj5cbiAgICAgICAgPGgyPnt0aXRsZX08L2gyPlxuICAgICAgICA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuICAgICAgICB7Y2hpbGRyZW4ubWFwKGNoaWxkID0+IDxUYXNrIHRzaz17Y2hpbGR9IGtleT17Y2hpbGQudGl0bGV9IC8+KX1cbiAgICAgICAgPHA+e25vdGV9PC9wPlxuICAgICAgICB7dGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgPC9kaXY+XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9ncmFwaC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGNoaWxkcmVuOiBhbnksIGV4aXQ6IEZ1bmN0aW9uIH0sIGFueT57XG4gICAgYmdDbGljayhldikge1xuICAgICAgICAvLyBldi50YXJnZXQuc3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICB0aGlzLnByb3BzLmV4aXQoKVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKSAgICAgICAgXG4gICAgfVxuICAgIGluc2lkZUNsaWNrKGV2KSB7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJtb2RhbGJnXCIgb25DbGljaz17KGV2KSA9PiB0aGlzLmJnQ2xpY2soZXYpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuaW5zaWRlQ2xpY2soZXYpfT5cbiAgICAgICAgICAgICAgICB7Li4uY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXYgPlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9Nb2RhbC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyB0YXNrLCBuZXdQcm9qZWN0IH0gZnJvbSAnLi9ncmFwaCdcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcblxuY2xhc3MgVG9kb2l0ZW0gZXh0ZW5kcyBDb21wb25lbnQ8eyBpdGVtOiB0YXNrIH0sIGFueT57XG4gICAgc3VibWl0RWRpdChldikge1xuICAgICAgICBjb25zdCBuZXduYW1lID0gZXYudGFyZ2V0LnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLFwiXCIpXG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5yZW5hbWVJdGVtLCBvbGRuYW1lOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIG5ld25hbWUgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkNoZWNrKGV2KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2LnRhcmdldC5jaGVja2VkLCdjaGVja2VkJylcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmNoZWNrSXRlbSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgZG9uZTogZXYudGFyZ2V0LmNoZWNrZWQgfSlcbiAgICB9XG4gICAgcmVtb3ZlKCkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuZGVsZXRlSXRlbSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbSB9ID0gdGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwiICsgKGl0ZW0uY29tcGxldGVkID8gXCIgY29tcGxldGVkXCIgOiBcIlwiKX0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT17aXRlbS50aXRsZX0gY2hlY2tlZD17aXRlbS5jb21wbGV0ZWR9IG9uQ2xpY2s9e2V2ID0+IHRoaXMub25DaGVjayhldil9IC8+XG4gICAgICAgICAgICA8cCBjb250ZW50RWRpdGFibGUgb25LZXlVcD17KGV2KSA9PiB0aGlzLnN1Ym1pdEVkaXQoZXYpfT57aXRlbS50aXRsZX08L3A+XG4gICAgICAgICAgICA8YnV0dG9uPk5vdGU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5yZW1vdmUoKX0+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgVG9kb0xpc3QgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+IHtcbiAgICBzdGF0ZSA9IHsgY2hpbGRyZW46IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdC5jaGlsZHJlbiB9XG4gICAgbmV3dGl0bGUgPSBcIlwiXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHN0b3JlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNoaWxkcmVuOiBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QuY2hpbGRyZW4gfSlcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHR5cGluZ05ld0l0ZW0oZXYpIHtcbiAgICAgICAgY29uc3QgbmV3dGl0bGUgPSBldi50YXJnZXQudmFsdWUucmVwbGFjZSgvXFxuL2csIFwiXCIpXG4gICAgICAgIHRoaXMubmV3dGl0bGUgPSBuZXd0aXRsZVxuICAgICAgICAvLyBjb25zb2xlLmxvZygndHlwaW5nJywgbmV3dGl0bGUpXG4gICAgfVxuICAgIGFkZEl0ZW0obmV3dGl0bGUgPSB0aGlzLm5ld3RpdGxlKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5hZGRJdGVtLCB0aXRsZTogbmV3dGl0bGUgfSlcbiAgICB9XG4gICAgZW50ZXIoZXYpIHtcbiAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEl0ZW0oKVxuICAgICAgICAgICAgZXYudGFyZ2V0LnZhbHVlID0gXCJcIlxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG9uSW5wdXQ9eyhldikgPT4gdGhpcy50eXBpbmdOZXdJdGVtKGV2KX0gb25LZXlVcD17ZXYgPT4gdGhpcy5lbnRlcihldil9IHBsYWNlaG9sZGVyPVwiQWRkIGFuIGl0ZW1cIiAvPlxuICAgICAgICAgICAge2NoaWxkcmVuLm1hcChpdGVtID0+IDxUb2RvaXRlbSBpdGVtPXtpdGVtfSBrZXk9e2l0ZW0udGl0bGV9IC8+KX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksIHRhc2s+e1xuICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHN0b3JlLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldFN0YXRlKHN0b3JlLmdldFN0YXRlKCkucHJvamVjdCkpXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBhdXRob3IsIGNoaWxkcmVuLCB0aXRsZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b2RvbGlzdHNcIj5cbiAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG4gICAgICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XG4gICAgICAgICAgICA8YnV0dG9uPk5vdGVzPC9idXR0b24+XG4gICAgICAgICAgICA8VG9kb0xpc3QgY2hpbGRyZW49e2NoaWxkcmVufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVG9kby50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3Bwb3J0dW5pdHkgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSxhbnk+e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdj5PcHBvcnR1bml0aWVzPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJzb3VyY2VSb290IjoiIn0=