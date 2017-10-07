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

        //綁定事件
        this.playbtn.addEventListener('click', this.toggle);
        this.fullscreenbtn.addEventListener('click', this.fullscreen);
        this.videoframe.addEventListener('play', whenplay);
        this.videoframe.addEventListener('pause', whenpause);
        this.videoframe.addEventListener('volumechange', function () {console.log(_this.videoframe.volume)} );
        this.volumecontrol.addEventListener('mousedown',() => {
            document.addEventListener('mousemove', volumechange);
            document.addEventListener('mouseup', volumechangeend);
        });
        this.volumebtn.addEventListener('click', this.volumetoggle);

        //快捷鍵
        document.addEventListener('click', () => {
            this.focus = false;
        }, true);
        this.frame.addEventListener('click', () => {
            this.focus = true;
        }, true);
        document.addEventListener('keydown', shortkey);
    }

    //播放控制
    desuplayer.prototype.toggle = function () {
        if (!_this.videoframe.paused) {
            _this.videoframe.pause();
        } else {
            _this.videoframe.play();
        }
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

    //全螢幕
    desuplayer.prototype.fullscreen = function () {
        if (!document.webkitIsFullScreen) {
            _this.frame.webkitRequestFullScreen();
        } else {
            document.webkitExitFullscreen();
        }
    }

    //音量控制 74-108
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
        _this.updatevolume(percent);
        console.clear();
        console.log(percent + ", " + _this.volume + ", " + _this.videoframe.volume);
    }
    //更新音量
    desuplayer.prototype.updatevolume = function (value) {
        _this.videoframe.volume = value > 0 ? value : 0;
        _this.videoframe.volume = value < 1 ? value : 1;
        updatevolumebar(value);
        console.log(_this.videoframe.volume);
    }
    //音量條
    var updatevolumebar = function (value) {
        _this.volumehandle.style["left"] = parseFloat(value * 40) + "px";
    }
    //靜音按鈕
    desuplayer.prototype.volumetoggle = function () {
        if (_this.videoframe.volume == 0) {
            _this.updatevolume(1);
        } else {
            _this.updatevolume(0);
        }
    }

    //快捷鍵
    var shortkey = function (key) {
        if (_this.focus) {
            console.clear();
            console.log(key);
        }
    }

    //回傳建構式
    return desuplayer;
}();


//初始化播放器
window.onload = function () {
    dp = new desuplayer({
        frame: document.getElementsByClassName('desuplayer')[0]
    });
}