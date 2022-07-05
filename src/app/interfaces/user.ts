import {Workleave} from "./workleave";

export interface User {
  id: number,
  email: string,
  pass: string,
  fullName: string,
  jobTitleId: number,
  workplaceId: number,
  contractPaidDays: number,
  thisYearPaidDays: number,
  lastYearPaidDays: number,
  role: string,
  managerId: number,
  allWorkleaves?: Workleave[]
}

export interface UserSimp {
  id: number,
  email: string,
  name: string,
  role: string
}

export interface UserS {
  userID: number,
  userRole: string[]
}

export interface Manager{
  id: number | null,
  name: string
}

export enum Role{
  User = "User",
  Manager = "Manager",
  Admin = "Admin"
}

export interface JobTitle{
  id: number | null,
  jobTitle: string
}

export interface Workplace{
  id: number,
  workplace: string
}

export interface CompanyInfo{
  id: number,
  companyName: string,
  companyCEOName: string
}

export interface Holiday{
  id: number,
  holiday: Date,
  name: string
}
