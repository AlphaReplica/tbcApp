import { Component, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'universal-field',
  templateUrl: './universal-field.component.html',
  styleUrls: ['./universal-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UniversalFieldComponent),
      multi: true
    }
  ]
})

export class UniversalFieldComponent implements ControlValueAccessor
{
  public bufferValue:any;
  
  @Input() label   :string;
  @Input() pattern :string;
  @Input() error   :string;
  @Input() edit    :boolean;

  set value(val)
  {
    this.bufferValue = val;
    this.onChange(this.bufferValue);
    this.onTouched(this.bufferValue);
  }

  get value()
  {
    return this.bufferValue;
  }

  onChange: any = () => {}

  onTouched: any = () => {}

  writeValue(val: string): void 
  {
    this.value = val;
    this.ref.detectChanges();
  }

  registerOnChange(fn: any): void { this.onChange = fn }

  registerOnTouched(fn: any): void { this.onTouched = fn }

  setDisabledState(isDisabled: boolean): void {}

  constructor(private ref:ChangeDetectorRef){}
}
