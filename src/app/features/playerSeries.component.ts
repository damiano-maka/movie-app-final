import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="video-player">
      <iframe
        [src]="embedUrl"
        referrerpolicy="no-referrer"
        scrolling="no"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  `,
  styles: [
    `
      iframe {
        width: 100%;
        height: 94vh;
      }
    `,
  ],
})
export default class PlayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  videoId: string | null;
  id: string | null;
  embedUrl: SafeResourceUrl | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.videoId = null;
    this.id = null;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.videoId = params.get('id');
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://movie.smashystream.xyz/17379b54-0e4a-45ae-a319-54b42fd08a19#/media/tmdb-show-${this.videoId}`
      );
    });
  }

  toggleFullScreen() {
    const videoElem = this.videoPlayer.nativeElement;

    if (videoElem.requestFullscreen) {
      videoElem.requestFullscreen();
    } else if (videoElem.mozRequestFullScreen) {
      videoElem.mozRequestFullScreen();
    } else if (videoElem.webkitRequestFullscreen) {
      videoElem.webkitRequestFullscreen();
    } else if (videoElem.msRequestFullscreen) {
      videoElem.msRequestFullscreen();
    }
  }
}
