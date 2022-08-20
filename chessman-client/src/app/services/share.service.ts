import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private snackBar: MatSnackBar) { }
  openSnackbar(content: string, button: string) {
    const snack = this.snackBar.open(content, button, {
      duration: 3000
    });
  }
}
