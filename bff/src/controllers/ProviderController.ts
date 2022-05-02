import BacklogService from '../services/BacklogService'
import { Request, Response } from 'express'

class ProviderController {
  static async add(req: Request, res: Response) {
    let result

    switch (req.body.provider) {
      case 'backlog':
        result = await BacklogService.add(req.body)
        break
      default:
        return res.status(400).send({ message: 'Invalid Provider' })
    }

    res.status(result.status).send(result.data)
  }

  static async getProviders(req: Request, res: Response) {
    const backlogService = await BacklogService.getProviders(req.body.user_id)

    res.send({
      backlog: backlogService
    })
  }

  static async filterListByProvider(req: Request, res: Response) {
    const backlogService = new BacklogService()
    let result

    switch (req.query.service) {
      case 'backlog':
        result = await backlogService.getProviderById(req.params.id)
        break
      default:
        result = { message: 'Invalid Provider' }
    }

    if (result.projects) {
      res.send(result.projects)
    } else {
      res.send(result)
    }
  }
}

export default ProviderController
