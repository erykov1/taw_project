import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent {
  public title: string = '';
  public content: string = '';
  public noteType: string = '';

  constructor(private service: NotesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id: string = '';
    this.route.paramMap.subscribe((params: any) => {
      id = params.get('id');
    });

    this.service.getNoteById(id).subscribe((res: any) => {
      console.log('data', res);
      this.title = res['title'];
      this.content = res['content'];
      this.noteType = res['type'];
    });
  }

  updateStatus() {
    let id: string = '';
    this.route.paramMap.subscribe((params: any) => {
      id = params.get('id');
    });

    this.service.updateNoteStatus(id).subscribe((res: any) => {
      console.log("updated to done");
      window.location.reload();
    })
  }
}
