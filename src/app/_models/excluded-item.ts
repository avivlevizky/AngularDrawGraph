export class ExcludedItem {
    _id: string;
    ID: string;
    Reason: string;


    constructor(excludedItemnItem?: ExcludedItem) {
      this._id = excludedItemnItem && excludedItemnItem._id || null;
      this.ID = excludedItemnItem && excludedItemnItem.ID || '';
      this.Reason = excludedItemnItem && excludedItemnItem.Reason || '';
    }
  }

