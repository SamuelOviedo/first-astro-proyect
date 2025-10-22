import React from 'react';

const inp = (err?: string) => `w-full p-4 bg-white/10 border ${err ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all`;

export default function Section5({ data, errors, onChange }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-orange-400">Información Adicional</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">¿Cómo nos conociste? <span className="text-red-500">*</span></label>
            <select name="comoConocio" value={data.comoConocio} onChange={onChange} className={inp(errors.comoConocio)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="google" className="bg-gray-800">Búsqueda en Google</option>
              <option value="recomendacion" className="bg-gray-800">Recomendación</option>
              <option value="redes_sociales" className="bg-gray-800">Redes sociales</option>
              <option value="publicidad" className="bg-gray-800">Publicidad</option>
              <option value="otro" className="bg-gray-800">Otro</option>
            </select>
            {errors.comoConocio && <p className="mt-2 text-sm text-red-400">{errors.comoConocio}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Prefieres que te contactemos por? <span className="text-red-500">*</span></label>
            <select name="preferenciaContacto" value={data.preferenciaContacto} onChange={onChange} className={inp(errors.preferenciaContacto)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="email" className="bg-gray-800">Email</option>
              <option value="whatsapp" className="bg-gray-800">WhatsApp</option>
              <option value="llamada" className="bg-gray-800">Llamada telefónica</option>
              <option value="videollamada" className="bg-gray-800">Videollamada</option>
              <option value="sin_preferencia" className="bg-gray-800">Sin preferencia</option>
            </select>
            {errors.preferenciaContacto && <p className="mt-2 text-sm text-red-400">{errors.preferenciaContacto}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Comentarios adicionales</label>
            <textarea
              name="comentariosAdicionales"
              value={data.comentariosAdicionales}
              onChange={onChange}
              rows={6}
              className={inp()}
              placeholder="¿Tienes algún requerimiento especial o comentario adicional que quieras compartir?"
            />
            <p className="mt-2 text-sm text-gray-400">Comparte cualquier detalle adicional que consideres importante para tu proyecto</p>
          </div>
        </div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-400 text-xl mt-1"></i>
          <div>
            <h4 className="font-semibold text-blue-300 mb-2">Próximos pasos</h4>
            <p className="text-sm text-gray-300">
              Una vez enviado el formulario, nuestro equipo revisará tu solicitud y te contactará en un plazo máximo de 24-48 horas 
              para discutir los detalles y proporcionarte una cotización personalizada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
