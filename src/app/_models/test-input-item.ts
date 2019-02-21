export class TestInputItem {
    _id: string;
    Active: boolean;
    TestRequest: string;
    ExpectedResponses: ExpectedResponseItem[];

    constructor(testInputItem?: TestInputItem) {
      this._id = testInputItem && testInputItem._id || null;
      if (testInputItem) {
        this.Active = testInputItem.Active;
      } else {
        this.Active =  true;
      }
      this.TestRequest = testInputItem && testInputItem.TestRequest || '';
      this.ExpectedResponses = testInputItem && Array.from(testInputItem.ExpectedResponses) || [];
    }
  }

export class ExpectedResponseItem {
    Content: string;
    Score: number;
  }
