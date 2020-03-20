import { EventAggregator } from "oj-eventaggregator";
export declare const googleMapsLoader: (key: string) => Promise<any>;
export interface IGeoCodeLocation {
    lat: number;
    lng: number;
}
export interface IGeoCodeLocationSearch {
    location: IGeoCodeLocation;
}
export interface IGeoCodeAddressSearch {
    address: string;
    region: string;
}
export declare class Geocoder extends EventAggregator<"load"> {
    google: any;
    constructor(options: {
        key: string;
    });
    load(): Promise<any>;
    geocode(search: IGeoCodeLocationSearch | IGeoCodeAddressSearch): Promise<any>;
    findLatLng(search: IGeoCodeAddressSearch): Promise<IGeoCodeLocation>;
    geocodeLatLng(ltLng: IGeoCodeLocation): Promise<any>;
    getPostalCode(result: any): string;
    getStreet(result: any): string;
    getCity(result: any): string;
}
