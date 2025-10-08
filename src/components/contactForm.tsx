// src/components/ContactForm.tsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface FormData {
  nombre: string;
  email: string;
  servicio: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  servicio?: string;
  mensaje?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    servicio: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar formulario
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

    if (!formData.servicio) {
      newErrors.servicio = 'Debes seleccionar un servicio';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, error } = await supabase
        .from('contactos')
        .insert([
          {
            nombre: formData.nombre,
            email: formData.email,
            servicio: formData.servicio,
            mensaje: formData.mensaje,
            fecha: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        servicio: '',
        mensaje: ''
      });

      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Nombre */}
      <div className="form-group mb-6">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          className={`w-full p-4 bg-white/10 border ${
            errors.nombre ? 'border-red-500' : 'border-white/20'
          } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
        />
        {errors.nombre && (
          <p className="mt-2 text-sm text-red-400">{errors.nombre}</p>
        )}
      </div>

      {/* Email */}
      <div className="form-group mb-6">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className={`w-full p-4 bg-white/10 border ${
            errors.email ? 'border-red-500' : 'border-white/20'
          } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Servicio */}
      <div className="form-group mb-6">
        <select
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          className={`w-full p-4 bg-white/10 border ${
            errors.servicio ? 'border-red-500' : 'border-white/20'
          } rounded-lg text-white focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300`}
        >
          <option value="" className="bg-gray-800">Selecciona un servicio</option>
          <option value="mantenimiento" className="bg-gray-800">Mantenimiento</option>
          <option value="hosting" className="bg-gray-800">Web Hosting & Desarrollo</option>
          <option value="almacenamiento" className="bg-gray-800">Almacenamiento en la Nube</option>
          <option value="moodle" className="bg-gray-800">Plataforma Moodle</option>
        </select>
        {errors.servicio && (
          <p className="mt-2 text-sm text-red-400">{errors.servicio}</p>
        )}
      </div>

      {/* Mensaje */}
      <div className="form-group mb-6">
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Describe tu proyecto o necesidad"
          rows="4"
          className={`w-full p-4 bg-white/10 border ${
            errors.mensaje ? 'border-red-500' : 'border-white/20'
          } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(255,94,0,0.4)] transition-all duration-300 resize-none`}
        />
        {errors.mensaje && (
          <p className="mt-2 text-sm text-red-400">{errors.mensaje}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-orange-800 to-orange-500 text-white p-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40 uppercase tracking-wide ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {/* Mensajes de estado */}
      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
          ¡Mensaje enviado exitosamente! Te contactaremos pronto.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">
          Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
        </div>
      )}
    </form>
  );
}