export interface User {
    user_id: number;
    display_name: string;
    reputation: number;
    profile_image: string;
    followed: boolean;
    blocked: boolean;
}