import React from 'react';

const inp = (err?: string) => `w-full p-4 bg-white/10 border ${err ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all`;

export default function Section2({ data, errors, onChange }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-orange-400">Tipo de Proyecto Web</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">¿Qué tipo de sitio web necesitas? <span className="text-red-500">*</span></label>
            <select name="tipoProyectoWeb" value={data.tipoProyectoWeb} onChange={onChange} className={inp(errors.tipoProyectoWeb)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="informativo" className="bg-gray-800">Sitio informativo/corporativo</option>
              <option value="ecommerce" className="bg-gray-800">Tienda online/E-commerce</option>
              <option value="blog" className="bg-gray-800">Blog/Portal de noticias</option>
              <option value="portafolio" className="bg-gray-800">Portafolio personal</option>
              <option value="plataforma" className="bg-gray-800">Plataforma web/Aplicación</option>
              <option value="landing" className="bg-gray-800">Landing page</option>
              <option value="otro" className="bg-gray-800">Otro</option>
            </select>
            {errors.tipoProyectoWeb && <p className="mt-2 text-sm text-red-400">{errors.tipoProyectoWeb}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Número de páginas <span className="text-red-500">*</span></label>
            <select name="numeroPaginas" value={data.numeroPaginas} onChange={onChange} className={inp(errors.numeroPaginas)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="1-5" className="bg-gray-800">1-5 páginas</option>
              <option value="6-10" className="bg-gray-800">6-10 páginas</option>
              <option value="11-20" className="bg-gray-800">11-20 páginas</option>
              <option value="20+" className="bg-gray-800">Más de 20</option>
            </select>
            {errors.numeroPaginas && <p className="mt-2 text-sm text-red-400">{errors.numeroPaginas}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Quién proveerá el contenido? <span className="text-red-500">*</span></label>
            <select name="proveedorContenido" value={data.proveedorContenido} onChange={onChange} className={inp(errors.proveedorContenido)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="yo" className="bg-gray-800">Yo/Mi empresa</option>
              <option value="ayuda" className="bg-gray-800">Necesito ayuda</option>
              <option value="combinacion" className="bg-gray-800">Combinación</option>
            </select>
            {errors.proveedorContenido && <p className="mt-2 text-sm text-red-400">{errors.proveedorContenido}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Necesitas certificado SSL? <span className="text-red-500">*</span></label>
            <select name="necesitaSSL" value={data.necesitaSSL} onChange={onChange} className={inp(errors.necesitaSSL)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="si" className="bg-gray-800">Sí, definitivamente</option>
              <option value="no_se" className="bg-gray-800">No sé qué es</option>
              <option value="no" className="bg-gray-800">No por ahora</option>
            </select>
            {errors.necesitaSSL && <p className="mt-2 text-sm text-red-400">{errors.necesitaSSL}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tráfico estimado mensual <span className="text-red-500">*</span></label>
            <select name="traficoEstimado" value={data.traficoEstimado} onChange={onChange} className={inp(errors.traficoEstimado)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="menos_1000" className="bg-gray-800">Menos de 1,000 visitantes</option>
              <option value="1000_5000" className="bg-gray-800">1,000 - 5,000 visitantes</option>
              <option value="5000_20000" className="bg-gray-800">5,000 - 20,000 visitantes</option>
              <option value="mas_20000" className="bg-gray-800">Más de 20,000 visitantes</option>
              <option value="no_seguro" className="bg-gray-800">No estoy seguro</option>
            </select>
            {errors.traficoEstimado && <p className="mt-2 text-sm text-red-400">{errors.traficoEstimado}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
