import { SessionOptions } from "express-session";


const sessionConfig: SessionOptions = {

    saveUninitialized: true,
    resave: false,
    // secret: 'keyboard cat',
    secret: 'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC',
    // cookie: { maxAge: 60 * 1000 }
}

export default sessionConfig