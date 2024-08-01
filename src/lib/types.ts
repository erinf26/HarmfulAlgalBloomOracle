type StrictRecordModel = {
    id: string;
    created: string;
    updated: string;
    collectionId: string;
    collectionName: string;
}; // Same as pocketbase's record model, without the [key: string] : any

export type Lake = {
    name: string;
    latitude: number,
    longitude: number,
    lagoslakeid: number,
    expand?: {
        spatialPredictions: SpatialPredictionExported[]
    },
};

export type LakeExported = Lake & StrictRecordModel;

type SpatialPrediction = {
    raster_image: string;
    display_image: string;
    date: string; // pocketbase returns dates as strings
    scale: number;
    corner1latitude: number;
    corner1longitude: number;
    corner2latitude: number;
    corner2longitude: number;
}

export type SpatialPredictionExported = SpatialPrediction & StrictRecordModel;