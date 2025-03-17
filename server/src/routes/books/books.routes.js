import express from 'express';
import {getAllBooks, getBookById, addBook} from '../../controllers/books/books.controllers.js';
import { checkRoles } from '../../middlewares/authorize.middleware.js';

const router = express.Router();

router.get('/', checkRoles(["admin", "user"]),  getAllBooks);
router.get('/:id', getBookById);
router.post('/', checkRoles(["admin"]),  addBook);


export default router;