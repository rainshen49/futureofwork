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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTc1ZDlkNDM0OGY3NDU4OTRmYmUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL0dyYXBoLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9UYWcudHN4Iiwid2VicGFjazovLy8uL3RzLyQudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvc2VhcmNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vdHMvS0IudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vdHMvTW9kYWwudHN4Iiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Iiwid2VicGFjazovLy8uL3RzL0VkaXRhYmxlLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9PcHBvcnR1bml0eS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLHVCOzs7Ozs7Ozs7QUNDQSx3Q0FBbUM7QUFDbkMsdUNBQW9HO0FB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QUMsSUFBSSxFQUFDLEtBQUcsb0JBQUMscUJBQVksSUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDNUYscUZBQTBELENBQ3hEO1lBQ047Z0JBQ0ksNEVBQWtEO2dCQUNsRCx1RUFBNEMsQ0FDMUMsQ0FDSjtJQUNWLENBQUM7Q0FDSjtBQWZELDhCQWVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE3NWQ5ZDQzNDhmNzQ1ODk0ZmJlIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IG5ld1Byb2plY3QsIHRhc2ssIGNvbXBsZXRlLCBjYW5jZWwsIHJlbW92ZUNoaWxkLCBhZGRDaGlsZCwgYWRkVGFnLCBzZXROb3RlIH0gZnJvbSAnLi9HcmFwaCdcblxuaW50ZXJmYWNlIGNvbnRyaWJ1dGVyIHtcbiAgICB0YWdzOiBzdHJpbmdbXSxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgU3RvcmVTdGF0ZSB7XG4gICAgcHJvamVjdD86IHRhc2ssXG4gICAgY3VycmVudEF1dGhvcj86IGNvbnRyaWJ1dGVyLFxuICAgIGtub3dsZWRnZWJhc2U/OiB0YXNrW10sXG4gICAgaW50ZXJlc3RpbmdBdXRob3JzPzogY29udHJpYnV0ZXJbXVxufVxuXG5jb25zdCBpbml0aWFsU3RhdGU6IFN0b3JlU3RhdGUgPSB7XG4gICAgcHJvamVjdDogbmV3UHJvamVjdChcIk1ha2UgR3JlZW4gVGVhIEZyYXBwY2lub1wiLCBcIkxpbmdrYWkgU2hlblwiKSxcbiAgICBjdXJyZW50QXV0aG9yOiB7XG4gICAgICAgIHRhZ3M6IFsnY29vaycsICdyZWFjdCddLFxuICAgICAgICBlbWFpbDogXCJzbGs0OUBsaXZlLmNuXCIsXG4gICAgICAgIG5hbWU6IFwiTGluZ2thaSBTaGVuXCJcbiAgICB9LFxuICAgIGtub3dsZWRnZWJhc2U6IFtcbiAgICAgICAgeyBcInRpdGxlXCI6IFwiTWFrZSB3YWZmbGVcIiwgXCJhdXRob3JcIjogXCJUZWFtIFJlbWlcIiwgXCJjaGlsZHJlblwiOiBbeyBcInRpdGxlXCI6IFwicG91ciBvbnRvIHRoZSB3YWZmbGUgaXJvbiwgd2FpdCAybWluXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW3sgXCJ0aXRsZVwiOiBcIm1peCBmbG91ciwgYmFraW5nIHBvd2RlciwgZWdncyBldGNcIiwgXCJhdXRob3JcIjogXCJUZWFtIFJlbWlcIiwgXCJjaGlsZHJlblwiOiBbXSwgXCJub3RlXCI6IFwiXCIsIFwiY29tcGxldGVkXCI6IHRydWUsIFwidGFnc1wiOiBbXSB9LCB7IFwidGl0bGVcIjogXCJ3aGlwIGNyZWFtXCIsIFwiYXV0aG9yXCI6IFwiVGVhbSBSZW1pXCIsIFwiY2hpbGRyZW5cIjogW10sIFwibm90ZVwiOiBcIlVzZSBhbiBlbGVjdHJvbmljIHdoaXNrIHRvIHdoaXAgMzUlIGNyZWFtIHVudGlsIGl0IGJlY29tZXMgcHVmZnlcIiwgXCJjb21wbGV0ZWRcIjogdHJ1ZSwgXCJ0YWdzXCI6IFtdIH1dLCBcIm5vdGVcIjogXCJcIiwgXCJjb21wbGV0ZWRcIjogdHJ1ZSwgXCJ0YWdzXCI6IFtdIH1dLCBcIm5vdGVcIjogXCJOZWVkIGVsZWN0cm9uaWMgd2hpc2sgYW5kIHdhZmZsZSBpcm9uXCIsIFwiY29tcGxldGVkXCI6IGZhbHNlLCBcInRhZ3NcIjogW1wiYnJlYWtmYXN0XCIsIFwicmVhY3RcIl0gfVxuICAgIF0sXG4gICAgaW50ZXJlc3RpbmdBdXRob3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhZ3M6IFsnY29vaycsICdyZWFjdCddLFxuICAgICAgICAgICAgZW1haWw6IFwidGVhbUByZW1pLmNvbVwiLFxuICAgICAgICAgICAgbmFtZTogXCJUZWFtIFJlbWlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0YWdzOiBbJ2Nvb2snLCAnZGVzaWduJ10sXG4gICAgICAgICAgICBlbWFpbDogXCJlbWlseUByYmMuY2FcIixcbiAgICAgICAgICAgIG5hbWU6IFwiRW1pbHkgWmhhbmdcIlxuICAgICAgICB9XG4gICAgXVxufVxuXG5hZGRDaGlsZChpbml0aWFsU3RhdGUucHJvamVjdCwgbmV3UHJvamVjdChcIk1hdGNoYSB0ZWFcIiwgaW5pdGlhbFN0YXRlLmN1cnJlbnRBdXRob3IubmFtZSkpXG5cbmZ1bmN0aW9uIHJlZHVjZXIocHJldlN0YXRlOiBTdG9yZVN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IHsgW2FueTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBjb25zdCBzdGF0ZTogU3RvcmVTdGF0ZSA9IHByZXZTdGF0ZVxuICAgIGNvbnN0IHByb2plY3QgPSBzdGF0ZS5wcm9qZWN0XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgICAgICBhZGRDaGlsZChwcm9qZWN0LCBuZXdQcm9qZWN0KGFjdGlvbi50aXRsZSwgcHJvamVjdC5hdXRob3IpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInJlbmFtZUl0ZW1cIjoge1xuICAgICAgICAgICAgY29uc3QgeyBvbGRuYW1lLCBuZXduYW1lIH0gPSBhY3Rpb25cbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSBvbGRuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnRpdGxlID0gbmV3bmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiY2hlY2tJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUsIGRvbmUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSBjb21wbGV0ZShjaGlsZClcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBjYW5jZWwoY2hpbGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJkZWxldGVJdGVtXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUgfSA9IGFjdGlvblxuICAgICAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIHRoYXQgY2hpbGRcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQocHJvamVjdCwgdGFyZ2V0KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInN1Ykl0ZW1cIjoge1xuICAgICAgICAgICAgLy8gbWFrZSBhbiBpdGVtIGEgZGVwZW5kZW5jeSBvZiBhbm90aGVyXG4gICAgICAgICAgICBjb25zdCB7IHBhcmVudCwgY2hpbGQgfSA9IGFjdGlvblxuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gY2hpbGQpIHRocm93IFwiY2Fubm90IGJlIHRoZSBzYW1lIGl0ZW1cIlxuICAgICAgICAgICAgbGV0IHBhcmVudGl0ZW0sIGNoaWxkaXRlbTtcbiAgICAgICAgICAgIHByb2plY3QuY2hpbGRyZW4uZm9yRWFjaChjaCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoLnRpdGxlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50aXRlbSA9IGNoXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaC50aXRsZSA9PT0gY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRpdGVtID0gY2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYWRkQ2hpbGQocGFyZW50aXRlbSwgY2hpbGRpdGVtKVxuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQocHJvamVjdCwgY2hpbGRpdGVtKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFkZFRhZ1wiOiB7XG4gICAgICAgICAgICBjb25zdCB7IG5ld3RhZyB9ID0gYWN0aW9uXG4gICAgICAgICAgICBhZGRUYWcocHJvamVjdCwgbmV3dGFnKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcInB1Ymxpc2hcIjoge1xuICAgICAgICAgICAgc3RhdGUua25vd2xlZGdlYmFzZS5wdXNoKHN0YXRlLnByb2plY3QpXG4gICAgICAgICAgICAvLyBhZGQgdGhhdCB0YWcgdG8gdGhlIGF1dGhvciBhcyB3ZWxsXG4gICAgICAgICAgICBjb25zdCBhdXRob3IgPSBzdGF0ZS5jdXJyZW50QXV0aG9yXG4gICAgICAgICAgICBhdXRob3IudGFncy5wdXNoKC4uLnByb2plY3QudGFncylcbiAgICAgICAgICAgIGF1dGhvci50YWdzID0gQXJyYXkuZnJvbShuZXcgU2V0KGF1dGhvci50YWdzKSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGRQcm9qTm90ZXNcIjoge1xuICAgICAgICAgICAgc2V0Tm90ZShwcm9qZWN0LCBhY3Rpb24ubm90ZSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhZGROb3RlXCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUsIG5vdGUgfSA9IGFjdGlvblxuICAgICAgICAgICAgcHJvamVjdC5jaGlsZHJlbi5mb3JFYWNoKGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2gudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldE5vdGUoY2gsIG5vdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJpbXBvcnRQcm9qZWN0XCI6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IGFjdGlvblxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZD0+e1xuICAgICAgICAgICAgICAgIGFkZENoaWxkKHN0YXRlLnByb2plY3QsY2hpbGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICAgIFwiaW1wb3J0UHJvamVjdFwiOiB7XG4gICAgICAgIHR5cGU6IFwiaW1wb3J0UHJvamVjdFwiLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICB9LFxuICAgIFwiYWRkSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkSXRlbVwiLFxuICAgICAgICB0aXRsZTogXCJcIlxuICAgIH0sXG4gICAgXCJyZW5hbWVJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJyZW5hbWVJdGVtXCJcbiAgICB9LFxuICAgIFwiY2hlY2tJdGVtXCI6IHtcbiAgICAgICAgdHlwZTogXCJjaGVja0l0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGRvbmU6IGZhbHNlXG4gICAgfSxcbiAgICBcImRlbGV0ZUl0ZW1cIjoge1xuICAgICAgICB0eXBlOiBcImRlbGV0ZUl0ZW1cIixcbiAgICAgICAgdGl0bGU6IFwiXCJcbiAgICB9LFxuICAgIFwic3ViSXRlbVwiOiB7XG4gICAgICAgIHR5cGU6IFwic3ViSXRlbVwiLFxuICAgICAgICBwYXJlbnQ6IFwiXCIsXG4gICAgICAgIGNoaWxkOiBcIlwiXG4gICAgfSxcbiAgICBcImFkZFRhZ1wiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkVGFnXCIsXG4gICAgICAgIG5ld3RhZzogXCJcIlxuICAgIH0sXG4gICAgXCJwdWJsaXNoXCI6IHtcbiAgICAgICAgdHlwZTogXCJwdWJsaXNoXCIsXG4gICAgfSxcbiAgICBcImFkZFByb2pOb3Rlc1wiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkUHJvak5vdGVzXCJcbiAgICB9LFxuICAgIFwiYWRkTm90ZVwiOiB7XG4gICAgICAgIHR5cGU6IFwiYWRkTm90ZVwiLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgbm90ZTogXCJcIlxuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuc3RvcmUuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpKVxuT2JqZWN0LmFzc2lnbih3aW5kb3csIHsgYWN0aW9ucywgc3RvcmUgfSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9EYXRhZmxvdy50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgc3RvcmUsIGFjdGlvbnMgfSBmcm9tICcuL0RhdGFmbG93J1xuaW1wb3J0IHsgVGFnIH0gZnJvbSAnLi9UYWcnXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vTW9kYWwnXG5pbXBvcnQgeyBzZWFyY2hUb3AgfSBmcm9tICcuL3NlYXJjaGVyJztcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIERldGFpbEF1dGhvcih7IGF1dGhvciB9KSB7XG4gICAgY29uc3QgeyB0YWdzLCBlbWFpbCB9ID0gWy4uLnN0b3JlLmdldFN0YXRlKCkuaW50ZXJlc3RpbmdBdXRob3JzLCBzdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3JdXG4gICAgICAgIC5maWx0ZXIoKHsgbmFtZSB9KSA9PiBuYW1lID09PSBhdXRob3IpWzBdXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYXV0aG9yZGV0YWlsXCI+XG4gICAgICAgIDxoMT57YXV0aG9yfTwvaDE+XG4gICAgICAgIHt0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgPGEgaHJlZj17XCJtYWlsdG86XCIgKyBlbWFpbH0gPntlbWFpbH08L2E+XG4gICAgICAgIDxoMj5Db250cmlidXRpb25zOjwvaDI+XG4gICAgICAgIHtnZXRBdXRob3JQcm9qZWN0cyhhdXRob3IpLm1hcCh0aXRsZSA9PiA8ZGl2IGtleT17dGl0bGV9Pnt0aXRsZX08L2Rpdj4pfVxuICAgIDwvZGl2PlxufVxuXG5leHBvcnQgY2xhc3MgQXV0aG9yIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGF1dGhvcjogc3RyaW5nIH0sIHsgZGV0YWlsOiBib29sZWFuIH0+IHtcbiAgICBzdGF0ZSA9IHsgZGV0YWlsOiBmYWxzZSB9XG4gICAgc2hvd0RldGFpbChldikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGV0YWlsOiB0cnVlIH0pXG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkZXRhaWw6IGZhbHNlIH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBhdXRob3IgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBkZXRhaWwgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcImF1dGhvclwifSBvbkNsaWNrPXtldiA9PiB0aGlzLnNob3dEZXRhaWwoZXYpfT5cbiAgICAgICAgICAgIHthdXRob3IudG9VcHBlckNhc2UoKS5zcGxpdCgnICcpLm1hcChhdSA9PiBhdVswXSl9XG4gICAgICAgICAgICB7ZGV0YWlsICYmXG4gICAgICAgICAgICAgICAgPE1vZGFsIGV4aXQ9eygpID0+IHRoaXMuaGlkZSgpfT5cbiAgICAgICAgICAgICAgICAgICAgPERldGFpbEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz5cbiAgICAgICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEF1dGhvclByb2plY3RzKGF1dGhvcikge1xuICAgIHJldHVybiBzZWFyY2hUb3Aoc3RvcmUuZ2V0U3RhdGUoKS5rbm93bGVkZ2ViYXNlLCB7XG4gICAgICAgIGtleTogXCJhdXRob3JcIixcbiAgICAgICAgbWF0Y2hlcjogbmV3IFJlZ0V4cChhdXRob3IpXG4gICAgfSkubWFwKHByb2plY3QgPT4gcHJvamVjdC50aXRsZSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9BdXRob3IudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJ1xuaW1wb3J0IHsgVGFnIH0gZnJvbSAnLi9UYWcnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi8kJztcblxuZXhwb3J0IGludGVyZmFjZSB0YXNrIHtcbiAgICBcInRpdGxlXCI6IHN0cmluZyxcbiAgICBcImF1dGhvclwiOiBzdHJpbmcsXG4gICAgXCJjb21wbGV0ZWRcIjogYm9vbGVhbixcbiAgICBcImNoaWxkcmVuXCI/OiB0YXNrW10sXG4gICAgXCJub3RlXCI/OiBzdHJpbmcsXG4gICAgXCJ0YWdzXCI/OiBzdHJpbmdbXVxufVxuLy8gdXNlIGNvbXBvbmVudCBuZXN0aW5nIHRvIGdldCBhIGdyYXBoXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGF1dGhvcjogc3RyaW5nKTogdGFzayB7XG4gICAgY29uc3QgUHJvamVjdCA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvcixcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBub3RlOiBcIlwiLFxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICB0YWdzOiBbXVxuICAgIH1cbiAgICByZXR1cm4gUHJvamVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGxldGUocHJvaikge1xuICAgIHByb2ouY29tcGxldGVkID0gdHJ1ZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbChwcm9qKSB7XG4gICAgcHJvai5jb21wbGV0ZWQgPSBmYWxzZVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNldGl0bGUocHJvaiwgbmV3VGl0bGUpIHtcbiAgICBwcm9qLnRpdGxlID0gbmV3VGl0bGVcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRDaGlsZChwcm9qLCBjaGlsZDogdGFzaykge1xuICAgIHByb2ouY2hpbGRyZW4ucHVzaChjaGlsZClcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDaGlsZChwcm9qLCBjaGlsZDogdGFzaykge1xuICAgIHByb2ouY2hpbGRyZW4uc3BsaWNlKHByb2ouY2hpbGRyZW4uaW5kZXhPZihjaGlsZCksIDEpXG59XG5leHBvcnQgZnVuY3Rpb24gc2V0Tm90ZShwcm9qLCBuZXdOb3RlKSB7XG4gICAgcHJvai5ub3RlID0gbmV3Tm90ZVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRhZyhwcm9qLCB0YWc6IHN0cmluZykge1xuICAgIHByb2oudGFncy5wdXNoKHRhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lVGFzayhwcm9qKXtcbiAgICAvLyBtYWtlIGEgc2hhbGxvdyBjb3B5IG9mIGEgdGFzaywgd2l0aCBubyBjaGlsZHJlbiBhbmQgdW5jb21wbGV0ZWRcbiAgICBjb25zdCBuZXdwcm9qOnRhc2sgPSB7Li4ucHJvan1cbiAgICBuZXdwcm9qLmNoaWxkcmVuPVtdXG4gICAgbmV3cHJvai5jb21wbGV0ZWQ9ZmFsc2VcbiAgICBuZXdwcm9qLnRhZ3M9bmV3cHJvai50YWdzLnNsaWNlKDApXG4gICAgcmV0dXJuIG5ld3Byb2pcbn1cblxuY2xhc3MgVGFzayBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyB0c2s6IHRhc2sgfSwgeyBleHBhbmRlZDogYm9vbGVhbiB9PntcbiAgICBzdGF0ZSA9IHsgZXhwYW5kZWQ6IHRydWUgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0c2sgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCBjaGlsZHJlbiwgbm90ZSwgdGFncyB9ID0gdHNrXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRhc2tcIj5cbiAgICAgICAgICAgIDxoMj57dGl0bGV9PC9oMj5cbiAgICAgICAgICAgIHsvKiA8QXV0aG9yIGF1dGhvcj17YXV0aG9yfSAvPiAqL31cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkICYmIGNoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgICAgICA8cD57bm90ZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3QgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+IHtcbiAgICBzdGF0ZSA9IHsgcHVibGlzaGVkOiBmYWxzZSB9XG4gICAgYWRkVGFnKGV2KSB7XG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgY29uc3QgbmV3dGFnID0gZXYudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBldi50YXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkVGFnLCBuZXd0YWcgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaXNoKCkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnB1Ymxpc2gpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwdWJsaXNoZWQ6IHRydWUgfSlcbiAgICB9XG4gICAgaW1wb3J0KCl7XG4gICAgICAgICQoJ2FbaHJlZj1cIiNQcm9qZWN0XCJdJykuY2xpY2soKVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7Li4uYWN0aW9ucy5pbXBvcnRQcm9qZWN0LGNoaWxkcmVuOmltcG9ydFByb2plY3QodGhpcy5wcm9wcyl9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGF1dGhvciwgY2hpbGRyZW4sIG5vdGUsIHRhZ3MsbW9kZT1cImxvY2FsXCIgfSA9IHRoaXMucHJvcHMgYXMgYW55XG4gICAgICAgIGNvbnN0IHsgcHVibGlzaGVkIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3QgdGFza1wiPlxuICAgICAgICAgICAgPGgxPnt0aXRsZX08L2gxPlxuICAgICAgICAgICAgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz5cbiAgICAgICAgICAgIHttb2RlLmluY2x1ZGVzKFwibG9jYWxcIikgJiYgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcmltYXJ5XCIgb25DbGljaz17KCkgPT4gdGhpcy5wdWJsaXNoKCl9IGRpc2FibGVkPXtwdWJsaXNoZWR9PntwdWJsaXNoZWQgPyBcIkRvbmUg4pyUXCIgOiBcIlB1Ymxpc2gg4qyGXCJ9PC9idXR0b24+fVxuICAgICAgICAgICAge21vZGUuaW5jbHVkZXMoXCJsb2NhbFwiKSAmJiA8YnV0dG9uPkRvd25sb2FkIOKshzwvYnV0dG9uPn1cbiAgICAgICAgICAgIHttb2RlLmluY2x1ZGVzKFwib25saW5lXCIpICYmIDxidXR0b24gY2xhc3NOYW1lPVwicHJpbWFyeVwiIG9uQ2xpY2s9eygpPT50aGlzLmltcG9ydCgpfT5JbXBvcnQg4qyHPC9idXR0b24+fVxuICAgICAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5ld3RhZ1wiIHBsYWNlaG9sZGVyPVwibmV3IHRhZ1wiIG9uS2V5VXA9eyhldikgPT4gdGhpcy5hZGRUYWcoZXYpfSAvPlxuICAgICAgICAgICAgPHA+e25vdGV9PC9wPlxuICAgICAgICAgICAge2NoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE92ZXJ2aWV3IGV4dGVuZHMgQ29tcG9uZW50PGFueSwgdGFzaz57XG4gICAgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3RcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHN0b3JlLmdldFN0YXRlKCkucHJvamVjdClcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPFByb2plY3Qgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0UHJvamVjdChwcm9qZWN0KXtcbiAgICAvLyBmbGF0dGVuIGEgd2hvbGUgcHJvamVjdCBhbmQgbWFyayBlYWNoIGNoaWxkIGFzIGluY29tcGxldGVcbiAgICBjb25zdCBjaGlsZHJlbj1bXVxuICAgIHRyYXZlcnNlKHByb2plY3QuY2hpbGRyZW4sY2hpbGRyZW4pXG4gICAgcmV0dXJuIGNoaWxkcmVuXG59XG5cbmZ1bmN0aW9uIHRyYXZlcnNlKGNoaWxkcmVuLHRhcmdldCl7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZD0+e1xuICAgICAgICB0YXJnZXQucHVzaChjbG9uZVRhc2soY2hpbGQpKVxuICAgICAgICB0cmF2ZXJzZShjaGlsZC5jaGlsZHJlbix0YXJnZXQpXG4gICAgfSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9HcmFwaC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9EYXRhZmxvdyc7XG4vLyByZW5kZXJzIGEgbmljZSBibG9jayBvZiB0aGUgYXV0aG9yJ3MgaW5pdGlhbHNcbmV4cG9ydCBmdW5jdGlvbiBUYWcoeyB0YWcgfTogeyB0YWc6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgbXl0YWdzOiBhbnkgfCBzdHJpbmdbXSA9IHN0b3JlLmdldFN0YXRlKCkuY3VycmVudEF1dGhvci50YWdzXG4gICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17XCJ0YWdcIiArIChteXRhZ3MuaW5jbHVkZXModGFnKSA/XCIgaG90XCI6XCJcIil9Pnt0YWd9PC9zcGFuPlxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL1RhZy50c3giLCJcbmV4cG9ydCBmdW5jdGlvbiAkKHNlbGVjdG9yKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIHJldHVybiAocmVzdWx0Lmxlbmd0aCA9PT0gMSkgPyByZXN1bHRbMF0gOiByZXN1bHRcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy8kLnRzIiwiaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vZ3JhcGgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5IHtcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtYXRjaGVyOiBSZWdFeHBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFRvcChLQjogdGFza1tdLCBxdWVyeTogUXVlcnkpIHtcbiAgICAvLyBwdXQgdG9nZXRoZXIgYSBsaXN0IG9mIHJlbGV2YW50IHByb2plY3RzXG4gICAgcmV0dXJuIEtCLmZpbHRlcihwcm9qID0+IHNlYXJjaE9uZShwcm9qLCBxdWVyeSkpXG59XG5cbmZ1bmN0aW9uIHNlYXJjaE9uZSh0YXNrOiB0YXNrLCBxdWVyeSkge1xuICAgIC8vIGZpbmQgaW4gb25lIHByb2plY3QgYW5kIGFsbCBpdHMgY2hpbGRyZW4gaWYgaXQgZXhpc3RcbiAgICBjb25zdCB7IGtleSwgbWF0Y2hlciB9ID0gcXVlcnlcbiAgICBpZiAodGFza1trZXldLm1hdGNoKG1hdGNoZXIpKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRhc2suY2hpbGRyZW4uc29tZShjaGlsZCA9PiBzZWFyY2hPbmUoY2hpbGQsIHF1ZXJ5KSlcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShxdWVyeXN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBxdWVyeXN0cmluZy5zcGxpdCgnJicpXG4gICAgICAgICAgICAubWFwKHFyeSA9PiBxcnkuc3BsaXQoJz0nKSlcbiAgICAgICAgICAgIC5tYXAocSA9PiAoe1xuICAgICAgICAgICAgICAgIGtleTogcVswXS50cmltKCksXG4gICAgICAgICAgICAgICAgbWF0Y2hlcjogbmV3IFJlZ0V4cChxWzFdLnRyaW0oKSlcbiAgICAgICAgICAgIH0pKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIFt7IGtleTogXCJ0aXRsZVwiLCBtYXRjaGVyOiBuZXcgUmVnRXhwKHF1ZXJ5c3RyaW5nKSB9XVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9zZWFyY2hlci50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7ICQgfSBmcm9tICcuLyQnXG5pbXBvcnQgS0IgZnJvbSBcIi4vS0JcIlxuaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJ1xuaW1wb3J0IE9wcG9ydHVuaXR5IGZyb20gJy4vT3Bwb3J0dW5pdHknXG5pbXBvcnQgeyBPdmVydmlldyB9IGZyb20gJy4vR3JhcGgnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tIFwiLi9BdXRob3JcIjtcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSBcIi4vRGF0YWZsb3dcIjtcblxuY29uc3QgYXV0aG9yID0gc3RvcmUuZ2V0U3RhdGUoKS5jdXJyZW50QXV0aG9yLm5hbWVcbmNsYXNzIEFwcCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBpdGVtczogeyBbYW55OiBzdHJpbmddOiBhbnkgfSB9LCBhbnk+IHtcbiAgICAvLyBkZWZhdWx0IHJlbmRlciB0aGUgbmV3cyBwYWdlXG4gICAgc3RhdGUgPSB7IFBhZ2U6IHRoaXMucHJvcHMuaXRlbXMuUHJvamVjdCwgY3VycmVudGxpbms6IFwiUHJvamVjdFwiIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBQYWdlLCBjdXJyZW50bGluayB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz5cblxuICAgICAgICAgICAgICAgIHtPYmplY3Qua2V5cyhpdGVtcykubWFwKG5hbWUgPT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17XCIjXCIgKyBuYW1lfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgUGFnZTogaXRlbXNbbmFtZV0sIGN1cnJlbnRsaW5rOiBuYW1lIH0pfSBrZXk9e25hbWV9IGNsYXNzTmFtZT17Y3VycmVudGxpbmsgPT09IG5hbWUgPyBcImN1cnJlbnRcIiA6IFwiXCJ9PntuYW1lfTwvYT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgICAgICA8UGFnZSAvPlxuICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbnJlbmRlcig8QXBwIGl0ZW1zPXt7IFByb2plY3Q6IFRvZG8sIE92ZXJ2aWV3LCBFeHBsb3JlOiBLQiwgQ29ubmVjdDogT3Bwb3J0dW5pdHkgfX0gLz4sICQoJyNhcHAnKSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9pbmRleC50c3giLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RET01cIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYWN0aW9ucywgc3RvcmUgfSBmcm9tIFwiLi9EYXRhZmxvd1wiXG5pbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi9HcmFwaCdcbmltcG9ydCB7IEF1dGhvciB9IGZyb20gJy4vQXV0aG9yJ1xuaW1wb3J0IHsgVGFnIH0gZnJvbSAnLi9UYWcnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vR3JhcGgnXG5pbXBvcnQgeyBzZWFyY2hUb3AsIFF1ZXJ5LCBwYXJzZSB9IGZyb20gJy4vc2VhcmNoZXInXG4vLyBUb2RvXG4vLyBTaG93IEdyYXBoXG4vLyBmb3JtYXQgb2YgdGhlIGEgbmV3cyBjb250ZW50XG4vLyB0YWdzXG5cbmV4cG9ydCBjbGFzcyBOZXdzIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx0YXNrLCB7IGV4cGFuZDogYm9vbGVhbiB9PntcbiAgICAvLyBBIG5ld3MsIG1heSBleHBhbmQgaWYgbmVjZXNzYXJ5XG4gICAgc3RhdGUgPSB7IGV4cGFuZDogZmFsc2UgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCB0YWdzLCBjaGlsZHJlbiwgbm90ZSB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGV4cGFuZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2V4cGFuZCA/IFwibmV3c2RldGFpbFwiIDogXCJuZXdzYnJpZWZcIn0gb25DbGljaz17KCkgPT4gdGhpcy5tYXliZUV4cGFuZCghZXhwYW5kKX0+XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiA8aDM+e3RpdGxlfTwvaDM+fVxuICAgICAgICAgICAgeyFleHBhbmQgJiYgPEF1dGhvciBhdXRob3I9e2F1dGhvcn0gLz59XG4gICAgICAgICAgICB7IWV4cGFuZCAmJiB0YWdzLm1hcCh0YWcgPT4gPFRhZyB0YWc9e3RhZ30ga2V5PXt0YWd9IC8+KX1cbiAgICAgICAgICAgIHshZXhwYW5kICYmIDxwPntub3RlfTwvcD59XG4gICAgICAgICAgICB7ZXhwYW5kICYmIDxQcm9qZWN0IHsuLi50aGlzLnByb3BzfSBtb2RlPVwib25saW5lXCIgLz59XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICBtYXliZUV4cGFuZChyZWFsbHkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZDogcmVhbGx5IH0pXG4gICAgfVxufVxuXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQ8eyBwcm9qZWN0czogdGFza1tdLCBzd2l0Y2hNb2RlOiBGdW5jdGlvbiB9LCB7IHJlc3VsdHM6IHRhc2tbXSB9PntcbiAgICBzdGF0ZSA9IHsgcmVzdWx0czogW10gfVxuICAgIHJlYWxUaW1lUmVzdWx0KGV2KSB7XG4gICAgICAgIGNvbnN0IGNyaXRlcmlhID0gZXYudGFyZ2V0LnZhbHVlXG4gICAgICAgIGNvbnN0IHF1ZXJpZXMgPSBwYXJzZShjcml0ZXJpYSlcbiAgICAgICAgY29uc29sZS5sb2coJ3BhcnNlZCcsIHF1ZXJpZXMpXG4gICAgICAgIGlmIChxdWVyaWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcmVzdWx0czogcXVlcmllcy5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXJjaFRvcChwcmV2LCBjdXJyKVxuICAgICAgICAgICAgICAgIH0sIHRoaXMucHJvcHMucHJvamVjdHMpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0U2VhcmNoKCkge1xuICAgICAgICB0aGlzLnByb3BzLnN3aXRjaE1vZGUodHJ1ZSlcbiAgICB9XG4gICAgc3RvcFNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zd2l0Y2hNb2RlKGZhbHNlKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcmVzdWx0czogW10gfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHJlc3VsdHMgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaGJhclwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJmaWVsZDE9UmVnRXhwXFwmZmllbGQyPVJlZ0V4cC4uLlwiXG4gICAgICAgICAgICAgICAgb25JbnB1dD17ZXYgPT4gdGhpcy5yZWFsVGltZVJlc3VsdChldil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc3RhcnRTZWFyY2goKX1cbiAgICAgICAgICAgICAgICBvbkJsdXI9eygpID0+IHRoaXMuc3RvcFNlYXJjaCgpfSAvPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly93d3cucmJjcm95YWxiYW5rLmNvbS9kdmwvdjAuMS9hc3NldHMvaW1hZ2VzL3VpL3VpLXNlYXJjaC10aGluLWJsdWUuc3ZnXCIgYWx0PVwiU2VhcmNoXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAge3Jlc3VsdHMubWFwKChyZXN1bHQsIGkpID0+IDxOZXdzIHsuLi5yZXN1bHR9IGtleT17aX0gLz4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS0IgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+e1xuICAgIHN0YXRlID0geyBwcm9qZWN0czogc3RvcmUuZ2V0U3RhdGUoKS5rbm93bGVkZ2ViYXNlLnNsaWNlKDAsIDEwKSwgc2VhcmNoaW5nOiBmYWxzZSB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2plY3RzOiBzdG9yZS5nZXRTdGF0ZSgpLmtub3dsZWRnZWJhc2Uuc2xpY2UoMCwgMTApIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHByb2plY3RzLCBzZWFyY2hpbmcgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibmV3c1wiPlxuICAgICAgICAgICAgPGgxPldoYXQncyB1cDwvaDE+XG4gICAgICAgICAgICA8U2VhcmNoIHByb2plY3RzPXtwcm9qZWN0c30gc3dpdGNoTW9kZT17KHNlYXJjaGluZykgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZyB9KX0gLz5cbiAgICAgICAgICAgIHshc2VhcmNoaW5nICYmIDxkaXY+XG4gICAgICAgICAgICAgICAge3Byb2plY3RzLm1hcCgoaXRlbSwgaSkgPT4gPE5ld3Mgey4uLml0ZW19IGtleT17aX0gLz4pfVxuICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvS0IudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWR1eDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgY2hpbGRyZW46IGFueSwgZXhpdDogRnVuY3Rpb24gfSwgYW55PntcbiAgICBiZ0NsaWNrKGV2KSB7XG4gICAgICAgIC8vIGV2LnRhcmdldC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiXG4gICAgICAgIHRoaXMucHJvcHMuZXhpdCgpXG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpICAgICAgICBcbiAgICB9XG4gICAgaW5zaWRlQ2xpY2soZXYpIHtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsYmdcIiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuYmdDbGljayhldil9IG9uU2Nyb2xsPXtldj0+ZXYuc3RvcFByb3BhZ2F0aW9uKCl9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldikgPT4gdGhpcy5pbnNpZGVDbGljayhldil9PlxuICAgICAgICAgICAgICAgIHsuLi5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2RpdiA+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL01vZGFsLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IHRhc2ssIG5ld1Byb2plY3QgfSBmcm9tICcuL2dyYXBoJ1xuaW1wb3J0IHsgc3RvcmUsIGFjdGlvbnMgfSBmcm9tICcuL0RhdGFmbG93J1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuL0VkaXRhYmxlJztcblxuY2xhc3MgVG9kb2l0ZW0gZXh0ZW5kcyBDb21wb25lbnQ8eyBpdGVtOiB0YXNrIH0sIGFueT57XG4gICAgc3RhdGUgPSB7IHN0YXR1czogXCJcIiB9XG4gICAgc3VibWl0RWRpdChuZXduYW1lKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5yZW5hbWVJdGVtLCBvbGRuYW1lOiB0aGlzLnByb3BzLml0ZW0udGl0bGUsIG5ld25hbWUgfSlcbiAgICB9XG4gICAgb25DaGVjayhldikge1xuICAgICAgICBjb25zb2xlLmxvZyhldi50YXJnZXQuY2hlY2tlZCwgJ2NoZWNrZWQnKVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuY2hlY2tJdGVtLCB0aXRsZTogdGhpcy5wcm9wcy5pdGVtLnRpdGxlLCBkb25lOiBldi50YXJnZXQuY2hlY2tlZCB9KVxuICAgIH1cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzdGF0dXM6IFwiZmFkaW5nXCIgfSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuZGVsZXRlSXRlbSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSB9KSwgMzAwKVxuXG4gICAgfVxuICAgIHBpY2t1cChldikge1xuICAgICAgICBjb25zb2xlLmxvZygncGlja2VkIHVwJylcbiAgICAgICAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIHRoaXMucHJvcHMuaXRlbS50aXRsZSk7XG4gICAgICAgIGV2LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhZmxvYXQnKVxuICAgIH1cbiAgICByZXN0b3JlaW5wbGFjZShldikge1xuICAgICAgICBldi50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYWZsb2F0JylcbiAgICB9XG4gICAgb3Zlcihldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBkcm9wKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgLi4uYWN0aW9ucy5zdWJJdGVtLCBjaGlsZDogdGl0bGUsIHBhcmVudDogdGhpcy5wcm9wcy5pdGVtLnRpdGxlIH0pXG4gICAgfVxuICAgIGFkZE5vdGUoKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBwcm9tcHQoXCJXaGF0IGlzIHlvdXIgbm90ZT9cIiwgdGhpcy5wcm9wcy5pdGVtLm5vdGUpXG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkTm90ZSwgdGl0bGU6IHRoaXMucHJvcHMuaXRlbS50aXRsZSwgbm90ZSB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHRvdWNoc3RhcnQoZXYpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RvdWhzdGFydCcsZXYpXG4gICAgICAgIC8vIGV2LnBlcnNpc3QoKVxuICAgICAgICBldi50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWZsb2F0JykgICAgICAgIFxuICAgIH1cbiAgICB0b3VjaG1vdmUoZXYpe1xuICAgICAgICBjb25zb2xlLmxvZygnbW92aW5nJyxldilcbiAgICAgICAgZXYucGVyc2lzdCgpXG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBldi50b3VjaGVzWzBdXG4gICAgICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uKVxuICAgICAgICBldi50YXJnZXQuc3R5bGUubGVmdCA9IGxvY2F0aW9uLnBhZ2VYK1wicHhcIjtcbiAgICAgICAgZXYudGFyZ2V0LnN0eWxlLnRvcCA9IGxvY2F0aW9uLnBhZ2VZK1wicHhcIjtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW0gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW0gXCIgKyAoaXRlbS5jb21wbGV0ZWQgPyBcImNvbXBsZXRlZFwiIDogXCJcIikgKyBzdGF0dXN9XG4gICAgICAgICAgICBvbkRyYWdPdmVyPXtldiA9PiB0aGlzLm92ZXIoZXYpfVxuICAgICAgICAgICAgb25Ecm9wPXsoZXYpID0+IHRoaXMuZHJvcChldil9PlxuICAgICAgICAgICAge2l0ZW0uY29tcGxldGVkICYmIDxpbWcgY2xhc3NOYW1lPVwiZHJhZ2dlclwiIHNyYz1cImh0dHBzOi8vY2RuNC5pY29uZmluZGVyLmNvbS9kYXRhL2ljb25zL3dpcmVjb25zLWZyZWUtdmVjdG9yLWljb25zLzMyL21lbnUtYWx0LTI1Ni5wbmdcIlxuICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXYpID0+IHRoaXMucGlja3VwKGV2KX1cbiAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9e2V2ID0+IHRoaXMucmVzdG9yZWlucGxhY2UoZXYpfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17ZXYgPT4gdGhpcy50b3VjaHN0YXJ0KGV2KX1cbiAgICAgICAgICAgICAgICBvblRvdWNoTW92ZUNhcHR1cmU9e2V2PT50aGlzLnRvdWNobW92ZShldil9XG4gICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17ZXY9PnRoaXMucmVzdG9yZWlucGxhY2UoZXYpfVxuICAgICAgICAgICAgPjwvaW1nPn1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPXtpdGVtLnRpdGxlfSBjaGVja2VkPXtpdGVtLmNvbXBsZXRlZH0gb25DbGljaz17ZXYgPT4gdGhpcy5vbkNoZWNrKGV2KX0gLz5cbiAgICAgICAgICAgIDxFZGl0YWJsZSBzYXZlPXt0eHQgPT4gdGhpcy5zdWJtaXRFZGl0KHR4dCl9PntpdGVtLnRpdGxlfTwvRWRpdGFibGU+XG4gICAgICAgICAgICA8aSBvbkNsaWNrPXsoKSA9PiB0aGlzLmFkZE5vdGUoKX0+8J+ThDwvaT5cbiAgICAgICAgICAgIDxpIG9uQ2xpY2s9eygpID0+IHRoaXMucmVtb3ZlKCl9PvCfl5E8L2k+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgVG9kb0xpc3QgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCBhbnk+IHtcbiAgICBzdGF0ZSA9IHsgY2hpbGRyZW46IHN0b3JlLmdldFN0YXRlKCkucHJvamVjdC5jaGlsZHJlbiB9XG4gICAgbmV3dGl0bGUgPSBcIlwiXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGlsZHJlbjogc3RvcmUuZ2V0U3RhdGUoKS5wcm9qZWN0LmNoaWxkcmVuIH0pXG4gICAgICAgIClcbiAgICB9XG5cbiAgICB0eXBpbmdOZXdJdGVtKGV2KSB7XG4gICAgICAgIGNvbnN0IG5ld3RpdGxlID0gZXYudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxuICAgICAgICB0aGlzLm5ld3RpdGxlID0gbmV3dGl0bGVcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3R5cGluZycsIG5ld3RpdGxlKVxuICAgIH1cbiAgICBhZGRJdGVtKG5ld3RpdGxlID0gdGhpcy5uZXd0aXRsZSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkSXRlbSwgdGl0bGU6IG5ld3RpdGxlIH0pXG4gICAgfVxuICAgIGVudGVyKGV2KSB7XG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5hZGRJdGVtKClcbiAgICAgICAgICAgIGV2LnRhcmdldC52YWx1ZSA9IFwiXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRkaXRlbVwiIHR5cGU9XCJ0ZXh0XCIgb25JbnB1dD17KGV2KSA9PiB0aGlzLnR5cGluZ05ld0l0ZW0oZXYpfSBvbktleVVwPXtldiA9PiB0aGlzLmVudGVyKGV2KX0gcGxhY2Vob2xkZXI9XCJBZGQgYW4gaXRlbVwiIC8+XG4gICAgICAgICAgICB7Y2hpbGRyZW4ubWFwKGl0ZW0gPT4gPFRvZG9pdGVtIGl0ZW09e2l0ZW19IGtleT17aXRlbS50aXRsZX0gLz4pfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSwgdGFzaz57XG4gICAgc3RhdGUgPSB7IC4uLnN0b3JlLmdldFN0YXRlKCkucHJvamVjdCB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpLnByb2plY3QpKVxuICAgIH1cbiAgICBwcm9qZWN0Tm90ZSgpIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IHByb21wdChcIldoYXQgaXMgeW91ciBub3RlP1wiLCB0aGlzLnN0YXRlLm5vdGUpXG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuYWRkUHJvak5vdGVzLCBub3RlIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCB0aXRsZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b2RvbGlzdHNcIj5cbiAgICAgICAgICAgIDxpIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvamVjdE5vdGUoKX0+8J+ThDwvaT5cbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxUb2RvTGlzdCBjaGlsZHJlbj17Y2hpbGRyZW59IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9Ub2RvLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZnVuY3Rpb24gRWRpdGFibGUoeyBzYXZlLCBjaGlsZHJlbiB9KSB7XG4gICAgZnVuY3Rpb24gaW5wdXQoZXYpIHtcbiAgICAgICAgLy8gZW50ZXIgdG8gc3VibWl0LCBvdGhlcndpc2UganVzdCBkbyBub3RoaW5nXG4gICAgICAgIGNvbnN0IG5ld25hbWUgPSBldi50YXJnZXQudGV4dENvbnRlbnQucmVwbGFjZSgvXFxuL2csIFwiXCIpXG4gICAgICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIHNhdmUobmV3bmFtZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld25hbWUsXCJzYXZlZFwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiA8cCBvbktleURvd249e2lucHV0fT57Y2hpbGRyZW59PC9wPlxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0VkaXRhYmxlLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRGV0YWlsQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL0RhdGFmbG93JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3Bwb3J0dW5pdHkgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PGFueSxhbnk+e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJvcHBvcnR1bml0aWVzXCI+XG4gICAgICAgICAgICA8aDE+T3Bwb3J0dW5pdGllczwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludGVyZXN0aW5nY29udHJpYnV0b3JzXCI+XG4gICAgICAgICAgICAgICAgPGgyPkNvbnRyaWJ1dG9ycyB5b3UgbWlnaHQgYmUgaW50ZXJlc3RlZCBpbjwvaDI+XG4gICAgICAgICAgICAgICAge3N0b3JlLmdldFN0YXRlKCkuaW50ZXJlc3RpbmdBdXRob3JzLm1hcCgoe25hbWV9KT0+PERldGFpbEF1dGhvciBhdXRob3I9e25hbWV9IGtleT17bmFtZX0vPil9XG4gICAgICAgICAgICAgICAgPHA+Q29ubmVjdCB3aXRoIHJlY29tbWVuZGF0aW9uIGFsZ29yaXRobSBvZiAxMGsgQ29mZmVlPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMj5VcGNvbWluZyBwcm9qZWN0cyB0aGF0IGRlbWFuZCB5b3VyIHNraWxsczwvaDI+XG4gICAgICAgICAgICAgICAgPHA+Q29ubmVjdCB3aXRoIFJCQyBpbnRlcm5hbCBqb2IgcG9zdGluZzwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvT3Bwb3J0dW5pdHkudHN4Il0sInNvdXJjZVJvb3QiOiIifQ==