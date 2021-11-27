
export interface ISong {
    id: string;
    name: string;
    nameArtist: string;
    releaseDay: number;
    image: string;
    linkMP3: string;
    albumID: string;
    artistID: string;
    categoryID: Array<string>;
    actions: {
        love : {
            total : number;
            user: Array<string>;
        }
    };
    duration: string;
}