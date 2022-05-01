import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() small: boolean = false;
  currentScreenSize: number | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentScreenSize.subscribe(size => {
      this.currentScreenSize = size;
    })
  }

}
