import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';

const notesType = {
  done: 'done',
  todo: 'todo'
};

const notesTypes = [notesType.done, notesType.todo];

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  type: { type: String, enum: notesTypes, default: notesType.todo},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
  collection: 'notes'
});

notesSchema.plugin(uniqueValidator);

const NotesModel = mongoose.model('notes', notesSchema);

function createNewOrUpdate(note) {
  return Promise.resolve().then(() => {
    if (!note.id) {
      return new NotesModel(note).save().then(result => {
        if (result) {
          return mongoConverter(result);
        }
      });
    } else {
      return NotesModel.findByIdAndUpdate(note.id, _.omit(note, 'id'), { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}

async function getByTitleOrUserId(title) {
  const result = await NotesModel.findOne({ $or: [{ title: title }, { userId: title }] });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'Note not found');
}

async function get(id) {
  const result = await NotesModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'Note not found');
 }

async function removeById(id) {
  return await NotesModel.findByIdAndRemove(id);
}

async function getAllNotesByUserId(userId) {
  const notes = await NotesModel.find({ userId: userId });
  if (notes.length > 0) {
    return notes.map(mongoConverter);
  } else {
    return [];
  }
}

async function updateNoteToDone(noteId) {
  try {
    const updatedNote = await NotesModel.findOneAndUpdate(
      { _id: noteId, type: notesType.todo },
      { $set: { type: notesType.done } },
      { new: true }
    );

    return updatedNote;
  } catch (error) {
    throw applicationException.new(applicationException.NOT_FOUND, 'No notes found for the user');
  }
}


export default {
  createNewOrUpdate: createNewOrUpdate,
  getByTitleOrUserId: getByTitleOrUserId,
  get: get,
  removeById: removeById,
  getAllNotesByUserId: getAllNotesByUserId,
  updateNoteToDone: updateNoteToDone,
  notesTypes: notesTypes,
  model: NotesModel
};