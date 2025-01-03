import { HomeCategory } from "./homeDataTypes";

export interface Deal {
  id?: number;
  discount: number;
  homeCategory?: HomeCategory; // Make it optional
}

// types.ts
  
  export interface ApiResponse {
    message: string;
    status: boolean;
  }
  
  export interface DealsState {
    deals: Deal[];
    loading: boolean;
    error: string | null;
    dealCreated:boolean,
    dealUpdated:boolean,
  }
  