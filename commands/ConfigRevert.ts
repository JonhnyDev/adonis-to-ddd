import { BaseCommand } from '@adonisjs/core/build/standalone'
import { files } from '@adonisjs/sink'

export default class DDDConfigRevert extends BaseCommand {
  public static commandName = 'ddd:config-revert'
  public static description = 'revert edition the .adonisrc.json configuration file to AdonisJS 5 default configuration'
  public async run(): Promise<void> {
    const rootDir = this.application.cliCwd || this.application.appRoot
    const rcFile = new files.AdonisRcFile(rootDir)
    rcFile.set('exceptionHandlerNamespace', "App/exceptions/Handler")
    rcFile.set('directories', {
      "config": "config",
      "public": "public",
      "contracts": "contracts",
      "providers": "providers",
      "database": "database",
      "migrations": "database/migrations",
      "seeds": "database/seeders",
      "resources": "resources",
      "views": "resources/views",
      "start": "start",
      "tmp": "tmp",
      "tests": "tests"
    })
    rcFile.set('namespaces', {
      "controllers": "App/Controllers",
      "models": "App/Models",
      "middleware": "App/Middleware",
      "exceptions": "App/Exceptions",
      "validators": "App/Validators",
      "httpControllers": "App/Controllers/Http",
      "eventListeners": "App/Listeners",
      "redisListeners": "App/Listeners"
    })
    rcFile.set('aliases',{
      "App": "app",
      "Config": "config",
      "Database": "database",
      "Contracts": "contracts"
    })
    rcFile.commit()
    this.logger.action('update').succeeded('.adonisrc.json')
  }
}
