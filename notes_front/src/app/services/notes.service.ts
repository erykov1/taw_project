import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from "@auth0/angular-jwt";
import {map} from 'rxjs/operators';
import {Token} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private url = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getAllNotes(id: string) {
    return this.http.get(this.url + '/api/note/all/' + id);
  }

  addNote(credentials: any) {
    return this.http.post(this.url + '/api/note/add', credentials);
  }

  deleteNote(id: string) {
    return this.http.delete(this.url + '/api/note/delete/' + id);
  }

  getNoteById(id: string) {
    return this.http.get(this.url + '/api/note/' + id);
  }

  updateNoteStatus(id: string) {
    return this.http.put(this.url + '/api/note/update/' + id, id);
  }
}
