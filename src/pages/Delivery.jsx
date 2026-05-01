import { useEffect, useRef } from 'react';
import images from '../assets/images';
import { DELIVERY_TEXTS as S, LANDING_TEXTS } from '../constants/texts';
import OrderButton from '../components/common/OrderButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { SOCIAL } = LANDING_TEXTS;
const { WHATSAPP: WHATSAPP_LINK } = SOCIAL;

export default function Delivery() {
  const pageRef = useRef(null);

  // SECTION 1
  const deliveryRef = useRef(null);
  const mapRef = useRef(null);
  const buttonRef = useRef(null);

  // SECTION 2
  const scheduleLabelRef = useRef(null);
  const scheduleRef = useRef(null);
  const serviceAreaRef = useRef(null);
  const addressRef = useRef(null);

  // SECTION 3
  const vehicleRef = useRef(null);
  const serviceOptionsRef = useRef(null);

  // FINAL
  const orderTitleRef = useRef(null);
  const orderDescRef = useRef(null);
  const dineTitleRef = useRef(null);
  const dineDescRef = useRef(null);
  const dineNoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ================= SECTION 1 =================
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: deliveryRef.current,
          start: 'top 85%',
        },
      });

      tl1
        .from([deliveryRef.current, mapRef.current], {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .from(
          buttonRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power1.out',
          },
          '-=0.6',
        );

      // ================= SECTION 2 =================
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: scheduleLabelRef.current,
          start: 'top 85%',
        },
      });

      tl2
        .from(scheduleLabelRef.current, {
          x: -100,
          opacity: 0,
          duration: 1,
        })
        .from(
          scheduleRef.current,
          {
            x: -80,
            opacity: 0,
            duration: 1,
          },
          '-=0.7',
        )
        .from(
          serviceAreaRef.current,
          {
            x: -60,
            opacity: 0,
            duration: 1,
          },
          '-=0.7',
        )
        .from(
          addressRef.current,
          {
            opacity: 0,
            duration: 1.4,
            ease: 'power1.out',
          },
          '-=0.5',
        );

      // ================= VEHICLE =================
      gsap.from(vehicleRef.current, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: vehicleRef.current,
          start: 'top 85%',
        },
      });

      // ================= SERVICE OPTIONS (independent) =================
      gsap.from(serviceOptionsRef.current, {
        x: 40,
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: serviceOptionsRef.current,
          start: 'top 85%',
        },
      });

      // ================= FINAL TEXT =================
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: orderTitleRef.current,
          start: 'top 85%',
        },
      });

      tl4
        .from([orderTitleRef.current, dineTitleRef.current], {
          x: -100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
        })
        .from(
          [orderDescRef.current, dineDescRef.current, dineNoteRef.current],
          {
            x: -80,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
          },
          '-=0.5',
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* ================= SECTION 1 ================= */}
      <div className="flex flex-col items-center w-full bg-[#f4f3e6] pt-[15vh] text-[#0a4635]">
        <div className="flex flex-col items-center w-[50vw] gap-12 px-6 mb-10">
          <img
            ref={deliveryRef}
            src={images.deliveryGreen}
            alt="DELIVERY"
            className="w-full max-w-[600px]"
          />

          <div ref={buttonRef}>
            <OrderButton className="px-16 py-8 text-4xl lg:text-5xl" />
          </div>

          <img
            ref={mapRef}
            src={images.map}
            alt="Delivery Map"
            className="w-full"
          />
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="w-full flex flex-col px-6 md:px-12 text-[#0a4635]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <p ref={serviceAreaRef} className="text-lg lg:text-2xl font-bold">
              {S.SERVICE_AREA}
            </p>

            <p
              ref={addressRef}
              className="text-4xl lg:text-[80px] font-black underline"
            >
              {S.ADDRESS}
            </p>
          </div>

          {/* NO ANIMATION */}
          <img
            src={images.img1}
            alt="Mascot"
            className="w-[100px] lg:w-[150px]"
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <p ref={scheduleLabelRef} className="text-lg lg:text-2xl font-bold">
            {S.SCHEDULE_LABEL}
          </p>

          <p ref={scheduleRef} className="text-4xl lg:text-[80px] font-black">
            {S.SCHEDULE}
          </p>
        </div>
      </div>

      {/* ================= VEHICLE ================= */}
      <div className="flex justify-center">
        <img
          ref={vehicleRef}
          src={images.vehicle}
          alt="Vehicle"
          className="w-full max-w-[600px]"
        />
      </div>

      {/* ================= SECTION 3 ================= */}
      <div
        ref={serviceOptionsRef}
        className="flex flex-col gap-2 px-6 md:px-12 lg:px-16 pb-10 text-[#0a4635]"
      >
        <p className="text-4xl lg:text-[80px] font-black">
          {S.SERVICE_OPTIONS}
        </p>
        <p className="text-lg lg:text-xl">
          Recoge tu pedido en el local <br />O recíbelo en casa cómodamente 🛵
        </p>
      </div>

      {/* ================= FINAL ================= */}
      <div className="flex flex-col gap-10 px-6 md:px-12 lg:px-16 pb-40 text-[#0a4635]">
        <div>
          <p ref={orderTitleRef} className="text-4xl lg:text-[80px] font-black">
            {S.ORDER_EASY_TITLE}
          </p>

          <p ref={orderDescRef} className="text-lg lg:text-xl">
            {S.ORDER_EASY_DESCRIPTION_PREFIX}
            <a href={WHATSAPP_LINK} className="underline hover:text-[#e54d3a]">
              {S.ORDER_EASY_LINK_TEXT}
            </a>{' '}
            🤳🏼
          </p>
        </div>

        <div>
          <p ref={dineTitleRef} className="text-4xl lg:text-[80px] font-black">
            {S.DINE_IN_TITLE}
          </p>

          <p ref={dineDescRef} className="text-lg lg:text-xl">
            {S.DINE_IN_DESCRIPTION}
          </p>

          <p ref={dineNoteRef} className="text-lg lg:text-xl">
            {S.DINE_IN_NOTE}
          </p>
        </div>
      </div>
    </div>
  );
}
