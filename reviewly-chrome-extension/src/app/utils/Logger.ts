import {useState} from "react";
import ApplicationProperties from "../service/ApplicationProperties";

export enum LogLevel {
    INFO = 0,
    DEBUG = 1,
    WARNING = 2,
    ERROR = 3,
}

export class Logger {

    name: string;

    constructor(name: string = "ROOT LOGGER") {
        this.name = name;
    }

    info = (...message: any[]): void => {
        this.log(LogLevel.INFO, ...message);
    }

    debug = (...message: any[]): void => {
        this.log(LogLevel.DEBUG, ...message);
    }

    warning = (...message: any[]): void => {
        this.log(LogLevel.WARNING, ...message);
    }

    error = (...message: any[]): void => {
        this.log(LogLevel.ERROR, ...message);
    }

    log = (level: LogLevel, ...message: any[]): void => {
        const currentLogLevel = ApplicationProperties.logLevel;

        if (currentLogLevel > level) {
            return;
        }

        let logFunc: (...data: any[]) => void;
        let levelName;

        switch (level) {
            case LogLevel.INFO:
                logFunc = console.info;
                levelName = "INFO";
                break;
            case LogLevel.DEBUG:
                logFunc = console.debug;
                levelName = "DEBUG";
                break;
            case LogLevel.WARNING:
                logFunc = console.warn;
                levelName = "WARNING";
                break;
            case LogLevel.ERROR:
                logFunc = console.error;
                levelName = "ERROR";
                break;
            default: console.warn("Bad log level:", level);
        }

        logFunc(`[${levelName}] [EXT POP-UP: ${this.name}] ${new Date().toLocaleString("en-US")}:`, ...message);
    }
}

export const useLogger = (name: string): Logger => {
    const [logger] = useState(new Logger(name));
    return logger;
}
