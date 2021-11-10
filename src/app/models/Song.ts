
export interface ISong {
    id: string;
    name: string;
    nameArtist: string;
    favourite: number | undefined;
    releaseDay: number;
    image: string;
    linkMP3: string;
    albumID: string;
    artistID: string;
    categoryID: Array<string>;
}