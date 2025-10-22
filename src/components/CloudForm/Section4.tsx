import React from 'react';

const inp = (err?: string) => `w-full p-4 bg-white/10 border ${err ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all`;

export default function Section4({ data, errors, onChange }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-4 text-orange-400">Presupuesto y Timeline</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Presupuesto aproximado <span className="text-red-500">*</span></label>
            <select name="presupuestoAproximado" value={data.presupuestoAproximado} onChange={onChange} className={inp(errors.presupuestoAproximado)}>
              <option value="" className="bg-gray-800">Selecciona un rango</option>
              <option value="menos_500" className="bg-gray-800">Menos de $500</option>
              <option value="500_1000" className="bg-gray-800">$500 - $1,000</option>
              <option value="1000_2500" className="bg-gray-800">$1,000 - $2,500</option>
              <option value="2500_5000" className="bg-gray-800">$2,500 - $5,000</option>
              <option value="mas_5000" className="bg-gray-800">Más de $5,000</option>
              <option value="flexible" className="bg-gray-800">Flexible según propuesta</option>
            </select>
            {errors.presupuestoAproximado && <p className="mt-2 text-sm text-red-400">{errors.presupuestoAproximado}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Prefieres pago único o recurrente? <span className="text-red-500">*</span></label>
            <select name="preferenciaPago" value={data.preferenciaPago} onChange={onChange} className={inp(errors.preferenciaPago)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="unico" className="bg-gray-800">Pago único inicial</option>
              <option value="mensual" className="bg-gray-800">Pagos mensuales</option>
              <option value="inicial_mensual" className="bg-gray-800">Pago inicial + mensualidades</option>
              <option value="segun_propuesta" className="bg-gray-800">Según propuesta</option>
            </select>
            {errors.preferenciaPago && <p className="mt-2 text-sm text-red-400">{errors.preferenciaPago}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">¿Cuándo necesitas tener todo listo? <span className="text-red-500">*</span></label>
            <select name="tiempoNecesario" value={data.tiempoNecesario} onChange={onChange} className={inp(errors.tiempoNecesario)}>
              <option value="" className="bg-gray-800">Selecciona</option>
              <option value="urgente" className="bg-gray-800">Lo antes posible (urgente)</option>
              <option value="1_2_semanas" className="bg-gray-800">1-2 semanas</option>
              <option value="1_mes" className="bg-gray-800">1 mes</option>
              <option value="2_3_meses" className="bg-gray-800">2-3 meses</option>
              <option value="mas_3_meses" className="bg-gray-800">Más de 3 meses</option>
              <option value="flexible" className="bg-gray-800">Flexible</option>
            </select>
            {errors.tiempoNecesario && <p className="mt-2 text-sm text-red-400">{errors.tiempoNecesario}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
