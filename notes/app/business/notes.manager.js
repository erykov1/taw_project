import NotesDAO from '../DAO/notesDAO';

function create(context) {

  async function createNewOrUpdate(noteData) {
    const note = await NotesDAO.createNewOrUpdate(noteData);
    if(note) {
      return note;
    }
  }

  async function getAllNotesByUserId(userId) {
    const notes = await NotesDAO.getAllNotesByUserId(userId);
    if (notes) {
      return notes;
    } else {
      throw applicationException.new(applicationException.NOT_FOUND, 'No notes found for the user');
    }
  }


  async function removeById(id) {
    const removedNote = await NotesDAO.removeById(id);
    if (removedNote) {
      return removedNote;
    } else {
      throw applicationException.new(applicationException.NOT_FOUND, 'Note not found');
    }
  }

  async function updateNoteToDone(id) {
    const note = await NotesDAO.updateNoteToDone(id);
    return note;
  }

  async function getNoteById(id) {
    const note = await NotesDAO.get(id);
    return note;
  }

  return {
    createNewOrUpdate: createNewOrUpdate,
    getAllNotesByUserId: getAllNotesByUserId,
    removeById: removeById,
    updateNoteToDone: updateNoteToDone,
    getNoteById: getNoteById,
  };
}

export default {
  create: create,
};