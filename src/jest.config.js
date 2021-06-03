"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sync object
exports.default = {
    verbose: true,
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
};
