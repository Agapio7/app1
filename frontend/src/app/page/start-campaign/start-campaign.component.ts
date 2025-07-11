import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CampaignService } from '../../campaign/campaign.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-start-campaign',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './start-campaign.component.html',
  styleUrl: './start-campaign.component.scss'
})

export class StartCampaignComponent {
  campaignForm: FormGroup;
  categories: string[] = ['Education', 'Healthcare', 'Environment', 'Technology', 'Others'];
  userId = signal(localStorage.getItem('userId'))

  constructor(private fb: FormBuilder, private campaignService: CampaignService) {
    this.campaignForm = this.fb.group({
      userId: [localStorage.getItem('userId'), Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      goal: [null, [Validators.required, Validators.min(1)]],
      enddate: ['', Validators.required] //  Fix key from 'enddate' to 'endDate'
    });
  }

  handleCampaignSubmit() {
    if (this.campaignForm.invalid) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    // Convert date to "YYYY-MM-DDTHH:mm:ss.SSS+00:00" format
    const selectedDate = new Date(this.campaignForm.value.enddate);
    const formattedDate = selectedDate.toISOString(); // Converts to UTC format

    const campaignData = {
      userId: String(this.campaignForm.value.userId),
      title: String(this.campaignForm.value.title),
      category: String(this.campaignForm.value.category),
      description: String(this.campaignForm.value.description),
      targetAmount: Number(this.campaignForm.value.goal), 
      endDate: (formattedDate), 
      collectedAmount: 0
    };

    this.campaignService.createCampaign(campaignData).subscribe({
      next: (response) => {
        console.log('Campaign created:', response);
        alert('Campaign created successfully!');
        this.campaignForm.reset();
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to create campaign');
      }
    });
  }
}