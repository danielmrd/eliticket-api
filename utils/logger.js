import moment from "moment"


const logger = ({ method, status, message, user }) => {
    console.log(`${moment().toISOString()} - Method: ${method}, status: ${status}, message: ${message}, ${user ? `user: ${user}` : ''}`)
}


export { logger }