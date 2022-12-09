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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVerified = exports.getVerified = exports.deductBalance = exports.getBalance = exports.updateBalance = exports.updateUserSteam = exports.findSteamID = exports.findUser = void 0;
const db_1 = require("../db");
//USER_____________________________________________________________________________
// export const createUser = async (_newUser: INewUser): Promise<User | null> => {
//     console.log("DB: CREATE-USER SERVICE INITIATED: ", _newUser)
// }
const findUser = (_publicAddress) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB: FIND-USER SERVICE INITIATED:", _publicAddress);
    const user = yield db_1.prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    });
    console.log("PRISMA FOUND USER:", user);
    return user;
});
exports.findUser = findUser;
//_________________________________________________________________________________
//STEAM______________________________________________________________________________________________________
const findSteamID = (_publicAddress) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB: FIND-STEAM-ID SERVICE INITIATED:", _publicAddress);
    const user = yield db_1.prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    });
    console.log("FOUND USER:", user);
    if (user && user.steamId) {
        const { steamId } = user;
        return steamId;
    }
    else {
        return null;
    }
});
exports.findSteamID = findSteamID;
const updateUserSteam = (_username, _steamId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB: UPDATE-USER-STEAM SERVICE INITIATED: ", _username, _steamId);
    const updatedUser = yield db_1.prismaClient.user.update({
        where: {
            username: _username
        },
        data: {
            steamId: _steamId
        }
    });
    return updatedUser;
});
exports.updateUserSteam = updateUserSteam;
//______________________________________________________________________________________________________________
//BALANCE_________________________________________________________________________________________
const updateBalance = (_publicAddress, _newBalance) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB: UPDATE-BALANCE SERVICE INITIATED:", _publicAddress, _newBalance);
    const updatedUser = yield db_1.prismaClient.user.update({
        where: {
            publicAddress: _publicAddress
        },
        data: {
            balance: _newBalance
        }
    });
    return updatedUser.balance;
});
exports.updateBalance = updateBalance;
const getBalance = (_publicAddress) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB: GET-BALANCE SERVICE INITIATED:", _publicAddress);
    const user = yield db_1.prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    });
    if (user)
        return user.balance;
    else
        throw new Error("USER DOES NOT EXIST");
});
exports.getBalance = getBalance;
const deductBalance = (_publicAddress, _amount) => __awaiter(void 0, void 0, void 0, function* () {
    const balance = yield (0, exports.getBalance)(_publicAddress);
    const newBalance = balance - _amount;
    yield (0, exports.updateBalance)(_publicAddress, newBalance);
    console.log("NEW BALANCE", newBalance);
});
exports.deductBalance = deductBalance;
//_________________________________________________________________________________________________
//VERIFIED______________________________________________________________________________________________________
const getVerified = (_publicAddress) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB: GET-VERIFIED SERVICE INITIATED: ", _publicAddress);
    const user = yield db_1.prismaClient.user.findUnique({
        where: {
            publicAddress: _publicAddress
        }
    });
    return user === null || user === void 0 ? void 0 : user.verified;
});
exports.getVerified = getVerified;
const setVerified = (_steamId, _username) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB: SET-VERIFIED SERVICE INITIATED: ", _steamId, _username);
    const user = yield db_1.prismaClient.user.update({
        where: {
            steamId: _steamId
        },
        data: {
            verified: true,
            username: _username
        }
    });
    return user === null || user === void 0 ? void 0 : user.verified;
});
exports.setVerified = setVerified;
//_______________________________________________________________________________________________________________
