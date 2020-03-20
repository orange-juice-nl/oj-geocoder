# Geocoder
Fetches geocode information from Google Geocoder

## constructor
`new Geocoder(key: string): Geocoder`
Load a Geocoder instance.
Injects and initializes the Google Maps api.

```typescript
const gc = new Geocoder(`[api-key]`)
```

## find
`find(search: IGeoCodeAddressSearch): Promise<IFindResult>`
Uses the findLatLng and geocodeLatLng methods to find geolocation data.
The search.address property can contain multiple address components, for example postal_code and street_number: "6825ME 601".
The search.region property specifies the search region, for example "nl".

```typescript
gc.find({ address: "6825me 601", region: "nl" })
  .then(res =>
    console.log({
      results: res.results,
      country: res.getCountry(),
      province: res.getProvince(),
      city: res.getCity(),
      sub: res.getCitySub(),
      postal: res.getPostalCode(),
      street: res.getStreet(),
      number: res.getStreetNumber()
/*
{
  results: [...],
  country: "Nederland",
  province: "Gelderland",
  city: "Arnhem",
  sub: "IJsseloord",
  postal: "6825 ME",
  street: "Meander",
  number: "601"
}
*/
```

## findLatLng
`findLatLng(search: IGeoCodeAddressSearch): Promise<ILocation>`

```typescript
gc.findLatLng({ address: "6825me 601", region: "nl" })
/*
{
  lat: 51.9776746, 
  lng: 5.9706005
}
*/
```

## geocodeLatLng
`geocodeLatLng(ltLng: ILocation): Promise<IResults>`

```typescript
gc.geocodeLatLng({ lat: 51.9776746, lng: 5.9706005 })
/*
[
  {address_components: Array(7), formatted_address: "Meander 601, 6825 ME Arnhem, Nederland", ...},
  {address_components: Array(7), formatted_address: "Meander 601, 6825 ME Arnhem, Nederland", ...},
  {address_components: Array(7), formatted_address: "Meander 551, 6825 MD Arnhem, Nederland", ...},
  {address_components: Array(6), formatted_address: "Meander, 6825 MS Arnhem, Nederland", ...},
  {address_components: Array(5), formatted_address: "6825 MD Arnhem, Nederland", ...},
  {address_components: Array(6), formatted_address: "IJsseloord, 6825 Arnhem, Nederland", ...},
  {address_components: Array(5), formatted_address: "6825 Arnhem, Nederland", ...},
  {address_components: Array(4), formatted_address: "Arnhem, Nederland", ...},
  {address_components: Array(3), formatted_address: "Arnhem, Nederland", ...},
  {address_components: Array(2), formatted_address: "Gelderland, Nederland", ...},
  {address_components: Array(1), formatted_address: "Nederland", ...},
]
*/
```