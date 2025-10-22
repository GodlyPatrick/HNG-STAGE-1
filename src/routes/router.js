import { Router }  from 'express';
const stringRouter = Router();
import { createString, getString, getAllStrings, deleteString, filterByNaturalLanguage } from '../controller/stringController.js';
// Routes for string operations
stringRouter
.post('/strings', createString)
.get('/strings/:value', getString)
.get('/strings', getAllStrings)
.get('/strings/filter/natural-language', filterByNaturalLanguage)
.delete('/strings/:value', deleteString);

export default stringRouter;