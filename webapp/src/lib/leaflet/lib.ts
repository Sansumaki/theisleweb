import L from 'leaflet';

export class LatLngConverter {
    private _isleTopLeft: L.LatLng;
    private _isleBottomRight: L.LatLng;

    constructor(isleTopLeft: L.LatLng, isleBottomRight: L.LatLng) {
        this._isleTopLeft = isleTopLeft;
        this._isleBottomRight = isleBottomRight;
    }

    RotateCoordinates(latLng: L.LatLng): L.LatLng {
        return new L.LatLng(- (latLng.lng), latLng.lat);
        return new L.LatLng(this._isleBottomRight.lat - (latLng.lng - this._isleTopLeft.lat), latLng.lat);
    }
}