import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-ngx-mat-file-input-dnd',
  templateUrl: './ngx-mat-file-input-dnd.component.html',
  styleUrls: ['./ngx-mat-file-input-dnd.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: NgxMatFileInputDndComponent },
  ]
})
export class NgxMatFileInputDndComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<Array<File>>  {
  [x: string]: any;

  @Input() accept = ""
  @Input() preview = true
  @Input() multiple?: boolean
  @Input() dragAndDrop = true
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
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;


  @ViewChild('ngx_mat_file_input', { static: true }) ngx_mat_file_input?: NgControl;

  private onChange: any = () => {}
  private onTouch: any = () => { }
  public selectedFiles: Array<File> = [];;   
  public invalidFiles: Array<any> = [];
  public previewData: any = [];  

  //MatFormFieldControl Interface
  static nextId = 0;
  stateChanges = new Subject<void>();
  @HostBinding() id = `app-ngx-mat-file-input-dnd-${NgxMatFileInputDndComponent.nextId++}`;
  placeholder: string = "";
  focused: boolean = false;
  touched: boolean = false;
  shouldLabelFloat: boolean = false;
  controlType: string = "app-ngx-mat-file-input-dnd";
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent): void {
  }
  get errorState(): boolean {
    return this.ngControl.control?.errors != null && this.ngControl?.control?.touched;
  }
  get empty() {
    let n = this.value;
    return !n.area && !n.exchange && !n.subscriber;
  }
  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }
  
  onFocusOut(event: FocusEvent) {
    this.touched = true;
    this.focused = false;
    this.onTouch();
    this.stateChanges.next();
  }

  

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
  this._disabled = coerceBooleanProperty(value);
  this._disabled ? this.ngControl.control?.enable() : this.ngControl.control?.disable();
  this.stateChanges.next();
}
private _disabled = false;
 //MatFormFieldControl Interface

  set value(val: any){  
    this.stateChanges.next();
    this.onChange(val)
    this.onTouch(val)
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
     if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.interpolation()
  }

  ngOnDestroy() {
    this.stateChanges.complete();
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
    this.invalidFiles = []
    
    if (this.selectedFiles.length == 0) {
      this.selectedFiles = []
    } 
    let arr = [...this.selectedFiles] as Array<File>
    
    for (const file of e.target.files) {

      if ( this.fileSizeValid(file.size) && 
        this.fileTypeValid(file.type))
      {
        if (arr.find(f =>
        f.name == file.name &&
        f.size == file.size &&
        f.type == file.type) === undefined) {
          this.selectedFiles.push(file)
          this.computePreviewData(file)
        }
      }
      else if(!this.fileSizeValid(file.size)) {
        this.invalidFiles.push({
          name: file.name,
          size: file.size,
        })      
      } else {
        this.invalidFiles.push({
          name: file.name,
          type: file.type,
        })   
      }
    }

    this.writeValue(this.selectedFiles)
  }

  removeAll() {
    this.selectedFiles = []
    this.invalidFiles = []
    this.previewData = []
    this.writeValue(this.selectedFiles)
  }

  removeFile(index: number) {
    this.invalidFiles = []
    this.selectedFiles.splice(index, 1)  
    this.previewData.splice(index, 1)  
    this.writeValue(this.selectedFiles)
  }

  computePreviewData(file: File) {
    if (!this.preview || !this.isImage(file)) {
      return
    }
    
    const reader = new FileReader()
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

  invalidFileCount(): number {
    return this.invalidFiles.length;
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
