import { Router } from "express";
const authRouter = Router();
import passport from "passport";
import { generateToken } from "../utils/generateToken.js";
import { SignUp,SignOut,LoginRequest,loginVerify, Profile } from "../Controller/auth.controller.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
/* Oauth Authentication routes */
authRouter.get("/github",passport.authenticate("github",{session:false}))
authRouter.get("/github/callback",passport.authenticate("github",{failureRedirect:"/login",session:false}),(req,res)=>{
    const token = generateToken(req?.user,res);
    return res.json({message:"Login Successfully"});
});
// FIXME:here it need to solve google oauth authentication
authRouter.get("/google",passport.authenticate("google",{session:false}))
authRouter.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login",session:false}),(req,res)=>{
    return res.redirect("/");
});
/* Local Authentication Routes */
authRouter.route("/sign-up").post(ErrorHandler(SignUp));
authRouter.route("/sign-out").post(ErrorHandler(SignOut));
authRouter.route("/profile").get(authenticateToken,ErrorHandler(Profile))
authRouter.route("/verify-token").get(ErrorHandler(loginVerify));
authRouter.route("/login").post(ErrorHandler(LoginRequest))

export {authRouter};

