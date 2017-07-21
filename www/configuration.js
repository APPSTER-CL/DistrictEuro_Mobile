/*
	Copyright 2016-2017, H4E, Inc

	S3 configuration info

LOCAL: http://localhost:8000/
TEST: http://h4e-test.us-east-1.elasticbeanstalk.com/
PRODUCTION: https://

 */

// Set to debug for normal development.
var environments = {
    development: 1,
    testing: 2,
    demo: 3,
    production: 4
};


/*==================================================================================
 *==================================================================================
 * SET THESE VARIABLES TO THE ELASTIC BEANSTALK UPLOAD VERSION
 * AND THE DESIRED ENVIRONMENT.
 */
var includeversion = 1;
var currentEnvironment = environments.demo;
//==================================================================================
//==================================================================================


// Local development (default when currentEnvironment is not production or staging).
var baseApiUrl = "http://localhost:5555";
var baseSiteUrl = "http://localhost:5555/";

if (currentEnvironment == environments.testing) {
    // Staging
    baseApiUrl = "http://apitest.districteuro.com";
    baseSiteUrl = "http://test.districteuro.com/";
} else if (currentEnvironment == environments.demo) {
    // Production
    baseApiUrl = "http://apidemo.districteuro.com";
    baseSiteUrl = "http://demo.districteuro.com/";
} else if (currentEnvironment == environments.production) {
    // Production
    baseApiUrl = "http://api.districteuro.com";
    baseSiteUrl = "http://www.districteuro.com/";
}

window.configuration = {
    htmlIncludeVersion: includeversion,

    debug: {
        isDebug: (currentEnvironment != environments.production),
        isDevEnvironment: (currentEnvironment == environments.development),
        alertErrors: true,
    },

    h4eUrl: baseSiteUrl,

    webApi: {
        persons: {
            get_profile: baseApiUrl + "/person/get_profile/",
            save_profile: baseApiUrl + "/person/save_profile/",
            delete_profile: baseApiUrl + "/person/delete_profile/",
            get_personal_information: baseApiUrl + "/person/get_personal_information/",
            upload_profile_image: baseApiUrl + "/person/upload_profile_image/",
            upload_photo: baseApiUrl + "/person/upload_photo/",
        },
        products: {
            get_products: baseApiUrl + "/api/product/",
        },
        countries: {
          get_countries: baseApiUrl + "/api/country/",
          get_region_details:  baseApiUrl + "/api/region/"
        },
        stores: {
            get_stores: baseApiUrl + "/api/store/",
        },
        appointments: {
            get_appointments: baseApiUrl + "/appointments/"
        },
        accounts: {
            login: baseApiUrl + "/account/login/",
            login_fb: baseApiUrl + "/account/facebook_login/",
            logout: baseApiUrl + "/account/logout/",
            register: baseApiUrl + "/account/register/",
            verify: baseApiUrl + "/account/verify_account_token/",
            refresh_token: baseApiUrl + "/account/refresh_token/",
            change_password: baseApiUrl + "/account/change_password/",
            forgot_password: baseApiUrl + "/account/forgot_password/",
            verify_forgot_pass_token: baseApiUrl + "/account/verify_forgot_pass_token/",
            reset_password: baseApiUrl + "/account/reset_password/",
            verify_email: baseApiUrl + "/account/verify_email/",
        },
        showrooms: {
          get_showrooms: baseApiUrl + "/api/showroom/"
        },
        fileUpload: baseApiUrl + "/upload/",
        parseImage: baseApiUrl + "/parseImage/",
        cropImageUrl: baseApiUrl + "/cropImageUrl/",
    },
    storage: {
        userData: 'userData',
        token: 'token',
        token_will_expire: 'token_will_expire',
        token_valid_from: 'token_valid_from',
        user: 'user',
        filters: 'filters',
        search_query: 'search_query'
    },
    profileImages: {
        coverAspectRatio: 3,
        coverSize: 900, //Pixels
        profileAspectRatio: 1,
        profileSize: 300 //Pixels
    },
    credentialrules: {
        emailMinLen: 6,

        // http://regexlib.com/Search.aspx?k=password&AspxAutoDetectCookieSupport=1
        // 1) Password between 6 and 20 characters; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.
        //var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;

        // 2) 4 chars, no special chars - just lower/upper/number
        //var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/;

        //pwdRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/,
        pwdMinLen: 4, // <== If this changes, change it   ^  above in the regex!!!

        // This is just for test/dev: just 4 chars all lowercase is OK
        pwdRegex: /^(?=.*[a-z])(?!.*\s).{4,20}$/, // Dev-only
    },
    calendar: {
        businessHours: {
            start: '07:00',
            end: '21:00',
            dow: [1, 2, 3, 4, 5, 6]
        },
        minTime: "07:00",
        maxTime: "21:00"
    }
}
