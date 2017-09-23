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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
const redux_1 = __webpack_require__(9);
const Graph_1 = __webpack_require__(2);
// Todo, actually fetch feed
const initialState = {
    news: [],
    project: Graph_1.newProject("Make pancake", "Team Remi"),
    currentAuthor: {
        tags: ['cook', 'react'],
        email: "slk49@live.cn",
        name: "Team Remi"
    }
};
initialState.project.children = [Graph_1.newProject("Whip cream", initialState.project.author), Graph_1.newProject("Whip more cream", initialState.project.author)];
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
            break;
        }
        case "addItem": {
            project.children.push(Graph_1.newProject(action.title, project.author));
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
                        Graph_1.complete(child);
                    else
                        Graph_1.cancel(child);
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
            Graph_1.removeChild(project, target);
            break;
        }
        case "subItem": {
            const { parent, child } = action;
            if (parent === child)
                throw "cannot be the same item";
            let parentitem, childitem;
            project.children.forEach(ch => {
                if (ch.title === parent) {
                    parentitem = ch;
                }
                else if (ch.title === child) {
                    childitem = ch;
                }
            });
            Graph_1.addChild(parentitem, childitem);
            Graph_1.removeChild(project, childitem);
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
    },
    "subItem": {
        type: "subItem",
        parent: "",
        child: ""
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
const Author_1 = __webpack_require__(3);
const Tag_1 = __webpack_require__(4);
const Dataflow_1 = __webpack_require__(1);
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
function addChild(proj, child) {
    proj.children.push(child);
}
exports.addChild = addChild;
function removeChild(proj, child) {
    proj.children.splice(proj.children.indexOf(child), 1);
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
            this.state.expanded && children.map(child => React.createElement(Task, { tsk: child, key: child.title })),
            React.createElement("p", null, note));
    }
}
class Project extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = Dataflow_1.store.getState().project;
    }
    render() {
        const { title, author, children, note, tags } = this.state;
        return React.createElement("div", { className: "project task" },
            React.createElement("h2", null, title),
            React.createElement(Author_1.Author, { author: author }),
            children.map(child => React.createElement(Task, { tsk: child, key: child.title })),
            React.createElement("p", null, note),
            tags.map(tag => React.createElement(Tag_1.Tag, { tag: tag, key: tag })));
    }
}
function Overview() {
    return React.createElement(Project, null);
}
exports.Overview = Overview;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Dataflow_1 = __webpack_require__(1);
const Tag_1 = __webpack_require__(4);
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const react_dom_1 = __webpack_require__(6);
const _1 = __webpack_require__(7);
const KB_1 = __webpack_require__(8);
const Todo_1 = __webpack_require__(11);
const Opportunity_1 = __webpack_require__(12);
const Graph_1 = __webpack_require__(2);
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
react_dom_1.render(React.createElement(App, { items: { Project: Todo_1.default, Overview: Graph_1.Overview, Explore: KB_1.default, Opportunity: Opportunity_1.default } }), _1.$('#app'));


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function $(selector) {
    var result = document.querySelectorAll(selector);
    return (result.length === 1) ? result[0] : result;
}
exports.$ = $;


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports) {

module.exports = Redux;

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
const Author_1 = __webpack_require__(3);
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
    pickup(ev) {
        console.log('picked up');
        ev.dataTransfer.setData("text", this.props.item.title);
    }
    over(ev) {
        ev.preventDefault();
    }
    drop(ev) {
        ev.preventDefault();
        const title = ev.dataTransfer.getData("text");
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.subItem, { child: title, parent: this.props.item.title }));
    }
    render() {
        const { item } = this.props;
        return React.createElement("div", { className: "item" + (item.completed ? " completed" : ""), onDragOver: ev => this.over(ev), onDrop: (ev) => this.drop(ev) },
            React.createElement("input", { type: "checkbox", name: item.title, checked: item.completed, onClick: ev => this.onCheck(ev) }),
            React.createElement("p", { contentEditable: true, onKeyUp: (ev) => this.submitEdit(ev) }, item.title),
            React.createElement("button", null, "Note"),
            React.createElement("button", { onClick: () => this.remove() }, "Remove"),
            React.createElement("img", { className: "dragger", src: "http://www.iconninja.com/files/741/109/210/tree-icon.png", onDragStart: (ev) => this.pickup(ev) }));
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
        this.state = Object.assign({}, Dataflow_1.store.getState().project);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTUyMWEyNGVjMjYzMWQ3Yzg2NGYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9HcmFwaC50c3giLCJ3ZWJwYWNrOi8vLy4vdHMvQXV0aG9yLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9UYWcudHN4Iiwid2VicGFjazovLy8uL3RzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIiwid2VicGFjazovLy8uL3RzLyQudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvS0IudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsdUI7Ozs7Ozs7OztBQ0NBLHVDQUFtQztBQUNuQyx1Q0FBbUY7QUFVbkYsNEJBQTRCO0FBQzVCLE1BQU0sWUFBWSxHQUFlO0lBQzdCLElBQUksRUFBRSxFQUFFO0lBQ1IsT0FB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O0lBQ2xFLENBQUM7SUFDRCxNQUFNO1FBQ0YsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUs7UUFDOUMsTUFBTSxDQUFDLDZCQUFLLFNBQVMsRUFBQyxXQUFXO1lBQzdCLG9CQUFDLGVBQU0sSUFBQyxNQUFNLEVBQUUsTUFBTSxHQUFJO1lBQzFCLGdDQUFLLEtBQUssQ0FBTTtZQUNoQiw0Q0FBc0I7WUFDdEIsb0JBQUMsUUFBUSxJQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUksQ0FDOUI7SUFDVixDQUFDO0NBQ0o7QUFkRCx1QkFjQzs7Ozs7Ozs7OztBQ2hHRCxxQ0FBOEI7QUFDOUIsdUNBQXFDO0FBRXJDLGlCQUFpQyxTQUFRLHFCQUFzQjtJQUMzRCxNQUFNO1FBQ0YsTUFBTSxDQUFDLGlEQUF3QjtJQUNuQyxDQUFDO0NBQ0o7QUFKRCw4QkFJQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlNTIxYTI0ZWMyNjMxZDdjODY0ZiIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBuZXdQcm9qZWN0LCB0YXNrLCBjb21wbGV0ZSwgY2FuY2VsLCByZW1vdmVDaGlsZCwgYWRkQ2hpbGQgfSBmcm9tICcuL0dyYXBoJ1xuaW50ZXJmYWNlIFN0b3JlU3RhdGUge1xuICAgIG5ld3M/OiBhbnlbXSxcbiAgICBwcm9qZWN0PzogdGFzayxcbiAgICBjdXJyZW50QXV0aG9yPzoge1xuICAgICAgICB0YWdzOiBzdHJpbmdbXSxcbiAgICAgICAgZW1haWw6IHN0cmluZyxcbiAgICAgICAgbmFtZTogc3RyaW5nXG4gICAgfVxufVxuLy8gVG9kbywgYWN0dWFsbHkgZmV0Y2ggZmVlZFxuY29uc3QgaW5pdGlhbFN0YXRlOiBTdG9yZVN0YXRlID0ge1xuICAgIG5ld3M6IFtdLFxuICAgIHByb2plY3Q6IG5ld1Byb2plY3QoXCJNYWtlIHBhbmNha2VcIiwgXCJUZWFtIFJlbWlcIiksXG4gICAgY3VycmVudEF1dGhvcjoge1xuICAgICAgICB0YWdzOiBbJ2Nvb2snLCAncmVhY3QnXSxcbiAgICAgICAgZW1haWw6IFwic2xrNDlAbGl2ZS5jblwiLFxuICAgICAgICBuYW1lOiBcIlRlYW0gUmVtaVwiXG4gICAgfVxufVxuXG5pbml0aWFsU3RhdGUucHJvamVjdC5jaGlsZHJlbiA9IFtuZXdQcm9qZWN0KFwiV2hpcCBjcmVhbVwiLCBpbml0aWFsU3RhdGUucHJvamVjdC5hdXRob3IpLCBuZXdQcm9qZWN0KFwiV2hpcCBtb3JlIGNyZWFtXCIsIGluaXRpYWxTdGF0ZS5wcm9qZWN0LmF1dGhvcildXG5cbmZ1bmN0aW9uIHJlZHVjZXIocHJldlN0YXRlOiBTdG9yZVN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IHsgW2FueTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBjb25zdCBzdGF0ZTogU3RvcmVTdGF0ZSA9IHByZXZTdGF0ZVxuICAgIGNvbnN0IHByb2plY3QgPSBzdGF0ZS5wcm9qZWN0XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiZmV0Y2hGZWVkXCI6XG4gICAgICAgICAgICBzdGF0ZS5uZXdzLnB1c2goeyBjb250ZW50OiAobmV3IERhdGUoKSkudG9TdHJpbmcoKS5yZXBlYXQoNTApLCBhdXRob3JzOiBbXCJSYWluXCJdLCB0aXRsZTogXCJUaGUgbmV3IGxlZ2VuZFwiIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZpbmRBdXRob3JcIjoge1xuICAgICAgICAgICAgc3RhdGUuY3VycmVudEF1dGhvciA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBhY3Rpb24uYXV0aG9yLFxuICAgICAgICAgICAgICAgIHRhZ3M6IFtcInJlYWN0XCIsIFwicGFuY2FrZVwiXSxcbiAgICAgICAgICAgICAgICBlbWFpbDogXCJzbGs0OUBsaXZlLmNuXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGRJdGVtXCI6IHtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4ucHVzaChuZXdQcm9qZWN0KGFjdGlvbi50aXRsZSwgcHJvamVjdC5hdXRob3IpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInJlbmFtZUl0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyBvbGRuYW1lLCBuZXduYW1lIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSBvbGRuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnRpdGxlID0gbmV3bmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiY2hlY2tJdGVtXCI6IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhY3Rpb24gY2hlY2tpdGVtJyxhY3Rpb24pXG4gICAgICAgICAgICBjb25zdCB7IHRpdGxlLCBkb25lIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkgY29tcGxldGUoY2hpbGQpXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgY2FuY2VsKGNoaWxkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiZGVsZXRlSXRlbVwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IHRpdGxlIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIGxldCB0YXJnZXQ7XG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2codGl0bGUsICd0YXJnZXQnLCB0YXJnZXQpXG4gICAgICAgICAgICByZW1vdmVDaGlsZChwcm9qZWN0LCB0YXJnZXQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwic3ViSXRlbVwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IHBhcmVudCwgY2hpbGQgfSA9IGFjdGlvblxuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gY2hpbGQpIHRocm93IFwiY2Fubm90IGJlIHRoZSBzYW1lIGl0ZW1cIlxuICAgICAgICAgICAgbGV0IHBhcmVudGl0ZW0sIGNoaWxkaXRlbTtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoLnRpdGxlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50aXRlbSA9IGNoXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaC50aXRsZSA9PT0gY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRpdGVtID0gY2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYWRkQ2hpbGQocGFyZW50aXRlbSwgY2hpbGRpdGVtKVxuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQocHJvamVjdCwgY2hpbGRpdGVtKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmNvbnN0IHByb2plY3RBY3Rpb25zID0ge1xuICAgIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkSXRlbVwiXG4gICAgfSxcbiAgICBcInJlbmFtZUl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcInJlbmFtZUl0ZW1cIlxuICAgIH0sXG4gICAgXCJjaGVja0l0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImNoZWNrSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgZG9uZTogZmFsc2VcbiAgICB9LFxuICAgIFwiZGVsZXRlSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiZGVsZXRlSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIlxuICAgIH0sXG4gICAgXCJzdWJJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJzdWJJdGVtXCIsXG4gICAgICAgIHBhcmVudDogXCJcIixcbiAgICAgICAgY2hpbGQ6IFwiXCJcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICAgIFwiZmV0Y2hGZWVkXCI6IHtcbiAgICAgICAgdHlwZTogXCJmZXRjaEZlZWRcIlxuICAgIH0sXG4gICAgXCJmaW5kQXV0aG9yXCI6IHtcbiAgICAgICAgdHlwZTogXCJmaW5kQXV0aG9yXCJcbiAgICB9LFxuICAgIC4uLnByb2plY3RBY3Rpb25zXG59XG5cbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSkpXG5PYmplY3QuYXNzaWduKHdpbmRvdywgeyBhY3Rpb25zLCBzdG9yZSB9KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0RhdGFmbG93LnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJ1xuaW1wb3J0IHsgVGFnIH0gZnJvbSAnLi9UYWcnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5cbmV4cG9ydCBpbnRlcmZhY2UgdGFzayB7XG4gICAgXCJ0aXRsZVwiOiBzdHJpbmcsXG4gICAgXCJhdXRob3JcIjogc3RyaW5nLFxuICAgIFwiY29tcGxldGVkXCI6IGJvb2xlYW4sXG4gICAgXCJjaGlsZHJlblwiPzogdGFza1tdLFxuICAgIFwibm90ZVwiPzogc3RyaW5nLFxuICAgIFwidGFnc1wiPzogc3RyaW5nW11cbn1cbi8vIHVzZSBjb21wb25lbnQgbmVzdGluZyB0byBnZXQgYSBncmFwaFxuXG5leHBvcnQgZnVuY3Rpb24gbmV3UHJvamVjdCh0aXRsZTogc3RyaW5nLCBhdXRob3I6IHN0cmluZyk6IHRhc2sge1xuICAgIGNvbnN0IFByb2plY3QgPSB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IsXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgbm90ZTogXCJcIixcbiAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgdGFnczogW11cbiAgICB9XG4gICAgcmV0dXJuIFByb2plY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBsZXRlKHByb2opIHtcbiAgICBwcm9qLmNvbXBsZXRlZCA9IHRydWVcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWwocHJvaikge1xuICAgIHByb2ouY29tcGxldGVkID0gZmFsc2Vcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRpdGxlKHByb2osIG5ld1RpdGxlKSB7XG4gICAgcHJvai50aXRsZSA9IG5ld1RpdGxlXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkQ2hpbGQocHJvaiwgY2hpbGQ6IHRhc2spIHtcbiAgICBwcm9qLmNoaWxkcmVuLnB1c2goY2hpbGQpXG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2hpbGQocHJvaiwgY2hpbGQ6IHRhc2spIHtcbiAgICBwcm9qLmNoaWxkcmVuLnNwbGljZShwcm9qLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpLCAxKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNldE5vdGUocHJvaiwgbmV3Tm90ZSkge1xuICAgIHByb2oubm90ZSA9IG5ld05vdGVcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRUYWcocHJvaiwgdGFnOiBzdHJpbmcpIHtcbiAgICBwcm9qLnRhZ3MucHVzaCh0YWcpXG59XG5cbmNsYXNzIFRhc2sgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgdHNrOiB0YXNrIH0sIHsgZXhwYW5kZWQ6IGJvb2xlYW4gfT57XG4gICAgc3RhdGUgPSB7IGV4cGFuZGVkOiB0cnVlIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdHNrIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGF1dGhvciwgY2hpbGRyZW4sIG5vdGUsIHRhZ3MgfSA9IHRza1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0YXNrXCI+XG4gICAgICAgICAgICA8aDI+e3RpdGxlfTwvaDI+XG4gICAgICAgICAgICB7LyogPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz4gKi99XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCAmJiBjaGlsZHJlbi5tYXAoY2hpbGQgPT4gPFRhc2sgdHNrPXtjaGlsZH0ga2V5PXtjaGlsZC50aXRsZX0gLz4pfVxuICAgICAgICAgICAgPHA+e25vdGV9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3QgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+IHtcbiAgICBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCBjaGlsZHJlbiwgbm90ZSwgdGFncyB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0IHRhc2tcIj5cbiAgICAgICAgICAgIDxoMj57dGl0bGV9PC9oMj5cbiAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG4gICAgICAgICAgICB7Y2hpbGRyZW4ubWFwKGNoaWxkID0+IDxUYXNrIHRzaz17Y2hpbGR9IGtleT17Y2hpbGQudGl0bGV9IC8+KX1cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgICAgIHt0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gT3ZlcnZpZXcoKSB7XG4gICAgcmV0dXJuIDxQcm9qZWN0IC8+XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvR3JhcGgudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCdcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIERldGFpbEF1dGhvcih7IGF1dGhvciwgdGFncywgZW1haWwgfSkge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbCBhdXRob3JcIj5cbiAgICAgICAgPGgxPnthdXRob3J9PC9oMT5cbiAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgICAgICA8YSBocmVmPXtcIm1haWx0bzpcIiArIGVtYWlsfSA+e2VtYWlsfTwvYT5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNsYXNzIEF1dGhvciBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBhdXRob3I6IHN0cmluZyB9LCB7IGRldGFpbDogYm9vbGVhbiB9PiB7XG4gICAgc3RhdGUgPSB7IGRldGFpbDogZmFsc2UgfVxuICAgIHNob3dEZXRhaWwoZXYpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogdHJ1ZSB9KVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuZmluZEF1dGhvciwgYXV0aG9yOiB0aGlzLnByb3BzLmF1dGhvciB9KVxuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGlkaW5nJylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogZmFsc2UgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGF1dGhvciB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGRldGFpbCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRob3JcIiBvbkNsaWNrPXtldiA9PiB0aGlzLnNob3dEZXRhaWwoZXYpfT4gICAgICAgIFxuICAgICAgICAgICAge2F1dGhvci50b1VwcGVyQ2FzZSgpLnNwbGl0KCcgJykubWFwKGF1ID0+IGF1WzBdKX1cbiAgICAgICAgICAgIHtkZXRhaWwgJiZcbiAgICAgICAgICAgICAgICA8TW9kYWwgZXhpdD17KCkgPT4gdGhpcy5oaWRlKCl9PlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsQXV0aG9yIHsuLi5zdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3J9IGF1dGhvcj17YXV0aG9yfS8+XG4gICAgICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0F1dGhvci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIFRhZyh7IHRhZyB9OiB7IHRhZzogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwidGFnXCI+e3RhZ308L3NwYW4+XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVGFnLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7ICQgfSBmcm9tICcuLyQnXG5pbXBvcnQgS0IgZnJvbSBcIi4vS0JcIlxuaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJ1xuaW1wb3J0IE9wcG9ydHVuaXR5IGZyb20gJy4vT3Bwb3J0dW5pdHknXG5pbXBvcnQgeyBPdmVydmlldyB9IGZyb20gJy4vR3JhcGgnXG5cbmNsYXNzIEFwcCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBpdGVtczogeyBbYW55OiBzdHJpbmddOiBhbnkgfSB9LCBhbnk+IHtcbiAgICAvLyBkZWZhdWx0IHJlbmRlciB0aGUgbmV3cyBwYWdlXG4gICAgc3RhdGUgPSB7IFBhZ2U6IHRoaXMucHJvcHMuaXRlbXMuUHJvamVjdCB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgUGFnZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykubWFwKG5hbWUgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wiICsgbmFtZX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFBhZ2U6IGl0ZW1zW25hbWVdIH0pfSBrZXk9e25hbWV9PntuYW1lfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPFBhZ2UgLz5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5yZW5kZXIoPEFwcCBpdGVtcz17eyBQcm9qZWN0OiBUb2RvLE92ZXJ2aWV3LCBFeHBsb3JlOiBLQiwgT3Bwb3J0dW5pdHkgIH19IC8+LCAkKCcjYXBwJykpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvaW5kZXgudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0RE9NXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5leHBvcnQgZnVuY3Rpb24gJChzZWxlY3Rvcikge1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEpID8gcmVzdWx0WzBdIDogcmVzdWx0XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvJC50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBhY3Rpb25zLCBzdG9yZSB9IGZyb20gXCIuL0RhdGFmbG93XCJcbi8vIFRvZG9cbi8vIFNob3cgR3JhcGhcbi8vIGZvcm1hdCBvZiB0aGUgYSBuZXdzIGNvbnRlbnRcbi8vIHRhZ3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtCIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksIGFueT57XG4gICAgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpLm5ld3NcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VkJylcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoc3RvcmUuZ2V0U3RhdGUoKS5uZXdzKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgbmV3cyA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibmV3c1wiPlxuICAgICAgICAgICAgPGgxPldoYXQncyB1cDwvaDE+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMuZmV0Y2hGZWVkKX0+RmFrZUZlZWQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge25ld3MubWFwKChpdGVtLCBpKSA9PiA8TmV3cyB7Li4uaXRlbX0ga2V5PXtpfSAvPil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBOZXdzIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IHRpdGxlOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgYXV0aG9yczogc3RyaW5nW10gfSwgeyBleHBhbmQ6IGJvb2xlYW4gfT57XG4gICAgLy8gQSBuZXdzLCBtYXkgZXhwYW5kIGlmIG5lY2Vzc2FyeVxuICAgIHN0YXRlID0geyBleHBhbmQ6IGZhbHNlIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGNvbnRlbnQsIGF1dGhvcnMgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBleHBhbmQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtleHBhbmQgPyBcIm5ld3NkZXRhaWxcIiA6IFwibmV3c2JyaWVmXCJ9IG9uQ2xpY2s9eygpID0+IHRoaXMubWF5YmVFeHBhbmQoIWV4cGFuZCl9PlxuICAgICAgICAgICAgPGgzPnt0aXRsZX08L2gzPlxuICAgICAgICAgICAgPHNwYW4+e2F1dGhvcnMuam9pbignLCAnKX08L3NwYW4+XG4gICAgICAgICAgICA8cD57Y29udGVudH08L3A+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhldikgPT4gdGhpcy5zaG93R3JhcGgoZXYpfT5HcmFwaDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgbWF5YmVFeHBhbmQocmVhbGx5KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmQ6IHJlYWxseSB9KVxuICAgIH1cbiAgICBzaG93R3JhcGgoZXYpIHtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgY29uc3QgeyBjb250ZW50IH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvd2luZ1wiLCBjb250ZW50KVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9LQi50c3giLCJtb2R1bGUuZXhwb3J0cyA9IFJlZHV4O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGNoaWxkcmVuOiBhbnksIGV4aXQ6IEZ1bmN0aW9uIH0sIGFueT57XG4gICAgYmdDbGljayhldikge1xuICAgICAgICAvLyBldi50YXJnZXQuc3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICB0aGlzLnByb3BzLmV4aXQoKVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKSAgICAgICAgXG4gICAgfVxuICAgIGluc2lkZUNsaWNrKGV2KSB7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJtb2RhbGJnXCIgb25DbGljaz17KGV2KSA9PiB0aGlzLmJnQ2xpY2soZXYpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuaW5zaWRlQ2xpY2soZXYpfT5cbiAgICAgICAgICAgICAgICB7Li4uY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXYgPlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9Nb2RhbC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyB0YXNrLCBuZXdQcm9qZWN0IH0gZnJvbSAnLi9ncmFwaCdcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcblxuY2xhc3MgVG9kb2l0ZW0gZXh0ZW5kcyBDb21wb25lbnQ8eyBpdGVtOiB0YXNrIH0sIGFueT57XG4gICAgc3VibWl0RWRpdChldikge1xuICAgICAgICBjb25zdCBuZXduYW1lID0gZXYudGFyZ2V0LnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMucmVuYW1lSXRlbSwgb2xkbmFtZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBuZXduYW1lIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgb25DaGVjayhldikge1xuICAgICAgICBjb25zb2xlLmxvZyhldi50YXJnZXQuY2hlY2tlZCwgJ2NoZWNrZWQnKVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuY2hlY2tJdGVtLCB0aXRsZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBkb25lOiBldi50YXJnZXQuY2hlY2tlZCB9KVxuICAgIH1cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5kZWxldGVJdGVtLCB0aXRsZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlIH0pXG4gICAgfVxuICAgIHBpY2t1cChldikge1xuICAgICAgICBjb25zb2xlLmxvZygncGlja2VkIHVwJylcbiAgICAgICAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIHRoaXMucHJvcHMuaXRlbS50aXRsZSk7XG4gICAgfVxuICAgIG92ZXIoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZHJvcChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuc3ViSXRlbSwgY2hpbGQ6IHRpdGxlLCBwYXJlbnQ6IHRoaXMucHJvcHMuaXRlbS50aXRsZSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbSB9ID0gdGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwiICsgKGl0ZW0uY29tcGxldGVkID8gXCIgY29tcGxldGVkXCIgOiBcIlwiKX1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9e2V2ID0+IHRoaXMub3Zlcihldil9XG4gICAgICAgICAgICBvbkRyb3A9eyhldikgPT4gdGhpcy5kcm9wKGV2KX0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT17aXRlbS50aXRsZX0gY2hlY2tlZD17aXRlbS5jb21wbGV0ZWR9IG9uQ2xpY2s9e2V2ID0+IHRoaXMub25DaGVjayhldil9IC8+XG4gICAgICAgICAgICA8cCBjb250ZW50RWRpdGFibGUgb25LZXlVcD17KGV2KSA9PiB0aGlzLnN1Ym1pdEVkaXQoZXYpfT57aXRlbS50aXRsZX08L3A+XG4gICAgICAgICAgICA8YnV0dG9uPk5vdGU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5yZW1vdmUoKX0+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImRyYWdnZXJcIiBzcmM9XCJodHRwOi8vd3d3Lmljb25uaW5qYS5jb20vZmlsZXMvNzQxLzEwOS8yMTAvdHJlZS1pY29uLnBuZ1wiXG4gICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eyhldikgPT4gdGhpcy5waWNrdXAoZXYpfVxuICAgICAgICAgICAgPjwvaW1nPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PiB7XG4gICAgc3RhdGUgPSB7IGNoaWxkcmVuOiBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QuY2hpbGRyZW4gfVxuICAgIG5ld3RpdGxlID0gXCJcIlxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGlsZHJlbjogc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0LmNoaWxkcmVuIH0pXG4gICAgICAgIClcbiAgICB9XG5cbiAgICB0eXBpbmdOZXdJdGVtKGV2KSB7XG4gICAgICAgIGNvbnN0IG5ld3RpdGxlID0gZXYudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxuICAgICAgICB0aGlzLm5ld3RpdGxlID0gbmV3dGl0bGVcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3R5cGluZycsIG5ld3RpdGxlKVxuICAgIH1cbiAgICBhZGRJdGVtKG5ld3RpdGxlID0gdGhpcy5uZXd0aXRsZSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkSXRlbSwgdGl0bGU6IG5ld3RpdGxlIH0pXG4gICAgfVxuICAgIGVudGVyKGV2KSB7XG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5hZGRJdGVtKClcbiAgICAgICAgICAgIGV2LnRhcmdldC52YWx1ZSA9IFwiXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBvbklucHV0PXsoZXYpID0+IHRoaXMudHlwaW5nTmV3SXRlbShldil9IG9uS2V5VXA9e2V2ID0+IHRoaXMuZW50ZXIoZXYpfSBwbGFjZWhvbGRlcj1cIkFkZCBhbiBpdGVtXCIgLz5cbiAgICAgICAgICAgIHtjaGlsZHJlbi5tYXAoaXRlbSA9PiA8VG9kb2l0ZW0gaXRlbT17aXRlbX0ga2V5PXtpdGVtLnRpdGxlfSAvPil9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyBleHRlbmRzIFB1cmVDb21wb25lbnQ8YW55LCB0YXNrPntcbiAgICBzdGF0ZSA9IHsuLi5zdG9yZS5nZXRTdGF0ZSgpLnByb2plY3R9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHN0b3JlLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldFN0YXRlKHN0b3JlLmdldFN0YXRlKCkucHJvamVjdCkpXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBhdXRob3IsIGNoaWxkcmVuLCB0aXRsZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b2RvbGlzdHNcIj5cbiAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG4gICAgICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XG4gICAgICAgICAgICA8YnV0dG9uPk5vdGVzPC9idXR0b24+XG4gICAgICAgICAgICA8VG9kb0xpc3QgY2hpbGRyZW49e2NoaWxkcmVufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVG9kby50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3Bwb3J0dW5pdHkgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSxhbnk+e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdj5PcHBvcnR1bml0aWVzPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJzb3VyY2VSb290IjoiIn0=