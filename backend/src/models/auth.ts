import db from '../database/db';

export interface UserAuth {
    id?: number;
    username: string;
    password?: string; // Stored as hash
    email: string;
    role?: string;
}

export const createUser = (user: UserAuth): Promise<number> => {
    return new Promise((resolve, reject) => {
        const { username, email, password, role } = user;
        db.run(
            `INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`,
            [username, email, password, role],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
};

export const findUserByEmail = (email: string): Promise<UserAuth | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT id, username, email, password_hash as password, role FROM users WHERE email = ?`,
            [email],
            (err, row: UserAuth) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
};