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
// Todo, actually fetch feed
function reducer(prevState = { news: [], currentAuthor: { tags: [], email: "" } }, action) {
    const state = prevState;
    switch (action.type) {
        case "fetchFeed":
            state.news.push({ content: (new Date()).toString().repeat(50), authors: ["Rain"], title: "The new legend" });
            break;
        case "findAuthor": {
            state.currentAuthor = {
                tags: ["react", "pancake"],
                email: "slk49@live.cn"
            };
        }
    }
    return state;
}
exports.actions = {
    "fetchFeed": {
        type: "fetchFeed"
    },
    "findAuthor": {
        type: "findAuthor"
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
const Todo_1 = __webpack_require__(9);
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
class KB extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = Dataflow_1.store.getState();
    }
    componentDidMount() {
        Dataflow_1.store.subscribe(() => {
            console.log('changed');
            this.setState(Dataflow_1.store.getState());
        });
    }
    render() {
        const { news } = this.state;
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
const graph_1 = __webpack_require__(11);
class Todoitem extends react_1.PureComponent {
    render() {
        const { item } = this.props;
        return React.createElement("div", { className: "item" },
            React.createElement("input", { type: "checkbox", name: item.title, checked: item.completed }),
            React.createElement("p", { contentEditable: true }, item.title),
            React.createElement("button", null, "Note"),
            React.createElement("button", null, "Remove"));
    }
}
class TodoList extends react_1.PureComponent {
    render() {
        const { project } = this.props;
        const items = project.children;
        return React.createElement("div", { className: "todolists" },
            project.authors.map(author => React.createElement(Author_1.Author, { author: author, key: author })),
            React.createElement("h1", null, project.title),
            React.createElement("button", null, "Notes"),
            React.createElement("p", null, "Add an item"),
            items.map(item => React.createElement(Todoitem, { item: item, key: item.title })));
    }
}
class Todo extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { project: graph_1.newProject("Pancake", "Team Remi") };
    }
    render() {
        return React.createElement(TodoList, { project: this.state.project });
    }
}
exports.default = Todo;


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
const Tag_1 = __webpack_require__(3);
// use component nesting to get a graph
function newProject(title, author) {
    const Project = {
        title,
        authors: [author],
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
    proj.children.splice(this.children.indexOf(child));
}
exports.removeChild = removeChild;
function addAuthor(proj, author) {
    proj.authors.push(author);
}
exports.addAuthor = addAuthor;
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
        const { title, authors, children, note, tags } = tsk;
        return React.createElement("div", { className: "task" },
            React.createElement("h2", null, title),
            authors.map(author => React.createElement(Author_1.Author, { author: author, key: author })),
            this.state.expanded && children.map(child => React.createElement(Task, { tsk: child, key: child.title })),
            React.createElement("p", null, note));
    }
}
function Project({ tsk: task }) {
    const { tsk } = this.props;
    const { title, authors, children, note, tags } = tsk;
    return React.createElement("div", { className: "project task" },
        React.createElement("h2", null, title),
        authors.map(author => React.createElement(Author_1.Author, { author: author, key: author })),
        children.map(child => React.createElement(Task, { tsk: child, key: child.title })),
        React.createElement("p", null, note),
        tags.map(tag => React.createElement(Tag_1.Tag, { tag: tag, key: tag })));
}
exports.Project = Project;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDg5NGFkYWQxY2E4NWUyNjRlNjIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vLi90cy9BdXRob3IudHN4Iiwid2VicGFjazovLy8uL3RzL1RhZy50c3giLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vdHMvJC50cyIsIndlYnBhY2s6Ly8vLi90cy9LQi50c3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVkdXhcIiIsIndlYnBhY2s6Ly8vLi90cy9Ub2RvLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9Nb2RhbC50c3giLCJ3ZWJwYWNrOi8vLy4vdHMvZ3JhcGgudHN4Iiwid2VicGFjazovLy8uL3RzL09wcG9ydHVuaXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsdUI7Ozs7Ozs7OztBQ0FBLHVDQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsaUJBQWlCLFNBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUs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LENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxvQkFBQyxTQUFHLElBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFJLENBQUMsQ0FDM0M7QUFDVixDQUFDO0FBVkQsMEJBVUM7Ozs7Ozs7Ozs7QUM1RUQscUNBQThCO0FBQzlCLHVDQUFxQztBQUVyQyxpQkFBaUMsU0FBUSxxQkFBc0I7SUFDM0QsTUFBTTtRQUNGLE1BQU0sQ0FBQyxpREFBd0I7SUFDbkMsQ0FBQztDQUNKO0FBSkQsOEJBSUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDg5NGFkYWQxY2E4NWUyNjRlNjIiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4J1xuLy8gVG9kbywgYWN0dWFsbHkgZmV0Y2ggZmVlZFxuZnVuY3Rpb24gcmVkdWNlcihwcmV2U3RhdGUgPSB7IG5ld3M6IFtdLCBjdXJyZW50QXV0aG9yOiB7IHRhZ3M6IFtdLCBlbWFpbDogXCJcIiB9IH0sIGFjdGlvbjogeyBbYW55OiBzdHJpbmddOiBhbnkgfSkge1xuICAgIGNvbnN0IHN0YXRlID0gcHJldlN0YXRlXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiZmV0Y2hGZWVkXCI6XG4gICAgICAgICAgICBzdGF0ZS5uZXdzLnB1c2goeyBjb250ZW50OiAobmV3IERhdGUoKSkudG9TdHJpbmcoKS5yZXBlYXQoNTApLCBhdXRob3JzOiBbXCJSYWluXCJdLCB0aXRsZTogXCJUaGUgbmV3IGxlZ2VuZFwiIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZpbmRBdXRob3JcIjoge1xuICAgICAgICAgICAgc3RhdGUuY3VycmVudEF1dGhvciA9IHtcbiAgICAgICAgICAgICAgICB0YWdzOiBbXCJyZWFjdFwiLCBcInBhbmNha2VcIl0sXG4gICAgICAgICAgICAgICAgZW1haWw6IFwic2xrNDlAbGl2ZS5jblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICAgIFwiZmV0Y2hGZWVkXCI6IHtcbiAgICAgICAgdHlwZTogXCJmZXRjaEZlZWRcIlxuICAgIH0sXG4gICAgXCJmaW5kQXV0aG9yXCI6IHtcbiAgICAgICAgdHlwZTogXCJmaW5kQXV0aG9yXCJcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSkpXG5PYmplY3QuYXNzaWduKHdpbmRvdywgeyBhY3Rpb25zLCBzdG9yZSB9KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0RhdGFmbG93LnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdG9yZSwgYWN0aW9ucyB9IGZyb20gJy4vRGF0YWZsb3cnXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCdcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIERldGFpbEF1dGhvcih7IGF1dGhvciwgdGFncywgZW1haWwgfSkge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbCBhdXRob3JcIj5cbiAgICAgICAgPGgxPnthdXRob3J9PC9oMT5cbiAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgICAgICA8YSBocmVmPXtcIm1haWx0bzpcIiArIGVtYWlsfSA+e2VtYWlsfTwvYT5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNsYXNzIEF1dGhvciBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBhdXRob3I6IHN0cmluZyB9LCB7IGRldGFpbDogYm9vbGVhbiB9PiB7XG4gICAgc3RhdGUgPSB7IGRldGFpbDogZmFsc2UgfVxuICAgIHNob3dEZXRhaWwoZXYpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogdHJ1ZSB9KVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IC4uLmFjdGlvbnMuZmluZEF1dGhvciwgYXV0aG9yOiB0aGlzLnByb3BzLmF1dGhvciB9KVxuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGlkaW5nJylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRldGFpbDogZmFsc2UgfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGF1dGhvciB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGRldGFpbCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRob3JcIiBvbkNsaWNrPXtldiA9PiB0aGlzLnNob3dEZXRhaWwoZXYpfT4gICAgICAgIFxuICAgICAgICAgICAge2F1dGhvci50b1VwcGVyQ2FzZSgpLnNwbGl0KCcgJykubWFwKGF1ID0+IGF1WzBdKX1cbiAgICAgICAgICAgIHtkZXRhaWwgJiZcbiAgICAgICAgICAgICAgICA8TW9kYWwgZXhpdD17KCkgPT4gdGhpcy5oaWRlKCl9PlxuICAgICAgICAgICAgICAgICAgICA8RGV0YWlsQXV0aG9yIHsuLi5zdG9yZS5nZXRTdGF0ZSgpLmN1cnJlbnRBdXRob3J9IGF1dGhvcj17YXV0aG9yfS8+XG4gICAgICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL0F1dGhvci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbi8vIHJlbmRlcnMgYSBuaWNlIGJsb2NrIG9mIHRoZSBhdXRob3IncyBpbml0aWFsc1xuZXhwb3J0IGZ1bmN0aW9uIFRhZyh7IHRhZyB9OiB7IHRhZzogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwidGFnXCI+e3RhZ308L3NwYW4+XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVGFnLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7ICQgfSBmcm9tICcuLyQnXG5pbXBvcnQgS0IgZnJvbSBcIi4vS0JcIlxuaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJ1xuaW1wb3J0IE9wcG9ydHVuaXR5IGZyb20gJy4vT3Bwb3J0dW5pdHknXG5cbmNsYXNzIEFwcCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBpdGVtczogeyBbYW55OiBzdHJpbmddOiBhbnkgfSB9LCBhbnk+IHtcbiAgICAvLyBkZWZhdWx0IHJlbmRlciB0aGUgbmV3cyBwYWdlXG4gICAgc3RhdGUgPSB7IFBhZ2U6IHRoaXMucHJvcHMuaXRlbXMuUHJvamVjdCB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgUGFnZSB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykubWFwKG5hbWUgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wiICsgbmFtZX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFBhZ2U6IGl0ZW1zW25hbWVdIH0pfSBrZXk9e25hbWV9PntuYW1lfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPFBhZ2UgLz5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5yZW5kZXIoPEFwcCBpdGVtcz17eyBQcm9qZWN0OiBUb2RvLCBFeHBsb3JlOiBLQiwgT3Bwb3J0dW5pdHkgfX0gLz4sICQoJyNhcHAnKSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9pbmRleC50c3giLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RET01cIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmV4cG9ydCBmdW5jdGlvbiAkKHNlbGVjdG9yKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIHJldHVybiAocmVzdWx0Lmxlbmd0aCA9PT0gMSkgPyByZXN1bHRbMF0gOiByZXN1bHRcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy8kLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGFjdGlvbnMsIHN0b3JlIH0gZnJvbSBcIi4vRGF0YWZsb3dcIlxuLy8gVG9kb1xuLy8gU2hvdyBHcmFwaFxuLy8gZm9ybWF0IG9mIHRoZSBhIG5ld3MgY29udGVudFxuLy8gdGFnc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS0IgZXh0ZW5kcyBDb21wb25lbnQ8YW55LCB7IG5ld3M6IGFueVtdIH0+e1xuICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZWQnKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShzdG9yZS5nZXRTdGF0ZSgpKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBuZXdzIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5ld3NcIj5cbiAgICAgICAgICAgIDxoMT5XaGF0J3MgdXA8L2gxPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLmZldGNoRmVlZCl9PkZha2VGZWVkPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtuZXdzLm1hcCgoaXRlbSwgaSkgPT4gPE5ld3Mgey4uLml0ZW19IGtleT17aX0gLz4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgTmV3cyBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyB0aXRsZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGF1dGhvcnM6IHN0cmluZ1tdIH0sIHsgZXhwYW5kOiBib29sZWFuIH0+e1xuICAgIC8vIEEgbmV3cywgbWF5IGV4cGFuZCBpZiBuZWNlc3NhcnlcbiAgICBzdGF0ZSA9IHsgZXhwYW5kOiBmYWxzZSB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBjb250ZW50LCBhdXRob3JzIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHsgZXhwYW5kIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17ZXhwYW5kID8gXCJuZXdzZGV0YWlsXCIgOiBcIm5ld3NicmllZlwifSBvbkNsaWNrPXsoKSA9PiB0aGlzLm1heWJlRXhwYW5kKCFleHBhbmQpfT5cbiAgICAgICAgICAgIDxoMz57dGl0bGV9PC9oMz5cbiAgICAgICAgICAgIDxzcGFuPnthdXRob3JzLmpvaW4oJywgJyl9PC9zcGFuPlxuICAgICAgICAgICAgPHA+e2NvbnRlbnR9PC9wPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuc2hvd0dyYXBoKGV2KX0+R3JhcGg8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIG1heWJlRXhwYW5kKHJlYWxseSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kOiByZWFsbHkgfSlcbiAgICB9XG4gICAgc2hvd0dyYXBoKGV2KSB7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGNvbnN0IHsgY29udGVudCB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zb2xlLmxvZyhcInNob3dpbmdcIiwgY29udGVudClcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvS0IudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWR1eDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBBdXRob3IgfSBmcm9tICcuL0F1dGhvcidcbmltcG9ydCB7IHRhc2ssIG5ld1Byb2plY3QgfSBmcm9tICcuL2dyYXBoJ1xuXG5jbGFzcyBUb2RvaXRlbSBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBpdGVtOiB0YXNrIH0sIGFueT57XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGl0ZW0gfSA9IHRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiaXRlbVwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9e2l0ZW0udGl0bGV9IGNoZWNrZWQ9e2l0ZW0uY29tcGxldGVkfSAvPlxuICAgICAgICAgICAgPHAgY29udGVudEVkaXRhYmxlPntpdGVtLnRpdGxlfTwvcD5cbiAgICAgICAgICAgIDxidXR0b24+Tm90ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBUb2RvTGlzdCBleHRlbmRzIFB1cmVDb21wb25lbnQ8eyBwcm9qZWN0OiB0YXNrIH0sIGFueT57XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHByb2plY3QgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgaXRlbXMgPSBwcm9qZWN0LmNoaWxkcmVuXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvZG9saXN0c1wiPlxuICAgICAgICAgICAge3Byb2plY3QuYXV0aG9ycy5tYXAoYXV0aG9yID0+IDxBdXRob3IgYXV0aG9yPXthdXRob3J9IGtleT17YXV0aG9yfSAvPil9XG4gICAgICAgICAgICA8aDE+e3Byb2plY3QudGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxidXR0b24+Tm90ZXM8L2J1dHRvbj5cbiAgICAgICAgICAgIDxwPkFkZCBhbiBpdGVtPC9wPlxuICAgICAgICAgICAge2l0ZW1zLm1hcChpdGVtID0+IDxUb2RvaXRlbSBpdGVtPXtpdGVtfSBrZXk9e2l0ZW0udGl0bGV9IC8+KX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksIGFueT57XG4gICAgc3RhdGUgPSB7IHByb2plY3Q6IG5ld1Byb2plY3QoXCJQYW5jYWtlXCIsIFwiVGVhbSBSZW1pXCIpIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8VG9kb0xpc3QgcHJvamVjdD17dGhpcy5zdGF0ZS5wcm9qZWN0fSAvPlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9Ub2RvLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgY2hpbGRyZW46IGFueSwgZXhpdDogRnVuY3Rpb24gfSwgYW55PntcbiAgICBiZ0NsaWNrKGV2KSB7XG4gICAgICAgIC8vIGV2LnRhcmdldC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiXG4gICAgICAgIHRoaXMucHJvcHMuZXhpdCgpXG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpICAgICAgICBcbiAgICB9XG4gICAgaW5zaWRlQ2xpY2soZXYpIHtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsYmdcIiBvbkNsaWNrPXsoZXYpID0+IHRoaXMuYmdDbGljayhldil9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldikgPT4gdGhpcy5pbnNpZGVDbGljayhldil9PlxuICAgICAgICAgICAgICAgIHsuLi5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2RpdiA+XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL01vZGFsLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aG9yIH0gZnJvbSAnLi9BdXRob3InXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL1RhZydcblxuZXhwb3J0IGludGVyZmFjZSB0YXNrIHtcbiAgICBcInRpdGxlXCI6IHN0cmluZyxcbiAgICBcImF1dGhvcnNcIjogc3RyaW5nW11cbiAgICBcImNvbXBsZXRlZFwiOiBib29sZWFuLFxuICAgIFwiY2hpbGRyZW5cIj86IHRhc2tbXSxcbiAgICBcIm5vdGVcIj86IHN0cmluZyxcbiAgICBcInRhZ3NcIj86IHN0cmluZ1tdXG59XG4vLyB1c2UgY29tcG9uZW50IG5lc3RpbmcgdG8gZ2V0IGEgZ3JhcGhcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1Byb2plY3QodGl0bGU6IHN0cmluZywgYXV0aG9yOiBzdHJpbmcpOiB0YXNrIHtcbiAgICBjb25zdCBQcm9qZWN0ID0ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yczogW2F1dGhvcl0sXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgbm90ZTogXCJcIixcbiAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgdGFnczogW11cbiAgICB9XG4gICAgcmV0dXJuIFByb2plY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBsZXRlKHByb2opIHtcbiAgICBwcm9qLmNvbXBsZXRlZCA9IHRydWVcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWwocHJvaikge1xuICAgIHByb2ouY29tcGxldGVkID0gZmFsc2Vcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRpdGxlKHByb2osIG5ld1RpdGxlKSB7XG4gICAgcHJvai50aXRsZSA9IG5ld1RpdGxlXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkQ2hpbGRyZW4ocHJvaiwgLi4uY2hpbGRyZW46IHRhc2tbXSkge1xuICAgIHByb2ouY2hpbGRyZW4ucHVzaCguLi5jaGlsZHJlbilcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDaGlsZChwcm9qLCBjaGlsZDogdGFzaykge1xuICAgIHByb2ouY2hpbGRyZW4uc3BsaWNlKHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkpXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkQXV0aG9yKHByb2osIGF1dGhvcikge1xuICAgIHByb2ouYXV0aG9ycy5wdXNoKGF1dGhvcilcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXROb3RlKHByb2osIG5ld05vdGUpIHtcbiAgICBwcm9qLm5vdGUgPSBuZXdOb3RlXG59XG5leHBvcnQgZnVuY3Rpb24gYWRkVGFnKHByb2osIHRhZzogc3RyaW5nKSB7XG4gICAgcHJvai50YWdzLnB1c2godGFnKVxufVxuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IHRzazogdGFzayB9LCB7IGV4cGFuZGVkOiBib29sZWFuIH0+e1xuICAgIHN0YXRlID0geyBleHBhbmRlZDogdHJ1ZSB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHRzayB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBhdXRob3JzLCBjaGlsZHJlbiwgbm90ZSwgdGFncyB9ID0gdHNrXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRhc2tcIj5cbiAgICAgICAgICAgIDxoMj57dGl0bGV9PC9oMj5cbiAgICAgICAgICAgIHthdXRob3JzLm1hcChhdXRob3IgPT4gPEF1dGhvciBhdXRob3I9e2F1dGhvcn0ga2V5PXthdXRob3J9IC8+KX1cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkICYmIGNoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgICAgICA8cD57bm90ZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByb2plY3QoeyB0c2s6IHRhc2sgfSkge1xuICAgIGNvbnN0IHsgdHNrIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyB0aXRsZSwgYXV0aG9ycywgY2hpbGRyZW4sIG5vdGUsIHRhZ3MgfSA9IHRza1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3QgdGFza1wiPlxuICAgICAgICA8aDI+e3RpdGxlfTwvaDI+XG4gICAgICAgIHthdXRob3JzLm1hcChhdXRob3IgPT4gPEF1dGhvciBhdXRob3I9e2F1dGhvcn0ga2V5PXthdXRob3J9IC8+KX1cbiAgICAgICAge2NoaWxkcmVuLm1hcChjaGlsZCA9PiA8VGFzayB0c2s9e2NoaWxkfSBrZXk9e2NoaWxkLnRpdGxlfSAvPil9XG4gICAgICAgIDxwPntub3RlfTwvcD5cbiAgICAgICAge3RhZ3MubWFwKHRhZyA9PiA8VGFnIHRhZz17dGFnfSBrZXk9e3RhZ30gLz4pfVxuICAgIDwvZGl2PlxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvZ3JhcGgudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wcG9ydHVuaXR5IGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksYW55PntcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxkaXY+T3Bwb3J0dW5pdGllczwvZGl2PlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9PcHBvcnR1bml0eS50c3giXSwic291cmNlUm9vdCI6IiJ9