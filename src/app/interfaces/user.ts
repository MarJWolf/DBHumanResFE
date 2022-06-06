export interface User {
  id: number,
  email: string,
  pass: string,
  fullName: string,
  jobTitle: string,
  workplace: string,
  paidDays: number,
  //"role": "User",
  manager_id: number,
  //"allWorkleaves": []
}

export interface UserS{
  userID: number,
  userRole: string[]
}

