"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("sprotty/lib");
var inversify_1 = require("inversify");
var inversify_2 = require("inversify");
var FeedbackActionDispatcher = /** @class */ (function () {
    function FeedbackActionDispatcher(actionDispatcher, logger) {
        this.actionDispatcher = actionDispatcher;
        this.logger = logger;
        this.feedbackEmitters = new Map;
    }
    FeedbackActionDispatcher.prototype.registerFeedback = function (feedbackEmitter, actions) {
        this.feedbackEmitters.set(feedbackEmitter, actions);
        this.dispatch(actions, feedbackEmitter);
    };
    FeedbackActionDispatcher.prototype.deregisterFeedback = function (feedbackEmitter, actions) {
        this.feedbackEmitters.delete(feedbackEmitter);
        this.dispatch(actions, feedbackEmitter);
    };
    FeedbackActionDispatcher.prototype.dispatch = function (actions, feedbackEmitter) {
        var _this = this;
        this.actionDispatcher()
            .then(function (dispatcher) { return dispatcher.dispatchAll(actions); })
            .then(function () { return _this.logger.info(_this, "Dispatched feedback actions for " + feedbackEmitter); })
            .catch(function (reason) { return _this.logger.error(_this, 'Failed to dispatch feedback actions', reason); });
    };
    FeedbackActionDispatcher.prototype.getRegisteredFeedback = function () {
        var result = [];
        this.feedbackEmitters.forEach(function (value, key) { return result.push.apply(result, __spread(value)); });
        return result;
    };
    FeedbackActionDispatcher.prototype.getRegisteredFeedbackEmitters = function (action) {
        var result = [];
        this.feedbackEmitters.forEach(function (value, key) {
            if (value.find(function (a) { return a === action; })) {
                result.push(key);
            }
        });
        return result;
    };
    FeedbackActionDispatcher = __decorate([
        inversify_2.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.IActionDispatcherProvider)),
        __param(1, inversify_1.inject(lib_1.TYPES.ILogger)),
        __metadata("design:paramtypes", [Function, Object])
    ], FeedbackActionDispatcher);
    return FeedbackActionDispatcher;
}());
exports.FeedbackActionDispatcher = FeedbackActionDispatcher;
//# sourceMappingURL=feedback-action-dispatcher.js.map