import { Category } from './category';

export interface AppEvent {  // Renommer l'interface en AppEvent
  id?: string;  // Optionnel pour la création
  title: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  category: Category;
}
