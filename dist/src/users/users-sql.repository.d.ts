import { Pool } from 'pg';
interface SortData {
    sortDirection?: 'asc' | 'desc';
    sortBy?: string;
    pageSize?: number;
    pageNumber?: number;
    searchLoginTerm?: string;
    searchEmailTerm?: string;
}
export declare class UsersRepository {
    private pool;
    constructor(pool: Pool);
    getAllUsers(sortData: SortData): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: {
            id: any;
            login: any;
            email: any;
            createdAt: any;
        }[];
    }>;
    createUser(login: string, email: string, password: string): Promise<any>;
    deleteUser(id: string): Promise<boolean>;
    getLoginByUserId(userId: string): Promise<string | null>;
    findById(id: string): Promise<any | null>;
    findByEmail(email: string): Promise<any | null>;
    findByLogin(login: string): Promise<any | null>;
    findByConfirmationCode(code: string): Promise<any | null>;
    findByRecoveryCode(recoveryCode: string): Promise<any | null>;
    createForRegistration(login: string, email: string, password: string, confirmationCode: string, expirationDate: Date): Promise<any>;
    confirmUser(userId: any): Promise<any | null>;
    updateConfirmationCode(userId: string, confirmationCode: string, expirationDate: Date): Promise<boolean>;
    setRecoveryCode(userId: string, recoveryCode: string, expirationDate: Date): Promise<boolean>;
    setNewPassword(userId: string, newPassword: string): Promise<boolean>;
    deleteById(id: string): Promise<boolean>;
}
export {};
