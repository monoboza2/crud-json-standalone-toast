import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule,ROUTES } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastsContainer } from "./component/toast/toast.component";;

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, RouterModule, HttpClientModule, ToastsContainer]
})
export class AppComponent {
  title = 'crud-standalone';
}
