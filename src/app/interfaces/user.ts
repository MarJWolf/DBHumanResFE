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
  Id: number | null,
  name: string
}

export enum Role{
  User = "User",
  Manager = "Manager",
  Admin = "Admin"
}

export interface JobTitle{
  Id: number | null,
  jobTitle: string
}

export interface Workplace{
  id: number,
  users?: User[],
  workplace: string
}

export interface CompanyInfo{
  Id: number,
  companyName: string,
  companyCEOName: string
}
