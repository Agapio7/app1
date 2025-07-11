import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'http://localhost:3000/api/campaignRoutes/campaigns'; 

  http = inject(HttpClient)

  // ✅ Create a new campaign
  createCampaign(campaignData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, campaignData);
  }

  // ✅ Get all campaigns
  getAllCampaigns(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // ✅ Get a single campaign by ID
  getCampaignById(campaignId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${campaignId}`);
  }

  // ✅ Update a campaign
  updateCampaign(campaignId: string, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${campaignId}`, updateData);
  }

  // ✅ Delete a campaign
  deleteCampaign(campaignId: string, userId: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${campaignId}`, {
      body: { userId }
    });
  }
}
