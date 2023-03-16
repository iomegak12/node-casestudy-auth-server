import { AuthenticationServiceHost } from './hosting/index.js';
import { HostConfiguration, SSLConfiguration } from './configs/index.js';
import os from 'os';

class MainClass {
    static async main() {
        try {
            const hostConfiguration = HostConfiguration.getConfiguration();

            let authenticationServiceHost = null;

            if (hostConfiguration.SSL_ENABLED) {
                const sslConfiguration = SSLConfiguration.getConfiguration();
                authenticationServiceHost = new AuthenticationServiceHost(
                    hostConfiguration.SERVICE_PORT,
                    hostConfiguration.SSL_ENABLED,
                    sslConfiguration
                );
            } else {
                authenticationServiceHost = new AuthenticationServiceHost(hostConfiguration.SERVICE_PORT);
            }

            await authenticationServiceHost.startServer();

            console.info('Authentication Service Host Started Successfully!');

            const url = `${hostConfiguration.SSL_ENABLED ? 'https' : 'http'}://${os.hostname}:${hostConfiguration.SERVICE_PORT}/`;

            console.info(`Service is available at ${url}`);

            const stopHost = async () => {
                await authenticationServiceHost.stopServer();
                console.info('Customer Service Host Stopped Successfully!');
            };

            process.on('exit', stopHost);
            process.on('SIGINT', stopHost);
        } catch (error) {
            console.error(`Error Occurred, Details : ${error}`);
        }
    }
}

MainClass
    .main();