import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CampaignService } from '../../campaign/campaign.service';
import { Campaign } from '../../model/campaign.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.scss'
})
export class CampaignDetailsComponent implements OnInit{
  campaignService = inject(CampaignService)
  authService = inject(AuthService)
  route = inject(ActivatedRoute)
  campaignId = ''
  username= ''
  userId:String = ''
  daysLeft = ""
  campaign:Campaign | null = null

  ngOnInit(): void {
    // Subscribe to the paramMap Observable to get the 'id' parameter
    this.route.paramMap.subscribe(params => {
      this.campaignId = String(params.get('id')); 
    });
    this.campaignService.getCampaignById(this.campaignId).subscribe(
      (data) => {
        this.campaign = data;
        this.userId = String(this.campaign?.userId)
        this.daysLeft = (String(this.campaign?.endDate)).slice(0,10)
      },
      (error) => {
        console.error('Error fetching campaigns:', error);
      }
    );
  }



  
  tasks = [
    'Construct 3 new school buildings',
    'Equip classrooms with modern learning tools',
    'Create safe and inspiring learning environments',
    'Provide educational resources and materials'
  ]

  impact = 'This project will directly benefit over 500 People and encourage employment.'

  proofImages = [
    'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1522661067900-ab829854a57f?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=300&h=200&fit=crop'
  ]

  donate() {
    console.log('Donation button clicked');
    // Implement donation functionality here
  }
}
