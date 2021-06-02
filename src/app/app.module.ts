import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingProviders, routing } from './app.routing';

import { CookieService } from 'ngx-cookie-service';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ClipboardModule
  ],
  providers: [
    appRoutingProviders,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
