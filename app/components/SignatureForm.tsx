import { useState, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from 'react-bootstrap';



export default function SignatureForm({
  clearLabel,
  onSave
}: {
  clearLabel: string,
  onSave: (data: string | null) => void
}) {

  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Function to extract the image and send it to the parent
  const handleEnd = () => {
    if (sigCanvas.current) {
      // Converts the drawing to a PNG Base64 string
      const sigData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      onSave(sigData);
    }
  };

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current?.clear();
    }
  };

  // Only render the parts causing issues after mounting
  return (

    <div className="mb-3">
      <div style={{ border: '1px solid #ced4da', borderRadius: '4px', background: '#f8f9fa' }}>
        <SignatureCanvas
          ref={sigCanvas}
          onEnd={handleEnd} // 3. Capture data when user stops drawing
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signature-pad'
          }}
        />
      </div>

      {isMounted && (
        <button
          type="button"
          className="mt-2 btn btn-secondary btn-sm"
          onClick={clear}
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
}





// export default function SignatureForm({ onSignatureChange, clearLabel }) {
//   const sigCanvas = useRef(null);

//   // Clears the pad and tells the parent form the signature is gone
//   const clear = () => {
//     sigCanvas.current.clear();
//     onSignatureChange(null);
//   };

//   const handleEnd = () => {
//     // Send the image data to the parent whenever the user stops drawing
//     const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
//     onSignatureChange(dataURL);
//   };

//   // Inside SignatureForm.tsx
//   <SignatureCanvas
//     ref={sigCanvas}
//     onEnd={handleEnd}
//     canvasProps={{
//       width: 500,
//       height: 200,
//       className: 'signature-pad',
//       // ADD THIS LINE TO FIX THE WARNING
//       willReadFrequently: true
//     }}
//   />

//   return (
//     <div className="mb-3">
//       <div style={{ border: '1px solid #ced4da', borderRadius: '4px', background: '#f8f9fa' }}>
//         <SignatureCanvas
//           ref={sigCanvas}
//           onEnd={handleEnd}
//           canvasProps={{
//             width: 500,
//             height: 200,
//             className: 'signature-pad'
//           }}
//         />
//       </div>
//       <Button
//         variant="secondary"
//         size="sm"
//         className="mt-2"
//         onClick={clear}
//       >
//         {clearLabel || "Clear Signature"}
//       </Button>
//     </div>
//   );
// }