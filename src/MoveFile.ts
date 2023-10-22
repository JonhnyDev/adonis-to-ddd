import { existsSync, readdir, stat, copyFile, unlink, access, mkdir } from 'fs-extra'
import path from 'path'
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { Logger } from '@poppinss/cliui/build/src/Logger'
interface Data {
  from: string;
  to: string
}

class MoveFile {
  private application: ApplicationContract
  private logger: Logger
  constructor(application: ApplicationContract, logger: Logger){
    this.application = application
    this.logger = logger
  }
  public async execute(data: Array<Data>): Promise<void> {
    this.logger.info(`Start move files`);
    for(const value of data){
      const fromPath = path.join(this.application.appRoot, value.from);
      const toPath = path.join(this.application.appRoot, value.to);

      try {
        await this.moveFilesRecursively(fromPath, toPath);
      } catch (error: any) {
        this.logger.error(`Error moving files: ${error.message}`);
      }
    }
    this.logger.info('All files moved');
    return
  }
  private async moveFilesRecursively(sourceDir: string, destinationDir: string): Promise<void> {
    const exists = existsSync(sourceDir)
    if(!exists){
      return;
    }
    const filesToMove = await readdir(sourceDir);
    for (const file of filesToMove) {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);
      const fileStats = await stat(sourcePath);

      if (fileStats.isDirectory()) {
        const subDirectoryContents = await readdir(sourcePath);
        if (subDirectoryContents.length === 0) {
          continue;
        }
        await this.moveFilesRecursively(sourcePath, destinationPath);
      } else {
        await this.ensureDir(destinationPath);
        await copyFile(sourcePath, destinationPath);
        await unlink(sourcePath);
        this.logger.info(`Moved ${path.relative(this.application.appRoot, sourcePath)} to ${path.relative(this.application.appRoot, destinationPath)}`);
      }
    }
  }

  private async ensureDir(dirPath: string): Promise<void> {
    const parentDir = path.dirname(dirPath);
    try {
      await access(parentDir);
    } catch (error) {
      await mkdir(parentDir, { recursive: true });
    }
  }
}

export default MoveFile
