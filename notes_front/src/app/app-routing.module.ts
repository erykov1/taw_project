import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NotesComponent } from './components/notes/notes.component';
import { AuthGuard } from './services/auth.guard';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NotesDetailsComponent } from './components/notes-details/notes-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user/signup',
    component: SignUpComponent,
  },
  {
    path: 'user/signin',
    component: SignInComponent,
  },
  {
    path: 'notes/all/:userId',
    component: NotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notes/add',
    component: AddNoteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'note/detail/:id',
    component: NotesDetailsComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
