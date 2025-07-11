export interface Campaign {
    _id: string;
    userId: string;
    title: string;
    description: string;
    category: string;
    targetAmount: number;
    collectedAmount: number;
    image: string;
    endDate: string;
    campaignId: string;
    [key: string]: any; // Allow additional properties
  }
  