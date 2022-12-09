"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
exports.authResolver = {
    Auth: {
        __resolveType: (obj) => {
            if (obj.token) {
                return "AuthSuccess";
            }
            if (obj.message) {
                return "AuthError";
            }
        }
    },
    //_______________________GAME_____________________________
    Mint: {
        __resolveType: (obj) => {
            if (obj.success) {
                return "MintSuccess";
            }
            if (obj.error) {
                return "MintError";
            }
        }
    },
    Claim: {
        __resolveType: (obj) => {
            if (obj.success) {
                return "ClaimSuccess";
            }
            if (obj.error) {
                return "ClaimError";
            }
        }
    }
};
