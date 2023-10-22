import { BaseCommand } from '@adonisjs/core/build/standalone';
import data from '../dataPaths'
import MoveFile from '../src/MoveFile';

export default class ConfigMove extends BaseCommand {
  public static commandName = 'ddd:move';
  public static description = 'Move all files from default paths adonisJS to DDD pattern';
  public async run(): Promise<void> {
    const moveFile = new MoveFile(this.logger, this.application)
    await moveFile.execute(data)
  }
}
