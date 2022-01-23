import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, AsyncValidator, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-ng-mat-file-input',
  templateUrl: './ng-mat-file-input.component.html',
  styleUrls: ['./ng-mat-file-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: NgMatFileInputComponent,
  },
  {
    // provide: NG_VALIDATORS,
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: NgMatFileInputComponent
  }]
})
export class NgMatFileInputComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() formControl?: FormControl;
  @Input() required = true;
  @Input() multiple = false;
  @Input() disabledInput = false;
  @Input() showButtonBrowse = true;
  @Input() showButtonUpload = true;
  @Input() hiddenBrowse = false;
  @Input() hiddenUpload = false;
  @Input() buttonBrowseText = "Browse";
  @Input() buttonUploadText = "Upload";
  @Input() buttonRemoveAllText = "Remove All";
  @Input() accept = "";
  @Input() invalidFileTypeMessage = "Invalid file type. \nAllowed file types: {0}";
  @Input() maxFileSize = 5;
  @Input() invalidFileSizeMessage = "Maximum size: {0} MB";
  @Input() minFileCount = 2;
  @Input() invalidMinFileCountMessage = "Minimum {0} file(s) required";
  @Input() maxFileCount = 5;
  @Input() invalidMaxFileCountMessage = "Maximum number of files exceeded";
  @Input() dragAndDropText = "Drag & drop files here";
  @Input() style = null;
  @Input() previewHeight = "50";
  @Input() browseLabel = "Browse";
  @Input() cancelLabel = "Cancel";
  @Input() browseIcon = null;
  @Input() cancelIcon = null;

  onChange = (filteredFileList: FileList) => { }
  onTouch: any = (touched: boolean) => { }
  value: any | null = null
  touched = false
  disabled = false;
  errorMessages: any
 

  public fileDetails: any[] = []
  public filteredFileList: FileList[] = []
  
  public textValue = ""
  private files: FileList | null = null
  obi: any = {}

  public ctrl: FormControl = new FormControl('', Validators.required)

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    console.log('files :>> ', event,this.host.nativeElement);
    this.onChange(event)
  }


  constructor(private fb: FormBuilder, private host: ElementRef<HTMLInputElement> ) { 
    // this.obi[this.formControlName] = new FormControl('', Validators['required'])
    
  }
  
  
  
  ngOnInit(): void {
    // console.log('this.obi :>> ', this.formControl);
    //console.log('this.formControlName :>> ', this.form.controls);
    this.interpolation()
  }

  // methods needed by ControlValueAccessor Interface
  writeValue(obj: any): void {
    this.value = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  // ControlValueAccessor -------------------
 
  // methods needed by Validator Interface
  validate(control: AbstractControl): ValidationErrors | null {
    const fileList = control.value;
    //console.log('control.value :>> ', control.errors + " | " + this.filteredFileList.length);
    if (this.filteredFileList.length != 0) {
      return { 
        required: {
          fileList
        }
      }
    }
    return null
  }
  // registerOnValidatorChange(fn: () => void)?: void
   registerOnValidatorChange(fn: any): void {
     this.onChange = fn;
   }
  
  
  aaa(ele: any) {
    // console.log('ele :>> ', ele.hasErrors());
  }

  interpolation() {
    this.invalidFileTypeMessage = this.invalidFileTypeMessage.replace("{0}" , this.accept)
    this.invalidFileSizeMessage = this.invalidFileSizeMessage.replace("{0}", this.maxFileSize.toString())
    this.invalidMinFileCountMessage = this.invalidMinFileCountMessage.replace("{0}", this.minFileCount.toString())
    this.invalidMaxFileCountMessage = this.invalidMaxFileCountMessage.replace("{0}", this.maxFileCount.toString())
    this.previewHeight = "height: " + this.previewHeight + "px";
  }  

  handleFileInputChange(event: any) {

    if (event.target.files && event.target.files.length) {
      
      for (let index = 0; index < event.target.files.length; index++) {
        const file = event.target.files[index];
        const reader = new FileReader();

        reader.onload = (value) => {

          if (this.fileDetails.find(x =>
            x.name == (event.target.files[index].name) &&
            x.size == event.target.files[index].size / 1048576 &&
            x.type == event.target.files[index].type)
            === undefined) {
            //console.log('this.filteredFilelList :>> ', this.filteredFileList);
            this.filteredFileList.push(event.target.files[index])
            
            this.fileDetails.push(
            {
              name: event.target.files[index].name,
              size: event.target.files[index].size / 1048576,
              type: event.target.files[index].type,
              result: value.target?.result
            })
          }
        }
        console.log('this.formControlName :>> ', this.formControl?.value);
        reader.readAsDataURL(file);
      }
    }
    // this.markAsTouched()
    // this.value = event.target.files
    // console.log('this.value :>> ', this.value);
    // this.onChange(this.filteredFileList);
    this.registerOnValidatorChange(this.filteredFileList)
    this.markAsTouched();
    // this.onChange(this.filteredFilelList)
  }

  markAsTouched() {
    if (!this.touched) {
    this.onTouch()
    this.touched = true
    }
  } 

  fileCount(): number {
    return this.fileDetails.length;
  }

  fileTypeValid(fileType: string): boolean {
    return fileType.search(this.accept) != -1
  }

  fileSizeValid(fileSize: number): boolean {
    return fileSize <= this.maxFileSize
  }

  removeFile(index: number, a: any): void {
    this.fileDetails.splice(index, 1)
    this.filteredFileList.splice(index, 1)
    // console.log('this.filteredFileList :>> ', this.filteredFilelList);
    // this.registerOnChange(this.filteredFilelList)
    // this.onChange(this.filteredFileList);
  }

  removeAllFiles(): void {
    this.fileDetails = []
  }
}