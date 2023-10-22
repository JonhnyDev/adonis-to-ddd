import { existsSync, readdir, stat, copyFile, unlink, access, mkdir } from 'fs-extra'
import path from 'path'
import Logger from '@ioc:Adonis/Core/Logger'
import Application from '@ioc:Adonis/Core/Application';
interface Data {
  from: string;
  to: string
}

class MoveFile {
  public async execute(data: Array<Data>): Promise<void> {
    Logger.info(`Start move files`);
    for(const value of data){
      const fromPath = path.join(Application.appRoot, value.from);
      const toPath = path.join(Application.appRoot, value.to);

      try {
        await this.moveFilesRecursively(fromPath, toPath);
      } catch (error: any) {
        Logger.error(`Error moving files: ${error.message}`);
      }
    }
    Logger.info('All files moved');
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
        Logger.info(`Moved ${path.relative(Application.appRoot, sourcePath)} to ${path.relative(Application.appRoot, destinationPath)}`);
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
