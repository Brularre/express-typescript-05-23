import { addDiary, findById, getEntriesWithoutSensitiveInfo } from '../services/diariesServices';
import  toNewDiaryEntry from '../utils/utils'

import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
    const diary = findById(+req.params.id)
    return (diary !== null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body)
        const addedDiaryEntry = addDiary(newDiaryEntry)
        res.json(addedDiaryEntry)   
    } catch (err: any) {
        res.status(400).send(err.message)
    }
    
})

export default router