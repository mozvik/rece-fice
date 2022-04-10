import { trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { hoverImageAnimation } from 'src/app/animations';
import { Recipe } from 'src/app/classes/recipe';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-recipe-thumbnail',
  templateUrl: './recipe-thumbnail.component.html',
  styleUrls: ['./recipe-thumbnail.component.scss'],
  animations: [
    trigger(
      'enterHoverAnimation', hoverImageAnimation
    )
  ],
})
export class RecipeThumbnailComponent implements OnInit {

  @Input() recipe: Recipe | undefined;
  
  showImgOverlay: boolean = false;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {   
  }
  showImgText(): void {
    this.showImgOverlay = true;
  }
  hideImgText(): void {
    this.showImgOverlay = false;
  }
}
