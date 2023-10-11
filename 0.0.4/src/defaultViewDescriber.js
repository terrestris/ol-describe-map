"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultViewDescriber = void 0;
var proj_1 = require("ol/proj");
var calculateScale = function (view) {
    var unit = view.getProjection().getUnits();
    var resolution = view.getResolution() || 1;
    var inchesPerMetre = 39.37;
    var dpi = 90;
    var mpu = 1;
    if (unit !== 'pixels' && unit !== 'tile-pixels') {
        mpu = proj_1.METERS_PER_UNIT[unit];
    }
    return resolution * mpu * inchesPerMetre * dpi;
};
var get4326Coordinates = function (bbox, center, proj) {
    var epsg4326 = (0, proj_1.get)('EPSG:4326');
    if (epsg4326 === null || proj.getCode() === (epsg4326 === null || epsg4326 === void 0 ? void 0 : epsg4326.getCode())) {
        return {
            bbox: bbox,
            center: center
        };
    }
    var ll = [bbox[0], bbox[1]];
    var ur = [bbox[2], bbox[3]];
    return {
        bbox: __spreadArray(__spreadArray([], (0, proj_1.transform)(ll, proj, epsg4326), true), (0, proj_1.transform)(ur, proj, epsg4326), true),
        center: (0, proj_1.transform)(center, proj, epsg4326)
    };
};
/**
 * A basic view describer.
 *
 * @param view View An OpenLayers view to describe.
 * @returns ViewDescription A description of the view.
 */
var defaultViewDescriber = function (view) { return __awaiter(void 0, void 0, void 0, function () {
    var bbox, center, viewProjection, userProjection, epsg4326, viewDesc;
    return __generator(this, function (_a) {
        bbox = view.calculateExtent();
        center = view.getCenter();
        viewProjection = view.getProjection();
        userProjection = (0, proj_1.getUserProjection)();
        epsg4326 = get4326Coordinates(bbox, center, userProjection || viewProjection);
        viewDesc = {
            bbox: bbox,
            center: center,
            viewProjection: viewProjection ? viewProjection.getCode() : undefined,
            userProjection: userProjection ? userProjection.getCode() : undefined,
            rotation: view.getRotation(),
            zoom: view.getZoom(),
            scale: calculateScale(view),
            epsg4326: epsg4326
        };
        return [2 /*return*/, viewDesc];
    });
}); };
exports.defaultViewDescriber = defaultViewDescriber;
exports.default = exports.defaultViewDescriber;
//# sourceMappingURL=defaultViewDescriber.js.map