"use strict";
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
require("mocha");
require("reflect-metadata");
var chai_1 = require("chai");
var inversify_1 = require("inversify");
var sprotty_1 = require("sprotty");
var types_1 = require("../../types");
var set_operations_1 = require("../operation/set-operations");
var selection_service_1 = require("../select/selection-service");
var feedback_action_dispatcher_1 = require("../tool-feedback/feedback-action-dispatcher");
var layout_commands_1 = require("./layout-commands");
var MockActionDispatcher = /** @class */ (function () {
    function MockActionDispatcher(dispatchedActions) {
        if (dispatchedActions === void 0) { dispatchedActions = []; }
        this.dispatchedActions = dispatchedActions;
    }
    MockActionDispatcher.prototype.dispatch = function (action) {
        this.dispatchedActions.push(action);
        return Promise.resolve();
    };
    MockActionDispatcher.prototype.dispatchAll = function (actions) {
        var _this = this;
        actions.forEach(function (action) { return _this.dispatchedActions.push(action); });
        return Promise.resolve();
    };
    MockActionDispatcher.prototype.request = function (action) {
        throw new Error("Method not implemented.");
    };
    return MockActionDispatcher;
}());
var container = new inversify_1.Container();
container.load(sprotty_1.defaultModule);
container.bind(types_1.GLSP_TYPES.IFeedbackActionDispatcher).to(feedback_action_dispatcher_1.FeedbackActionDispatcher).inSingletonScope();
container.bind(selection_service_1.SelectionService).toSelf().inSingletonScope();
container.bind(types_1.GLSP_TYPES.SelectionService).toService(selection_service_1.SelectionService);
container.rebind(sprotty_1.TYPES.IModelFactory).to(sprotty_1.SGraphFactory).inSingletonScope();
var graphFactory = container.get(sprotty_1.TYPES.IModelFactory);
var selectionService = container.get(types_1.GLSP_TYPES.SelectionService);
var actionDispatcher = new MockActionDispatcher();
var node1 = {
    id: 'node1', type: 'node:circle',
    selected: true
};
var node2 = {
    id: 'node2', type: 'node:circle',
    selected: true
};
var node3 = {
    id: 'node3', type: 'node:circle',
    selected: true
};
var model = graphFactory.createRoot({
    id: 'model1',
    type: 'graph',
    children: [node1, node2, node3]
});
var context = {
    root: model,
    modelFactory: graphFactory,
    duration: 0,
    modelChanged: undefined,
    logger: new sprotty_1.ConsoleLogger(),
    syncer: new sprotty_1.AnimationFrameSyncer()
};
var defaultSize = { height: 10, width: 10 };
describe('AlignElementsCommand', function () {
    it('should align all elements left', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        var action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Left);
        var command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ["node1", { x: 111, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ["node2", { x: 111, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ["node3", { x: 111, y: 333, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements right', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        var action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Right);
        var command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ["node1", { x: 333, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ["node2", { x: 333, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ["node3", { x: 333, y: 333, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements center', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        var action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Center);
        var command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ["node1", { x: 222, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ["node2", { x: 222, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ["node3", { x: 222, y: 333, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements top', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        var action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Top);
        var command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ["node1", { x: 111, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ["node2", { x: 222, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ["node3", { x: 333, y: 111, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements bottom', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        var action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Bottom);
        var command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ["node1", { x: 111, y: 333, width: defaultSize.width, height: defaultSize.height }],
            ["node2", { x: 222, y: 333, width: defaultSize.width, height: defaultSize.height }],
            ["node3", { x: 333, y: 333, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements middle', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        var action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Middle);
        var command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ["node1", { x: 111, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ["node2", { x: 222, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ["node3", { x: 333, y: 222, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
});
describe('ResizeElementsCommand', function () {
    it('should make same width as last', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 100, y: 100 }, newSize: { height: 10, width: 10 } },
            { elementId: 'node2', newPosition: { x: 100, y: 200 }, newSize: { height: 20, width: 20 } },
            { elementId: 'node3', newPosition: { x: 100, y: 300 }, newSize: { height: 30, width: 30 } }
        ]);
        var action = new layout_commands_1.ResizeElementsAction(['node1', 'node2', 'node3'], layout_commands_1.ResizeDimension.Width, layout_commands_1.Reduce.last);
        var command = new layout_commands_1.ResizeElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        // resize is keeping the center, so the X moves by diff / 2
        assertAllBoundsInChangeBounds(new Map([
            ["node1", { x: 90, y: 100, height: 10, width: 30 }],
            ["node2", { x: 95, y: 200, height: 20, width: 30 }],
            ["node3", { x: 100, y: 300, height: 30, width: 30 }]
        ]));
    });
    it('should make same height as last', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 100, y: 100 }, newSize: { height: 10, width: 10 } },
            { elementId: 'node2', newPosition: { x: 100, y: 200 }, newSize: { height: 20, width: 20 } },
            { elementId: 'node3', newPosition: { x: 100, y: 300 }, newSize: { height: 30, width: 30 } }
        ]);
        var action = new layout_commands_1.ResizeElementsAction(['node1', 'node2', 'node3'], layout_commands_1.ResizeDimension.Height, layout_commands_1.Reduce.last);
        var command = new layout_commands_1.ResizeElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        // resize is keeping the center, so the Y moves by diff / 2
        assertAllBoundsInChangeBounds(new Map([
            ["node1", { x: 100, y: 90, height: 30, width: 10 }],
            ["node2", { x: 100, y: 195, height: 30, width: 20 }],
            ["node3", { x: 100, y: 300, height: 30, width: 30 }]
        ]));
    });
    it('should make same width and height as last', function () {
        actionDispatcher.dispatchedActions = [];
        var newModel = initModel([
            { elementId: 'node1', newPosition: { x: 100, y: 100 }, newSize: { height: 10, width: 10 } },
            { elementId: 'node2', newPosition: { x: 100, y: 200 }, newSize: { height: 20, width: 20 } },
            { elementId: 'node3', newPosition: { x: 100, y: 300 }, newSize: { height: 30, width: 30 } }
        ]);
        var action = new layout_commands_1.ResizeElementsAction(['node1', 'node2', 'node3'], layout_commands_1.ResizeDimension.Width_And_Height, layout_commands_1.Reduce.last);
        var command = new layout_commands_1.ResizeElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        // resize is keeping the center, so the Y moves by diff / 2
        assertAllBoundsInChangeBounds(new Map([
            ["node1", { x: 90, y: 90, height: 30, width: 30 }],
            ["node2", { x: 95, y: 195, height: 30, width: 30 }],
            ["node3", { x: 100, y: 300, height: 30, width: 30 }]
        ]));
    });
});
function initModel(elementAndBounds) {
    var mySetBoundsAction = new sprotty_1.SetBoundsAction(elementAndBounds);
    var setBoundsCommand = new sprotty_1.SetBoundsCommand(mySetBoundsAction);
    return setBoundsCommand.execute(context);
}
function newContext(root) {
    return {
        root: root,
        modelFactory: graphFactory,
        duration: 0,
        modelChanged: undefined,
        logger: new sprotty_1.ConsoleLogger(),
        syncer: new sprotty_1.AnimationFrameSyncer()
    };
}
function assertAllBounds(allBounds) {
    allBounds.forEach(function (bounds, nodeId) { return assertBounds(nodeId, bounds); });
}
function assertAllBoundsInChangeBounds(allBounds) {
    allBounds.forEach(function (bounds, nodeId) { return assertBoundsInChangeBoundsActions(nodeId, bounds); });
}
function assertBounds(nodeId, bounds) {
    assertBoundsInMoves(nodeId, bounds);
    assertBoundsInChangeBoundsActions(nodeId, bounds);
}
function assertBoundsInMoves(nodeId, bounds) {
    var moves = dispatchedElementMoves();
    var move = getMoveById(nodeId, moves);
    chai_1.expect(move.toPosition.x).to.be.equal(bounds.x);
    chai_1.expect(move.toPosition.y).to.be.equal(bounds.y);
}
function assertBoundsInChangeBoundsActions(nodeId, bounds) {
    var allChangeBounds = dispatchedChangeBounds();
    var changeBounds = getElementAndBoundsById(nodeId, allChangeBounds);
    chai_1.expect(changeBounds.newPosition.x).to.be.equal(bounds.x);
    chai_1.expect(changeBounds.newPosition.y).to.be.equal(bounds.y);
    chai_1.expect(changeBounds.newSize.height).to.be.equal(bounds.height);
    chai_1.expect(changeBounds.newSize.width).to.be.equal(bounds.width);
}
function getMoveById(id, moves) {
    return moves.filter(function (m) { return m.elementId === id; })[0];
}
function getElementAndBoundsById(id, elementAndBounds) {
    return elementAndBounds.filter(function (m) { return m.elementId === id; })[0];
}
function dispatchedElementMoves() {
    return actionDispatcher.dispatchedActions.filter(isMoveAction).map(function (a) { return a.moves; }).reduce(function (acc, val) { return acc.concat(val); }, []);
}
function dispatchedChangeBounds() {
    return actionDispatcher.dispatchedActions.filter(isChangeBounds).map(function (a) { return a.newBounds; }).reduce(function (acc, val) { return acc.concat(val); }, []);
}
function isMoveAction(action) {
    return action.kind === sprotty_1.MoveCommand.KIND;
}
function isChangeBounds(action) {
    return action.kind === set_operations_1.OperationKind.CHANGE_BOUNDS;
}
//# sourceMappingURL=layout-commands.spec.js.map