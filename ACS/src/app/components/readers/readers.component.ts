import { Component } from '@angular/core';
import { ReaderModel } from '../../models/reader-model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-readers',
  templateUrl: './readers.component.html',
  styleUrl: './readers.component.css'
})
export class ReadersComponent {

    readers: ReaderModel[] = [];
    editing: number | undefined = undefined;
    clonedReader: ReaderModel = {
      id: 0,
      name: '',
      room: '',
      direction: ''
    }
    directions = ["Be", "Ki"];

    constructor(private httpservice: HttpService) {}

    ngOnInit(): void {
      this.httpservice.getReaders().subscribe({
        next: (result: ReaderModel[]) => this.readers = result,
        error: (err: any) => console.log(err)
      })
    }

    save(): void {
      this.editing = undefined;
    }

    cancel(): void {
      this.editing = undefined;
    }

    editInit(model: ReaderModel): void {
      this.editing = model.id;
      this.clonedReader = {...model};
      //this.clonedReader = JSON.parse(JSON.stringify(model));
    }
  }
