import bcrypt from "bcrypt";
import { SecurityConfig } from "../config/security";

export class PasswordUtil {

    /**
     * Generate a temporary password.
     */
    static generate(length: number = 10): string {

        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "@#$%&*!";

        const all = upper + lower + numbers + symbols;

        let password = "";

        password += upper[Math.floor(Math.random() * upper.length)];
        password += lower[Math.floor(Math.random() * lower.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];

        while (password.length < length) {
            password += all[Math.floor(Math.random() * all.length)];
        }

        return password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }

    /**
     * Hash password using bcrypt + pepper.
     */
    static async hash(password: string): Promise<string> {
        return bcrypt.hash(
            password + SecurityConfig.PASSWORD_PEPPER,
            10
        );
    }

    /**
     * Verify password.
     */
    static async compare(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {

        return bcrypt.compare(
            plainPassword + SecurityConfig.PASSWORD_PEPPER,
            hashedPassword
        );
    }

}