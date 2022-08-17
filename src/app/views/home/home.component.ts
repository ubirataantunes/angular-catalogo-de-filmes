import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Filme } from 'src/app/Models/Filmes';
import { Filmes } from 'src/app/Services/Filmes.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Filmes]
})
export class HomeComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>

  displayedColumns: string[] = ['Nome', 'Ano', 'Diretor', 'Elenco', 'actions'];
  dataSource!: Filme[];


  constructor(
    public dialog: MatDialog,
    public FilmesService: Filmes
    ) {
      this.FilmesService.getElements()
        .subscribe((data: Filme[]) => {
          this.dataSource = data;
        })
    }

  ngOnInit(): void {
  }

  fetchEditElement(element: Filme): void {
    let url: string = this.FilmesService.elementApiUrl;
    fetch(`${url}/${element.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(element)
    })
  };

  openDialog(element: Filme | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        nome: '',
        ano: '',
        diretor: '',
        elenco: ''
      } : {
        id: element.id,
        nome: element.nome,
        ano: element.ano,
        diretor: element.diretor,
        elenco: element.elenco
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)){
          var indexOfChange = this.dataSource.map(p => p.id == result.id).indexOf(true)
          this.dataSource[indexOfChange] = result;
          this.fetchEditElement(result)
          this.table.renderRows();
        } else {
          this.FilmesService.createElements(result)
          .subscribe(() => {
            this.dataSource.push(result);
            this.table.renderRows();
          })         
        }        
      }
    });    
  }
  // delete deito com fetch
  deleteElement(id: number) : void {
    this.dataSource = this.dataSource.filter(p => p.id !== id);
    let url: string = this.FilmesService.elementApiUrl;
    window.fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
// tentando fazer o PUT com fetch
  editElement(element: Filme) : void {
    this.openDialog(element)
  }
}

/*
let url: string = this.FilmesService.elementApiUrl;
    fetch(`${url}/${element.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(element)
    })
    */