import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private dataService: DataService) { }

  /**
   * Validate if a city slug exists
   * @param citySlug The city slug to validate
   * @returns True if valid, false otherwise
   */
  isCityValid(citySlug: string): boolean {
    return !!this.dataService.getCityBySlug(citySlug);
  }

  /**
   * Validate if a program slug exists
   * @param programSlug The program slug to validate
   * @returns True if valid, false otherwise
   */
  isProgramValid(programSlug: string): boolean {
    return !!this.dataService.getProgramBySlug(programSlug);
  }

  /**
   * Validate if a category slug exists
   * @param categorySlug The category slug to validate
   * @returns True if valid, false otherwise
   */
  isCategoryValid(categorySlug: string): boolean {
    return !!this.dataService.getCategoryBySlug(categorySlug);
  }

  /**
   * Validate if a program belongs to a city
   * @param citySlug The city slug
   * @param programSlug The program slug
   * @returns True if the program belongs to the city, false otherwise
   */
  isProgramInCity(citySlug: string, programSlug: string): boolean {
    const city = this.dataService.getCityBySlug(citySlug);
    const program = this.dataService.getProgramBySlug(programSlug);
    
    if (!city || !program) {
      return false;
    }
    
    return program.cityId === city.id;
  }

  /**
   * Validate if a program belongs to a category
   * @param categorySlug The category slug
   * @param programSlug The program slug
   * @returns True if the program belongs to the category, false otherwise
   */
  isProgramInCategory(categorySlug: string, programSlug: string): boolean {
    const category = this.dataService.getCategoryBySlug(categorySlug);
    const program = this.dataService.getProgramBySlug(programSlug);
    
    if (!category || !program) {
      return false;
    }
    
    return program.categoryId === category.id;
  }

  /**
   * Validate the entire URL parameter combination
   * @param citySlug The city slug
   * @param programSlug The program slug (optional)
   * @param categorySlug The category slug (optional)
   * @returns True if the combination is valid, false otherwise
   */
  validateUrlParameters(citySlug: string, programSlug?: string, categorySlug?: string): boolean {
    // First check if city is valid - this is always required
    if (!citySlug || !this.isCityValid(citySlug)) {
      return false;
    }
    
    // If program is provided, validate it exists and belongs to the city
    if (programSlug) {
      if (!this.isProgramValid(programSlug)) {
        return false;
      }
      
      // Check if program belongs to the specified city
      if (!this.isProgramInCity(citySlug, programSlug)) {
        return false;
      }
    }
    
    // If category is provided, validate it exists
    if (categorySlug) {
      if (!this.isCategoryValid(categorySlug)) {
        return false;
      }
      
      // If both program and category are provided, check program belongs to category
      if (programSlug) {
        if (!this.isProgramInCategory(categorySlug, programSlug)) {
          return false;
        }
      } else {
        // If only category is provided (no program), check if any program in the city belongs to this category
        const city = this.dataService.getCityBySlug(citySlug);
        const programs = this.dataService.programs.filter(p => p.cityId === city?.id);
        const categoryHasPrograms = programs.some(p => {
          const category = this.dataService.getCategoryBySlug(categorySlug);
          return p.categoryId === category?.id;
        });
        
        if (!categoryHasPrograms) {
          return false; // Category exists but has no programs in this city
        }
      }
    }
    
    return true;
  }
}
