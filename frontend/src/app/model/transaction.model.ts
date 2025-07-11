export interface Transaction {
    _id?: string;
    userId: string;
    donatedAmount: number;
    // donatedDate?: Date;
    paymentMethod: string;
    transactionId?: string;
    status: 'Success' | 'Pending' | 'Failed';
    // message?: string;
  }