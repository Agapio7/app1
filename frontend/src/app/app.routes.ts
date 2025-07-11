import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./page/home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'how-it-works',
        loadComponent: () => import('./page/how-it-works/how-it-works.component').then((m) => m.HowItWorksComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./page/login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./page/register/register.component').then((m) => m.RegisterComponent)
    },
    {
        path: 'start-campaign',
        loadComponent: () => import('./page/start-campaign/start-campaign.component').then((m) => m.StartCampaignComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./page/about/about.component').then((m) => m.AboutComponent)
    },
    {
        path: 'browse',
        loadComponent: () => import('./page/browse/browse.component').then((m) => m.BrowseComponent)
    },
    {
        path: 'campaign-details',
        loadComponent: () => import('./page/campaign-details/campaign-details.component').then((m) => m.CampaignDetailsComponent)
    },
    {
        path: 'success-stories',
        loadComponent: () => import('./page/success-stories/success-stories.component').then((m) => m.SuccessStoriesComponent)
    },
    {
        path: 'campaign-details/:id',
        loadComponent: () => import ('./page/campaign-details/campaign-details.component').then((m) => m.CampaignDetailsComponent)
    },
    {
        path: 'donate/:id',
        loadComponent: () => import ('./page/donation/donation.component').then((m) => m.DonationComponent)
    }
];
