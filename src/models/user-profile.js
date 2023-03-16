class UserProfile {
    constructor(userProfileId, password, name, email, department, title) {
        [this.userProfileId,
        this.password,
        this.name,
        this.email,
        this.department,
        this.title] = arguments;
    }
}

export default UserProfile;