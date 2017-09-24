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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
const redux_1 = __webpack_require__(11);
const Graph_1 = __webpack_require__(3);
const initialState = {
    project: Graph_1.newProject("Make waffle", "Team Remi"),
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
};
function reducer(prevState = initialState, action) {
    const state = prevState;
    const project = state.project;
    switch (action.type) {
        case "addItem": {
            Graph_1.addChild(project, Graph_1.newProject(action.title, project.author));
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
                    // find that child
                    target = child;
                }
            });
            Graph_1.removeChild(project, target);
            break;
        }
        case "subItem": {
            // make an item a dependency of another
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
        case "addTag": {
            const { newtag } = action;
            Graph_1.addTag(project, newtag);
            break;
        }
        case "publish": {
            state.knowledgebase.push(state.project);
            // add that tag to the author as well
            const author = state.interestingAuthors.filter(({ name }) => name === state.project.author)[0];
            author.tags.push(...project.tags);
            author.tags = Array.from(new Set(author.tags));
            break;
        }
        case "addProjNotes": {
            Graph_1.setNote(project, action.note);
            break;
        }
        case "addNote": {
            const { title, note } = action;
            project.children.forEach(ch => {
                if (ch.title === title) {
                    Graph_1.setNote(ch, note);
                }
            });
            break;
        }
    }
    return state;
}
exports.actions = {
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
};
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
const Tag_1 = __webpack_require__(4);
const Modal_1 = __webpack_require__(5);
const searcher_1 = __webpack_require__(6);
// renders a nice block of the author's initials
function DetailAuthor({ author }) {
    const { tags, email } = [...Dataflow_1.store.getState().interestingAuthors, Dataflow_1.store.getState().currentAuthor]
        .filter(({ name }) => name === author)[0];
    return React.createElement("div", { className: "detail author" },
        React.createElement("h1", null, author),
        tags.map(tag => React.createElement(Tag_1.Tag, { tag: tag, key: tag })),
        React.createElement("a", { href: "mailto:" + email }, email),
        getAuthorProjects(author).map(title => React.createElement("div", { key: title }, title)));
}
exports.DetailAuthor = DetailAuthor;
class Author extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { detail: false };
    }
    showDetail(ev) {
        this.setState({ detail: true });
        ev.stopPropagation();
    }
    hide() {
        this.setState({ detail: false });
    }
    render() {
        const { author } = this.props;
        const { detail } = this.state;
        return React.createElement("div", { className: "author", onClick: ev => this.showDetail(ev) },
            author.toUpperCase().split(' ').map(au => au[0]),
            detail &&
                React.createElement(Modal_1.Modal, { exit: () => this.hide() },
                    React.createElement(DetailAuthor, { author: author })));
    }
}
exports.Author = Author;
function getAuthorProjects(author) {
    return searcher_1.searchTop(Dataflow_1.store.getState().knowledgebase, {
        key: "author",
        matcher: new RegExp(author)
    }).map(project => project.title);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Author_1 = __webpack_require__(2);
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
        this.state = { published: false };
    }
    addTag(ev) {
        if (ev.key === "Enter") {
            const newtag = ev.target.value;
            ev.target.value = "";
            Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.addTag, { newtag }));
        }
    }
    publish() {
        Dataflow_1.store.dispatch(Dataflow_1.actions.publish);
        this.setState({ published: true });
    }
    render() {
        const { title, author, children, note, tags } = this.props;
        const { published } = this.state;
        return React.createElement("div", { className: "project task" },
            React.createElement("h2", null, title),
            React.createElement("button", { onClick: () => this.publish(), disabled: published }, published ? "✔" : "⬆"),
            React.createElement("button", null, "\u2B07"),
            React.createElement(Author_1.Author, { author: author }),
            tags.map(tag => React.createElement(Tag_1.Tag, { tag: tag, key: tag })),
            React.createElement("input", { type: "text", name: "newtag", placeholder: "new tag", onKeyUp: (ev) => this.addTag(ev) }),
            React.createElement("p", null, note),
            children.map(child => React.createElement(Task, { tsk: child, key: child.title })));
    }
}
exports.Project = Project;
class Overview extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = Dataflow_1.store.getState().project;
    }
    componentDidMount() {
        this.componentWillUnmount = Dataflow_1.store.subscribe(() => {
            this.setState(Dataflow_1.store.getState().project);
        });
    }
    render() {
        return React.createElement(Project, Object.assign({}, this.state));
    }
}
exports.Overview = Overview;


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
        return React.createElement("div", { className: "modalbg", onClick: (ev) => this.bgClick(ev), onScroll: ev => ev.stopPropagation() },
            React.createElement("div", { className: "modal", onClick: (ev) => this.insideClick(ev) }, children));
    }
}
exports.Modal = Modal;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function searchTop(KB, query) {
    // put together a list of relevant projects
    return KB.filter(proj => searchOne(proj, query));
}
exports.searchTop = searchTop;
function searchOne(task, query) {
    // find in one project and all its children if it exist
    const { key, matcher } = query;
    if (task[key].match(matcher)) {
        return true;
    }
    else {
        return task.children.some(child => searchOne(child, query));
    }
}
function parse(querystring) {
    try {
        return querystring.split('&')
            .map(qry => qry.split('='))
            .map(q => ({
            key: q[0].trim(),
            matcher: new RegExp(q[1].trim())
        }));
    }
    catch (e) {
        return [{ key: "title", matcher: new RegExp(querystring) }];
    }
}
exports.parse = parse;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const react_dom_1 = __webpack_require__(8);
const _1 = __webpack_require__(9);
const KB_1 = __webpack_require__(10);
const Todo_1 = __webpack_require__(12);
const Opportunity_1 = __webpack_require__(13);
const Graph_1 = __webpack_require__(3);
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
/* 8 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function $(selector) {
    var result = document.querySelectorAll(selector);
    return (result.length === 1) ? result[0] : result;
}
exports.$ = $;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Dataflow_1 = __webpack_require__(1);
const Author_1 = __webpack_require__(2);
const Tag_1 = __webpack_require__(4);
const Graph_1 = __webpack_require__(3);
const searcher_1 = __webpack_require__(6);
const Modal_1 = __webpack_require__(5);
// Todo
// Show Graph
// format of the a news content
// tags
class News extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        // A news, may expand if necessary
        this.state = { expand: false };
    }
    render() {
        const { title, author, tags, children, note } = this.props;
        const { expand } = this.state;
        return React.createElement("div", { className: expand ? "newsdetail" : "newsbrief", onClick: () => this.maybeExpand(!expand) },
            !expand && React.createElement("h3", null, title),
            !expand && React.createElement(Author_1.Author, { author: author }),
            !expand && tags.map(tag => React.createElement(Tag_1.Tag, { tag: tag, key: tag })),
            !expand && React.createElement("p", null, note),
            expand && React.createElement(Graph_1.Project, Object.assign({}, this.props)));
    }
    maybeExpand(really) {
        this.setState({ expand: really });
    }
}
exports.News = News;
class Search extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { results: [], modal: false, criteria: "" };
    }
    realTimeResult(ev) {
        const criteria = ev.target.value;
        const queries = searcher_1.parse(criteria);
        console.log('parsed', queries);
        if (queries.length) {
            this.setState({
                results: queries.reduce((prev, curr) => {
                    return searcher_1.searchTop(prev, curr);
                }, this.props.projects)
            });
        }
    }
    startSearch() {
        this.setState({ modal: true });
    }
    render() {
        const { results, modal, criteria } = this.state;
        const Common = React.createElement("div", { className: "search" },
            React.createElement("input", { autoFocus: modal ? true : false, type: "text", placeholder: "field1=RegExp\&field2=RegExp...", onInput: ev => this.realTimeResult(ev), onClick: () => this.startSearch() }),
            React.createElement("span", null, "Search"),
            React.createElement("div", { className: "results" }, modal && results.map((result, i) => React.createElement(News, Object.assign({}, result, { key: i })))));
        return modal ?
            React.createElement(Modal_1.Modal, { exit: () => this.setState({ modal: false }) }, Common) :
            Common;
    }
}
class KB extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { projects: Dataflow_1.store.getState().knowledgebase.slice(0, 10) };
    }
    componentDidMount() {
        this.componentWillUnmount = Dataflow_1.store.subscribe(() => {
            this.setState({ projects: Dataflow_1.store.getState().knowledgebase.slice(0, 10) });
        });
    }
    render() {
        const { projects } = this.state;
        return React.createElement("div", { className: "news" },
            React.createElement("h1", null, "What's up"),
            React.createElement(Search, { projects: projects }),
            React.createElement("div", null, projects.map((item, i) => React.createElement(News, Object.assign({}, item, { key: i })))));
    }
}
exports.default = KB;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 12 */
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
    addNote() {
        const note = prompt("What is your note?", this.props.item.note);
        if (note) {
            Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.addNote, { title: this.props.item.title, note }));
        }
    }
    render() {
        const { item } = this.props;
        return React.createElement("div", { className: "item" + (item.completed ? " completed" : ""), onDragOver: ev => this.over(ev), onDrop: (ev) => this.drop(ev) },
            React.createElement("input", { type: "checkbox", name: item.title, checked: item.completed, onClick: ev => this.onCheck(ev) }),
            React.createElement("p", { contentEditable: true, onKeyUp: (ev) => this.submitEdit(ev) }, item.title),
            React.createElement("button", { onClick: () => this.addNote() }, "Note"),
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
        this.componentWillUnmount = Dataflow_1.store.subscribe(() => this.setState({ children: Dataflow_1.store.getState().project.children }));
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
        this.componentWillUnmount = Dataflow_1.store.subscribe(() => this.setState(Dataflow_1.store.getState().project));
    }
    projectNote() {
        const note = prompt("What is your note?", this.state.note);
        if (note) {
            Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.addProjNotes, { note }));
        }
    }
    render() {
        const { author, children, title } = this.state;
        return React.createElement("div", { className: "todolists" },
            React.createElement(Author_1.Author, { author: author }),
            React.createElement("h1", null, title),
            React.createElement("button", { onClick: () => this.projectNote() }, "Notes"),
            React.createElement(TodoList, { children: children }));
    }
}
exports.default = Todo;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Author_1 = __webpack_require__(2);
const Dataflow_1 = __webpack_require__(1);
class Opportunity extends react_1.PureComponent {
    render() {
        return React.createElement("div", null,
            React.createElement("h1", null, "Opportunities"),
            React.createElement("div", null,
                React.createElement("h2", null, "Contributors you might be interested in"),
                Dataflow_1.store.getState().interestingAuthors.map(({ name }) => React.createElement(Author_1.DetailAuthor, { author: name, key: name })),
                React.createElement("p", null, "Connect with 10 K Coffee")),
            React.createElement("div", null,
                React.createElement("h2", null, "Projects that relevant to your skills"),
                React.createElement("p", null, "Connect with RBC internal job posting")));
    }
}
exports.default = Opportunity;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWJjOWZkZWIwNGI4NTUxNTA5ZDQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL0dyYXBoLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9UYWcudHN4Iiwid2VicGFjazovLy8uL3RzL01vZGFsLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9zZWFyY2hlci50cyIsIndlYnBhY2s6Ly8vLi90cy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiIsIndlYnBhY2s6Ly8vLi90cy8kLnRzIiwid2VicGFjazovLy8uL3RzL0tCLnRzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWR1eFwiIiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsdUI7Ozs7Ozs7OztBQ0NBLHdDQUFtQztBQUNuQyx1Q0FBb0c7QUFlcEcsTUFBTSxZQUFZLEdBQWU7SUFDN0IsT0FBTyxF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WSxJQUFFLElBQUksSUFBRztRQUNyRCxDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU07UUFDRixNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSztRQUM5QyxNQUFNLENBQUMsNkJBQUssU0FBUyxFQUFDLFdBQVc7WUFDN0Isb0JBQUMsZUFBTSxJQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUk7WUFDMUIsZ0NBQUssS0FBSyxDQUFNO1lBQ2hCLGdDQUFRLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBZ0I7WUFDekQsb0JBQUMsUUFBUSxJQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUksQ0FDOUI7SUFDVixDQUFDO0NBQ0o7QUFwQkQsdUJBb0JDOzs7Ozs7Ozs7O0FDNUdELHFDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMsd0NBQXdDO0FBQ3hDLDBDQUFtQztBQUVuQyxpQkFBaUMsU0FBUSxxQkFBc0I7SUFDM0QsTUFBTTtRQUNGLE1BQU0sQ0FBQztZQUNILGdEQUFzQjtZQUN0QjtnQkFDSSwwRUFBZ0Q7Z0JBQy9DLGdCQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsS0FBRyxvQkFBQyxxQkFBWSxJQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksR0FBRyxDQUFDO2dCQUM1RiwwREFBK0IsQ0FDN0I7WUFDTjtnQkFDSSx3RUFBOEM7Z0JBQzlDLHVFQUE0QyxDQUMxQyxDQUNKO0lBQ1YsQ0FBQztDQUNKO0FBZkQsOEJBZUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNWJjOWZkZWIwNGI4NTUxNTA5ZDQiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgbmV3UHJvamVjdCwgdGFzaywgY29tcGxldGUsIGNhbmNlbCwgcmVtb3ZlQ2hpbGQsIGFkZENoaWxkLCBhZGRUYWcsIHNldE5vdGUgfSBmcm9tICcuL0dyYXBoJ1xuXG5pbnRlcmZhY2UgY29udHJpYnV0ZXIge1xuICAgIHRhZ3M6IHN0cmluZ1tdLFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgbmFtZTogc3RyaW5nXG59XG5cbmludGVyZmFjZSBTdG9yZVN0YXRlIHtcbiAgICBwcm9qZWN0PzogdGFzayxcbiAgICBjdXJyZW50QXV0aG9yPzogY29udHJpYnV0ZXIsXG4gICAga25vd2xlZGdlYmFzZT86IHRhc2tbXSxcbiAgICBpbnRlcmVzdGluZ0F1dGhvcnM/OiBjb250cmlidXRlcltdXG59XG5cbmNvbnN0IGluaXRpYWxTdGF0ZTogU3RvcmVTdGF0ZSA9IHtcbiAgICBwcm9qZWN0OiBuZXdQcm9qZWN0KFwiTWFrZSB3YWZmbGVcIiwgXCJUZWFtIFJlbWlcIiksXG4gICAgY3VycmVudEF1dGhvcjoge1xuICAgICAgICB0YWdzOiBbJ2Nvb2snLCAncmVhY3QnXSxcbiAgICAgICAgZW1haWw6IFwic2xrNDlAbGl2ZS5jblwiLFxuICAgICAgICBuYW1lOiBcIkxpbmdrYWkgU2hlblwiXG4gICAgfSxcbiAgICBrbm93bGVkZ2ViYXNlOiBbXG4gICAgICAgIHsgXCJ0aXRsZVwiOiBcIk1ha2Ugd2FmZmxlXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW3sgXCJ0aXRsZVwiOiBcInBvdXIgb250byB0aGUgd2FmZmxlIGlyb24sIHdhaXQgMm1pblwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFt7IFwidGl0bGVcIjogXCJtaXggZmxvdXIsIGJha2luZyBwb3dkZXIsIGVnZ3MgZXRjXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW10sIFwibm90ZVwiOiBcIlwiLCBcImNvbXBsZXRlZFwiOiB0cnVlLCBcInRhZ3NcIjogW10gfSwgeyBcInRpdGxlXCI6IFwid2hpcCBjcmVhbVwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFtdLCBcIm5vdGVcIjogXCJVc2UgYW4gZWxlY3Ryb25pYyB3aGlzayB0byB3aGlwIDM1JSBjcmVhbSB1bnRpbCBpdCBiZWNvbWVzIHB1ZmZ5XCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9XSwgXCJub3RlXCI6IFwiXCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9XSwgXCJub3RlXCI6IFwiTmVlZCBlbGVjdHJvbmljIHdoaXNrIGFuZCB3YWZmbGUgaXJvblwiLCBcImNvbXBsZXRlZFwiOiBmYWxzZSwgXCJ0YWdzXCI6IFtcImJyZWFrZmFzdFwiLCBcInJlYWN0XCJdIH1cbiAgICBdLFxuICAgIGludGVyZXN0aW5nQXV0aG9yczogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0YWdzOiBbJ2Nvb2snLCAncmVhY3QnXSxcbiAgICAgICAgICAgIGVtYWlsOiBcInRlYW1AcmVtaS5jb21cIixcbiAgICAgICAgICAgIG5hbWU6IFwiVGVhbSBSZW1pXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGFnczogWydjb29rJywgJ2Rlc2lnbiddLFxuICAgICAgICAgICAgZW1haWw6IFwiZW1pbHlAcmJjLmNhXCIsXG4gICAgICAgICAgICBuYW1lOiBcIkVtaWx5IFpoYW5nXCJcbiAgICAgICAgfVxuICAgIF1cbn1cblxuZnVuY3Rpb24gcmVkdWNlcihwcmV2U3RhdGU6IFN0b3JlU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogeyBbYW55OiBzdHJpbmddOiBhbnkgfSkge1xuICAgIGNvbnN0IHN0YXRlOiBTdG9yZVN0YXRlID0gcHJldlN0YXRlXG4gICAgY29uc3QgcHJvamVjdCA9IHN0YXRlLnByb2plY3RcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJhZGRJdGVtXCI6IHtcbiAgICAgICAgICAgIGFkZENoaWxkKHByb2plY3QsIG5ld1Byb2plY3QoYWN0aW9uLnRpdGxlLCBwcm9qZWN0LmF1dGhvcikpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwicmVuYW1lSXRlbVwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IG9sZG5hbWUsIG5ld25hbWUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IG9sZG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQudGl0bGUgPSBuZXduYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJjaGVja0l0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSwgZG9uZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIGNvbXBsZXRlKGNoaWxkKVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGNhbmNlbChjaGlsZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImRlbGV0ZUl0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhhdCBjaGlsZFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBjaGlsZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZW1vdmVDaGlsZChwcm9qZWN0LCB0YXJnZXQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwic3ViSXRlbVwiOiB7XG4gICAgICAgICAgICAvLyBtYWtlIGFuIGl0ZW0gYSBkZXBlbmRlbmN5IG9mIGFub3RoZXJcbiAgICAgICAgICAgIGNvbnN0IHsgcGFyZW50LCBjaGlsZCB9ID0gYWN0aW9uXG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBjaGlsZCkgdGhyb3cgXCJjYW5ub3QgYmUgdGhlIHNhbWUgaXRlbVwiXG4gICAgICAgICAgICBsZXQgcGFyZW50aXRlbSwgY2hpbGRpdGVtO1xuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2gudGl0bGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRpdGVtID0gY2hcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoLnRpdGxlID09PSBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZGl0ZW0gPSBjaFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhZGRDaGlsZChwYXJlbnRpdGVtLCBjaGlsZGl0ZW0pXG4gICAgICAgICAgICByZW1vdmVDaGlsZChwcm9qZWN0LCBjaGlsZGl0ZW0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkVGFnXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3dGFnIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIGFkZFRhZyhwcm9qZWN0LCBuZXd0YWcpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwicHVibGlzaFwiOiB7XG4gICAgICAgICAgICBzdGF0ZS5rbm93bGVkZ2ViYXNlLnB1c2goc3RhdGUucHJvamVjdClcbiAgICAgICAgICAgIC8vIGFkZCB0aGF0IHRhZyB0byB0aGUgYXV0aG9yIGFzIHdlbGxcbiAgICAgICAgICAgIGNvbnN0IGF1dGhvciA9IHN0YXRlLmludGVyZXN0aW5nQXV0aG9ycy5maWx0ZXIoKHsgbmFtZSB9KSA9PiBuYW1lID09PSBzdGF0ZS5wcm9qZWN0LmF1dGhvcilbMF1cbiAgICAgICAgICAgIGF1dGhvci50YWdzLnB1c2goLi4ucHJvamVjdC50YWdzKVxuICAgICAgICAgICAgYXV0aG9yLnRhZ3MgPSBBcnJheS5mcm9tKG5ldyBTZXQoYXV0aG9yLnRhZ3MpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZFByb2pOb3Rlc1wiOiB7XG4gICAgICAgICAgICBzZXROb3RlKHByb2plY3QsIGFjdGlvbi5ub3RlKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZE5vdGVcIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSwgbm90ZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2ggPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Tm90ZShjaCwgbm90ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICAgIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIlxuICAgIH0sXG4gICAgXCJyZW5hbWVJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJyZW5hbWVJdGVtXCJcbiAgICB9LFxuICAgIFwiY2hlY2tJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJjaGVja0l0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGRvbmU6IGZhbHNlXG4gICAgfSxcbiAgICBcImRlbGV0ZUl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImRlbGV0ZUl0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCJcbiAgICB9LFxuICAgIFwic3ViSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwic3ViSXRlbVwiLFxuICAgICAgICBwYXJlbnQ6IFwiXCIsXG4gICAgICAgIGNoaWxkOiBcIlwiXG4gICAgfSxcbiAgICBcImFkZFRhZ1wiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkVGFnXCIsXG4gICAgICAgIG5ld3RhZzogXCJcIlxuICAgIH0sXG4gICAgXCJwdWJsaXNoXCI6IHtcbiAgICAgICAgdHlwZTogXCJwdWJsaXNoXCIsXG4gICAgfSxcbiAgICBcImFkZFByb2pOb3Rlc1wiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkUHJvak5vdGVzXCJcbiAgICB9LFxuICAgIFwiYWRkTm90ZVwiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkTm90ZVwiLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgbm90ZTogXCJcIlxuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuc3RvcmUuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpKVxuT2JqZWN0LmFzc2lnbih3aW5kb3csIHsgYWN0aW9ucywgc3RvcmUgfSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9EYXRhZmxvdy50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgc3RvcmUsIGFjdGlvbnMgfSBmcm9tICcuL0RhdGFmbG93J1xuaW1wb3J0IHsgVGFnIH0gZnJvbSAnLi9UYWcnXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vTW9kYWwnXG5pbXBvcnQgeyBzZWFyY2hUb3AgfSBmcm9tICcuL3NlYXJjaGVyJztcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIERldGFpbEF1dGhvcih7IGF1dGhvciB9KSB7XG4gICAgY29uc3QgeyB0YWdzLCBlbWFpbCB9ID0gWy4uLnN0b3JlLmdldFN0YXRlKCkuaW50ZXJlc3RpbmdBdXRob3JzLCBzdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3JdXG4gICAgICAgIC5maWx0ZXIoKHsgbmFtZSB9KSA9PiBuYW1lID09PSBhdXRob3IpWzBdXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsIGF1dGhvclwiPlxuICAgICAgICA8aDE+e2F1dGhvcn08L2gxPlxuICAgICAgICB7dGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgICAgIDxhIGhyZWY9e1wibWFpbHRvOlwiICsgZW1haWx9ID57ZW1haWx9PC9hPlxuICAgICAgICB7Z2V0QXV0aG9yUHJvamVjdHMoYXV0aG9yKS5tYXAodGl0bGUgPT4gPGRpdiBrZXk9e3RpdGxlfT57dGl0bGV9PC9kaXY+KX1cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNsYXNzIEF1dGhvciBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBhdXRob3I6IHN0cmluZyB9LCB7IGRldGFpbDogYm9vbGVhbiB9PiB7XG4gICAgc3RhdGUgPSB7IGRldGFpbDogZmFsc2UgfVxuICAgIHNob3dEZXRhaWwoZXYpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogdHJ1ZSB9KVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGV0YWlsOiBmYWxzZSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgYXV0aG9yIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgZGV0YWlsIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImF1dGhvclwiIG9uQ2xpY2s9e2V2ID0+IHRoaXMuc2hvd0RldGFpbChldil9PlxuICAgICAgICAgICAge2F1dGhvci50b1VwcGVyQ2FzZSgpLnNwbGl0KCcgJykubWFwKGF1ID0+IGF1WzBdKX1cbiAgICAgICAgICAgIHtkZXRhaWwgJiZcbiAgICAgICAgICAgICAgICA8TW9kYWwgZXhpdD17KCkgPT4gdGhpcy5oaWRlKCl9PlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsQXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuICAgICAgICAgICAgICAgIDwvTW9kYWw+XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0QXV0aG9yUHJvamVjdHMoYXV0aG9yKSB7XG4gICAgcmV0dXJuIHNlYXJjaFRvcChzdG9yZS5nZXRTdGF0ZSgpLmtub3dsZWRnZWJhc2UsIHtcbiAgICAgICAga2V5OiBcImF1dGhvclwiLFxuICAgICAgICBtYXRjaGVyOiBuZXcgUmVnRXhwKGF1dGhvcilcbiAgICB9KS5tYXAocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlKVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0F1dGhvci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcblxuZXhwb3J0IGludGVyZmFjZSB0YXNrIHtcbiAgICBcInRpdGxlXCI6IHN0cmluZyxcbiAgICBcImF1dGhvclwiOiBzdHJpbmcsXG4gICAgXCJjb21wbGV0ZWRcIjogYm9vbGVhbixcbiAgICBcImNoaWxkcmVuXCI/OiB0YXNrW10sXG4gICAgXCJub3RlXCI/OiBzdHJpbmcsXG4gICAgXCJ0YWdzXCI/OiBzdHJpbmdbXVxufVxuLy8gdXNlIGNvbXBvbmVudCBuZXN0aW5nIHRvIGdldCBhIGdyYXBoXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGF1dGhvcjogc3RyaW5nKTogdGFzayB7XG4gICAgY29uc3QgUHJvamVjdCA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvcixcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBub3RlOiBcIlwiLFxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICB0YWdzOiBbXVxuICAgIH1cbiAgICByZXR1cm4gUHJvamVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGxldGUocHJvaikge1xuICAgIHByb2ouY29tcGxldGVkID0gdHJ1ZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbChwcm9qKSB7XG4gICAgcHJvai5jb21wbGV0ZWQgPSBmYWxzZVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNldGl0bGUocHJvaiwgbmV3VGl0bGUpIHtcbiAgICBwcm9qLnRpdGxlID0gbmV3VGl0bGVcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRDaGlsZChwcm9qLCBjaGlsZDogdGFzaykge1xuICAgIHByb2ouY2hpbGRyZW4ucHVzaChjaGlsZClcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDaGlsZChwcm9qLCBjaGlsZDogdGFzaykge1xuICAgIHByb2ouY2hpbGRyZW4uc3BsaWNlKHByb2ouY2hpbGRyZW4uaW5kZXhPZihjaGlsZCksIDEpXG59XG5leHBvcnQgZnVuY3Rpb24gc2V0Tm90ZShwcm9qLCBuZXdOb3RlKSB7XG4gICAgcHJvai5ub3RlID0gbmV3Tm90ZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRhZyhwcm9qLCB0YWc6IHN0cmluZykge1xuICAgIHByb2oudGFncy5wdXNoKHRhZylcbn1cblxuY2xhc3MgVGFzayBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyB0c2s6IHRhc2sgfSwgeyBleHBhbmRlZDogYm9vbGVhbiB9PntcbiAgICBzdGF0ZSA9IHsgZXhwYW5kZWQ6IHRydWUgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0c2sgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCBjaGlsZHJlbiwgbm90ZSwgdGFncyB9ID0gdHNrXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRhc2tcIj5cbiAgICAgICAgICAgIDxoMj57dGl0bGV9PC9oMj5cbiAgICAgICAgICAgIHsvKiA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPiAqL31cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkICYmIGNoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgICAgICA8cD57bm90ZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3QgZXh0ZW5kcyBDb21wb25lbnQ8dGFzaywgYW55PiB7XG4gICAgc3RhdGUgPSB7IHB1Ymxpc2hlZDogZmFsc2UgfVxuICAgIGFkZFRhZyhldikge1xuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld3RhZyA9IGV2LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgZXYudGFyZ2V0LnZhbHVlID0gXCJcIlxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZFRhZywgbmV3dGFnIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGlzaCgpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5wdWJsaXNoKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHVibGlzaGVkOiB0cnVlIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCBjaGlsZHJlbiwgbm90ZSwgdGFncyB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IHB1Ymxpc2hlZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0IHRhc2tcIj5cbiAgICAgICAgICAgIDxoMj57dGl0bGV9PC9oMj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5wdWJsaXNoKCl9IGRpc2FibGVkPXtwdWJsaXNoZWR9PntwdWJsaXNoZWQgPyBcIuKclFwiIDogXCLirIZcIn08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24+4qyHPC9idXR0b24+XG4gICAgICAgICAgICA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuICAgICAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5ld3RhZ1wiIHBsYWNlaG9sZGVyPVwibmV3IHRhZ1wiIG9uS2V5VXA9eyhldikgPT4gdGhpcy5hZGRUYWcoZXYpfSAvPlxuICAgICAgICAgICAgPHA+e25vdGV9PC9wPlxuICAgICAgICAgICAge2NoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE92ZXJ2aWV3IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgdGFzaz57XG4gICAgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3RcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHN0b3JlLmdldFN0YXRlKCkucHJvamVjdClcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPFByb2plY3Qgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0dyYXBoLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuLy8gcmVuZGVycyBhIG5pY2UgYmxvY2sgb2YgdGhlIGF1dGhvcidzIGluaXRpYWxzXG5leHBvcnQgZnVuY3Rpb24gVGFnKHsgdGFnIH06IHsgdGFnOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJ0YWdcIj57dGFnfTwvc3Bhbj5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9UYWcudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBjbGFzcyBNb2RhbCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBjaGlsZHJlbjogYW55LCBleGl0OiBGdW5jdGlvbiB9LCBhbnk+e1xuICAgIGJnQ2xpY2soZXYpIHtcbiAgICAgICAgLy8gZXYudGFyZ2V0LnN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgdGhpcy5wcm9wcy5leGl0KClcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCkgICAgICAgIFxuICAgIH1cbiAgICBpbnNpZGVDbGljayhldikge1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxiZ1wiIG9uQ2xpY2s9eyhldikgPT4gdGhpcy5iZ0NsaWNrKGV2KX0gb25TY3JvbGw9e2V2PT5ldi5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgb25DbGljaz17KGV2KSA9PiB0aGlzLmluc2lkZUNsaWNrKGV2KX0+XG4gICAgICAgICAgICAgICAgey4uLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2ID5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvTW9kYWwudHN4IiwiaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vZ3JhcGgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5IHtcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtYXRjaGVyOiBSZWdFeHBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFRvcChLQjogdGFza1tdLCBxdWVyeTogUXVlcnkpIHtcbiAgICAvLyBwdXQgdG9nZXRoZXIgYSBsaXN0IG9mIHJlbGV2YW50IHByb2plY3RzXG4gICAgcmV0dXJuIEtCLmZpbHRlcihwcm9qID0+IHNlYXJjaE9uZShwcm9qLCBxdWVyeSkpXG59XG5cbmZ1bmN0aW9uIHNlYXJjaE9uZSh0YXNrOiB0YXNrLCBxdWVyeSkge1xuICAgIC8vIGZpbmQgaW4gb25lIHByb2plY3QgYW5kIGFsbCBpdHMgY2hpbGRyZW4gaWYgaXQgZXhpc3RcbiAgICBjb25zdCB7IGtleSwgbWF0Y2hlciB9ID0gcXVlcnlcbiAgICBpZiAodGFza1trZXldLm1hdGNoKG1hdGNoZXIpKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRhc2suY2hpbGRyZW4uc29tZShjaGlsZCA9PiBzZWFyY2hPbmUoY2hpbGQsIHF1ZXJ5KSlcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShxdWVyeXN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBxdWVyeXN0cmluZy5zcGxpdCgnJicpXG4gICAgICAgICAgICAubWFwKHFyeSA9PiBxcnkuc3BsaXQoJz0nKSlcbiAgICAgICAgICAgIC5tYXAocSA9PiAoe1xuICAgICAgICAgICAgICAgIGtleTogcVswXS50cmltKCksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogbmV3IFJlZ0V4cChxWzFdLnRyaW0oKSlcbiAgICAgICAgICAgIH0pKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIFt7IGtleTogXCJ0aXRsZVwiLCBtYXRjaGVyOiBuZXcgUmVnRXhwKHF1ZXJ5c3RyaW5nKSB9XVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9zZWFyY2hlci50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7ICQgfSBmcm9tICcuLyQnXG5pbXBvcnQgS0IgZnJvbSBcIi4vS0JcIlxuaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJ1xuaW1wb3J0IE9wcG9ydHVuaXR5IGZyb20gJy4vT3Bwb3J0dW5pdHknXG5pbXBvcnQgeyBPdmVydmlldyB9IGZyb20gJy4vR3JhcGgnXG5cbmNsYXNzIEFwcCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBpdGVtczogeyBbYW55OiBzdHJpbmddOiBhbnkgfSB9LCBhbnk+IHtcbiAgICAvLyBkZWZhdWx0IHJlbmRlciB0aGUgbmV3cyBwYWdlXG4gICAgc3RhdGUgPSB7IFBhZ2U6IHRoaXMucHJvcHMuaXRlbXMuUHJvamVjdCB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgUGFnZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykubWFwKG5hbWUgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wiICsgbmFtZX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFBhZ2U6IGl0ZW1zW25hbWVdIH0pfSBrZXk9e25hbWV9PntuYW1lfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPFBhZ2UgLz5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5yZW5kZXIoPEFwcCBpdGVtcz17eyBQcm9qZWN0OiBUb2RvLCBPdmVydmlldywgRXhwbG9yZTogS0IsIE9wcG9ydHVuaXR5IH19IC8+LCAkKCcjYXBwJykpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvaW5kZXgudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0RE9NXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5leHBvcnQgZnVuY3Rpb24gJChzZWxlY3Rvcikge1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEpID8gcmVzdWx0WzBdIDogcmVzdWx0XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvJC50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBhY3Rpb25zLCBzdG9yZSB9IGZyb20gXCIuL0RhdGFmbG93XCJcbmltcG9ydCB7IHRhc2sgfSBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9HcmFwaCdcbmltcG9ydCB7IHNlYXJjaFRvcCwgUXVlcnksIHBhcnNlIH0gZnJvbSAnLi9zZWFyY2hlcidcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCc7XG4vLyBUb2RvXG4vLyBTaG93IEdyYXBoXG4vLyBmb3JtYXQgb2YgdGhlIGEgbmV3cyBjb250ZW50XG4vLyB0YWdzXG5cbmV4cG9ydCBjbGFzcyBOZXdzIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx0YXNrLCB7IGV4cGFuZDogYm9vbGVhbiB9PntcbiAgICAvLyBBIG5ld3MsIG1heSBleHBhbmQgaWYgbmVjZXNzYXJ5XG4gICAgc3RhdGUgPSB7IGV4cGFuZDogZmFsc2UgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCB0YWdzLCBjaGlsZHJlbiwgbm90ZSB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGV4cGFuZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2V4cGFuZCA/IFwibmV3c2RldGFpbFwiIDogXCJuZXdzYnJpZWZcIn0gb25DbGljaz17KCkgPT4gdGhpcy5tYXliZUV4cGFuZCghZXhwYW5kKX0+XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiA8aDM+e3RpdGxlfTwvaDM+fVxuICAgICAgICAgICAgeyFleHBhbmQgJiYgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz59XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiB0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgICAgIHshZXhwYW5kICYmIDxwPntub3RlfTwvcD59XG4gICAgICAgICAgICB7ZXhwYW5kICYmIDxQcm9qZWN0IHsuLi50aGlzLnByb3BzfSAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIG1heWJlRXhwYW5kKHJlYWxseSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kOiByZWFsbHkgfSlcbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIENvbXBvbmVudDx7IHByb2plY3RzOiB0YXNrW10gfSwgeyByZXN1bHRzOiB0YXNrW10sIG1vZGFsOiBib29sZWFuIH0+e1xuICAgIHN0YXRlID0geyByZXN1bHRzOiBbXSwgbW9kYWw6IGZhbHNlLCBjcml0ZXJpYTogXCJcIiB9XG4gICAgcmVhbFRpbWVSZXN1bHQoZXYpIHtcbiAgICAgICAgY29uc3QgY3JpdGVyaWEgPSBldi50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3QgcXVlcmllcyA9IHBhcnNlKGNyaXRlcmlhKVxuICAgICAgICBjb25zb2xlLmxvZygncGFyc2VkJywgcXVlcmllcylcbiAgICAgICAgaWYgKHF1ZXJpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICByZXN1bHRzOiBxdWVyaWVzLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoVG9wKHByZXYsIGN1cnIpXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5wcm9qZWN0cylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnRTZWFyY2goKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb2RhbDogdHJ1ZSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0cywgbW9kYWwsIGNyaXRlcmlhIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IENvbW1vbiA9IDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoXCI+XG4gICAgICAgICAgICA8aW5wdXQgYXV0b0ZvY3VzPXttb2RhbCA/IHRydWUgOiBmYWxzZX0gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImZpZWxkMT1SZWdFeHBcXCZmaWVsZDI9UmVnRXhwLi4uXCIgb25JbnB1dD17ZXYgPT4gdGhpcy5yZWFsVGltZVJlc3VsdChldil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc3RhcnRTZWFyY2goKX0gLz5cbiAgICAgICAgICAgIDxzcGFuPlNlYXJjaDwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIHttb2RhbCAmJiByZXN1bHRzLm1hcCgocmVzdWx0LCBpKSA9PiA8TmV3cyB7Li4ucmVzdWx0fSBrZXk9e2l9IC8+KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICByZXR1cm4gbW9kYWwgP1xuICAgICAgICAgICAgPE1vZGFsIGV4aXQ9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBtb2RhbDogZmFsc2UgfSl9PlxuICAgICAgICAgICAgICAgIHtDb21tb259XG4gICAgICAgICAgICA8L01vZGFsID4gOlxuICAgICAgICAgICAgQ29tbW9uXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS0IgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+e1xuICAgIHN0YXRlID0geyBwcm9qZWN0czogc3RvcmUuZ2V0U3RhdGUoKS5rbm93bGVkZ2ViYXNlLnNsaWNlKDAsIDEwKSB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2plY3RzOiBzdG9yZS5nZXRTdGF0ZSgpLmtub3dsZWRnZWJhc2Uuc2xpY2UoMCwgMTApIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHByb2plY3RzIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5ld3NcIj5cbiAgICAgICAgICAgIDxoMT5XaGF0J3MgdXA8L2gxPlxuICAgICAgICAgICAgPFNlYXJjaCBwcm9qZWN0cz17cHJvamVjdHN9IC8+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtwcm9qZWN0cy5tYXAoKGl0ZW0sIGkpID0+IDxOZXdzIHsuLi5pdGVtfSBrZXk9e2l9IC8+KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvS0IudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWR1eDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IHRhc2ssIG5ld1Byb2plY3QgfSBmcm9tICcuL2dyYXBoJ1xuaW1wb3J0IHsgc3RvcmUsIGFjdGlvbnMgfSBmcm9tICcuL0RhdGFmbG93J1xuXG5jbGFzcyBUb2RvaXRlbSBleHRlbmRzIENvbXBvbmVudDx7IGl0ZW06IHRhc2sgfSwgYW55PntcbiAgICBzdWJtaXRFZGl0KGV2KSB7XG4gICAgICAgIGNvbnN0IG5ld25hbWUgPSBldi50YXJnZXQudGV4dENvbnRlbnQucmVwbGFjZSgvXFxuL2csIFwiXCIpXG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5yZW5hbWVJdGVtLCBvbGRuYW1lOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIG5ld25hbWUgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkNoZWNrKGV2KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2LnRhcmdldC5jaGVja2VkLCAnY2hlY2tlZCcpXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5jaGVja0l0ZW0sIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIGRvbmU6IGV2LnRhcmdldC5jaGVja2VkIH0pXG4gICAgfVxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmRlbGV0ZUl0ZW0sIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUgfSlcbiAgICB9XG4gICAgcGlja3VwKGV2KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwaWNrZWQgdXAnKVxuICAgICAgICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgdGhpcy5wcm9wcy5pdGVtLnRpdGxlKTtcbiAgICB9XG4gICAgb3Zlcihldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBkcm9wKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5zdWJJdGVtLCBjaGlsZDogdGl0bGUsIHBhcmVudDogdGhpcy5wcm9wcy5pdGVtLnRpdGxlIH0pXG4gICAgfVxuICAgIGFkZE5vdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBwcm9tcHQoXCJXaGF0IGlzIHlvdXIgbm90ZT9cIiwgdGhpcy5wcm9wcy5pdGVtLm5vdGUpXG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkTm90ZSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgbm90ZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCIgKyAoaXRlbS5jb21wbGV0ZWQgPyBcIiBjb21wbGV0ZWRcIiA6IFwiXCIpfVxuICAgICAgICAgICAgb25EcmFnT3Zlcj17ZXYgPT4gdGhpcy5vdmVyKGV2KX1cbiAgICAgICAgICAgIG9uRHJvcD17KGV2KSA9PiB0aGlzLmRyb3AoZXYpfT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPXtpdGVtLnRpdGxlfSBjaGVja2VkPXtpdGVtLmNvbXBsZXRlZH0gb25DbGljaz17ZXYgPT4gdGhpcy5vbkNoZWNrKGV2KX0gLz5cbiAgICAgICAgICAgIDxwIGNvbnRlbnRFZGl0YWJsZSBvbktleVVwPXsoZXYpID0+IHRoaXMuc3VibWl0RWRpdChldil9PntpdGVtLnRpdGxlfTwvcD5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5hZGROb3RlKCl9Pk5vdGU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5yZW1vdmUoKX0+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImRyYWdnZXJcIiBzcmM9XCJodHRwOi8vd3d3Lmljb25uaW5qYS5jb20vZmlsZXMvNzQxLzEwOS8yMTAvdHJlZS1pY29uLnBuZ1wiXG4gICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eyhldikgPT4gdGhpcy5waWNrdXAoZXYpfVxuICAgICAgICAgICAgPjwvaW1nPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PiB7XG4gICAgc3RhdGUgPSB7IGNoaWxkcmVuOiBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QuY2hpbGRyZW4gfVxuICAgIG5ld3RpdGxlID0gXCJcIlxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY2hpbGRyZW46IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdC5jaGlsZHJlbiB9KVxuICAgICAgICApXG4gICAgfVxuXG4gICAgdHlwaW5nTmV3SXRlbShldikge1xuICAgICAgICBjb25zdCBuZXd0aXRsZSA9IGV2LnRhcmdldC52YWx1ZS5yZXBsYWNlKC9cXG4vZywgXCJcIilcbiAgICAgICAgdGhpcy5uZXd0aXRsZSA9IG5ld3RpdGxlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0eXBpbmcnLCBuZXd0aXRsZSlcbiAgICB9XG4gICAgYWRkSXRlbShuZXd0aXRsZSA9IHRoaXMubmV3dGl0bGUpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZEl0ZW0sIHRpdGxlOiBuZXd0aXRsZSB9KVxuICAgIH1cbiAgICBlbnRlcihldikge1xuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSXRlbSgpXG4gICAgICAgICAgICBldi50YXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgb25JbnB1dD17KGV2KSA9PiB0aGlzLnR5cGluZ05ld0l0ZW0oZXYpfSBvbktleVVwPXtldiA9PiB0aGlzLmVudGVyKGV2KX0gcGxhY2Vob2xkZXI9XCJBZGQgYW4gaXRlbVwiIC8+XG4gICAgICAgICAgICB7Y2hpbGRyZW4ubWFwKGl0ZW0gPT4gPFRvZG9pdGVtIGl0ZW09e2l0ZW19IGtleT17aXRlbS50aXRsZX0gLz4pfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSwgdGFzaz57XG4gICAgc3RhdGUgPSB7IC4uLnN0b3JlLmdldFN0YXRlKCkucHJvamVjdCB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpKVxuICAgIH1cbiAgICBwcm9qZWN0Tm90ZSgpIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IHByb21wdChcIldoYXQgaXMgeW91ciBub3RlP1wiLCB0aGlzLnN0YXRlLm5vdGUpXG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkUHJvak5vdGVzLCBub3RlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGF1dGhvciwgY2hpbGRyZW4sIHRpdGxlIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvZG9saXN0c1wiPlxuICAgICAgICAgICAgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz5cbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5wcm9qZWN0Tm90ZSgpfT5Ob3RlczwvYnV0dG9uPlxuICAgICAgICAgICAgPFRvZG9MaXN0IGNoaWxkcmVuPXtjaGlsZHJlbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL1RvZG8udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBEZXRhaWxBdXRob3IgfSBmcm9tICcuL0F1dGhvcic7XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vRGF0YWZsb3cnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHBvcnR1bml0eSBleHRlbmRzIFB1cmVDb21wb25lbnQ8YW55LGFueT57XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGgxPk9wcG9ydHVuaXRpZXM8L2gxPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDI+Q29udHJpYnV0b3JzIHlvdSBtaWdodCBiZSBpbnRlcmVzdGVkIGluPC9oMj5cbiAgICAgICAgICAgICAgICB7c3RvcmUuZ2V0U3RhdGUoKS5pbnRlcmVzdGluZ0F1dGhvcnMubWFwKCh7bmFtZX0pPT48RGV0YWlsQXV0aG9yIGF1dGhvcj17bmFtZX0ga2V5PXtuYW1lfS8+KX1cbiAgICAgICAgICAgICAgICA8cD5Db25uZWN0IHdpdGggMTAgSyBDb2ZmZWU8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgyPlByb2plY3RzIHRoYXQgcmVsZXZhbnQgdG8geW91ciBza2lsbHM8L2gyPlxuICAgICAgICAgICAgICAgIDxwPkNvbm5lY3Qgd2l0aCBSQkMgaW50ZXJuYWwgam9iIHBvc3Rpbmc8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJzb3VyY2VSb290IjoiIn0=