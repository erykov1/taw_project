import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public credentials = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  create() {
    this.authService.createOrUpdate(this.credentials).subscribe((result) => {
      this.router.navigate(['/']);
    })
  };
}
