import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Empleado } from './Interfaces/empleado';
import { EmpleadoService } from './Services/empleado.service';
import { MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponent } from './Modals/dialog-add-edit/dialog-add-edit.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from './Modals/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['NombreCompleto', 'Departamento', 'Sueldo', 'FechaContrato', 'Acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  constructor(
    private _empleadoServicio:EmpleadoService,
    public dialog:MatDialog,
    private _snackbar: MatSnackBar,){
  }

  ngOnInit(): void {
    this.MostrarEmpleados();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  MostrarEmpleados(){
    this._empleadoServicio.getlist().subscribe({
      next:(dataRespuesta) => {
        console.log(dataRespuesta)
        this.dataSource.data = dataRespuesta;
      },error:(e) =>{}
    })
  }
  dialogoNuevoEmpleado() {
    this.dialog.open(DialogAddEditComponent,{disableClose:true,width:"350px"})
    .afterClosed().subscribe(resultado => {
      if(resultado ==="Creado"){this.MostrarEmpleados();}
    })
    }
  
  dialogoEditarEmpleado(dataEmpleado: Empleado){
    this.dialog.open(DialogAddEditComponent,{disableClose:true,width:"350px",
    data: dataEmpleado})
    .afterClosed().subscribe(resultado => {
      if(resultado ==="Actualizado"){this.MostrarEmpleados();}
    })
  }
  MostrarAlerta(msg: string, accion: string) {
    this._snackbar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }

  dialogoEliminarEmpleado(dataEmpleado: Empleado){
    this.dialog.open(DialogoDeleteComponent,{disableClose:true,
    data: dataEmpleado})
    .afterClosed().subscribe(resultado => {
      if(resultado ==="eliminar"){
        this._empleadoServicio.delete(dataEmpleado.idEmpleado).subscribe({
          next:(data) => {
            this.MostrarAlerta("El empleado fue eliminado","listo");
            this.MostrarEmpleados();
          },error:(e) => {console.log(e)}
        })
      }
    })
  }

}
