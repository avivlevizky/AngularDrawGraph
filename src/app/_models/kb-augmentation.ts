import { MessageType } from './enums';
export class KbAugmentationItem {
    _id: string;
    Title: string;
    Command: string;
    ReplaceIds: string[];
    Type: MessageType;

    constructor(kbAugmentationItem?: KbAugmentationItem) {
      this._id = kbAugmentationItem && kbAugmentationItem._id || null;
      this.Title = kbAugmentationItem && kbAugmentationItem.Title || '';
      this.Command = kbAugmentationItem && kbAugmentationItem.Command || '';
      if (kbAugmentationItem) {
        this.Type = kbAugmentationItem.Type;
      } else {
        this.Type = 0;
      }
      this.ReplaceIds = kbAugmentationItem && Array.from(kbAugmentationItem.ReplaceIds) || [];
    }
  }

