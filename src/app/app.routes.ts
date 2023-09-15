import { Routes } from '@angular/router';
import { BookComponent } from './component/book/book.component';
import { AddBookComponent } from './component/book/add-book/add-book.component';
import { LendComponent } from './component/book/lend/lend.component';
import { UpdateBookComponent } from './component/book/update-book/update-book.component';

export const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    pathMatch: 'prefix',
    title: 'Home Book',
  },
  { path: 'add-book', component: AddBookComponent, title: 'AddBook' },
  { path: 'lend', component: LendComponent, title: 'Lend' },
  {
    path: 'update-book/:id',
    component: UpdateBookComponent,
    title: 'UpdateBook',
  },
];
