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
const redux_1 = __webpack_require__(10);
const Graph_1 = __webpack_require__(3);
const initialState = {
    project: Graph_1.newProject("Sample Project: Make Green Tea Frappacino", "Lingkai Shen"),
    currentAuthor: {
        tags: ['cook', 'react'],
        email: "slk49@live.cn",
        name: "Lingkai Shen"
    },
    knowledgebase: [
        { "title": "Make waffle", "author": "Team Remi", "children": [{ "title": "pour onto the waffle iron, wait 2min", "author": "Team Remi", "children": [{ "title": "mix flour, baking powder, eggs etc", "author": "Team Remi", "children": [], "note": "", "completed": true, "tags": [] }, { "title": "whip cream", "author": "Team Remi", "children": [], "note": "Use an electronic whisk to whip 35% cream until it becomes puffy", "completed": true, "tags": [] }], "note": "", "completed": true, "tags": [] }], "note": "Need electronic whisk and waffle iron", "completed": false, "tags": ["breakfast", "react"] },
        {
            "title": "How to build ReBCipe",
            "author": "Lingkai Shen",
            "children": [
                {
                    "title": "get ready for demo",
                    "author": "Lingkai Shen",
                    "children": [
                        {
                            "title": "implement components",
                            "author": "Lingkai Shen",
                            "children": [
                                {
                                    "title": "break down components",
                                    "author": "Lingkai Shen",
                                    "children": [],
                                    "note": "",
                                    "completed": true,
                                    "tags": []
                                },
                                {
                                    "title": "setup environment",
                                    "author": "Lingkai Shen",
                                    "children": [
                                        {
                                            "title": "learn redux",
                                            "author": "Lingkai Shen",
                                            "children": [],
                                            "note": "",
                                            "completed": true,
                                            "tags": []
                                        },
                                        {
                                            "title": "webpack with hot reload",
                                            "author": "Lingkai Shen",
                                            "children": [],
                                            "note": "",
                                            "completed": true,
                                            "tags": []
                                        },
                                        {
                                            "title": "sass",
                                            "author": "Lingkai Shen",
                                            "children": [],
                                            "note": "",
                                            "completed": true,
                                            "tags": []
                                        },
                                        {
                                            "title": "react",
                                            "author": "Lingkai Shen",
                                            "children": [],
                                            "note": "",
                                            "completed": true,
                                            "tags": []
                                        }
                                    ],
                                    "note": "",
                                    "completed": true,
                                    "tags": []
                                }
                            ],
                            "note": "",
                            "completed": true,
                            "tags": []
                        }
                    ],
                    "note": "",
                    "completed": true,
                    "tags": []
                }
            ],
            "note": "",
            "completed": false,
            "tags": []
        }
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
Graph_1.addChild(initialState.project, Graph_1.newProject("Matcha tea", "Lingkai Shen"));
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
            const author = state.currentAuthor;
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
        case "importProject": {
            const { children } = action;
            children.forEach(child => {
                Graph_1.addChild(state.project, child);
            });
            break;
        }
    }
    return state;
}
exports.actions = {
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
const Modal_1 = __webpack_require__(11);
const searcher_1 = __webpack_require__(6);
// renders a nice block of the author's initials
function DetailAuthor({ author }) {
    const { tags, email } = [...Dataflow_1.store.getState().interestingAuthors, Dataflow_1.store.getState().currentAuthor]
        .filter(({ name }) => name === author)[0];
    return React.createElement("div", { className: "authordetail" },
        React.createElement("h1", null, author),
        tags.map(tag => React.createElement(Tag_1.Tag, { tag: tag, key: tag })),
        React.createElement("a", { href: "mailto:" + email }, email),
        React.createElement("h2", null, "Contributions:"),
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
const _1 = __webpack_require__(5);
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
function cloneTask(proj) {
    // make a shallow copy of a task, with no children and uncompleted
    const newproj = Object.assign({}, proj);
    newproj.children = [];
    newproj.completed = false;
    newproj.tags = newproj.tags.slice(0);
    return newproj;
}
exports.cloneTask = cloneTask;
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
    import() {
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.importProject, { children: importProject(this.props) }));
        setTimeout(() => _1.$('a[href="#Project"]').click(), 100);
    }
    render() {
        const { title, author, children, note, tags, mode = "local" } = this.props;
        const { published } = this.state;
        return React.createElement("div", { className: "project task" },
            React.createElement("h1", null, title),
            React.createElement(Author_1.Author, { author: author }),
            mode.includes("local") && React.createElement("button", { className: "primary", onClick: () => this.publish(), disabled: published }, published ? "Done ✔" : "Publish ⬆"),
            mode.includes("local") && React.createElement("button", null, "Download \u2B07"),
            mode.includes("online") && React.createElement("button", { className: "primary", onClick: () => this.import() }, "Import \u2B07"),
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
function importProject(project) {
    // flatten a whole project and mark each child as incomplete
    const children = [];
    traverse(project.children, children);
    return children;
}
exports.importProject = importProject;
function traverse(children, target) {
    children.forEach(child => {
        target.push(cloneTask(child));
        traverse(child.children, target);
    });
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Dataflow_1 = __webpack_require__(1);
// renders a nice block of the author's initials
function Tag({ tag }) {
    const mytags = Dataflow_1.store.getState().currentAuthor.tags;
    return React.createElement("span", { className: "tag" + (mytags.includes(tag) ? " hot" : "") }, tag);
}
exports.Tag = Tag;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function $(selector) {
    var result = document.querySelectorAll(selector);
    return (result.length === 1) ? result[0] : result;
}
exports.$ = $;


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
const _1 = __webpack_require__(5);
const KB_1 = __webpack_require__(9);
const Todo_1 = __webpack_require__(12);
const Opportunity_1 = __webpack_require__(14);
const Graph_1 = __webpack_require__(3);
const Author_1 = __webpack_require__(2);
const Dataflow_1 = __webpack_require__(1);
const author = Dataflow_1.store.getState().currentAuthor.name;
class App extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        // default render the news page
        this.state = { Page: this.props.items.Project, currentlink: "Project" };
    }
    render() {
        const { items } = this.props;
        const { Page, currentlink } = this.state;
        return React.createElement("div", null,
            React.createElement("nav", null,
                React.createElement(Author_1.Author, { author: author }),
                Object.keys(items).map(name => React.createElement("a", { href: "#" + name, onClick: () => this.setState({ Page: items[name], currentlink: name }), key: name, className: currentlink === name ? "current" : "" }, name))),
            React.createElement("main", null,
                React.createElement(Page, null)));
    }
}
react_dom_1.render(React.createElement(App, { items: { Project: Todo_1.default, Overview: Graph_1.Overview, Explore: KB_1.default, Connect: Opportunity_1.default } }), _1.$('#app'));


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 9 */
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
            expand && React.createElement(Graph_1.Project, Object.assign({}, this.props, { mode: "online" })));
    }
    maybeExpand(really) {
        this.setState({ expand: really });
    }
}
exports.News = News;
class Search extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { results: [] };
    }
    realTimeResult(ev) {
        const criteria = ev.target.value;
        if (criteria === "") {
            this.stopSearch();
        }
        else {
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
    }
    startSearch() {
        this.props.switchMode(true);
    }
    stopSearch() {
        this.props.switchMode(false);
        this.setState({ results: [] });
    }
    maybeStopSearch(ev) {
        if (ev.target.value === "") {
            this.stopSearch();
        }
    }
    render() {
        const { results } = this.state;
        return React.createElement("div", { className: "search" },
            React.createElement("div", { className: "searchbar" },
                React.createElement("input", { type: "text", placeholder: "field1=RegExp\&field2=RegExp...", onInput: ev => this.realTimeResult(ev), onClick: () => this.startSearch(), onBlur: ev => this.maybeStopSearch(ev) }),
                React.createElement("img", { src: "https://www.rbcroyalbank.com/dvl/v0.1/assets/images/ui/ui-search-thin-blue.svg", alt: "Search" })),
            React.createElement("div", { className: "results" }, results.map((result, i) => React.createElement(News, Object.assign({}, result, { key: i })))));
    }
}
class KB extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { projects: Dataflow_1.store.getState().knowledgebase.slice(0, 10), searching: false };
    }
    componentDidMount() {
        this.componentWillUnmount = Dataflow_1.store.subscribe(() => {
            this.setState({ projects: Dataflow_1.store.getState().knowledgebase.slice(0, 10) });
        });
    }
    render() {
        const { projects, searching } = this.state;
        return React.createElement("div", { className: "news" },
            React.createElement("h1", null, "What's up"),
            React.createElement(Search, { projects: projects, switchMode: (searching) => this.setState({ searching }) }),
            !searching && React.createElement("div", null, projects.map((item, i) => React.createElement(News, Object.assign({}, item, { key: i })))));
    }
}
exports.default = KB;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Dataflow_1 = __webpack_require__(1);
const Editable_1 = __webpack_require__(13);
class Todoitem extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { status: "" };
    }
    submitEdit(newname) {
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.renameItem, { oldname: this.props.item.title, newname }));
    }
    onCheck(ev) {
        console.log(ev.target.checked, 'checked');
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.checkItem, { title: this.props.item.title, done: ev.target.checked }));
    }
    remove() {
        this.setState({ status: "fading" });
        setTimeout(() => Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.deleteItem, { title: this.props.item.title })), 300);
    }
    pickup(ev) {
        console.log('picked up');
        ev.dataTransfer.setData("text", this.props.item.title);
        ev.target.classList.add('afloat');
    }
    restoreinplace(ev) {
        ev.target.classList.remove('afloat');
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
    touchstart(ev) {
        // console.log('touhstart',ev)
        // ev.persist()
        ev.target.classList.add('afloat');
    }
    touchmove(ev) {
        console.log('moving', ev);
        ev.persist();
        ev.stopPropagation();
        ev.preventDefault();
        const location = ev.touches[0];
        console.log(location);
        ev.target.style.left = location.pageX + "px";
        ev.target.style.top = location.pageY + "px";
    }
    render() {
        const { item } = this.props;
        const { status } = this.state;
        return React.createElement("div", { className: "item " + (item.completed ? "completed" : "") + status, onDragOver: ev => this.over(ev), onDrop: (ev) => this.drop(ev) },
            item.completed && React.createElement("img", { className: "dragger", src: "https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png", onDragStart: (ev) => this.pickup(ev), onDragEnd: ev => this.restoreinplace(ev), onTouchStart: ev => this.touchstart(ev), onTouchMoveCapture: ev => this.touchmove(ev), onTouchEnd: ev => this.restoreinplace(ev) }),
            React.createElement("input", { type: "checkbox", name: item.title, checked: item.completed, onClick: ev => this.onCheck(ev) }),
            React.createElement(Editable_1.Editable, { save: txt => this.submitEdit(txt) }, item.title),
            React.createElement("i", { onClick: () => this.addNote() }, "\uD83D\uDCC4"),
            React.createElement("i", { onClick: () => this.remove() }, "\uD83D\uDDD1"));
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
            React.createElement("input", { className: "additem", type: "text", onInput: (ev) => this.typingNewItem(ev), onKeyUp: ev => this.enter(ev), placeholder: "Add an item" }),
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
        const { children, title } = this.state;
        return React.createElement("div", { className: "todolists" },
            React.createElement("i", { onClick: () => this.projectNote() }, "\uD83D\uDCC4"),
            React.createElement("h1", null, title),
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
function Editable({ save, children }) {
    function input(ev) {
        // enter to submit, otherwise just do nothing
        const newname = ev.target.textContent.replace(/\n/g, "");
        if (ev.key === "Enter") {
            ev.preventDefault();
            ev.stopPropagation();
            save(newname);
            console.log(newname, "saved");
        }
    }
    return React.createElement("p", { onKeyDown: input }, children);
}
exports.Editable = Editable;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Author_1 = __webpack_require__(2);
const Dataflow_1 = __webpack_require__(1);
class Opportunity extends react_1.PureComponent {
    render() {
        return React.createElement("div", { className: "opportunities" },
            React.createElement("h1", null, "Opportunities"),
            React.createElement("div", { className: "interestingcontributors" },
                React.createElement("h2", null, "Contributors you might be interested in"),
                Dataflow_1.store.getState().interestingAuthors.map(({ name }) => React.createElement(Author_1.DetailAuthor, { author: name, key: name })),
                React.createElement("p", null, "Connect with recommendation algorithm of 10k Coffee")),
            React.createElement("div", null,
                React.createElement("h2", null, "Upcoming projects that demand your skills"),
                React.createElement("p", null, "Connect with RBC internal job posting")));
    }
}
exports.default = Opportunity;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlmZTEyN2ZjODYwZDkxZjc1ZjMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL0dyYXBoLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9UYWcudHN4Iiwid2VicGFjazovLy8uL3RzLyQudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvc2VhcmNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vdHMvS0IudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL0VkaXRhYmxlLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9PcHBvcnR1bml0eS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLHVCOzs7Ozs7Ozs7QUNDQSx3Q0FBbUM7QUFDbkMsdUNBQW9HO0FB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QUFlLEVBQUU7UUFDYiw2Q0FBNkM7UUFDN0MsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDeEQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxjQUFjLEVBQUU7WUFDbkIsRUFBRSxDQUFDLGVBQWUsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLDJCQUFHLFNBQVMsRUFBRSxLQUFLLElBQUcsUUFBUSxDQUFLO0FBQzlDLENBQUM7QUFaRCw0QkFZQzs7Ozs7Ozs7OztBQ2ZELHFDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMsd0NBQXdDO0FBQ3hDLDBDQUFtQztBQUVuQyxpQkFBaUMsU0FBUSxxQkFBc0I7SUFDM0QsTUFBTTtRQUNGLE1BQU0sQ0FBQyw2QkFBSyxTQUFTLEVBQUMsZUFBZTtZQUNqQyxnREFBc0I7WUFDdEIsNkJBQUssU0FBUyxFQUFDLHlCQUF5QjtnQkFDcEMsMEVBQWdEO2dCQUMvQyxnQkFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUcsb0JBQUMscUJBQVksSUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDNUYscUZBQTBELENBQ3hEO1lBQ047Z0JBQ0ksNEVBQWtEO2dCQUNsRCx1RUFBNEMsQ0FDMUMsQ0FDSjtJQUNWLENBQUM7Q0FDSjtBQWZELDhCQWVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI5ZmUxMjdmYzg2MGQ5MWY3NWYzIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IG5ld1Byb2plY3QsIHRhc2ssIGNvbXBsZXRlLCBjYW5jZWwsIHJlbW92ZUNoaWxkLCBhZGRDaGlsZCwgYWRkVGFnLCBzZXROb3RlIH0gZnJvbSAnLi9HcmFwaCdcblxuaW50ZXJmYWNlIGNvbnRyaWJ1dGVyIHtcbiAgICB0YWdzOiBzdHJpbmdbXSxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgU3RvcmVTdGF0ZSB7XG4gICAgcHJvamVjdD86IHRhc2ssXG4gICAgY3VycmVudEF1dGhvcj86IGNvbnRyaWJ1dGVyLFxuICAgIGtub3dsZWRnZWJhc2U/OiB0YXNrW10sXG4gICAgaW50ZXJlc3RpbmdBdXRob3JzPzogY29udHJpYnV0ZXJbXVxufVxuXG5jb25zdCBpbml0aWFsU3RhdGU6IFN0b3JlU3RhdGUgPSB7XG4gICAgcHJvamVjdDogbmV3UHJvamVjdChcIlNhbXBsZSBQcm9qZWN0OiBNYWtlIEdyZWVuIFRlYSBGcmFwcGFjaW5vXCIsIFwiTGluZ2thaSBTaGVuXCIpLFxuICAgIGN1cnJlbnRBdXRob3I6IHtcbiAgICAgICAgdGFnczogWydjb29rJywgJ3JlYWN0J10sXG4gICAgICAgIGVtYWlsOiBcInNsazQ5QGxpdmUuY25cIixcbiAgICAgICAgbmFtZTogXCJMaW5na2FpIFNoZW5cIlxuICAgIH0sXG4gICAga25vd2xlZGdlYmFzZTogW1xuICAgICAgICB7IFwidGl0bGVcIjogXCJNYWtlIHdhZmZsZVwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFt7IFwidGl0bGVcIjogXCJwb3VyIG9udG8gdGhlIHdhZmZsZSBpcm9uLCB3YWl0IDJtaW5cIiwgXCJhdXRob3JcIjogXCJUZWFtIFJlbWlcIiwgXCJjaGlsZHJlblwiOiBbeyBcInRpdGxlXCI6IFwibWl4IGZsb3VyLCBiYWtpbmcgcG93ZGVyLCBlZ2dzIGV0Y1wiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFtdLCBcIm5vdGVcIjogXCJcIiwgXCJjb21wbGV0ZWRcIjogdHJ1ZSwgXCJ0YWdzXCI6IFtdIH0sIHsgXCJ0aXRsZVwiOiBcIndoaXAgY3JlYW1cIiwgXCJhdXRob3JcIjogXCJUZWFtIFJlbWlcIiwgXCJjaGlsZHJlblwiOiBbXSwgXCJub3RlXCI6IFwiVXNlIGFuIGVsZWN0cm9uaWMgd2hpc2sgdG8gd2hpcCAzNSUgY3JlYW0gdW50aWwgaXQgYmVjb21lcyBwdWZmeVwiLCBcImNvbXBsZXRlZFwiOiB0cnVlLCBcInRhZ3NcIjogW10gfV0sIFwibm90ZVwiOiBcIlwiLCBcImNvbXBsZXRlZFwiOiB0cnVlLCBcInRhZ3NcIjogW10gfV0sIFwibm90ZVwiOiBcIk5lZWQgZWxlY3Ryb25pYyB3aGlzayBhbmQgd2FmZmxlIGlyb25cIiwgXCJjb21wbGV0ZWRcIjogZmFsc2UsIFwidGFnc1wiOiBbXCJicmVha2Zhc3RcIiwgXCJyZWFjdFwiXSB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInRpdGxlXCI6IFwiSG93IHRvIGJ1aWxkIFJlQkNpcGVcIixcbiAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiTGluZ2thaSBTaGVuXCIsXG4gICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJnZXQgcmVhZHkgZm9yIGRlbW9cIixcbiAgICAgICAgICAgICAgICAgICAgXCJhdXRob3JcIjogXCJMaW5na2FpIFNoZW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcImltcGxlbWVudCBjb21wb25lbnRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdXRob3JcIjogXCJMaW5na2FpIFNoZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcImJyZWFrIGRvd24gY29tcG9uZW50c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdXRob3JcIjogXCJMaW5na2FpIFNoZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcInNldHVwIGVudmlyb25tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwibGVhcm4gcmVkdXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdXRob3JcIjogXCJMaW5na2FpIFNoZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwid2VicGFjayB3aXRoIGhvdCByZWxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdXRob3JcIjogXCJMaW5na2FpIFNoZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwic2Fzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJyZWFjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInRhZ3NcIjogW11cbiAgICAgICAgfVxuICAgIF0sXG4gICAgaW50ZXJlc3RpbmdBdXRob3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhZ3M6IFsnY29vaycsICdyZWFjdCddLFxuICAgICAgICAgICAgZW1haWw6IFwidGVhbUByZW1pLmNvbVwiLFxuICAgICAgICAgICAgbmFtZTogXCJUZWFtIFJlbWlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0YWdzOiBbJ2Nvb2snLCAnZGVzaWduJ10sXG4gICAgICAgICAgICBlbWFpbDogXCJlbWlseUByYmMuY2FcIixcbiAgICAgICAgICAgIG5hbWU6IFwiRW1pbHkgWmhhbmdcIlxuICAgICAgICB9XG4gICAgXVxufVxuXG5hZGRDaGlsZChpbml0aWFsU3RhdGUucHJvamVjdCxuZXdQcm9qZWN0KFwiTWF0Y2hhIHRlYVwiLFwiTGluZ2thaSBTaGVuXCIpKVxuXG5cbmZ1bmN0aW9uIHJlZHVjZXIocHJldlN0YXRlOiBTdG9yZVN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IHsgW2FueTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBjb25zdCBzdGF0ZTogU3RvcmVTdGF0ZSA9IHByZXZTdGF0ZVxuICAgIGNvbnN0IHByb2plY3QgPSBzdGF0ZS5wcm9qZWN0XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgICAgICBhZGRDaGlsZChwcm9qZWN0LCBuZXdQcm9qZWN0KGFjdGlvbi50aXRsZSwgcHJvamVjdC5hdXRob3IpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInJlbmFtZUl0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyBvbGRuYW1lLCBuZXduYW1lIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSBvbGRuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnRpdGxlID0gbmV3bmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiY2hlY2tJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUsIGRvbmUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSBjb21wbGV0ZShjaGlsZClcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBjYW5jZWwoY2hpbGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJkZWxldGVJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUgfSA9IGFjdGlvblxuICAgICAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIHRoYXQgY2hpbGRcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQocHJvamVjdCwgdGFyZ2V0KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInN1Ykl0ZW1cIjoge1xuICAgICAgICAgICAgLy8gbWFrZSBhbiBpdGVtIGEgZGVwZW5kZW5jeSBvZiBhbm90aGVyXG4gICAgICAgICAgICBjb25zdCB7IHBhcmVudCwgY2hpbGQgfSA9IGFjdGlvblxuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gY2hpbGQpIHRocm93IFwiY2Fubm90IGJlIHRoZSBzYW1lIGl0ZW1cIlxuICAgICAgICAgICAgbGV0IHBhcmVudGl0ZW0sIGNoaWxkaXRlbTtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoLnRpdGxlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50aXRlbSA9IGNoXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaC50aXRsZSA9PT0gY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRpdGVtID0gY2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYWRkQ2hpbGQocGFyZW50aXRlbSwgY2hpbGRpdGVtKVxuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQocHJvamVjdCwgY2hpbGRpdGVtKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZFRhZ1wiOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld3RhZyB9ID0gYWN0aW9uXG4gICAgICAgICAgICBhZGRUYWcocHJvamVjdCwgbmV3dGFnKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInB1Ymxpc2hcIjoge1xuICAgICAgICAgICAgc3RhdGUua25vd2xlZGdlYmFzZS5wdXNoKHN0YXRlLnByb2plY3QpXG4gICAgICAgICAgICAvLyBhZGQgdGhhdCB0YWcgdG8gdGhlIGF1dGhvciBhcyB3ZWxsXG4gICAgICAgICAgICBjb25zdCBhdXRob3IgPSBzdGF0ZS5jdXJyZW50QXV0aG9yXG4gICAgICAgICAgICBhdXRob3IudGFncy5wdXNoKC4uLnByb2plY3QudGFncylcbiAgICAgICAgICAgIGF1dGhvci50YWdzID0gQXJyYXkuZnJvbShuZXcgU2V0KGF1dGhvci50YWdzKSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGRQcm9qTm90ZXNcIjoge1xuICAgICAgICAgICAgc2V0Tm90ZShwcm9qZWN0LCBhY3Rpb24ubm90ZSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGROb3RlXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUsIG5vdGUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2gudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldE5vdGUoY2gsIG5vdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJpbXBvcnRQcm9qZWN0XCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IGFjdGlvblxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgYWRkQ2hpbGQoc3RhdGUucHJvamVjdCwgY2hpbGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICAgIFwiaW1wb3J0UHJvamVjdFwiOiB7XG4gICAgICAgIHR5cGU6IFwiaW1wb3J0UHJvamVjdFwiLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICB9LFxuICAgIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIlxuICAgIH0sXG4gICAgXCJyZW5hbWVJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJyZW5hbWVJdGVtXCJcbiAgICB9LFxuICAgIFwiY2hlY2tJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJjaGVja0l0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGRvbmU6IGZhbHNlXG4gICAgfSxcbiAgICBcImRlbGV0ZUl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImRlbGV0ZUl0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCJcbiAgICB9LFxuICAgIFwic3ViSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwic3ViSXRlbVwiLFxuICAgICAgICBwYXJlbnQ6IFwiXCIsXG4gICAgICAgIGNoaWxkOiBcIlwiXG4gICAgfSxcbiAgICBcImFkZFRhZ1wiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkVGFnXCIsXG4gICAgICAgIG5ld3RhZzogXCJcIlxuICAgIH0sXG4gICAgXCJwdWJsaXNoXCI6IHtcbiAgICAgICAgdHlwZTogXCJwdWJsaXNoXCIsXG4gICAgfSxcbiAgICBcImFkZFByb2pOb3Rlc1wiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkUHJvak5vdGVzXCJcbiAgICB9LFxuICAgIFwiYWRkTm90ZVwiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkTm90ZVwiLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgbm90ZTogXCJcIlxuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuc3RvcmUuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpKVxuT2JqZWN0LmFzc2lnbih3aW5kb3csIHsgYWN0aW9ucywgc3RvcmUgfSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9EYXRhZmxvdy50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgc3RvcmUsIGFjdGlvbnMgfSBmcm9tICcuL0RhdGFmbG93J1xuaW1wb3J0IHsgVGFnIH0gZnJvbSAnLi9UYWcnXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vTW9kYWwnXG5pbXBvcnQgeyBzZWFyY2hUb3AgfSBmcm9tICcuL3NlYXJjaGVyJztcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIERldGFpbEF1dGhvcih7IGF1dGhvciB9KSB7XG4gICAgY29uc3QgeyB0YWdzLCBlbWFpbCB9ID0gWy4uLnN0b3JlLmdldFN0YXRlKCkuaW50ZXJlc3RpbmdBdXRob3JzLCBzdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3JdXG4gICAgICAgIC5maWx0ZXIoKHsgbmFtZSB9KSA9PiBuYW1lID09PSBhdXRob3IpWzBdXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYXV0aG9yZGV0YWlsXCI+XG4gICAgICAgIDxoMT57YXV0aG9yfTwvaDE+XG4gICAgICAgIHt0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgPGEgaHJlZj17XCJtYWlsdG86XCIgKyBlbWFpbH0gPntlbWFpbH08L2E+XG4gICAgICAgIDxoMj5Db250cmlidXRpb25zOjwvaDI+XG4gICAgICAgIHtnZXRBdXRob3JQcm9qZWN0cyhhdXRob3IpLm1hcCh0aXRsZSA9PiA8ZGl2IGtleT17dGl0bGV9Pnt0aXRsZX08L2Rpdj4pfVxuICAgIDwvZGl2PlxufVxuXG5leHBvcnQgY2xhc3MgQXV0aG9yIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGF1dGhvcjogc3RyaW5nIH0sIHsgZGV0YWlsOiBib29sZWFuIH0+IHtcbiAgICBzdGF0ZSA9IHsgZGV0YWlsOiBmYWxzZSB9XG4gICAgc2hvd0RldGFpbChldikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGV0YWlsOiB0cnVlIH0pXG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkZXRhaWw6IGZhbHNlIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBhdXRob3IgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBkZXRhaWwgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcImF1dGhvclwifSBvbkNsaWNrPXtldiA9PiB0aGlzLnNob3dEZXRhaWwoZXYpfT5cbiAgICAgICAgICAgIHthdXRob3IudG9VcHBlckNhc2UoKS5zcGxpdCgnICcpLm1hcChhdSA9PiBhdVswXSl9XG4gICAgICAgICAgICB7ZGV0YWlsICYmXG4gICAgICAgICAgICAgICAgPE1vZGFsIGV4aXQ9eygpID0+IHRoaXMuaGlkZSgpfT5cbiAgICAgICAgICAgICAgICAgICAgPERldGFpbEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz5cbiAgICAgICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEF1dGhvclByb2plY3RzKGF1dGhvcikge1xuICAgIHJldHVybiBzZWFyY2hUb3Aoc3RvcmUuZ2V0U3RhdGUoKS5rbm93bGVkZ2ViYXNlLCB7XG4gICAgICAgIGtleTogXCJhdXRob3JcIixcbiAgICAgICAgbWF0Y2hlcjogbmV3IFJlZ0V4cChhdXRob3IpXG4gICAgfSkubWFwKHByb2plY3QgPT4gcHJvamVjdC50aXRsZSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9BdXRob3IudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJ1xuaW1wb3J0IHsgVGFnIH0gZnJvbSAnLi9UYWcnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi8kJztcblxuZXhwb3J0IGludGVyZmFjZSB0YXNrIHtcbiAgICBcInRpdGxlXCI6IHN0cmluZyxcbiAgICBcImF1dGhvclwiOiBzdHJpbmcsXG4gICAgXCJjb21wbGV0ZWRcIjogYm9vbGVhbixcbiAgICBcImNoaWxkcmVuXCI/OiB0YXNrW10sXG4gICAgXCJub3RlXCI/OiBzdHJpbmcsXG4gICAgXCJ0YWdzXCI/OiBzdHJpbmdbXVxufVxuLy8gdXNlIGNvbXBvbmVudCBuZXN0aW5nIHRvIGdldCBhIGdyYXBoXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGF1dGhvcjogc3RyaW5nKTogdGFzayB7XG4gICAgY29uc3QgUHJvamVjdCA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvcixcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBub3RlOiBcIlwiLFxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICB0YWdzOiBbXVxuICAgIH1cbiAgICByZXR1cm4gUHJvamVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGxldGUocHJvaikge1xuICAgIHByb2ouY29tcGxldGVkID0gdHJ1ZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbChwcm9qKSB7XG4gICAgcHJvai5jb21wbGV0ZWQgPSBmYWxzZVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNldGl0bGUocHJvaiwgbmV3VGl0bGUpIHtcbiAgICBwcm9qLnRpdGxlID0gbmV3VGl0bGVcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRDaGlsZChwcm9qLCBjaGlsZDogdGFzaykge1xuICAgIHByb2ouY2hpbGRyZW4ucHVzaChjaGlsZClcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDaGlsZChwcm9qLCBjaGlsZDogdGFzaykge1xuICAgIHByb2ouY2hpbGRyZW4uc3BsaWNlKHByb2ouY2hpbGRyZW4uaW5kZXhPZihjaGlsZCksIDEpXG59XG5leHBvcnQgZnVuY3Rpb24gc2V0Tm90ZShwcm9qLCBuZXdOb3RlKSB7XG4gICAgcHJvai5ub3RlID0gbmV3Tm90ZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRhZyhwcm9qLCB0YWc6IHN0cmluZykge1xuICAgIHByb2oudGFncy5wdXNoKHRhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lVGFzayhwcm9qKXtcbiAgICAvLyBtYWtlIGEgc2hhbGxvdyBjb3B5IG9mIGEgdGFzaywgd2l0aCBubyBjaGlsZHJlbiBhbmQgdW5jb21wbGV0ZWRcbiAgICBjb25zdCBuZXdwcm9qOnRhc2sgPSB7Li4ucHJvan1cbiAgICBuZXdwcm9qLmNoaWxkcmVuPVtdXG4gICAgbmV3cHJvai5jb21wbGV0ZWQ9ZmFsc2VcbiAgICBuZXdwcm9qLnRhZ3M9bmV3cHJvai50YWdzLnNsaWNlKDApXG4gICAgcmV0dXJuIG5ld3Byb2pcbn1cblxuY2xhc3MgVGFzayBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyB0c2s6IHRhc2sgfSwgeyBleHBhbmRlZDogYm9vbGVhbiB9PntcbiAgICBzdGF0ZSA9IHsgZXhwYW5kZWQ6IHRydWUgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0c2sgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCBjaGlsZHJlbiwgbm90ZSwgdGFncyB9ID0gdHNrXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRhc2tcIj5cbiAgICAgICAgICAgIDxoMj57dGl0bGV9PC9oMj5cbiAgICAgICAgICAgIHsvKiA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPiAqL31cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkICYmIGNoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgICAgICA8cD57bm90ZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3QgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+IHtcbiAgICBzdGF0ZSA9IHsgcHVibGlzaGVkOiBmYWxzZSB9XG4gICAgYWRkVGFnKGV2KSB7XG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgY29uc3QgbmV3dGFnID0gZXYudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBldi50YXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkVGFnLCBuZXd0YWcgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaXNoKCkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnB1Ymxpc2gpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwdWJsaXNoZWQ6IHRydWUgfSlcbiAgICB9XG4gICAgaW1wb3J0KCl7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsuLi5hY3Rpb25zLmltcG9ydFByb2plY3QsY2hpbGRyZW46aW1wb3J0UHJvamVjdCh0aGlzLnByb3BzKX0pXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PiQoJ2FbaHJlZj1cIiNQcm9qZWN0XCJdJykuY2xpY2soKSwxMDApXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCBjaGlsZHJlbiwgbm90ZSwgdGFncyxtb2RlPVwibG9jYWxcIiB9ID0gdGhpcy5wcm9wcyBhcyBhbnlcbiAgICAgICAgY29uc3QgeyBwdWJsaXNoZWQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicHJvamVjdCB0YXNrXCI+XG4gICAgICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XG4gICAgICAgICAgICA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuICAgICAgICAgICAge21vZGUuaW5jbHVkZXMoXCJsb2NhbFwiKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT1cInByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnB1Ymxpc2goKX0gZGlzYWJsZWQ9e3B1Ymxpc2hlZH0+e3B1Ymxpc2hlZCA/IFwiRG9uZSDinJRcIiA6IFwiUHVibGlzaCDirIZcIn08L2J1dHRvbj59XG4gICAgICAgICAgICB7bW9kZS5pbmNsdWRlcyhcImxvY2FsXCIpICYmIDxidXR0b24+RG93bmxvYWQg4qyHPC9idXR0b24+fVxuICAgICAgICAgICAge21vZGUuaW5jbHVkZXMoXCJvbmxpbmVcIikgJiYgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcmltYXJ5XCIgb25DbGljaz17KCk9PnRoaXMuaW1wb3J0KCl9PkltcG9ydCDirIc8L2J1dHRvbj59XG4gICAgICAgICAgICB7dGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmV3dGFnXCIgcGxhY2Vob2xkZXI9XCJuZXcgdGFnXCIgb25LZXlVcD17KGV2KSA9PiB0aGlzLmFkZFRhZyhldil9IC8+XG4gICAgICAgICAgICA8cD57bm90ZX08L3A+XG4gICAgICAgICAgICB7Y2hpbGRyZW4ubWFwKGNoaWxkID0+IDxUYXNrIHRzaz17Y2hpbGR9IGtleT17Y2hpbGQudGl0bGV9IC8+KX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3ZlcnZpZXcgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCB0YXNrPntcbiAgICBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdFxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0KVxuICAgICAgICB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8UHJvamVjdCB7Li4udGhpcy5zdGF0ZX0gLz5cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRQcm9qZWN0KHByb2plY3Qpe1xuICAgIC8vIGZsYXR0ZW4gYSB3aG9sZSBwcm9qZWN0IGFuZCBtYXJrIGVhY2ggY2hpbGQgYXMgaW5jb21wbGV0ZVxuICAgIGNvbnN0IGNoaWxkcmVuPVtdXG4gICAgdHJhdmVyc2UocHJvamVjdC5jaGlsZHJlbixjaGlsZHJlbilcbiAgICByZXR1cm4gY2hpbGRyZW5cbn1cblxuZnVuY3Rpb24gdHJhdmVyc2UoY2hpbGRyZW4sdGFyZ2V0KXtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkPT57XG4gICAgICAgIHRhcmdldC5wdXNoKGNsb25lVGFzayhjaGlsZCkpXG4gICAgICAgIHRyYXZlcnNlKGNoaWxkLmNoaWxkcmVuLHRhcmdldClcbiAgICB9KVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0dyYXBoLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL0RhdGFmbG93Jztcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIFRhZyh7IHRhZyB9OiB7IHRhZzogc3RyaW5nIH0pIHtcbiAgICBjb25zdCBteXRhZ3M6IGFueSB8IHN0cmluZ1tdID0gc3RvcmUuZ2V0U3RhdGUoKS5jdXJyZW50QXV0aG9yLnRhZ3NcbiAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtcInRhZ1wiICsgKG15dGFncy5pbmNsdWRlcyh0YWcpID9cIiBob3RcIjpcIlwiKX0+e3RhZ308L3NwYW4+XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVGFnLnRzeCIsIlxuZXhwb3J0IGZ1bmN0aW9uICQoc2VsZWN0b3IpIHtcbiAgICB2YXIgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID09PSAxKSA/IHJlc3VsdFswXSA6IHJlc3VsdFxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzLyQudHMiLCJpbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi9ncmFwaCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnkge1xuICAgIGtleTogc3RyaW5nLFxuICAgIG1hdGNoZXI6IFJlZ0V4cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoVG9wKEtCOiB0YXNrW10sIHF1ZXJ5OiBRdWVyeSkge1xuICAgIC8vIHB1dCB0b2dldGhlciBhIGxpc3Qgb2YgcmVsZXZhbnQgcHJvamVjdHNcbiAgICByZXR1cm4gS0IuZmlsdGVyKHByb2ogPT4gc2VhcmNoT25lKHByb2osIHF1ZXJ5KSlcbn1cblxuZnVuY3Rpb24gc2VhcmNoT25lKHRhc2s6IHRhc2ssIHF1ZXJ5KSB7XG4gICAgLy8gZmluZCBpbiBvbmUgcHJvamVjdCBhbmQgYWxsIGl0cyBjaGlsZHJlbiBpZiBpdCBleGlzdFxuICAgIGNvbnN0IHsga2V5LCBtYXRjaGVyIH0gPSBxdWVyeVxuICAgIGlmICh0YXNrW2tleV0ubWF0Y2gobWF0Y2hlcikpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGFzay5jaGlsZHJlbi5zb21lKGNoaWxkID0+IHNlYXJjaE9uZShjaGlsZCwgcXVlcnkpKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHF1ZXJ5c3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5c3RyaW5nLnNwbGl0KCcmJylcbiAgICAgICAgICAgIC5tYXAocXJ5ID0+IHFyeS5zcGxpdCgnPScpKVxuICAgICAgICAgICAgLm1hcChxID0+ICh7XG4gICAgICAgICAgICAgICAga2V5OiBxWzBdLnRyaW0oKSxcbiAgICAgICAgICAgICAgICBtYXRjaGVyOiBuZXcgUmVnRXhwKHFbMV0udHJpbSgpKVxuICAgICAgICAgICAgfSkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gW3sga2V5OiBcInRpdGxlXCIsIG1hdGNoZXI6IG5ldyBSZWdFeHAocXVlcnlzdHJpbmcpIH1dXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL3NlYXJjaGVyLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IHsgJCB9IGZyb20gJy4vJCdcbmltcG9ydCBLQiBmcm9tIFwiLi9LQlwiXG5pbXBvcnQgVG9kbyBmcm9tICcuL1RvZG8nXG5pbXBvcnQgT3Bwb3J0dW5pdHkgZnJvbSAnLi9PcHBvcnR1bml0eSdcbmltcG9ydCB7IE92ZXJ2aWV3IH0gZnJvbSAnLi9HcmFwaCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gXCIuL0F1dGhvclwiO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tIFwiLi9EYXRhZmxvd1wiO1xuXG5jb25zdCBhdXRob3IgPSBzdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3IubmFtZVxuY2xhc3MgQXBwIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGl0ZW1zOiB7IFthbnk6IHN0cmluZ106IGFueSB9IH0sIGFueT4ge1xuICAgIC8vIGRlZmF1bHQgcmVuZGVyIHRoZSBuZXdzIHBhZ2VcbiAgICBzdGF0ZSA9IHsgUGFnZTogdGhpcy5wcm9wcy5pdGVtcy5Qcm9qZWN0LCBjdXJyZW50bGluazogXCJQcm9qZWN0XCIgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IFBhZ2UsIGN1cnJlbnRsaW5rIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuXG4gICAgICAgICAgICAgICAge09iamVjdC5rZXlzKGl0ZW1zKS5tYXAobmFtZSA9PlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtcIiNcIiArIG5hbWV9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBQYWdlOiBpdGVtc1tuYW1lXSwgY3VycmVudGxpbms6IG5hbWUgfSl9IGtleT17bmFtZX0gY2xhc3NOYW1lPXtjdXJyZW50bGluayA9PT0gbmFtZSA/IFwiY3VycmVudFwiIDogXCJcIn0+e25hbWV9PC9hPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDxtYWluPlxuICAgICAgICAgICAgICAgIDxQYWdlIC8+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxucmVuZGVyKDxBcHAgaXRlbXM9e3sgUHJvamVjdDogVG9kbywgT3ZlcnZpZXcsIEV4cGxvcmU6IEtCLCBDb25uZWN0OiBPcHBvcnR1bml0eSB9fSAvPiwgJCgnI2FwcCcpKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL2luZGV4LnRzeCIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3RET007XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdERPTVwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBhY3Rpb25zLCBzdG9yZSB9IGZyb20gXCIuL0RhdGFmbG93XCJcbmltcG9ydCB7IHRhc2sgfSBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9HcmFwaCdcbmltcG9ydCB7IHNlYXJjaFRvcCwgUXVlcnksIHBhcnNlIH0gZnJvbSAnLi9zZWFyY2hlcidcbi8vIFRvZG9cbi8vIFNob3cgR3JhcGhcbi8vIGZvcm1hdCBvZiB0aGUgYSBuZXdzIGNvbnRlbnRcbi8vIHRhZ3NcblxuZXhwb3J0IGNsYXNzIE5ld3MgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHRhc2ssIHsgZXhwYW5kOiBib29sZWFuIH0+e1xuICAgIC8vIEEgbmV3cywgbWF5IGV4cGFuZCBpZiBuZWNlc3NhcnlcbiAgICBzdGF0ZSA9IHsgZXhwYW5kOiBmYWxzZSB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIHRhZ3MsIGNoaWxkcmVuLCBub3RlIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgZXhwYW5kIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17ZXhwYW5kID8gXCJuZXdzZGV0YWlsXCIgOiBcIm5ld3NicmllZlwifSBvbkNsaWNrPXsoKSA9PiB0aGlzLm1heWJlRXhwYW5kKCFleHBhbmQpfT5cbiAgICAgICAgICAgIHshZXhwYW5kICYmIDxoMz57dGl0bGV9PC9oMz59XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPn1cbiAgICAgICAgICAgIHshZXhwYW5kICYmIHRhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgICAgICAgICAgeyFleHBhbmQgJiYgPHA+e25vdGV9PC9wPn1cbiAgICAgICAgICAgIHtleHBhbmQgJiYgPFByb2plY3Qgey4uLnRoaXMucHJvcHN9IG1vZGU9XCJvbmxpbmVcIiAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIG1heWJlRXhwYW5kKHJlYWxseSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kOiByZWFsbHkgfSlcbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIENvbXBvbmVudDx7IHByb2plY3RzOiB0YXNrW10sIHN3aXRjaE1vZGU6IEZ1bmN0aW9uIH0sIHsgcmVzdWx0czogdGFza1tdIH0+e1xuICAgIHN0YXRlID0geyByZXN1bHRzOiBbXSB9XG4gICAgcmVhbFRpbWVSZXN1bHQoZXYpIHtcbiAgICAgICAgY29uc3QgY3JpdGVyaWEgPSBldi50YXJnZXQudmFsdWVcbiAgICAgICAgaWYoY3JpdGVyaWE9PT1cIlwiKXtcbiAgICAgICAgICAgIHRoaXMuc3RvcFNlYXJjaCgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc3QgcXVlcmllcyA9IHBhcnNlKGNyaXRlcmlhKVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcnNlZCcsIHF1ZXJpZXMpXG4gICAgICAgICAgICBpZiAocXVlcmllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogcXVlcmllcy5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hUb3AocHJldiwgY3VycilcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5wcm9qZWN0cylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0U2VhcmNoKCkge1xuICAgICAgICB0aGlzLnByb3BzLnN3aXRjaE1vZGUodHJ1ZSlcbiAgICB9XG4gICAgc3RvcFNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zd2l0Y2hNb2RlKGZhbHNlKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcmVzdWx0czogW10gfSlcbiAgICB9XG4gICAgbWF5YmVTdG9wU2VhcmNoKGV2KXtcbiAgICAgICAgaWYoZXYudGFyZ2V0LnZhbHVlPT09XCJcIil7XG4gICAgICAgICAgICB0aGlzLnN0b3BTZWFyY2goKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyByZXN1bHRzIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hiYXJcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImZpZWxkMT1SZWdFeHBcXCZmaWVsZDI9UmVnRXhwLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17ZXYgPT4gdGhpcy5yZWFsVGltZVJlc3VsdChldil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc3RhcnRTZWFyY2goKX0gXG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17ZXY9PnRoaXMubWF5YmVTdG9wU2VhcmNoKGV2KX0vPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly93d3cucmJjcm95YWxiYW5rLmNvbS9kdmwvdjAuMS9hc3NldHMvaW1hZ2VzL3VpL3VpLXNlYXJjaC10aGluLWJsdWUuc3ZnXCIgYWx0PVwiU2VhcmNoXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAge3Jlc3VsdHMubWFwKChyZXN1bHQsIGkpID0+IDxOZXdzIHsuLi5yZXN1bHR9IGtleT17aX0gLz4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS0IgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+e1xuICAgIHN0YXRlID0geyBwcm9qZWN0czogc3RvcmUuZ2V0U3RhdGUoKS5rbm93bGVkZ2ViYXNlLnNsaWNlKDAsIDEwKSwgc2VhcmNoaW5nOiBmYWxzZSB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2plY3RzOiBzdG9yZS5nZXRTdGF0ZSgpLmtub3dsZWRnZWJhc2Uuc2xpY2UoMCwgMTApIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHByb2plY3RzLCBzZWFyY2hpbmcgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibmV3c1wiPlxuICAgICAgICAgICAgPGgxPldoYXQncyB1cDwvaDE+XG4gICAgICAgICAgICA8U2VhcmNoIHByb2plY3RzPXtwcm9qZWN0c30gc3dpdGNoTW9kZT17KHNlYXJjaGluZykgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZyB9KX0gLz5cbiAgICAgICAgICAgIHshc2VhcmNoaW5nICYmIDxkaXY+XG4gICAgICAgICAgICAgICAge3Byb2plY3RzLm1hcCgoaXRlbSwgaSkgPT4gPE5ld3Mgey4uLml0ZW19IGtleT17aX0gLz4pfVxuICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvS0IudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWR1eDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgY2hpbGRyZW46IGFueSwgZXhpdDogRnVuY3Rpb24gfSwgYW55PntcbiAgICBiZ0NsaWNrKGV2KSB7XG4gICAgICAgIC8vIGV2LnRhcmdldC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiXG4gICAgICAgIHRoaXMucHJvcHMuZXhpdCgpXG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpICAgICAgICBcbiAgICB9XG4gICAgaW5zaWRlQ2xpY2soZXYpIHtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsYmdcIiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuYmdDbGljayhldil9IG9uU2Nyb2xsPXtldj0+ZXYuc3RvcFByb3BhZ2F0aW9uKCl9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldikgPT4gdGhpcy5pbnNpZGVDbGljayhldil9PlxuICAgICAgICAgICAgICAgIHsuLi5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2RpdiA+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL01vZGFsLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IHRhc2ssIG5ld1Byb2plY3QgfSBmcm9tICcuL2dyYXBoJ1xuaW1wb3J0IHsgc3RvcmUsIGFjdGlvbnMgfSBmcm9tICcuL0RhdGFmbG93J1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuL0VkaXRhYmxlJztcblxuY2xhc3MgVG9kb2l0ZW0gZXh0ZW5kcyBDb21wb25lbnQ8eyBpdGVtOiB0YXNrIH0sIGFueT57XG4gICAgc3RhdGUgPSB7IHN0YXR1czogXCJcIiB9XG4gICAgc3VibWl0RWRpdChuZXduYW1lKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5yZW5hbWVJdGVtLCBvbGRuYW1lOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIG5ld25hbWUgfSlcbiAgICB9XG4gICAgb25DaGVjayhldikge1xuICAgICAgICBjb25zb2xlLmxvZyhldi50YXJnZXQuY2hlY2tlZCwgJ2NoZWNrZWQnKVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuY2hlY2tJdGVtLCB0aXRsZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBkb25lOiBldi50YXJnZXQuY2hlY2tlZCB9KVxuICAgIH1cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzdGF0dXM6IFwiZmFkaW5nXCIgfSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuZGVsZXRlSXRlbSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSB9KSwgMzAwKVxuXG4gICAgfVxuICAgIHBpY2t1cChldikge1xuICAgICAgICBjb25zb2xlLmxvZygncGlja2VkIHVwJylcbiAgICAgICAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIHRoaXMucHJvcHMuaXRlbS50aXRsZSk7XG4gICAgICAgIGV2LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhZmxvYXQnKVxuICAgIH1cbiAgICByZXN0b3JlaW5wbGFjZShldikge1xuICAgICAgICBldi50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYWZsb2F0JylcbiAgICB9XG4gICAgb3Zlcihldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBkcm9wKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5zdWJJdGVtLCBjaGlsZDogdGl0bGUsIHBhcmVudDogdGhpcy5wcm9wcy5pdGVtLnRpdGxlIH0pXG4gICAgfVxuICAgIGFkZE5vdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBwcm9tcHQoXCJXaGF0IGlzIHlvdXIgbm90ZT9cIiwgdGhpcy5wcm9wcy5pdGVtLm5vdGUpXG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkTm90ZSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgbm90ZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHRvdWNoc3RhcnQoZXYpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RvdWhzdGFydCcsZXYpXG4gICAgICAgIC8vIGV2LnBlcnNpc3QoKVxuICAgICAgICBldi50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWZsb2F0JykgICAgICAgIFxuICAgIH1cbiAgICB0b3VjaG1vdmUoZXYpe1xuICAgICAgICBjb25zb2xlLmxvZygnbW92aW5nJyxldilcbiAgICAgICAgZXYucGVyc2lzdCgpXG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBldi50b3VjaGVzWzBdXG4gICAgICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uKVxuICAgICAgICBldi50YXJnZXQuc3R5bGUubGVmdCA9IGxvY2F0aW9uLnBhZ2VYK1wicHhcIjtcbiAgICAgICAgZXYudGFyZ2V0LnN0eWxlLnRvcCA9IGxvY2F0aW9uLnBhZ2VZK1wicHhcIjtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW0gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW0gXCIgKyAoaXRlbS5jb21wbGV0ZWQgPyBcImNvbXBsZXRlZFwiIDogXCJcIikgKyBzdGF0dXN9XG4gICAgICAgICAgICBvbkRyYWdPdmVyPXtldiA9PiB0aGlzLm92ZXIoZXYpfVxuICAgICAgICAgICAgb25Ecm9wPXsoZXYpID0+IHRoaXMuZHJvcChldil9PlxuICAgICAgICAgICAge2l0ZW0uY29tcGxldGVkICYmIDxpbWcgY2xhc3NOYW1lPVwiZHJhZ2dlclwiIHNyYz1cImh0dHBzOi8vY2RuNC5pY29uZmluZGVyLmNvbS9kYXRhL2ljb25zL3dpcmVjb25zLWZyZWUtdmVjdG9yLWljb25zLzMyL21lbnUtYWx0LTI1Ni5wbmdcIlxuICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXYpID0+IHRoaXMucGlja3VwKGV2KX1cbiAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9e2V2ID0+IHRoaXMucmVzdG9yZWlucGxhY2UoZXYpfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17ZXYgPT4gdGhpcy50b3VjaHN0YXJ0KGV2KX1cbiAgICAgICAgICAgICAgICBvblRvdWNoTW92ZUNhcHR1cmU9e2V2PT50aGlzLnRvdWNobW92ZShldil9XG4gICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17ZXY9PnRoaXMucmVzdG9yZWlucGxhY2UoZXYpfVxuICAgICAgICAgICAgPjwvaW1nPn1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPXtpdGVtLnRpdGxlfSBjaGVja2VkPXtpdGVtLmNvbXBsZXRlZH0gb25DbGljaz17ZXYgPT4gdGhpcy5vbkNoZWNrKGV2KX0gLz5cbiAgICAgICAgICAgIDxFZGl0YWJsZSBzYXZlPXt0eHQgPT4gdGhpcy5zdWJtaXRFZGl0KHR4dCl9PntpdGVtLnRpdGxlfTwvRWRpdGFibGU+XG4gICAgICAgICAgICA8aSBvbkNsaWNrPXsoKSA9PiB0aGlzLmFkZE5vdGUoKX0+8J+ThDwvaT5cbiAgICAgICAgICAgIDxpIG9uQ2xpY2s9eygpID0+IHRoaXMucmVtb3ZlKCl9PvCfl5E8L2k+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgVG9kb0xpc3QgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+IHtcbiAgICBzdGF0ZSA9IHsgY2hpbGRyZW46IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdC5jaGlsZHJlbiB9XG4gICAgbmV3dGl0bGUgPSBcIlwiXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGlsZHJlbjogc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0LmNoaWxkcmVuIH0pXG4gICAgICAgIClcbiAgICB9XG5cbiAgICB0eXBpbmdOZXdJdGVtKGV2KSB7XG4gICAgICAgIGNvbnN0IG5ld3RpdGxlID0gZXYudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxuICAgICAgICB0aGlzLm5ld3RpdGxlID0gbmV3dGl0bGVcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3R5cGluZycsIG5ld3RpdGxlKVxuICAgIH1cbiAgICBhZGRJdGVtKG5ld3RpdGxlID0gdGhpcy5uZXd0aXRsZSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkSXRlbSwgdGl0bGU6IG5ld3RpdGxlIH0pXG4gICAgfVxuICAgIGVudGVyKGV2KSB7XG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5hZGRJdGVtKClcbiAgICAgICAgICAgIGV2LnRhcmdldC52YWx1ZSA9IFwiXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRkaXRlbVwiIHR5cGU9XCJ0ZXh0XCIgb25JbnB1dD17KGV2KSA9PiB0aGlzLnR5cGluZ05ld0l0ZW0oZXYpfSBvbktleVVwPXtldiA9PiB0aGlzLmVudGVyKGV2KX0gcGxhY2Vob2xkZXI9XCJBZGQgYW4gaXRlbVwiIC8+XG4gICAgICAgICAgICB7Y2hpbGRyZW4ubWFwKGl0ZW0gPT4gPFRvZG9pdGVtIGl0ZW09e2l0ZW19IGtleT17aXRlbS50aXRsZX0gLz4pfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSwgdGFzaz57XG4gICAgc3RhdGUgPSB7IC4uLnN0b3JlLmdldFN0YXRlKCkucHJvamVjdCB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpKVxuICAgIH1cbiAgICBwcm9qZWN0Tm90ZSgpIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IHByb21wdChcIldoYXQgaXMgeW91ciBub3RlP1wiLCB0aGlzLnN0YXRlLm5vdGUpXG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkUHJvak5vdGVzLCBub3RlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCB0aXRsZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b2RvbGlzdHNcIj5cbiAgICAgICAgICAgIDxpIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvamVjdE5vdGUoKX0+8J+ThDwvaT5cbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxUb2RvTGlzdCBjaGlsZHJlbj17Y2hpbGRyZW59IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9Ub2RvLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZnVuY3Rpb24gRWRpdGFibGUoeyBzYXZlLCBjaGlsZHJlbiB9KSB7XG4gICAgZnVuY3Rpb24gaW5wdXQoZXYpIHtcbiAgICAgICAgLy8gZW50ZXIgdG8gc3VibWl0LCBvdGhlcndpc2UganVzdCBkbyBub3RoaW5nXG4gICAgICAgIGNvbnN0IG5ld25hbWUgPSBldi50YXJnZXQudGV4dENvbnRlbnQucmVwbGFjZSgvXFxuL2csIFwiXCIpXG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIHNhdmUobmV3bmFtZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld25hbWUsXCJzYXZlZFwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiA8cCBvbktleURvd249e2lucHV0fT57Y2hpbGRyZW59PC9wPlxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0VkaXRhYmxlLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRGV0YWlsQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL0RhdGFmbG93JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3Bwb3J0dW5pdHkgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSxhbnk+e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJvcHBvcnR1bml0aWVzXCI+XG4gICAgICAgICAgICA8aDE+T3Bwb3J0dW5pdGllczwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludGVyZXN0aW5nY29udHJpYnV0b3JzXCI+XG4gICAgICAgICAgICAgICAgPGgyPkNvbnRyaWJ1dG9ycyB5b3UgbWlnaHQgYmUgaW50ZXJlc3RlZCBpbjwvaDI+XG4gICAgICAgICAgICAgICAge3N0b3JlLmdldFN0YXRlKCkuaW50ZXJlc3RpbmdBdXRob3JzLm1hcCgoe25hbWV9KT0+PERldGFpbEF1dGhvciBhdXRob3I9e25hbWV9IGtleT17bmFtZX0vPil9XG4gICAgICAgICAgICAgICAgPHA+Q29ubmVjdCB3aXRoIHJlY29tbWVuZGF0aW9uIGFsZ29yaXRobSBvZiAxMGsgQ29mZmVlPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMj5VcGNvbWluZyBwcm9qZWN0cyB0aGF0IGRlbWFuZCB5b3VyIHNraWxsczwvaDI+XG4gICAgICAgICAgICAgICAgPHA+Q29ubmVjdCB3aXRoIFJCQyBpbnRlcm5hbCBqb2IgcG9zdGluZzwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvT3Bwb3J0dW5pdHkudHN4Il0sInNvdXJjZVJvb3QiOiIifQ==