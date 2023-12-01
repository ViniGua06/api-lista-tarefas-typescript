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
const db = require("../db");
exports.default = {
    check: ({ script, campos }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            db.query(script, campos, (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(result[0].total);
                }
            });
        });
    }),
    insert: ({ script, campos }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            db.query(script, campos, (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(1);
                }
            });
        });
    }),
    delete: ({ script, campos }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            db.query(script, campos, (error) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(1);
                }
            });
        });
    }),
    getdata: ({ script, campos }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            db.query(script, campos, (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }),
    getTasks: ({ script, campos }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            db.query(script, campos, (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }),
};
