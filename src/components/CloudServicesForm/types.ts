// src/components/CloudServicesForm/types.ts

export interface FormData {
  // Sección 1: Información General
  nombreCompleto: string;
  email: string;
  telefono: string;
  tipoCliente: string;
  serviciosNecesitados: string[];
  
  // Sección 2: Web Hosting & Desarrollo
  tipoProyectoWeb: string;
  tipoProyectoWebOtro: string;
  tieneSitioWeb: boolean;
  urlActual: string;
  necesidadSitioExistente: string;
  tieneDisenoMockups: boolean;
  compartirDisenoMockups: string;
  numeroPaginas: string;
  funcionalidadesRequeridas: string[];
  funcionalidadesOtra: string;
  necesitaCMS: boolean;
  preferenciaCMS: string;
  preferenciaCMSOtro: string;
  proveedorContenido: string;
  tieneLogoMarca: boolean;
  necesitaDisenoLogo: boolean;
  tieneDominio: boolean;
  dominio: string;
  necesitaAyudaDominio: boolean;
  necesitaSSL: string;
  traficoEstimado: string;
  necesitaEmailCorporativo: boolean;
  cantidadEmailsCorporativos: number;
  requiereMantenimiento: boolean;
  tipoMantenimiento: string;
  frecuenciaActualizaciones: string;
  integracionesExternas: string[];
  integracionesOtra: string;
  requisitosLegales: string[];
  requisitosLegalesOtro: string;
  referenciasWeb: string;
  
  // Sección 3: Almacenamiento en la Nube
  usoAlmacenamiento: string[];
  usoAlmacenamientoOtro: string;
  espacioAlmacenamiento: string;
  tieneDatosMigrar: boolean;
  cantidadDatosMigrar: string;
  tiposArchivos: string[];
  tiposArchivosOtro: string;
  cantidadUsuarios: string;
  necesitaNivelesPermisos: boolean;
  dispositivosAcceso: string[];
  necesitaSincronizacion: boolean;
  frecuenciaSincronizacion: string;
  nivelSeguridad: string;
  necesitaVersionesHistoricas: boolean;
  tiempoVersionesHistoricas: string;
  necesitaBackupBackup: boolean;
  necesitaProteccionRansomware: boolean;
  necesitaCompartirExternos: boolean;
  tipoCompartirExternos: string;
  necesitaColaboracionTiempoReal: boolean;
  preferenciaCapacidad: string;
  preferenciaFacturacion: string;
  funcionesEspeciales: string[];
  funcionesEspecialesOtra: string;
  tieneArchivosOtraPlataforma: boolean;
  plataformaActual: string;
  necesitaAyudaMigracion: boolean;
  necesitaCapacitacion: boolean;
  tipoCapacitacion: string;
  
  // Sección 4: Presupuesto y Timeline
  presupuestoAproximado: string;
  preferenciaPago: string;
  tiempoNecesario: string;
  tieneFechaLimite: boolean;
  fechaLimite: string;
  razonFechaLimite: string;
  
  // Sección 5: Información Adicional
  comoConocio: string;
  comoConocioOtro: string;
  comentariosAdicionales: string;
  preferenciaContacto: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SectionProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}
