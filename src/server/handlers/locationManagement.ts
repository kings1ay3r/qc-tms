import { NextFunction, Request, Response, Router } from 'express'
import LocationManagementService from '@app/server/services/locations'
import {
  CreateLocationRequest,
  createLocationSchema,
  RequestContext,
  UpdateLocationRequest,
  updateLocationSchema,
} from '@app/dtos'
import validate from '@app/server/common/validator'

const locationManagementService = new LocationManagementService()

const router: Router = Router()

// Handler to create a new location
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await validate(
      res.locals as RequestContext,
      ['locations.write', 'locations.all'],
      createLocationSchema(),
      req.body,
    )
    res.locals.response = await locationManagementService.createLocation(
      res.locals as RequestContext,
      { ...req.body } as CreateLocationRequest,
    )
    return next()
  } catch (error) {
    console.log(error)
    return next(error)
  }
})

// Handler to get a list of all locations
router.get('/', async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  //TODO: (ListEnhancements) Implement sorting and filtering
  try {
    await validate(res.locals as RequestContext, ['locations.read', 'locations.all'])
    res.locals.response = await locationManagementService.getLocations(res.locals as RequestContext)
    return next()
  } catch (error) {
    return next(error)
  }
})

// Handler to get a location
router.get('/:uuid', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await validate(res.locals as RequestContext, ['locations.read', 'locations.all'])
    res.locals.response = await locationManagementService.getLocation(
      res.locals as RequestContext,
      req.params.uuid,
    )
    return next()
  } catch (error) {
    return next(error)
  }
})

// Handler to update the details of a location
router.patch('/:uuid', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await validate(
      res.locals as RequestContext,
      ['locations.write', 'locations.all'],
      updateLocationSchema(),
      req.body,
    )
    res.locals.response = await locationManagementService.updateLocation(
      res.locals as RequestContext,
      req.params.uuid,
      req.body as UpdateLocationRequest,
    )
    return next()
  } catch (error) {
    return next(error)
  }
})

// Handler to delete a location
router.delete('/:uuid', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await validate(res.locals as RequestContext, ['locations.all'])
    res.locals.response = await locationManagementService.deleteLocation(
      res.locals as RequestContext,
      req.params.uuid,
    )
    return next()
  } catch (error) {
    next(error)
  }
})

export default { locationManagementService, locationManagementRouter: router }
