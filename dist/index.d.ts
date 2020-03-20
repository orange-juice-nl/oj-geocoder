import { EventAggregator } from "oj-eventaggregator";
export declare const googleMapsLoader: (key: string) => Promise<any>;
export interface IGeoCodeLocationSearch {
    location: ILocation;
}
export interface IGeoCodeAddressSearch {
    address: string;
    region: string;
}
export declare type IResults = IResult[];
export interface IResult {
    address_components: IAddresscomponent[];
    formatted_address: string;
    geometry: IGeometry;
    place_id: string;
    plus_code?: {
        compound_code: string;
        global_code: string;
    };
    types: string[];
}
export interface IGeometry {
    location: ILocation;
    location_type: string;
    viewport: IViewport;
    bounds?: IViewport;
}
export interface IViewport {
    south: number;
    west: number;
    north: number;
    east: number;
}
export interface ILocation {
    lat: number;
    lng: number;
}
export interface IAddresscomponent {
    long_name: string;
    short_name: string;
    types: string[];
}
export declare class Geocoder extends EventAggregator<"load"> {
    google: any;
    constructor(key: string);
    find(search: IGeoCodeAddressSearch): Promise<{
        results: IResults;
        getCountry: () => any;
        getProvince: () => any;
        getCity: () => any;
        getCitySub: () => any;
        getPostalCode: () => any;
        getStreet: () => any;
        getStreetNumber: () => any;
    }>;
    firstResult(results: IResults, type: string): string;
    geocode(search: IGeoCodeLocationSearch | IGeoCodeAddressSearch): Promise<any>;
    findLatLng(search: IGeoCodeAddressSearch): Promise<ILocation>;
    geocodeLatLng(ltLng: ILocation): Promise<IResults>;
}
