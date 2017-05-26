import {async} from "async";

export class Api {
    static run = function (req, res) {
        req.setEncoding('utf8');
        try {
            var cmd = JSON.parse(req.headers.cmd);
            if (cmd.hasOwnProperty("module")) {
                if (typeof cmd.module == "string") {
                    if (cmd.hasOwnProperty("method")) {
                        if (typeof cmd.method == "string") {
                            try {
                                var module = require("./public/" + cmd.module);
                                var method = module[cmd.method];
                                if (method !== undefined) {
                                    try {
                                        method(req, res);
                                    } catch (e) {
                                        res.writeHead(500, {
                                            "Content-Type": "application/json"
                                        });
                                        res.end("8484848");
                                    }
                                } else {
                                    res.writeHead(400, {
                                        "Content-Type": "text/plain"
                                    });
                                    res.end("METHOD_NOT_FOUND");
                                }
                            } catch (e) {
                                res.writeHead(400, {
                                    "Content-Type": "application/json"
                                });
                                var _response = {
                                    "error": "module not found"
                                }
                                res.end(JSON.stringify(_response));
                            }
                        } else {
                            res.writeHead(400, {
                                "Content-Type": "application/json"
                            });
                            var _response = {
                                error: "method not found"
                            }
                            res.end(JSON.stringify(_response));
                        }
                    } else {
                        res.writeHead(400, {
                            "Content-Type": "application/json"
                        });
                        var _response = {
                            error: "method not found"
                        }
                        res.end(JSON.stringify(_response));
                    }
                } else {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });
                    var _response = {
                        error: "module not found"
                    }
                    res.end(JSON.stringify(_response));
                }
            } else {
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end(Api.exceptions.MODULE_NOT_FOUND_IN_CMD);
            }
        } catch (e) {
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end(Api.exceptions.CMD_NOT_FOUND);
        }
    };

    static exceptions = {
        MODULE_NOT_FOUND_IN_CMD: "MODULE_NOT_FOUND_IN_CMD",
        METHOD_NOT_FOUND_IN_CMD: "METHOD_NOT_FOUND_IN_CMD",
        MODULE_NOT_FOUND: "MODULE_NOT_FOUND",
        METHOD_NOT_FOUND: "METHOD_NOT_FOUND",
        CMD_NOT_FOUND: "CMD_NOT_FOUND"
    }
}