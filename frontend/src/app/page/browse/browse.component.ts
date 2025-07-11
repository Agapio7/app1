import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CampaignService } from '../../campaign/campaign.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent {
  campaignService = inject(CampaignService)
  searchQuery: string = '';
  selectedCategory: string = '';
  sortOption: string = 'newest';
  campaigns: any[] = [];
  filteredCampaigns: any[] = [];
  categories = ['Education', 'Healthcare', 'Environment', 'Technology', 'Others'];

  ngOnInit() {
    this.fetchCampaigns();
  }
  
  fetchCampaigns() {
    this.campaignService.getAllCampaigns().subscribe(
      (data) => {
        this.campaigns = data;
        this.filterCampaigns(); // Apply filtering after fetching
      },
      (error) => {
        console.error('Error fetching campaigns:', error);
      }
    );
  }


  filterCampaigns() {
    let filtered = this.campaigns.filter(campaign =>
      (this.selectedCategory === '' || campaign.category === this.selectedCategory) &&
      (this.searchQuery === '' || campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );

    this.sortCampaigns(filtered); // Apply sorting after filtering
  }


  sortCampaigns(campaigns: any[]) {
    let sortedCampaigns = [...campaigns];

    if (this.sortOption === 'newest') {
      sortedCampaigns.sort((a, b) => b.id - a.id);
    } else if (this.sortOption === 'popular') {
      sortedCampaigns.sort((a, b) => b.raised - a.raised);
    } else if (this.sortOption === 'ending') {
      sortedCampaigns.sort((a, b) => a.raised - b.raised);
    }

    this.filteredCampaigns = sortedCampaigns;
  }
}
