var desuplayer =
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/desuplayer.scss":
/*!*********************************!*\
  !*** ./src/css/desuplayer.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack://desuplayer/./src/css/desuplayer.scss?");

/***/ }),

/***/ "./src/js/desuplayer.js":
/*!******************************!*\
  !*** ./src/js/desuplayer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\nvar desuplayer = function () {\r\n    //變數\r\n    var _this;\r\n\r\n    //播放器初始化建構式\r\n    //Understanding,decomposition and reconstruction.\r\n    function desuplayer(setting) {\r\n        _this = this;\r\n\r\n        //傳入參數\r\n        this.frame = setting.frame;\r\n\r\n        //設定物件\r\n        this.videoframe = this.frame.getElementsByClassName('d-video')[0];\r\n        this.playbtn = this.frame.getElementsByClassName('d-play-btn')[0];\r\n        this.settingbtn = this.frame.getElementsByClassName('d-setting-btn')[0];\r\n        this.fullscreenbtn = this.frame.getElementsByClassName('d-fullscreen-btn')[0];\r\n        this.volumebtn = this.frame.getElementsByClassName('d-volume-btn')[0];\r\n        this.volumecontrol = this.frame.getElementsByClassName('d-volume-control')[0];\r\n        this.volumehandle = this.frame.getElementsByClassName('d-volume-bar')[0];\r\n        this.timelen = this.frame.getElementsByClassName('d-time-len')[0];\r\n        this.timenow = this.frame.getElementsByClassName('d-time-now')[0];\r\n        this.progressbar = this.frame.getElementsByClassName('d-progress')[0];\r\n        this.seekbar = this.frame.getElementsByClassName('d-progress-now')[0];\r\n        this.loadbar = this.frame.getElementsByClassName('d-progress-loaded')[0];\r\n\r\n        //物件變數\r\n        this.videolen = _this.videoframe.duration;\r\n\r\n        //綁定事件\r\n        this.playbtn.addEventListener('click', this.toggle);\r\n        this.fullscreenbtn.addEventListener('click', this.fullscreen);\r\n        this.videoframe.addEventListener('play', whenplay);\r\n        this.videoframe.addEventListener('pause', whenpause);\r\n        this.videoframe.addEventListener('volumechange', volumelistener);\r\n        this.videoframe.addEventListener('timeupdate', videoplaying);\r\n        this.volumecontrol.addEventListener('mousedown',() => {\r\n            document.addEventListener('mousemove', volumechange);\r\n            document.addEventListener('mouseup', volumechangeend);\r\n        });\r\n        this.volumecontrol.addEventListener('click', volumechange);\r\n        this.volumebtn.addEventListener('click', this.volumemuted);\r\n        this.progressbar.addEventListener('click', controlprogress);\r\n\r\n        //快捷鍵\r\n        document.addEventListener('click', () => {\r\n            this.focus = false;\r\n        }, true);\r\n        this.frame.addEventListener('click', () => {\r\n            this.focus = true;\r\n        }, true);\r\n        document.addEventListener('keydown', shortkey);\r\n\r\n        //初始化\r\n        starter();\r\n    }\r\n\r\n    //初始化\r\n    var starter = function () {\r\n        //初始化長度\r\n        _this.timelen.innerHTML = totime(_this.videoframe.duration);\r\n    }\r\n\r\n    //播放控制\r\n    desuplayer.prototype.toggle = function () {\r\n        if (!_this.videoframe.paused) {\r\n            _this.videoframe.pause();\r\n        } else {\r\n            _this.videoframe.play();\r\n        }\r\n    }\r\n\r\n    //進度調控制\r\n    var controlprogress = function (event) {\r\n        let e = event || window.event;\r\n        let rect = _this.progressbar.getBoundingClientRect();\r\n        let length = (rect.right + document.documentElement.scrollLeft) - (rect.left + document.documentElement.scrollLeft);\r\n        let pos = e.clientX - (rect.left + document.documentElement.scrollLeft);\r\n        let percent = pos / length;\r\n        _this.videoframe.currentTime = _this.videolen * percent;\r\n    }\r\n    \r\n    //播放事件\r\n    var whenplay = function () {\r\n        _this.playbtn.getElementsByClassName('d-icon-play')[0].hidden = true;\r\n        _this.playbtn.getElementsByClassName('d-icon-pause')[0].hidden = false;\r\n    }\r\n    //暫停事件\r\n    var whenpause = function () {\r\n        _this.playbtn.getElementsByClassName('d-icon-play')[0].hidden = false;\r\n        _this.playbtn.getElementsByClassName('d-icon-pause')[0].hidden = true;\r\n    }\r\n\r\n    //播放中\r\n    var videoplaying = function () {\r\n        _this.timenow.innerHTML = totime(_this.videoframe.currentTime);\r\n        let person;\r\n        person = Math.max(_this.videoframe.currentTime / _this.videolen , 0);\r\n        person = Math.min(_this.videoframe.currentTime / _this.videolen , 1);\r\n        _this.seekbar.style['width'] = person * 100 + \"%\";\r\n    }\r\n\r\n    //秒轉換成 分/秒\r\n    var totime = function (len) {\r\n        let min = Math.floor(len / 60);\r\n        let sec = Math.floor(len % 60);\r\n        if (min.toString().length < 2) min = \"0\" + min;\r\n        if (sec.toString().length < 2) sec = \"0\" + sec;\r\n        return min + \":\" + sec;\r\n    }\r\n\r\n    //切換源\r\n    desuplayer.prototype.setsrc = function (vid) {\r\n        _this.videoframe.src = vid;\r\n        starter();\r\n    }\r\n\r\n    //全螢幕\r\n    desuplayer.prototype.fullscreen = function () {\r\n        if (!_this.fullscreen.check()) {\r\n            if (_this.frame.requestFullscreen) {\r\n                _this.frame.requestFullscreen();\r\n            }\r\n            else if (_this.frame.mozRequestFullScreen) {\r\n                _this.frame.mozRequestFullScreen();\r\n            }\r\n            else if (_this.frame.webkitRequestFullscreen) {\r\n                _this.frame.webkitRequestFullscreen();\r\n            }\r\n        } else {\r\n            if (document.cancelFullScreen) {\r\n                document.cancelFullScreen();\r\n            }\r\n            else if (document.mozCancelFullScreen) {\r\n                document.mozCancelFullScreen();\r\n            }\r\n            else if (document.webkitCancelFullScreen) {\r\n                document.webkitCancelFullScreen();\r\n            }\r\n        }\r\n    }\r\n    //驗證全螢幕\r\n    desuplayer.prototype.fullscreen.check = function () {\r\n        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;\r\n    }\r\n\r\n    //音量控制\r\n    //解除事件綁定\r\n    var volumechangeend = function () {\r\n        document.removeEventListener('mousemove', volumechange);\r\n        document.removeEventListener('mouseup', volumechangeend);\r\n    }\r\n    //控制音量\r\n    var volumechange = function (event) {\r\n        let e = event || window.event;\r\n        let percent = (e.clientX - (_this.volumecontrol.getBoundingClientRect().left + document.documentElement.scrollLeft) - 5.5) / 40;\r\n        percent = percent > 0 ? percent : 0;\r\n        percent = percent < 1 ? percent : 1;\r\n        _this.videoframe.muted = false;\r\n        _this.updatevolume(percent);\r\n        console.clear();\r\n        console.log(percent + \", \" + _this.volume + \", \" + _this.videoframe.volume);\r\n    }\r\n    //更新音量\r\n    desuplayer.prototype.updatevolume = function (value) {\r\n        _this.videoframe.volume = value > 0 ? value : 0;\r\n        _this.videoframe.volume = value < 1 ? value : 1;\r\n        console.log(_this.videoframe.volume);\r\n    }\r\n    //音量條\r\n    var updatevolumebar = function (value) {\r\n        _this.volumehandle.style[\"left\"] = parseFloat(value * 40) + \"px\";\r\n    }\r\n    //靜音按鈕\r\n    desuplayer.prototype.volumemuted = function () {\r\n        if (_this.videoframe.muted) {\r\n            _this.videoframe.muted = false;\r\n        } else {\r\n            _this.videoframe.muted = true;\r\n        }\r\n        if (!_this.videoframe.volume) {\r\n            _this.videoframe.muted = false;\r\n            _this.videoframe.volume = 1;\r\n        }\r\n    }\r\n    //監聽音量\r\n    var volumelistener = function () {\r\n        if (!_this.videoframe.muted) {\r\n            updatevolumebar(_this.videoframe.volume);\r\n        } else {\r\n            updatevolumebar(0);\r\n        }\r\n    }\r\n\r\n    //快進\r\n    desuplayer.prototype.forward = function (sec) {\r\n        _this.videoframe.currentTime += sec;\r\n    }\r\n\r\n    //快退\r\n    desuplayer.prototype.backward = function (sec) {\r\n        _this.videoframe.currentTime -= sec;\r\n    }\r\n\r\n    //快捷鍵\r\n    var shortkey = function (key) {\r\n        if (_this.focus) {\r\n            console.clear();\r\n            console.log(key);\r\n            switch (key.keyCode) {\r\n                //向右快進\r\n                case 39:\r\n                    _this.forward(5);\r\n                    break;\r\n                //向左快退\r\n                case 37:\r\n                    _this.backward(5);\r\n                    break;\r\n            }\r\n        }\r\n    }\r\n\r\n    //回傳建構式\r\n    return desuplayer;\r\n}();\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (desuplayer);\n\n//# sourceURL=webpack://desuplayer/./src/js/desuplayer.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_desuplayer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/desuplayer.scss */ \"./src/css/desuplayer.scss\");\n/* harmony import */ var _css_desuplayer_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_desuplayer_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _desuplayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./desuplayer.js */ \"./src/js/desuplayer.js\");\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (_desuplayer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\n\n\n//# sourceURL=webpack://desuplayer/./src/js/index.js?");

/***/ })

/******/ })["default"];