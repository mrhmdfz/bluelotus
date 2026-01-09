export const CustomStyles = () => (
  <style jsx>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #06b6d4;
      border-radius: 10px;
    }
    input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 12px;
      height: 12px;
      background: #06b6d4;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid white;
    }
  `}</style>
);
