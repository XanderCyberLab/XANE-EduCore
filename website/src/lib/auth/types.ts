export type AuthRole = "parent" | "child";

export type ParentSessionClaims = {
  role: "parent";
  sub: string;
  email: string;
  sessionVersion: number;
};

export type ChildSessionClaims = {
  role: "child";
  sub: string;
  parentUserId: string;
  username: string;
  nickname: string;
  sessionVersion: number;
};

export type AuthSessionClaims = ParentSessionClaims | ChildSessionClaims;

export type ParentSession = {
  role: "parent";
  parentUserId: string;
  email: string;
  sessionVersion: number;
};

export type ChildSession = {
  role: "child";
  childProfileId: string;
  parentUserId: string;
  username: string;
  nickname: string;
  sessionVersion: number;
};
