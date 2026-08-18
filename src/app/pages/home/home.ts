import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';

import { LandingService } from '../../core/services/landing.service';
import { FaqItem, LandingData, Project } from '../../core/models/landing.model';
import { RevealDirective } from '../../shared/reveal.directive';
import { ShiftAnimateDirective } from '../../shared/shift-animate.directive';

@Component({
  selector: 'app-home',
  imports: [RevealDirective, ShiftAnimateDirective],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly landingService = inject(LandingService);

  readonly isScrolled = signal(false);
  readonly loading = signal(true);
  readonly openFaqId = signal<string | null>(null);
  readonly distributedAmount = signal('+$1.5M');
  readonly projects = signal<Project[]>([]);
  readonly faqs = signal<FaqItem[]>([]);

  ngOnInit(): void {
    this.onScroll();
    this.landingService.getLanding().subscribe({
      next: (data) => this.applyLanding(data),
      error: (error: HttpErrorResponse) => {
        console.warn('Error al cargar datos del landing', error);
        this.loading.set(false);
      },
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleFaq(id: string): void {
    this.openFaqId.update((current) => (current === id ? null : id));
  }

  projectCardClass(project: Project): string {
    const base = 'project-card relative bg-white rounded-2xl p-6 h-full flex flex-col';

    if (project.status === 'sold-out') {
      return `${base} border border-gray-line`;
    }

    if (project.status === 'available') {
      return `${base} border-2 border-blue-vibrant/30 shadow-card`;
    }

    return `${base} border-2 border-lime shadow-card`;
  }

  projectBadgeClass(project: Project): string {
    if (project.status === 'sold-out') {
      return 'status-badge bg-black-deep text-white';
    }

    if (project.status === 'available') {
      return 'status-badge bg-blue-vibrant text-white';
    }

    return 'status-badge bg-lime text-black-deep';
  }

  private applyLanding(data: LandingData): void {
    this.distributedAmount.set(data.distributedAmount);
    this.projects.set(data.projects ?? []);
    this.faqs.set(data.faqs ?? []);
    this.loading.set(false);
  }
}
