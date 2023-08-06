export class SettingsService{
    private static instance: SettingsService;

    public static getInstance(): SettingsService {
        if (!SettingsService.instance) {
            SettingsService.instance = new SettingsService();
        }
        return SettingsService.instance;
    }

    private constructor() {}

    public readonly settings = {
        "debug": false
    };

}