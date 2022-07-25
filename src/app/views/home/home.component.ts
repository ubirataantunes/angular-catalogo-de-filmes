import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Filme } from 'src/app/Models/Filmes';
import { FilmesService } from 'src/app/Services/Filmes.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FilmesService]
})
export class HomeComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>

  displayedColumns: string[] = ['nome', 'ano', 'diretor', 'elenco', 'actions'];
  dataSource!: Filme[];


  constructor(
    public dialog: MatDialog,
    public FilmesService: FilmesService
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
        position: null,
        name: '',
        weight: null,
        symbol: ''
      } : {
        position: element.nome,
        name: element.ano,
        weight: element.diretor,
        symbol: element.elenco
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.nome).includes(result.nome)){
          this.dataSource[result.nome -1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }        
      }
    });    
  }

  deleteElement(nome: string): void {
    this.dataSource = this.dataSource.filter(p => p.nome !== nome)
  }

  editElement(element: Filme) : void {
    this.openDialog(element)
  }
}
