import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})
export class UserFavoritesComponent implements OnInit {

  @Input() user: string | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
