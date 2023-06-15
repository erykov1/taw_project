import userManager from './user.manager';
import notesManager from './notes.manager';


function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
  getUserManager: getter(userManager),
  getNotesManager: getter(notesManager)
};