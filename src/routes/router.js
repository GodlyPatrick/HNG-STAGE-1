import { Router }  from 'express';
const stringRouter = Router();
import { createString, getString, getAllStrings, deleteString, filterByNaturalLanguage } from '../controller/stringController.js';
// Routes for string operations
stringRouter
.post('/', createString)
.get('/:value', getString)
.get('/', getAllStrings)
.get('/filter/natural-language', filterByNaturalLanguage)
.delete('/:value', deleteString);

export default stringRouter;