import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AllTweetsResponse } from '../models/interfaces/tweet.response';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.css']
})
export class TweetItemComponent implements OnInit {
  isFavorite = false;
  @Input() tweet: AllTweetsResponse | any;
  @Output() tweetLiked = new EventEmitter<AllTweetsResponse>();

  constructor() { }

  ngOnInit(): void {
  }

  setFavourite(tweet: AllTweetsResponse | undefined){
    this.tweetLiked.emit(tweet);
  }

}
