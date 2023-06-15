import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  
  public items$: any;
  filterStatus: string = 'all';

  constructor(private service: NotesService, private route: ActivatedRoute) {
  }

  setStatus(status: string) {
    this.filterStatus = status;
  }

  ngOnInit() {
   this.getAll();
  }

  getAll(){
    let id: string = '';
    this.route.paramMap.subscribe((params: any) => {
      id = params.get('userId');
    });
    this.service.getAllNotes(id).subscribe(response => {
      this.items$ = response;
   });
  }
}
