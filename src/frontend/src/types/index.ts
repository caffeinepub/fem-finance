export interface LeadInput {
  name: string;
  phone: string;
  city: string;
  serviceTag?: string;
}

export interface ContactInput {
  name: string;
  phone: string;
  message: string;
}

export type Language = "EN" | "HI";

export interface NavTab {
  path: string;
  labelEN: string;
  labelHI: string;
  icon: string;
}
