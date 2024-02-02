import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieType } from '../models/movie.model';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
 <div class="flex items-center justify-center w-full h-full py-14 sm:py-14 px-14">
  <div class="w-full relative flex items-center justify-center">


    <div class="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden sm:justify-center">
        <div id="slider" class="h-full flex lg:gap-6 md:gap-4 sm:gap-2 gap-2 items-center justify-start transition ease-out duration-700">
          
          @for (m of movie; track $index) {
            <div class="flex flex-shrink-0 relative w-auto sm:w-auto" id="slides" (click)="slideClicked.emit(m)" >
                <img src="https://image.tmdb.org/t/p/w500{{m.poster_path}}" alt="{{m.title}}" class="object-cover object-center w-80 max-size object-fit-cover">
              <div class="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                <h2 class="lg:text-xl leading-4 text-base lg:leading-5 text-white">{{m.title}}</h2>
                <p>Release: {{m.release_date}}</p>
              </div>
            </div>
          }
       </div>
    </div>


  </div>
</div>  


  `,
  styles: [``]
})
export class SliderComponent implements OnInit {
  @Input({required: true}) movie!: MovieType[];
  @Output() slideClicked = new EventEmitter<MovieType>();
  slider: any;
  slides: any;
  defaultTransform: number = 0;
  intervalId: any;
  speed: number = 10;
  
  goNext() {
    this.defaultTransform = this.defaultTransform - this.speed;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7) {
      this.defaultTransform = 0;
    }
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }
  
  goPrev() {
    if (Math.abs(this.defaultTransform) === 0) {
      this.defaultTransform = 0;
    } else {
      this.defaultTransform = this.defaultTransform + this.speed;
      this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
    }
  }
  
  startAutoplay() {
    this.intervalId = setInterval(() => {
      this.goNext();
    }, 100);
  }
  
  stopAutoplay() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  
  ngOnInit(): void {
    this.slider = document.getElementById("slider");
    this.startAutoplay();

   /*  this.slider.addEventListener("mouseenter", () => {
      this.stopAutoplay();
    });
    this.slider.addEventListener("mouseleave", () => {
      this.startAutoplay();
    }); */
  }
  
  constructor() { }
  }
