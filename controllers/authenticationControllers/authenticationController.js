import { signInWithEmailAndPassword } from '@firebase/auth'
import dotenv from 'dotenv'
dotenv.config() 
import Joi from 'joi'
import { admin, auth } from '../../firebase.js'
import { logger } from '../../utils/logger.js'
import { FirebaseError } from 'firebase/app'

const sessionOptions = {
    expiresIn: 5 * 60 * 60 * 1000 // 5 hours to expires session
}

const authenticationController = {
    authentication: async (req, res) => {
        const authBody = await req.body

        const authSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        const { error, value } = authSchema.validate(authBody)
        if ( error ) return res.status(409).json({ message: error.message })

        try {
            const userRecord = await signInWithEmailAndPassword(auth, value.email, value.password)
            const credentials = userRecord.user;
            
            const idToken = await credentials.getIdToken()
           
            const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: sessionOptions.expiresIn })
            res.set('Authorization', `Bearer ${sessionCookie}`)

            logger({ method: 'POST', status: 200, message: 'User logged in success!', user: JSON.stringify({ email: credentials.email, uid: credentials.uid }) })
            
            return res.status(200).json({
                uid: credentials.uid,
                displayName: credentials.displayName,
                photoURL: credentials.photoURL,
                email: credentials.email,
                accessToken: sessionCookie,
                refreshToken: credentials.refreshToken
            })
        } catch (err) {
            console.log(err)
            if ( err instanceof FirebaseError ) {
                logger({ method: 'POST', status: 400, message: 'User authentication failed', user: JSON.stringify({ email: value.email, password: value.password }) })
                switch (err.code) {
                    case "auth/invalid-credential" : return res.status(400).json({ message: 'Invalid credentials!' })
                    case "auth/too-many-requests" : return res.status(400).json({ message: "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later." })
                    default : return res.status(400).json({ message: 'Something went wrong' }) 
                }
            }
 
            return res.status(400).json({ message: 'Authentication failed' })
        }

    },
    signOut: async (req, res) => {

        const sessionCookie = await req.headers.authorization || '';

        const logoutSchema = Joi.object({
            authorization: Joi.string().required()
        })

        const { error, value } = logoutSchema.validate({ authorization: sessionCookie })
        if ( error ) return res.status(409).json({ message: error.message })

        try {
            const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie.split(' ')[1])
            await admin.auth().revokeRefreshTokens(decodedClaims.sub)
            res.clearCookie('session')
            logger({ method: 'POST', status: 200, message: 'User sign out success!', user: JSON.stringify({ email: decodedClaims.email, uid: decodedClaims.sub }) })
            return res.status(200).json({ message: 'Logout success!' })
        } catch (err) {
            console.error(err)
            logger({ method: 'POST', status: 500, message: 'User sign out failed!', user: JSON.stringify({ session: sessionCookie }) })
            return res.status(500).json({ message: 'Logout error' })
        }

    }
}

export default authenticationController