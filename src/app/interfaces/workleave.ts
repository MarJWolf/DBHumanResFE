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

export enum Type{
 Paid= "Платен",
 Unpaid = "Неплатен",
 Special = "Специален"
}

export enum Status{
  Pending= "Изчакващ",
  Confirmed = "Потвърден",
  Denied = "Отказан",
  Cancelled = "Отменен"
}
