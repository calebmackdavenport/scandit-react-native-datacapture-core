"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFrameSource = exports.ImageBuffer = exports.CameraSettings = exports.FocusGestureStrategy = exports.FocusRange = exports.VideoResolution = exports.CameraPosition = exports.TorchState = void 0;
var Defaults_1 = require("./private/Defaults");
var Serializeable_1 = require("./private/Serializeable");
var FrameSource_1 = require("./FrameSource");
var ImageFrameSourceProxy_1 = require("./native/ImageFrameSourceProxy");
var TorchState;
(function (TorchState) {
    TorchState["On"] = "on";
    TorchState["Off"] = "off";
    TorchState["Auto"] = "auto";
})(TorchState = exports.TorchState || (exports.TorchState = {}));
var CameraPosition;
(function (CameraPosition) {
    CameraPosition["WorldFacing"] = "worldFacing";
    CameraPosition["UserFacing"] = "userFacing";
    CameraPosition["Unspecified"] = "unspecified";
})(CameraPosition = exports.CameraPosition || (exports.CameraPosition = {}));
var VideoResolution;
(function (VideoResolution) {
    VideoResolution["Auto"] = "auto";
    VideoResolution["HD"] = "hd";
    VideoResolution["FullHD"] = "fullHd";
    VideoResolution["UHD4K"] = "uhd4k";
})(VideoResolution = exports.VideoResolution || (exports.VideoResolution = {}));
var FocusRange;
(function (FocusRange) {
    FocusRange["Full"] = "full";
    FocusRange["Near"] = "near";
    FocusRange["Far"] = "far";
})(FocusRange = exports.FocusRange || (exports.FocusRange = {}));
var FocusGestureStrategy;
(function (FocusGestureStrategy) {
    FocusGestureStrategy["None"] = "none";
    FocusGestureStrategy["Manual"] = "manual";
    FocusGestureStrategy["ManualUntilCapture"] = "manualUntilCapture";
    FocusGestureStrategy["AutoOnLocation"] = "autoOnLocation";
})(FocusGestureStrategy = exports.FocusGestureStrategy || (exports.FocusGestureStrategy = {}));
var PrivateCameraProperty;
(function (PrivateCameraProperty) {
    PrivateCameraProperty["CameraAPI"] = "api";
})(PrivateCameraProperty || (PrivateCameraProperty = {}));
var CameraSettings = /** @class */ (function (_super) {
    __extends(CameraSettings, _super);
    function CameraSettings(settings) {
        var _this = _super.call(this) || this;
        _this.preferredResolution = Defaults_1.Defaults.Camera.Settings.preferredResolution;
        _this.zoomFactor = Defaults_1.Defaults.Camera.Settings.zoomFactor;
        _this.zoomGestureZoomFactor = Defaults_1.Defaults.Camera.Settings.zoomGestureZoomFactor;
        _this.api = 0;
        _this.focus = {
            range: Defaults_1.Defaults.Camera.Settings.focusRange,
            focusGestureStrategy: Defaults_1.Defaults.Camera.Settings.focusGestureStrategy,
            shouldPreferSmoothAutoFocus: Defaults_1.Defaults.Camera.Settings.shouldPreferSmoothAutoFocus,
        };
        if (settings !== undefined && settings !== null) {
            Object.getOwnPropertyNames(settings).forEach(function (propertyName) {
                _this[propertyName] = settings[propertyName];
            });
        }
        return _this;
    }
    Object.defineProperty(CameraSettings.prototype, "focusRange", {
        get: function () {
            return this.focus.range;
        },
        set: function (newRange) {
            this.focus.range = newRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraSettings.prototype, "focusGestureStrategy", {
        get: function () {
            return this.focus.focusGestureStrategy;
        },
        set: function (newStrategy) {
            this.focus.focusGestureStrategy = newStrategy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraSettings.prototype, "shouldPreferSmoothAutoFocus", {
        get: function () {
            return this.focus.shouldPreferSmoothAutoFocus;
        },
        set: function (newShouldPreferSmoothAutoFocus) {
            this.focus.shouldPreferSmoothAutoFocus = newShouldPreferSmoothAutoFocus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraSettings.prototype, "maxFrameRate", {
        get: function () {
            // tslint:disable-next-line:no-console
            console.warn('maxFrameRate is deprecated');
            return 0;
        },
        set: function (newValue) {
            // tslint:disable-next-line:no-console
            console.warn('maxFrameRate is deprecated');
        },
        enumerable: false,
        configurable: true
    });
    CameraSettings.fromJSON = function (json) {
        var settings = new CameraSettings();
        settings.preferredResolution = json.preferredResolution;
        settings.zoomFactor = json.zoomFactor;
        settings.focusRange = json.focusRange;
        settings.zoomGestureZoomFactor = json.zoomGestureZoomFactor;
        settings.focusGestureStrategy = json.focusGestureStrategy;
        settings.shouldPreferSmoothAutoFocus = json.shouldPreferSmoothAutoFocus;
        if (json.api !== undefined && json.api !== null) {
            settings.api = json.api;
        }
        return settings;
    };
    CameraSettings.prototype.setProperty = function (name, value) {
        this[name] = value;
    };
    CameraSettings.prototype.getProperty = function (name) {
        return this[name];
    };
    return CameraSettings;
}(Serializeable_1.DefaultSerializeable));
exports.CameraSettings = CameraSettings;
var ImageBuffer = /** @class */ (function () {
    function ImageBuffer() {
    }
    Object.defineProperty(ImageBuffer.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageBuffer.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageBuffer.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    return ImageBuffer;
}());
exports.ImageBuffer = ImageBuffer;
var ImageFrameSource = /** @class */ (function (_super) {
    __extends(ImageFrameSource, _super);
    function ImageFrameSource() {
        var _this = _super.call(this) || this;
        _this.type = 'image';
        _this.image = '';
        _this._id = "" + Date.now();
        _this._desiredState = FrameSource_1.FrameSourceState.Off;
        _this.listeners = [];
        _this._context = null;
        _this.proxy = ImageFrameSourceProxy_1.ImageFrameSourceProxy.forImage(_this);
        return _this;
    }
    Object.defineProperty(ImageFrameSource.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (newContext) {
            if (newContext == null) {
                this.proxy.unsubscribeListener();
            }
            else if (this._context == null) {
                this.proxy.subscribeListener();
            }
            this._context = newContext;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageFrameSource.prototype, "desiredState", {
        get: function () {
            return this._desiredState;
        },
        enumerable: false,
        configurable: true
    });
    ImageFrameSource.create = function (image) {
        var imageFrameSource = new ImageFrameSource();
        imageFrameSource.image = image;
        return imageFrameSource;
    };
    ImageFrameSource.fromJSON = function (json) {
        return ImageFrameSource.create(json.image);
    };
    ImageFrameSource.prototype.didChange = function () {
        if (this.context) {
            return this.context.update();
        }
        else {
            return Promise.resolve();
        }
    };
    ImageFrameSource.prototype.switchToDesiredState = function (state) {
        this._desiredState = state;
        return this.didChange();
    };
    ImageFrameSource.prototype.addListener = function (listener) {
        if (listener == null) {
            return;
        }
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
    };
    ImageFrameSource.prototype.removeListener = function (listener) {
        if (listener == null) {
            return;
        }
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    };
    ImageFrameSource.prototype.getCurrentState = function () {
        return this.proxy.getCurrentState();
    };
    __decorate([
        Serializeable_1.nameForSerialization('id')
    ], ImageFrameSource.prototype, "_id", void 0);
    __decorate([
        Serializeable_1.nameForSerialization('desiredState')
    ], ImageFrameSource.prototype, "_desiredState", void 0);
    __decorate([
        Serializeable_1.ignoreFromSerialization
    ], ImageFrameSource.prototype, "listeners", void 0);
    __decorate([
        Serializeable_1.ignoreFromSerialization
    ], ImageFrameSource.prototype, "_context", void 0);
    __decorate([
        Serializeable_1.ignoreFromSerialization
    ], ImageFrameSource.prototype, "proxy", void 0);
    return ImageFrameSource;
}(Serializeable_1.DefaultSerializeable));
exports.ImageFrameSource = ImageFrameSource;
//# sourceMappingURL=Camera+Related.js.map