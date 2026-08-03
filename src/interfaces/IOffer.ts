import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IOfferFeature {
    id: number;
    icon: IconDefinition;
    iconClass: string;
    title: string;
    description: string;
}

export interface IOffer {
    id: number;
    title: string;
    description: string;
    features: IOfferFeature[];
}