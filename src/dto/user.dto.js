export default class UserDto {
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.age = user.age;
        this.email = user.email;
        this.phone = user.phone;
        this.address = user.address;
        this.role = user.role;
    }
}