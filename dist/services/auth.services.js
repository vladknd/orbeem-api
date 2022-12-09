"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.registerService = exports.loginService = void 0;
const eth_sig_util_1 = require("eth-sig-util");
const ethereumjs_util_1 = require("ethereumjs-util");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const auth_interfaces_1 = require("./auth.interfaces");
//_________________________________LOGIN-SERVICE_____________________________________
const loginService = (authData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("REQUESTED");
    console.log("AUTH", authData);
    const { publicAddress, signature } = authData;
    if (!signature || !publicAddress)
        throw new Error("INVALID AUTHENTICATION DATA");
    const user = yield db_1.prismaClient.user.findUnique({
        where: {
            publicAddress
        }
    });
    if (!user)
        throw new Error("USER DOES NOT EXIST");
    console.log("USER HAS BEEN FOUND");
    const msg = `I am signing my one-time nonce: ${user.nonce}`;
    const msgBufferHex = (0, ethereumjs_util_1.bufferToHex)(Buffer.from(msg, 'utf8'));
    const address = (0, eth_sig_util_1.recoverPersonalSignature)({
        data: msg,
        sig: signature
    });
    console.log("ADDRESS", address);
    const validAddress = address.toLowerCase() === publicAddress.toLowerCase();
    if (!validAddress)
        throw new Error("ADDRESS VERIFICATION FAILED");
    console.log("USER HAS BEEN VERIFIED");
    yield db_1.prismaClient.user.update({
        where: {
            publicAddress
        },
        data: {
            nonce: Math.floor(Math.random() * 10000),
        },
    });
    const token = yield (0, exports.generateToken)({ id: user.id, publicAddress });
    const authRes = { token, user };
    console.log("AUTH-RES:", authRes);
    return authRes;
});
exports.loginService = loginService;
//_____________________________REGISTRATION-SERVICE________________________________
const registerService = (_newUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("AUTH: REGISTER-SERVICE INITIATED:", _newUser);
    // try {
    //     const user: User | null = await createUser({
    //         publicAddress: newUser.publicAddress,
    //         email: newUser.email,
    //         firstName: newUser.firstName,
    //         surname: newUser.surname,
    //         steamId: newUser.steamId
    //     })
    //     if(user){
    //         console.log("REGISTERED USER", user)
    //         const token = generateToken({
    //             id: user.id,
    //             publicAddress: user.publicAddress
    //         })
    //         console.log("TOKEN GENERATED", token)
    //         return {user, token}
    //     }
    // } catch (error) {
    //     console.log("AUTH: REGISTER-SERVICE ERROR:",error);
    //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //         console.log("AUTH: REGISTER-SERVICE ERROR KNOWN:",error);
    //         throw error
    //     } 
    // }
    try {
        const user = yield db_1.prismaClient.user.create({
            data: {
                nonce: Math.floor(Math.random() * 10000),
                publicAddress: _newUser.publicAddress.toLowerCase(),
                email: _newUser.email.toLowerCase(),
                firstName: _newUser.firstName,
                surname: _newUser.surname,
                steamId: _newUser.steamId
            }
        });
        console.log("AUTH: REGISTER-SERVICE: CREATED USER", user);
        if (user) {
            console.log("REGISTERED USER", user);
            const token = (0, exports.generateToken)({
                id: user.id,
                publicAddress: user.publicAddress
            });
            console.log("TOKEN GENERATED", token);
            return { user, token };
        }
    }
    catch (error) {
        console.log("AUTH: REGISTER-SERVICE ERROR:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log("AUTH: REGISTER-SERVICE ERROR KNOWN:", error);
            if (error.code === 'P2002' && error.meta)
                return { type: auth_interfaces_1.ErrorType.UNIQUE, message: auth_interfaces_1.Field.EMAIL };
        }
    }
    return null;
});
exports.registerService = registerService;
const generateToken = ({ id, publicAddress }) => {
    return jsonwebtoken_1.default.sign({
        id,
        publicAddress
    }, "hihi", {
        algorithm: "HS256",
    });
};
exports.generateToken = generateToken;
