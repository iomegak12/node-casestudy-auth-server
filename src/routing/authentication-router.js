import express from 'express';
import jwt from 'jsonwebtoken';
import { UserProfileService } from '../services/index.js';
import { AuthConfiguration } from '../configs/index.js';

const HTTP_OK = 200;
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;
const UNAUTHORIZED = 401;

class AuthenticationRouter {
    constructor() {
        this.userProfileService = new UserProfileService();
        this.authenticationRouter = express.Router();

        this.initializeRouting();
    }

    initializeRouting() {
        this.authenticationRouter.post('/', async (request, response) => {
            try {
                const requestBody = request.body;
                const userProfileId = requestBody.userProfileId;
                const password = requestBody.password;
                const validation = requestBody && userProfileId && password;

                if (!validation) {
                    response
                        .status(BAD_REQUEST)
                        .send({
                            errorMessage: 'Invalid Credential(s) Specified!'
                        });

                    return;
                }

                const isCredentialValid = this.userProfileService.validate(userProfileId, password);

                if (!isCredentialValid) {
                    response
                        .status(UNAUTHORIZED)
                        .send({
                            errorMessage: 'Unauthorized, Invalid Credential(s) Specified!'
                        });

                    return;
                }

                const userProfile = this.userProfileService.getUserProfile(userProfileId);

                if (!userProfile) {
                    response
                        .status(SERVER_ERROR)
                        .send({
                            errorMessage: 'Unable to Process Authentication Token!'
                        });

                    return;
                }

                const safeUserProfile = {
                    userProfileId: userProfile.profileId,
                    name: userProfile.name,
                    email: userProfile.email,
                    department: userProfile.department,
                    title: userProfile.title
                };

                const authConfiguration = AuthConfiguration.getConfiguration();
                const signedToken = jwt.sign(
                    safeUserProfile,
                    authConfiguration.AUTH_SECRET_KEY, {
                    expiresIn: '2 days'
                });

                response
                    .status(HTTP_OK)
                    .send({
                        token: signedToken
                    });
            } catch (error) {
                response
                    .status(SERVER_ERROR)
                    .send({
                        errorMessage: error.message
                    });
            }
        });
    }

    get Router() {
        return this.authenticationRouter;
    }
}

export default AuthenticationRouter;
