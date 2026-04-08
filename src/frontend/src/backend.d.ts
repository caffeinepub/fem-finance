import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    id: LeadId;
    city: string;
    name: string;
    createdAt: Timestamp;
    serviceTag?: string;
    phone: string;
}
export type Timestamp = bigint;
export type LeadId = bigint;
export interface ContactMessageInput {
    name: string;
    message: string;
    phone: string;
}
export interface ContactMessage {
    id: ContactId;
    name: string;
    createdAt: Timestamp;
    message: string;
    phone: string;
}
export type ContactId = bigint;
export interface LeadInput {
    city: string;
    name: string;
    serviceTag?: string;
    phone: string;
}
export interface backendInterface {
    getContactMessages(): Promise<Array<ContactMessage>>;
    getLeads(): Promise<Array<Lead>>;
    submitContactMessage(input: ContactMessageInput): Promise<ContactMessage>;
    submitLead(input: LeadInput): Promise<Lead>;
}
