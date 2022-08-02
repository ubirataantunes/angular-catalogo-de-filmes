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
        .subscribe(data => {
          this.dataSource = data;
        })
    }

  ngOnInit(): void {
  }

  openDialog(element: Filme | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        Nome: null,
        Ano: '',
        Diretor: null,
        Elenco: ''
      } : {
        Nome: element.Nome,
        Ano: element.Ano,
        Diretor: element.Diretor,
        Elenco: element.Elenco
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.Nome).includes(result.Nome)){
          this.dataSource[result.Nome -1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }        
      }
    });    
  }

  deleteElement(Nome: string): void {
    this.dataSource = this.dataSource.filter(p => p.Nome !== Nome)
  }

  editElement(element: Filme) : void {
    this.openDialog(element)
  }
}
