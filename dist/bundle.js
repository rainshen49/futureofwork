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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const react_dom_1 = __webpack_require__(2);
const _1 = __webpack_require__(3);
const NewsFeed_1 = __webpack_require__(4);
const Todo_1 = __webpack_require__(7);
class App extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        // default render the news page
        this.state = { Page: this.props.items.NewsFeed };
    }
    render() {
        const { items } = this.props;
        const { Page } = this.state;
        return React.createElement("div", null,
            React.createElement("main", null,
                React.createElement(Page, null)),
            React.createElement("nav", null, Object.keys(items).map(name => React.createElement("a", { href: "#" + name, onClick: () => this.setState({ Page: items[name] }), key: name }, name))));
    }
}
react_dom_1.render(React.createElement(App, { items: { NewsFeed: NewsFeed_1.default, Todo: Todo_1.default } }), _1.$('#app'));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function $(selector) {
    var result = document.querySelectorAll(selector);
    return (result.length === 1) ? result[0] : result;
}
exports.$ = $;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
const Dataflow_1 = __webpack_require__(5);
// Todo
// Show Graph
// format of the a news content
// tags
class NewsFeed extends react_1.Component {
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
exports.default = NewsFeed;
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = __webpack_require__(6);
// Todo, actually fetch feed
function reducer(prevState = { news: [] }, action) {
    const state = prevState;
    switch (action.type) {
        case "fetchFeed":
            state.news.push({ content: (new Date()).toString().repeat(50), authors: ["Rain"], title: "The new legend" });
            break;
    }
    return state;
}
exports.actions = {
    "fetchFeed": {
        type: "fetchFeed"
    }
};
exports.store = redux_1.createStore(reducer);
exports.store.subscribe(() => console.log(exports.store.getState()));
Object.assign(window, { actions: exports.actions, store: exports.store });


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_1 = __webpack_require__(0);
class Todo extends react_1.PureComponent {
    render() {
        return React.createElement("div", null, "Todo lists shown here");
    }
}
exports.default = Todo;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2M0ZTkzMjAzMWVmMTZjNTk5MGUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi90cy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiIsIndlYnBhY2s6Ly8vLi90cy8kLnRzIiwid2VicGFjazovLy8uL3RzL05ld3NGZWVkLnRzeCIsIndlYnBhY2s6Ly8vLi90cy9EYXRhZmxvdy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWR1eFwiIiwid2VicGFjazovLy8uL3RzL1RvZG8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSx1Qjs7Ozs7Ozs7O0FDQUEscUNBQThCO0FBQzlCLHVDQUFxQztBQUNyQywyQ0FBa0M7QUFDbEMsa0NBQXVCO0FBQ3ZCLDBDQUFpQztBQUNqQyxzQ0FBeUI7QUFFekIsU0FBVSxTQUFRLHFCQUFpRDtJQUFuRTs7UUFDSSwrQkFBK0I7UUFDL0IsVUFBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtJQWlCL0MsQ0FBQztJQWhCRyxNQUFNO1FBQ0YsTUFBTSxFQUFF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cEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQVAsZUFBTyxFQUFFLEtBQUssRUFBTCxhQUFLLEVBQUUsQ0FBQzs7Ozs7OztBQ3BCekMsdUI7Ozs7Ozs7OztBQ0FBLHFDQUE4QjtBQUM5Qix1Q0FBcUM7QUFFckMsVUFBMEIsU0FBUSxxQkFBdUI7SUFDckQsTUFBTTtRQUNGLE1BQU0sQ0FBQyx5REFBZ0M7SUFDM0MsQ0FBQztDQUNKO0FBSkQsdUJBSUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2M0ZTkzMjAzMWVmMTZjNTk5MGUiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi8kJ1xuaW1wb3J0IE5ld3NGZWVkIGZyb20gXCIuL05ld3NGZWVkXCJcbmltcG9ydCBUb2RvIGZyb20gJy4vVG9kbydcblxuY2xhc3MgQXBwIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7IGl0ZW1zOiB7W2FueTpzdHJpbmddOmFueX0gfSwgYW55PiB7XG4gICAgLy8gZGVmYXVsdCByZW5kZXIgdGhlIG5ld3MgcGFnZVxuICAgIHN0YXRlID0geyBQYWdlOiB0aGlzLnByb3BzLml0ZW1zLk5ld3NGZWVkIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgeyBQYWdlIH0gPSB0aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPFBhZ2UgLz5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykubWFwKG5hbWUgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wiICsgbmFtZX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFBhZ2U6IGl0ZW1zW25hbWVdIH0pfSBrZXk9e25hbWV9PntuYW1lfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbnJlbmRlcig8QXBwIGl0ZW1zPXt7IE5ld3NGZWVkLCBUb2RvIH19IC8+LCAkKCcjYXBwJykpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvaW5kZXgudHN4IiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0RE9NXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5leHBvcnQgZnVuY3Rpb24gJChzZWxlY3Rvcikge1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEpID8gcmVzdWx0WzBdIDogcmVzdWx0XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvJC50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBhY3Rpb25zLCBzdG9yZSB9IGZyb20gXCIuL0RhdGFmbG93XCJcbi8vIFRvZG9cbi8vIFNob3cgR3JhcGhcbi8vIGZvcm1hdCBvZiB0aGUgYSBuZXdzIGNvbnRlbnRcbi8vIHRhZ3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld3NGZWVkIGV4dGVuZHMgQ29tcG9uZW50PGFueSwgeyBuZXdzOiBhbnlbXSB9PntcbiAgICBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKClcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VkJylcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoc3RvcmUuZ2V0U3RhdGUoKSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgbmV3cyB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuZXdzXCI+XG4gICAgICAgICAgICA8aDE+V2hhdCdzIHVwPC9oMT5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5mZXRjaEZlZWQpfT5GYWtlRmVlZDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7bmV3cy5tYXAoKGl0ZW0sIGkpID0+IDxOZXdzIHsuLi5pdGVtfSBrZXk9e2l9IC8+KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIE5ld3MgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHsgdGl0bGU6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBhdXRob3JzOiBzdHJpbmdbXSB9LCB7IGV4cGFuZDogYm9vbGVhbiB9PntcbiAgICAvLyBBIG5ld3MsIG1heSBleHBhbmQgaWYgbmVjZXNzYXJ5XG4gICAgc3RhdGUgPSB7IGV4cGFuZDogZmFsc2UgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgY29udGVudCwgYXV0aG9ycyB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7IGV4cGFuZCB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2V4cGFuZCA/IFwibmV3c2RldGFpbFwiIDogXCJuZXdzYnJpZWZcIn0gb25DbGljaz17KCkgPT4gdGhpcy5tYXliZUV4cGFuZCghZXhwYW5kKX0+XG4gICAgICAgICAgICA8aDM+e3RpdGxlfTwvaDM+XG4gICAgICAgICAgICA8c3Bhbj57YXV0aG9ycy5qb2luKCcsICcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDxwPntjb250ZW50fTwvcD5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KGV2KSA9PiB0aGlzLnNob3dHcmFwaChldil9PkdyYXBoPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICBtYXliZUV4cGFuZChyZWFsbHkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZDogcmVhbGx5IH0pXG4gICAgfVxuICAgIHNob3dHcmFwaChldikge1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBjb25zdCB7IGNvbnRlbnQgfSA9IHRoaXMucHJvcHNcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG93aW5nXCIsIGNvbnRlbnQpXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL05ld3NGZWVkLnRzeCIsImltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG4vLyBUb2RvLCBhY3R1YWxseSBmZXRjaCBmZWVkXG5mdW5jdGlvbiByZWR1Y2VyKHByZXZTdGF0ZSA9IHsgbmV3czogW10gfSwgYWN0aW9uKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBwcmV2U3RhdGVcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJmZXRjaEZlZWRcIjpcbiAgICAgICAgICAgIHN0YXRlLm5ld3MucHVzaCh7IGNvbnRlbnQ6IChuZXcgRGF0ZSgpKS50b1N0cmluZygpLnJlcGVhdCg1MCksIGF1dGhvcnM6IFtcIlJhaW5cIl0sIHRpdGxlOiBcIlRoZSBuZXcgbGVnZW5kXCIgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gICAgXCJmZXRjaEZlZWRcIjoge1xuICAgICAgICB0eXBlOiBcImZldGNoRmVlZFwiXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuc3RvcmUuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpKVxuT2JqZWN0LmFzc2lnbih3aW5kb3csIHsgYWN0aW9ucywgc3RvcmUgfSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9EYXRhZmxvdy50cyIsIm1vZHVsZS5leHBvcnRzID0gUmVkdXg7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxhbnksIGFueT57XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5Ub2RvIGxpc3RzIHNob3duIGhlcmU8L2Rpdj5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvVG9kby50c3giXSwic291cmNlUm9vdCI6IiJ9