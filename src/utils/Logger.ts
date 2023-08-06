import { SettingsService } from "../service/SettingsService";

export class Logger {
    private static logPrefix = `[LOG-${new Date().toLocaleTimeString()}]`;
    private static infoPrefix = `[INFO-${new Date().toLocaleTimeString()}]`;
    private static warnPrefix = `[WARN-${new Date().toLocaleTimeString()}]`;
    private static errorPrefix = `[ERROR-${new Date().toLocaleTimeString()}]`;

    private constructor() {}

    public static log(...message: any[]) {
        console.log(this.logPrefix, ...message);
    }

    public static info(...message: any[]) {
        console.info(this.infoPrefix, ...message);
    }

    public static warn(...message: any[]) {
        console.warn(this.warnPrefix, ...message);
    }

    public static error(...message: any[]) {
        console.error(this.errorPrefix, ...message);
    }

    public static debug(...message: any[]) {
        if (SettingsService.getInstance().settings.debug) {
            console.debug(this.logPrefix, ...message);
        }
    }

}