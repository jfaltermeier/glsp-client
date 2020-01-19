"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("sprotty/lib");
var change_bounds_tool_1 = require("./change-bounds-tool");
var delete_tool_1 = require("./delete-tool");
var edge_edit_tool_1 = require("./edge-edit-tool");
function registerDefaultTools(container) {
    var toolManager = container.get(lib_1.TYPES.IToolManager);
    toolManager.registerDefaultTools(container.resolve(change_bounds_tool_1.ChangeBoundsTool), container.resolve(edge_edit_tool_1.EdgeEditTool), container.resolve(delete_tool_1.DelKeyDeleteTool));
    toolManager.registerTools(container.resolve(delete_tool_1.MouseDeleteTool));
    toolManager.enableDefaultTools();
}
exports.registerDefaultTools = registerDefaultTools;
//# sourceMappingURL=default-tools.js.map