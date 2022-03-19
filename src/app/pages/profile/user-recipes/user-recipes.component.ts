import { animate, AnimationMetadata, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { DataService } from '../../../service/data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { hoverImageAnimation, scaleEnterAnimation } from 'src/app/animations';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css'],
  animations: [
    trigger(
      'enterHoverAnimation', hoverImageAnimation
    ),
    trigger(
      'enterAnimation', scaleEnterAnimation   
    )
  ],
  
})
export class UserRecipesComponent implements OnInit {
  
  @Input() user: string | undefined
  @Input() userRecipes: Recipe[] | undefined
  @Input() userPageIndex: number = 0
  @Output() userPageIndexChange: EventEmitter<number> = new EventEmitter();

  showImgOverlay: boolean[] = [];
  dialogDeleteRef: any

  constructor(public dataService: DataService, public dialogDelete: MatDialog) { }

  ngOnInit(): void {
  }
  incrementIndex(): void {
    this.dataService.userRecipePageIndex++
    this.userPageIndexChange.emit(this.dataService.userRecipePageIndex)
  }

  showImgText(index: number): void {
    this.showImgOverlay[index] = true;
  }
  hideImgText(index: number): void { this.showImgOverlay[index] = false; }

  openDeleteDialog(item: Recipe): void {
    this.dialogDeleteRef = this.dialogDelete.open(DialogDelete, 
      { data: item }
    );

    this.dialogDeleteRef.afterClosed().subscribe((result: any) => {
      if (result) {
      console.log(`deleting :>> ${item.recipeName}`);
    } else {
      console.log(`canceled :>> ${item.recipeName}`);
    }
    });
  }

  
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {
  constructor(@Inject(MAT_DIALOG_DATA) public data:  Recipe) { }
}