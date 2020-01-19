import { Action, EditableLabel, EditLabelValidationResult, IEditLabelValidationDecorator, IEditLabelValidator, RequestAction, ResponseAction, SModelElement } from "sprotty";
import { GLSPActionDispatcher } from "../request-response/glsp-action-dispatcher";
export declare class ValidateLabelEditAction implements RequestAction<SetLabelEditValidationResultAction> {
    readonly value: string;
    readonly labelId: string;
    readonly requestId: string;
    static readonly KIND = "validateLabelEdit";
    kind: string;
    constructor(value: string, labelId: string, requestId?: string);
}
export declare class SetLabelEditValidationResultAction implements ResponseAction {
    readonly result: EditLabelValidationResult;
    readonly responseId: string;
    static readonly KIND = "setLabelEditValidationResult";
    kind: string;
    constructor(result: EditLabelValidationResult, responseId?: string);
}
export declare function isSetLabelEditValidationResultAction(action: Action): action is SetLabelEditValidationResultAction;
export declare class ServerEditLabelValidator implements IEditLabelValidator {
    protected actionDispatcher: GLSPActionDispatcher;
    validate(value: string, label: EditableLabel & SModelElement): Promise<EditLabelValidationResult>;
    getValidationResultFromResponse(action: Action): EditLabelValidationResult;
}
export declare class BalloonLabelValidationDecorator implements IEditLabelValidationDecorator {
    decorate(input: HTMLInputElement, result: EditLabelValidationResult): void;
    dispose(input: HTMLInputElement): void;
}
//# sourceMappingURL=edit-label-validator.d.ts.map