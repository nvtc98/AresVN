import { motion, AnimatePresence } from "framer-motion";

const Popup = ({ showPopup, setShowPopup }) => {
  const { animated = true, content } = showPopup || {};
  const renderContent = () => (
    <div
      className="modal"
      style={{
        display: showPopup ? "block" : "none",
      }}
      onClick={() => setShowPopup(false)}
    >
      {content}
    </div>
  );

  return animated ? (
    <motion.div
      animate={{
        opacity: showPopup ? 1 : 0,
      }}
      {...(animated
        ? {
            transition: {
              opacity: { ease: "linear" },
              layout: { duration: 1 },
            },
          }
        : {})}
    >
      {renderContent()}
    </motion.div>
  ) : (
    renderContent()
  );
};

export default Popup;
