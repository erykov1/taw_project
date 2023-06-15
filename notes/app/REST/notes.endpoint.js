import business from '../business/business.container';
import applicationException from '../service/applicationException';

const notesEndpoint = (router) => {
  router.post('/api/note/add', async (request, response, next) => {
    try {
      let result = await business.getNotesManager(request).createNewOrUpdate(request.body);
      response.status(201).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  })

  router.get('/api/note/all/:userId', async (request, response, next) => {
    try {
      let result = await business.getNotesManager(request.params.userId).getAllNotesByUserId(request.params.userId);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  })

  router.delete('/api/note/delete/:id', async (request, response, next) => {
    try {
      let result = await business.getNotesManager(request.params.id).removeById(request.params.id);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  })

  router.put('/api/note/update/:id', async (request, response, next) => {
    try {
      let result = await business.getNotesManager().updateNoteToDone(request.params.id);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  })

  router.get('/api/note/:id', async (request, response, next) => {
    try {
      let result = await business.getNotesManager().getNoteById(request.params.id);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  })
};

export default notesEndpoint;