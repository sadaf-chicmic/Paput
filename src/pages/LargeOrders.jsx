import { useEffect, useState,useRef } from 'react';
import { LARGE_ORDERS_STRINGS as S } from '../constants/texts';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function LargeOrders() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoServicio: '',
    zona: '',
    direccion: '',
    nombrePedido: '',
    diaEvento: '',
    horaEntrega: '',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const sectionRef=useRef(null);
  const headingRef=useRef(null);
  const subtitleRef=useRef(null);
  const bottomTextRef=useRef(null);
  const textRef=useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
scrollTrigger: {
  trigger: textRef.current,
  start: 'bottom bottom',
  toggleActions: 'play none none none',
  once: true,
}
      });

      tl.from([subtitleRef.current, headingRef.current], {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      }).from(
        bottomTextRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.2',
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <Input
              label={S.LABELS.NOMBRE}
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <Input
              label={S.LABELS.EMAIL}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label={S.LABELS.TELEFONO}
              name="telefono"
              placeholder="(+34)"
              value={formData.telefono}
              onChange={handleChange}
            />
            <Input
              label={S.LABELS.EMPRESA}
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
            />
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-6">
            <RadioOption
            data-cursor
              label={S.SERVICE_DELIVERY}
              value="DELIVERY"
              checked={formData.tipoServicio === 'DELIVERY'}
              onChange={handleChange}
            />
            <RadioOption
            data-cursor
              label={S.SERVICE_TAKEAWAY}
              value="TAKE AWAY"
              checked={formData.tipoServicio === 'TAKE AWAY'}
              onChange={handleChange}
            />
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-bold text-[#0a4635]">
                {S.LABELS.ZONA}
              </label>
              <select
                name="zona"
                value={formData.zona}
                onChange={handleChange}
                className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
              >
                <option value="Maó">Maó</option>
                <option value="Ciutadella">Ciutadella</option>
              </select>
            </div>

            <Input
              label={S.LABELS.DIRECCION}
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-6">
            <Input
              label={S.LABELS.NOMBRE_PEDIDO}
              name="nombrePedido"
              value={formData.nombrePedido}
              onChange={handleChange}
            />
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col gap-6">
            <Input
              label={S.LABELS.DIA_EVENTO}
              name="diaEvento"
              placeholder="DD/MM/AAAA"
              value={formData.diaEvento}
              onChange={handleChange}
            />
            <Input
              label={S.LABELS.HORA_ENTREGA}
              name="horaEntrega"
              placeholder="HH:MM"
              value={formData.horaEntrega}
              onChange={handleChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main ref={sectionRef} className="w-full min-h-screen py-24 md:py-32 px-4 md:px-12 flex flex-col items-center bg-[#f4f3e6]">
      <div ref={textRef} className="flex flex-col items-center text-center mt-20 mb-20">
        <h2 ref={subtitleRef} className="text-[14px] md:text-[25px] font-bold text-[#0a4635] tracking-widest uppercase mb-6">
          {S.SUBTITLE}
        </h2>

        <h1 ref={headingRef} className="text-[clamp(4.5rem,15vw,11rem)] font-black text-[#0a4635] leading-[0.8] tracking-tighter flex flex-col items-center">
          <span>{S.TITLE_LINE1}</span>
          <span>{S.TITLE_LINE2}</span>
          <span>{S.TITLE_LINE3}</span>
        </h1>

        <div ref={bottomTextRef} className="mt-6">
          <p className="text-[17px] md:text-[18px] font-medium text-[#0a4635]">
            {S.DESC}
          </p>
          <p className="text-[17px] md:text-[18px] font-black text-[#0a4635]">
            {S.REMINDER}
          </p>
        </div>
      </div>

      <section className="w-full max-w-[60vw] border border-[#0a4635] rounded-[40px] p-8 md:p-14">
        <div className="flex justify-between mb-10">
          <h2 className="text-[18px] md:text-[30px] font-black text-[#0a4635] uppercase">
            {S.STEP_TITLES[currentStep - 1]}
          </h2>
          <span className="text-[14px] font-black text-[#0a4635] opacity-60">
            {currentStep}/5
          </span>
        </div>

        <div className="mb-12 min-h-[300px]">{renderStep()}</div>

        <div className="flex justify-between pt-8">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-8 py-3 border-2 border-[#0a4635] font-bold rounded-full  hover:bg-[#0a4635] hover:text-[#ffc62d]"
            >
              {S.BTN_BACK}
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              data-cursor
              onClick={nextStep}
              className="px-8 py-3 bg-[#ffc62d] font-bold rounded-full hover:bg-[#0a4635] hover:text-[#ffc62d]"
            >
              {S.BTN_NEXT}
            </button>
          ) : (
            <button
              data-cursor
              className="px-8 py-3 bg-[#ffc62d] font-bold rounded-full  hover:bg-[#0a4635] hover:text-[#ffc62d]"
            >
              {S.BTN_SEND}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}



function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[18px] font-bold text-[#0a4635]">{label}</label>
      <input
        {...props}
        className="w-full bg-white border border-[#0a4635] rounded-full py-4 px-6 text-[#0a4635] outline-none"
      />
    </div>
  );
}

function RadioOption({ label, value, checked, onChange }) {
  return (
    <label className="flex items-center gap-4 cursor-pointer">
      <input
        type="radio"
        name="tipoServicio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="text-[14px] font-black tracking-widest text-[#0a4635] uppercase">
        {label}
      </span>
    </label>
  );
}