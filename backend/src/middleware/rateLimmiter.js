import ratelimit from "../config/upstash.js"
import asyncHandler from 'express-async-handler'
const ratelimiter = asyncHandler(async (req, res, next) => {
    const { success } = await ratelimit.limit("my-limit-key")
    if (!success) {
        return res.status(429).json({
            message:"to many request, please try again later"
        })
    }
    next()

})
export default ratelimiter