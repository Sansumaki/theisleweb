export interface _Point {
    map: string;
    type: _PointType;
    name: string;
    lat: number;
    long: number;
}

export enum _PointType {
    POI,
    Teleport,
    Player
}