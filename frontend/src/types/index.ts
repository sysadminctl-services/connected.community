// Describe la estructura de un Condominio tal como la recibimos de la API
export interface Condominium {
  id: number;
  name: string;
  street: string;
  neighborhood: string;
  municipality: string;
  state: string;
  postalCode: string;
  exteriorNumber: string;
  interiorNumber?: string | null;
  logoUrl?: string | null;
  phone?: string | null;
  taxId: string;
  fiscalRegimeCode: string;
  administratorId: number;
}

// Describe la forma de los datos que enviamos para CREAR un condominio.
// Usamos 'Omit' para tomar todos los campos de 'Condominium' EXCEPTO 'id'.
export type CreateCondominiumData = Omit<Condominium, 'id'>;