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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
    project: Graph_1.newProject("Make waffle", "Lingkai Shen"),
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
Graph_1.addChild(initialState.project, Graph_1.newProject("Buy everyting", initialState.currentAuthor.name));
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
const Modal_1 = __webpack_require__(11);
const searcher_1 = __webpack_require__(5);
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
            React.createElement("h1", null, title),
            React.createElement(Author_1.Author, { author: author }),
            React.createElement("button", { className: "primary", onClick: () => this.publish(), disabled: published }, published ? "Done ✔" : "Publish ⬆"),
            React.createElement("button", null, "Download \u2B07"),
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const react_dom_1 = __webpack_require__(7);
const _1 = __webpack_require__(8);
const KB_1 = __webpack_require__(9);
const Todo_1 = __webpack_require__(12);
const Opportunity_1 = __webpack_require__(13);
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
react_dom_1.render(React.createElement(App, { items: { Project: Todo_1.default, Overview: Graph_1.Overview, Explore: KB_1.default, Opportunity: Opportunity_1.default } }), _1.$('#app'));


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function $(selector) {
    var result = document.querySelectorAll(selector);
    return (result.length === 1) ? result[0] : result;
}
exports.$ = $;


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
const searcher_1 = __webpack_require__(5);
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
            item.completed && React.createElement("img", { className: "dragger", src: "https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png", onDragStart: (ev) => this.pickup(ev) }),
            React.createElement("input", { type: "checkbox", name: item.title, checked: item.completed, onClick: ev => this.onCheck(ev) }),
            React.createElement("p", { contentEditable: true, onKeyUp: (ev) => this.submitEdit(ev) }, item.title),
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
                React.createElement("h2", null, "Teams that demand your skills"),
                React.createElement("p", null, "Connect with RBC internal job posting")));
    }
}
exports.default = Opportunity;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjhjNzFlODcwOTY5Y2FkNWEzZDEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL0dyYXBoLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9UYWcudHN4Iiwid2VicGFjazovLy8uL3RzL3NlYXJjaGVyLnRzIiwid2VicGFjazovLy8uL3RzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIiwid2VicGFjazovLy8uL3RzLyQudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvS0IudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsdUI7Ozs7Ozs7OztBQ0NBLHdDQUFtQztBQUNuQyx1Q0FBb0c7QUFlcEcsTUFBTSxZQUFZLEdBQWU7SUFDN0IsT0FBTyxF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TTtRQUNGLE1BQU0sQ0FBQyw2QkFBSyxTQUFTLEVBQUMsZUFBZTtZQUNqQyxnREFBc0I7WUFDdEIsNkJBQUssU0FBUyxFQUFDLHlCQUF5QjtnQkFDcEMsMEVBQWdEO2dCQUMvQyxnQkFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUcsb0JBQUMscUJBQVksSUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDNUYscUZBQTBELENBQ3hEO1lBQ047Z0JBQ0ksZ0VBQXNDO2dCQUN0Qyx1RUFBNEMsQ0FDMUMsQ0FDSjtJQUNWLENBQUM7Q0FDSjtBQWZELDhCQWVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY4YzcxZTg3MDk2OWNhZDVhM2QxIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IG5ld1Byb2plY3QsIHRhc2ssIGNvbXBsZXRlLCBjYW5jZWwsIHJlbW92ZUNoaWxkLCBhZGRDaGlsZCwgYWRkVGFnLCBzZXROb3RlIH0gZnJvbSAnLi9HcmFwaCdcblxuaW50ZXJmYWNlIGNvbnRyaWJ1dGVyIHtcbiAgICB0YWdzOiBzdHJpbmdbXSxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgU3RvcmVTdGF0ZSB7XG4gICAgcHJvamVjdD86IHRhc2ssXG4gICAgY3VycmVudEF1dGhvcj86IGNvbnRyaWJ1dGVyLFxuICAgIGtub3dsZWRnZWJhc2U/OiB0YXNrW10sXG4gICAgaW50ZXJlc3RpbmdBdXRob3JzPzogY29udHJpYnV0ZXJbXVxufVxuXG5jb25zdCBpbml0aWFsU3RhdGU6IFN0b3JlU3RhdGUgPSB7XG4gICAgcHJvamVjdDogbmV3UHJvamVjdChcIk1ha2Ugd2FmZmxlXCIsIFwiTGluZ2thaSBTaGVuXCIpLFxuICAgIGN1cnJlbnRBdXRob3I6IHtcbiAgICAgICAgdGFnczogWydjb29rJywgJ3JlYWN0J10sXG4gICAgICAgIGVtYWlsOiBcInNsazQ5QGxpdmUuY25cIixcbiAgICAgICAgbmFtZTogXCJMaW5na2FpIFNoZW5cIlxuICAgIH0sXG4gICAga25vd2xlZGdlYmFzZTogW1xuICAgICAgICB7IFwidGl0bGVcIjogXCJNYWtlIHdhZmZsZVwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFt7IFwidGl0bGVcIjogXCJwb3VyIG9udG8gdGhlIHdhZmZsZSBpcm9uLCB3YWl0IDJtaW5cIiwgXCJhdXRob3JcIjogXCJUZWFtIFJlbWlcIiwgXCJjaGlsZHJlblwiOiBbeyBcInRpdGxlXCI6IFwibWl4IGZsb3VyLCBiYWtpbmcgcG93ZGVyLCBlZ2dzIGV0Y1wiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFtdLCBcIm5vdGVcIjogXCJcIiwgXCJjb21wbGV0ZWRcIjogdHJ1ZSwgXCJ0YWdzXCI6IFtdIH0sIHsgXCJ0aXRsZVwiOiBcIndoaXAgY3JlYW1cIiwgXCJhdXRob3JcIjogXCJUZWFtIFJlbWlcIiwgXCJjaGlsZHJlblwiOiBbXSwgXCJub3RlXCI6IFwiVXNlIGFuIGVsZWN0cm9uaWMgd2hpc2sgdG8gd2hpcCAzNSUgY3JlYW0gdW50aWwgaXQgYmVjb21lcyBwdWZmeVwiLCBcImNvbXBsZXRlZFwiOiB0cnVlLCBcInRhZ3NcIjogW10gfV0sIFwibm90ZVwiOiBcIlwiLCBcImNvbXBsZXRlZFwiOiB0cnVlLCBcInRhZ3NcIjogW10gfV0sIFwibm90ZVwiOiBcIk5lZWQgZWxlY3Ryb25pYyB3aGlzayBhbmQgd2FmZmxlIGlyb25cIiwgXCJjb21wbGV0ZWRcIjogZmFsc2UsIFwidGFnc1wiOiBbXCJicmVha2Zhc3RcIiwgXCJyZWFjdFwiXSB9XG4gICAgXSxcbiAgICBpbnRlcmVzdGluZ0F1dGhvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdGFnczogWydjb29rJywgJ3JlYWN0J10sXG4gICAgICAgICAgICBlbWFpbDogXCJ0ZWFtQHJlbWkuY29tXCIsXG4gICAgICAgICAgICBuYW1lOiBcIlRlYW0gUmVtaVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhZ3M6IFsnY29vaycsICdkZXNpZ24nXSxcbiAgICAgICAgICAgIGVtYWlsOiBcImVtaWx5QHJiYy5jYVwiLFxuICAgICAgICAgICAgbmFtZTogXCJFbWlseSBaaGFuZ1wiXG4gICAgICAgIH1cbiAgICBdXG59XG5cbmFkZENoaWxkKGluaXRpYWxTdGF0ZS5wcm9qZWN0LG5ld1Byb2plY3QoXCJCdXkgZXZlcnl0aW5nXCIsaW5pdGlhbFN0YXRlLmN1cnJlbnRBdXRob3IubmFtZSkpXG5cbmZ1bmN0aW9uIHJlZHVjZXIocHJldlN0YXRlOiBTdG9yZVN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IHsgW2FueTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBjb25zdCBzdGF0ZTogU3RvcmVTdGF0ZSA9IHByZXZTdGF0ZVxuICAgIGNvbnN0IHByb2plY3QgPSBzdGF0ZS5wcm9qZWN0XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgICAgICBhZGRDaGlsZChwcm9qZWN0LCBuZXdQcm9qZWN0KGFjdGlvbi50aXRsZSwgcHJvamVjdC5hdXRob3IpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInJlbmFtZUl0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyBvbGRuYW1lLCBuZXduYW1lIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSBvbGRuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnRpdGxlID0gbmV3bmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiY2hlY2tJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUsIGRvbmUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSBjb21wbGV0ZShjaGlsZClcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBjYW5jZWwoY2hpbGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJkZWxldGVJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUgfSA9IGFjdGlvblxuICAgICAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIHRoYXQgY2hpbGRcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQocHJvamVjdCwgdGFyZ2V0KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInN1Ykl0ZW1cIjoge1xuICAgICAgICAgICAgLy8gbWFrZSBhbiBpdGVtIGEgZGVwZW5kZW5jeSBvZiBhbm90aGVyXG4gICAgICAgICAgICBjb25zdCB7IHBhcmVudCwgY2hpbGQgfSA9IGFjdGlvblxuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gY2hpbGQpIHRocm93IFwiY2Fubm90IGJlIHRoZSBzYW1lIGl0ZW1cIlxuICAgICAgICAgICAgbGV0IHBhcmVudGl0ZW0sIGNoaWxkaXRlbTtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoLnRpdGxlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50aXRlbSA9IGNoXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaC50aXRsZSA9PT0gY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRpdGVtID0gY2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYWRkQ2hpbGQocGFyZW50aXRlbSwgY2hpbGRpdGVtKVxuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQocHJvamVjdCwgY2hpbGRpdGVtKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZFRhZ1wiOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld3RhZyB9ID0gYWN0aW9uXG4gICAgICAgICAgICBhZGRUYWcocHJvamVjdCwgbmV3dGFnKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInB1Ymxpc2hcIjoge1xuICAgICAgICAgICAgc3RhdGUua25vd2xlZGdlYmFzZS5wdXNoKHN0YXRlLnByb2plY3QpXG4gICAgICAgICAgICAvLyBhZGQgdGhhdCB0YWcgdG8gdGhlIGF1dGhvciBhcyB3ZWxsXG4gICAgICAgICAgICBjb25zdCBhdXRob3IgPSBzdGF0ZS5jdXJyZW50QXV0aG9yXG4gICAgICAgICAgICBhdXRob3IudGFncy5wdXNoKC4uLnByb2plY3QudGFncylcbiAgICAgICAgICAgIGF1dGhvci50YWdzID0gQXJyYXkuZnJvbShuZXcgU2V0KGF1dGhvci50YWdzKSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGRQcm9qTm90ZXNcIjoge1xuICAgICAgICAgICAgc2V0Tm90ZShwcm9qZWN0LCBhY3Rpb24ubm90ZSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGROb3RlXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUsIG5vdGUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2gudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldE5vdGUoY2gsIG5vdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgICBcImFkZEl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImFkZEl0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCJcbiAgICB9LFxuICAgIFwicmVuYW1lSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwicmVuYW1lSXRlbVwiXG4gICAgfSxcbiAgICBcImNoZWNrSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiY2hlY2tJdGVtXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICBkb25lOiBmYWxzZVxuICAgIH0sXG4gICAgXCJkZWxldGVJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJkZWxldGVJdGVtXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiXG4gICAgfSxcbiAgICBcInN1Ykl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcInN1Ykl0ZW1cIixcbiAgICAgICAgcGFyZW50OiBcIlwiLFxuICAgICAgICBjaGlsZDogXCJcIlxuICAgIH0sXG4gICAgXCJhZGRUYWdcIjoge1xuICAgICAgICB0eXBlOiBcImFkZFRhZ1wiLFxuICAgICAgICBuZXd0YWc6IFwiXCJcbiAgICB9LFxuICAgIFwicHVibGlzaFwiOiB7XG4gICAgICAgIHR5cGU6IFwicHVibGlzaFwiLFxuICAgIH0sXG4gICAgXCJhZGRQcm9qTm90ZXNcIjoge1xuICAgICAgICB0eXBlOiBcImFkZFByb2pOb3Rlc1wiXG4gICAgfSxcbiAgICBcImFkZE5vdGVcIjoge1xuICAgICAgICB0eXBlOiBcImFkZE5vdGVcIixcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIG5vdGU6IFwiXCJcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcbnN0b3JlLnN1YnNjcmliZSgoKSA9PiBjb25zb2xlLmxvZyhzdG9yZS5nZXRTdGF0ZSgpKSlcbk9iamVjdC5hc3NpZ24od2luZG93LCB7IGFjdGlvbnMsIHN0b3JlIH0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvRGF0YWZsb3cudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJ1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJ1xuaW1wb3J0IHsgc2VhcmNoVG9wIH0gZnJvbSAnLi9zZWFyY2hlcic7XG4vLyByZW5kZXJzIGEgbmljZSBibG9jayBvZiB0aGUgYXV0aG9yJ3MgaW5pdGlhbHNcbmV4cG9ydCBmdW5jdGlvbiBEZXRhaWxBdXRob3IoeyBhdXRob3IgfSkge1xuICAgIGNvbnN0IHsgdGFncywgZW1haWwgfSA9IFsuLi5zdG9yZS5nZXRTdGF0ZSgpLmludGVyZXN0aW5nQXV0aG9ycywgc3RvcmUuZ2V0U3RhdGUoKS5jdXJyZW50QXV0aG9yXVxuICAgICAgICAuZmlsdGVyKCh7IG5hbWUgfSkgPT4gbmFtZSA9PT0gYXV0aG9yKVswXVxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImF1dGhvcmRldGFpbFwiPlxuICAgICAgICA8aDE+e2F1dGhvcn08L2gxPlxuICAgICAgICB7dGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgICAgIDxhIGhyZWY9e1wibWFpbHRvOlwiICsgZW1haWx9ID57ZW1haWx9PC9hPlxuICAgICAgICA8aDI+Q29udHJpYnV0aW9uczo8L2gyPlxuICAgICAgICB7Z2V0QXV0aG9yUHJvamVjdHMoYXV0aG9yKS5tYXAodGl0bGUgPT4gPGRpdiBrZXk9e3RpdGxlfT57dGl0bGV9PC9kaXY+KX1cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNsYXNzIEF1dGhvciBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBhdXRob3I6IHN0cmluZyB9LCB7IGRldGFpbDogYm9vbGVhbiB9PiB7XG4gICAgc3RhdGUgPSB7IGRldGFpbDogZmFsc2UgfVxuICAgIHNob3dEZXRhaWwoZXYpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogdHJ1ZSB9KVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGV0YWlsOiBmYWxzZSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgYXV0aG9yIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgZGV0YWlsIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJhdXRob3JcIn0gb25DbGljaz17ZXYgPT4gdGhpcy5zaG93RGV0YWlsKGV2KX0+XG4gICAgICAgICAgICB7YXV0aG9yLnRvVXBwZXJDYXNlKCkuc3BsaXQoJyAnKS5tYXAoYXUgPT4gYXVbMF0pfVxuICAgICAgICAgICAge2RldGFpbCAmJlxuICAgICAgICAgICAgICAgIDxNb2RhbCBleGl0PXsoKSA9PiB0aGlzLmhpZGUoKX0+XG4gICAgICAgICAgICAgICAgICAgIDxEZXRhaWxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG4gICAgICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRBdXRob3JQcm9qZWN0cyhhdXRob3IpIHtcbiAgICByZXR1cm4gc2VhcmNoVG9wKHN0b3JlLmdldFN0YXRlKCkua25vd2xlZGdlYmFzZSwge1xuICAgICAgICBrZXk6IFwiYXV0aG9yXCIsXG4gICAgICAgIG1hdGNoZXI6IG5ldyBSZWdFeHAoYXV0aG9yKVxuICAgIH0pLm1hcChwcm9qZWN0ID0+IHByb2plY3QudGl0bGUpXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvQXV0aG9yLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJ1xuaW1wb3J0IHsgc3RvcmUsIGFjdGlvbnMgfSBmcm9tICcuL0RhdGFmbG93J1xuXG5leHBvcnQgaW50ZXJmYWNlIHRhc2sge1xuICAgIFwidGl0bGVcIjogc3RyaW5nLFxuICAgIFwiYXV0aG9yXCI6IHN0cmluZyxcbiAgICBcImNvbXBsZXRlZFwiOiBib29sZWFuLFxuICAgIFwiY2hpbGRyZW5cIj86IHRhc2tbXSxcbiAgICBcIm5vdGVcIj86IHN0cmluZyxcbiAgICBcInRhZ3NcIj86IHN0cmluZ1tdXG59XG4vLyB1c2UgY29tcG9uZW50IG5lc3RpbmcgdG8gZ2V0IGEgZ3JhcGhcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1Byb2plY3QodGl0bGU6IHN0cmluZywgYXV0aG9yOiBzdHJpbmcpOiB0YXNrIHtcbiAgICBjb25zdCBQcm9qZWN0ID0ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIG5vdGU6IFwiXCIsXG4gICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgIHRhZ3M6IFtdXG4gICAgfVxuICAgIHJldHVybiBQcm9qZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV0ZShwcm9qKSB7XG4gICAgcHJvai5jb21wbGV0ZWQgPSB0cnVlXG59XG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsKHByb2opIHtcbiAgICBwcm9qLmNvbXBsZXRlZCA9IGZhbHNlXG59XG5leHBvcnQgZnVuY3Rpb24gc2V0aXRsZShwcm9qLCBuZXdUaXRsZSkge1xuICAgIHByb2oudGl0bGUgPSBuZXdUaXRsZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZENoaWxkKHByb2osIGNoaWxkOiB0YXNrKSB7XG4gICAgcHJvai5jaGlsZHJlbi5wdXNoKGNoaWxkKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNoaWxkKHByb2osIGNoaWxkOiB0YXNrKSB7XG4gICAgcHJvai5jaGlsZHJlbi5zcGxpY2UocHJvai5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSwgMSlcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXROb3RlKHByb2osIG5ld05vdGUpIHtcbiAgICBwcm9qLm5vdGUgPSBuZXdOb3RlXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkVGFnKHByb2osIHRhZzogc3RyaW5nKSB7XG4gICAgcHJvai50YWdzLnB1c2godGFnKVxufVxuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IHRzazogdGFzayB9LCB7IGV4cGFuZGVkOiBib29sZWFuIH0+e1xuICAgIHN0YXRlID0geyBleHBhbmRlZDogdHJ1ZSB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRzayB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzIH0gPSB0c2tcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGFza1wiPlxuICAgICAgICAgICAgPGgyPnt0aXRsZX08L2gyPlxuICAgICAgICAgICAgey8qIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+ICovfVxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXhwYW5kZWQgJiYgY2hpbGRyZW4ubWFwKGNoaWxkID0+IDxUYXNrIHRzaz17Y2hpbGR9IGtleT17Y2hpbGQudGl0bGV9IC8+KX1cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCBleHRlbmRzIENvbXBvbmVudDx0YXNrLCBhbnk+IHtcbiAgICBzdGF0ZSA9IHsgcHVibGlzaGVkOiBmYWxzZSB9XG4gICAgYWRkVGFnKGV2KSB7XG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgY29uc3QgbmV3dGFnID0gZXYudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBldi50YXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkVGFnLCBuZXd0YWcgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaXNoKCkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnB1Ymxpc2gpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwdWJsaXNoZWQ6IHRydWUgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgcHVibGlzaGVkIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3QgdGFza1wiPlxuICAgICAgICAgICAgPGgxPnt0aXRsZX08L2gxPlxuICAgICAgICAgICAgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHRoaXMucHVibGlzaCgpfSBkaXNhYmxlZD17cHVibGlzaGVkfT57cHVibGlzaGVkID8gXCJEb25lIOKclFwiIDogXCJQdWJsaXNoIOKshlwifTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbj5Eb3dubG9hZCDirIc8L2J1dHRvbj5cbiAgICAgICAgICAgIHt0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuZXd0YWdcIiBwbGFjZWhvbGRlcj1cIm5ldyB0YWdcIiBvbktleVVwPXsoZXYpID0+IHRoaXMuYWRkVGFnKGV2KX0gLz5cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgICAgIHtjaGlsZHJlbi5tYXAoY2hpbGQgPT4gPFRhc2sgdHNrPXtjaGlsZH0ga2V5PXtjaGlsZC50aXRsZX0gLz4pfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdmVydmlldyBleHRlbmRzIENvbXBvbmVudDxhbnksIHRhc2s+e1xuICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxQcm9qZWN0IHsuLi50aGlzLnN0YXRlfSAvPlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9HcmFwaC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9EYXRhZmxvdyc7XG4vLyByZW5kZXJzIGEgbmljZSBibG9jayBvZiB0aGUgYXV0aG9yJ3MgaW5pdGlhbHNcbmV4cG9ydCBmdW5jdGlvbiBUYWcoeyB0YWcgfTogeyB0YWc6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgbXl0YWdzOiBhbnkgfCBzdHJpbmdbXSA9IHN0b3JlLmdldFN0YXRlKCkuY3VycmVudEF1dGhvci50YWdzXG4gICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17XCJ0YWdcIiArIChteXRhZ3MuaW5jbHVkZXModGFnKSA/XCIgaG90XCI6XCJcIil9Pnt0YWd9PC9zcGFuPlxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL1RhZy50c3giLCJpbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi9ncmFwaCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnkge1xuICAgIGtleTogc3RyaW5nLFxuICAgIG1hdGNoZXI6IFJlZ0V4cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoVG9wKEtCOiB0YXNrW10sIHF1ZXJ5OiBRdWVyeSkge1xuICAgIC8vIHB1dCB0b2dldGhlciBhIGxpc3Qgb2YgcmVsZXZhbnQgcHJvamVjdHNcbiAgICByZXR1cm4gS0IuZmlsdGVyKHByb2ogPT4gc2VhcmNoT25lKHByb2osIHF1ZXJ5KSlcbn1cblxuZnVuY3Rpb24gc2VhcmNoT25lKHRhc2s6IHRhc2ssIHF1ZXJ5KSB7XG4gICAgLy8gZmluZCBpbiBvbmUgcHJvamVjdCBhbmQgYWxsIGl0cyBjaGlsZHJlbiBpZiBpdCBleGlzdFxuICAgIGNvbnN0IHsga2V5LCBtYXRjaGVyIH0gPSBxdWVyeVxuICAgIGlmICh0YXNrW2tleV0ubWF0Y2gobWF0Y2hlcikpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGFzay5jaGlsZHJlbi5zb21lKGNoaWxkID0+IHNlYXJjaE9uZShjaGlsZCwgcXVlcnkpKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHF1ZXJ5c3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5c3RyaW5nLnNwbGl0KCcmJylcbiAgICAgICAgICAgIC5tYXAocXJ5ID0+IHFyeS5zcGxpdCgnPScpKVxuICAgICAgICAgICAgLm1hcChxID0+ICh7XG4gICAgICAgICAgICAgICAga2V5OiBxWzBdLnRyaW0oKSxcbiAgICAgICAgICAgICAgICBtYXRjaGVyOiBuZXcgUmVnRXhwKHFbMV0udHJpbSgpKVxuICAgICAgICAgICAgfSkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gW3sga2V5OiBcInRpdGxlXCIsIG1hdGNoZXI6IG5ldyBSZWdFeHAocXVlcnlzdHJpbmcpIH1dXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL3NlYXJjaGVyLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IHsgJCB9IGZyb20gJy4vJCdcbmltcG9ydCBLQiBmcm9tIFwiLi9LQlwiXG5pbXBvcnQgVG9kbyBmcm9tICcuL1RvZG8nXG5pbXBvcnQgT3Bwb3J0dW5pdHkgZnJvbSAnLi9PcHBvcnR1bml0eSdcbmltcG9ydCB7IE92ZXJ2aWV3IH0gZnJvbSAnLi9HcmFwaCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gXCIuL0F1dGhvclwiO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tIFwiLi9EYXRhZmxvd1wiO1xuXG5jb25zdCBhdXRob3IgPSBzdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3IubmFtZVxuY2xhc3MgQXBwIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGl0ZW1zOiB7IFthbnk6IHN0cmluZ106IGFueSB9IH0sIGFueT4ge1xuICAgIC8vIGRlZmF1bHQgcmVuZGVyIHRoZSBuZXdzIHBhZ2VcbiAgICBzdGF0ZSA9IHsgUGFnZTogdGhpcy5wcm9wcy5pdGVtcy5Qcm9qZWN0LCBjdXJyZW50bGluazogXCJQcm9qZWN0XCIgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IFBhZ2UsIGN1cnJlbnRsaW5rIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPlxuXG4gICAgICAgICAgICAgICAge09iamVjdC5rZXlzKGl0ZW1zKS5tYXAobmFtZSA9PlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtcIiNcIiArIG5hbWV9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBQYWdlOiBpdGVtc1tuYW1lXSwgY3VycmVudGxpbms6IG5hbWUgfSl9IGtleT17bmFtZX0gY2xhc3NOYW1lPXtjdXJyZW50bGluayA9PT0gbmFtZSA/IFwiY3VycmVudFwiIDogXCJcIn0+e25hbWV9PC9hPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDxtYWluPlxuICAgICAgICAgICAgICAgIDxQYWdlIC8+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxucmVuZGVyKDxBcHAgaXRlbXM9e3sgUHJvamVjdDogVG9kbywgT3ZlcnZpZXcsIEV4cGxvcmU6IEtCLCBPcHBvcnR1bml0eSB9fSAvPiwgJCgnI2FwcCcpKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL2luZGV4LnRzeCIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3RET007XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdERPTVwiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuZXhwb3J0IGZ1bmN0aW9uICQoc2VsZWN0b3IpIHtcbiAgICB2YXIgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID09PSAxKSA/IHJlc3VsdFswXSA6IHJlc3VsdFxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzLyQudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYWN0aW9ucywgc3RvcmUgfSBmcm9tIFwiLi9EYXRhZmxvd1wiXG5pbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi9HcmFwaCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJ1xuaW1wb3J0IHsgVGFnIH0gZnJvbSAnLi9UYWcnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vR3JhcGgnXG5pbXBvcnQgeyBzZWFyY2hUb3AsIFF1ZXJ5LCBwYXJzZSB9IGZyb20gJy4vc2VhcmNoZXInXG4vLyBUb2RvXG4vLyBTaG93IEdyYXBoXG4vLyBmb3JtYXQgb2YgdGhlIGEgbmV3cyBjb250ZW50XG4vLyB0YWdzXG5cbmV4cG9ydCBjbGFzcyBOZXdzIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx0YXNrLCB7IGV4cGFuZDogYm9vbGVhbiB9PntcbiAgICAvLyBBIG5ld3MsIG1heSBleHBhbmQgaWYgbmVjZXNzYXJ5XG4gICAgc3RhdGUgPSB7IGV4cGFuZDogZmFsc2UgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCB0YWdzLCBjaGlsZHJlbiwgbm90ZSB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGV4cGFuZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2V4cGFuZCA/IFwibmV3c2RldGFpbFwiIDogXCJuZXdzYnJpZWZcIn0gb25DbGljaz17KCkgPT4gdGhpcy5tYXliZUV4cGFuZCghZXhwYW5kKX0+XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiA8aDM+e3RpdGxlfTwvaDM+fVxuICAgICAgICAgICAgeyFleHBhbmQgJiYgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz59XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiB0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgICAgIHshZXhwYW5kICYmIDxwPntub3RlfTwvcD59XG4gICAgICAgICAgICB7ZXhwYW5kICYmIDxQcm9qZWN0IHsuLi50aGlzLnByb3BzfSAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIG1heWJlRXhwYW5kKHJlYWxseSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kOiByZWFsbHkgfSlcbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIENvbXBvbmVudDx7IHByb2plY3RzOiB0YXNrW10sIHN3aXRjaE1vZGU6IEZ1bmN0aW9uIH0sIHsgcmVzdWx0czogdGFza1tdIH0+e1xuICAgIHN0YXRlID0geyByZXN1bHRzOiBbXSB9XG4gICAgcmVhbFRpbWVSZXN1bHQoZXYpIHtcbiAgICAgICAgY29uc3QgY3JpdGVyaWEgPSBldi50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3QgcXVlcmllcyA9IHBhcnNlKGNyaXRlcmlhKVxuICAgICAgICBjb25zb2xlLmxvZygncGFyc2VkJywgcXVlcmllcylcbiAgICAgICAgaWYgKHF1ZXJpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICByZXN1bHRzOiBxdWVyaWVzLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoVG9wKHByZXYsIGN1cnIpXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5wcm9qZWN0cylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnRTZWFyY2goKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3dpdGNoTW9kZSh0cnVlKVxuICAgIH1cbiAgICBzdG9wU2VhcmNoKCkge1xuICAgICAgICB0aGlzLnByb3BzLnN3aXRjaE1vZGUoZmFsc2UpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyByZXN1bHRzOiBbXSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0cyB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoYmFyXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImZpZWxkMT1SZWdFeHBcXCZmaWVsZDI9UmVnRXhwLi4uXCJcbiAgICAgICAgICAgICAgICBvbklucHV0PXtldiA9PiB0aGlzLnJlYWxUaW1lUmVzdWx0KGV2KX0gb25DbGljaz17KCkgPT4gdGhpcy5zdGFydFNlYXJjaCgpfVxuICAgICAgICAgICAgICAgIG9uQmx1cj17KCkgPT4gdGhpcy5zdG9wU2VhcmNoKCl9IC8+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL3d3dy5yYmNyb3lhbGJhbmsuY29tL2R2bC92MC4xL2Fzc2V0cy9pbWFnZXMvdWkvdWktc2VhcmNoLXRoaW4tYmx1ZS5zdmdcIiBhbHQ9XCJTZWFyY2hcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICB7cmVzdWx0cy5tYXAoKHJlc3VsdCwgaSkgPT4gPE5ld3Mgey4uLnJlc3VsdH0ga2V5PXtpfSAvPil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLQiBleHRlbmRzIENvbXBvbmVudDxhbnksIGFueT57XG4gICAgc3RhdGUgPSB7IHByb2plY3RzOiBzdG9yZS5nZXRTdGF0ZSgpLmtub3dsZWRnZWJhc2Uuc2xpY2UoMCwgMTApLCBzZWFyY2hpbmc6IGZhbHNlIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJvamVjdHM6IHN0b3JlLmdldFN0YXRlKCkua25vd2xlZGdlYmFzZS5zbGljZSgwLCAxMCkgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgcHJvamVjdHMsIHNlYXJjaGluZyB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuZXdzXCI+XG4gICAgICAgICAgICA8aDE+V2hhdCdzIHVwPC9oMT5cbiAgICAgICAgICAgIDxTZWFyY2ggcHJvamVjdHM9e3Byb2plY3RzfSBzd2l0Y2hNb2RlPXsoc2VhcmNoaW5nKSA9PiB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nIH0pfSAvPlxuICAgICAgICAgICAgeyFzZWFyY2hpbmcgJiYgPGRpdj5cbiAgICAgICAgICAgICAgICB7cHJvamVjdHMubWFwKChpdGVtLCBpKSA9PiA8TmV3cyB7Li4uaXRlbX0ga2V5PXtpfSAvPil9XG4gICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9LQi50c3giLCJtb2R1bGUuZXhwb3J0cyA9IFJlZHV4O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBjbGFzcyBNb2RhbCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBjaGlsZHJlbjogYW55LCBleGl0OiBGdW5jdGlvbiB9LCBhbnk+e1xuICAgIGJnQ2xpY2soZXYpIHtcbiAgICAgICAgLy8gZXYudGFyZ2V0LnN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgdGhpcy5wcm9wcy5leGl0KClcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCkgICAgICAgIFxuICAgIH1cbiAgICBpbnNpZGVDbGljayhldikge1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxiZ1wiIG9uQ2xpY2s9eyhldikgPT4gdGhpcy5iZ0NsaWNrKGV2KX0gb25TY3JvbGw9e2V2PT5ldi5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgb25DbGljaz17KGV2KSA9PiB0aGlzLmluc2lkZUNsaWNrKGV2KX0+XG4gICAgICAgICAgICAgICAgey4uLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2ID5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvTW9kYWwudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJ1xuaW1wb3J0IHsgdGFzaywgbmV3UHJvamVjdCB9IGZyb20gJy4vZ3JhcGgnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5cbmNsYXNzIFRvZG9pdGVtIGV4dGVuZHMgQ29tcG9uZW50PHsgaXRlbTogdGFzayB9LCBhbnk+e1xuICAgIHN1Ym1pdEVkaXQoZXYpIHtcbiAgICAgICAgY29uc3QgbmV3bmFtZSA9IGV2LnRhcmdldC50ZXh0Q29udGVudC5yZXBsYWNlKC9cXG4vZywgXCJcIilcbiAgICAgICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLnJlbmFtZUl0ZW0sIG9sZG5hbWU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgbmV3bmFtZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2hlY2soZXYpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXYudGFyZ2V0LmNoZWNrZWQsICdjaGVja2VkJylcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmNoZWNrSXRlbSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgZG9uZTogZXYudGFyZ2V0LmNoZWNrZWQgfSlcbiAgICB9XG4gICAgcmVtb3ZlKCkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuZGVsZXRlSXRlbSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSB9KVxuICAgIH1cbiAgICBwaWNrdXAoZXYpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3BpY2tlZCB1cCcpXG4gICAgICAgIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCB0aGlzLnByb3BzLml0ZW0udGl0bGUpO1xuICAgIH1cbiAgICBvdmVyKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGRyb3AoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIilcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLnN1Ykl0ZW0sIGNoaWxkOiB0aXRsZSwgcGFyZW50OiB0aGlzLnByb3BzLml0ZW0udGl0bGUgfSlcbiAgICB9XG4gICAgYWRkTm90ZSgpIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IHByb21wdChcIldoYXQgaXMgeW91ciBub3RlP1wiLCB0aGlzLnByb3BzLml0ZW0ubm90ZSlcbiAgICAgICAgaWYgKG5vdGUpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5hZGROb3RlLCB0aXRsZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBub3RlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW0gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW1cIiArIChpdGVtLmNvbXBsZXRlZCA/IFwiIGNvbXBsZXRlZFwiIDogXCJcIil9XG4gICAgICAgICAgICBvbkRyYWdPdmVyPXtldiA9PiB0aGlzLm92ZXIoZXYpfVxuICAgICAgICAgICAgb25Ecm9wPXsoZXYpID0+IHRoaXMuZHJvcChldil9PlxuICAgICAgICAgICAge2l0ZW0uY29tcGxldGVkICYmIDxpbWcgY2xhc3NOYW1lPVwiZHJhZ2dlclwiIHNyYz1cImh0dHBzOi8vY2RuNC5pY29uZmluZGVyLmNvbS9kYXRhL2ljb25zL3dpcmVjb25zLWZyZWUtdmVjdG9yLWljb25zLzMyL21lbnUtYWx0LTI1Ni5wbmdcIlxuICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXYpID0+IHRoaXMucGlja3VwKGV2KX1cbiAgICAgICAgICAgID48L2ltZz59XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT17aXRlbS50aXRsZX0gY2hlY2tlZD17aXRlbS5jb21wbGV0ZWR9IG9uQ2xpY2s9e2V2ID0+IHRoaXMub25DaGVjayhldil9IC8+XG4gICAgICAgICAgICA8cCBjb250ZW50RWRpdGFibGUgb25LZXlVcD17KGV2KSA9PiB0aGlzLnN1Ym1pdEVkaXQoZXYpfT57aXRlbS50aXRsZX08L3A+XG4gICAgICAgICAgICA8aSBvbkNsaWNrPXsoKSA9PiB0aGlzLmFkZE5vdGUoKX0+8J+ThDwvaT5cbiAgICAgICAgICAgIDxpIG9uQ2xpY2s9eygpID0+IHRoaXMucmVtb3ZlKCl9PvCfl5E8L2k+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgVG9kb0xpc3QgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+IHtcbiAgICBzdGF0ZSA9IHsgY2hpbGRyZW46IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdC5jaGlsZHJlbiB9XG4gICAgbmV3dGl0bGUgPSBcIlwiXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGlsZHJlbjogc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0LmNoaWxkcmVuIH0pXG4gICAgICAgIClcbiAgICB9XG5cbiAgICB0eXBpbmdOZXdJdGVtKGV2KSB7XG4gICAgICAgIGNvbnN0IG5ld3RpdGxlID0gZXYudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxuICAgICAgICB0aGlzLm5ld3RpdGxlID0gbmV3dGl0bGVcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3R5cGluZycsIG5ld3RpdGxlKVxuICAgIH1cbiAgICBhZGRJdGVtKG5ld3RpdGxlID0gdGhpcy5uZXd0aXRsZSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkSXRlbSwgdGl0bGU6IG5ld3RpdGxlIH0pXG4gICAgfVxuICAgIGVudGVyKGV2KSB7XG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5hZGRJdGVtKClcbiAgICAgICAgICAgIGV2LnRhcmdldC52YWx1ZSA9IFwiXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRkaXRlbVwiIHR5cGU9XCJ0ZXh0XCIgb25JbnB1dD17KGV2KSA9PiB0aGlzLnR5cGluZ05ld0l0ZW0oZXYpfSBvbktleVVwPXtldiA9PiB0aGlzLmVudGVyKGV2KX0gcGxhY2Vob2xkZXI9XCJBZGQgYW4gaXRlbVwiIC8+XG4gICAgICAgICAgICB7Y2hpbGRyZW4ubWFwKGl0ZW0gPT4gPFRvZG9pdGVtIGl0ZW09e2l0ZW19IGtleT17aXRlbS50aXRsZX0gLz4pfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSwgdGFzaz57XG4gICAgc3RhdGUgPSB7IC4uLnN0b3JlLmdldFN0YXRlKCkucHJvamVjdCB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpKVxuICAgIH1cbiAgICBwcm9qZWN0Tm90ZSgpIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IHByb21wdChcIldoYXQgaXMgeW91ciBub3RlP1wiLCB0aGlzLnN0YXRlLm5vdGUpXG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkUHJvak5vdGVzLCBub3RlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCB0aXRsZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b2RvbGlzdHNcIj5cbiAgICAgICAgICAgIDxpIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvamVjdE5vdGUoKX0+8J+ThDwvaT5cbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxUb2RvTGlzdCBjaGlsZHJlbj17Y2hpbGRyZW59IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9Ub2RvLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRGV0YWlsQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL0RhdGFmbG93JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3Bwb3J0dW5pdHkgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSxhbnk+e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJvcHBvcnR1bml0aWVzXCI+XG4gICAgICAgICAgICA8aDE+T3Bwb3J0dW5pdGllczwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludGVyZXN0aW5nY29udHJpYnV0b3JzXCI+XG4gICAgICAgICAgICAgICAgPGgyPkNvbnRyaWJ1dG9ycyB5b3UgbWlnaHQgYmUgaW50ZXJlc3RlZCBpbjwvaDI+XG4gICAgICAgICAgICAgICAge3N0b3JlLmdldFN0YXRlKCkuaW50ZXJlc3RpbmdBdXRob3JzLm1hcCgoe25hbWV9KT0+PERldGFpbEF1dGhvciBhdXRob3I9e25hbWV9IGtleT17bmFtZX0vPil9XG4gICAgICAgICAgICAgICAgPHA+Q29ubmVjdCB3aXRoIHJlY29tbWVuZGF0aW9uIGFsZ29yaXRobSBvZiAxMGsgQ29mZmVlPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMj5UZWFtcyB0aGF0IGRlbWFuZCB5b3VyIHNraWxsczwvaDI+XG4gICAgICAgICAgICAgICAgPHA+Q29ubmVjdCB3aXRoIFJCQyBpbnRlcm5hbCBqb2IgcG9zdGluZzwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvT3Bwb3J0dW5pdHkudHN4Il0sInNvdXJjZVJvb3QiOiIifQ==