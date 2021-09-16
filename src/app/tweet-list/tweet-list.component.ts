import { Component, OnInit } from '@angular/core';
import { AllTweetsResponse } from '../models/interfaces/tweet.response';
import { AuthService } from '../services/auth.service';
import { TweetDto } from '../models/dto/tweet.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  Tweet : AllTweetsResponse[] | undefined;
  likedTweet : AllTweetsResponse | undefined;
  tweetDto = new TweetDto()
  tweetForm = new FormGroup({
    mensaje : new FormControl('',[Validators.required, Validators.maxLength(200)])
  })
  
  constructor(private service: AuthService) { }

  ngOnInit(): void {

    this.service.getAllTweets().subscribe(result =>{
      this.Tweet = result;
    }
    )}

  checkControl(controlName:string){
      return this.tweetForm.controls[controlName].errors && this.tweetForm.controls[controlName].dirty
    }
    

  createTweet(): void{
    
    this.tweetDto.mensaje = this.tweetForm.controls['mensaje'].value;
    console.log(this.tweetDto.mensaje);

    if(this.tweetForm.valid){

    this.service.publishTweet(this.tweetDto).subscribe(
      data =>{
        console.log(data);
        window.location.reload();
      },
      error => {
        alert('Se ha producido algún error')
      }
    );
  }
  else{
    alert('El texto excede la longitud máxima');
    console.log('No Válido, excede longitud máxima');
      }
}

  favouriteTweet(tweet: AllTweetsResponse |undefined){
    if (tweet){
      this.service.favouriteTweet(tweet.id).subscribe(
        data => {
          this.likedTweet = data;
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      )
    }else{
      alert("Error al enviar Like")
    }
  }

 

}
