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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.describe = void 0;
var defaultLayerFilter_1 = __importDefault(require("./defaultLayerFilter"));
var defaultViewDescriber_1 = __importDefault(require("./defaultViewDescriber"));
var defaultLayerDescriber_1 = __importDefault(require("./defaultLayerDescriber"));
var defaultTextualDescriber_1 = __importDefault(require("./defaultTextualDescriber"));
/**
 * Describes the passed map according to the passed configuration and returns that
 * description. By default also the 'aria-description' attribute of the map's DOM
 * element is updated.
 *
 * @param map Map An OpenLayers Map you want to have a description for.
 * @param conf DescribeConfiguration A configuration how you want the
 *   map to be described and whether the 'aria-description' in the DOM
 *   should directly be updated.
 * @returns MapDescription A map description object.
 */
function describe(map, conf) {
    if (conf === void 0) { conf = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, layerFilter, _b, viewDescriber, _c, layerDescriber, _d, textualDescriber, _e, updateAriaDescription, view, layers, viewDescription, layerDescriptions, textualDescription, targetElement;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = conf.layerFilter, layerFilter = _a === void 0 ? defaultLayerFilter_1.default : _a, _b = conf.viewDescriber, viewDescriber = _b === void 0 ? defaultViewDescriber_1.default : _b, _c = conf.layerDescriber, layerDescriber = _c === void 0 ? defaultLayerDescriber_1.default : _c, _d = conf.textualDescriber, textualDescriber = _d === void 0 ? defaultTextualDescriber_1.default : _d, _e = conf.updateAriaDescription, updateAriaDescription = _e === void 0 ? true : _e;
                    view = map.getView();
                    layers = map.getAllLayers().filter(layerFilter);
                    return [4 /*yield*/, viewDescriber(view)];
                case 1:
                    viewDescription = _f.sent();
                    return [4 /*yield*/, Promise.all(layers.map(function (layer) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, layerDescriber(layer, view)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }))];
                case 2:
                    layerDescriptions = _f.sent();
                    return [4 /*yield*/, textualDescriber(viewDescription, layerDescriptions)];
                case 3:
                    textualDescription = _f.sent();
                    targetElement = map.getTargetElement();
                    if (updateAriaDescription && targetElement) {
                        targetElement.setAttribute('aria-description', textualDescription);
                    }
                    return [2 /*return*/, {
                            text: textualDescription,
                            view: viewDescription,
                            layers: layerDescriptions
                        }];
            }
        });
    });
}
exports.describe = describe;
;
//# sourceMappingURL=index.js.map