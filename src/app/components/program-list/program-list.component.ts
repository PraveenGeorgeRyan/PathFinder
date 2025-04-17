import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService, ValidationService } from '../../services';
import { Program, City, Category } from '../../models';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.scss'
})
export class ProgramListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);
  private validationService = inject(ValidationService);

  // Signals for reactive state management
  programs = signal<Program[]>([]);
  categories = signal<Category[]>([]);
  
  citySlug = signal<string>('');
  programSlug = signal<string>('');
  categorySlug = signal<string>('');
  
  cityName = signal<string>('');
  programName = signal<string>('');
  categoryName = signal<string>('');

  ngOnInit(): void {
    // Subscribe to route params to get URL parameters
    this.route.paramMap.subscribe(params => {
      const city = params.get('city') || '';
      const program = params.get('program') || '';
      const category = params.get('category') || '';
      
      // Update our signals
      this.citySlug.set(city);
      this.programSlug.set(program);
      this.categorySlug.set(category);
      
      // Validate the URL parameters
      if (!this.validateParameters(city, program, category)) {
        // If invalid, redirect to 404 page
        this.router.navigate(['/not-found']);
        return;
      }
      
      // Set names for display
      this.setNames();
      
      // Filter programs based on URL parameters
      this.filterPrograms();
      
      // Load categories for filtering
      this.loadCategories();
    });
  }

  /**
   * Set names for display based on slugs
   */
  private setNames(): void {
    const city = this.dataService.getCityBySlug(this.citySlug());
    if (city) {
      this.cityName.set(city.name);
    }
    
    const program = this.dataService.getProgramBySlug(this.programSlug());
    if (program) {
      this.programName.set(program.name);
    }
    
    const category = this.dataService.getCategoryBySlug(this.categorySlug());
    if (category) {
      this.categoryName.set(category.name);
    }
  }

  /**
   * Filter programs based on URL parameters
   */
  private filterPrograms(): void {
    const filteredPrograms = this.dataService.filterPrograms(
      this.citySlug(),
      this.programSlug(),
      this.categorySlug()
    );
    this.programs.set(filteredPrograms);
  }

  /**
   * Load categories for filtering
   */
  private loadCategories(): void {
    this.categories.set(this.dataService.categories);
  }

  /**
   * Get category name by ID
   */
  getCategoryName(categoryId: string): string {
    const category = this.dataService.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

  /**
   * Check if any filters are applied
   */
  hasFilters(): boolean {
    return !!this.citySlug();
  }

  /**
   * Validate all URL parameters
   */
  private validateParameters(city: string, program?: string, category?: string): boolean {
    // Empty city is invalid - we always need at least a city
    if (!city) {
      return false;
    }
    
    // Use validation service to validate parameter combination
    return this.validationService.validateUrlParameters(city, program, category);
  }
}
