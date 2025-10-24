export default class userDto {
    constructor(user) {
        this.password = user.password;
        this.email = user.email;
        this.role = user.role;
        this.created_at = user.created_at
    }
    static getUserTokenFrom(user){
        return {
            id: user._id,
            email: user.email,
            role: user.role,
            created_at: user.created_at
        }
    }
}