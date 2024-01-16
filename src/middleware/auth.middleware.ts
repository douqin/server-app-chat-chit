import HttpException from "@/utils/exceptions/http.exeception";
import { HttpStatus } from "@/utils/extension/httpstatus.exception";
import { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { JwtService } from "../component/jwt/jwt.service";
import { NextFunction, Request, Response } from "express"
import { ForbiddenException } from "@/utils/exceptions/badrequest.expception";
import { container } from "tsyringe";
import { Middleware } from "@/utils/decorator/middleware/middleware";
import {BaseMiddleware} from "./base.middleware";

@Middleware()
export class AuthorizeMiddleware extends BaseMiddleware {
    public async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token = req.headers["authorization"] as string
            if (token) {
                let accesstoken = token.split(" ")[1]
                if (accesstoken) {
                    const jwtPayload = await container.resolve(JwtService).decodeAccessToken(accesstoken) as JwtPayload;
                    const { iduser } = jwtPayload.payload;
                    if (iduser) {
                        req.headers['iduser'] = iduser;
                        next()
                    }
                }
                else {
                    next(new HttpException(HttpStatus.UNAUTHORIZED, "Token không hợp lệ"))
                    return
                }
            } else next(new HttpException(HttpStatus.FORBIDDEN, "Token không hợp lệ"))
        }
        catch (e: any) {
            console.log("🚀 ~ file: auth.middleware.ts:33 ~ AuthMiddleware ~ e:", e)
            if (e instanceof TokenExpiredError) {
                next(new HttpException(HttpStatus.UNAUTHORIZED, e.message))
            }
            next(new ForbiddenException("Invalid token"))
        }
    }
}