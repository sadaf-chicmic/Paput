import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp2, staggerContainer } from '../constants/utils.js';

export default function LargeOrders() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoServicio: '',
    zona: 'Maó',
    direccion: '',
    nombrePedido: '',
    diaEvento: '',
    horaEntrega: '',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={fadeInUp2}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                NOMBRE
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                TELÉFONO
              </label>
              <input
                type="tel"
                name="telefono"
                placeholder="(+34)"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                EMPRESA (OPCIONAL)
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={fadeInUp2}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="radio"
                  name="tipoServicio"
                  value="DELIVERY"
                  checked={formData.tipoServicio === 'DELIVERY'}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  data-cursor
                  className={`w-4 h-4 border border-[#0a4635] flex items-center justify-center shrink-0 ${formData.tipoServicio === 'DELIVERY' ? 'bg-[#0a4635]' : 'bg-white'}`}
                >
                  {formData.tipoServicio === 'DELIVERY' && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className="text-[14px] font-black tracking-widest text-[#0a4635] uppercase">
                  DELIVERY - Pedido mínimo 12 menús
                </span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="radio"
                  name="tipoServicio"
                  value="TAKE AWAY"
                  checked={formData.tipoServicio === 'TAKE AWAY'}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                data-cursor
                  className={`w-4 h-4 border border-[#0a4635] flex items-center justify-center shrink-0 ${formData.tipoServicio === 'TAKE AWAY' ? 'bg-[#0a4635]' : 'bg-white'}`}
                >
                  {formData.tipoServicio === 'TAKE AWAY' && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className="text-[14px] font-black tracking-widest text-[#0a4635] uppercase">
                  TAKE AWAY - En función del horario que elijas te asignaremos
                  un local de recogida
                </span>
              </label>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={fadeInUp2}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                ZONA
              </label>
              <select
                name="zona"
                value={formData.zona}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230a4635'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 20px center',
                  backgroundSize: '20px',
                }}
              >
                <option value="Maó">Maó</option>
                <option value="Ciutadella">Ciutadella</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                DIRECCION DE ENTREGA
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              />
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            variants={fadeInUp2}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                NOMBRE DE TU PEDIDO
              </label>
              <input
                type="text"
                name="nombrePedido"
                value={formData.nombrePedido}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              />
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            variants={fadeInUp2}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                DIA DEL EVENTO
              </label>
              <input
                type="text"
                name="diaEvento"
                placeholder="DD/MM/AAAA"
                value={formData.diaEvento}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                HORA DE ENTREGA
              </label>
              <input
                type="text"
                name="horaEntrega"
                placeholder="HH:MM"
                value={formData.horaEntrega}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    'DATOS PERSONALES',
    '¿QUE TIPO DE SERVICIO QUIERES?',
    '¿DÓNDE SERÁ TU EVENTO?',
    '¿CÓMO QUIERES LLAMAR A TU PEDIDO GRANDE?',
    'DETALLES DEL EVENTO',
  ];

  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full min-h-screen py-24 md:py-32 px-4 md:px-12 flex flex-col items-center bg-[#f4f3e6]"
    >
      <motion.div
        variants={fadeInUp2}
        className="flex flex-col items-center text-center mt-20 mb-20"
      >
        <h2 className="text-[14px] md:text-[25px] font-bold text-[#0a4635] tracking-widest uppercase mb-6">
          PAPUT PARA GRUPOS Y EVENTOS
        </h2>
        <h1 className="text-[clamp(4.5rem,15vw,11rem)] font-black text-[#0a4635] leading-[0.8] tracking-tighter flex flex-col items-center">
          <span>PAPUT</span>
          <span>ESTÉS DONDE</span>
          <span className="relative">
            ESTÉS
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#0a4635] origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </span>
        </h1>
        <div className="mt-6">
          <p className="text-[17px] md:text-[18px] font-medium text-[#0a4635] leading-relaxed">
            Llevamos Paput a tu evento, fiesta, boda, cena con amigos... Si te
            imaginas a Paput allí, haremos lo posible por estar.
          </p>
          <p className="text-[17px] md:text-[18px] font-black text-[#0a4635] leading-relaxed">
            Recuerda hacer tu pedido con 48h de antelación.
          </p>
        </div>
      </motion.div>

      <motion.section
        variants={fadeInUp2}
        className="w-full max-w-[60vw] border border-[#0a4635] rounded-[40px] p-8 md:p-14 relative"
      >
        <div className="flex justify-between items-start mb-10">
          <h2 className="text-[18px] md:text-[30px] font-black text-[#0a4635] uppercase">
            {stepTitles[currentStep - 1]}
          </h2>
          <span className="text-[14px] font-black text-[#0a4635] opacity-60">
            {currentStep}/5
          </span>
        </div>

        <div className="mb-12 min-h-[300px]">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>

        <div className="flex justify-between items-center pt-8">
          {currentStep > 1 ? (
            <button
              data-cursor
              onClick={prevStep}
              className="px-8 md:px-12 py-3 md:py-4 border border-[#0a4635] rounded-full text-[#0a4635] font-black text-[18px] hover:bg-slate-50 transition-colors uppercase"
            >
              ATRÁS
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 5 ? (
            <button
              data-cursor
              onClick={nextStep}
              className="px-8 md:px-12 py-3 md:py-4 bg-[#ffc62d] rounded-full text-[#0a4635] font-black text-[18px] hover:opacity-90 transition-opacity uppercase"
            >
              SIGUIENTE
            </button>
          ) : (
            <button
              data-cursor
              className="px-8 md:px-12 py-3 md:py-4 bg-[#ffc62d] rounded-full text-[#0a4635] font-black text-[18px] hover:opacity-90 transition-opacity uppercase"
            >
              ENVIAR
            </button>
          )}
        </div>
      </motion.section>
    </motion.main>
  );
}
