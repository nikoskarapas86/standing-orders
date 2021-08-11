import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientContainerService } from '../services/client-container-service';
import { DestroyService } from '../services/destroy.service';

@Component({
  selector: 'app-client-container',
  templateUrl: './client-container.component.html',
  styleUrls: ['./client-container.component.scss'],
  providers: [DestroyService],
})
export class ClientContainerComponent implements OnInit {
  @ViewChildren('backgroundImage') backgroundImage: QueryList<ElementRef>;
  private subscriptions$: Subscription[] = [];
  isPolicyLoading = true;
  private images = {
    0: './assets/images/SCENE_EMPTY.svg',
    1: {
      name: './assets/images/card_name.png',
      number: './assets/images/card_number.png',
      date: './assets/images/card_date.png',
      code: './assets/images/card_code.png',
    },
  };
  isShowSpinner = false;
  isCreditCard = false;
  branchName: string;
  step = 0;

  constructor(
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
    public clientContainerService: ClientContainerService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.clientContainerService.getStep$.subscribe(step => {
      this.step = step;
      if (this.step === 1) this.observeCreditCardBackground();
    });
    this.changeBackgroundImages();
  }

  private changeBackgroundImages(): void {
    this.backgroundImage.forEach(div => {
      const backgroundImage =
        this.step === 0
          ? this.images[this.step]
          : this.step === 1
          ? this.images[this.step].number
          : '';
      if (this.step === 1) {
        this.renderer.setStyle(
          div.nativeElement,
          'background',
          `#024a86 url(${backgroundImage}) no-repeat center center`
        );
        this.resizeCreditCard(div);
      } else {
        this.renderer.setStyle(
          div.nativeElement,
          'background',
          `#024a86 url(${backgroundImage}) no-repeat center bottom`
        );
        if (backgroundImage.includes('SCENE_EMPTY')) {
          this.renderer.setStyle(div.nativeElement, 'background-size', 'contain');
        } else {
          this.renderer.setStyle(div.nativeElement, 'background-size', 'cover');
          this.renderer.setStyle(div.nativeElement, 'height', 'auto');
        }
      }
    });
  }

  private observeCreditCardBackground(): void {
    this.changeBackgroundImages();
    this.clientContainerService.getCreditCardBackground
      .pipe(takeUntil(this.destroy$))
      .subscribe(creditCardImage => {
        this.changeCreditCardBackground(creditCardImage);
      });
  }

  private changeCreditCardBackground(creditCardImage): void {
    this.backgroundImage.forEach(div => {
      const backgroundImage = this.images[1][creditCardImage];
      this.renderer.setStyle(
        div.nativeElement,
        'background',
        `#024a86 url(${backgroundImage}) no-repeat center center`
      );
      this.resizeCreditCard(div);
    });
  }

  private resizeCreditCard(div: ElementRef): void {
    const screenSize$ = this.breakpointObserver
      .observe('max-width: 768px')
      .subscribe(({ matches }) => {
        matches
          ? this.renderer.setStyle(div.nativeElement, 'background-size', '277px 160px')
          : this.renderer.setStyle(div.nativeElement, 'background-size', '377px 240px');
      });
    this.subscriptions$.push(screenSize$);
  }
}
