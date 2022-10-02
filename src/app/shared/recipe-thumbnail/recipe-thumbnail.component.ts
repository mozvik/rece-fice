import { trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { hoverImageAnimation } from 'src/app/animations';
import { Recipe } from 'src/app/classes/recipe';
import { OptionsData } from 'src/app/interface/options-data';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-recipe-thumbnail',
  templateUrl: './recipe-thumbnail.component.html',
  styleUrls: ['./recipe-thumbnail.component.scss'],
  animations: [trigger('enterHoverAnimation', hoverImageAnimation)],
})
export class RecipeThumbnailComponent implements OnInit {
  @Input() recipe: Recipe | undefined;

  difficulties: OptionsData[] = [];
  costs: OptionsData[] = [];
  showImgOverlay: boolean = false;

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.apiService.costs.subscribe((costs) => (this.costs = costs));
    this.apiService.difficulties.subscribe(
      (difficulties) => (this.difficulties = difficulties)
    );
  }
  showImgText(): void {
    this.showImgOverlay = true;
  }
  hideImgText(): void {
    this.showImgOverlay = false;
  }
}
