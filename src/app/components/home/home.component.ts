import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public code: any;
  
  constructor(
    private _router: Router,
    private IdService: IdService
  ) { 
  }
  
  ngOnInit() {
    this.code = this.IdService.generate();
  }

  redirectChat(){
    return this._router.navigate(['/chat/' + this.code]);
  }
  
}
