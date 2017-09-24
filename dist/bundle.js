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
    project: Graph_1.newProject("Make Green Tea Frappcino", "Lingkai Shen"),
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
Graph_1.addChild(initialState.project, Graph_1.newProject("Matcha tea", initialState.currentAuthor.name));
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
        _1.$('a[href="#Project"]').click();
        Dataflow_1.store.dispatch(Object.assign({}, Dataflow_1.actions.importProject, { children: importProject(this.props) }));
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
    return React.createElement("p", { contentEditable: true, onKeyDown: input }, children);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTE2MDQyYTc4ODljOTMxZTEwZGQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL0dyYXBoLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9UYWcudHN4Iiwid2VicGFjazovLy8uL3RzLyQudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvc2VhcmNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vdHMvS0IudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL0VkaXRhYmxlLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9PcHBvcnR1bml0eS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLHVCOzs7Ozs7Ozs7QUNDQSx3Q0FBbUM7QUFDbkMsdUNBQW9HO0FB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QUMsQ0FBQyxFQUFDLElBQUksRUFBQyxLQUFHLG9CQUFDLHFCQUFZLElBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUM7Z0JBQzVGLHFGQUEwRCxDQUN4RDtZQUNOO2dCQUNJLDRFQUFrRDtnQkFDbEQsdUVBQTRDLENBQzFDLENBQ0o7SUFDVixDQUFDO0NBQ0o7QUFmRCw4QkFlQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MTYwNDJhNzg4OWM5MzFlMTBkZCIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBuZXdQcm9qZWN0LCB0YXNrLCBjb21wbGV0ZSwgY2FuY2VsLCByZW1vdmVDaGlsZCwgYWRkQ2hpbGQsIGFkZFRhZywgc2V0Tm90ZSB9IGZyb20gJy4vR3JhcGgnXG5cbmludGVyZmFjZSBjb250cmlidXRlciB7XG4gICAgdGFnczogc3RyaW5nW10sXG4gICAgZW1haWw6IHN0cmluZyxcbiAgICBuYW1lOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIFN0b3JlU3RhdGUge1xuICAgIHByb2plY3Q/OiB0YXNrLFxuICAgIGN1cnJlbnRBdXRob3I/OiBjb250cmlidXRlcixcbiAgICBrbm93bGVkZ2ViYXNlPzogdGFza1tdLFxuICAgIGludGVyZXN0aW5nQXV0aG9ycz86IGNvbnRyaWJ1dGVyW11cbn1cblxuY29uc3QgaW5pdGlhbFN0YXRlOiBTdG9yZVN0YXRlID0ge1xuICAgIHByb2plY3Q6IG5ld1Byb2plY3QoXCJNYWtlIEdyZWVuIFRlYSBGcmFwcGNpbm9cIiwgXCJMaW5na2FpIFNoZW5cIiksXG4gICAgY3VycmVudEF1dGhvcjoge1xuICAgICAgICB0YWdzOiBbJ2Nvb2snLCAncmVhY3QnXSxcbiAgICAgICAgZW1haWw6IFwic2xrNDlAbGl2ZS5jblwiLFxuICAgICAgICBuYW1lOiBcIkxpbmdrYWkgU2hlblwiXG4gICAgfSxcbiAgICBrbm93bGVkZ2ViYXNlOiBbXG4gICAgICAgIHsgXCJ0aXRsZVwiOiBcIk1ha2Ugd2FmZmxlXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW3sgXCJ0aXRsZVwiOiBcInBvdXIgb250byB0aGUgd2FmZmxlIGlyb24sIHdhaXQgMm1pblwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFt7IFwidGl0bGVcIjogXCJtaXggZmxvdXIsIGJha2luZyBwb3dkZXIsIGVnZ3MgZXRjXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW10sIFwibm90ZVwiOiBcIlwiLCBcImNvbXBsZXRlZFwiOiB0cnVlLCBcInRhZ3NcIjogW10gfSwgeyBcInRpdGxlXCI6IFwid2hpcCBjcmVhbVwiLCBcImF1dGhvclwiOiBcIlRlYW0gUmVtaVwiLCBcImNoaWxkcmVuXCI6IFtdLCBcIm5vdGVcIjogXCJVc2UgYW4gZWxlY3Ryb25pYyB3aGlzayB0byB3aGlwIDM1JSBjcmVhbSB1bnRpbCBpdCBiZWNvbWVzIHB1ZmZ5XCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9XSwgXCJub3RlXCI6IFwiXCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9XSwgXCJub3RlXCI6IFwiTmVlZCBlbGVjdHJvbmljIHdoaXNrIGFuZCB3YWZmbGUgaXJvblwiLCBcImNvbXBsZXRlZFwiOiBmYWxzZSwgXCJ0YWdzXCI6IFtcImJyZWFrZmFzdFwiLCBcInJlYWN0XCJdIH1cbiAgICBdLFxuICAgIGludGVyZXN0aW5nQXV0aG9yczogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0YWdzOiBbJ2Nvb2snLCAncmVhY3QnXSxcbiAgICAgICAgICAgIGVtYWlsOiBcInRlYW1AcmVtaS5jb21cIixcbiAgICAgICAgICAgIG5hbWU6IFwiVGVhbSBSZW1pXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGFnczogWydjb29rJywgJ2Rlc2lnbiddLFxuICAgICAgICAgICAgZW1haWw6IFwiZW1pbHlAcmJjLmNhXCIsXG4gICAgICAgICAgICBuYW1lOiBcIkVtaWx5IFpoYW5nXCJcbiAgICAgICAgfVxuICAgIF1cbn1cblxuYWRkQ2hpbGQoaW5pdGlhbFN0YXRlLnByb2plY3QsIG5ld1Byb2plY3QoXCJNYXRjaGEgdGVhXCIsIGluaXRpYWxTdGF0ZS5jdXJyZW50QXV0aG9yLm5hbWUpKVxuXG5mdW5jdGlvbiByZWR1Y2VyKHByZXZTdGF0ZTogU3RvcmVTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiB7IFthbnk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgY29uc3Qgc3RhdGU6IFN0b3JlU3RhdGUgPSBwcmV2U3RhdGVcbiAgICBjb25zdCBwcm9qZWN0ID0gc3RhdGUucHJvamVjdFxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcImFkZEl0ZW1cIjoge1xuICAgICAgICAgICAgYWRkQ2hpbGQocHJvamVjdCwgbmV3UHJvamVjdChhY3Rpb24udGl0bGUsIHByb2plY3QuYXV0aG9yKSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJyZW5hbWVJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb2xkbmFtZSwgbmV3bmFtZSB9ID0gYWN0aW9uXG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gb2xkbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC50aXRsZSA9IG5ld25hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImNoZWNrSXRlbVwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IHRpdGxlLCBkb25lIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkgY29tcGxldGUoY2hpbGQpXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgY2FuY2VsKGNoaWxkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiZGVsZXRlSXRlbVwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IHRpdGxlIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIGxldCB0YXJnZXQ7XG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmluZCB0aGF0IGNoaWxkXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGNoaWxkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkKHByb2plY3QsIHRhcmdldClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJzdWJJdGVtXCI6IHtcbiAgICAgICAgICAgIC8vIG1ha2UgYW4gaXRlbSBhIGRlcGVuZGVuY3kgb2YgYW5vdGhlclxuICAgICAgICAgICAgY29uc3QgeyBwYXJlbnQsIGNoaWxkIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IGNoaWxkKSB0aHJvdyBcImNhbm5vdCBiZSB0aGUgc2FtZSBpdGVtXCJcbiAgICAgICAgICAgIGxldCBwYXJlbnRpdGVtLCBjaGlsZGl0ZW07XG4gICAgICAgICAgICBwcm9qZWN0LmNoaWxkcmVuLmZvckVhY2goY2ggPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaC50aXRsZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudGl0ZW0gPSBjaFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2gudGl0bGUgPT09IGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkaXRlbSA9IGNoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGFkZENoaWxkKHBhcmVudGl0ZW0sIGNoaWxkaXRlbSlcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkKHByb2plY3QsIGNoaWxkaXRlbSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGRUYWdcIjoge1xuICAgICAgICAgICAgY29uc3QgeyBuZXd0YWcgfSA9IGFjdGlvblxuICAgICAgICAgICAgYWRkVGFnKHByb2plY3QsIG5ld3RhZylcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJwdWJsaXNoXCI6IHtcbiAgICAgICAgICAgIHN0YXRlLmtub3dsZWRnZWJhc2UucHVzaChzdGF0ZS5wcm9qZWN0KVxuICAgICAgICAgICAgLy8gYWRkIHRoYXQgdGFnIHRvIHRoZSBhdXRob3IgYXMgd2VsbFxuICAgICAgICAgICAgY29uc3QgYXV0aG9yID0gc3RhdGUuY3VycmVudEF1dGhvclxuICAgICAgICAgICAgYXV0aG9yLnRhZ3MucHVzaCguLi5wcm9qZWN0LnRhZ3MpXG4gICAgICAgICAgICBhdXRob3IudGFncyA9IEFycmF5LmZyb20obmV3IFNldChhdXRob3IudGFncykpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkUHJvak5vdGVzXCI6IHtcbiAgICAgICAgICAgIHNldE5vdGUocHJvamVjdCwgYWN0aW9uLm5vdGUpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYWRkTm90ZVwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IHRpdGxlLCBub3RlIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXROb3RlKGNoLCBub3RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiaW1wb3J0UHJvamVjdFwiOiB7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQ9PntcbiAgICAgICAgICAgICAgICBhZGRDaGlsZChzdGF0ZS5wcm9qZWN0LGNoaWxkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgICBcImltcG9ydFByb2plY3RcIjoge1xuICAgICAgICB0eXBlOiBcImltcG9ydFByb2plY3RcIixcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgfSxcbiAgICBcImFkZEl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImFkZEl0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCJcbiAgICB9LFxuICAgIFwicmVuYW1lSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwicmVuYW1lSXRlbVwiXG4gICAgfSxcbiAgICBcImNoZWNrSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiY2hlY2tJdGVtXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICBkb25lOiBmYWxzZVxuICAgIH0sXG4gICAgXCJkZWxldGVJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJkZWxldGVJdGVtXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiXG4gICAgfSxcbiAgICBcInN1Ykl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcInN1Ykl0ZW1cIixcbiAgICAgICAgcGFyZW50OiBcIlwiLFxuICAgICAgICBjaGlsZDogXCJcIlxuICAgIH0sXG4gICAgXCJhZGRUYWdcIjoge1xuICAgICAgICB0eXBlOiBcImFkZFRhZ1wiLFxuICAgICAgICBuZXd0YWc6IFwiXCJcbiAgICB9LFxuICAgIFwicHVibGlzaFwiOiB7XG4gICAgICAgIHR5cGU6IFwicHVibGlzaFwiLFxuICAgIH0sXG4gICAgXCJhZGRQcm9qTm90ZXNcIjoge1xuICAgICAgICB0eXBlOiBcImFkZFByb2pOb3Rlc1wiXG4gICAgfSxcbiAgICBcImFkZE5vdGVcIjoge1xuICAgICAgICB0eXBlOiBcImFkZE5vdGVcIixcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIG5vdGU6IFwiXCJcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcbnN0b3JlLnN1YnNjcmliZSgoKSA9PiBjb25zb2xlLmxvZyhzdG9yZS5nZXRTdGF0ZSgpKSlcbk9iamVjdC5hc3NpZ24od2luZG93LCB7IGFjdGlvbnMsIHN0b3JlIH0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvRGF0YWZsb3cudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJ1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJ1xuaW1wb3J0IHsgc2VhcmNoVG9wIH0gZnJvbSAnLi9zZWFyY2hlcic7XG4vLyByZW5kZXJzIGEgbmljZSBibG9jayBvZiB0aGUgYXV0aG9yJ3MgaW5pdGlhbHNcbmV4cG9ydCBmdW5jdGlvbiBEZXRhaWxBdXRob3IoeyBhdXRob3IgfSkge1xuICAgIGNvbnN0IHsgdGFncywgZW1haWwgfSA9IFsuLi5zdG9yZS5nZXRTdGF0ZSgpLmludGVyZXN0aW5nQXV0aG9ycywgc3RvcmUuZ2V0U3RhdGUoKS5jdXJyZW50QXV0aG9yXVxuICAgICAgICAuZmlsdGVyKCh7IG5hbWUgfSkgPT4gbmFtZSA9PT0gYXV0aG9yKVswXVxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImF1dGhvcmRldGFpbFwiPlxuICAgICAgICA8aDE+e2F1dGhvcn08L2gxPlxuICAgICAgICB7dGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgICAgIDxhIGhyZWY9e1wibWFpbHRvOlwiICsgZW1haWx9ID57ZW1haWx9PC9hPlxuICAgICAgICA8aDI+Q29udHJpYnV0aW9uczo8L2gyPlxuICAgICAgICB7Z2V0QXV0aG9yUHJvamVjdHMoYXV0aG9yKS5tYXAodGl0bGUgPT4gPGRpdiBrZXk9e3RpdGxlfT57dGl0bGV9PC9kaXY+KX1cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNsYXNzIEF1dGhvciBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBhdXRob3I6IHN0cmluZyB9LCB7IGRldGFpbDogYm9vbGVhbiB9PiB7XG4gICAgc3RhdGUgPSB7IGRldGFpbDogZmFsc2UgfVxuICAgIHNob3dEZXRhaWwoZXYpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogdHJ1ZSB9KVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGV0YWlsOiBmYWxzZSB9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgYXV0aG9yIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgZGV0YWlsIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJhdXRob3JcIn0gb25DbGljaz17ZXYgPT4gdGhpcy5zaG93RGV0YWlsKGV2KX0+XG4gICAgICAgICAgICB7YXV0aG9yLnRvVXBwZXJDYXNlKCkuc3BsaXQoJyAnKS5tYXAoYXUgPT4gYXVbMF0pfVxuICAgICAgICAgICAge2RldGFpbCAmJlxuICAgICAgICAgICAgICAgIDxNb2RhbCBleGl0PXsoKSA9PiB0aGlzLmhpZGUoKX0+XG4gICAgICAgICAgICAgICAgICAgIDxEZXRhaWxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG4gICAgICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRBdXRob3JQcm9qZWN0cyhhdXRob3IpIHtcbiAgICByZXR1cm4gc2VhcmNoVG9wKHN0b3JlLmdldFN0YXRlKCkua25vd2xlZGdlYmFzZSwge1xuICAgICAgICBrZXk6IFwiYXV0aG9yXCIsXG4gICAgICAgIG1hdGNoZXI6IG5ldyBSZWdFeHAoYXV0aG9yKVxuICAgIH0pLm1hcChwcm9qZWN0ID0+IHByb2plY3QudGl0bGUpXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvQXV0aG9yLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJ1xuaW1wb3J0IHsgc3RvcmUsIGFjdGlvbnMgfSBmcm9tICcuL0RhdGFmbG93J1xuaW1wb3J0IHsgJCB9IGZyb20gJy4vJCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgdGFzayB7XG4gICAgXCJ0aXRsZVwiOiBzdHJpbmcsXG4gICAgXCJhdXRob3JcIjogc3RyaW5nLFxuICAgIFwiY29tcGxldGVkXCI6IGJvb2xlYW4sXG4gICAgXCJjaGlsZHJlblwiPzogdGFza1tdLFxuICAgIFwibm90ZVwiPzogc3RyaW5nLFxuICAgIFwidGFnc1wiPzogc3RyaW5nW11cbn1cbi8vIHVzZSBjb21wb25lbnQgbmVzdGluZyB0byBnZXQgYSBncmFwaFxuXG5leHBvcnQgZnVuY3Rpb24gbmV3UHJvamVjdCh0aXRsZTogc3RyaW5nLCBhdXRob3I6IHN0cmluZyk6IHRhc2sge1xuICAgIGNvbnN0IFByb2plY3QgPSB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IsXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgbm90ZTogXCJcIixcbiAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgdGFnczogW11cbiAgICB9XG4gICAgcmV0dXJuIFByb2plY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBsZXRlKHByb2opIHtcbiAgICBwcm9qLmNvbXBsZXRlZCA9IHRydWVcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWwocHJvaikge1xuICAgIHByb2ouY29tcGxldGVkID0gZmFsc2Vcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRpdGxlKHByb2osIG5ld1RpdGxlKSB7XG4gICAgcHJvai50aXRsZSA9IG5ld1RpdGxlXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkQ2hpbGQocHJvaiwgY2hpbGQ6IHRhc2spIHtcbiAgICBwcm9qLmNoaWxkcmVuLnB1c2goY2hpbGQpXG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2hpbGQocHJvaiwgY2hpbGQ6IHRhc2spIHtcbiAgICBwcm9qLmNoaWxkcmVuLnNwbGljZShwcm9qLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpLCAxKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNldE5vdGUocHJvaiwgbmV3Tm90ZSkge1xuICAgIHByb2oubm90ZSA9IG5ld05vdGVcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRUYWcocHJvaiwgdGFnOiBzdHJpbmcpIHtcbiAgICBwcm9qLnRhZ3MucHVzaCh0YWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZVRhc2socHJvail7XG4gICAgLy8gbWFrZSBhIHNoYWxsb3cgY29weSBvZiBhIHRhc2ssIHdpdGggbm8gY2hpbGRyZW4gYW5kIHVuY29tcGxldGVkXG4gICAgY29uc3QgbmV3cHJvajp0YXNrID0gey4uLnByb2p9XG4gICAgbmV3cHJvai5jaGlsZHJlbj1bXVxuICAgIG5ld3Byb2ouY29tcGxldGVkPWZhbHNlXG4gICAgbmV3cHJvai50YWdzPW5ld3Byb2oudGFncy5zbGljZSgwKVxuICAgIHJldHVybiBuZXdwcm9qXG59XG5cbmNsYXNzIFRhc2sgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgdHNrOiB0YXNrIH0sIHsgZXhwYW5kZWQ6IGJvb2xlYW4gfT57XG4gICAgc3RhdGUgPSB7IGV4cGFuZGVkOiB0cnVlIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdHNrIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGF1dGhvciwgY2hpbGRyZW4sIG5vdGUsIHRhZ3MgfSA9IHRza1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0YXNrXCI+XG4gICAgICAgICAgICA8aDI+e3RpdGxlfTwvaDI+XG4gICAgICAgICAgICB7LyogPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz4gKi99XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCAmJiBjaGlsZHJlbi5tYXAoY2hpbGQgPT4gPFRhc2sgdHNrPXtjaGlsZH0ga2V5PXtjaGlsZC50aXRsZX0gLz4pfVxuICAgICAgICAgICAgPHA+e25vdGV9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PiB7XG4gICAgc3RhdGUgPSB7IHB1Ymxpc2hlZDogZmFsc2UgfVxuICAgIGFkZFRhZyhldikge1xuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld3RhZyA9IGV2LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgZXYudGFyZ2V0LnZhbHVlID0gXCJcIlxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZFRhZywgbmV3dGFnIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGlzaCgpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5wdWJsaXNoKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHVibGlzaGVkOiB0cnVlIH0pXG4gICAgfVxuICAgIGltcG9ydCgpe1xuICAgICAgICAkKCdhW2hyZWY9XCIjUHJvamVjdFwiXScpLmNsaWNrKClcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goey4uLmFjdGlvbnMuaW1wb3J0UHJvamVjdCxjaGlsZHJlbjppbXBvcnRQcm9qZWN0KHRoaXMucHJvcHMpfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3IsIGNoaWxkcmVuLCBub3RlLCB0YWdzLG1vZGU9XCJsb2NhbFwiIH0gPSB0aGlzLnByb3BzIGFzIGFueVxuICAgICAgICBjb25zdCB7IHB1Ymxpc2hlZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0IHRhc2tcIj5cbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG4gICAgICAgICAgICB7bW9kZS5pbmNsdWRlcyhcImxvY2FsXCIpICYmIDxidXR0b24gY2xhc3NOYW1lPVwicHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHRoaXMucHVibGlzaCgpfSBkaXNhYmxlZD17cHVibGlzaGVkfT57cHVibGlzaGVkID8gXCJEb25lIOKclFwiIDogXCJQdWJsaXNoIOKshlwifTwvYnV0dG9uPn1cbiAgICAgICAgICAgIHttb2RlLmluY2x1ZGVzKFwibG9jYWxcIikgJiYgPGJ1dHRvbj5Eb3dubG9hZCDirIc8L2J1dHRvbj59XG4gICAgICAgICAgICB7bW9kZS5pbmNsdWRlcyhcIm9ubGluZVwiKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT1cInByaW1hcnlcIiBvbkNsaWNrPXsoKT0+dGhpcy5pbXBvcnQoKX0+SW1wb3J0IOKshzwvYnV0dG9uPn1cbiAgICAgICAgICAgIHt0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuZXd0YWdcIiBwbGFjZWhvbGRlcj1cIm5ldyB0YWdcIiBvbktleVVwPXsoZXYpID0+IHRoaXMuYWRkVGFnKGV2KX0gLz5cbiAgICAgICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAgICAgIHtjaGlsZHJlbi5tYXAoY2hpbGQgPT4gPFRhc2sgdHNrPXtjaGlsZH0ga2V5PXtjaGlsZC50aXRsZX0gLz4pfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdmVydmlldyBleHRlbmRzIENvbXBvbmVudDxhbnksIHRhc2s+e1xuICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxQcm9qZWN0IHsuLi50aGlzLnN0YXRlfSAvPlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFByb2plY3QocHJvamVjdCl7XG4gICAgLy8gZmxhdHRlbiBhIHdob2xlIHByb2plY3QgYW5kIG1hcmsgZWFjaCBjaGlsZCBhcyBpbmNvbXBsZXRlXG4gICAgY29uc3QgY2hpbGRyZW49W11cbiAgICB0cmF2ZXJzZShwcm9qZWN0LmNoaWxkcmVuLGNoaWxkcmVuKVxuICAgIHJldHVybiBjaGlsZHJlblxufVxuXG5mdW5jdGlvbiB0cmF2ZXJzZShjaGlsZHJlbix0YXJnZXQpe1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQ9PntcbiAgICAgICAgdGFyZ2V0LnB1c2goY2xvbmVUYXNrKGNoaWxkKSlcbiAgICAgICAgdHJhdmVyc2UoY2hpbGQuY2hpbGRyZW4sdGFyZ2V0KVxuICAgIH0pXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvR3JhcGgudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vRGF0YWZsb3cnO1xuLy8gcmVuZGVycyBhIG5pY2UgYmxvY2sgb2YgdGhlIGF1dGhvcidzIGluaXRpYWxzXG5leHBvcnQgZnVuY3Rpb24gVGFnKHsgdGFnIH06IHsgdGFnOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IG15dGFnczogYW55IHwgc3RyaW5nW10gPSBzdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3IudGFnc1xuICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e1widGFnXCIgKyAobXl0YWdzLmluY2x1ZGVzKHRhZykgP1wiIGhvdFwiOlwiXCIpfT57dGFnfTwvc3Bhbj5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9UYWcudHN4IiwiXG5leHBvcnQgZnVuY3Rpb24gJChzZWxlY3Rvcikge1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEpID8gcmVzdWx0WzBdIDogcmVzdWx0XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvJC50cyIsImltcG9ydCB7IHRhc2sgfSBmcm9tICcuL2dyYXBoJztcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gICAga2V5OiBzdHJpbmcsXG4gICAgbWF0Y2hlcjogUmVnRXhwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hUb3AoS0I6IHRhc2tbXSwgcXVlcnk6IFF1ZXJ5KSB7XG4gICAgLy8gcHV0IHRvZ2V0aGVyIGEgbGlzdCBvZiByZWxldmFudCBwcm9qZWN0c1xuICAgIHJldHVybiBLQi5maWx0ZXIocHJvaiA9PiBzZWFyY2hPbmUocHJvaiwgcXVlcnkpKVxufVxuXG5mdW5jdGlvbiBzZWFyY2hPbmUodGFzazogdGFzaywgcXVlcnkpIHtcbiAgICAvLyBmaW5kIGluIG9uZSBwcm9qZWN0IGFuZCBhbGwgaXRzIGNoaWxkcmVuIGlmIGl0IGV4aXN0XG4gICAgY29uc3QgeyBrZXksIG1hdGNoZXIgfSA9IHF1ZXJ5XG4gICAgaWYgKHRhc2tba2V5XS5tYXRjaChtYXRjaGVyKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0YXNrLmNoaWxkcmVuLnNvbWUoY2hpbGQgPT4gc2VhcmNoT25lKGNoaWxkLCBxdWVyeSkpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UocXVlcnlzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gcXVlcnlzdHJpbmcuc3BsaXQoJyYnKVxuICAgICAgICAgICAgLm1hcChxcnkgPT4gcXJ5LnNwbGl0KCc9JykpXG4gICAgICAgICAgICAubWFwKHEgPT4gKHtcbiAgICAgICAgICAgICAgICBrZXk6IHFbMF0udHJpbSgpLFxuICAgICAgICAgICAgICAgIG1hdGNoZXI6IG5ldyBSZWdFeHAocVsxXS50cmltKCkpXG4gICAgICAgICAgICB9KSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBbeyBrZXk6IFwidGl0bGVcIiwgbWF0Y2hlcjogbmV3IFJlZ0V4cChxdWVyeXN0cmluZykgfV1cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvc2VhcmNoZXIudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi8kJ1xuaW1wb3J0IEtCIGZyb20gXCIuL0tCXCJcbmltcG9ydCBUb2RvIGZyb20gJy4vVG9kbydcbmltcG9ydCBPcHBvcnR1bml0eSBmcm9tICcuL09wcG9ydHVuaXR5J1xuaW1wb3J0IHsgT3ZlcnZpZXcgfSBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSBcIi4vQXV0aG9yXCI7XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gXCIuL0RhdGFmbG93XCI7XG5cbmNvbnN0IGF1dGhvciA9IHN0b3JlLmdldFN0YXRlKCkuY3VycmVudEF1dGhvci5uYW1lXG5jbGFzcyBBcHAgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgaXRlbXM6IHsgW2FueTogc3RyaW5nXTogYW55IH0gfSwgYW55PiB7XG4gICAgLy8gZGVmYXVsdCByZW5kZXIgdGhlIG5ld3MgcGFnZVxuICAgIHN0YXRlID0geyBQYWdlOiB0aGlzLnByb3BzLml0ZW1zLlByb2plY3QsIGN1cnJlbnRsaW5rOiBcIlByb2plY3RcIiB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgUGFnZSwgY3VycmVudGxpbmsgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+XG5cbiAgICAgICAgICAgICAgICB7T2JqZWN0LmtleXMoaXRlbXMpLm1hcChuYW1lID0+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wiICsgbmFtZX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFBhZ2U6IGl0ZW1zW25hbWVdLCBjdXJyZW50bGluazogbmFtZSB9KX0ga2V5PXtuYW1lfSBjbGFzc05hbWU9e2N1cnJlbnRsaW5rID09PSBuYW1lID8gXCJjdXJyZW50XCIgOiBcIlwifT57bmFtZX08L2E+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPFBhZ2UgLz5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5yZW5kZXIoPEFwcCBpdGVtcz17eyBQcm9qZWN0OiBUb2RvLCBPdmVydmlldywgRXhwbG9yZTogS0IsIENvbm5lY3Q6IE9wcG9ydHVuaXR5IH19IC8+LCAkKCcjYXBwJykpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvaW5kZXgudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0RE9NXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGFjdGlvbnMsIHN0b3JlIH0gZnJvbSBcIi4vRGF0YWZsb3dcIlxuaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vR3JhcGgnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vVGFnJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IHsgc2VhcmNoVG9wLCBRdWVyeSwgcGFyc2UgfSBmcm9tICcuL3NlYXJjaGVyJ1xuLy8gVG9kb1xuLy8gU2hvdyBHcmFwaFxuLy8gZm9ybWF0IG9mIHRoZSBhIG5ld3MgY29udGVudFxuLy8gdGFnc1xuXG5leHBvcnQgY2xhc3MgTmV3cyBleHRlbmRzIFB1cmVDb21wb25lbnQ8dGFzaywgeyBleHBhbmQ6IGJvb2xlYW4gfT57XG4gICAgLy8gQSBuZXdzLCBtYXkgZXhwYW5kIGlmIG5lY2Vzc2FyeVxuICAgIHN0YXRlID0geyBleHBhbmQ6IGZhbHNlIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGF1dGhvciwgdGFncywgY2hpbGRyZW4sIG5vdGUgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBleHBhbmQgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtleHBhbmQgPyBcIm5ld3NkZXRhaWxcIiA6IFwibmV3c2JyaWVmXCJ9IG9uQ2xpY2s9eygpID0+IHRoaXMubWF5YmVFeHBhbmQoIWV4cGFuZCl9PlxuICAgICAgICAgICAgeyFleHBhbmQgJiYgPGgzPnt0aXRsZX08L2gzPn1cbiAgICAgICAgICAgIHshZXhwYW5kICYmIDxBdXRob3IgYXV0aG9yPXthdXRob3J9IC8+fVxuICAgICAgICAgICAgeyFleHBhbmQgJiYgdGFncy5tYXAodGFnID0+IDxUYWcgdGFnPXt0YWd9IGtleT17dGFnfSAvPil9XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiA8cD57bm90ZX08L3A+fVxuICAgICAgICAgICAge2V4cGFuZCAmJiA8UHJvamVjdCB7Li4udGhpcy5wcm9wc30gbW9kZT1cIm9ubGluZVwiIC8+fVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgbWF5YmVFeHBhbmQocmVhbGx5KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmQ6IHJlYWxseSB9KVxuICAgIH1cbn1cblxuY2xhc3MgU2VhcmNoIGV4dGVuZHMgQ29tcG9uZW50PHsgcHJvamVjdHM6IHRhc2tbXSwgc3dpdGNoTW9kZTogRnVuY3Rpb24gfSwgeyByZXN1bHRzOiB0YXNrW10gfT57XG4gICAgc3RhdGUgPSB7IHJlc3VsdHM6IFtdIH1cbiAgICByZWFsVGltZVJlc3VsdChldikge1xuICAgICAgICBjb25zdCBjcml0ZXJpYSA9IGV2LnRhcmdldC52YWx1ZVxuICAgICAgICBjb25zdCBxdWVyaWVzID0gcGFyc2UoY3JpdGVyaWEpXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXJzZWQnLCBxdWVyaWVzKVxuICAgICAgICBpZiAocXVlcmllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdHM6IHF1ZXJpZXMucmVkdWNlKChwcmV2LCBjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hUb3AocHJldiwgY3VycilcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzLnByb2plY3RzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGFydFNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zd2l0Y2hNb2RlKHRydWUpXG4gICAgfVxuICAgIHN0b3BTZWFyY2goKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3dpdGNoTW9kZShmYWxzZSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlc3VsdHM6IFtdIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyByZXN1bHRzIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hiYXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZmllbGQxPVJlZ0V4cFxcJmZpZWxkMj1SZWdFeHAuLi5cIlxuICAgICAgICAgICAgICAgIG9uSW5wdXQ9e2V2ID0+IHRoaXMucmVhbFRpbWVSZXN1bHQoZXYpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnN0YXJ0U2VhcmNoKCl9XG4gICAgICAgICAgICAgICAgb25CbHVyPXsoKSA9PiB0aGlzLnN0b3BTZWFyY2goKX0gLz5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vd3d3LnJiY3JveWFsYmFuay5jb20vZHZsL3YwLjEvYXNzZXRzL2ltYWdlcy91aS91aS1zZWFyY2gtdGhpbi1ibHVlLnN2Z1wiIGFsdD1cIlNlYXJjaFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIHtyZXN1bHRzLm1hcCgocmVzdWx0LCBpKSA9PiA8TmV3cyB7Li4ucmVzdWx0fSBrZXk9e2l9IC8+KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtCIGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PntcbiAgICBzdGF0ZSA9IHsgcHJvamVjdHM6IHN0b3JlLmdldFN0YXRlKCkua25vd2xlZGdlYmFzZS5zbGljZSgwLCAxMCksIHNlYXJjaGluZzogZmFsc2UgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcm9qZWN0czogc3RvcmUuZ2V0U3RhdGUoKS5rbm93bGVkZ2ViYXNlLnNsaWNlKDAsIDEwKSB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0cywgc2VhcmNoaW5nIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5ld3NcIj5cbiAgICAgICAgICAgIDxoMT5XaGF0J3MgdXA8L2gxPlxuICAgICAgICAgICAgPFNlYXJjaCBwcm9qZWN0cz17cHJvamVjdHN9IHN3aXRjaE1vZGU9eyhzZWFyY2hpbmcpID0+IHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmcgfSl9IC8+XG4gICAgICAgICAgICB7IXNlYXJjaGluZyAmJiA8ZGl2PlxuICAgICAgICAgICAgICAgIHtwcm9qZWN0cy5tYXAoKGl0ZW0sIGkpID0+IDxOZXdzIHsuLi5pdGVtfSBrZXk9e2l9IC8+KX1cbiAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0tCLnRzeCIsIm1vZHVsZS5leHBvcnRzID0gUmVkdXg7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGNoaWxkcmVuOiBhbnksIGV4aXQ6IEZ1bmN0aW9uIH0sIGFueT57XG4gICAgYmdDbGljayhldikge1xuICAgICAgICAvLyBldi50YXJnZXQuc3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICB0aGlzLnByb3BzLmV4aXQoKVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKSAgICAgICAgXG4gICAgfVxuICAgIGluc2lkZUNsaWNrKGV2KSB7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJtb2RhbGJnXCIgb25DbGljaz17KGV2KSA9PiB0aGlzLmJnQ2xpY2soZXYpfSBvblNjcm9sbD17ZXY9PmV2LnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuaW5zaWRlQ2xpY2soZXYpfT5cbiAgICAgICAgICAgICAgICB7Li4uY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXYgPlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9Nb2RhbC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyB0YXNrLCBuZXdQcm9qZWN0IH0gZnJvbSAnLi9ncmFwaCdcbmltcG9ydCB7IHN0b3JlLCBhY3Rpb25zIH0gZnJvbSAnLi9EYXRhZmxvdydcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi9FZGl0YWJsZSc7XG5cbmNsYXNzIFRvZG9pdGVtIGV4dGVuZHMgQ29tcG9uZW50PHsgaXRlbTogdGFzayB9LCBhbnk+e1xuICAgIHN0YXRlID0geyBzdGF0dXM6IFwiXCIgfVxuICAgIHN1Ym1pdEVkaXQobmV3bmFtZSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMucmVuYW1lSXRlbSwgb2xkbmFtZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBuZXduYW1lIH0pXG4gICAgfVxuICAgIG9uQ2hlY2soZXYpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXYudGFyZ2V0LmNoZWNrZWQsICdjaGVja2VkJylcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmNoZWNrSXRlbSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgZG9uZTogZXYudGFyZ2V0LmNoZWNrZWQgfSlcbiAgICB9XG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdHVzOiBcImZhZGluZ1wiIH0pXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmRlbGV0ZUl0ZW0sIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUgfSksIDMwMClcblxuICAgIH1cbiAgICBwaWNrdXAoZXYpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3BpY2tlZCB1cCcpXG4gICAgICAgIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCB0aGlzLnByb3BzLml0ZW0udGl0bGUpO1xuICAgICAgICBldi50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWZsb2F0JylcbiAgICB9XG4gICAgcmVzdG9yZWlucGxhY2UoZXYpIHtcbiAgICAgICAgZXYudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2FmbG9hdCcpXG4gICAgfVxuICAgIG92ZXIoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZHJvcChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuc3ViSXRlbSwgY2hpbGQ6IHRpdGxlLCBwYXJlbnQ6IHRoaXMucHJvcHMuaXRlbS50aXRsZSB9KVxuICAgIH1cbiAgICBhZGROb3RlKCkge1xuICAgICAgICBjb25zdCBub3RlID0gcHJvbXB0KFwiV2hhdCBpcyB5b3VyIG5vdGU/XCIsIHRoaXMucHJvcHMuaXRlbS5ub3RlKVxuICAgICAgICBpZiAobm90ZSkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZE5vdGUsIHRpdGxlOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIG5vdGUgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b3VjaHN0YXJ0KGV2KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3Voc3RhcnQnLGV2KVxuICAgICAgICAvLyBldi5wZXJzaXN0KClcbiAgICAgICAgZXYudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FmbG9hdCcpICAgICAgICBcbiAgICB9XG4gICAgdG91Y2htb3ZlKGV2KXtcbiAgICAgICAgY29uc29sZS5sb2coJ21vdmluZycsZXYpXG4gICAgICAgIGV2LnBlcnNpc3QoKVxuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZXYudG91Y2hlc1swXVxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbilcbiAgICAgICAgZXYudGFyZ2V0LnN0eWxlLmxlZnQgPSBsb2NhdGlvbi5wYWdlWCtcInB4XCI7XG4gICAgICAgIGV2LnRhcmdldC5zdHlsZS50b3AgPSBsb2NhdGlvbi5wYWdlWStcInB4XCI7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtIFwiICsgKGl0ZW0uY29tcGxldGVkID8gXCJjb21wbGV0ZWRcIiA6IFwiXCIpICsgc3RhdHVzfVxuICAgICAgICAgICAgb25EcmFnT3Zlcj17ZXYgPT4gdGhpcy5vdmVyKGV2KX1cbiAgICAgICAgICAgIG9uRHJvcD17KGV2KSA9PiB0aGlzLmRyb3AoZXYpfT5cbiAgICAgICAgICAgIHtpdGVtLmNvbXBsZXRlZCAmJiA8aW1nIGNsYXNzTmFtZT1cImRyYWdnZXJcIiBzcmM9XCJodHRwczovL2NkbjQuaWNvbmZpbmRlci5jb20vZGF0YS9pY29ucy93aXJlY29ucy1mcmVlLXZlY3Rvci1pY29ucy8zMi9tZW51LWFsdC0yNTYucG5nXCJcbiAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGV2KSA9PiB0aGlzLnBpY2t1cChldil9XG4gICAgICAgICAgICAgICAgb25EcmFnRW5kPXtldiA9PiB0aGlzLnJlc3RvcmVpbnBsYWNlKGV2KX1cbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9e2V2ID0+IHRoaXMudG91Y2hzdGFydChldil9XG4gICAgICAgICAgICAgICAgb25Ub3VjaE1vdmVDYXB0dXJlPXtldj0+dGhpcy50b3VjaG1vdmUoZXYpfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9e2V2PT50aGlzLnJlc3RvcmVpbnBsYWNlKGV2KX1cbiAgICAgICAgICAgID48L2ltZz59XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT17aXRlbS50aXRsZX0gY2hlY2tlZD17aXRlbS5jb21wbGV0ZWR9IG9uQ2xpY2s9e2V2ID0+IHRoaXMub25DaGVjayhldil9IC8+XG4gICAgICAgICAgICA8RWRpdGFibGUgc2F2ZT17dHh0ID0+IHRoaXMuc3VibWl0RWRpdCh0eHQpfT57aXRlbS50aXRsZX08L0VkaXRhYmxlPlxuICAgICAgICAgICAgPGkgb25DbGljaz17KCkgPT4gdGhpcy5hZGROb3RlKCl9PvCfk4Q8L2k+XG4gICAgICAgICAgICA8aSBvbkNsaWNrPXsoKSA9PiB0aGlzLnJlbW92ZSgpfT7wn5eRPC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgYW55PiB7XG4gICAgc3RhdGUgPSB7IGNoaWxkcmVuOiBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QuY2hpbGRyZW4gfVxuICAgIG5ld3RpdGxlID0gXCJcIlxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY2hpbGRyZW46IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdC5jaGlsZHJlbiB9KVxuICAgICAgICApXG4gICAgfVxuXG4gICAgdHlwaW5nTmV3SXRlbShldikge1xuICAgICAgICBjb25zdCBuZXd0aXRsZSA9IGV2LnRhcmdldC52YWx1ZS5yZXBsYWNlKC9cXG4vZywgXCJcIilcbiAgICAgICAgdGhpcy5uZXd0aXRsZSA9IG5ld3RpdGxlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0eXBpbmcnLCBuZXd0aXRsZSlcbiAgICB9XG4gICAgYWRkSXRlbShuZXd0aXRsZSA9IHRoaXMubmV3dGl0bGUpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZEl0ZW0sIHRpdGxlOiBuZXd0aXRsZSB9KVxuICAgIH1cbiAgICBlbnRlcihldikge1xuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSXRlbSgpXG4gICAgICAgICAgICBldi50YXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImFkZGl0ZW1cIiB0eXBlPVwidGV4dFwiIG9uSW5wdXQ9eyhldikgPT4gdGhpcy50eXBpbmdOZXdJdGVtKGV2KX0gb25LZXlVcD17ZXYgPT4gdGhpcy5lbnRlcihldil9IHBsYWNlaG9sZGVyPVwiQWRkIGFuIGl0ZW1cIiAvPlxuICAgICAgICAgICAge2NoaWxkcmVuLm1hcChpdGVtID0+IDxUb2RvaXRlbSBpdGVtPXtpdGVtfSBrZXk9e2l0ZW0udGl0bGV9IC8+KX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksIHRhc2s+e1xuICAgIHN0YXRlID0geyAuLi5zdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0U3RhdGUoc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0KSlcbiAgICB9XG4gICAgcHJvamVjdE5vdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBwcm9tcHQoXCJXaGF0IGlzIHlvdXIgbm90ZT9cIiwgdGhpcy5zdGF0ZS5ub3RlKVxuICAgICAgICBpZiAobm90ZSkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyAuLi5hY3Rpb25zLmFkZFByb2pOb3Rlcywgbm90ZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgdGl0bGUgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG9kb2xpc3RzXCI+XG4gICAgICAgICAgICA8aSBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb2plY3ROb3RlKCl9PvCfk4Q8L2k+XG4gICAgICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XG4gICAgICAgICAgICA8VG9kb0xpc3QgY2hpbGRyZW49e2NoaWxkcmVufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVG9kby50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGZ1bmN0aW9uIEVkaXRhYmxlKHsgc2F2ZSwgY2hpbGRyZW4gfSkge1xuICAgIGZ1bmN0aW9uIGlucHV0KGV2KSB7XG4gICAgICAgIC8vIGVudGVyIHRvIHN1Ym1pdCwgb3RoZXJ3aXNlIGp1c3QgZG8gbm90aGluZ1xuICAgICAgICBjb25zdCBuZXduYW1lID0gZXYudGFyZ2V0LnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxuICAgICAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBzYXZlKG5ld25hbWUpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXduYW1lLFwic2F2ZWRcIilcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gPHAgY29udGVudEVkaXRhYmxlIG9uS2V5RG93bj17aW5wdXR9PntjaGlsZHJlbn08L3A+XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvRWRpdGFibGUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBEZXRhaWxBdXRob3IgfSBmcm9tICcuL0F1dGhvcic7XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vRGF0YWZsb3cnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHBvcnR1bml0eSBleHRlbmRzIFB1cmVDb21wb25lbnQ8YW55LGFueT57XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm9wcG9ydHVuaXRpZXNcIj5cbiAgICAgICAgICAgIDxoMT5PcHBvcnR1bml0aWVzPC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50ZXJlc3Rpbmdjb250cmlidXRvcnNcIj5cbiAgICAgICAgICAgICAgICA8aDI+Q29udHJpYnV0b3JzIHlvdSBtaWdodCBiZSBpbnRlcmVzdGVkIGluPC9oMj5cbiAgICAgICAgICAgICAgICB7c3RvcmUuZ2V0U3RhdGUoKS5pbnRlcmVzdGluZ0F1dGhvcnMubWFwKCh7bmFtZX0pPT48RGV0YWlsQXV0aG9yIGF1dGhvcj17bmFtZX0ga2V5PXtuYW1lfS8+KX1cbiAgICAgICAgICAgICAgICA8cD5Db25uZWN0IHdpdGggcmVjb21tZW5kYXRpb24gYWxnb3JpdGhtIG9mIDEwayBDb2ZmZWU8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgyPlVwY29taW5nIHByb2plY3RzIHRoYXQgZGVtYW5kIHlvdXIgc2tpbGxzPC9oMj5cbiAgICAgICAgICAgICAgICA8cD5Db25uZWN0IHdpdGggUkJDIGludGVybmFsIGpvYiBwb3N0aW5nPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9PcHBvcnR1bml0eS50c3giXSwic291cmNlUm9vdCI6IiJ9