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
    project: Graph_1.newProject("Make pancake", "Lingkai Shen"),
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
                React.createElement("input", { type: "text", placeholder: "field1=RegExp\&field2=RegExp...", onInput: ev => this.realTimeResult(ev), onClick: () => this.startSearch(), onBlur: () => this.stopSearch() }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDg3ODVlYmExMTViZTA2YjU0MzYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL0dyYXBoLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9UYWcudHN4Iiwid2VicGFjazovLy8uL3RzLyQudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvc2VhcmNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vdHMvS0IudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL0VkaXRhYmxlLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9PcHBvcnR1bml0eS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLHVCOzs7Ozs7Ozs7QUNDQSx3Q0FBbUM7QUFDbkMsdUNBQW9HO0FB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QywyQkFBRyxTQUFTLEVBQUUsS0FBSyxJQUFHLFFBQVEsQ0FBSztBQUM5QyxDQUFDO0FBWkQsNEJBWUM7Ozs7Ozs7Ozs7QUNmRCxxQ0FBOEI7QUFDOUIsdUNBQXFDO0FBQ3JDLHdDQUF3QztBQUN4QywwQ0FBbUM7QUFFbkMsaUJBQWlDLFNBQVEscUJBQXNCO0lBQzNELE1BQU07UUFDRixNQUFNLENBQUMsNkJBQUssU0FBUyxFQUFDLGVBQWU7WUFDakMsZ0RBQXNCO1lBQ3RCLDZCQUFLLFNBQVMsRUFBQyx5QkFBeUI7Z0JBQ3BDLDBFQUFnRDtnQkFDL0MsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxLQUFHLG9CQUFDLHFCQUFZLElBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUM7Z0JBQzVGLHFGQUEwRCxDQUN4RDtZQUNOO2dCQUNJLDRFQUFrRDtnQkFDbEQsdUVBQTRDLENBQzFDLENBQ0o7SUFDVixDQUFDO0NBQ0o7QUFmRCw4QkFlQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkODc4NWViYTExNWJlMDZiNTQzNiIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBuZXdQcm9qZWN0LCB0YXNrLCBjb21wbGV0ZSwgY2FuY2VsLCByZW1vdmVDaGlsZCwgYWRkQ2hpbGQsIGFkZFRhZywgc2V0Tm90ZSB9IGZyb20gJy4vR3JhcGgnXG5cbmludGVyZmFjZSBjb250cmlidXRlciB7XG4gICAgdGFnczogc3RyaW5nW10sXG4gICAgZW1haWw6IHN0cmluZyxcbiAgICBuYW1lOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIFN0b3JlU3RhdGUge1xuICAgIHByb2plY3Q/OiB0YXNrLFxuICAgIGN1cnJlbnRBdXRob3I/OiBjb250cmlidXRlcixcbiAgICBrbm93bGVkZ2ViYXNlPzogdGFza1tdLFxuICAgIGludGVyZXN0aW5nQXV0aG9ycz86IGNvbnRyaWJ1dGVyW11cbn1cblxuY29uc3QgaW5pdGlhbFN0YXRlOiBTdG9yZVN0YXRlID0ge1xuICAgIHByb2plY3Q6IG5ld1Byb2plY3QoXCJNYWtlIHBhbmNha2VcIiwgXCJMaW5na2FpIFNoZW5cIiksXG4gICAgY3VycmVudEF1dGhvcjoge1xuICAgICAgICB0YWdzOiBbJ2Nvb2snLCAncmVhY3QnXSxcbiAgICAgICAgZW1haWw6IFwic2xrNDlAbGl2ZS5jblwiLFxuICAgICAgICBuYW1lOiBcIkxpbmdrYWkgU2hlblwiXG4gICAgfSxcbiAgICBrbm93bGVkZ2ViYXNlOiBbXG4gICAgICAgIHsgXCJ0aXRsZVwiOiBcIk1ha2Ugd2FmZmxlXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW3sgXCJ0aXRsZVwiOiBcInBvdXIgb250byB0aGUgd2FmZmxlIGlyb24sIHdhaXQgMm1pblwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFt7IFwidGl0bGVcIjogXCJtaXggZmxvdXIsIGJha2luZyBwb3dkZXIsIGVnZ3MgZXRjXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW10sIFwibm90ZVwiOiBcIlwiLCBcImNvbXBsZXRlZFwiOiB0cnVlLCBcInRhZ3NcIjogW10gfSwgeyBcInRpdGxlXCI6IFwid2hpcCBjcmVhbVwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFtdLCBcIm5vdGVcIjogXCJVc2UgYW4gZWxlY3Ryb25pYyB3aGlzayB0byB3aGlwIDM1JSBjcmVhbSB1bnRpbCBpdCBiZWNvbWVzIHB1ZmZ5XCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9XSwgXCJub3RlXCI6IFwiXCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9XSwgXCJub3RlXCI6IFwiTmVlZCBlbGVjdHJvbmljIHdoaXNrIGFuZCB3YWZmbGUgaXJvblwiLCBcImNvbXBsZXRlZFwiOiBmYWxzZSwgXCJ0YWdzXCI6IFtcImJyZWFrZmFzdFwiLCBcInJlYWN0XCJdIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidGl0bGVcIjogXCJIb3cgdG8gYnVpbGQgUmVCQ2lwZVwiLFxuICAgICAgICAgICAgXCJhdXRob3JcIjogXCJMaW5na2FpIFNoZW5cIixcbiAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcImdldCByZWFkeSBmb3IgZGVtb1wiLFxuICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiaW1wbGVtZW50IGNvbXBvbmVudHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiYnJlYWsgZG93biBjb21wb25lbnRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwic2V0dXAgZW52aXJvbm1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiTGluZ2thaSBTaGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJsZWFybiByZWR1eFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJ3ZWJwYWNrIHdpdGggaG90IHJlbG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBcIkxpbmdrYWkgU2hlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJzYXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiTGluZ2thaSBTaGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcInJlYWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiTGluZ2thaSBTaGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIFwibm90ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJub3RlXCI6IFwiXCIsXG4gICAgICAgICAgICBcImNvbXBsZXRlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwidGFnc1wiOiBbXVxuICAgICAgICB9XG4gICAgXSxcbiAgICBpbnRlcmVzdGluZ0F1dGhvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdGFnczogWydjb29rJywgJ3JlYWN0J10sXG4gICAgICAgICAgICBlbWFpbDogXCJ0ZWFtQHJlbWkuY29tXCIsXG4gICAgICAgICAgICBuYW1lOiBcIlRlYW0gUmVtaVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhZ3M6IFsnY29vaycsICdkZXNpZ24nXSxcbiAgICAgICAgICAgIGVtYWlsOiBcImVtaWx5QHJiYy5jYVwiLFxuICAgICAgICAgICAgbmFtZTogXCJFbWlseSBaaGFuZ1wiXG4gICAgICAgIH1cbiAgICBdXG59XG5cblxuZnVuY3Rpb24gcmVkdWNlcihwcmV2U3RhdGU6IFN0b3JlU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogeyBbYW55OiBzdHJpbmddOiBhbnkgfSkge1xuICAgIGNvbnN0IHN0YXRlOiBTdG9yZVN0YXRlID0gcHJldlN0YXRlXG4gICAgY29uc3QgcHJvamVjdCA9IHN0YXRlLnByb2plY3RcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJhZGRJdGVtXCI6IHtcbiAgICAgICAgICAgIGFkZENoaWxkKHByb2plY3QsIG5ld1Byb2plY3QoYWN0aW9uLnRpdGxlLCBwcm9qZWN0LmF1dGhvcikpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwicmVuYW1lSXRlbVwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IG9sZG5hbWUsIG5ld25hbWUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IG9sZG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQudGl0bGUgPSBuZXduYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJjaGVja0l0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSwgZG9uZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIGNvbXBsZXRlKGNoaWxkKVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGNhbmNlbChjaGlsZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImRlbGV0ZUl0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhhdCBjaGlsZFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBjaGlsZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZW1vdmVDaGlsZChwcm9qZWN0LCB0YXJnZXQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwic3ViSXRlbVwiOiB7XG4gICAgICAgICAgICAvLyBtYWtlIGFuIGl0ZW0gYSBkZXBlbmRlbmN5IG9mIGFub3RoZXJcbiAgICAgICAgICAgIGNvbnN0IHsgcGFyZW50LCBjaGlsZCB9ID0gYWN0aW9uXG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBjaGlsZCkgdGhyb3cgXCJjYW5ub3QgYmUgdGhlIHNhbWUgaXRlbVwiXG4gICAgICAgICAgICBsZXQgcGFyZW50aXRlbSwgY2hpbGRpdGVtO1xuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2gudGl0bGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRpdGVtID0gY2hcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoLnRpdGxlID09PSBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZGl0ZW0gPSBjaFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhZGRDaGlsZChwYXJlbnRpdGVtLCBjaGlsZGl0ZW0pXG4gICAgICAgICAgICByZW1vdmVDaGlsZChwcm9qZWN0LCBjaGlsZGl0ZW0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkVGFnXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3dGFnIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIGFkZFRhZyhwcm9qZWN0LCBuZXd0YWcpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwicHVibGlzaFwiOiB7XG4gICAgICAgICAgICBzdGF0ZS5rbm93bGVkZ2ViYXNlLnB1c2goc3RhdGUucHJvamVjdClcbiAgICAgICAgICAgIC8vIGFkZCB0aGF0IHRhZyB0byB0aGUgYXV0aG9yIGFzIHdlbGxcbiAgICAgICAgICAgIGNvbnN0IGF1dGhvciA9IHN0YXRlLmN1cnJlbnRBdXRob3JcbiAgICAgICAgICAgIGF1dGhvci50YWdzLnB1c2goLi4ucHJvamVjdC50YWdzKVxuICAgICAgICAgICAgYXV0aG9yLnRhZ3MgPSBBcnJheS5mcm9tKG5ldyBTZXQoYXV0aG9yLnRhZ3MpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZFByb2pOb3Rlc1wiOiB7XG4gICAgICAgICAgICBzZXROb3RlKHByb2plY3QsIGFjdGlvbi5ub3RlKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZE5vdGVcIjoge1xuICAgICAgICAgICAgY29uc3QgeyB0aXRsZSwgbm90ZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2ggPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Tm90ZShjaCwgbm90ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImltcG9ydFByb2plY3RcIjoge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gYWN0aW9uXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBhZGRDaGlsZChzdGF0ZS5wcm9qZWN0LCBjaGlsZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gICAgXCJpbXBvcnRQcm9qZWN0XCI6IHtcbiAgICAgICAgdHlwZTogXCJpbXBvcnRQcm9qZWN0XCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgIH0sXG4gICAgXCJhZGRJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJhZGRJdGVtXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiXG4gICAgfSxcbiAgICBcInJlbmFtZUl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcInJlbmFtZUl0ZW1cIlxuICAgIH0sXG4gICAgXCJjaGVja0l0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImNoZWNrSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgZG9uZTogZmFsc2VcbiAgICB9LFxuICAgIFwiZGVsZXRlSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiZGVsZXRlSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIlxuICAgIH0sXG4gICAgXCJzdWJJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJzdWJJdGVtXCIsXG4gICAgICAgIHBhcmVudDogXCJcIixcbiAgICAgICAgY2hpbGQ6IFwiXCJcbiAgICB9LFxuICAgIFwiYWRkVGFnXCI6IHtcbiAgICAgICAgdHlwZTogXCJhZGRUYWdcIixcbiAgICAgICAgbmV3dGFnOiBcIlwiXG4gICAgfSxcbiAgICBcInB1Ymxpc2hcIjoge1xuICAgICAgICB0eXBlOiBcInB1Ymxpc2hcIixcbiAgICB9LFxuICAgIFwiYWRkUHJvak5vdGVzXCI6IHtcbiAgICAgICAgdHlwZTogXCJhZGRQcm9qTm90ZXNcIlxuICAgIH0sXG4gICAgXCJhZGROb3RlXCI6IHtcbiAgICAgICAgdHlwZTogXCJhZGROb3RlXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICBub3RlOiBcIlwiXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSkpXG5PYmplY3QuYXNzaWduKHdpbmRvdywgeyBhY3Rpb25zLCBzdG9yZSB9KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0RhdGFmbG93LnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCdcbmltcG9ydCB7IHNlYXJjaFRvcCB9IGZyb20gJy4vc2VhcmNoZXInO1xuLy8gcmVuZGVycyBhIG5pY2UgYmxvY2sgb2YgdGhlIGF1dGhvcidzIGluaXRpYWxzXG5leHBvcnQgZnVuY3Rpb24gRGV0YWlsQXV0aG9yKHsgYXV0aG9yIH0pIHtcbiAgICBjb25zdCB7IHRhZ3MsIGVtYWlsIH0gPSBbLi4uc3RvcmUuZ2V0U3RhdGUoKS5pbnRlcmVzdGluZ0F1dGhvcnMsIHN0b3JlLmdldFN0YXRlKCkuY3VycmVudEF1dGhvcl1cbiAgICAgICAgLmZpbHRlcigoeyBuYW1lIH0pID0+IG5hbWUgPT09IGF1dGhvcilbMF1cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRob3JkZXRhaWxcIj5cbiAgICAgICAgPGgxPnthdXRob3J9PC9oMT5cbiAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgICAgICA8YSBocmVmPXtcIm1haWx0bzpcIiArIGVtYWlsfSA+e2VtYWlsfTwvYT5cbiAgICAgICAgPGgyPkNvbnRyaWJ1dGlvbnM6PC9oMj5cbiAgICAgICAge2dldEF1dGhvclByb2plY3RzKGF1dGhvcikubWFwKHRpdGxlID0+IDxkaXYga2V5PXt0aXRsZX0+e3RpdGxlfTwvZGl2Pil9XG4gICAgPC9kaXY+XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRob3IgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgYXV0aG9yOiBzdHJpbmcgfSwgeyBkZXRhaWw6IGJvb2xlYW4gfT4ge1xuICAgIHN0YXRlID0geyBkZXRhaWw6IGZhbHNlIH1cbiAgICBzaG93RGV0YWlsKGV2KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkZXRhaWw6IHRydWUgfSlcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogZmFsc2UgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGF1dGhvciB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGRldGFpbCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wiYXV0aG9yXCJ9IG9uQ2xpY2s9e2V2ID0+IHRoaXMuc2hvd0RldGFpbChldil9PlxuICAgICAgICAgICAge2F1dGhvci50b1VwcGVyQ2FzZSgpLnNwbGl0KCcgJykubWFwKGF1ID0+IGF1WzBdKX1cbiAgICAgICAgICAgIHtkZXRhaWwgJiZcbiAgICAgICAgICAgICAgICA8TW9kYWwgZXhpdD17KCkgPT4gdGhpcy5oaWRlKCl9PlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsQXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuICAgICAgICAgICAgICAgIDwvTW9kYWw+XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0QXV0aG9yUHJvamVjdHMoYXV0aG9yKSB7XG4gICAgcmV0dXJuIHNlYXJjaFRvcChzdG9yZS5nZXRTdGF0ZSgpLmtub3dsZWRnZWJhc2UsIHtcbiAgICAgICAga2V5OiBcImF1dGhvclwiLFxuICAgICAgICBtYXRjaGVyOiBuZXcgUmVnRXhwKGF1dGhvcilcbiAgICB9KS5tYXAocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlKVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0F1dGhvci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcbmltcG9ydCB7ICQgfSBmcm9tICcuLyQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIHRhc2sge1xuICAgIFwidGl0bGVcIjogc3RyaW5nLFxuICAgIFwiYXV0aG9yXCI6IHN0cmluZyxcbiAgICBcImNvbXBsZXRlZFwiOiBib29sZWFuLFxuICAgIFwiY2hpbGRyZW5cIj86IHRhc2tbXSxcbiAgICBcIm5vdGVcIj86IHN0cmluZyxcbiAgICBcInRhZ3NcIj86IHN0cmluZ1tdXG59XG4vLyB1c2UgY29tcG9uZW50IG5lc3RpbmcgdG8gZ2V0IGEgZ3JhcGhcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1Byb2plY3QodGl0bGU6IHN0cmluZywgYXV0aG9yOiBzdHJpbmcpOiB0YXNrIHtcbiAgICBjb25zdCBQcm9qZWN0ID0ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIG5vdGU6IFwiXCIsXG4gICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgIHRhZ3M6IFtdXG4gICAgfVxuICAgIHJldHVybiBQcm9qZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV0ZShwcm9qKSB7XG4gICAgcHJvai5jb21wbGV0ZWQgPSB0cnVlXG59XG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHByb2opIHtcbiAgICBwcm9qLmNvbXBsZXRlZCA9IGZhbHNlXG59XG5leHBvcnQgZnVuY3Rpb24gc2V0aXRsZShwcm9qLCBuZXdUaXRsZSkge1xuICAgIHByb2oudGl0bGUgPSBuZXdUaXRsZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZENoaWxkKHByb2osIGNoaWxkOiB0YXNrKSB7XG4gICAgcHJvai5jaGlsZHJlbi5wdXNoKGNoaWxkKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNoaWxkKHByb2osIGNoaWxkOiB0YXNrKSB7XG4gICAgcHJvai5jaGlsZHJlbi5zcGxpY2UocHJvai5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSwgMSlcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXROb3RlKHByb2osIG5ld05vdGUpIHtcbiAgICBwcm9qLm5vdGUgPSBuZXdOb3RlXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkVGFnKHByb2osIHRhZzogc3RyaW5nKSB7XG4gICAgcHJvai50YWdzLnB1c2godGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVUYXNrKHByb2ope1xuICAgIC8vIG1ha2UgYSBzaGFsbG93IGNvcHkgb2YgYSB0YXNrLCB3aXRoIG5vIGNoaWxkcmVuIGFuZCB1bmNvbXBsZXRlZFxuICAgIGNvbnN0IG5ld3Byb2o6dGFzayA9IHsuLi5wcm9qfVxuICAgIG5ld3Byb2ouY2hpbGRyZW49W11cbiAgICBuZXdwcm9qLmNvbXBsZXRlZD1mYWxzZVxuICAgIG5ld3Byb2oudGFncz1uZXdwcm9qLnRhZ3Muc2xpY2UoMClcbiAgICByZXR1cm4gbmV3cHJvalxufVxuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IHRzazogdGFzayB9LCB7IGV4cGFuZGVkOiBib29sZWFuIH0+e1xuICAgIHN0YXRlID0geyBleHBhbmRlZDogdHJ1ZSB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRzayB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzIH0gPSB0c2tcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGFza1wiPlxuICAgICAgICAgICAgPGgyPnt0aXRsZX08L2gyPlxuICAgICAgICAgICAgey8qIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+ICovfVxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgJiYgY2hpbGRyZW4ubWFwKGNoaWxkID0+IDxUYXNrIHRzaz17Y2hpbGR9IGtleT17Y2hpbGQudGl0bGV9IC8+KX1cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCBleHRlbmRzIENvbXBvbmVudDxhbnksIGFueT4ge1xuICAgIHN0YXRlID0geyBwdWJsaXNoZWQ6IGZhbHNlIH1cbiAgICBhZGRUYWcoZXYpIHtcbiAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICBjb25zdCBuZXd0YWcgPSBldi50YXJnZXQudmFsdWVcbiAgICAgICAgICAgIGV2LnRhcmdldC52YWx1ZSA9IFwiXCJcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5hZGRUYWcsIG5ld3RhZyB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1Ymxpc2goKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMucHVibGlzaClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHB1Ymxpc2hlZDogdHJ1ZSB9KVxuICAgIH1cbiAgICBpbXBvcnQoKXtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goey4uLmFjdGlvbnMuaW1wb3J0UHJvamVjdCxjaGlsZHJlbjppbXBvcnRQcm9qZWN0KHRoaXMucHJvcHMpfSlcbiAgICAgICAgc2V0VGltZW91dCgoKT0+JCgnYVtocmVmPVwiI1Byb2plY3RcIl0nKS5jbGljaygpLDEwMClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzLG1vZGU9XCJsb2NhbFwiIH0gPSB0aGlzLnByb3BzIGFzIGFueVxuICAgICAgICBjb25zdCB7IHB1Ymxpc2hlZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0IHRhc2tcIj5cbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG4gICAgICAgICAgICB7bW9kZS5pbmNsdWRlcyhcImxvY2FsXCIpICYmIDxidXR0b24gY2xhc3NOYW1lPVwicHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHRoaXMucHVibGlzaCgpfSBkaXNhYmxlZD17cHVibGlzaGVkfT57cHVibGlzaGVkID8gXCJEb25lIOKclFwiIDogXCJQdWJsaXNoIOKshlwifTwvYnV0dG9uPn1cbiAgICAgICAgICAgIHttb2RlLmluY2x1ZGVzKFwibG9jYWxcIikgJiYgPGJ1dHRvbj5Eb3dubG9hZCDirIc8L2J1dHRvbj59XG4gICAgICAgICAgICB7bW9kZS5pbmNsdWRlcyhcIm9ubGluZVwiKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT1cInByaW1hcnlcIiBvbkNsaWNrPXsoKT0+dGhpcy5pbXBvcnQoKX0+SW1wb3J0IOKshzwvYnV0dG9uPn1cbiAgICAgICAgICAgIHt0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuZXd0YWdcIiBwbGFjZWhvbGRlcj1cIm5ldyB0YWdcIiBvbktleVVwPXsoZXYpID0+IHRoaXMuYWRkVGFnKGV2KX0gLz5cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgICAgIHtjaGlsZHJlbi5tYXAoY2hpbGQgPT4gPFRhc2sgdHNrPXtjaGlsZH0ga2V5PXtjaGlsZC50aXRsZX0gLz4pfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdmVydmlldyBleHRlbmRzIENvbXBvbmVudDxhbnksIHRhc2s+e1xuICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxQcm9qZWN0IHsuLi50aGlzLnN0YXRlfSAvPlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFByb2plY3QocHJvamVjdCl7XG4gICAgLy8gZmxhdHRlbiBhIHdob2xlIHByb2plY3QgYW5kIG1hcmsgZWFjaCBjaGlsZCBhcyBpbmNvbXBsZXRlXG4gICAgY29uc3QgY2hpbGRyZW49W11cbiAgICB0cmF2ZXJzZShwcm9qZWN0LmNoaWxkcmVuLGNoaWxkcmVuKVxuICAgIHJldHVybiBjaGlsZHJlblxufVxuXG5mdW5jdGlvbiB0cmF2ZXJzZShjaGlsZHJlbix0YXJnZXQpe1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQ9PntcbiAgICAgICAgdGFyZ2V0LnB1c2goY2xvbmVUYXNrKGNoaWxkKSlcbiAgICAgICAgdHJhdmVyc2UoY2hpbGQuY2hpbGRyZW4sdGFyZ2V0KVxuICAgIH0pXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvR3JhcGgudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vRGF0YWZsb3cnO1xuLy8gcmVuZGVycyBhIG5pY2UgYmxvY2sgb2YgdGhlIGF1dGhvcidzIGluaXRpYWxzXG5leHBvcnQgZnVuY3Rpb24gVGFnKHsgdGFnIH06IHsgdGFnOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IG15dGFnczogYW55IHwgc3RyaW5nW10gPSBzdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3IudGFnc1xuICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e1widGFnXCIgKyAobXl0YWdzLmluY2x1ZGVzKHRhZykgP1wiIGhvdFwiOlwiXCIpfT57dGFnfTwvc3Bhbj5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9UYWcudHN4IiwiXG5leHBvcnQgZnVuY3Rpb24gJChzZWxlY3Rvcikge1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEpID8gcmVzdWx0WzBdIDogcmVzdWx0XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvJC50cyIsImltcG9ydCB7IHRhc2sgfSBmcm9tICcuL2dyYXBoJztcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gICAga2V5OiBzdHJpbmcsXG4gICAgbWF0Y2hlcjogUmVnRXhwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hUb3AoS0I6IHRhc2tbXSwgcXVlcnk6IFF1ZXJ5KSB7XG4gICAgLy8gcHV0IHRvZ2V0aGVyIGEgbGlzdCBvZiByZWxldmFudCBwcm9qZWN0c1xuICAgIHJldHVybiBLQi5maWx0ZXIocHJvaiA9PiBzZWFyY2hPbmUocHJvaiwgcXVlcnkpKVxufVxuXG5mdW5jdGlvbiBzZWFyY2hPbmUodGFzazogdGFzaywgcXVlcnkpIHtcbiAgICAvLyBmaW5kIGluIG9uZSBwcm9qZWN0IGFuZCBhbGwgaXRzIGNoaWxkcmVuIGlmIGl0IGV4aXN0XG4gICAgY29uc3QgeyBrZXksIG1hdGNoZXIgfSA9IHF1ZXJ5XG4gICAgaWYgKHRhc2tba2V5XS5tYXRjaChtYXRjaGVyKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0YXNrLmNoaWxkcmVuLnNvbWUoY2hpbGQgPT4gc2VhcmNoT25lKGNoaWxkLCBxdWVyeSkpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UocXVlcnlzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gcXVlcnlzdHJpbmcuc3BsaXQoJyYnKVxuICAgICAgICAgICAgLm1hcChxcnkgPT4gcXJ5LnNwbGl0KCc9JykpXG4gICAgICAgICAgICAubWFwKHEgPT4gKHtcbiAgICAgICAgICAgICAgICBrZXk6IHFbMF0udHJpbSgpLFxuICAgICAgICAgICAgICAgIG1hdGNoZXI6IG5ldyBSZWdFeHAocVsxXS50cmltKCkpXG4gICAgICAgICAgICB9KSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBbeyBrZXk6IFwidGl0bGVcIiwgbWF0Y2hlcjogbmV3IFJlZ0V4cChxdWVyeXN0cmluZykgfV1cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvc2VhcmNoZXIudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi8kJ1xuaW1wb3J0IEtCIGZyb20gXCIuL0tCXCJcbmltcG9ydCBUb2RvIGZyb20gJy4vVG9kbydcbmltcG9ydCBPcHBvcnR1bml0eSBmcm9tICcuL09wcG9ydHVuaXR5J1xuaW1wb3J0IHsgT3ZlcnZpZXcgfSBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSBcIi4vQXV0aG9yXCI7XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gXCIuL0RhdGFmbG93XCI7XG5cbmNvbnN0IGF1dGhvciA9IHN0b3JlLmdldFN0YXRlKCkuY3VycmVudEF1dGhvci5uYW1lXG5jbGFzcyBBcHAgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgaXRlbXM6IHsgW2FueTogc3RyaW5nXTogYW55IH0gfSwgYW55PiB7XG4gICAgLy8gZGVmYXVsdCByZW5kZXIgdGhlIG5ld3MgcGFnZVxuICAgIHN0YXRlID0geyBQYWdlOiB0aGlzLnByb3BzLml0ZW1zLlByb2plY3QsIGN1cnJlbnRsaW5rOiBcIlByb2plY3RcIiB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgUGFnZSwgY3VycmVudGxpbmsgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG5cbiAgICAgICAgICAgICAgICB7T2JqZWN0LmtleXMoaXRlbXMpLm1hcChuYW1lID0+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wiICsgbmFtZX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFBhZ2U6IGl0ZW1zW25hbWVdLCBjdXJyZW50bGluazogbmFtZSB9KX0ga2V5PXtuYW1lfSBjbGFzc05hbWU9e2N1cnJlbnRsaW5rID09PSBuYW1lID8gXCJjdXJyZW50XCIgOiBcIlwifT57bmFtZX08L2E+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPFBhZ2UgLz5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5yZW5kZXIoPEFwcCBpdGVtcz17eyBQcm9qZWN0OiBUb2RvLCBPdmVydmlldywgRXhwbG9yZTogS0IsIENvbm5lY3Q6IE9wcG9ydHVuaXR5IH19IC8+LCAkKCcjYXBwJykpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvaW5kZXgudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0RE9NXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGFjdGlvbnMsIHN0b3JlIH0gZnJvbSBcIi4vRGF0YWZsb3dcIlxuaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vR3JhcGgnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IHsgc2VhcmNoVG9wLCBRdWVyeSwgcGFyc2UgfSBmcm9tICcuL3NlYXJjaGVyJ1xuLy8gVG9kb1xuLy8gU2hvdyBHcmFwaFxuLy8gZm9ybWF0IG9mIHRoZSBhIG5ld3MgY29udGVudFxuLy8gdGFnc1xuXG5leHBvcnQgY2xhc3MgTmV3cyBleHRlbmRzIFB1cmVDb21wb25lbnQ8dGFzaywgeyBleHBhbmQ6IGJvb2xlYW4gfT57XG4gICAgLy8gQSBuZXdzLCBtYXkgZXhwYW5kIGlmIG5lY2Vzc2FyeVxuICAgIHN0YXRlID0geyBleHBhbmQ6IGZhbHNlIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGF1dGhvciwgdGFncywgY2hpbGRyZW4sIG5vdGUgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBleHBhbmQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtleHBhbmQgPyBcIm5ld3NkZXRhaWxcIiA6IFwibmV3c2JyaWVmXCJ9IG9uQ2xpY2s9eygpID0+IHRoaXMubWF5YmVFeHBhbmQoIWV4cGFuZCl9PlxuICAgICAgICAgICAgeyFleHBhbmQgJiYgPGgzPnt0aXRsZX08L2gzPn1cbiAgICAgICAgICAgIHshZXhwYW5kICYmIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+fVxuICAgICAgICAgICAgeyFleHBhbmQgJiYgdGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiA8cD57bm90ZX08L3A+fVxuICAgICAgICAgICAge2V4cGFuZCAmJiA8UHJvamVjdCB7Li4udGhpcy5wcm9wc30gbW9kZT1cIm9ubGluZVwiIC8+fVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgbWF5YmVFeHBhbmQocmVhbGx5KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmQ6IHJlYWxseSB9KVxuICAgIH1cbn1cblxuY2xhc3MgU2VhcmNoIGV4dGVuZHMgQ29tcG9uZW50PHsgcHJvamVjdHM6IHRhc2tbXSwgc3dpdGNoTW9kZTogRnVuY3Rpb24gfSwgeyByZXN1bHRzOiB0YXNrW10gfT57XG4gICAgc3RhdGUgPSB7IHJlc3VsdHM6IFtdIH1cbiAgICByZWFsVGltZVJlc3VsdChldikge1xuICAgICAgICBjb25zdCBjcml0ZXJpYSA9IGV2LnRhcmdldC52YWx1ZVxuICAgICAgICBjb25zdCBxdWVyaWVzID0gcGFyc2UoY3JpdGVyaWEpXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXJzZWQnLCBxdWVyaWVzKVxuICAgICAgICBpZiAocXVlcmllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdHM6IHF1ZXJpZXMucmVkdWNlKChwcmV2LCBjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hUb3AocHJldiwgY3VycilcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzLnByb2plY3RzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGFydFNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zd2l0Y2hNb2RlKHRydWUpXG4gICAgfVxuICAgIHN0b3BTZWFyY2goKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3dpdGNoTW9kZShmYWxzZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlc3VsdHM6IFtdIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyByZXN1bHRzIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hiYXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZmllbGQxPVJlZ0V4cFxcJmZpZWxkMj1SZWdFeHAuLi5cIlxuICAgICAgICAgICAgICAgIG9uSW5wdXQ9e2V2ID0+IHRoaXMucmVhbFRpbWVSZXN1bHQoZXYpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnN0YXJ0U2VhcmNoKCl9XG4gICAgICAgICAgICAgICAgb25CbHVyPXsoKSA9PiB0aGlzLnN0b3BTZWFyY2goKX0gLz5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vd3d3LnJiY3JveWFsYmFuay5jb20vZHZsL3YwLjEvYXNzZXRzL2ltYWdlcy91aS91aS1zZWFyY2gtdGhpbi1ibHVlLnN2Z1wiIGFsdD1cIlNlYXJjaFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIHtyZXN1bHRzLm1hcCgocmVzdWx0LCBpKSA9PiA8TmV3cyB7Li4ucmVzdWx0fSBrZXk9e2l9IC8+KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtCIGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PntcbiAgICBzdGF0ZSA9IHsgcHJvamVjdHM6IHN0b3JlLmdldFN0YXRlKCkua25vd2xlZGdlYmFzZS5zbGljZSgwLCAxMCksIHNlYXJjaGluZzogZmFsc2UgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcm9qZWN0czogc3RvcmUuZ2V0U3RhdGUoKS5rbm93bGVkZ2ViYXNlLnNsaWNlKDAsIDEwKSB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0cywgc2VhcmNoaW5nIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5ld3NcIj5cbiAgICAgICAgICAgIDxoMT5XaGF0J3MgdXA8L2gxPlxuICAgICAgICAgICAgPFNlYXJjaCBwcm9qZWN0cz17cHJvamVjdHN9IHN3aXRjaE1vZGU9eyhzZWFyY2hpbmcpID0+IHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmcgfSl9IC8+XG4gICAgICAgICAgICB7IXNlYXJjaGluZyAmJiA8ZGl2PlxuICAgICAgICAgICAgICAgIHtwcm9qZWN0cy5tYXAoKGl0ZW0sIGkpID0+IDxOZXdzIHsuLi5pdGVtfSBrZXk9e2l9IC8+KX1cbiAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0tCLnRzeCIsIm1vZHVsZS5leHBvcnRzID0gUmVkdXg7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGNoaWxkcmVuOiBhbnksIGV4aXQ6IEZ1bmN0aW9uIH0sIGFueT57XG4gICAgYmdDbGljayhldikge1xuICAgICAgICAvLyBldi50YXJnZXQuc3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICB0aGlzLnByb3BzLmV4aXQoKVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKSAgICAgICAgXG4gICAgfVxuICAgIGluc2lkZUNsaWNrKGV2KSB7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJtb2RhbGJnXCIgb25DbGljaz17KGV2KSA9PiB0aGlzLmJnQ2xpY2soZXYpfSBvblNjcm9sbD17ZXY9PmV2LnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuaW5zaWRlQ2xpY2soZXYpfT5cbiAgICAgICAgICAgICAgICB7Li4uY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXYgPlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9Nb2RhbC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyB0YXNrLCBuZXdQcm9qZWN0IH0gZnJvbSAnLi9ncmFwaCdcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi9FZGl0YWJsZSc7XG5cbmNsYXNzIFRvZG9pdGVtIGV4dGVuZHMgQ29tcG9uZW50PHsgaXRlbTogdGFzayB9LCBhbnk+e1xuICAgIHN0YXRlID0geyBzdGF0dXM6IFwiXCIgfVxuICAgIHN1Ym1pdEVkaXQobmV3bmFtZSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMucmVuYW1lSXRlbSwgb2xkbmFtZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBuZXduYW1lIH0pXG4gICAgfVxuICAgIG9uQ2hlY2soZXYpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXYudGFyZ2V0LmNoZWNrZWQsICdjaGVja2VkJylcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmNoZWNrSXRlbSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgZG9uZTogZXYudGFyZ2V0LmNoZWNrZWQgfSlcbiAgICB9XG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdHVzOiBcImZhZGluZ1wiIH0pXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmRlbGV0ZUl0ZW0sIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUgfSksIDMwMClcblxuICAgIH1cbiAgICBwaWNrdXAoZXYpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3BpY2tlZCB1cCcpXG4gICAgICAgIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCB0aGlzLnByb3BzLml0ZW0udGl0bGUpO1xuICAgICAgICBldi50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWZsb2F0JylcbiAgICB9XG4gICAgcmVzdG9yZWlucGxhY2UoZXYpIHtcbiAgICAgICAgZXYudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2FmbG9hdCcpXG4gICAgfVxuICAgIG92ZXIoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZHJvcChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuc3ViSXRlbSwgY2hpbGQ6IHRpdGxlLCBwYXJlbnQ6IHRoaXMucHJvcHMuaXRlbS50aXRsZSB9KVxuICAgIH1cbiAgICBhZGROb3RlKCkge1xuICAgICAgICBjb25zdCBub3RlID0gcHJvbXB0KFwiV2hhdCBpcyB5b3VyIG5vdGU/XCIsIHRoaXMucHJvcHMuaXRlbS5ub3RlKVxuICAgICAgICBpZiAobm90ZSkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZE5vdGUsIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIG5vdGUgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b3VjaHN0YXJ0KGV2KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3Voc3RhcnQnLGV2KVxuICAgICAgICAvLyBldi5wZXJzaXN0KClcbiAgICAgICAgZXYudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FmbG9hdCcpICAgICAgICBcbiAgICB9XG4gICAgdG91Y2htb3ZlKGV2KXtcbiAgICAgICAgY29uc29sZS5sb2coJ21vdmluZycsZXYpXG4gICAgICAgIGV2LnBlcnNpc3QoKVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZXYudG91Y2hlc1swXVxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbilcbiAgICAgICAgZXYudGFyZ2V0LnN0eWxlLmxlZnQgPSBsb2NhdGlvbi5wYWdlWCtcInB4XCI7XG4gICAgICAgIGV2LnRhcmdldC5zdHlsZS50b3AgPSBsb2NhdGlvbi5wYWdlWStcInB4XCI7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtIFwiICsgKGl0ZW0uY29tcGxldGVkID8gXCJjb21wbGV0ZWRcIiA6IFwiXCIpICsgc3RhdHVzfVxuICAgICAgICAgICAgb25EcmFnT3Zlcj17ZXYgPT4gdGhpcy5vdmVyKGV2KX1cbiAgICAgICAgICAgIG9uRHJvcD17KGV2KSA9PiB0aGlzLmRyb3AoZXYpfT5cbiAgICAgICAgICAgIHtpdGVtLmNvbXBsZXRlZCAmJiA8aW1nIGNsYXNzTmFtZT1cImRyYWdnZXJcIiBzcmM9XCJodHRwczovL2NkbjQuaWNvbmZpbmRlci5jb20vZGF0YS9pY29ucy93aXJlY29ucy1mcmVlLXZlY3Rvci1pY29ucy8zMi9tZW51LWFsdC0yNTYucG5nXCJcbiAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGV2KSA9PiB0aGlzLnBpY2t1cChldil9XG4gICAgICAgICAgICAgICAgb25EcmFnRW5kPXtldiA9PiB0aGlzLnJlc3RvcmVpbnBsYWNlKGV2KX1cbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9e2V2ID0+IHRoaXMudG91Y2hzdGFydChldil9XG4gICAgICAgICAgICAgICAgb25Ub3VjaE1vdmVDYXB0dXJlPXtldj0+dGhpcy50b3VjaG1vdmUoZXYpfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9e2V2PT50aGlzLnJlc3RvcmVpbnBsYWNlKGV2KX1cbiAgICAgICAgICAgID48L2ltZz59XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT17aXRlbS50aXRsZX0gY2hlY2tlZD17aXRlbS5jb21wbGV0ZWR9IG9uQ2xpY2s9e2V2ID0+IHRoaXMub25DaGVjayhldil9IC8+XG4gICAgICAgICAgICA8RWRpdGFibGUgc2F2ZT17dHh0ID0+IHRoaXMuc3VibWl0RWRpdCh0eHQpfT57aXRlbS50aXRsZX08L0VkaXRhYmxlPlxuICAgICAgICAgICAgPGkgb25DbGljaz17KCkgPT4gdGhpcy5hZGROb3RlKCl9PvCfk4Q8L2k+XG4gICAgICAgICAgICA8aSBvbkNsaWNrPXsoKSA9PiB0aGlzLnJlbW92ZSgpfT7wn5eRPC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PiB7XG4gICAgc3RhdGUgPSB7IGNoaWxkcmVuOiBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QuY2hpbGRyZW4gfVxuICAgIG5ld3RpdGxlID0gXCJcIlxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY2hpbGRyZW46IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdC5jaGlsZHJlbiB9KVxuICAgICAgICApXG4gICAgfVxuXG4gICAgdHlwaW5nTmV3SXRlbShldikge1xuICAgICAgICBjb25zdCBuZXd0aXRsZSA9IGV2LnRhcmdldC52YWx1ZS5yZXBsYWNlKC9cXG4vZywgXCJcIilcbiAgICAgICAgdGhpcy5uZXd0aXRsZSA9IG5ld3RpdGxlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0eXBpbmcnLCBuZXd0aXRsZSlcbiAgICB9XG4gICAgYWRkSXRlbShuZXd0aXRsZSA9IHRoaXMubmV3dGl0bGUpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZEl0ZW0sIHRpdGxlOiBuZXd0aXRsZSB9KVxuICAgIH1cbiAgICBlbnRlcihldikge1xuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSXRlbSgpXG4gICAgICAgICAgICBldi50YXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImFkZGl0ZW1cIiB0eXBlPVwidGV4dFwiIG9uSW5wdXQ9eyhldikgPT4gdGhpcy50eXBpbmdOZXdJdGVtKGV2KX0gb25LZXlVcD17ZXYgPT4gdGhpcy5lbnRlcihldil9IHBsYWNlaG9sZGVyPVwiQWRkIGFuIGl0ZW1cIiAvPlxuICAgICAgICAgICAge2NoaWxkcmVuLm1hcChpdGVtID0+IDxUb2RvaXRlbSBpdGVtPXtpdGVtfSBrZXk9e2l0ZW0udGl0bGV9IC8+KX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksIHRhc2s+e1xuICAgIHN0YXRlID0geyAuLi5zdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0U3RhdGUoc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0KSlcbiAgICB9XG4gICAgcHJvamVjdE5vdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBwcm9tcHQoXCJXaGF0IGlzIHlvdXIgbm90ZT9cIiwgdGhpcy5zdGF0ZS5ub3RlKVxuICAgICAgICBpZiAobm90ZSkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZFByb2pOb3Rlcywgbm90ZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgdGl0bGUgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG9kb2xpc3RzXCI+XG4gICAgICAgICAgICA8aSBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb2plY3ROb3RlKCl9PvCfk4Q8L2k+XG4gICAgICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XG4gICAgICAgICAgICA8VG9kb0xpc3QgY2hpbGRyZW49e2NoaWxkcmVufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVG9kby50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGZ1bmN0aW9uIEVkaXRhYmxlKHsgc2F2ZSwgY2hpbGRyZW4gfSkge1xuICAgIGZ1bmN0aW9uIGlucHV0KGV2KSB7XG4gICAgICAgIC8vIGVudGVyIHRvIHN1Ym1pdCwgb3RoZXJ3aXNlIGp1c3QgZG8gbm90aGluZ1xuICAgICAgICBjb25zdCBuZXduYW1lID0gZXYudGFyZ2V0LnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBzYXZlKG5ld25hbWUpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXduYW1lLFwic2F2ZWRcIilcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gPHAgb25LZXlEb3duPXtpbnB1dH0+e2NoaWxkcmVufTwvcD5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9FZGl0YWJsZS50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IERldGFpbEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJztcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9EYXRhZmxvdyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wcG9ydHVuaXR5IGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksYW55PntcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwib3Bwb3J0dW5pdGllc1wiPlxuICAgICAgICAgICAgPGgxPk9wcG9ydHVuaXRpZXM8L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRlcmVzdGluZ2NvbnRyaWJ1dG9yc1wiPlxuICAgICAgICAgICAgICAgIDxoMj5Db250cmlidXRvcnMgeW91IG1pZ2h0IGJlIGludGVyZXN0ZWQgaW48L2gyPlxuICAgICAgICAgICAgICAgIHtzdG9yZS5nZXRTdGF0ZSgpLmludGVyZXN0aW5nQXV0aG9ycy5tYXAoKHtuYW1lfSk9PjxEZXRhaWxBdXRob3IgYXV0aG9yPXtuYW1lfSBrZXk9e25hbWV9Lz4pfVxuICAgICAgICAgICAgICAgIDxwPkNvbm5lY3Qgd2l0aCByZWNvbW1lbmRhdGlvbiBhbGdvcml0aG0gb2YgMTBrIENvZmZlZTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDI+VXBjb21pbmcgcHJvamVjdHMgdGhhdCBkZW1hbmQgeW91ciBza2lsbHM8L2gyPlxuICAgICAgICAgICAgICAgIDxwPkNvbm5lY3Qgd2l0aCBSQkMgaW50ZXJuYWwgam9iIHBvc3Rpbmc8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJzb3VyY2VSb290IjoiIn0=