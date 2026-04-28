import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import images from '../../assets/images';
import { useAuth } from '../../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await signUp({ email, password });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error } = await signIn({ email, password });
        if (error) throw error;
        onClose();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4">
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#ffc629]/60 backdrop-blur-[2px]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[550px] bg-white rounded-[20px] p-8 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              data-cursor
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <img
                src={images.close}
                alt="Close"
                className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </button>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h2 className="text-[26px] font-bold text-[#0a4635] uppercase tracking-tight">
                  {isSignUp ? 'Crear cuenta' : 'Su cuenta'}
                </h2>
                <p className="text-gray-500 font-medium text-[16px]">
                  {isSignUp
                    ? 'Regístrese para guardar sus direcciones.'
                    : 'Inicie sesión para comenzar.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#0a4635] uppercase tracking-wider ml-1">
                    Correo electrónico
                  </label>
                  <input
                    data-cursor
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese correo electrónico"
                    className="w-full h-12 px-6 rounded-[10px] border border-gray-200 bg-[#fbfbfb] focus:border-[#0a4635]/40 outline-none transition-all text-[15px] font-bold placeholder:text-gray-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#0a4635] uppercase tracking-wider ml-1">
                    Contraseña
                  </label>
                  <input
                    data-cursor
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    className="w-full h-12 px-6 rounded-[10px] border border-gray-200 bg-[#fbfbfb] focus:border-[#0a4635]/40 outline-none transition-all text-[15px] font-bold placeholder:text-gray-300"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-bold ml-1">{error}</p>
                )}
                {message && (
                  <p className="text-green-600 text-sm font-bold ml-1">
                    {message}
                  </p>
                )}

                <button
                  data-cursor
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#0a4635] text-white rounded-[10px] font-bold uppercase text-[15px] tracking-widest hover:bg-[#0a4635]/90 transition-all shadow-lg hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isSignUp ? (
                    'Registrarse'
                  ) : (
                    'Acceso'
                  )}
                </button>
              </form>

              <div className="text-center">
                <button
                  data-cursor
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#0a4635] text-[14px] font-bold uppercase tracking-wider hover:underline"
                >
                  {isSignUp
                    ? '¿Ya tienes una cuenta? Iniciar sesión'
                    : '¿No tienes una cuenta? Regístrate'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
