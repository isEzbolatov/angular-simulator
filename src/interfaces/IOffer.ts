export interface IOfferFeature {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export interface IOffer {
    id: number;
    title: string;
    description: string;
    features: IOfferFeature[];
}