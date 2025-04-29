export interface User {
    id?: string; // optionnel pour la création
    username: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN'; // adapte selon ton enum côté Java
    available: boolean;
    skills: string[];
  }
  