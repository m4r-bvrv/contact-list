export interface IPerson {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
}

export enum Status {
  Idle,
  Pending,
  Resolved,
  Rejected,
}
