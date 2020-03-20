import { EventAggregator } from "oj-eventaggregator"

export const googleMapsLoader = (key: string) =>
  new Promise<any>(res => {
    const cbFnHash = `gml_${Math.random().toString(36).substring(7)}`
    window[cbFnHash] = () => res(window["google"])
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${cbFnHash}`
    document.body.appendChild(script)
  })

export interface IGeoCodeLocationSearch { location: ILocation }

export interface IGeoCodeAddressSearch { address: string, region: string }

export type IResults = IResult[]

export interface IResult {
  address_components: IAddresscomponent[]
  formatted_address: string
  geometry: IGeometry
  place_id: string
  plus_code?: {
    compound_code: string
    global_code: string
  }
  types: string[]
}

export interface IGeometry {
  location: ILocation
  location_type: string
  viewport: IViewport
  bounds?: IViewport
}

export interface IViewport {
  south: number
  west: number
  north: number
  east: number
}

export interface ILocation {
  lat: number
  lng: number
}

export interface IAddresscomponent {
  long_name: string
  short_name: string
  types: string[]
}

export class Geocoder extends EventAggregator<"load"> {
  google: any

  constructor(key: string) {
    super()
    googleMapsLoader(key)
      .then(google => {
        this.google = google
        this.emit("load", this)
      })
  }

  // load() {
  //   if (this.google !== undefined) return Promise.resolve(this.google)
  //   return new Promise<any>(res => this.once("load", () => res(this.google)))
  // }

  async find(search: IGeoCodeAddressSearch) {
    const results = await this.geocodeLatLng(await this.findLatLng(search))
    const cache = {}
    return {
      results,
      getCountry: () => {
        if (!cache["getCountry"])
          cache["getCountry"] = this.firstResult(results, "country")
        return cache["getCountry"]
      },
      getProvince: () => {
        if (!cache["getProvince"])
          cache["getProvince"] = this.firstResult(results, "administrative_area_level_1")
        return cache["getProvince"]
      },
      getCity: () => {
        if (!cache["getCity"])
          cache["getCity"] = this.firstResult(results, "locality")
        return cache["getCity"]
      },
      getCitySub: () => {
        if (!cache["getCitySub"])
          cache["getCitySub"] = this.firstResult(results, "sublocality")
        return cache["getCitySub"]
      },
      getPostalCode: () => {
        if (!cache["getPostalCode"])
          cache["getPostalCode"] = this.firstResult(results, "postal_code")
        return cache["getPostalCode"]
      },
      getStreet: () => {
        if (!cache["getStreet"])
          cache["getStreet"] = this.firstResult(results, "route")
        return cache["getStreet"]
      },
      getStreetNumber: () => {
        if (!cache["getStreetNumber"])
          cache["getStreetNumber"] = this.firstResult(results, "street_number")
        return cache["getStreetNumber"]
      },
    }
  }

  firstResult(results: IResults, type: string) {
    for (const { address_components: a } of results) {
      const r = a.find(x => x.types.includes(type))
      if (r)
        return r.long_name
    }
    return null
  }

  async geocode(search: IGeoCodeLocationSearch | IGeoCodeAddressSearch) {
    return new Promise<any>((res, rej) => {
      const geocoder = new this.google.maps.Geocoder()
      geocoder.geocode(search, (results, status) => {
        if (status == this.google.maps.GeocoderStatus.OK)
          res(results)
        else
          rej(status)
      })
    })
  }

  async findLatLng(search: IGeoCodeAddressSearch): Promise<ILocation> {
    const results = await this.geocode(search)
    const lat = results[0].geometry.location.lat()
    const lng = results[0].geometry.location.lng()
    return { lat, lng }
  }

  async geocodeLatLng(ltLng: ILocation): Promise<IResults> {
    return await this.geocode({ location: ltLng })
  }
}