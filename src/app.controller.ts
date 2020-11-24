import { Body, Controller, Get, Post, Request, Render, Param, Redirect, UseGuards, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';
import { DatosPersonalesService } from './datos-personales/datos-personales.service';
import { DoctoresService } from './doctores/doctores.service';
import { ObservacionesVisitaService } from './observaciones-visita/observaciones-visita.service';
import { PacientesContagiadosService } from './pacientes-contagiados/pacientes-contagiados.service';
import { ParientesPacientesService } from './parientes-pacientes/parientes-pacientes.service';
import { RecetaMedicaService } from './receta-medica/receta-medica.service';
import { VisitasMedicasService } from './visitas-medicas/visitas-medicas.service';

import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller('/')
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly obsServicio: ObservacionesVisitaService,
    private readonly recetaServicio: RecetaMedicaService,
    private readonly datosServicio: DatosPersonalesService,
    private readonly visitaServicio: VisitasMedicasService,
    private readonly doctorServicio: DoctoresService,
    private readonly pacienteServicio: PacientesContagiadosService,
    private readonly parientesSevicio: ParientesPacientesService
    ) {}
    
    @Get('/')
    @Render('index')
    index(@Request() req): { message: string } {
      return { message: req.flash('loginError') };
    }
    // :::::::::::::::::::::::::::::::::
    //    PACIENTE: VER VISITAS
    // :::::::::::::::::::::::::::::::::
    @UseGuards(AuthenticatedGuard)
    @Post('doctor/paciente')
    @Render('doctores/verVisitas')
    async getPacientes(@Request() req, @Body() parameters){
        var arrayCompuesto = [];
        var arrayObservaciones = [];
        var datosUser = await this.datosServicio.findDatosById(req.user.id_persona);
        const visitaServicio = await this.visitaServicio.findVisitaPaciente(parameters.paciente_id);
        for(var i = 0; i < visitaServicio.length; i++){
            var observacionEncontrada = await this.obsServicio.findObservacion(visitaServicio[i].id_visita);
            var datosPaciente = await this.datosServicio.findDatosById(visitaServicio[i].id_paciente);
            var datosDoctor = await this.datosServicio.findDatosById(visitaServicio[i].id_doctor);
            var arraySimple = [];
            arraySimple["temperatura_paciente"] = visitaServicio[i].temperatura_paciente;
            arraySimple["presion_paciente"] = visitaServicio[i].presion_paciente;
            arraySimple["id_paciente"] = visitaServicio[i].id_paciente;
            arraySimple["id_doctor"] = visitaServicio[i].id_doctor;
            arraySimple["fecha_visita"] = visitaServicio[i].fecha_visita;
            arraySimple["observacion"] = observacionEncontrada[0].observaciones_visita;
            arraySimple["nombre_paciente"] = datosPaciente[0].pnombre_persona + " " + datosPaciente[0].snombre_persona + " "  + datosPaciente[0].papellido_persona + " " + datosPaciente[0].sapellido_persona;
            arraySimple["nombre_doctor"] = datosDoctor[0].pnombre_persona + " " + datosDoctor[0].snombre_persona + " "  + datosDoctor[0].papellido_persona + " " + datosDoctor[0].sapellido_persona;
        }
        arrayCompuesto["visitas"] = arrayObservaciones;
        arrayCompuesto["usuario"] = datosUser[0];
        console.log(arrayCompuesto);
        return { message: arrayCompuesto };
    }
    // :::::::::::::::::::::::::::::::::
    //          VER VISITAS
    // :::::::::::::::::::::::::::::::::
    @UseGuards(AuthenticatedGuard)
    @Get('doctor/visitas')
    @Render('doctores/verVisitas')
    async getUser(@Request() req){
        var datosUser = await this.datosServicio.findDatosById(req.user.id_persona);
        const visitaServicio = await this.visitaServicio.findVisitaDoctor(1005890893);
        console.log(visitaServicio);
        var arrayObservaciones = [];
        var arrayCompuesto = [];
        for(var i = 0; i < visitaServicio.length; i++){
            var observacionEncontrada = await this.obsServicio.findObservacion(visitaServicio[i].id_visita);
            var datosPaciente = await this.datosServicio.findDatosById(visitaServicio[i].id_paciente);
            var datosDoctor = await this.datosServicio.findDatosById(visitaServicio[i].id_doctor);
            var arraySimple = [];
            
            arraySimple["temperatura_paciente"] = visitaServicio[i].temperatura_paciente;
            arraySimple["presion_paciente"] = visitaServicio[i].presion_paciente;
            arraySimple["id_paciente"] = visitaServicio[i].id_paciente;
            arraySimple["id_doctor"] = visitaServicio[i].id_doctor;
            arraySimple["fecha_visita"] = visitaServicio[i].fecha_visita;
            arraySimple["observacion"] = observacionEncontrada[0].observaciones_visita;
            arraySimple["nombre_paciente"] = datosPaciente[0].pnombre_persona + " " + datosPaciente[0].snombre_persona + " "  + datosPaciente[0].papellido_persona + " " + datosPaciente[0].sapellido_persona;
            arraySimple["nombre_doctor"] = datosDoctor[0].pnombre_persona + " " + datosDoctor[0].snombre_persona + " "  + datosDoctor[0].papellido_persona + " " + datosDoctor[0].sapellido_persona;;
            arrayObservaciones.push(arraySimple);
        }
        arrayCompuesto["usuario"] = datosUser[0];
        arrayCompuesto["visitas"] = arrayObservaciones;
        console.log(arrayObservaciones);
        return { message: arrayCompuesto};
    }
    // :::::::::::::::::::::::::::::::::
    //          AÑADIR DOCTOR
    // :::::::::::::::::::::::::::::::::
    @UseGuards(AuthenticatedGuard)
    @Get('funcionario/doctor')
    @Render('funcionarios/addDoctor')
    async addDoctor(@Request() req){
      var datosUser = await this.datosServicio.findDatosById(req.user.id_persona);
      return { user: datosUser[0] }
    }
    // :::::::::::::::::::::::::::::::::
    //          AÑADIR PACIENTES
    // :::::::::::::::::::::::::::::::::
    @UseGuards(AuthenticatedGuard)
    @Get('funcionario/paciente')
    @Render('funcionarios/addPacientes')
    async addPaciente(@Request() req){
      var datosUser = await this.datosServicio.findDatosById(req.user.id_persona);
      return { user: datosUser[0] }
    }

    // :::::::::::::::::::::::::::::::::
    //          VER PACIENTES
    // :::::::::::::::::::::::::::::::::
    @UseGuards(AuthenticatedGuard)
    @Get('doctor/paciente')
    @Render('doctores/verPacientes')
    async verPacientes(@Request() req){
      var datosUser = await this.datosServicio.findDatosById(1005890893);
      var pacienteArray = await this.pacienteServicio.findPaciente(req.user.id_persona);
      
      var arrayPaciente = [];
      for(var i = 0; i < pacienteArray.length; i++){
        var arraySimple = [];
        var pacienteDatos = await this.datosServicio.findDatosById(pacienteArray[i].id_paciente);
        var doctorDatos = await this.datosServicio.findDatosById(pacienteArray[i].id_paciente);
        var parientes = await this.parientesSevicio.findPariente(pacienteArray[i].id_paciente);
        arraySimple["id_paciente"] = pacienteArray[i].id_persona;
        arraySimple["tipo_id"] = pacienteArray[i].tipo_id;
        arraySimple["nombre_paciente"] = pacienteDatos[0].pnombre_persona + " " + pacienteDatos[0].snombre_persona + " "  + pacienteDatos[0].papellido_persona + " " + pacienteDatos[0].sapellido_persona;
        arraySimple["nombre_doctor"] = doctorDatos[0].pnombre_persona + " " + doctorDatos[0].snombre_persona + " "  + doctorDatos[0].papellido_persona + " " + doctorDatos[0].sapellido_persona;
        arraySimple["telefonos_emergencias"] = pacienteArray[i].telefono_emergencias1 + ", " + pacienteArray[i].telefono_emergencias2;
        arraySimple["direccion_residencia"] = pacienteDatos[0].direccion_residencia;
        arraySimple["n_parentesco"] = parientes[0].nombre_completo + " " + parientes[0].parentesco;
        arrayPaciente.push(arraySimple);
      }
      console.log(arrayPaciente);
      return { message: arrayPaciente }
    }

    // :::::::::::::::::::::::::::::::::
    //          LOGIN
    // :::::::::::::::::::::::::::::::::
    @UseGuards(LoginGuard)
    @Post('login')
    log(@Request() req, @Res() res: Response){
      console.log(req.user.id_persona);
      res.redirect('doctor/visitas');
    }











    // ---------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
        // ---------------------------------
    //     SERVICE: CREAR DOCTOR
    // --------------------------------
    @UseGuards(AuthenticatedGuard)
    @Post('funcionario/createdoctor')
    @Redirect('doctor')
    async createDoctor(@Body()  parameters){
      var newDoctor = await this.doctorServicio.createNewDoctor(parameters);
      var newDatos = await this.datosServicio.createDatos(parameters);
    }
    // ---------------------------------
    //   SERVICE: CREAR PACIENTE
    // ---------------------------------
    @UseGuards(AuthenticatedGuard)
    @Post('funcionario/createpaciente')
    @Redirect('paciente')
    async createPaciente(@Body() parameters){
      var newPaciente = await this.pacienteServicio.createNewPaciente(parameters);
      var newDatos = await this.datosServicio.createDatos(parameters);
      var newParientes = await this.parientesSevicio.createNewPariente(parameters);
    }

}