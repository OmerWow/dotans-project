export type User = {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
};

type Role = "ADMIN" | "CHABADNIK" | "SECRETARY" | "VOLUNTEER";