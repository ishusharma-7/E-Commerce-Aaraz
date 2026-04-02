import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-12 px-4 dark:text-gray-300"
    >
      <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">Terms & Conditions</h1>
      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">1. Agreement to Terms</h2>
          <p>By accessing the Aaraz website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">2. Intellectual Property</h2>
          <p>All content, logos, and designs on this site are the exclusive property of Aaraz and Ishu Sharma. Unauthorized use or reproduction is strictly prohibited.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">3. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account and password. Aaraz reserves the right to refuse service or terminate accounts at our discretion.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">4. Limitation of Liability</h2>
          <p>Aaraz shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
        </section>
      </div>
    </motion.div>
  );
}