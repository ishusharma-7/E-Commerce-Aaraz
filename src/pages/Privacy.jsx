import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-12 px-4 dark:text-gray-300"
    >
      <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">Privacy Policy</h1>
      <div className="space-y-8 leading-relaxed text-sm md:text-base">
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Information Collection</h2>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This includes name, email, and shipping address.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Use of Data</h2>
          <p>We use your data to process orders, improve our website, and communicate with you about promotions or updates. We do not sell your personal information to third parties.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Data Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. Your order data is stored locally for your convenience.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings.</p>
        </section>
      </div>
    </motion.div>
  );
}