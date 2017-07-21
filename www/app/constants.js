angular.module('districteuro.constants', [])
.constant('USER_ROLES', {
        all: '*',
        patient: 'patient',
        doctor: 'doctor',
})
.constant('AUTH_EVENTS', {
    loginFacebook: 'auth-login-fb',
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    tokenWillExpireSoon: 'auth-token-will-expire-soon',
})
