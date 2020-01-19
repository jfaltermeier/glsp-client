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
Object.defineProperty(exports, "__esModule", { value: true });
/********************************************************************************
 * Copyright (c) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
var sprotty_1 = require("sprotty");
var GLSPActionDispatcher = /** @class */ (function (_super) {
    __extends(GLSPActionDispatcher, _super);
    function GLSPActionDispatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeouts = new Map();
        return _this;
    }
    GLSPActionDispatcher.prototype.handleAction = function (action) {
        if (sprotty_1.isResponseAction(action)) {
            // clear timeout
            var timeout = this.timeouts.get(action.responseId);
            if (timeout !== undefined) {
                clearTimeout(timeout);
                this.timeouts.delete(action.responseId);
            }
            // we might have reached a timeout, so we simply drop the response
            var deferred = this.requests.get(action.responseId);
            if (deferred === undefined) {
                this.logger.log(this, 'No matching request for response', action);
                return Promise.resolve();
            }
        }
        return _super.prototype.handleAction.call(this, action);
    };
    /**
     * Dispatch a request and waits for a response until the timeout given in `timeoutMs` has
     * been reached. The returned promise is resolved when a response with matching identifier
     * is dispatched or when the timeout has been reached. That response is _not_ passed to the
     * registered action handlers. Instead, it is the responsibility of the caller of this method
     * to handle the response properly. For example, it can be sent to the registered handlers by
     * passing it again to the `dispatch` method.
     * If `rejectOnTimeout` is set to false (default) the returned promise will be resolved with
     * no value, otherwise it will be rejected.
     */
    GLSPActionDispatcher.prototype.requestUntil = function (action, timeoutMs, rejectOnTimeout) {
        var _this = this;
        if (timeoutMs === void 0) { timeoutMs = 2000; }
        if (rejectOnTimeout === void 0) { rejectOnTimeout = false; }
        if (!action.requestId) {
            return Promise.reject(new Error('Request without requestId'));
        }
        var requestId = action.requestId;
        var timeout = setTimeout(function () {
            var deferred = _this.requests.get(requestId);
            if (deferred !== undefined) {
                // cleanup
                clearTimeout(timeout);
                _this.requests.delete(requestId);
                var notification = 'Request ' + requestId + ' (' + action + ') time out after ' + timeoutMs + 'ms.';
                if (rejectOnTimeout) {
                    deferred.reject(notification);
                }
                else {
                    _this.logger.info(_this, notification);
                    deferred.resolve();
                }
            }
        }, timeoutMs);
        this.timeouts.set(requestId, timeout);
        return _super.prototype.request.call(this, action);
    };
    return GLSPActionDispatcher;
}(sprotty_1.ActionDispatcher));
exports.GLSPActionDispatcher = GLSPActionDispatcher;
//# sourceMappingURL=glsp-action-dispatcher.js.map