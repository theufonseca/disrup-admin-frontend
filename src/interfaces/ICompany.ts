import IPhoto from "./IPhoto";

export default interface ICompany {
    id: number,
    name: string,
    document: string,
    legalName: string,
    fantasyName: string,
    status: number,
    photos: IPhoto[]
}