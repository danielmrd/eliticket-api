import { admin } from "../firebase.js";

const authenticationToken = (authorizationRoles) => async (req, res, next) => {
    const sessionCookie = await req.headers.authorization || '';

    try {
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie.split(' ')[1], true)
        req.user = decodedClaims

        if ( authorizationRoles && authorizationRoles.length > 0 ) {
            if ( !authorizationRoles.includes(req.user.role) ) return res.status(401).json({ message: 'Bad permission' })
        }

        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

export { authenticationToken }