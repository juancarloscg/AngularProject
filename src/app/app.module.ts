import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from './app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TweetItemComponent } from './tweet-item/tweet-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TweetListComponent,
    TweetItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
