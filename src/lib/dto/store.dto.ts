export interface StoreInformationDto {
  id: string;
  name: string;
  description: string;
  logo: string | null;
}

export interface StoreDetailDto {
  id: string;
  name: string;
  logo: string | null;
  regencies: string;
  createdAt: Date;
}
