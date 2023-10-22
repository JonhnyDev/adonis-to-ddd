import { BaseCommand } from '@adonisjs/core/build/standalone'
import { files } from '@adonisjs/sink'

export default class DDDConfig extends BaseCommand {
  public static commandName = 'ddd:config'
  public static description = 'edit the .adonisrc.json configuration file to follow the DDD pattern'
  public async run(): Promise<void> {
    const rootDir = this.application.cliCwd || this.application.appRoot
    const rcFile = new files.AdonisRcFile(rootDir)
    rcFile.set('exceptionHandlerNamespace', "src/interfaces/http/exceptions/Handler")
    rcFile.set('directories', {
      "database": "src/infra/database",
      "migrations": "src/infra/database/migrations",
      "public": "src/interfaces/http/public",
      "views": "src/interfaces/http/resources/views",
      "resources": "src/interfaces/http/resources/resources",
    })
    rcFile.set('namespaces', {
      "controllers": "src/interfaces/http/controllers",
      "httpControllers": "src/interfaces/http/controllers",
      "middleware": "src/interfaces/http/middlewares",
      "exceptions": "src/interfaces/http/exceptions",
      "eventListeners": "src/app/events",
      "models": "src/infra/database/models",
      "validators": "src/interfaces/http/validators"
    })
    rcFile.setAlias('Src', 'src')
    rcFile.commit()
    this.logger.action('update').succeeded('.adonisrc.json')
  }
}
