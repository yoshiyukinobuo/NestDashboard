import { AppService } from './app.service.js';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getProjects(): {
        id: number;
        name: string;
        status: string;
    }[];
}
