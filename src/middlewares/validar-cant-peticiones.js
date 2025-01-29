import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 Minutos
    max: 100 //100 Peticiones
})

export default limiter;