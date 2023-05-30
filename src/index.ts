import { EventAggregator } from "oj-eventaggregator"
import { singleton } from "oj-promise-utils"
import { memoize } from "oj-utils"

export interface IGeoCodeLocation { lat: number, lng: number }

export interface IGeoCodeLocationSearch { location: IGeoCodeLocation }

export interface IGeoCodeAddressSearch { componentRestrictions?: { postalCode: string }, address: string, region: string }

export class Geocoder extends EventAggregator<{
  load: Geocoder
}> {
  private google = singleton(() => new Promise<any>(res => {
    const cbFnHash = `gml_${Math.random().toString(36).substring(7)}`
    window[cbFnHash] = () => res(window["google"])
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.key}&callback=${cbFnHash}`
    document.body.appendChild(script)
    this.emit("load", this)
  }))
  private readonly key: string

  constructor(options: { key: string }) {
    super()
    this.key = options.key
  }

  geocode = memoize(async (search: IGeoCodeLocationSearch | IGeoCodeAddressSearch) => {
    const google = await this.google()
    const geocoder = new google.maps.Geocoder()

    return new Promise<any[]>((res, rej) => geocoder.geocode(search, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK)
        res(results)
      else
        rej(status)
    }))
  })

  async findLatLng(search: IGeoCodeAddressSearch) {
    const results = await this.geocode(search)
    const lat = results[0].geometry.location.lat()
    const lng = results[0].geometry.location.lng()
    return { lat, lng }
  }

  async geocodeLatLn(location: IGeoCodeLocation) {
    const results = await this.geocode({ location })
    return results
  }

  getStreet(result: any) {
    return result.address_components.find(x => x.types.indexOf("route") !== -1).long_name as string
  }

  getPostalCode(result: any) {
    return result.address_components.find(x => x.types.indexOf("postal_code") !== -1).long_name as string
  }

  getCity(result: any) {
    return result.address_components.find(x => x.types.indexOf("locality") !== -1).long_name as string
  }

  getProvince(result: any) {
    return result.address_components.find(x => x.types.indexOf("administrative_area_level_1") !== -1).long_name as string
  }

  getCountry(result: any) {
    return result.address_components.find(x => x.types.indexOf("country") !== -1).long_name as string
  }
}