import { ConversationPushNotifyWrapperAction } from './enums';

/**
* UserChatActivity
*/

export interface UserChatActivity {
  UserMessage: string;
}

/**
* BotChatActivity
*/

export interface BotChatActivity {
  BotMessage: string;
}

/**
* ChatActivity
*/

export class ChatActivity implements BotChatActivity, UserChatActivity {
  // TimeStamp: Date;
  BotMessage: string;
  UserMessage: string;
}

/**
 * User rating item
 */
export interface UserRatingItem {
  Description: string;
  ID: string;
  Rating: string;
}

/**
 * Conversation history item
 */
export interface ConversationItem {
  Idsid: string;
  TimeStamp: Date;
  _id: string;
  UserRatings: UserRatingItem[];
  Conversation: ChatActivity[];
  IsReviewed: boolean;
  Show: boolean;
}

/**
 * Generic Aggregated Items By Page
 */
export interface AggregatedItemsPage<T> {
  Data: T[];
  DBHash: string;
  Date: Date;
}


export interface Pair<K, V> {
  key: K;
  value: V;
}


export interface ConversationPushNotifyWrapper {
  Item: ConversationItem;
  Action: ConversationPushNotifyWrapperAction;
  DbHash: string;
}
