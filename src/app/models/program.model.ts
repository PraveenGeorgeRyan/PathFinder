/**
 * Interface representing a program
 */
export interface Program {
  id: string;
  name: string;
  slug: string;
  cityId: string;
  categoryId: string;
  description?: string;
}
