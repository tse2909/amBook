interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: 'fcZVNLEzkJ0hSuQslPatTXcAFWecYKAa',
    domain: 'insourcedeveloper.auth0.com',
    // You may need to change this!
    callbackURL: 'http://localhost:4300/'
};