import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9)' })
        ),
      ]),
    ]),
  ],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();

  private documentClickListener: (event: MouseEvent) => void;

  constructor(private el: ElementRef) {
    this.documentClickListener = this.onDocumentClick.bind(this);
  }

  ngOnInit(): void {
    document.addEventListener('click', this.documentClickListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener(
      'click',
      this.documentClickListener as EventListener
    );
  }

  private onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.isVisible && !this.el.nativeElement.contains(target)) {
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
