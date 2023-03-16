import { UserProfile } from '../models/index.js';

class UserProfileService {
    constructor() {
        this.userProfiles = [
            new UserProfile('UP10011', 'Prestige123', 'User #11', 'info@nwt.com', 'IT', 'Manager'),
            new UserProfile('UP10012', 'Prestige123', 'User #12', 'info@nwt.com', 'IT', 'Manager'),
            new UserProfile('UP10013', 'Prestige123', 'User #13', 'info@nwt.com', 'IT', 'Manager'),
            new UserProfile('UP10014', 'Prestige123', 'User #14', 'info@nwt.com', 'IT', 'Manager'),
            new UserProfile('UP10015', 'Prestige123', 'User #15', 'info@nwt.com', 'IT', 'Manager'),
            new UserProfile('UP10016', 'Prestige123', 'User #16', 'info@nwt.com', 'IT', 'Manager'),
            new UserProfile('UP10017', 'Prestige123', 'User #17', 'info@nwt.com', 'IT', 'Manager')
        ];
    }

    getUserProfile(profileId) {
        if (!profileId) {
            throw new Error('Invalid Profile Id Specified!');
        }

        let userProfile = null;

        for (let profile of this.userProfiles) {
            if (profile.userProfileId === profileId) {
                userProfile = profile;
                break;
            }
        }

        return userProfile;
    }

    validate(userProfileId, password) {
        const validation = userProfileId && password;

        if (!validation) {
            throw new Error('Invalid Credential(s) Specified!');
        }

        const userProfile = this.getUserProfile(userProfileId);
        const isValid = userProfile.password === password;

        return isValid;
    }
}

export default UserProfileService;
