export default class userDto {
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.password = user.password;
        this.age = user.age;
        this.email = user.email;
        this.phone = user.phone;
        this.address = user.address;
        this.role = user.role;
    }
    static getUserTokenFrom(user){
        return {
            id: user._id,
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email: user.email
        }
    }
}