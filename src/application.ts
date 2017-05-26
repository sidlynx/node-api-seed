import * as bodyParser from "body-parser";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as redis from "redis";
import * as connectRedis  from "connect-redis";
import * as session from "express-session";
import * as passport from "passport";
import * as passportLocal from "passport-local";

import {UserFactory} from "./factory/user";
import {Api} from "./api";


export class Application {

    public app: express.Application;

    public static getInstance(): Application {
        return new Application();
    }

    private constructor() {
        this.app = express();

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.raw({ limit: '50mb' }));
        this.app.use(bodyParser.text({ limit: '50mb' }));

        this.app.use(cookieParser("secretSign#143_!223"));



        let redisClient = redis.createClient();
        let redisStore = connectRedis(session);
        this.app.use(session({
            secret: 'ssshhhhh',
            store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 3600 }),
            saveUninitialized: false,
            resave: false
        }));


        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.serializeUser(function (user, done) {
            done(null, user.guid);
        });

        passport.deserializeUser(function (guid, done) {
            done(null, guid);
        });


        //<editor-fold desc="Local auth">
        //let LocalStrategy = require("passport-local").Strategy;
        let LocalStrategy = passportLocal.Strategy;
        passport.use(new LocalStrategy(
            function (username, password, done) {
                let userFactory : UserFactory = new UserFactory(null);
                userFactory.findByEmail(username).then((user)=>{
                    return done(null,user);
                },(error)=>{
                    return done(error, null);
                })
            }
        ));
        this.app.post('/auth', function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    let response = {
                        status: "nok user not found"
                    }
                    return res.json(response);
                }
                else {
                    let response = {
                        status: "ok"
                    }
                    req.logIn(user, function (err) {
                        if (err) {
                            response.status = "nok user not found";
                        }
                        return res.json(response);
                    });
                }
            })(req, res, next);
        });
        //*/
        //</editor-fold desc="Local auth">



        this.app.post("/api",(req,res,next)=>{
            Api.run(req,res);
        })

        this.app.get("/", function (req, res, next) {
            res.send("Hello");
        })
    }

    run() {
        if (/^win/.test(process.platform)) {
            this.app.listen(80, function () {

            });
        }
        else {
            this.app.listen(8080, function () {

            });
        }
    }
}