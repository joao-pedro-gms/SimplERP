export interface UserAuth {
    id: number | null;
    username: string | null;
    password: string | null;
    email: string | null;
    role: string | null;
}

const userAuth: UserAuth = {
    id: null,
    username: null,
    password: null,
    email: null,
    role: null,
};

export default userAuth;
