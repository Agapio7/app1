import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../transaction/transaction.service';
import { Transaction } from '../../model/transaction.model';
import { CampaignService } from '../../campaign/campaign.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss'
})
export class DonationComponent implements OnInit {
  donationForm!: FormGroup;
  paymentMethods: string[] = ['Credit Card', 'PayPal', 'Bank Transfer'];
  campaignId = ''; // Campaign ID for updating collectedAmount

  transactionService = inject(TransactionService);
  campaignService = inject(CampaignService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.campaignId = String(params.get('id')); // Get campaign ID from URL
    });

    // Initialize Form with FormBuilder
    this.donationForm = this.fb.group({
      donatedAmount: [null, [Validators.required, Validators.min(1)]],
      paymentMethod: ['', Validators.required],
      transactionId: [{ value: this.generateTransactionId(), disabled: true }],
      status: [{ value: 'Pending', disabled: true }],
      // donatedDate: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      // message: ['']
    });
  }

  // ✅ Submit donation & update campaign collectedAmount
  submitDonation() {
    if (this.donationForm.invalid) {
      alert('Please fill out the required fields correctly.');
      return;
    }

    const donationData: Transaction = {
      ...this.donationForm.getRawValue(), // Get form values including disabled fields
      userId: String(localStorage.getItem('userId')), // Fetch userId from localStorage
      status: 'Success' // Set status as success
    };

    this.transactionService.createTransaction(donationData).subscribe({
      next: (response) => {
        alert('Thank you for your donation!');
        this.updateCampaignCollectedAmount(donationData.donatedAmount);
        this.resetForm();
      },
      error: (err) => console.error('Donation failed:', err)
    });
  }

  // ✅ Update campaign's collectedAmount after donation
  private updateCampaignCollectedAmount(donatedAmount: number) {
    if (!this.campaignId) return;

    this.campaignService.getCampaignById(this.campaignId).subscribe({
      next: (campaign) => {
        const updatedAmount = (campaign.collectedAmount || 0) + donatedAmount;
        console.log(updatedAmount)
        this.campaignService.updateCampaign(this.campaignId, { collectedAmount: updatedAmount }).subscribe({
          next: () => console.log('Campaign updated successfully'),
          error: (err) => console.error('Error updating campaign:', err)
        });
      },
      error: (err) => console.error('Error fetching campaign:', err)
    });
  }

  // ✅ Generate a unique transaction ID
  private generateTransactionId(): string {
    return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // ✅ Reset form fields after donation
  private resetForm() {
    this.donationForm.reset({
      donatedAmount: null,
      paymentMethod: '',
      transactionId: this.generateTransactionId(),
      status: 'Pending',
      donatedDate: new Date().toISOString().split('T')[0],
      message: ''
    });
  }
}
