import {Holiday} from "./user";
import {colorType} from "../components/calendar-cell/calendar-cell.component";

export interface Workleave {
  id: number,
  userId: number,
  userName: string,
  type: Type,
  startDate: Date,
  endDate: Date,
  fillDate: Date,
  statusManager: Status,
  statusAdmin: Status
}

export enum Type {
  Paid = "Платен",
  Unpaid = "Неплатен",
  Special = "Специален"
}

export type Status =
  "Pending" |
  "Confirmed" |
  "Denied" |
  "Cancelled"
export const allStatus: Status[] = ["Pending",
  "Confirmed",
  "Denied",
  "Cancelled"]

export const statusTranslation = {
  Pending: "Изчакващ",
  Confirmed: "Потвърден",
  Denied: "Отказан",
  Cancelled: "Отменен"
}

export interface CalendarUser {
  monthlySum: {
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
    10: number,
    11: number,
    12: number
  }
  user: {
    id: number,
    email: string,
    name: string,
    role: string,
  }
  workplace: string,
  workLeaves: CalendarWorkLeave[]
}

export interface CalendarWorkLeave {
  type: Type,
  startDate: Date,
  endDate: Date,
  fillDate: Date,
  status: Status
}

export interface CalendarData {
  users: CalendarUser[],
  holidays: Holiday[]
}

//marti
export interface CalendarDay {
  [key:string]: colorType
}
export interface CalendarDTO {
  workplace: string,
  name : string,
  allLeaves: number,
  days? : CalendarDay
}

