import React from 'react';

const inp = (err?: string) => `w-full p-4 bg-white/10 border ${err ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all`;

export default function Section3({ data, errors, onChange }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-orange-400">Necesidades de Almacenamiento</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">¿Para qué usarás el almacenamiento? <span className="text-red-500">*</span></label>
            <div className="space-y-3">
              {[
                {v: 'respaldo_personal', l: 'Respaldo de documentos personales'},
                {v: 'respaldo_empresarial', l: 'Respaldo de archivos empresariales'},
                {v: 'compartir', l: 'Compartir archivos con equipo/clientes'},
                {v: 'fotos_videos', l: 'Almacenar fotos/videos'},
                {v: 'hosting_archivos', l: 'Hosting de archivos para descargas'},
                {v: 'sincronizacion', l: 'Sincronización entre dispositivos'}
              ].map(o => (
                <label key={o.v} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="usoAlmacenamiento[]" value={o.v} checked={data.usoAlmacenamiento?.includes(o.v)} onChange={onChange} className="w-5 h-5 text-orange-500 rounded" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{o.l}</span>
                </label>
              ))}
            </div>
            {errors.usoAlmacenamiento && <p className="mt-2 text-sm text-red-400">{errors.usoAlmacenamiento}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Cuánto espacio necesitas? <span className="text-red-500">*</span></label>
            <select name="espacioAlmacenamiento" value={data.espacioAlmacenamiento} onChange={onChange} className={inp(errors.espacioAlmacenamiento)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="menos_50gb" className="bg-gray-800">Menos de 50 GB</option>
              <option value="50_100gb" className="bg-gray-800">50 GB - 100 GB</option>
              <option value="100_500gb" className="bg-gray-800">100 GB - 500 GB</option>
              <option value="500gb_1tb" className="bg-gray-800">500 GB - 1 TB</option>
              <option value="1_5tb" className="bg-gray-800">1 TB - 5 TB</option>
              <option value="mas_5tb" className="bg-gray-800">Más de 5 TB</option>
              <option value="no_seguro" className="bg-gray-800">No estoy seguro</option>
            </select>
            {errors.espacioAlmacenamiento && <p className="mt-2 text-sm text-red-400">{errors.espacioAlmacenamiento}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">¿Qué tipo de archivos almacenarás? <span className="text-red-500">*</span></label>
            <div className="space-y-3">
              {[
                {v: 'documentos', l: 'Documentos (PDF, Word, Excel)'},
                {v: 'imagenes', l: 'Imágenes'},
                {v: 'videos', l: 'Videos'},
                {v: 'audio', l: 'Audio'},
                {v: 'comprimidos', l: 'Archivos comprimidos (ZIP, RAR)'},
                {v: 'bases_datos', l: 'Bases de datos'},
                {v: 'codigo', l: 'Código fuente/Proyectos'}
              ].map(o => (
                <label key={o.v} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="tiposArchivos[]" value={o.v} checked={data.tiposArchivos?.includes(o.v)} onChange={onChange} className="w-5 h-5 text-orange-500 rounded" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{o.l}</span>
                </label>
              ))}
            </div>
            {errors.tiposArchivos && <p className="mt-2 text-sm text-red-400">{errors.tiposArchivos}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Cuántas personas necesitarán acceso? <span className="text-red-500">*</span></label>
            <select name="cantidadUsuarios" value={data.cantidadUsuarios} onChange={onChange} className={inp(errors.cantidadUsuarios)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="solo_yo" className="bg-gray-800">Solo yo</option>
              <option value="2_5" className="bg-gray-800">2-5 usuarios</option>
              <option value="6_10" className="bg-gray-800">6-10 usuarios</option>
              <option value="11_25" className="bg-gray-800">11-25 usuarios</option>
              <option value="mas_25" className="bg-gray-800">Más de 25 usuarios</option>
            </select>
            {errors.cantidadUsuarios && <p className="mt-2 text-sm text-red-400">{errors.cantidadUsuarios}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nivel de seguridad requerido <span className="text-red-500">*</span></label>
            <select name="nivelSeguridad" value={data.nivelSeguridad} onChange={onChange} className={inp(errors.nivelSeguridad)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="estandar" className="bg-gray-800">Estándar (protección con contraseña)</option>
              <option value="alto" className="bg-gray-800">Alto (encriptación + 2FA)</option>
              <option value="muy_alto" className="bg-gray-800">Muy alto (encriptación avanzada + auditorías)</option>
            </select>
            {errors.nivelSeguridad && <p className="mt-2 text-sm text-red-400">{errors.nivelSeguridad}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
