import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { LendComponent } from './lend/lend.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { Router, RouterModule } from '@angular/router';
import { BookService } from './service/book.service';
import { ToastsContainer } from '../toast/toast.component';
import { ToastService } from '../toast/service/toast.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    AddBookComponent,
    LendComponent,
    UpdateBookComponent,
    RouterModule,
    ToastsContainer,
    // Required for animations
  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [BookService],
})
export class BookComponent implements OnInit {
  columnsName = ['#', 'Author', 'country', 'Pages', 'Title', 'Year', ''];
  public books$: any;

  constructor(
    private book: BookService,
    private route: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getAllBooks();
    this.getAllCountries();
    this.getAllLanguage();
  }
  getAllBooks() {
    this.book.getBooks().subscribe((res) => {
      this.books$ = res;
      console.log(this.books$);
    });
  }
  onDelete(id: number) {
    this.book.deleteBook(id).subscribe((res) => {
      this.showToaster('Delete', 'Deleted Successful');
    });
  }
  onUpdate(id: number) {
    this.route.navigate([`/update-book/${id}`]);
  }

  showToaster(title: string, message: string) {
    this.toastService.show(title, message, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
    });
  }
  getAllCountries() {
    this.book.getCountry().subscribe((res) => {
      console.log("Country:"+res);
    });
  }
  getAllLanguage() {
    this.book.getLanguages().subscribe((res) => {
      const languages = res;
      const uniqueLanguageSet = new Set<string>();
  
      languages.forEach((language: any) => {
        for (const key in language.languages) {
          if (language.languages.hasOwnProperty(key)) {
            uniqueLanguageSet.add(language.languages[key]);
          }
        }
      });
  
      const uniqueLanguages = Array.from(uniqueLanguageSet);
      console.log("Language:"+uniqueLanguages);
    });
  }
}
