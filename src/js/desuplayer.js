
var desuplayer = function () {
    //變數
    var _this;

    //播放器初始化建構式
    //Understanding,decomposition and reconstruction.
    function desuplayer(setting) {
        _this = this;

        //傳入參數
        this.frame = setting.frame;

        //設定物件
        this.videoframe = this.frame.getElementsByClassName('d-video')[0];
        this.playbtn = this.frame.getElementsByClassName('d-play-btn')[0];
        this.settingbtn = this.frame.getElementsByClassName('d-setting-btn')[0];
        this.fullscreenbtn = this.frame.getElementsByClassName('d-fullscreen-btn')[0];
        this.volumebtn = this.frame.getElementsByClassName('d-volume-btn')[0];
        this.volumecontrol = this.frame.getElementsByClassName('d-volume-control')[0];
        this.volumehandle = this.frame.getElementsByClassName('d-volume-bar')[0];
        this.timelen = this.frame.getElementsByClassName('d-time-len')[0];
        this.timenow = this.frame.getElementsByClassName('d-time-now')[0];
        this.progressbar = this.frame.getElementsByClassName('d-progress')[0];
        this.seekbar = this.frame.getElementsByClassName('d-progress-now')[0];
        this.loadbar = this.frame.getElementsByClassName('d-progress-loaded')[0];

        //物件變數
        this.videolen = _this.videoframe.duration;

        //綁定事件
        this.playbtn.addEventListener('click', this.toggle);
        this.fullscreenbtn.addEventListener('click', this.fullscreen);
        this.videoframe.addEventListener('play', whenplay);
        this.videoframe.addEventListener('pause', whenpause);
        this.videoframe.addEventListener('volumechange', volumelistener);
        this.videoframe.addEventListener('timeupdate', videoplaying);
        this.volumecontrol.addEventListener('mousedown',() => {
            document.addEventListener('mousemove', volumechange);
            document.addEventListener('mouseup', volumechangeend);
        });
        this.volumecontrol.addEventListener('click', volumechange);
        this.volumebtn.addEventListener('click', this.volumemuted);
        this.progressbar.addEventListener('click', controlprogress);

        //快捷鍵
        document.addEventListener('click', () => {
            this.focus = false;
        }, true);
        this.frame.addEventListener('click', () => {
            this.focus = true;
        }, true);
        document.addEventListener('keydown', shortkey);

        //初始化
        starter();
    }

    //初始化
    var starter = function () {
        //初始化長度
        _this.timelen.innerHTML = totime(_this.videoframe.duration);
    }

    //播放控制
    desuplayer.prototype.toggle = function () {
        if (!_this.videoframe.paused) {
            _this.videoframe.pause();
        } else {
            _this.videoframe.play();
        }
    }

    //進度調控制
    var controlprogress = function (event) {
        let e = event || window.event;
        let rect = _this.progressbar.getBoundingClientRect();
        let length = (rect.right + document.documentElement.scrollLeft) - (rect.left + document.documentElement.scrollLeft);
        let pos = e.clientX - (rect.left + document.documentElement.scrollLeft);
        let percent = pos / length;
        _this.videoframe.currentTime = _this.videolen * percent;
    }
    
    //播放事件
    var whenplay = function () {
        _this.playbtn.getElementsByClassName('d-icon-play')[0].hidden = true;
        _this.playbtn.getElementsByClassName('d-icon-pause')[0].hidden = false;
    }
    //暫停事件
    var whenpause = function () {
        _this.playbtn.getElementsByClassName('d-icon-play')[0].hidden = false;
        _this.playbtn.getElementsByClassName('d-icon-pause')[0].hidden = true;
    }

    //播放中
    var videoplaying = function () {
        _this.timenow.innerHTML = totime(_this.videoframe.currentTime);
        let person;
        person = Math.max(_this.videoframe.currentTime / _this.videolen , 0);
        person = Math.min(_this.videoframe.currentTime / _this.videolen , 1);
        _this.seekbar.style['width'] = person * 100 + "%";
    }

    //秒轉換成 分/秒
    var totime = function (len) {
        let min = Math.floor(len / 60);
        let sec = Math.floor(len % 60);
        if (min.toString().length < 2) min = "0" + min;
        if (sec.toString().length < 2) sec = "0" + sec;
        return min + ":" + sec;
    }

    //切換源
    desuplayer.prototype.setsrc = function (vid) {
        _this.videoframe.src = vid;
        starter();
    }

    //全螢幕
    desuplayer.prototype.fullscreen = function () {
        if (!_this.fullscreen.check()) {
            if (_this.frame.requestFullscreen) {
                _this.frame.requestFullscreen();
            }
            else if (_this.frame.mozRequestFullScreen) {
                _this.frame.mozRequestFullScreen();
            }
            else if (_this.frame.webkitRequestFullscreen) {
                _this.frame.webkitRequestFullscreen();
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
    //驗證全螢幕
    desuplayer.prototype.fullscreen.check = function () {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    }

    //音量控制
    //解除事件綁定
    var volumechangeend = function () {
        document.removeEventListener('mousemove', volumechange);
        document.removeEventListener('mouseup', volumechangeend);
    }
    //控制音量
    var volumechange = function (event) {
        let e = event || window.event;
        let percent = (e.clientX - (_this.volumecontrol.getBoundingClientRect().left + document.documentElement.scrollLeft) - 5.5) / 40;
        percent = percent > 0 ? percent : 0;
        percent = percent < 1 ? percent : 1;
        _this.videoframe.muted = false;
        _this.updatevolume(percent);
        console.clear();
        console.log(percent + ", " + _this.volume + ", " + _this.videoframe.volume);
    }
    //更新音量
    desuplayer.prototype.updatevolume = function (value) {
        _this.videoframe.volume = value > 0 ? value : 0;
        _this.videoframe.volume = value < 1 ? value : 1;
        console.log(_this.videoframe.volume);
    }
    //音量條
    var updatevolumebar = function (value) {
        _this.volumehandle.style["left"] = parseFloat(value * 40) + "px";
    }
    //靜音按鈕
    desuplayer.prototype.volumemuted = function () {
        if (_this.videoframe.muted) {
            _this.videoframe.muted = false;
        } else {
            _this.videoframe.muted = true;
        }
        if (!_this.videoframe.volume) {
            _this.videoframe.muted = false;
            _this.videoframe.volume = 1;
        }
    }
    //監聽音量
    var volumelistener = function () {
        if (!_this.videoframe.muted) {
            updatevolumebar(_this.videoframe.volume);
        } else {
            updatevolumebar(0);
        }
    }

    //快進
    desuplayer.prototype.forward = function (sec) {
        _this.videoframe.currentTime += sec;
    }

    //快退
    desuplayer.prototype.backward = function (sec) {
        _this.videoframe.currentTime -= sec;
    }

    //快捷鍵
    var shortkey = function (key) {
        if (_this.focus) {
            console.clear();
            console.log(key);
            switch (key.keyCode) {
                //向右快進
                case 39:
                    _this.forward(5);
                    break;
                //向左快退
                case 37:
                    _this.backward(5);
                    break;
            }
        }
    }

    //回傳建構式
    return desuplayer;
}();

export default desuplayer;