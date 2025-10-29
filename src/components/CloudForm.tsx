import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Section1 from './CloudForm/Section1';
import Section2 from './CloudForm/Section2';
import Section3 from './CloudForm/Section3';
import Section4 from './CloudForm/Section4';
import Section5 from './CloudForm/Section5';

export default function CloudForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>({
    nombreCompleto: '', email: '', telefono: '', tipoCliente: '', serviciosNecesitados: [],
    tipoProyectoWeb: '', numeroPaginas: '', proveedorContenido: '', necesitaSSL: '', traficoEstimado: '',
    usoAlmacenamiento: [], espacioAlmacenamiento: '', tiposArchivos: [], cantidadUsuarios: '', nivelSeguridad: '',
    presupuestoAproximado: '', preferenciaPago: '', tiempoNecesario: '',
    comoConocio: '', preferenciaContacto: '', comentariosAdicionales: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'success'|'error'|null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem('cloudForm', JSON.stringify(data));
      localStorage.setItem('cloudStep', step.toString());
    }, 30000);
    return () => clearInterval(timer);
  }, [data, step]);

  useEffect(() => {
    const saved = localStorage.getItem('cloudForm');
    const savedStep = localStorage.getItem('cloudStep');
    if (saved) {
      try { setData(JSON.parse(saved)); if (savedStep) setStep(parseInt(savedStep)); } catch (e) {}
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = e.target.checked;
      const val = e.target.value;
      if (name.endsWith('[]')) {
        const field = name.replace('[]', '');
        const arr = data[field] || [];
        if (field === 'serviciosNecesitados') {
          let next: string[] = arr;
          if (checked) {
            if (val === 'ambos') {
              // Seleccionar "ambos" desmarca las otras opciones
              next = ['ambos'];
            } else {
              // Seleccionar una de las primeras dos desmarca "ambos"
              next = [...arr.filter((i: any) => i !== 'ambos')];
              if (!next.includes(val)) next.push(val);
            }
          } else {
            // Desmarcar simplemente la quita del arreglo
            next = arr.filter((i: any) => i !== val);
          }
          setData((p: any) => ({ ...p, [field]: next }));
        } else {
          setData((p: any) => ({ ...p, [field]: checked ? [...arr, val] : arr.filter((i: any) => i !== val) }));
        }
      } else {
        setData((p: any) => ({ ...p, [name]: checked ? 'si' : 'no' }));
      }
    } else {
      setData((p: any) => ({ ...p, [name]: value }));
    }
    if (errors[name]) setErrors((p: any) => ({ ...p, [name]: '' }));
  };

  const validate = (s: number): boolean => {
    const e: any = {};
    if (s === 1) {
      if (!data.nombreCompleto.trim()) e.nombreCompleto = 'Requerido';
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Email inválido';
      if (!data.telefono.trim()) e.telefono = 'Requerido';
      if (!data.tipoCliente) e.tipoCliente = 'Requerido';
      if (data.serviciosNecesitados.length === 0) e.serviciosNecesitados = 'Selecciona al menos uno';
    }
    if (s === 2 && (data.serviciosNecesitados.includes('web_hosting') || data.serviciosNecesitados.includes('ambos'))) {
      if (!data.tipoProyectoWeb) e.tipoProyectoWeb = 'Requerido';
      if (!data.numeroPaginas) e.numeroPaginas = 'Requerido';
      if (!data.proveedorContenido) e.proveedorContenido = 'Requerido';
      if (!data.necesitaSSL) e.necesitaSSL = 'Requerido';
      if (!data.traficoEstimado) e.traficoEstimado = 'Requerido';
    }
    if (s === 3 && (data.serviciosNecesitados.includes('almacenamiento') || data.serviciosNecesitados.includes('ambos'))) {
      if (data.usoAlmacenamiento.length === 0) e.usoAlmacenamiento = 'Selecciona al menos uno';
      if (!data.espacioAlmacenamiento) e.espacioAlmacenamiento = 'Requerido';
      if (data.tiposArchivos.length === 0) e.tiposArchivos = 'Selecciona al menos uno';
      if (!data.cantidadUsuarios) e.cantidadUsuarios = 'Requerido';
      if (!data.nivelSeguridad) e.nivelSeguridad = 'Requerido';
    }
    if (s === 4) {
      if (!data.presupuestoAproximado) e.presupuestoAproximado = 'Requerido';
      if (!data.preferenciaPago) e.preferenciaPago = 'Requerido';
      if (!data.tiempoNecesario) e.tiempoNecesario = 'Requerido';
    }
    if (s === 5) {
      if (!data.comoConocio) e.comoConocio = 'Requerido';
      if (!data.preferenciaContacto) e.preferenciaContacto = 'Requerido';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) {
      if (step === 1) {
        if (data.serviciosNecesitados.includes('web_hosting') || data.serviciosNecesitados.includes('ambos')) setStep(2);
        else if (data.serviciosNecesitados.includes('almacenamiento')) setStep(3);
        else setStep(4);
      } else if (step === 2) {
        if (data.serviciosNecesitados.includes('almacenamiento') || data.serviciosNecesitados.includes('ambos')) setStep(3);
        else setStep(4);
      } else setStep(Math.min(step + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prev = () => {
    if (step === 4) {
      if (data.serviciosNecesitados.includes('almacenamiento') || data.serviciosNecesitados.includes('ambos')) setStep(3);
      else if (data.serviciosNecesitados.includes('web_hosting')) setStep(2);
      else setStep(1);
    } else if (step === 3) {
      if (data.serviciosNecesitados.includes('web_hosting') || data.serviciosNecesitados.includes('ambos')) setStep(2);
      else setStep(1);
    } else setStep(Math.max(step - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const save = () => {
    localStorage.setItem('cloudForm', JSON.stringify(data));
    localStorage.setItem('cloudStep', step.toString());
    alert('✅ Progreso guardado');
  };

  const submit = async () => {
    if (!validate(5)) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const { error } = await supabase.from('servicios_nube').insert([data]);
      if (error) throw error;
      setStatus('success');
      localStorage.removeItem('cloudForm');
      localStorage.removeItem('cloudStep');
      setTimeout(() => window.location.href = '/', 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (step / 5) * 100;
  const titles = ['Información General', 'Web Hosting & Desarrollo', 'Almacenamiento en la Nube', 'Presupuesto y Timeline', 'Información Adicional'];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">Paso {step} de 5</span>
          <span className="text-sm font-medium text-gray-300">{Math.round(progress)}% Completado</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">{titles[step - 1]}</h2>

      {status === 'success' && <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">¡Solicitud enviada! Redirigiendo...</div>}
      {status === 'error' && <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">Error al enviar. Intenta de nuevo.</div>}

      <div className="space-y-6">
        {step === 1 && <Section1 data={data} errors={errors} onChange={handleChange} />}
        {step === 2 && (data.serviciosNecesitados.includes('web_hosting') || data.serviciosNecesitados.includes('ambos')) && <Section2 data={data} errors={errors} onChange={handleChange} />}
        {step === 3 && (data.serviciosNecesitados.includes('almacenamiento') || data.serviciosNecesitados.includes('ambos')) && <Section3 data={data} errors={errors} onChange={handleChange} />}
        {step === 4 && <Section4 data={data} errors={errors} onChange={handleChange} />}
        {step === 5 && <Section5 data={data} errors={errors} onChange={handleChange} />}
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
        <button type="button" onClick={prev} disabled={step === 1} className={`px-6 py-3 rounded-lg font-semibold transition-all ${step === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/20'}`}>
          <i className="fas fa-arrow-left mr-2"></i>Anterior
        </button>
        <button type="button" onClick={save} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
          <i className="fas fa-save mr-2"></i>Guardar
        </button>
        {step < 5 ? (
          <button type="button" onClick={next} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Siguiente<i className="fas fa-arrow-right ml-2"></i>
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting} className={`px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {submitting ? <><i className="fas fa-spinner fa-spin mr-2"></i>Enviando...</> : <><i className="fas fa-paper-plane mr-2"></i>Enviar</>}
          </button>
        )}
      </div>
    </div>
  );
}
