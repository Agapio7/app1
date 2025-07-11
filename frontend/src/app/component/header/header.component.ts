import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName: string | null = null;
  isHomePage = false;
  showBrowse = true;
  showStartCampaign = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/';
        this.updateNavbarVisibility(event.url);
      }
    });
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
    this.userName = null;
    this.router.navigate(['/']);
  }

  updateNavbarVisibility(url: string) {
    if (url === '/dashboard') {
      this.showBrowse = false;
      this.showStartCampaign = false;
    } else {
      this.showBrowse = true;
      this.showStartCampaign = true;
    }
  }
}