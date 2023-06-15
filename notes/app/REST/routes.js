import userEndpoint from './user.endpoint';
import notesEndpoint from './notes.endpoint';

const routes = function (router)
{
  userEndpoint(router);
  notesEndpoint(router);
};

export default routes;