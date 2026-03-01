import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type DjId = bigint;
export interface DJ {
    id: DjId;
    bio: string;
    name: string;
    createdAt: Time;
    photoUrl: string;
}
export type ShowId = bigint;
export type Time = bigint;
export interface Show {
    id: ShowId;
    title: string;
    djId?: DjId;
    createdAt: Time;
    description: string;
    scheduleTime: string;
    scheduleDay: string;
}
export interface backendInterface {
    assignDjToShow(showId: ShowId, djId: DjId): Promise<void>;
    createDj(name: string, bio: string, photoUrl: string): Promise<DjId>;
    createShow(title: string, description: string, scheduleDay: string, scheduleTime: string): Promise<ShowId>;
    getAllDjs(): Promise<Array<DJ>>;
    getAllShows(): Promise<Array<Show>>;
    getDj(id: DjId): Promise<DJ>;
    getShow(id: ShowId): Promise<Show>;
}
