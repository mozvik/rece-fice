import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ngx-mat-file-input-dnd',
  templateUrl: './ngx-mat-file-input-dnd.component.html',
  styleUrls: ['./ngx-mat-file-input-dnd.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgxMatFileInputDndComponent,
      multi: true
    },
    { provide: MatFormFieldControl, useExisting: NgxMatFileInputDndComponent }
  ]
})
export class NgxMatFileInputDndComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<any>  {

  @Input() accept = ""
  @Input() preview = true
  @Input() multiple = false 
  @Input() hiddenUpload = false;
  @Input() previewWidth = "200" 
  @Input() buttonBrowseText = "Browse";
  @Input() buttonUploadText = "Upload";
  @Input() buttonRemoveAllText = "Remove All";
  @Input() minFileCount = 2;
  @Input() invalidMinFileCountMessage = "Minimum {0} file(s) required";
  @Input() maxFileCount = 5;
  @Input() invalidMaxFileCountMessage = "Maximum number of files exceeded";
  @Input() invalidFileTypeMessage = "Invalid file type. \nAllowed file types: {0}";
  @Input() maxFileSize = 5;
  @Input() invalidFileSizeMessage = "Maximum size: {0} MB";
  @Input() dragAndDropText = "Drag & drop files here";

  @ViewChild('ngx_mat_file_input') ngx_mat_file_input!: ElementRef;
  onChange: any = () => {}
  onTouch: any = () => { }
  selectedFiles: Array<File> = [];   
  previewData: any = [];   

  constructor() {
   
  }

  //MatFormFieldControl
  static nextId = 0;
  stateChanges = new Observable<void>();
  @HostBinding() id = `app-ngx-mat-file-input-dnd-${NgxMatFileInputDndComponent.nextId++}`;
  placeholder: string = "";
  ngControl!: NgControl | null;
  focused: boolean = false;
  // empty: boolean = true;
  shouldLabelFloat: boolean = false;
  required: boolean = false;
  disabled: boolean = false;
  errorState: boolean = false;
  // @HostBinding() controlType = `ngx-mat-file-input-dnd-${NgxMatFileInputDndComponent.nextId++}`;
  controlType: string = "app-ngx-mat-file-input-dnd";
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent): void {
  }
  get empty() {
    if (this.selectedFiles.length === 0) {
        return true;
    }
    return false;
}
 //MatFormFieldControl


  set value(val: any){  
    this.selectedFiles = val
    this.onChange(val)
    this.onTouch(val)
  }
  ngOnInit(): void {
    this.interpolation()
    
  }
  ngAfterViewInit() {
    console.log('this.multiple :>> ', this.ngx_mat_file_input.nativeElement.getAttribute('multiple') ? 'true':'false');
  }
  writeValue(value: any) { 
    this.value = value
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

  interpolation() {
    this.invalidFileTypeMessage = this.invalidFileTypeMessage.replace("{0}" , this.accept)
    this.invalidFileSizeMessage = this.invalidFileSizeMessage.replace("{0}", this.maxFileSize.toString())
    this.invalidMinFileCountMessage = this.invalidMinFileCountMessage.replace("{0}", this.minFileCount.toString())
    this.invalidMaxFileCountMessage = this.invalidMaxFileCountMessage.replace("{0}", this.maxFileCount.toString())
    this.previewWidth = "max-width: " + this.previewWidth + "px";
  }  

  selectionChange(e: any): void {
    
    if (this.selectedFiles.length == 0) {
      this.selectedFiles = Array.from(e.target.files) as Array<File>
      for (const file of e.target.files) {
        this.computePreviewData(file)
      }
    } else
    {
      let arr = [...this.selectedFiles] as Array<File>
      
      for (const file of e.target.files) {
        if (arr.find(f =>
          f.name == file.name &&
          f.size == file.size &&
          f.type == file.type) === undefined) {
          this.selectedFiles.push(file)
          this.computePreviewData(file)
        }
      }
    }
     this.writeValue(this.selectedFiles)
  }

  removeAll() {
    this.selectedFiles = []
    this.previewData = []
    this.writeValue(this.selectedFiles)
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1)  
    this.previewData.splice(index, 1)  
    this.writeValue(this.selectedFiles)
  }

  computePreviewData(file: File) {
    if (!this.preview || !this.isImage(file)) {
      return
    }
    
    const reader = new FileReader()
    console.log('file :>> ', file, this.previewData);
    reader.onload = (value) => {
       this.previewData.push(value.target?.result)
    }
    reader.readAsDataURL(file)
    
  }

  isImage(file: File): boolean{
    return file.type.indexOf('image') != -1
  }

  fileCount(): number {
    return this.selectedFiles.length;
  }
  fileTypeValid(fileType: string): boolean {
    return fileType.search(this.accept) != -1
  }

  fileSizeValid(fileSize: number): boolean {
    return this.byteToMegabyte(fileSize) <= this.maxFileSize
  }

  byteToMegabyte(byte: number): number{
    return byte / 1048576
  }
}
