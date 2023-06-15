import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note';

@Pipe({
  name: 'noteCategory'
})
export class NoteCategoryPipe implements PipeTransform {

  transform(notes: Note[], filterType: string): Note[] {
    if (!notes) {
      return [];
    }

    if (filterType === 'done') {
      return notes.filter(note => note.type === 'done');
    } else if (filterType === 'todo') {
      return notes.filter(note => note.type === 'todo');
    } else {
      return notes;
    }
  }

}
