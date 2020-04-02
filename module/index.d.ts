declare type IAction = {
    name: string;
    properties: {
        [key: string]: any;
    };
};
export declare const getCachedActions: () => IAction[];
export declare const resetCachedActions: () => void;
export declare const setRunDry: (newRunDry: boolean) => void;
export declare const setApiKey: (newKey: string, force?: boolean) => void;
export declare const sendAction: (name: string, properties?: {
    [key: string]: any;
}) => Promise<IAction[]>;
export {};
