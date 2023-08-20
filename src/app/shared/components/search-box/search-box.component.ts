import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @ViewChild('txtSearch')
  public txtSearch!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  emitValue(): void {
    const value = this.txtSearch.nativeElement.value;
    this.onValue.emit(value);
    this.txtSearch.nativeElement.value = '';
  }
}
