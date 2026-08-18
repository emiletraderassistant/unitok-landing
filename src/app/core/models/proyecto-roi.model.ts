export interface ProyectoRoiData {
  roiPerNFT: number;
  annualROI: number;
  totalEarningsPerNFT: number;
  totalDistributions: number;
  currency: string;
  monthsActive: number;
}

export interface ProyectoRoi {
  id: number;
  titulo: string;
  numnfts: number;
  minprice: number;
  roi: ProyectoRoiData;
}
