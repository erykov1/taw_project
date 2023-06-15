import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import {DataService} from "./services/data.service";
import { AuthService } from './services/auth.service';
import { NoteCategoryPipe } from './pipes/note-category.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { NotesComponent } from './components/notes/notes.component';
import { NotesDetailsComponent } from './components/notes-details/notes-details.component';
import { NotesItemComponent } from './components/notes-item/notes-item.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HighlightButtonDirective } from './directives/highlight-button.directive';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    NoteCategoryPipe,
    NotesComponent,
    NotesDetailsComponent,
    NotesItemComponent,
    AddNoteComponent,
    NavbarComponent,
    HighlightButtonDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    DataService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
