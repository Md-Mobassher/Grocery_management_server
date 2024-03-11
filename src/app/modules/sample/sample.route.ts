import express from 'express'

const router = express.Router()

router.post('/create-sample', AuthControllers.createSample)

router.get('/samples', AuthControllers.getAllSamples)

router.get('/sample', AuthControllers.getASample)

router.patch('/update-sample', AuthControllers.updateSample)

router.delete('/delete-sample', AuthControllers.deleteSample)

export const AuthRoutes = router
