import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.css']
})
export class NotesItemComponent implements OnInit {
  @Input() title?: string;
  @Input() content?: string;
  @Input() type?: string;
  @Input() id?: string;

  constructor(private service: NotesService) { }

  ngOnInit(): void {
  }

  deleteNote() {
    if(this.id) {
      this.service.deleteNote(this.id).subscribe(response => {
        console.log('delete note');
        window.location.reload()
      });
    }
  }

}
