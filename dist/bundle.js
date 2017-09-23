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
            break;
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
            break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmRkNWY0NmU2OTE0ZTQ5Nzc1ZWUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL1RhZy50c3giLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vdHMvJC50cyIsIndlYnBhY2s6Ly8vLi90cy9LQi50c3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVkdXhcIiIsIndlYnBhY2s6Ly8vLi90cy9ncmFwaC50c3giLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsdUI7Ozs7Ozs7OztBQ0NBLHVDQUFtQztBQUNuQyx1Q0FBeUU7QUFVekUsNEJBQTRCO0FBQzVCLE1BQU0sWUFBWSxHQUFlO0lBQzdCLElBQUksRUFBRSxFQUFFO0lBQ1IsT0FB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QUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBQyxhQUFhLEdBQUc7WUFDdEgsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksb0JBQUMsUUFBUSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUksQ0FBQyxDQUM5RDtJQUNWLENBQUM7Q0FDSjtBQUVELFVBQTBCLFNBQVEscUJBQXdCO0lBQTFEOztRQUNJLFVBQUssR0FBRyxnQkFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU87SUFhcEMsQ0FBQztJQVpHLGlCQUFpQjtRQUNiLGdCQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDRCxNQUFNO1FBQ0YsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUs7UUFDOUMsTUFBTSxDQUFDLDZCQUFLLFNBQVMsRUFBQyxXQUFXO1lBQzdCLG9CQUFDLGVBQU0sSUFBQyxNQUFNLEVBQUUsTUFBTSxHQUFJO1lBQzFCLGdDQUFLLEtBQUssQ0FBTTtZQUNoQiw0Q0FBc0I7WUFDdEIsb0JBQUMsUUFBUSxJQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUksQ0FDOUI7SUFDVixDQUFDO0NBQ0o7QUFkRCx1QkFjQzs7Ozs7Ozs7OztBQy9FRCxxQ0FBOEI7QUFDOUIsdUNBQXFDO0FBRXJDLGlCQUFpQyxTQUFRLHFCQUFzQjtJQUMzRCxNQUFNO1FBQ0YsTUFBTSxDQUFDLGlEQUF3QjtJQUNuQyxDQUFDO0NBQ0o7QUFKRCw4QkFJQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiZGQ1ZjQ2ZTY5MTRlNDk3NzVlZSIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBuZXdQcm9qZWN0LCB0YXNrLCBjb21wbGV0ZSwgY2FuY2VsLCByZW1vdmVDaGlsZCB9IGZyb20gJy4vZ3JhcGgnXG5pbnRlcmZhY2UgU3RvcmVTdGF0ZSB7XG4gICAgbmV3cz86IGFueVtdLFxuICAgIHByb2plY3Q/OiB0YXNrLFxuICAgIGN1cnJlbnRBdXRob3I/OiB7XG4gICAgICAgIHRhZ3M6IHN0cmluZ1tdLFxuICAgICAgICBlbWFpbDogc3RyaW5nLFxuICAgICAgICBuYW1lOiBzdHJpbmdcbiAgICB9XG59XG4vLyBUb2RvLCBhY3R1YWxseSBmZXRjaCBmZWVkXG5jb25zdCBpbml0aWFsU3RhdGU6IFN0b3JlU3RhdGUgPSB7XG4gICAgbmV3czogW10sXG4gICAgcHJvamVjdDogbmV3UHJvamVjdChcIk1ha2UgcGFuY2FrZVwiLCBcIlRlYW0gUmVtaVwiKSxcbiAgICBjdXJyZW50QXV0aG9yOiB7XG4gICAgICAgIHRhZ3M6IFsnY29vaycsICdyZWFjdCddLFxuICAgICAgICBlbWFpbDogXCJzbGs0OUBsaXZlLmNuXCIsXG4gICAgICAgIG5hbWU6IFwiVGVhbSBSZW1pXCJcbiAgICB9XG59XG5cbmluaXRpYWxTdGF0ZS5wcm9qZWN0LmNoaWxkcmVuID0gW25ld1Byb2plY3QoXCJXaGlwIGNyZWFtXCIsIGluaXRpYWxTdGF0ZS5wcm9qZWN0LmF1dGhvcildXG5cbmZ1bmN0aW9uIHJlZHVjZXIocHJldlN0YXRlOiBTdG9yZVN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IHsgW2FueTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBjb25zdCBzdGF0ZTogU3RvcmVTdGF0ZSA9IHByZXZTdGF0ZVxuICAgIGNvbnN0IHByb2plY3QgPSBzdGF0ZS5wcm9qZWN0XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiZmV0Y2hGZWVkXCI6XG4gICAgICAgICAgICBzdGF0ZS5uZXdzLnB1c2goeyBjb250ZW50OiAobmV3IERhdGUoKSkudG9TdHJpbmcoKS5yZXBlYXQoNTApLCBhdXRob3JzOiBbXCJSYWluXCJdLCB0aXRsZTogXCJUaGUgbmV3IGxlZ2VuZFwiIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZpbmRBdXRob3JcIjoge1xuICAgICAgICAgICAgc3RhdGUuY3VycmVudEF1dGhvciA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBhY3Rpb24uYXV0aG9yLFxuICAgICAgICAgICAgICAgIHRhZ3M6IFtcInJlYWN0XCIsIFwicGFuY2FrZVwiXSxcbiAgICAgICAgICAgICAgICBlbWFpbDogXCJzbGs0OUBsaXZlLmNuXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLnB1c2gobmV3UHJvamVjdChhY3Rpb24udGl0bGUsIHByb2plY3QuYXV0aG9yKSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJyZW5hbWVJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb2xkbmFtZSwgbmV3bmFtZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gb2xkbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC50aXRsZSA9IG5ld25hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImNoZWNrSXRlbVwiOiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWN0aW9uIGNoZWNraXRlbScsYWN0aW9uKVxuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSwgZG9uZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIGNvbXBsZXRlKGNoaWxkKVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGNhbmNlbChjaGlsZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImRlbGV0ZUl0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGNoaWxkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpdGxlLCd0YXJnZXQnLHRhcmdldClcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkKHByb2plY3QsIHRhcmdldClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5jb25zdCBwcm9qZWN0QWN0aW9ucyA9IHtcbiAgICBcImFkZEl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImFkZEl0ZW1cIlxuICAgIH0sXG4gICAgXCJyZW5hbWVJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJyZW5hbWVJdGVtXCJcbiAgICB9LFxuICAgIFwiY2hlY2tJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJjaGVja0l0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGRvbmU6IGZhbHNlXG4gICAgfSxcbiAgICBcImRlbGV0ZUl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImRlbGV0ZUl0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCJcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICAgIFwiZmV0Y2hGZWVkXCI6IHtcbiAgICAgICAgdHlwZTogXCJmZXRjaEZlZWRcIlxuICAgIH0sXG4gICAgXCJmaW5kQXV0aG9yXCI6IHtcbiAgICAgICAgdHlwZTogXCJmaW5kQXV0aG9yXCJcbiAgICB9LFxuICAgIC4uLnByb2plY3RBY3Rpb25zXG59XG5cbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSkpXG5PYmplY3QuYXNzaWduKHdpbmRvdywgeyBhY3Rpb25zLCBzdG9yZSB9KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0RhdGFmbG93LnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCdcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIERldGFpbEF1dGhvcih7IGF1dGhvciwgdGFncywgZW1haWwgfSkge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbCBhdXRob3JcIj5cbiAgICAgICAgPGgxPnthdXRob3J9PC9oMT5cbiAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgICAgICA8YSBocmVmPXtcIm1haWx0bzpcIiArIGVtYWlsfSA+e2VtYWlsfTwvYT5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNsYXNzIEF1dGhvciBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBhdXRob3I6IHN0cmluZyB9LCB7IGRldGFpbDogYm9vbGVhbiB9PiB7XG4gICAgc3RhdGUgPSB7IGRldGFpbDogZmFsc2UgfVxuICAgIHNob3dEZXRhaWwoZXYpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogdHJ1ZSB9KVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuZmluZEF1dGhvciwgYXV0aG9yOiB0aGlzLnByb3BzLmF1dGhvciB9KVxuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGlkaW5nJylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogZmFsc2UgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGF1dGhvciB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGRldGFpbCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRob3JcIiBvbkNsaWNrPXtldiA9PiB0aGlzLnNob3dEZXRhaWwoZXYpfT4gICAgICAgIFxuICAgICAgICAgICAge2F1dGhvci50b1VwcGVyQ2FzZSgpLnNwbGl0KCcgJykubWFwKGF1ID0+IGF1WzBdKX1cbiAgICAgICAgICAgIHtkZXRhaWwgJiZcbiAgICAgICAgICAgICAgICA8TW9kYWwgZXhpdD17KCkgPT4gdGhpcy5oaWRlKCl9PlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsQXV0aG9yIHsuLi5zdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3J9IGF1dGhvcj17YXV0aG9yfS8+XG4gICAgICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0F1dGhvci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIFRhZyh7IHRhZyB9OiB7IHRhZzogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwidGFnXCI+e3RhZ308L3NwYW4+XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVGFnLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7ICQgfSBmcm9tICcuLyQnXG5pbXBvcnQgS0IgZnJvbSBcIi4vS0JcIlxuaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJ1xuaW1wb3J0IE9wcG9ydHVuaXR5IGZyb20gJy4vT3Bwb3J0dW5pdHknXG5cbmNsYXNzIEFwcCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBpdGVtczogeyBbYW55OiBzdHJpbmddOiBhbnkgfSB9LCBhbnk+IHtcbiAgICAvLyBkZWZhdWx0IHJlbmRlciB0aGUgbmV3cyBwYWdlXG4gICAgc3RhdGUgPSB7IFBhZ2U6IHRoaXMucHJvcHMuaXRlbXMuUHJvamVjdCB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgUGFnZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykubWFwKG5hbWUgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wiICsgbmFtZX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFBhZ2U6IGl0ZW1zW25hbWVdIH0pfSBrZXk9e25hbWV9PntuYW1lfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPFBhZ2UgLz5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5yZW5kZXIoPEFwcCBpdGVtcz17eyBQcm9qZWN0OiBUb2RvLCBFeHBsb3JlOiBLQiwgT3Bwb3J0dW5pdHkgfX0gLz4sICQoJyNhcHAnKSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9pbmRleC50c3giLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RET01cIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmV4cG9ydCBmdW5jdGlvbiAkKHNlbGVjdG9yKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIHJldHVybiAocmVzdWx0Lmxlbmd0aCA9PT0gMSkgPyByZXN1bHRbMF0gOiByZXN1bHRcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy8kLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGFjdGlvbnMsIHN0b3JlIH0gZnJvbSBcIi4vRGF0YWZsb3dcIlxuLy8gVG9kb1xuLy8gU2hvdyBHcmFwaFxuLy8gZm9ybWF0IG9mIHRoZSBhIG5ld3MgY29udGVudFxuLy8gdGFnc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS0IgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSwgYW55PntcbiAgICBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCkubmV3c1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZWQnKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLm5ld3MpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBuZXdzID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuZXdzXCI+XG4gICAgICAgICAgICA8aDE+V2hhdCdzIHVwPC9oMT5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5mZXRjaEZlZWQpfT5GYWtlRmVlZDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7bmV3cy5tYXAoKGl0ZW0sIGkpID0+IDxOZXdzIHsuLi5pdGVtfSBrZXk9e2l9IC8+KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIE5ld3MgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgdGl0bGU6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBhdXRob3JzOiBzdHJpbmdbXSB9LCB7IGV4cGFuZDogYm9vbGVhbiB9PntcbiAgICAvLyBBIG5ld3MsIG1heSBleHBhbmQgaWYgbmVjZXNzYXJ5XG4gICAgc3RhdGUgPSB7IGV4cGFuZDogZmFsc2UgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgY29udGVudCwgYXV0aG9ycyB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGV4cGFuZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2V4cGFuZCA/IFwibmV3c2RldGFpbFwiIDogXCJuZXdzYnJpZWZcIn0gb25DbGljaz17KCkgPT4gdGhpcy5tYXliZUV4cGFuZCghZXhwYW5kKX0+XG4gICAgICAgICAgICA8aDM+e3RpdGxlfTwvaDM+XG4gICAgICAgICAgICA8c3Bhbj57YXV0aG9ycy5qb2luKCcsICcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDxwPntjb250ZW50fTwvcD5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KGV2KSA9PiB0aGlzLnNob3dHcmFwaChldil9PkdyYXBoPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICBtYXliZUV4cGFuZChyZWFsbHkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZDogcmVhbGx5IH0pXG4gICAgfVxuICAgIHNob3dHcmFwaChldikge1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBjb25zdCB7IGNvbnRlbnQgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG93aW5nXCIsIGNvbnRlbnQpXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0tCLnRzeCIsIm1vZHVsZS5leHBvcnRzID0gUmVkdXg7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcblxuZXhwb3J0IGludGVyZmFjZSB0YXNrIHtcbiAgICBcInRpdGxlXCI6IHN0cmluZyxcbiAgICBcImF1dGhvclwiOiBzdHJpbmcsXG4gICAgXCJjb21wbGV0ZWRcIjogYm9vbGVhbixcbiAgICBcImNoaWxkcmVuXCI/OiB0YXNrW10sXG4gICAgXCJub3RlXCI/OiBzdHJpbmcsXG4gICAgXCJ0YWdzXCI/OiBzdHJpbmdbXVxufVxuLy8gdXNlIGNvbXBvbmVudCBuZXN0aW5nIHRvIGdldCBhIGdyYXBoXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGF1dGhvcjogc3RyaW5nKTogdGFzayB7XG4gICAgY29uc3QgUHJvamVjdCA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvcixcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBub3RlOiBcIlwiLFxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICB0YWdzOiBbXVxuICAgIH1cbiAgICByZXR1cm4gUHJvamVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGxldGUocHJvaikge1xuICAgIHByb2ouY29tcGxldGVkID0gdHJ1ZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbChwcm9qKSB7XG4gICAgcHJvai5jb21wbGV0ZWQgPSBmYWxzZVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNldGl0bGUocHJvaiwgbmV3VGl0bGUpIHtcbiAgICBwcm9qLnRpdGxlID0gbmV3VGl0bGVcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRDaGlsZHJlbihwcm9qLCAuLi5jaGlsZHJlbjogdGFza1tdKSB7XG4gICAgcHJvai5jaGlsZHJlbi5wdXNoKC4uLmNoaWxkcmVuKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNoaWxkKHByb2osIGNoaWxkOiB0YXNrKSB7XG4gICAgcHJvai5jaGlsZHJlbi5zcGxpY2UocHJvai5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSlcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXROb3RlKHByb2osIG5ld05vdGUpIHtcbiAgICBwcm9qLm5vdGUgPSBuZXdOb3RlXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkVGFnKHByb2osIHRhZzogc3RyaW5nKSB7XG4gICAgcHJvai50YWdzLnB1c2godGFnKVxufVxuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IHRzazogdGFzayB9LCB7IGV4cGFuZGVkOiBib29sZWFuIH0+e1xuICAgIHN0YXRlID0geyBleHBhbmRlZDogdHJ1ZSB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRzayB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzIH0gPSB0c2tcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGFza1wiPlxuICAgICAgICAgICAgPGgyPnt0aXRsZX08L2gyPlxuICAgICAgICAgICAgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkICYmIGNoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgICAgICA8cD57bm90ZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByb2plY3QoeyB0c2s6IHRhc2sgfSkge1xuICAgIGNvbnN0IHsgdHNrIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCBjaGlsZHJlbiwgbm90ZSwgdGFncyB9ID0gdHNrXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicHJvamVjdCB0YXNrXCI+XG4gICAgICAgIDxoMj57dGl0bGV9PC9oMj5cbiAgICAgICAgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz5cbiAgICAgICAge2NoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgIDwvZGl2PlxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvZ3JhcGgudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBjbGFzcyBNb2RhbCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBjaGlsZHJlbjogYW55LCBleGl0OiBGdW5jdGlvbiB9LCBhbnk+e1xuICAgIGJnQ2xpY2soZXYpIHtcbiAgICAgICAgLy8gZXYudGFyZ2V0LnN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgdGhpcy5wcm9wcy5leGl0KClcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCkgICAgICAgIFxuICAgIH1cbiAgICBpbnNpZGVDbGljayhldikge1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxiZ1wiIG9uQ2xpY2s9eyhldikgPT4gdGhpcy5iZ0NsaWNrKGV2KX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgb25DbGljaz17KGV2KSA9PiB0aGlzLmluc2lkZUNsaWNrKGV2KX0+XG4gICAgICAgICAgICAgICAgey4uLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2ID5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvTW9kYWwudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJ1xuaW1wb3J0IHsgdGFzaywgbmV3UHJvamVjdCB9IGZyb20gJy4vZ3JhcGgnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5cbmNsYXNzIFRvZG9pdGVtIGV4dGVuZHMgQ29tcG9uZW50PHsgaXRlbTogdGFzayB9LCBhbnk+e1xuICAgIHN1Ym1pdEVkaXQoZXYpIHtcbiAgICAgICAgY29uc3QgbmV3bmFtZSA9IGV2LnRhcmdldC50ZXh0Q29udGVudC5yZXBsYWNlKC9cXG4vZyxcIlwiKVxuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMucmVuYW1lSXRlbSwgb2xkbmFtZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBuZXduYW1lIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgb25DaGVjayhldikge1xuICAgICAgICBjb25zb2xlLmxvZyhldi50YXJnZXQuY2hlY2tlZCwnY2hlY2tlZCcpXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5jaGVja0l0ZW0sIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIGRvbmU6IGV2LnRhcmdldC5jaGVja2VkIH0pXG4gICAgfVxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmRlbGV0ZUl0ZW0sIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW0gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW1cIiArIChpdGVtLmNvbXBsZXRlZCA/IFwiIGNvbXBsZXRlZFwiIDogXCJcIil9PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9e2l0ZW0udGl0bGV9IGNoZWNrZWQ9e2l0ZW0uY29tcGxldGVkfSBvbkNsaWNrPXtldiA9PiB0aGlzLm9uQ2hlY2soZXYpfSAvPlxuICAgICAgICAgICAgPHAgY29udGVudEVkaXRhYmxlIG9uS2V5VXA9eyhldikgPT4gdGhpcy5zdWJtaXRFZGl0KGV2KX0+e2l0ZW0udGl0bGV9PC9wPlxuICAgICAgICAgICAgPGJ1dHRvbj5Ob3RlPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMucmVtb3ZlKCl9PlJlbW92ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PiB7XG4gICAgc3RhdGUgPSB7IGNoaWxkcmVuOiBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QuY2hpbGRyZW4gfVxuICAgIG5ld3RpdGxlID0gXCJcIlxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGlsZHJlbjogc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0LmNoaWxkcmVuIH0pXG4gICAgICAgIClcbiAgICB9XG5cbiAgICB0eXBpbmdOZXdJdGVtKGV2KSB7XG4gICAgICAgIGNvbnN0IG5ld3RpdGxlID0gZXYudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxuICAgICAgICB0aGlzLm5ld3RpdGxlID0gbmV3dGl0bGVcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3R5cGluZycsIG5ld3RpdGxlKVxuICAgIH1cbiAgICBhZGRJdGVtKG5ld3RpdGxlID0gdGhpcy5uZXd0aXRsZSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkSXRlbSwgdGl0bGU6IG5ld3RpdGxlIH0pXG4gICAgfVxuICAgIGVudGVyKGV2KSB7XG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5hZGRJdGVtKClcbiAgICAgICAgICAgIGV2LnRhcmdldC52YWx1ZSA9IFwiXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBvbklucHV0PXsoZXYpID0+IHRoaXMudHlwaW5nTmV3SXRlbShldil9IG9uS2V5VXA9e2V2ID0+IHRoaXMuZW50ZXIoZXYpfSBwbGFjZWhvbGRlcj1cIkFkZCBhbiBpdGVtXCIgLz5cbiAgICAgICAgICAgIHtjaGlsZHJlbi5tYXAoaXRlbSA9PiA8VG9kb2l0ZW0gaXRlbT17aXRlbX0ga2V5PXtpdGVtLnRpdGxlfSAvPil9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyBleHRlbmRzIFB1cmVDb21wb25lbnQ8YW55LCB0YXNrPntcbiAgICBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdFxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgYXV0aG9yLCBjaGlsZHJlbiwgdGl0bGUgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG9kb2xpc3RzXCI+XG4gICAgICAgICAgICA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuICAgICAgICAgICAgPGgxPnt0aXRsZX08L2gxPlxuICAgICAgICAgICAgPGJ1dHRvbj5Ob3RlczwvYnV0dG9uPlxuICAgICAgICAgICAgPFRvZG9MaXN0IGNoaWxkcmVuPXtjaGlsZHJlbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL1RvZG8udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wcG9ydHVuaXR5IGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksYW55PntcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxkaXY+T3Bwb3J0dW5pdGllczwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9PcHBvcnR1bml0eS50c3giXSwic291cmNlUm9vdCI6IiJ9