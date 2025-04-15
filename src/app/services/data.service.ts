import { Injectable, signal } from '@angular/core';
import { City, Program, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Cities data using signals
  private readonly citiesSignal = signal<City[]>([
    { id: '1', name: 'Jersey City', slug: 'jersey-city' },
    { id: '2', name: 'Hoboken', slug: 'hoboken' },
    { id: '3', name: 'New York City', slug: 'new-york-city' },
    { id: '4', name: 'San Francisco', slug: 'san-francisco' },
    { id: '5', name: 'Los Angeles', slug: 'los-angeles' }
  ]);

  // Categories data using signals
  private readonly categoriesSignal = signal<Category[]>([
    { id: '1', name: 'Sports', slug: 'sports' },
    { id: '2', name: 'Dance', slug: 'dance' },
    { id: '3', name: 'Music', slug: 'music' },
    { id: '4', name: 'Art', slug: 'art' },
    { id: '5', name: 'Fitness', slug: 'fitness' },
    { id: '6', name: 'Technology', slug: 'technology' },
    { id: '7', name: 'Cooking', slug: 'cooking' },
    { id: '8', name: 'Photography', slug: 'photography' },
    { id: '9', name: 'Education', slug: 'education' },
    { id: '10', name: 'Health', slug: 'health' },
    { id: '11', name: 'Business', slug: 'business' },
    { id: '12', name: 'Travel', slug: 'travel' }
  ]);

  // Programs data using signals
  private readonly programsSignal = signal<Program[]>([
    { id: '1', name: 'Soccer Training', slug: 'soccer-training', cityId: '1', categoryId: '1', description: 'Learn soccer skills in Jersey City' },
    { id: '2', name: 'Basketball Skills', slug: 'basketball-skills', cityId: '1', categoryId: '1', description: 'Basketball training for all ages' },
    { id: '3', name: 'Hip Hop Dance', slug: 'hip-hop-dance', cityId: '1', categoryId: '2', description: 'Learn hip hop dance moves' },
    { id: '4', name: 'Yoga Basics', slug: 'yoga-basics', cityId: '2', categoryId: '5', description: 'Introduction to yoga practices' },
    { id: '5', name: 'Advanced Cooking', slug: 'advanced-cooking', cityId: '2', categoryId: '7', description: 'Take your cooking skills to the next level' },
    { id: '6', name: 'Photography 101', slug: 'photography-101', cityId: '3', categoryId: '8', description: 'Learn the basics of photography' },
    { id: '7', name: 'Art for Beginners', slug: 'art-for-beginners', cityId: '3', categoryId: '4', description: 'Start your journey into art' },
    { id: '8', name: 'Fitness Bootcamp', slug: 'fitness-bootcamp', cityId: '4', categoryId: '5', description: 'Intensive fitness training' },
    { id: '9', name: 'Business Strategies', slug: 'business-strategies', cityId: '4', categoryId: '11', description: 'Learn effective business strategies' },
    { id: '10', name: 'Travel Photography', slug: 'travel-photography', cityId: '5', categoryId: '8', description: 'Capture your travel moments' },
    { id: '11', name: 'Health Coaching', slug: 'health-coaching', cityId: '5', categoryId: '10', description: 'Personal health coaching sessions' },
    { id: '12', name: 'Digital Marketing', slug: 'digital-marketing', cityId: '1', categoryId: '11', description: 'Learn digital marketing skills' },
    { id: '13', name: 'Web Development', slug: 'web-development', cityId: '2', categoryId: '6', description: 'Become a web developer' },
    { id: '14', name: 'Graphic Design', slug: 'graphic-design', cityId: '3', categoryId: '4', description: 'Master graphic design principles' },
    { id: '15', name: 'Music Production', slug: 'music-production', cityId: '4', categoryId: '3', description: 'Create and produce music' },
    { id: '16', name: 'Personal Finance', slug: 'personal-finance', cityId: '5', categoryId: '11', description: 'Manage your personal finances' },
    { id: '17', name: 'Language Learning', slug: 'language-learning', cityId: '1', categoryId: '9', description: 'Learn a new language' },
    { id: '18', name: 'Marketing Analytics', slug: 'marketing-analytics', cityId: '2', categoryId: '11', description: 'Analyze marketing data' },
    { id: '19', name: 'Leadership Training', slug: 'leadership-training', cityId: '3', categoryId: '9', description: 'Develop leadership skills' },
    { id: '20', name: 'Creative Writing', slug: 'creative-writing', cityId: '4', categoryId: '9', description: 'Express yourself through writing' },
    { id: '21', name: 'Public Speaking', slug: 'public-speaking', cityId: '5', categoryId: '9', description: 'Become a confident speaker' },
    { id: '22', name: 'Fashion Design', slug: 'fashion-design', cityId: '1', categoryId: '4', description: 'Design your own fashion pieces' },
    { id: '23', name: 'Interior Design', slug: 'interior-design', cityId: '2', categoryId: '4', description: 'Learn interior design principles' },
    { id: '24', name: 'Nutrition and Wellness', slug: 'nutrition-wellness', cityId: '3', categoryId: '10', description: 'Improve your nutrition habits' }
  ]);

  // Public getters for the signals
  public get cities() {
    return this.citiesSignal();
  }

  public get categories() {
    return this.categoriesSignal();
  }

  public get programs() {
    return this.programsSignal();
  }

  constructor() { }

  /**
   * Get a city by its slug
   * @param slug The city slug to search for
   * @returns The city if found, undefined otherwise
   */
  getCityBySlug(slug: string): City | undefined {
    return this.cities.find(city => city.slug === slug);
  }

  /**
   * Get a category by its slug
   * @param slug The category slug to search for
   * @returns The category if found, undefined otherwise
   */
  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find(category => category.slug === slug);
  }

  /**
   * Get a program by its slug
   * @param slug The program slug to search for
   * @returns The program if found, undefined otherwise
   */
  getProgramBySlug(slug: string): Program | undefined {
    return this.programs.find(program => program.slug === slug);
  }

  /**
   * Filter programs based on city, program, and category slugs
   * @param citySlug The city slug to filter by
   * @param programSlug The program slug to filter by
   * @param categorySlug The category slug to filter by
   * @returns Filtered programs
   */
  filterPrograms(citySlug?: string, programSlug?: string, categorySlug?: string): Program[] {
    let filteredPrograms = this.programs;
    
    // If we have a specific program slug, just return that program
    if (programSlug) {
      const program = this.getProgramBySlug(programSlug);
      return program ? [program] : [];
    }
    
    // Filter by city if provided
    if (citySlug) {
      const city = this.getCityBySlug(citySlug);
      if (city) {
        filteredPrograms = filteredPrograms.filter(program => program.cityId === city.id);
      } else {
        return []; // City not found, return empty array
      }
    }
    
    // Filter by category if provided
    if (categorySlug) {
      const category = this.getCategoryBySlug(categorySlug);
      if (category) {
        filteredPrograms = filteredPrograms.filter(program => program.categoryId === category.id);
      } else {
        return []; // Category not found, return empty array
      }
    }
    
    return filteredPrograms;
  }
}
