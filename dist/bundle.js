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
    project: Graph_1.newProject("Make Green Tea Frappacino", "Lingkai Shen"),
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
    render() {
        const { results } = this.state;
        return React.createElement("div", { className: "search" },
            React.createElement("div", { className: "searchbar" },
                React.createElement("input", { type: "text", placeholder: "field1=RegExp\&field2=RegExp...", onInput: ev => this.realTimeResult(ev), onClick: () => this.startSearch() }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWYxYmY5MTk2YzY4ZjYzYzRmYmIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL0dyYXBoLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9UYWcudHN4Iiwid2VicGFjazovLy8uL3RzLyQudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvc2VhcmNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vdHMvS0IudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL0VkaXRhYmxlLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9PcHBvcnR1bml0eS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLHVCOzs7Ozs7Ozs7QUNDQSx3Q0FBbUM7QUFDbkMsdUNBQW9HO0FB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LEVBQUU7WUFDbkIsRUFBRSxDQUFDLGVBQWUsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLDJCQUFHLFNBQVMsRUFBRSxLQUFLLElBQUcsUUFBUSxDQUFLO0FBQzlDLENBQUM7QUFaRCw0QkFZQzs7Ozs7Ozs7OztBQ2ZELHFDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMsd0NBQXdDO0FBQ3hDLDBDQUFtQztBQUVuQyxpQkFBaUMsU0FBUSxxQkFBc0I7SUFDM0QsTUFBTTtRQUNGLE1BQU0sQ0FBQyw2QkFBSyxTQUFTLEVBQUMsZUFBZTtZQUNqQyxnREFBc0I7WUFDdEIsNkJBQUssU0FBUyxFQUFDLHlCQUF5QjtnQkFDcEMsMEVBQWdEO2dCQUMvQyxnQkFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUcsb0JBQUMscUJBQVksSUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDNUYscUZBQTBELENBQ3hEO1lBQ047Z0JBQ0ksNEVBQWtEO2dCQUNsRCx1RUFBNEMsQ0FDMUMsQ0FDSjtJQUNWLENBQUM7Q0FDSjtBQWZELDhCQWVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVmMWJmOTE5NmM2OGY2M2M0ZmJiIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IG5ld1Byb2plY3QsIHRhc2ssIGNvbXBsZXRlLCBjYW5jZWwsIHJlbW92ZUNoaWxkLCBhZGRDaGlsZCwgYWRkVGFnLCBzZXROb3RlIH0gZnJvbSAnLi9HcmFwaCdcblxuaW50ZXJmYWNlIGNvbnRyaWJ1dGVyIHtcbiAgICB0YWdzOiBzdHJpbmdbXSxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgU3RvcmVTdGF0ZSB7XG4gICAgcHJvamVjdD86IHRhc2ssXG4gICAgY3VycmVudEF1dGhvcj86IGNvbnRyaWJ1dGVyLFxuICAgIGtub3dsZWRnZWJhc2U/OiB0YXNrW10sXG4gICAgaW50ZXJlc3RpbmdBdXRob3JzPzogY29udHJpYnV0ZXJbXVxufVxuXG5jb25zdCBpbml0aWFsU3RhdGU6IFN0b3JlU3RhdGUgPSB7XG4gICAgcHJvamVjdDogbmV3UHJvamVjdChcIk1ha2UgR3JlZW4gVGVhIEZyYXBwYWNpbm9cIiwgXCJMaW5na2FpIFNoZW5cIiksXG4gICAgY3VycmVudEF1dGhvcjoge1xuICAgICAgICB0YWdzOiBbJ2Nvb2snLCAncmVhY3QnXSxcbiAgICAgICAgZW1haWw6IFwic2xrNDlAbGl2ZS5jblwiLFxuICAgICAgICBuYW1lOiBcIkxpbmdrYWkgU2hlblwiXG4gICAgfSxcbiAgICBrbm93bGVkZ2ViYXNlOiBbXG4gICAgICAgIHsgXCJ0aXRsZVwiOiBcIk1ha2Ugd2FmZmxlXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW3sgXCJ0aXRsZVwiOiBcInBvdXIgb250byB0aGUgd2FmZmxlIGlyb24sIHdhaXQgMm1pblwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFt7IFwidGl0bGVcIjogXCJtaXggZmxvdXIsIGJha2luZyBwb3dkZXIsIGVnZ3MgZXRjXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW10sIFwibm90ZVwiOiBcIlwiLCBcImNvbXBsZXRlZFwiOiB0cnVlLCBcInRhZ3NcIjogW10gfSwgeyBcInRpdGxlXCI6IFwid2hpcCBjcmVhbVwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFtdLCBcIm5vdGVcIjogXCJVc2UgYW4gZWxlY3Ryb25pYyB3aGlzayB0byB3aGlwIDM1JSBjcmVhbSB1bnRpbCBpdCBiZWNvbWVzIHB1ZmZ5XCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9XSwgXCJub3RlXCI6IFwiXCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9XSwgXCJub3RlXCI6IFwiTmVlZCBlbGVjdHJvbmljIHdoaXNrIGFuZCB3YWZmbGUgaXJvblwiLCBcImNvbXBsZXRlZFwiOiBmYWxzZSwgXCJ0YWdzXCI6IFtcImJyZWFrZmFzdFwiLCBcInJlYWN0XCJdIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidGl0bGVcIjogXCJIb3cgdG8gYnVpbGQgUmVCQ2lwZVwiLFxuICAgICAgICAgICAgXCJhdXRob3JcIjogXCJMaW5na2FpIFNoZW5cIixcbiAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcImdldCByZWFkeSBmb3IgZGVtb1wiLFxuICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiaW1wbGVtZW50IGNvbXBvbmVudHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiYnJlYWsgZG93biBjb21wb25lbnRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwic2V0dXAgZW52aXJvbm1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiTGluZ2thaSBTaGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJsZWFybiByZWR1eFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJ3ZWJwYWNrIHdpdGggaG90IHJlbG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJzYXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiTGluZ2thaSBTaGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcInJlYWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiTGluZ2thaSBTaGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJub3RlXCI6IFwiXCIsXG4gICAgICAgICAgICBcImNvbXBsZXRlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwidGFnc1wiOiBbXVxuICAgICAgICB9XG4gICAgXSxcbiAgICBpbnRlcmVzdGluZ0F1dGhvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdGFnczogWydjb29rJywgJ3JlYWN0J10sXG4gICAgICAgICAgICBlbWFpbDogXCJ0ZWFtQHJlbWkuY29tXCIsXG4gICAgICAgICAgICBuYW1lOiBcIlRlYW0gUmVtaVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhZ3M6IFsnY29vaycsICdkZXNpZ24nXSxcbiAgICAgICAgICAgIGVtYWlsOiBcImVtaWx5QHJiYy5jYVwiLFxuICAgICAgICAgICAgbmFtZTogXCJFbWlseSBaaGFuZ1wiXG4gICAgICAgIH1cbiAgICBdXG59XG5cbmFkZENoaWxkKGluaXRpYWxTdGF0ZS5wcm9qZWN0LG5ld1Byb2plY3QoXCJNYXRjaGEgdGVhXCIsXCJMaW5na2FpIFNoZW5cIikpXG5cblxuZnVuY3Rpb24gcmVkdWNlcihwcmV2U3RhdGU6IFN0b3JlU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogeyBbYW55OiBzdHJpbmddOiBhbnkgfSkge1xuICAgIGNvbnN0IHN0YXRlOiBTdG9yZVN0YXRlID0gcHJldlN0YXRlXG4gICAgY29uc3QgcHJvamVjdCA9IHN0YXRlLnByb2plY3RcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJhZGRJdGVtXCI6IHtcbiAgICAgICAgICAgIGFkZENoaWxkKHByb2plY3QsIG5ld1Byb2plY3QoYWN0aW9uLnRpdGxlLCBwcm9qZWN0LmF1dGhvcikpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwicmVuYW1lSXRlbVwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IG9sZG5hbWUsIG5ld25hbWUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IG9sZG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQudGl0bGUgPSBuZXduYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJjaGVja0l0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSwgZG9uZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIGNvbXBsZXRlKGNoaWxkKVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGNhbmNlbChjaGlsZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImRlbGV0ZUl0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhhdCBjaGlsZFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBjaGlsZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZW1vdmVDaGlsZChwcm9qZWN0LCB0YXJnZXQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwic3ViSXRlbVwiOiB7XG4gICAgICAgICAgICAvLyBtYWtlIGFuIGl0ZW0gYSBkZXBlbmRlbmN5IG9mIGFub3RoZXJcbiAgICAgICAgICAgIGNvbnN0IHsgcGFyZW50LCBjaGlsZCB9ID0gYWN0aW9uXG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBjaGlsZCkgdGhyb3cgXCJjYW5ub3QgYmUgdGhlIHNhbWUgaXRlbVwiXG4gICAgICAgICAgICBsZXQgcGFyZW50aXRlbSwgY2hpbGRpdGVtO1xuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2gudGl0bGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRpdGVtID0gY2hcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoLnRpdGxlID09PSBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZGl0ZW0gPSBjaFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhZGRDaGlsZChwYXJlbnRpdGVtLCBjaGlsZGl0ZW0pXG4gICAgICAgICAgICByZW1vdmVDaGlsZChwcm9qZWN0LCBjaGlsZGl0ZW0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkVGFnXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3dGFnIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIGFkZFRhZyhwcm9qZWN0LCBuZXd0YWcpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwicHVibGlzaFwiOiB7XG4gICAgICAgICAgICBzdGF0ZS5rbm93bGVkZ2ViYXNlLnB1c2goc3RhdGUucHJvamVjdClcbiAgICAgICAgICAgIC8vIGFkZCB0aGF0IHRhZyB0byB0aGUgYXV0aG9yIGFzIHdlbGxcbiAgICAgICAgICAgIGNvbnN0IGF1dGhvciA9IHN0YXRlLmN1cnJlbnRBdXRob3JcbiAgICAgICAgICAgIGF1dGhvci50YWdzLnB1c2goLi4ucHJvamVjdC50YWdzKVxuICAgICAgICAgICAgYXV0aG9yLnRhZ3MgPSBBcnJheS5mcm9tKG5ldyBTZXQoYXV0aG9yLnRhZ3MpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZFByb2pOb3Rlc1wiOiB7XG4gICAgICAgICAgICBzZXROb3RlKHByb2plY3QsIGFjdGlvbi5ub3RlKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZE5vdGVcIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSwgbm90ZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2ggPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Tm90ZShjaCwgbm90ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImltcG9ydFByb2plY3RcIjoge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gYWN0aW9uXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBhZGRDaGlsZChzdGF0ZS5wcm9qZWN0LCBjaGlsZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gICAgXCJpbXBvcnRQcm9qZWN0XCI6IHtcbiAgICAgICAgdHlwZTogXCJpbXBvcnRQcm9qZWN0XCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgIH0sXG4gICAgXCJhZGRJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJhZGRJdGVtXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiXG4gICAgfSxcbiAgICBcInJlbmFtZUl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcInJlbmFtZUl0ZW1cIlxuICAgIH0sXG4gICAgXCJjaGVja0l0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImNoZWNrSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgZG9uZTogZmFsc2VcbiAgICB9LFxuICAgIFwiZGVsZXRlSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiZGVsZXRlSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIlxuICAgIH0sXG4gICAgXCJzdWJJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJzdWJJdGVtXCIsXG4gICAgICAgIHBhcmVudDogXCJcIixcbiAgICAgICAgY2hpbGQ6IFwiXCJcbiAgICB9LFxuICAgIFwiYWRkVGFnXCI6IHtcbiAgICAgICAgdHlwZTogXCJhZGRUYWdcIixcbiAgICAgICAgbmV3dGFnOiBcIlwiXG4gICAgfSxcbiAgICBcInB1Ymxpc2hcIjoge1xuICAgICAgICB0eXBlOiBcInB1Ymxpc2hcIixcbiAgICB9LFxuICAgIFwiYWRkUHJvak5vdGVzXCI6IHtcbiAgICAgICAgdHlwZTogXCJhZGRQcm9qTm90ZXNcIlxuICAgIH0sXG4gICAgXCJhZGROb3RlXCI6IHtcbiAgICAgICAgdHlwZTogXCJhZGROb3RlXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICBub3RlOiBcIlwiXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSkpXG5PYmplY3QuYXNzaWduKHdpbmRvdywgeyBhY3Rpb25zLCBzdG9yZSB9KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0RhdGFmbG93LnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCdcbmltcG9ydCB7IHNlYXJjaFRvcCB9IGZyb20gJy4vc2VhcmNoZXInO1xuLy8gcmVuZGVycyBhIG5pY2UgYmxvY2sgb2YgdGhlIGF1dGhvcidzIGluaXRpYWxzXG5leHBvcnQgZnVuY3Rpb24gRGV0YWlsQXV0aG9yKHsgYXV0aG9yIH0pIHtcbiAgICBjb25zdCB7IHRhZ3MsIGVtYWlsIH0gPSBbLi4uc3RvcmUuZ2V0U3RhdGUoKS5pbnRlcmVzdGluZ0F1dGhvcnMsIHN0b3JlLmdldFN0YXRlKCkuY3VycmVudEF1dGhvcl1cbiAgICAgICAgLmZpbHRlcigoeyBuYW1lIH0pID0+IG5hbWUgPT09IGF1dGhvcilbMF1cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRob3JkZXRhaWxcIj5cbiAgICAgICAgPGgxPnthdXRob3J9PC9oMT5cbiAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgICAgICA8YSBocmVmPXtcIm1haWx0bzpcIiArIGVtYWlsfSA+e2VtYWlsfTwvYT5cbiAgICAgICAgPGgyPkNvbnRyaWJ1dGlvbnM6PC9oMj5cbiAgICAgICAge2dldEF1dGhvclByb2plY3RzKGF1dGhvcikubWFwKHRpdGxlID0+IDxkaXYga2V5PXt0aXRsZX0+e3RpdGxlfTwvZGl2Pil9XG4gICAgPC9kaXY+XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRob3IgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgYXV0aG9yOiBzdHJpbmcgfSwgeyBkZXRhaWw6IGJvb2xlYW4gfT4ge1xuICAgIHN0YXRlID0geyBkZXRhaWw6IGZhbHNlIH1cbiAgICBzaG93RGV0YWlsKGV2KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkZXRhaWw6IHRydWUgfSlcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogZmFsc2UgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGF1dGhvciB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGRldGFpbCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wiYXV0aG9yXCJ9IG9uQ2xpY2s9e2V2ID0+IHRoaXMuc2hvd0RldGFpbChldil9PlxuICAgICAgICAgICAge2F1dGhvci50b1VwcGVyQ2FzZSgpLnNwbGl0KCcgJykubWFwKGF1ID0+IGF1WzBdKX1cbiAgICAgICAgICAgIHtkZXRhaWwgJiZcbiAgICAgICAgICAgICAgICA8TW9kYWwgZXhpdD17KCkgPT4gdGhpcy5oaWRlKCl9PlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsQXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuICAgICAgICAgICAgICAgIDwvTW9kYWw+XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0QXV0aG9yUHJvamVjdHMoYXV0aG9yKSB7XG4gICAgcmV0dXJuIHNlYXJjaFRvcChzdG9yZS5nZXRTdGF0ZSgpLmtub3dsZWRnZWJhc2UsIHtcbiAgICAgICAga2V5OiBcImF1dGhvclwiLFxuICAgICAgICBtYXRjaGVyOiBuZXcgUmVnRXhwKGF1dGhvcilcbiAgICB9KS5tYXAocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlKVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0F1dGhvci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcbmltcG9ydCB7ICQgfSBmcm9tICcuLyQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIHRhc2sge1xuICAgIFwidGl0bGVcIjogc3RyaW5nLFxuICAgIFwiYXV0aG9yXCI6IHN0cmluZyxcbiAgICBcImNvbXBsZXRlZFwiOiBib29sZWFuLFxuICAgIFwiY2hpbGRyZW5cIj86IHRhc2tbXSxcbiAgICBcIm5vdGVcIj86IHN0cmluZyxcbiAgICBcInRhZ3NcIj86IHN0cmluZ1tdXG59XG4vLyB1c2UgY29tcG9uZW50IG5lc3RpbmcgdG8gZ2V0IGEgZ3JhcGhcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1Byb2plY3QodGl0bGU6IHN0cmluZywgYXV0aG9yOiBzdHJpbmcpOiB0YXNrIHtcbiAgICBjb25zdCBQcm9qZWN0ID0ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIG5vdGU6IFwiXCIsXG4gICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgIHRhZ3M6IFtdXG4gICAgfVxuICAgIHJldHVybiBQcm9qZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV0ZShwcm9qKSB7XG4gICAgcHJvai5jb21wbGV0ZWQgPSB0cnVlXG59XG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHByb2opIHtcbiAgICBwcm9qLmNvbXBsZXRlZCA9IGZhbHNlXG59XG5leHBvcnQgZnVuY3Rpb24gc2V0aXRsZShwcm9qLCBuZXdUaXRsZSkge1xuICAgIHByb2oudGl0bGUgPSBuZXdUaXRsZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZENoaWxkKHByb2osIGNoaWxkOiB0YXNrKSB7XG4gICAgcHJvai5jaGlsZHJlbi5wdXNoKGNoaWxkKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNoaWxkKHByb2osIGNoaWxkOiB0YXNrKSB7XG4gICAgcHJvai5jaGlsZHJlbi5zcGxpY2UocHJvai5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSwgMSlcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXROb3RlKHByb2osIG5ld05vdGUpIHtcbiAgICBwcm9qLm5vdGUgPSBuZXdOb3RlXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkVGFnKHByb2osIHRhZzogc3RyaW5nKSB7XG4gICAgcHJvai50YWdzLnB1c2godGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVUYXNrKHByb2ope1xuICAgIC8vIG1ha2UgYSBzaGFsbG93IGNvcHkgb2YgYSB0YXNrLCB3aXRoIG5vIGNoaWxkcmVuIGFuZCB1bmNvbXBsZXRlZFxuICAgIGNvbnN0IG5ld3Byb2o6dGFzayA9IHsuLi5wcm9qfVxuICAgIG5ld3Byb2ouY2hpbGRyZW49W11cbiAgICBuZXdwcm9qLmNvbXBsZXRlZD1mYWxzZVxuICAgIG5ld3Byb2oudGFncz1uZXdwcm9qLnRhZ3Muc2xpY2UoMClcbiAgICByZXR1cm4gbmV3cHJvalxufVxuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IHRzazogdGFzayB9LCB7IGV4cGFuZGVkOiBib29sZWFuIH0+e1xuICAgIHN0YXRlID0geyBleHBhbmRlZDogdHJ1ZSB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRzayB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzIH0gPSB0c2tcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGFza1wiPlxuICAgICAgICAgICAgPGgyPnt0aXRsZX08L2gyPlxuICAgICAgICAgICAgey8qIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+ICovfVxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgJiYgY2hpbGRyZW4ubWFwKGNoaWxkID0+IDxUYXNrIHRzaz17Y2hpbGR9IGtleT17Y2hpbGQudGl0bGV9IC8+KX1cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCBleHRlbmRzIENvbXBvbmVudDxhbnksIGFueT4ge1xuICAgIHN0YXRlID0geyBwdWJsaXNoZWQ6IGZhbHNlIH1cbiAgICBhZGRUYWcoZXYpIHtcbiAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICBjb25zdCBuZXd0YWcgPSBldi50YXJnZXQudmFsdWVcbiAgICAgICAgICAgIGV2LnRhcmdldC52YWx1ZSA9IFwiXCJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5hZGRUYWcsIG5ld3RhZyB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1Ymxpc2goKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMucHVibGlzaClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHB1Ymxpc2hlZDogdHJ1ZSB9KVxuICAgIH1cbiAgICBpbXBvcnQoKXtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goey4uLmFjdGlvbnMuaW1wb3J0UHJvamVjdCxjaGlsZHJlbjppbXBvcnRQcm9qZWN0KHRoaXMucHJvcHMpfSlcbiAgICAgICAgc2V0VGltZW91dCgoKT0+JCgnYVtocmVmPVwiI1Byb2plY3RcIl0nKS5jbGljaygpLDEwMClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzLG1vZGU9XCJsb2NhbFwiIH0gPSB0aGlzLnByb3BzIGFzIGFueVxuICAgICAgICBjb25zdCB7IHB1Ymxpc2hlZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0IHRhc2tcIj5cbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG4gICAgICAgICAgICB7bW9kZS5pbmNsdWRlcyhcImxvY2FsXCIpICYmIDxidXR0b24gY2xhc3NOYW1lPVwicHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHRoaXMucHVibGlzaCgpfSBkaXNhYmxlZD17cHVibGlzaGVkfT57cHVibGlzaGVkID8gXCJEb25lIOKclFwiIDogXCJQdWJsaXNoIOKshlwifTwvYnV0dG9uPn1cbiAgICAgICAgICAgIHttb2RlLmluY2x1ZGVzKFwibG9jYWxcIikgJiYgPGJ1dHRvbj5Eb3dubG9hZCDirIc8L2J1dHRvbj59XG4gICAgICAgICAgICB7bW9kZS5pbmNsdWRlcyhcIm9ubGluZVwiKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT1cInByaW1hcnlcIiBvbkNsaWNrPXsoKT0+dGhpcy5pbXBvcnQoKX0+SW1wb3J0IOKshzwvYnV0dG9uPn1cbiAgICAgICAgICAgIHt0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuZXd0YWdcIiBwbGFjZWhvbGRlcj1cIm5ldyB0YWdcIiBvbktleVVwPXsoZXYpID0+IHRoaXMuYWRkVGFnKGV2KX0gLz5cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgICAgIHtjaGlsZHJlbi5tYXAoY2hpbGQgPT4gPFRhc2sgdHNrPXtjaGlsZH0ga2V5PXtjaGlsZC50aXRsZX0gLz4pfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdmVydmlldyBleHRlbmRzIENvbXBvbmVudDxhbnksIHRhc2s+e1xuICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxQcm9qZWN0IHsuLi50aGlzLnN0YXRlfSAvPlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFByb2plY3QocHJvamVjdCl7XG4gICAgLy8gZmxhdHRlbiBhIHdob2xlIHByb2plY3QgYW5kIG1hcmsgZWFjaCBjaGlsZCBhcyBpbmNvbXBsZXRlXG4gICAgY29uc3QgY2hpbGRyZW49W11cbiAgICB0cmF2ZXJzZShwcm9qZWN0LmNoaWxkcmVuLGNoaWxkcmVuKVxuICAgIHJldHVybiBjaGlsZHJlblxufVxuXG5mdW5jdGlvbiB0cmF2ZXJzZShjaGlsZHJlbix0YXJnZXQpe1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQ9PntcbiAgICAgICAgdGFyZ2V0LnB1c2goY2xvbmVUYXNrKGNoaWxkKSlcbiAgICAgICAgdHJhdmVyc2UoY2hpbGQuY2hpbGRyZW4sdGFyZ2V0KVxuICAgIH0pXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvR3JhcGgudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vRGF0YWZsb3cnO1xuLy8gcmVuZGVycyBhIG5pY2UgYmxvY2sgb2YgdGhlIGF1dGhvcidzIGluaXRpYWxzXG5leHBvcnQgZnVuY3Rpb24gVGFnKHsgdGFnIH06IHsgdGFnOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IG15dGFnczogYW55IHwgc3RyaW5nW10gPSBzdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3IudGFnc1xuICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e1widGFnXCIgKyAobXl0YWdzLmluY2x1ZGVzKHRhZykgP1wiIGhvdFwiOlwiXCIpfT57dGFnfTwvc3Bhbj5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9UYWcudHN4IiwiXG5leHBvcnQgZnVuY3Rpb24gJChzZWxlY3Rvcikge1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEpID8gcmVzdWx0WzBdIDogcmVzdWx0XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvJC50cyIsImltcG9ydCB7IHRhc2sgfSBmcm9tICcuL2dyYXBoJztcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gICAga2V5OiBzdHJpbmcsXG4gICAgbWF0Y2hlcjogUmVnRXhwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hUb3AoS0I6IHRhc2tbXSwgcXVlcnk6IFF1ZXJ5KSB7XG4gICAgLy8gcHV0IHRvZ2V0aGVyIGEgbGlzdCBvZiByZWxldmFudCBwcm9qZWN0c1xuICAgIHJldHVybiBLQi5maWx0ZXIocHJvaiA9PiBzZWFyY2hPbmUocHJvaiwgcXVlcnkpKVxufVxuXG5mdW5jdGlvbiBzZWFyY2hPbmUodGFzazogdGFzaywgcXVlcnkpIHtcbiAgICAvLyBmaW5kIGluIG9uZSBwcm9qZWN0IGFuZCBhbGwgaXRzIGNoaWxkcmVuIGlmIGl0IGV4aXN0XG4gICAgY29uc3QgeyBrZXksIG1hdGNoZXIgfSA9IHF1ZXJ5XG4gICAgaWYgKHRhc2tba2V5XS5tYXRjaChtYXRjaGVyKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0YXNrLmNoaWxkcmVuLnNvbWUoY2hpbGQgPT4gc2VhcmNoT25lKGNoaWxkLCBxdWVyeSkpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UocXVlcnlzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gcXVlcnlzdHJpbmcuc3BsaXQoJyYnKVxuICAgICAgICAgICAgLm1hcChxcnkgPT4gcXJ5LnNwbGl0KCc9JykpXG4gICAgICAgICAgICAubWFwKHEgPT4gKHtcbiAgICAgICAgICAgICAgICBrZXk6IHFbMF0udHJpbSgpLFxuICAgICAgICAgICAgICAgIG1hdGNoZXI6IG5ldyBSZWdFeHAocVsxXS50cmltKCkpXG4gICAgICAgICAgICB9KSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBbeyBrZXk6IFwidGl0bGVcIiwgbWF0Y2hlcjogbmV3IFJlZ0V4cChxdWVyeXN0cmluZykgfV1cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvc2VhcmNoZXIudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi8kJ1xuaW1wb3J0IEtCIGZyb20gXCIuL0tCXCJcbmltcG9ydCBUb2RvIGZyb20gJy4vVG9kbydcbmltcG9ydCBPcHBvcnR1bml0eSBmcm9tICcuL09wcG9ydHVuaXR5J1xuaW1wb3J0IHsgT3ZlcnZpZXcgfSBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSBcIi4vQXV0aG9yXCI7XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gXCIuL0RhdGFmbG93XCI7XG5cbmNvbnN0IGF1dGhvciA9IHN0b3JlLmdldFN0YXRlKCkuY3VycmVudEF1dGhvci5uYW1lXG5jbGFzcyBBcHAgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgaXRlbXM6IHsgW2FueTogc3RyaW5nXTogYW55IH0gfSwgYW55PiB7XG4gICAgLy8gZGVmYXVsdCByZW5kZXIgdGhlIG5ld3MgcGFnZVxuICAgIHN0YXRlID0geyBQYWdlOiB0aGlzLnByb3BzLml0ZW1zLlByb2plY3QsIGN1cnJlbnRsaW5rOiBcIlByb2plY3RcIiB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgUGFnZSwgY3VycmVudGxpbmsgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG5cbiAgICAgICAgICAgICAgICB7T2JqZWN0LmtleXMoaXRlbXMpLm1hcChuYW1lID0+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wiICsgbmFtZX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFBhZ2U6IGl0ZW1zW25hbWVdLCBjdXJyZW50bGluazogbmFtZSB9KX0ga2V5PXtuYW1lfSBjbGFzc05hbWU9e2N1cnJlbnRsaW5rID09PSBuYW1lID8gXCJjdXJyZW50XCIgOiBcIlwifT57bmFtZX08L2E+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPFBhZ2UgLz5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5yZW5kZXIoPEFwcCBpdGVtcz17eyBQcm9qZWN0OiBUb2RvLCBPdmVydmlldywgRXhwbG9yZTogS0IsIENvbm5lY3Q6IE9wcG9ydHVuaXR5IH19IC8+LCAkKCcjYXBwJykpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvaW5kZXgudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0RE9NXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGFjdGlvbnMsIHN0b3JlIH0gZnJvbSBcIi4vRGF0YWZsb3dcIlxuaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vR3JhcGgnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IHsgc2VhcmNoVG9wLCBRdWVyeSwgcGFyc2UgfSBmcm9tICcuL3NlYXJjaGVyJ1xuLy8gVG9kb1xuLy8gU2hvdyBHcmFwaFxuLy8gZm9ybWF0IG9mIHRoZSBhIG5ld3MgY29udGVudFxuLy8gdGFnc1xuXG5leHBvcnQgY2xhc3MgTmV3cyBleHRlbmRzIFB1cmVDb21wb25lbnQ8dGFzaywgeyBleHBhbmQ6IGJvb2xlYW4gfT57XG4gICAgLy8gQSBuZXdzLCBtYXkgZXhwYW5kIGlmIG5lY2Vzc2FyeVxuICAgIHN0YXRlID0geyBleHBhbmQ6IGZhbHNlIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGF1dGhvciwgdGFncywgY2hpbGRyZW4sIG5vdGUgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBleHBhbmQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtleHBhbmQgPyBcIm5ld3NkZXRhaWxcIiA6IFwibmV3c2JyaWVmXCJ9IG9uQ2xpY2s9eygpID0+IHRoaXMubWF5YmVFeHBhbmQoIWV4cGFuZCl9PlxuICAgICAgICAgICAgeyFleHBhbmQgJiYgPGgzPnt0aXRsZX08L2gzPn1cbiAgICAgICAgICAgIHshZXhwYW5kICYmIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+fVxuICAgICAgICAgICAgeyFleHBhbmQgJiYgdGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiA8cD57bm90ZX08L3A+fVxuICAgICAgICAgICAge2V4cGFuZCAmJiA8UHJvamVjdCB7Li4udGhpcy5wcm9wc30gbW9kZT1cIm9ubGluZVwiIC8+fVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgbWF5YmVFeHBhbmQocmVhbGx5KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmQ6IHJlYWxseSB9KVxuICAgIH1cbn1cblxuY2xhc3MgU2VhcmNoIGV4dGVuZHMgQ29tcG9uZW50PHsgcHJvamVjdHM6IHRhc2tbXSwgc3dpdGNoTW9kZTogRnVuY3Rpb24gfSwgeyByZXN1bHRzOiB0YXNrW10gfT57XG4gICAgc3RhdGUgPSB7IHJlc3VsdHM6IFtdIH1cbiAgICByZWFsVGltZVJlc3VsdChldikge1xuICAgICAgICBjb25zdCBjcml0ZXJpYSA9IGV2LnRhcmdldC52YWx1ZVxuICAgICAgICBpZihjcml0ZXJpYT09PVwiXCIpe1xuICAgICAgICAgICAgdGhpcy5zdG9wU2VhcmNoKClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zdCBxdWVyaWVzID0gcGFyc2UoY3JpdGVyaWEpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGFyc2VkJywgcXVlcmllcylcbiAgICAgICAgICAgIGlmIChxdWVyaWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiBxdWVyaWVzLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXJjaFRvcChwcmV2LCBjdXJyKVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzLnByb2plY3RzKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnRTZWFyY2goKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3dpdGNoTW9kZSh0cnVlKVxuICAgIH1cbiAgICBzdG9wU2VhcmNoKCkge1xuICAgICAgICB0aGlzLnByb3BzLnN3aXRjaE1vZGUoZmFsc2UpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyByZXN1bHRzOiBbXSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0cyB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoYmFyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJmaWVsZDE9UmVnRXhwXFwmZmllbGQyPVJlZ0V4cC4uLlwiXG4gICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9e2V2ID0+IHRoaXMucmVhbFRpbWVSZXN1bHQoZXYpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnN0YXJ0U2VhcmNoKCl9IC8+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL3d3dy5yYmNyb3lhbGJhbmsuY29tL2R2bC92MC4xL2Fzc2V0cy9pbWFnZXMvdWkvdWktc2VhcmNoLXRoaW4tYmx1ZS5zdmdcIiBhbHQ9XCJTZWFyY2hcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICB7cmVzdWx0cy5tYXAoKHJlc3VsdCwgaSkgPT4gPE5ld3Mgey4uLnJlc3VsdH0ga2V5PXtpfSAvPil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLQiBleHRlbmRzIENvbXBvbmVudDxhbnksIGFueT57XG4gICAgc3RhdGUgPSB7IHByb2plY3RzOiBzdG9yZS5nZXRTdGF0ZSgpLmtub3dsZWRnZWJhc2Uuc2xpY2UoMCwgMTApLCBzZWFyY2hpbmc6IGZhbHNlIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJvamVjdHM6IHN0b3JlLmdldFN0YXRlKCkua25vd2xlZGdlYmFzZS5zbGljZSgwLCAxMCkgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgcHJvamVjdHMsIHNlYXJjaGluZyB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuZXdzXCI+XG4gICAgICAgICAgICA8aDE+V2hhdCdzIHVwPC9oMT5cbiAgICAgICAgICAgIDxTZWFyY2ggcHJvamVjdHM9e3Byb2plY3RzfSBzd2l0Y2hNb2RlPXsoc2VhcmNoaW5nKSA9PiB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nIH0pfSAvPlxuICAgICAgICAgICAgeyFzZWFyY2hpbmcgJiYgPGRpdj5cbiAgICAgICAgICAgICAgICB7cHJvamVjdHMubWFwKChpdGVtLCBpKSA9PiA8TmV3cyB7Li4uaXRlbX0ga2V5PXtpfSAvPil9XG4gICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9LQi50c3giLCJtb2R1bGUuZXhwb3J0cyA9IFJlZHV4O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBjbGFzcyBNb2RhbCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBjaGlsZHJlbjogYW55LCBleGl0OiBGdW5jdGlvbiB9LCBhbnk+e1xuICAgIGJnQ2xpY2soZXYpIHtcbiAgICAgICAgLy8gZXYudGFyZ2V0LnN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgdGhpcy5wcm9wcy5leGl0KClcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCkgICAgICAgIFxuICAgIH1cbiAgICBpbnNpZGVDbGljayhldikge1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxiZ1wiIG9uQ2xpY2s9eyhldikgPT4gdGhpcy5iZ0NsaWNrKGV2KX0gb25TY3JvbGw9e2V2PT5ldi5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgb25DbGljaz17KGV2KSA9PiB0aGlzLmluc2lkZUNsaWNrKGV2KX0+XG4gICAgICAgICAgICAgICAgey4uLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2ID5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvTW9kYWwudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJ1xuaW1wb3J0IHsgdGFzaywgbmV3UHJvamVjdCB9IGZyb20gJy4vZ3JhcGgnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4vRWRpdGFibGUnO1xuXG5jbGFzcyBUb2RvaXRlbSBleHRlbmRzIENvbXBvbmVudDx7IGl0ZW06IHRhc2sgfSwgYW55PntcbiAgICBzdGF0ZSA9IHsgc3RhdHVzOiBcIlwiIH1cbiAgICBzdWJtaXRFZGl0KG5ld25hbWUpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLnJlbmFtZUl0ZW0sIG9sZG5hbWU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgbmV3bmFtZSB9KVxuICAgIH1cbiAgICBvbkNoZWNrKGV2KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2LnRhcmdldC5jaGVja2VkLCAnY2hlY2tlZCcpXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5jaGVja0l0ZW0sIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIGRvbmU6IGV2LnRhcmdldC5jaGVja2VkIH0pXG4gICAgfVxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHN0YXR1czogXCJmYWRpbmdcIiB9KVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5kZWxldGVJdGVtLCB0aXRsZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlIH0pLCAzMDApXG5cbiAgICB9XG4gICAgcGlja3VwKGV2KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwaWNrZWQgdXAnKVxuICAgICAgICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgdGhpcy5wcm9wcy5pdGVtLnRpdGxlKTtcbiAgICAgICAgZXYudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FmbG9hdCcpXG4gICAgfVxuICAgIHJlc3RvcmVpbnBsYWNlKGV2KSB7XG4gICAgICAgIGV2LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdhZmxvYXQnKVxuICAgIH1cbiAgICBvdmVyKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGRyb3AoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIilcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLnN1Ykl0ZW0sIGNoaWxkOiB0aXRsZSwgcGFyZW50OiB0aGlzLnByb3BzLml0ZW0udGl0bGUgfSlcbiAgICB9XG4gICAgYWRkTm90ZSgpIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IHByb21wdChcIldoYXQgaXMgeW91ciBub3RlP1wiLCB0aGlzLnByb3BzLml0ZW0ubm90ZSlcbiAgICAgICAgaWYgKG5vdGUpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5hZGROb3RlLCB0aXRsZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBub3RlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgdG91Y2hzdGFydChldikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndG91aHN0YXJ0JyxldilcbiAgICAgICAgLy8gZXYucGVyc2lzdCgpXG4gICAgICAgIGV2LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhZmxvYXQnKSAgICAgICAgXG4gICAgfVxuICAgIHRvdWNobW92ZShldil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtb3ZpbmcnLGV2KVxuICAgICAgICBldi5wZXJzaXN0KClcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGV2LnRvdWNoZXNbMF1cbiAgICAgICAgY29uc29sZS5sb2cobG9jYXRpb24pXG4gICAgICAgIGV2LnRhcmdldC5zdHlsZS5sZWZ0ID0gbG9jYXRpb24ucGFnZVgrXCJweFwiO1xuICAgICAgICBldi50YXJnZXQuc3R5bGUudG9wID0gbG9jYXRpb24ucGFnZVkrXCJweFwiO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbSB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wiaXRlbSBcIiArIChpdGVtLmNvbXBsZXRlZCA/IFwiY29tcGxldGVkXCIgOiBcIlwiKSArIHN0YXR1c31cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9e2V2ID0+IHRoaXMub3Zlcihldil9XG4gICAgICAgICAgICBvbkRyb3A9eyhldikgPT4gdGhpcy5kcm9wKGV2KX0+XG4gICAgICAgICAgICB7aXRlbS5jb21wbGV0ZWQgJiYgPGltZyBjbGFzc05hbWU9XCJkcmFnZ2VyXCIgc3JjPVwiaHR0cHM6Ly9jZG40Lmljb25maW5kZXIuY29tL2RhdGEvaWNvbnMvd2lyZWNvbnMtZnJlZS12ZWN0b3ItaWNvbnMvMzIvbWVudS1hbHQtMjU2LnBuZ1wiXG4gICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eyhldikgPT4gdGhpcy5waWNrdXAoZXYpfVxuICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17ZXYgPT4gdGhpcy5yZXN0b3JlaW5wbGFjZShldil9XG4gICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXtldiA9PiB0aGlzLnRvdWNoc3RhcnQoZXYpfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlQ2FwdHVyZT17ZXY9PnRoaXMudG91Y2htb3ZlKGV2KX1cbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXtldj0+dGhpcy5yZXN0b3JlaW5wbGFjZShldil9XG4gICAgICAgICAgICA+PC9pbWc+fVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9e2l0ZW0udGl0bGV9IGNoZWNrZWQ9e2l0ZW0uY29tcGxldGVkfSBvbkNsaWNrPXtldiA9PiB0aGlzLm9uQ2hlY2soZXYpfSAvPlxuICAgICAgICAgICAgPEVkaXRhYmxlIHNhdmU9e3R4dCA9PiB0aGlzLnN1Ym1pdEVkaXQodHh0KX0+e2l0ZW0udGl0bGV9PC9FZGl0YWJsZT5cbiAgICAgICAgICAgIDxpIG9uQ2xpY2s9eygpID0+IHRoaXMuYWRkTm90ZSgpfT7wn5OEPC9pPlxuICAgICAgICAgICAgPGkgb25DbGljaz17KCkgPT4gdGhpcy5yZW1vdmUoKX0+8J+XkTwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBUb2RvTGlzdCBleHRlbmRzIENvbXBvbmVudDxhbnksIGFueT4ge1xuICAgIHN0YXRlID0geyBjaGlsZHJlbjogc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0LmNoaWxkcmVuIH1cbiAgICBuZXd0aXRsZSA9IFwiXCJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNoaWxkcmVuOiBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QuY2hpbGRyZW4gfSlcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHR5cGluZ05ld0l0ZW0oZXYpIHtcbiAgICAgICAgY29uc3QgbmV3dGl0bGUgPSBldi50YXJnZXQudmFsdWUucmVwbGFjZSgvXFxuL2csIFwiXCIpXG4gICAgICAgIHRoaXMubmV3dGl0bGUgPSBuZXd0aXRsZVxuICAgICAgICAvLyBjb25zb2xlLmxvZygndHlwaW5nJywgbmV3dGl0bGUpXG4gICAgfVxuICAgIGFkZEl0ZW0obmV3dGl0bGUgPSB0aGlzLm5ld3RpdGxlKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5hZGRJdGVtLCB0aXRsZTogbmV3dGl0bGUgfSlcbiAgICB9XG4gICAgZW50ZXIoZXYpIHtcbiAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEl0ZW0oKVxuICAgICAgICAgICAgZXYudGFyZ2V0LnZhbHVlID0gXCJcIlxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJhZGRpdGVtXCIgdHlwZT1cInRleHRcIiBvbklucHV0PXsoZXYpID0+IHRoaXMudHlwaW5nTmV3SXRlbShldil9IG9uS2V5VXA9e2V2ID0+IHRoaXMuZW50ZXIoZXYpfSBwbGFjZWhvbGRlcj1cIkFkZCBhbiBpdGVtXCIgLz5cbiAgICAgICAgICAgIHtjaGlsZHJlbi5tYXAoaXRlbSA9PiA8VG9kb2l0ZW0gaXRlbT17aXRlbX0ga2V5PXtpdGVtLnRpdGxlfSAvPil9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyBleHRlbmRzIFB1cmVDb21wb25lbnQ8YW55LCB0YXNrPntcbiAgICBzdGF0ZSA9IHsgLi4uc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0IH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldFN0YXRlKHN0b3JlLmdldFN0YXRlKCkucHJvamVjdCkpXG4gICAgfVxuICAgIHByb2plY3ROb3RlKCkge1xuICAgICAgICBjb25zdCBub3RlID0gcHJvbXB0KFwiV2hhdCBpcyB5b3VyIG5vdGU/XCIsIHRoaXMuc3RhdGUubm90ZSlcbiAgICAgICAgaWYgKG5vdGUpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5hZGRQcm9qTm90ZXMsIG5vdGUgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIHRpdGxlIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvZG9saXN0c1wiPlxuICAgICAgICAgICAgPGkgb25DbGljaz17KCkgPT4gdGhpcy5wcm9qZWN0Tm90ZSgpfT7wn5OEPC9pPlxuICAgICAgICAgICAgPGgxPnt0aXRsZX08L2gxPlxuICAgICAgICAgICAgPFRvZG9MaXN0IGNoaWxkcmVuPXtjaGlsZHJlbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL1RvZG8udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBmdW5jdGlvbiBFZGl0YWJsZSh7IHNhdmUsIGNoaWxkcmVuIH0pIHtcbiAgICBmdW5jdGlvbiBpbnB1dChldikge1xuICAgICAgICAvLyBlbnRlciB0byBzdWJtaXQsIG90aGVyd2lzZSBqdXN0IGRvIG5vdGhpbmdcbiAgICAgICAgY29uc3QgbmV3bmFtZSA9IGV2LnRhcmdldC50ZXh0Q29udGVudC5yZXBsYWNlKC9cXG4vZywgXCJcIilcbiAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgc2F2ZShuZXduYW1lKVxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3bmFtZSxcInNhdmVkXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDxwIG9uS2V5RG93bj17aW5wdXR9PntjaGlsZHJlbn08L3A+XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvRWRpdGFibGUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBEZXRhaWxBdXRob3IgfSBmcm9tICcuL0F1dGhvcic7XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vRGF0YWZsb3cnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHBvcnR1bml0eSBleHRlbmRzIFB1cmVDb21wb25lbnQ8YW55LGFueT57XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm9wcG9ydHVuaXRpZXNcIj5cbiAgICAgICAgICAgIDxoMT5PcHBvcnR1bml0aWVzPC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50ZXJlc3Rpbmdjb250cmlidXRvcnNcIj5cbiAgICAgICAgICAgICAgICA8aDI+Q29udHJpYnV0b3JzIHlvdSBtaWdodCBiZSBpbnRlcmVzdGVkIGluPC9oMj5cbiAgICAgICAgICAgICAgICB7c3RvcmUuZ2V0U3RhdGUoKS5pbnRlcmVzdGluZ0F1dGhvcnMubWFwKCh7bmFtZX0pPT48RGV0YWlsQXV0aG9yIGF1dGhvcj17bmFtZX0ga2V5PXtuYW1lfS8+KX1cbiAgICAgICAgICAgICAgICA8cD5Db25uZWN0IHdpdGggcmVjb21tZW5kYXRpb24gYWxnb3JpdGhtIG9mIDEwayBDb2ZmZWU8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgyPlVwY29taW5nIHByb2plY3RzIHRoYXQgZGVtYW5kIHlvdXIgc2tpbGxzPC9oMj5cbiAgICAgICAgICAgICAgICA8cD5Db25uZWN0IHdpdGggUkJDIGludGVybmFsIGpvYiBwb3N0aW5nPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9PcHBvcnR1bml0eS50c3giXSwic291cmNlUm9vdCI6IiJ9