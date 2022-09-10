import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from 'src/reducers/auth.reducer';
import { AuthEffects } from 'src/effects/auth.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogNewGameModule } from './components/dialog/dialog-create-new-game/dialog-create-new-game.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.endpoint, options: {} };



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    StoreModule.forRoot({
      auth: authReducer
    }, {}),
    EffectsModule.forRoot([
      AuthEffects
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    DialogNewGameModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
