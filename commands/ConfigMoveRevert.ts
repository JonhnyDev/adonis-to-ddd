import { BaseCommand } from '@adonisjs/core/build/standalone';
import data from '../dataPaths'
import MoveFile from '../src/MoveFile';

export default class ConfigMoveRevert extends BaseCommand {
  public static commandName = 'ddd:move-revert';
  public static description = 'Revert moved all files from DDD paths to AdonisJS paths default';
  public async run(): Promise<void> {
    const revertedData = data.map(item => ({
      from: item.to,
      to: item.from
    }));
    const moveFile = new MoveFile(this.logger, this.application)
    await moveFile.execute(revertedData)
  }
}
