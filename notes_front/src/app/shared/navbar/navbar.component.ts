import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public credentials = {
    userId: '',
  }

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.credentials.userId = this.authService.currentUser.userId;
  }

  signOut() {
	this.authService.logout().subscribe((result: any) => {
  	this.router.navigate(['/']);
  	return result;
	});
  }
}
