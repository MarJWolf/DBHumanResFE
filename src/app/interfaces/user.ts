import {Workleave} from "./workleave";

export interface User {
  id: number,
  email: string,
  pass: string,
  fullName: string,
  jobTitle: string,
  workplace: string,
  paidDays: number,
  role: string,
  manager_id: number,
  allWorkleaves: Workleave[]
}

export interface UserS{
  userID: number,
  userRole: string[]
}
