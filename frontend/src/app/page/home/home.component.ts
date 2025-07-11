import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentSlide = 0;

  slides = [
    { image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1200', title: 'Building Strong Communities', description: 'Join us in making a difference.' },
    { image: 'https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&q=80&w=1200', title: 'Education for Everyone', description: 'Help support learning initiatives worldwide.' },
    { image: 'https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?auto=format&fit=crop&q=80&w=1200', title: 'Volunteer to Make an Impact', description: 'Your efforts bring change.' }
  ];

  campaigns = [
    {
      title: 'Build Schools for Rural Communities',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=300&fit=crop',
      description: 'Help us construct modern educational facilities for children in underserved areas.',
      progress: 75,
      raised: 75000,
      daysLeft: 15
    },
    {
      title: 'Clean Water Initiative',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&h=300&fit=crop',
      description: 'Providing clean drinking water to communities facing water scarcity.',
      progress: 85,
      raised: 85000,
      daysLeft: 10
    },
    {
      title: 'Reforestation Project',
      category: 'Environment',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
      description: 'Help us plant trees and restore damaged ecosystems worldwide.',
      progress: 60,
      raised: 60000,
      daysLeft: 20
    },
    {
      title: 'Digital Education Access',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1593113598332-cd59c5a3f40e?w=500&h=300&fit=crop',
      description: 'Providing laptops and internet access to underprivileged students.',
      progress: 45,
      raised: 45000,
      daysLeft: 25
    },
    {
      title: 'Community Art Center',
      category: 'Arts',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=300&fit=crop',
      description: 'Building a space for artists to create and teach in our community.',
      progress: 70,
      raised: 70000,
      daysLeft: 18
    },
    {
      title: 'Youth Sports Program',
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=300&fit=crop',
      description: 'Creating opportunities for youth through sports and mentorship.',
      progress: 35,
      raised: 35000,
      daysLeft: 30
    }
  ];


  categories = [
    { title: 'Education', icon: '📚', description: 'Support learning initiatives worldwide' },
    { title: 'Healthcare', icon: '🏥', description: 'Help provide medical assistance' },
    { title: 'Environment', icon: '🌱', description: 'Protect our planet’s future' },
    { title: 'Technology', icon: '💻', description: 'Drive innovation forward' },
    { title: 'Others', icon: '🔍', description: 'Explore more categories' }
  ];

  ngAfterViewInit() {
    // Apply fade-in animation on page load
    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => el.classList.add('show'));
    }, 100);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
