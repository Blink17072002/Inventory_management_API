const { expressjwt } = require('express-jwt')

function authJwt(){  // protecting the apis, making sure no one can use them without authentication
    const secret = process.env.secret
    const api = process.env.API_URL

    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({  // exclude the login api to make the user able to use the login to get a token
        path: [  // This enables users to use apis indicated without authentication
            `${api}/users/login`,
            `${api}/users/register`,
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] }, // specifying the methods to be excluded using regex
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
        ]
    })
}


// async function isRevoked(req, payload, done){  // to limit abilities of users from admins
//     if(!payload.isAdmin){
//         done(null, true)
//     }
//     done()
// }


async function isRevoked(req, payload) {  // to limit abilities of users from admins
    console.log(payload);
    if (payload.isAdmin == false) {
        console.log('Not Admin');
        return true;
    }
    console.log('Admin');
    return false;
}

module.exports = authJwt