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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var oj_eventaggregator_1 = require("oj-eventaggregator");
exports.googleMapsLoader = function (key) {
    return new Promise(function (res) {
        var cbFnHash = "gml_" + Math.random().toString(36).substring(7);
        window[cbFnHash] = function () { return res(window["google"]); };
        var script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=" + cbFnHash;
        document.body.appendChild(script);
    });
};
var Geocoder = /** @class */ (function (_super) {
    __extends(Geocoder, _super);
    function Geocoder(key) {
        var _this = _super.call(this) || this;
        exports.googleMapsLoader(key)
            .then(function (google) {
            _this.google = google;
            _this.emit("load", _this);
        });
        return _this;
    }
    // load() {
    //   if (this.google !== undefined) return Promise.resolve(this.google)
    //   return new Promise<any>(res => this.once("load", () => res(this.google)))
    // }
    Geocoder.prototype.find = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var results, _a, cache;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.geocodeLatLng;
                        return [4 /*yield*/, this.findLatLng(search)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        results = _b.sent();
                        cache = {};
                        return [2 /*return*/, {
                                results: results,
                                getCountry: function () {
                                    if (!cache["getCountry"])
                                        cache["getCountry"] = _this.firstResult(results, "country");
                                    return cache["getCountry"];
                                },
                                getProvince: function () {
                                    if (!cache["getProvince"])
                                        cache["getProvince"] = _this.firstResult(results, "administrative_area_level_1");
                                    return cache["getProvince"];
                                },
                                getCity: function () {
                                    if (!cache["getCity"])
                                        cache["getCity"] = _this.firstResult(results, "locality");
                                    return cache["getCity"];
                                },
                                getCitySub: function () {
                                    if (!cache["getCitySub"])
                                        cache["getCitySub"] = _this.firstResult(results, "sublocality");
                                    return cache["getCitySub"];
                                },
                                getPostalCode: function () {
                                    if (!cache["getPostalCode"])
                                        cache["getPostalCode"] = _this.firstResult(results, "postal_code");
                                    return cache["getPostalCode"];
                                },
                                getStreet: function () {
                                    if (!cache["getStreet"])
                                        cache["getStreet"] = _this.firstResult(results, "route");
                                    return cache["getStreet"];
                                },
                                getStreetNumber: function () {
                                    if (!cache["getStreetNumber"])
                                        cache["getStreetNumber"] = _this.firstResult(results, "street_number");
                                    return cache["getStreetNumber"];
                                },
                            }];
                }
            });
        });
    };
    Geocoder.prototype.firstResult = function (results, type) {
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var a = results_1[_i].address_components;
            var r = a.find(function (x) { return x.types.includes(type); });
            if (r)
                return r.long_name;
        }
        return null;
    };
    Geocoder.prototype.geocode = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        var geocoder = new _this.google.maps.Geocoder();
                        geocoder.geocode(search, function (results, status) {
                            if (status == _this.google.maps.GeocoderStatus.OK)
                                res(results);
                            else
                                rej(status);
                        });
                    })];
            });
        });
    };
    Geocoder.prototype.findLatLng = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var results, lat, lng;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.geocode(search)];
                    case 1:
                        results = _a.sent();
                        lat = results[0].geometry.location.lat();
                        lng = results[0].geometry.location.lng();
                        return [2 /*return*/, { lat: lat, lng: lng }];
                }
            });
        });
    };
    Geocoder.prototype.geocodeLatLng = function (ltLng) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.geocode({ location: ltLng })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Geocoder;
}(oj_eventaggregator_1.EventAggregator));
exports.Geocoder = Geocoder;
