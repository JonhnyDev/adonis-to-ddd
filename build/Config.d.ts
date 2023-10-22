import { BaseCommand } from '@adonisjs/core/build/standalone';
export default class DDDConfig extends BaseCommand {
    static commandName: string;
    static description: string;
    run(): Promise<void>;
}
