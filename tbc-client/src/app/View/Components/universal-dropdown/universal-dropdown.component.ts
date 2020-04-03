import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'universal-dropdown',
  templateUrl: './universal-dropdown.component.html',
  styleUrls: ['./universal-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UniversalDropDownComponent),
      multi: true
    }
  ]
})

export class UniversalDropDownComponent implements ControlValueAccessor
{ 
  public options = [];
  public bufferValue:number;

  @Input() label  :string;
  @Input() edit   :boolean;
 
  @Input()
  set enum(val:any)
  {
    this.options = [];
    for (let key in val)
    {
      if (typeof val[key] === 'number')
      {
        this.options.push({label:key,value:val[key]});
      }
    }
  }

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

  writeValue(val: number): void 
  {
    this.value = val;
  }

  registerOnChange(fn: any): void { this.onChange = fn }

  registerOnTouched(fn: any): void { this.onTouched = fn }

  setDisabledState(isDisabled: boolean): void {}
}
