export enum MessageType {
    URL = 1,
    Text = 2,
    Plugin = 3,
    Options = 4,
    Flow = 5
}


export const enum ShapeFlowType {
    Condition,
    Action,
    Message,
    Question,
    Cache,
    Start,
    Escape,
    Video,
    Image
}


export const enum ConversationPushNotifyWrapperAction {
    Add,
    Remove
}
