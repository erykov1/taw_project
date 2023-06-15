import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  public credentials = {
    title: '',
    content: '',
    userId: '',
  };

  constructor(private service: NotesService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  create() {
    this.credentials.userId = this.authService.currentUser.userId;

    this.service.addNote(this.credentials).subscribe((result) => {
      this.router.navigate(['notes/all/', this.credentials.userId]);
    })
  };
}
