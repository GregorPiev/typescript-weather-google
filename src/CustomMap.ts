import * as google from 'google-maps';

export interface IMappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleCustomMap: globalThis.google.maps.Map<HTMLElement>;
  private googleCreator: any;

  constructor(private mapDivId: string) {
    this.initMap();
  }

  initMap(): void {
    // setTimeout(() => {
    const loader = new google.Loader(
      'AIzaSyBh_ohS4Ihf9k415RUqPNAJ6N7AMPIfiT8',
      {}
    );
    loader
      .load()
      .then(val => {
        this.googleCreator = val;

        this.googleCustomMap = new val.maps.Map<HTMLElement>(
          document.getElementById(this.mapDivId) as HTMLElement,
          {
            zoom: 1,
            center: {
              lat: 0,
              lng: 0
            }
          }
        );
      })
      .catch(err => {
        console.log('err:', err.message);
      });
    // }, 40);
  }

  addMarker(mappable: IMappable): void {
    setTimeout(() => {
      const marker = new this.googleCreator.maps.Marker({
        map: this.googleCustomMap,
        position: {
          lat: mappable.location.lat,
          lng: mappable.location.lng
        }
      });

      marker.addListener('click', () => {
        const infoWindow = new this.googleCreator.maps.InfoWindow({
          content: mappable.markerContent()
        });

        infoWindow.open(this.googleCustomMap, marker);
      });
    }, 1000);
  }
}
