export type User = {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
};

type Role = "ADMIN" | "CHABADNIK" | "SECRETARY" | "VOLUNTEER";