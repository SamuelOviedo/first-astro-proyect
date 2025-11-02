// src/components/MaintenanceForm.tsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface FormData {
  // Datos del cliente
  nombre: string;
  email: string;
  codigopais: string;
  telefono: string;
  ubicacion: string;
  
  // Información del equipo
  tipodispositivo: string;
  otrodispositivo: string;
  marca: string;
  modelo: string;
  sistemaoperativo: string;
  otroso: string;
  
  // Descripción del problema
  problemaprincipal: string;
  otroproblema: string;
  descripciondetallada: string;
  cuandocomenzo: string;
  intentosolucion: string;
  
  // Preferencias de servicio
  urgencia: string;
  modalidad: string;
  horariocontacto: string;
  comentariosadicionales: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function MaintenanceForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    codigopais: '+504',
    telefono: '',
    ubicacion: '',
    tipodispositivo: '',
    otrodispositivo: '',
    marca: '',
    modelo: '',
    sistemaoperativo: '',
    otroso: '',
    problemaprincipal: '',
    otroproblema: '',
    descripciondetallada: '',
    cuandocomenzo: '',
    intentosolucion: '',
    urgencia: '',
    modalidad: '',
    horariocontacto: '',
    comentariosadicionales: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [errorImagen, setErrorImagen] = useState<File | null>(null);

  // Códigos de país más comunes
  const codigosPais = [
    { codigo: '+1', pais: 'Estados Unidos/Canadá', bandera: '🇺🇸' },
    { codigo: '+52', pais: 'México', bandera: '🇲🇽' },
    { codigo: '+502', pais: 'Guatemala', bandera: '🇬🇹' },
    { codigo: '+503', pais: 'El Salvador', bandera: '🇸🇻' },
    { codigo: '+504', pais: 'Honduras', bandera: '🇭🇳' },
    { codigo: '+505', pais: 'Nicaragua', bandera: '🇳🇮' },
    { codigo: '+506', pais: 'Costa Rica', bandera: '🇨🇷' },
    { codigo: '+507', pais: 'Panamá', bandera: '🇵🇦' },
    { codigo: '+51', pais: 'Perú', bandera: '🇵🇪' },
    { codigo: '+56', pais: 'Chile', bandera: '🇨🇱' },
    { codigo: '+57', pais: 'Colombia', bandera: '🇨🇴' },
    { codigo: '+58', pais: 'Venezuela', bandera: '🇻🇪' },
    { codigo: '+591', pais: 'Bolivia', bandera: '🇧🇴' },
    { codigo: '+593', pais: 'Ecuador', bandera: '🇪🇨' },
    { codigo: '+34', pais: 'España', bandera: '🇪🇸' },
    { codigo: '+54', pais: 'Argentina', bandera: '🇦🇷' },
  ];

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const regex = /^[0-9+\-\s()]{8,}$/;
    return regex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!validatePhone(formData.telefono)) {
      newErrors.telefono = 'Ingresa un número de teléfono válido';
    }

    if (!formData.tipodispositivo) {
      newErrors.tipodispositivo = 'Debes seleccionar un tipo de dispositivo';
    }

    if (formData.tipodispositivo === 'otro' && !formData.otrodispositivo.trim()) {
      newErrors.otrodispositivo = 'Especifica el tipo de dispositivo';
    }

    if (!formData.problemaprincipal) {
      newErrors.problemaprincipal = 'Debes seleccionar el problema principal';
    }

    if (formData.problemaprincipal === 'otro' && !formData.otroproblema.trim()) {
      newErrors.otroproblema = 'Especifica el problema';
    }

    if (!formData.descripciondetallada.trim()) {
      newErrors.descripciondetallada = 'La descripción detallada es requerida';
    } else if (formData.descripciondetallada.trim().length < 20) {
      newErrors.descripciondetallada = 'La descripción debe tener al menos 20 caracteres';
    }

    if (!formData.cuandocomenzo) {
      newErrors.cuandocomenzo = 'Debes indicar cuándo comenzó el problema';
    }

    if (!formData.urgencia) {
      newErrors.urgencia = 'Debes seleccionar la urgencia del servicio';
    }

    if (!formData.modalidad) {
      newErrors.modalidad = 'Debes seleccionar la modalidad preferida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImagenesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 3) {
      alert('Solo puedes subir hasta 3 imágenes');
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`El archivo ${file.name} excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });

    setImagenes(validFiles);
  };

  const handleErrorImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file && file.size > 5 * 1024 * 1024) {
      alert('El archivo excede el tamaño máximo de 5MB');
      return;
    }

    setErrorImagen(file || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('📤 Enviando datos al servidor...');
      console.log('Datos del formulario:', formData);
      
      // Obtener el usuario autenticado
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No hay sesión activa. Por favor inicia sesión.');
      }
      
      const dataToInsert = {
        ...formData,
        user_id: session.user.id,
        user_email: session.user.email,
        tieneimagenes: imagenes.length > 0,
        tieneerrorimagenes: errorImagen !== null
      };
      
      console.log('Datos a insertar:', dataToInsert);

      const { data, error } = await supabase
        .from('mantenimiento')
        .insert([dataToInsert])
        .select();

      if (error) {
        console.error('❌ Error de Supabase detectado:');
        console.error('Código de error:', error.code);
        console.error('Mensaje:', error.message);
        console.error('Detalles:', error.details);
        console.error('Hint:', error.hint);
        console.error('Objeto completo del error:', JSON.stringify(error, null, 2));
        throw error;
      }

      console.log('✅ Datos insertados exitosamente:', data);
      setSubmitStatus('success');
      
      setFormData({
        nombre: '',
        email: '',
        codigopais: '+504',
        telefono: '',
        ubicacion: '',
        tipodispositivo: '',
        otrodispositivo: '',
        marca: '',
        modelo: '',
        sistemaoperativo: '',
        otroso: '',
        problemaprincipal: '',
        otroproblema: '',
        descripciondetallada: '',
        cuandocomenzo: '',
        intentosolucion: '',
        urgencia: '',
        modalidad: '',
        horariocontacto: '',
        comentariosadicionales: ''
      });
      setImagenes([]);
      setErrorImagen(null);

      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error: any) {
      console.error('❌ Error capturado en catch:');
      console.error('Tipo de error:', typeof error);
      console.error('Error completo:', error);
      
      if (error.code) {
        console.error('Código de error Supabase:', error.code);
      }
      if (error.message) {
        console.error('Mensaje de error:', error.message);
      }
      if (error.details) {
        console.error('Detalles del error:', error.details);
      }
      if (error.hint) {
        console.error('Sugerencia:', error.hint);
      }
      
      setSubmitStatus('error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si el envío fue exitoso, mostrar mensaje de éxito en lugar del formulario
  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <i className="fas fa-check-circle text-6xl text-green-500"></i>
          </div>
          <h2 className="text-3xl font-bold text-green-500 mb-4">
            ¡Solicitud Enviada Exitosamente!
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Tu solicitud de mantenimiento ha sido recibida correctamente.
          </p>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 max-w-md mx-auto border border-white/10">
            <p className="text-gray-400 mb-4">
              <i className="fas fa-info-circle text-orange-500 mr-2"></i>
              Nos contactaremos contigo lo más pronto posible para coordinar el servicio.
            </p>
            <p className="text-sm text-gray-500">
              Recibirás una confirmación en tu correo electrónico.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setSubmitStatus(null)}
            className="bg-gradient-to-r from-orange-800 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
          >
            <i className="fas fa-plus mr-2"></i>
            Enviar otra solicitud
          </button>
          <a
            href="/"
            className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/20 border border-white/20"
          >
            <i className="fas fa-home mr-2"></i>
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">
          Hubo un error al enviar la solicitud. Por favor intenta de nuevo.
        </div>
      )}

      {/* Datos del Cliente */}
      <div className="form-section">
        <h3 className="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
          <i className="fas fa-user"></i>
          Datos del Cliente
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full p-4 bg-white/10 border ${
                errors.nombre ? 'border-red-500' : 'border-white/20'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
              placeholder="Juan Pérez"
            />
            {errors.nombre && (
              <p className="mt-2 text-sm text-red-400">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-4 bg-white/10 border ${
                errors.email ? 'border-red-500' : 'border-white/20'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
              placeholder="juan@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Teléfono de contacto <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="codigopais"
                value={formData.codigopais}
                onChange={handleChange}
                className="w-32 p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300"
              >
                {codigosPais.map((pais) => (
                  <option key={pais.codigo} value={pais.codigo} className="bg-gray-800">
                    {pais.bandera} {pais.codigo}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`flex-1 p-4 bg-white/10 border ${
                  errors.telefono ? 'border-red-500' : 'border-white/20'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
                placeholder=""
              />
            </div>
            {errors.telefono && (
              <p className="mt-2 text-sm text-red-400">{errors.telefono}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Ubicación
            </label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300"
              placeholder="Siguatepeque, Comayagua"
            />
          </div>
        </div>
      </div>

      {/* Información del Equipo */}
      <div className="form-section">
        <h3 className="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
          <i className="fas fa-laptop"></i>
          Información del Equipo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tipo de dispositivo <span className="text-red-500">*</span>
            </label>
            <select
              name="tipodispositivo"
              value={formData.tipodispositivo}
              onChange={handleChange}
              className={`w-full p-4 bg-white/10 border ${
                errors.tipodispositivo ? 'border-red-500' : 'border-white/20'
              } rounded-lg text-white focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
            >
              <option value="" className="bg-gray-800">Selecciona un tipo</option>
              <option value="escritorio" className="bg-gray-800">Computadora de escritorio</option>
              <option value="laptop" className="bg-gray-800">Laptop/Portátil</option>
              <option value="impresora" className="bg-gray-800">Impresora</option>
              <option value="servidor" className="bg-gray-800">Servidor</option>
              <option value="otro" className="bg-gray-800">Otro (especificar)</option>
            </select>
            {errors.tipodispositivo && (
              <p className="mt-2 text-sm text-red-400">{errors.tipodispositivo}</p>
            )}
          </div>

          {formData.tipodispositivo === 'otro' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Especificar dispositivo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otrodispositivo"
                value={formData.otrodispositivo}
                onChange={handleChange}
                className={`w-full p-4 bg-white/10 border ${
                  errors.otrodispositivo ? 'border-red-500' : 'border-white/20'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
                placeholder="Especifica el tipo de dispositivo"
              />
              {errors.otrodispositivo && (
                <p className="mt-2 text-sm text-red-400">{errors.otrodispositivo}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Marca del equipo
            </label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300"
              placeholder="HP, Dell, Lenovo, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Modelo
            </label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300"
              placeholder="Modelo del equipo"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Sistema operativo
            </label>
            <select
              name="sistemaoperativo"
              value={formData.sistemaoperativo}
              onChange={handleChange}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300"
            >
              <option value="" className="bg-gray-800">Selecciona el sistema operativo</option>
              <option value="windows11" className="bg-gray-800">Windows 11</option>
              <option value="windows10" className="bg-gray-800">Windows 10</option>
              <option value="windows8" className="bg-gray-800">Windows 8/8.1</option>
              <option value="windows7" className="bg-gray-800">Windows 7</option>
              <option value="linux" className="bg-gray-800">Linux (especificar distribución)</option>
              <option value="macos" className="bg-gray-800">macOS</option>
              <option value="otro" className="bg-gray-800">Otro</option>
            </select>
          </div>

          {(formData.sistemaoperativo === 'linux' || formData.sistemaoperativo === 'otro') && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Especificar sistema operativo
              </label>
              <input
                type="text"
                name="otroso"
                value={formData.otroso}
                onChange={handleChange}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300"
                placeholder={formData.sistemaoperativo === 'linux' ? 'Ubuntu, Fedora, Debian, etc.' : 'Especifica el sistema operativo'}
              />
            </div>
          )}
        </div>
      </div>

      {/* Descripción del Problema */}
      <div className="form-section">
        <h3 className="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle"></i>
          Descripción del Problema
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              ¿Cuál es el problema principal? <span className="text-red-500">*</span>
            </label>
            <select
              name="problemaprincipal"
              value={formData.problemaprincipal}
              onChange={handleChange}
              className={`w-full p-4 bg-white/10 border ${
                errors.problemaprincipal ? 'border-red-500' : 'border-white/20'
              } rounded-lg text-white focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
            >
              <option value="" className="bg-gray-800">Selecciona el problema</option>
              <option value="no_enciende" className="bg-gray-800">El equipo no enciende</option>
              <option value="lentitud" className="bg-gray-800">Lentitud extrema</option>
              <option value="virus" className="bg-gray-800">Virus o malware</option>
              <option value="software" className="bg-gray-800">Problemas con software específico</option>
              <option value="error_so" className="bg-gray-800">Error de sistema operativo</option>
              <option value="hardware" className="bg-gray-800">Problema de hardware (pantalla, teclado, etc.)</option>
              <option value="impresora" className="bg-gray-800">Configuración de impresora</option>
              <option value="instalacion" className="bg-gray-800">Instalación de Office/Windows</option>
              <option value="otro" className="bg-gray-800">Otro</option>
            </select>
            {errors.problemaprincipal && (
              <p className="mt-2 text-sm text-red-400">{errors.problemaprincipal}</p>
            )}
          </div>

          {formData.problemaprincipal === 'otro' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Especificar problema <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otroproblema"
                value={formData.otroproblema}
                onChange={handleChange}
                className={`w-full p-4 bg-white/10 border ${
                  errors.otroproblema ? 'border-red-500' : 'border-white/20'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
                placeholder="Describe brevemente el problema"
              />
              {errors.otroproblema && (
                <p className="mt-2 text-sm text-red-400">{errors.otroproblema}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Descripción detallada del problema <span className="text-red-500">*</span>
            </label>
            <textarea
              name="descripciondetallada"
              value={formData.descripciondetallada}
              onChange={handleChange}
              rows={5}
              className={`w-full p-4 bg-white/10 border ${
                errors.descripciondetallada ? 'border-red-500' : 'border-white/20'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300 resize-none`}
              placeholder="Por favor, describe el problema con el mayor detalle posible..."
            />
            {errors.descripciondetallada && (
              <p className="mt-2 text-sm text-red-400">{errors.descripciondetallada}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              ¿Cuándo comenzó el problema? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {['hoy', 'esta_semana', 'mas_semana', 'no_seguro'].map((value) => (
                <label key={value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="cuandocomenzo"
                    value={value}
                    checked={formData.cuandocomenzo === value}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500 focus:ring-2"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {value === 'hoy' && 'Hoy'}
                    {value === 'esta_semana' && 'Esta semana'}
                    {value === 'mas_semana' && 'Hace más de una semana'}
                    {value === 'no_seguro' && 'No estoy seguro'}
                  </span>
                </label>
              ))}
            </div>
            {errors.cuandocomenzo && (
              <p className="mt-2 text-sm text-red-400">{errors.cuandocomenzo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              ¿Realizaste algún intento de solución?
            </label>
            <textarea
              name="intentosolucion"
              value={formData.intentosolucion}
              onChange={handleChange}
              rows={3}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300 resize-none"
              placeholder="Describe qué has intentado hacer para resolver el problema..."
            />
          </div>
        </div>
      </div>

      {/* Archivos Adjuntos */}
      <div className="form-section">
        <h3 className="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
          <i className="fas fa-paperclip"></i>
          Archivos Adjuntos
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Imagen del problema
            </label>
            <p className="text-sm text-gray-400 mb-3">
              Sube hasta 3 fotos del dispositivo o pantalla del error (opcional)
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagenesChange}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
            />
            {imagenes.length > 0 && (
              <p className="mt-2 text-sm text-green-400">
                {imagenes.length} archivo(s) seleccionado(s)
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Mensajes de error
            </label>
            <p className="text-sm text-gray-400 mb-3">
              Si aparece algún mensaje de error, adjunta captura de pantalla
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleErrorImagenChange}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
            />
            {errorImagen && (
              <p className="mt-2 text-sm text-green-400">
                {errorImagen.name} seleccionado
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Preferencias de Servicio */}
      <div className="form-section">
        <h3 className="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
          <i className="fas fa-cog"></i>
          Preferencias de Servicio
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">
              Urgencia del servicio <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'urgente', label: 'Urgente (24 horas)' },
                { value: 'normal', label: 'Normal (2-3 días)' },
                { value: 'puede_esperar', label: 'Puede esperar (una semana)' }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="urgencia"
                    value={option.value}
                    checked={formData.urgencia === option.value}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500 focus:ring-2"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.urgencia && (
              <p className="mt-2 text-sm text-red-400">{errors.urgencia}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Modalidad preferida <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'domicilio', label: 'A domicilio' },
                { value: 'taller', label: 'En taller' },
                { value: 'remoto', label: 'Remoto (si es posible)' }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="modalidad"
                    value={option.value}
                    checked={formData.modalidad === option.value}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500 focus:ring-2"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.modalidad && (
              <p className="mt-2 text-sm text-red-400">{errors.modalidad}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Horario preferido de contacto
            </label>
            <select
              name="horariocontacto"
              value={formData.horariocontacto}
              onChange={handleChange}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300"
            >
              <option value="" className="bg-gray-800">Selecciona un horario</option>
              <option value="manana" className="bg-gray-800">Mañana (8:00 AM - 12:00 PM)</option>
              <option value="tarde" className="bg-gray-800">Tarde (12:00 PM - 5:00 PM)</option>
              <option value="noche" className="bg-gray-800">Noche (5:00 PM - 8:00 PM)</option>
              <option value="sin_preferencia" className="bg-gray-800">Sin preferencia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Comentarios adicionales
            </label>
            <textarea
              name="comentariosadicionales"
              value={formData.comentariosadicionales}
              onChange={handleChange}
              rows={4}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300 resize-none"
              placeholder="Cualquier información adicional que consideres relevante..."
            />
          </div>
        </div>
      </div>

      {/* Botón de envío */}
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-gradient-to-r from-orange-800 to-orange-500 text-white px-12 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40 uppercase tracking-wide ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <i className="fas fa-spinner fa-spin"></i>
              Enviando solicitud...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <i className="fas fa-paper-plane"></i>
              Enviar Solicitud
            </span>
          )}
        </button>
      </div>
    </form>
  );
}