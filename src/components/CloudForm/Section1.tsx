import React from 'react';

const inp = (err?: string) => `w-full p-4 bg-white/10 border ${err ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all`;

export default function Section1({ data, errors, onChange }: any) {
  return (
    <>
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-orange-400">Datos Básicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre completo/Empresa <span className="text-red-500">*</span></label>
            <input type="text" name="nombreCompleto" value={data.nombreCompleto} onChange={onChange} className={inp(errors.nombreCompleto)} placeholder="Juan Pérez / Mi Empresa" />
            {errors.nombreCompleto && <p className="mt-2 text-sm text-red-400">{errors.nombreCompleto}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
            <input type="email" name="email" value={data.email} onChange={onChange} className={inp(errors.email)} placeholder="correo@ejemplo.com" />
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Teléfono <span className="text-red-500">*</span></label>
            <input type="tel" name="telefono" value={data.telefono} onChange={onChange} className={inp(errors.telefono)} placeholder="+504 3302-3042" />
            {errors.telefono && <p className="mt-2 text-sm text-red-400">{errors.telefono}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de cliente <span className="text-red-500">*</span></label>
            <select name="tipoCliente" value={data.tipoCliente} onChange={onChange} className={inp(errors.tipoCliente)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="persona_fisica" className="bg-gray-800">Persona física</option>
              <option value="empresa_pequena" className="bg-gray-800">Empresa pequeña (1-10)</option>
              <option value="empresa_mediana" className="bg-gray-800">Empresa mediana (11-50)</option>
              <option value="empresa_grande" className="bg-gray-800">Empresa grande (50+)</option>
            </select>
            {errors.tipoCliente && <p className="mt-2 text-sm text-red-400">{errors.tipoCliente}</p>}
          </div>
        </div>
      </div>
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-orange-400">¿Qué servicio(s) necesitas? <span className="text-red-500">*</span></h3>
        <div className="space-y-3">
          {[
            {v: 'web_hosting', l: 'Web Hosting & Desarrollo'},
            {v: 'almacenamiento', l: 'Almacenamiento en la Nube'},
            {v: 'ambos', l: 'Ambos servicios'}
          ].map(o => (
            <label key={o.v} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" name="serviciosNecesitados[]" value={o.v} checked={data.serviciosNecesitados?.includes(o.v)} onChange={onChange} className="w-5 h-5 text-orange-500 rounded" />
              <span className="text-gray-300 group-hover:text-white transition-colors">{o.l}</span>
            </label>
          ))}
        </div>
        {errors.serviciosNecesitados && <p className="mt-2 text-sm text-red-400">{errors.serviciosNecesitados}</p>}
      </div>
    </>
  );
}
