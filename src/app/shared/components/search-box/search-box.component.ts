import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @ViewChild('txtSearch')
  public txtSearch!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(350))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(): void {
    const value = this.txtSearch.nativeElement.value;
    this.onValue.emit(value);
    this.txtSearch.nativeElement.value = '';
  }

  onKeyPress(searchTerm: string) {
    console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }
}
